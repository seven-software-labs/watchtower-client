<template>
    <div v-if="!isInitializing">
        <x-section-header>
            <template v-slot:title>
                <template v-if="mode == 'edit' && createEditForm.name">
                    {{ createEditForm.name }}
                </template>

                <template v-else>
                    Create Channel
                </template>
            </template>
        </x-section-header>

        <x-form @submit.prevent="submitCreateEditForm(createEditForm, mode)">
            <x-section-toolbar>
                <x-button type="submit" color="primary" :disabled="isLoading || !selectedService || createEditForm.deleted_at">
                    Save Channel
                </x-button>

                <x-button type="button" color="white" :disabled="isLoading || createEditForm.deleted_at" @click.prevent="submitDeleteForm(deleteForm)" v-if="mode == 'edit'">
                    Delete
                </x-button>

                <x-button type="submit" color="white" :to="{ name: 'settings.channels.index' }">
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
                
                <tbody>
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
                                Service
                            </x-form-label>
                        </x-table-data>

                        <x-table-data>
                            <x-form-select name="service_id" v-model="createEditForm.service_id" :disabled="isLoading || createEditForm.deleted_at">
                                <option :value="null">Select Service</option>
                                <option :value="service.id" v-for="(service, serviceIndex) in services.data" :key="'service_' + serviceIndex">
                                    {{ service.name }}
                                </option>
                            </x-form-select>
                        </x-table-data>
                    </x-table-row>

                    <x-table-row>
                        <x-table-data>
                            <x-form-label>
                                Department
                            </x-form-label>
                        </x-table-data>

                        <x-table-data>
                            <x-form-select name="department_id" v-model="createEditForm.department_id" :disabled="isLoading || createEditForm.deleted_at">
                                <option :value="null">Select Department</option>
                                <option :value="department.id" v-for="(department, departmentIndex) in departments.data" :key="'department_' + departmentIndex">
                                    {{ department.name }}
                                </option>
                            </x-form-select>
                        </x-table-data>
                    </x-table-row>  
                </tbody>
                
                <thead>
                    <x-table-row>
                        <x-table-header colspan="100%">
                            Service Settings
                        </x-table-header>
                    </x-table-row>
                </thead>

                <tbody v-if="selectedService && selectedService.settings_schema">
                    <x-table-row v-for="(setting, settingIndex) in selectedService.settings_schema" :key="'setting_' + settingIndex">
                        <x-table-data>
                            {{ setting.label }}
                        </x-table-data>

                        <x-table-data>
                            <template v-if="['text', 'textarea', 'email', 'password', 'number'].includes(setting.field_type)">
                                <x-form-input 
                                    :type="setting.field_type" 
                                    :name="setting.name" 
                                    :disabled="isLoading || createEditForm.deleted_at" 
                                    v-model="createEditForm.settings[setting.name]"/>
                            </template>

                            <template v-if="setting.field_type == 'select'">
                                <x-form-select :name="setting.label"  v-model="createEditForm.settings[setting.name]" :disabled="isLoading || createEditForm.deleted_at">
                                    <option :value="null">Select {{ setting.name }}</option>
                                    <option :value="option.value" v-for="(option, optionIndex) in setting.options" :key="'option_' + optionIndex">
                                        {{ option.label }}
                                    </option>
                                </x-form-select>
                            </template>
                        </x-table-data>
                    </x-table-row>
                </tbody>

                <tbody v-else>
                    <x-table-row>
                        <x-table-data colspan="100%" align="center">
                            Please select a service.
                        </x-table-data>
                    </x-table-row>
                </tbody>
            </x-table>
        </x-form>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    data() {
        return {
            channel: null,
            createEditForm: {
                name: "",
                service_id: null,
                department_id: null,
                is_active: 0,
                deleted_at: null,
                settings: {},
            },
            deleteForm: {
                channel_id: this.$route.params.channel,
            },
        };
    },
    computed: {
        ...mapGetters("serviceModule", {
            services: "getItems",
        }),
        ...mapGetters("organizationModule/departmentModule", {
            departments: "getItems",
        }),
        selectedService() {
            if(this.createEditForm.service_id) {
                return this.services.data.find((service) => service.id == this.createEditForm.service_id);
            }

            return null;
        },
        mode() {
            return this.$route.params.channel ? "edit" : "create";
        },
    },
    created() {
        this.$store.dispatch("serviceModule/fetchAllItems");
        this.$store.dispatch("organizationModule/departmentModule/fetchAllItems");

        const { params } = this.$route;

        if(params.channel) {
            this.toggleLoading();

            this.$store.dispatch("organizationModule/channelModule/fetchOneItem", params.channel)
                .then((channel) => {
                    this.channel = channel;
                    this.createEditForm.name = channel.name;
                    this.createEditForm.is_active = channel.is_active;

                    window.EchoInstance.private(`organization-${channel.organization_id}-channel-${channel.id}-channel`)
                        .listen(".App\\Events\\Channel\\ChannelDeleted", ({ channel }) => {
                            this.createEditForm.deleted_at = channel.deleted_at;
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
        if(this.channel) {
            const channel = `organization-${this.channel.organization_id}-channel-${this.channel.id}-channel`;
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
            this.$store.dispatch("organizationModule/channelModule/storeItem", payload)
                .then((channel) => {
                    this.$toast().success("Channel created.");

                    this.$router.push({
                        name: "settings.channels.edit",
                        params: { channel: channel.id },
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
            this.$store.dispatch("organizationModule/channelModule/updateItem", { id: this.$route.params.channel, payload })
                .then(() => {
                    this.$toast().success("Channel updated.");
                })
                .catch((error) => {
                    this.$toast().danger(error.response.data.message);
                })
                .finally(() => {
                    this.toggleLoading();
                });
        },
        submitDeleteForm() {
            const operation = () => this.$store.dispatch("organizationModule/channelModule/deleteItem", this.$route.params.channel);
            
            this.$alert().confirm(operation)
                .then((response) => {
                    if(response) {
                        this.$toast().success("Channel deleted.");
                    }
                })
                .catch((error) => {
                    this.$toast().danger(error.response.data.message);
                });
        },
    },
};
</script>