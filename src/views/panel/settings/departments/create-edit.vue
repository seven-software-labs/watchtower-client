<template>
    <div v-if="!isInitializing">
        <x-section-header>
            <template v-slot:title>
                <template v-if="mode == 'edit' && createEditForm.name">
                    {{ createEditForm.name }}
                </template>

                <template v-else>
                    Create Department
                </template>
            </template>
        </x-section-header>

        <x-form @submit.prevent="submitCreateEditForm(createEditForm, mode)">
            <x-section-toolbar>
                <x-button type="submit" color="blue" :disabled="isLoading || createEditForm.deleted_at">
                    Save Department
                </x-button>

                <x-button type="button" color="white" :disabled="isLoading || createEditForm.deleted_at" @click.prevent="submitDeleteForm(deleteForm)" v-if="mode == 'edit'">
                    Delete
                </x-button>

                <x-button type="submit" color="white" :to="{ name: 'settings.departments.index' }">
                    Cancel
                </x-button>
            </x-section-toolbar>

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
    </div>
</template>

<script>
export default {
    data() {
        return {
            department: null,
            createEditForm: {
                name: "",
                color: "gray",
                is_default: 0,
                deleted_at: null,
            },
            deleteForm: {
                department_id: this.$route.params.department,
            },
        };
    },
    computed: {
        mode() {
            return this.$route.params.department ? "edit" : "create";
        },
    },
    created() {
        const { params } = this.$route;

        if(params.department) {
            this.toggleLoading();

            this.$store.dispatch("organizationModule/departmentModule/fetchOneItem", params.department)
                .then((department) => {
                    this.department = department;
                    this.createEditForm.name = department.name;
                    this.createEditForm.color = department.color;
                    this.createEditForm.is_default = department.is_default;

                    window.EchoInstance.private(`organization-${department.organization_id}-department-${department.id}-channel`)
                        .listen(".App\\Events\\Department\\DepartmentDeleted", ({ department }) => {
                            this.createEditForm.deleted_at = department.deleted_at;
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
        if(this.department) {
            const channel = `organization-${this.department.organization_id}-department-${this.department.id}-channel`;
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
            this.$store.dispatch("organizationModule/departmentModule/storeItem", payload)
                .then((department) => {
                    this.$toast().success("Department created.");

                    this.$router.push({
                        name: "settings.departments.edit",
                        params: { department: department.id },
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
            this.$store.dispatch("organizationModule/departmentModule/updateItem", { id: this.$route.params.department, payload })
                .then(() => {
                    this.$toast().success("Department updated.");
                })
                .catch((error) => {
                    this.$toast().danger(error.response.data.message);
                })
                .finally(() => {
                    this.toggleLoading();
                });
        },
        submitDeleteForm() {
            const operation = () => this.$store.dispatch("organizationModule/departmentModule/deleteItem", this.$route.params.department);
            
            this.$alert().confirm(operation)
                .then((response) => {
                    if(response) {
                        this.createEditForm.deleted_at = new Date();
                        this.$toast().success("Department deleted.");
                    }
                })
                .catch((error) => {
                    this.$toast().danger(error.response.data.message);
                });
        },
    },
};
</script>