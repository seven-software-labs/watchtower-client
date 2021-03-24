<template>
    <x-section>
        <x-section-toolbar>
            <x-button form="createEditForm" type="submit" color="primary" :disabled="isLoading|| createEditForm.deleted_at">
                Save User
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
                            <x-table-header v-if="isLoading" colspan="100%">
                                Loading, please wait.
                            </x-table-header>

                            <x-table-header colspan="100%" v-else>
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
                    
                    <x-table-row v-if="!isLoading">
                        <x-table-data>
                            Email
                        </x-table-data>

                        <x-table-data>
                            <x-form-input type="email" name="name" :disabled="isLoading || createEditForm.deleted_at" v-model="createEditForm.email" :required="true"/>
                        </x-table-data>
                    </x-table-row>
                    
                    <x-table-row v-if="!isLoading">
                        <x-table-data>
                            Organization
                        </x-table-data>
                        
                        <x-table-data>
                            <x-form-select name="organization_id" v-model="createEditForm.organization_id" :required="true" v-if="organizations.data">
                                <option :value="null">Select Organization</option>
                                <option :value="organizationOption.id" v-for="(organizationOption, organizationOptionIndex) in organizations.data" :key="'organizationOption_' + organizationOptionIndex">
                                    {{ organizationOption.name}}
                                </option>
                            </x-form-select>
                        </x-table-data>
                    </x-table-row>
                </x-table>
            </x-form>
        </x-vertical-scroll>
    </x-section>
</template>

<script>
import Loader from "./../../../../components/application/loader.vue";
import { mapGetters } from "vuex";

export default {
    components: {
        "x-loader": Loader,
    },
    data() {
        return {
            isLoading: this.$route.params.user ? true:false,
            user: null,
            createEditForm: {
                name: "",
                email: "",
                organization_id: null,
                deleted_at: null,
            },
            deleteForm: {
                user_id: this.$route.params.user,
            },
        };
    },
    computed: {
        ...mapGetters("organizationModule", {
            organizations: "getItems",
        }),
        mode() {
            return this.$route.params.user ? "edit" : "create";
        },
    },
    created() {
        this.$store.dispatch("organizationModule/fetchAllItems");
        const { params } = this.$route;

        if(params.user) {
            if(!this.isLoading) {
                this.toggleLoading();
            }

            this.$store.dispatch("userModule/fetchOneItem", params.user)
                .then((user) => {
                    this.user = user;
                    this.createEditForm.name = user.name;
                    this.createEditForm.email = user.email;
                    this.createEditForm.organization_id = user.organization_id;

                    window.EchoInstance.private(`user-${user.master_organization_id}-user-${user.id}-channel`)
                        .listen(".App\\Events\\User\\UserDeleted", ({ user }) => {
                            this.createEditForm.deleted_at = user.deleted_at;
                        });
                })
                .catch((error) => {
                    this.$toast().danger(error.response.data.message);
                })
                .finally(() => {
                    this.toggleLoading(300);
                });
        } else {
            this.toggleInitialize();
        }
    },
    beforeUnmount() {
        if(this.user) {
            const channel = `user-${this.user.master_organization_id}-user-${this.user.id}-channel`;
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
            this.$store.dispatch("userModule/storeItem", payload)
                .then((user) => {
                    this.$toast().success("User created.");

                    this.$router.push({
                        name: "users.edit",
                        params: { user: user.id },
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
            this.$store.dispatch("userModule/updateItem", { id: this.$route.params.user, payload })
                .then(() => {
                    this.$toast().success("User updated.");
                })
                .catch((error) => {
                    this.$toast().danger(error.response.data.message);
                })
                .finally(() => {
                    this.toggleLoading();
                });
        },
        submitDeleteForm() {
            const operation = () => this.$store.dispatch("userModule/deleteItem", this.$route.params.user);
            
            this.$alert().confirm(operation)
                .then((response) => {
                    if(response) {
                        this.$toast().success("User deleted.");
                    }
                })
                .catch((error) => {
                    this.$toast().danger(error.response.data.message);
                });
        },
    },
};
</script>