<template>
    <x-section>
        <x-section-header>
            <template v-slot:title>
                Required information by channel services
            </template>
        </x-section-header>
        
        <x-section-header>
            <template v-slot:title>
                Available Channels
            </template>
        </x-section-header>

        <div class="rounded-md bg-red-50 p-4 mb-1" v-if="userForm.deleted_at">
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

        <x-form>
            <x-table>
                <thead>
                    <x-table-row>
                        <x-table-header v-if="isLoading" colspan="100%">
                            Loading, please wait.
                        </x-table-header>

                        <x-table-header v-if="!isLoading">
                            Channel
                        </x-table-header>

                        <x-table-header v-if="!isLoading">
                            Service
                        </x-table-header>
                        
                        <x-table-header class="text-right" v-if="!isLoading">
                            Status
                        </x-table-header>
                    </x-table-row>
                </thead>

                <x-table-row v-if="isLoading">
                    <x-table-data colspan="100%" align="center">
                        <x-loader></x-loader>
                    </x-table-data>
                </x-table-row>
                
                <x-table-row v-if="!isLoading" v-for="(channel, channelIndex) in channels.data" :key="'channel_' + channelIndex">
                    <x-table-data>
                        {{ channel.name }}
                    </x-table-data>

                    <x-table-data>
                        {{ channel.service.name }}
                    </x-table-data>

                    <x-table-data align="right">
                        <template v-if="isChannelAvailable(channel).isAvailable">
                            <x-badge color="success">
                                Available
                            </x-badge>
                        </template>

                        <template v-else>
                            <x-badge color="gray">
                                {{ isChannelAvailable(channel).message }}
                            </x-badge>
                        </template>
                    </x-table-data>
                </x-table-row>
            </x-table>
        </x-form>
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
            isLoading: true,
            user: null,
            userForm: {
                // ...
            },
        };
    },
    computed: {
        ...mapGetters("channelModule", {
            channels: "getItems",
        }),
        ...mapGetters("serviceModule", {
            services: "getItems",
        }),
    },
    created() {
        if(!this.isLoading) {
            this.toggleLoading();
        }

        this.$store.dispatch("userModule/fetchOneItem", this.$route.params.user)
            .then((user) => {
                this.user = user;

                window.EchoInstance.private(`user-${user.master_organization_id}-user-${user.id}-channel`)
                    .listen(".App\\Events\\User\\UserUpdated", ({ user }) => {
                        this.user = user;
                    })
                    .listen(".App\\Events\\User\\UserDeleted", ({ user }) => {
                        this.userForm.deleted_at = user.deleted_at;
                    });

                return this.$store.dispatch("channelModule/fetchAllItems");
            })
            .then(() => {
                return this.$store.dispatch("serviceModule/fetchAllItems");
            })
            .then((services) => {
                services.data.forEach((service) => {
                    let { required_fields: fields } = service;
                    fields.forEach((field) => {
                        this.userForm[field.name] = this.user[field.name] || "";
                    });
                });
            })
            .finally(() => {
                this.toggleLoading(300);
            });
    },
    methods: {
        isChannelAvailable(channel) {
            let isAvailable = true;
            let missingFields = [];
            let missingFieldsString = "";

            channel.service.required_fields.forEach((field) => {
                if(!this.userForm[field.name] || !this.userForm[field.name].length) {
                    isAvailable = false;
                    missingFields.push(field.label);
                }
            });

            missingFields.forEach((missingField) => {
                missingFieldsString += "";
            });

            for(let x = 0; x < missingFields.length; x++) {
                let missingField = missingFields[x];
                missingFieldsString += missingField;

                if(missingFields.length > 1) {
                    if((x+1) < missingFields.length) {
                        missingFieldsString += ", ";
                    }
                }
            }

            return {
                isAvailable,
                message: `Missing: [${missingFieldsString}]`,
            }
        },
    },
    beforeUnmount() {
        if(this.user) {
            const channel = `user-${this.user.master_organization_id}-user-${this.user.id}-channel`;
            window.EchoInstance.leave(channel);
        }
    },
}
</script>