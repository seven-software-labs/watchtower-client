<template>
    <x-section>
        <x-section-toolbar>
            <x-button form="createEditForm" type="submit" color="primary" :disabled="isLoading|| createEditForm.deleted_at">
                Save Organization
            </x-button>

            <x-button type="button" color="white" :disabled="isLoading|| createEditForm.deleted_at" @click.prevent="submitDeleteForm(deleteForm)" v-if="mode == 'edit'">
                Delete
            </x-button>

            <x-button color="white" :to="{ name: 'users.index' }">
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

                    <x-table-row v-if="isLoading">
                        <x-table-data colspan="100%" align="center">
                            <x-loader></x-loader>
                        </x-table-data>
                    </x-table-row>
                    
                    <x-table-row v-if="!isLoading">
                        <x-table-data>
                            Name
                        </x-table-data>

                        <x-table-data>
                            <x-form-input type="text" name="name" :disabled="isLoading || createEditForm.deleted_at" v-model="createEditForm.name" :required="true"/>
                        </x-table-data>
                    </x-table-row>
                </x-table>
            </x-form>
        </x-vertical-scroll>
    </x-section>
</template>

<script>
import Loader from "./../../../../components/application/loader.vue";

export default {
    components: {
        "x-loader": Loader,
    },
    data() {
        return {
            isLoading: this.$route.params.organization ? true:false,
            organization: null,
            createEditForm: {
                name: "",
                master_organization_id: null,
                deleted_at: null,
            },
            deleteForm: {
                organization_id: this.$route.params.organization,
            },
        };
    },
    computed: {
        mode() {
            return this.$route.params.organization ? "edit" : "create";
        },
    },
    created() {
        const { params } = this.$route;

        if(params.organization) {
            if(!this.isLoading) {
                this.toggleLoading();
            }

            this.$store.dispatch("organizationModule/fetchOneItem", params.organization)
                .then((organization) => {
                    this.organization = organization;
                    this.createEditForm.name = organization.name;
                    this.createEditForm.master_organization_id = organization.master_organization_id;

                    window.EchoInstance.private(`organization-${organization.master_organization_id}-organization-${organization.id}-channel`)
                        .listen(".App\\Events\\Organization\\OrganizationDeleted", ({ organization }) => {
                            this.createEditForm.deleted_at = organization.deleted_at;
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
            this.toggleInitialize(300);
        }
    },
    beforeUnmount() {
        if(this.organization) {
            const channel = `organization-${this.organization.master_organization_id}-organization-${this.organization.id}-channel`;
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
            this.$store.dispatch("organizationModule/storeItem", payload)
                .then((organization) => {
                    this.$toast().success("Organization created.");

                    this.$router.push({
                        name: "organizations.edit",
                        params: { organization: organization.id },
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
            this.$store.dispatch("organizationModule/updateItem", { id: this.$route.params.organization, payload })
                .then(() => {
                    this.$toast().success("Organization updated.");
                })
                .catch((error) => {
                    this.$toast().danger(error.response.data.message);
                })
                .finally(() => {
                    this.toggleLoading();
                });
        },
        submitDeleteForm() {
            const operation = () => this.$store.dispatch("organizationModule/deleteItem", this.$route.params.organization);
            
            this.$alert().confirm(operation)
                .then((response) => {
                    if(response) {
                        this.$toast().success("Organization deleted.");
                    }
                })
                .catch((error) => {
                    this.$toast().danger(error.response.data.message);
                });
        },
    },
};
</script>