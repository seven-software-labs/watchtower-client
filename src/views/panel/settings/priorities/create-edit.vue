<template>
    <x-section v-if="!isInitializing">
        <x-section-header>
            <template v-slot:title>
                <template v-if="mode == 'edit' && createEditForm.name">
                    {{ createEditForm.name }}
                </template>

                <template v-else>
                    Create Priority
                </template>
            </template>
        </x-section-header>

        <x-section-toolbar>
            <x-button form="createEditForm" type="submit" color="primary" :disabled="isLoading || createEditForm.deleted_at">
                Save Priority
            </x-button>

            <x-button type="button" color="white" :disabled="isLoading || createEditForm.deleted_at" @click.prevent="submitDeleteForm(deleteForm)" v-if="mode == 'edit'">
                Delete
            </x-button>

            <x-button type="submit" color="white" :to="{ name: 'settings.priorities.index' }">
                Cancel
            </x-button>
        </x-section-toolbar>        

        <x-vertical-scroll>
            <x-form id="createEditForm" @submit.prevent="submitCreateEditForm(createEditForm, mode)">
                <div class="rounded-md bg-red-50 p-4 mb-1" v-if="createEditForm.deleted_at">
                    <div class="flex">
                        <div class="flex-shrink-0">
                            <!-- Heroicon name: solid/x-circle -->
                            <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                            </svg>
                        </div>

                        <div class="ml-3">
                            <h3 class="text-sm font-medium text-red-800">
                                Resource not found.
                            </h3>

                            <div class="mt-2 text-sm text-red-700">
                                <p>This resource has been deleted.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <x-table>
                    <thead>
                        <x-table-row>
                            <x-table-header colspan="100%">
                                General Information
                            </x-table-header>
                        </x-table-row>
                    </thead>
                    
                    <x-table-row>
                        <x-table-data>
                            Name
                        </x-table-data>

                        <x-table-data>
                            <x-form-input type="text" name="name" :disabled="isLoading || createEditForm.deleted_at" v-model="createEditForm.name"/>
                        </x-table-data>
                    </x-table-row>

                    <x-table-row>
                        <x-table-data>
                            <x-form-label>
                                Color
                            </x-form-label>
                        </x-table-data>

                        <x-table-data>
                            <x-form-select name="color" :disabled="isLoading || createEditForm.deleted_at" v-model="createEditForm.color">
                                <option value="gray">Gray</option>
                                <option value="primary">Primary</option>
                                <option value="secondary">Secondary</option>
                                <option value="red">Red</option>
                                <option value="orange">Orange</option>
                                <option value="yellow">Yellow</option>
                                <option value="green">Green</option>
                                <option value="blue">Blue</option>
                                <option value="indigo">Indigo</option>
                                <option value="purple">Purple</option>
                                <option value="pink">Pink</option>
                            </x-form-select>
                        </x-table-data>
                    </x-table-row>

                    <x-table-row>
                        <x-table-data>
                            <x-form-label>
                                Default
                            </x-form-label>
                        </x-table-data>

                        <x-table-data>
                            <x-form-select name="is_default" v-model="createEditForm.is_default" :disabled="isLoading || createEditForm.deleted_at">
                                <option :value="1">Yes</option>
                                <option :value="0">No</option>
                            </x-form-select>
                        </x-table-data>
                    </x-table-row>
                </x-table>
            </x-form>
        </x-vertical-scroll>
    </x-section>
</template>

<script>
export default {
    data() {
        return {
            priority: null,
            createEditForm: {
                name: "",
                color: "gray",
                is_default: 0,
                is_removeable: 1,
                deleted_at: null,
            },
            deleteForm: {
                priority_id: this.$route.params.priority,
            },
        };
    },
    computed: {
        mode() {
            return this.$route.params.priority ? "edit" : "create";
        },
    },
    created() {
        const { params } = this.$route;

        if(params.priority) {
            this.toggleLoading();

            this.$store.dispatch("organizationModule/priorityModule/fetchOneItem", params.priority)
                .then((priority) => {
                    this.priority = priority;
                    this.createEditForm.name = priority.name;
                    this.createEditForm.color = priority.color;
                    this.createEditForm.is_default = priority.is_default;
                    this.createEditForm.is_removeable = status.is_removeable;

                    window.EchoInstance.private(`organization-${priority.organization_id}-priority-${priority.id}-channel`)
                        .listen(".App\\Events\\Priority\\PriorityDeleted", ({ priority }) => {
                            this.createEditForm.deleted_at = priority.deleted_at;
                        });
                })
                .catch((error) => {
                    this.$toast().danger(error.response.data.message);
                })
                .finally(() => {
                    this.toggleLoading();
                    this.toggleInitialize();
                });
        } else {
            this.toggleInitialize();
        }
    },
    beforeUnmount() {
        if(this.priority) {
            const channel = `organization-${this.priority.organization_id}-priority-${this.priority.id}-channel`;
            window.EchoInstance.leave(channel);
        }
    },
    methods: {
        submitCreateEditForm(payload, mode) {
            this.toggleLoading();

            if(mode == "create")
                this.submitCreateForm(payload);
            if(mode == "edit")
                this.submitEditForm(payload);
        },
        submitCreateForm(payload) {
            this.$store.dispatch("organizationModule/priorityModule/storeItem", payload)
                .then((priority) => {
                    this.$toast().success("Priority created.");

                    this.$router.push({
                        name: "settings.priorities.edit",
                        params: { priority: priority.id },
                    });

                    this.$forceUpdate();
                })
                .catch((error) => {
                    this.$toast().danger(error.response.data.message);
                })
                .finally(() => {
                    this.toggleLoading();
                });
        },
        submitEditForm(payload) {
            this.$store.dispatch("organizationModule/priorityModule/updateItem", { id: this.$route.params.priority, payload })
                .then(() => {
                    this.$toast().success("Priority updated.");
                })
                .catch((error) => {
                    this.$toast().danger(error.response.data.message);
                })
                .finally(() => {
                    this.toggleLoading();
                });
        },
        submitDeleteForm() {
            const operation = () => this.$store.dispatch("organizationModule/priorityModule/deleteItem", this.$route.params.priority);
            
            this.$alert().confirm(operation)
                .then((response) => {
                    if(response) {
                        this.$toast().success("Priority deleted.");
                    }
                })
                .catch((error) => {
                    this.$toast().danger(error.response.data.message);
                });
        },
    },
};
</script>