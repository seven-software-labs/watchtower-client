<template>
    <div class="h-full flex flex-col" v-if="channels || channels.items">
        <x-section-header>
            <template v-slot:title>
                <template v-if="createEditForm.name">
                    {{ createEditForm.name }}
                </template>

                <template v-else>
                    Create Channel
                </template>
            </template>
        </x-section-header>

        <div class="h-full overflow-y-scroll">
            <x-form class="min-h-full overflow-hidden" @submit.prevent="submitCreateEditForm(createEditForm, mode)">
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
                                Nickname
                            </x-table-data>

                            <x-table-data>
                                <x-form-input type="text" name="name" :required="true" v-model="createEditForm.name"/>
                            </x-table-data>
                        </x-table-row>
                        
                        <x-table-row>
                            <x-table-data>
                                Channel
                            </x-table-data>

                            <x-table-data>
                                <x-form-select name="channel_id" v-model="createEditForm.channel_id" :disabled="mode == 'edit'" :required="true">
                                    <option :value="null">Select Channel</option>
                                    <option :value="channelOption.id" v-for="(channelOption, channelOptionIndex) in channels" :key="'channelOption_' + channelOptionIndex">
                                        {{ channelOption.name}}
                                    </option>
                                </x-form-select>
                            </x-table-data>
                        </x-table-row>
                        
                        <x-table-row>
                            <x-table-data>
                                Department
                            </x-table-data>

                            <x-table-data>
                                <x-form-select name="is_active" v-model="createEditForm.department_id" :required="true">
                                    <option :value="null">Select Department</option>
                                    <option :value="departmentOption.id" v-for="(departmentOption, departmentOptionIndex) in departments" :key="'departmentOption_' + departmentOptionIndex">
                                        {{ departmentOption.name}}
                                    </option>
                                </x-form-select>
                            </x-table-data>
                        </x-table-row>
                        
                        <x-table-row>
                            <x-table-data>
                                Status
                            </x-table-data>

                            <x-table-data>
                                <x-form-select name="is_active" v-model="createEditForm.is_active" :required="true">
                                    <option :value="1">Active</option>
                                    <option :value="0">Disabled</option>
                                </x-form-select>
                            </x-table-data>
                        </x-table-row>
                    </tbody>

                    <thead>
                        <x-table-row>
                            <x-table-header colspan="100%">
                                Channel Settings
                            </x-table-header>
                        </x-table-row>
                    </thead>

                    <tbody v-if="channel && channel.channel_settings">
                        <x-table-row v-for="(setting, settingIndex) in channel.channel_settings" :key="'setting_' + settingIndex">
                            <x-table-data>
                                <span class="capitalize">
                                    {{ setting.name }}
                                </span>
                            </x-table-data>

                            <x-table-data>
                                <x-form-input 
                                    :type="setting.field_type ?? 'text'" 
                                    :name="setting.slug" 
                                    :required="setting.is_required"
                                    :placeholder="setting.name"
                                    v-model="createEditForm.settings[setting.slug]"
                                />
                            </x-table-data>
                        </x-table-row>
                    </tbody>

                    <tbody v-if="!(channel && channel.channel_settings)">
                        <x-table-row>
                            <x-table-data colspan="100%" align="center">
                                Please select a channel.
                            </x-table-data>
                        </x-table-row>
                    </tbody>
                </x-table>

                <x-card>
                    <x-card-footer>
                        <x-button type="submit" color="blue" :disabled="!channel">
                            Save Channel
                        </x-button>

                        <x-button type="submit" color="white" :to="{ name: 'settings.channels.index' }">
                            Cancel
                        </x-button>
                    </x-card-footer>
                </x-card>
            </x-form>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    data() {
        return {
            channel: null,
            mode: "create",
            createEditForm: {
                channel_id: null,
                department_id: null,
                is_active: 0,
                name: "",
                settings: {},
            },
        };
    },
    computed: {
        ...mapGetters("organizationModule/departmentModule", {
            departments: "getItems",
        }),
        ...mapGetters("channelModule", {
            channels: "getItems",
        }),
    },
    watch: {
        "createEditForm.channel_id": {
            handler(channel_id) {
                if(channel_id) {
                    const channel = this.channels.items.find((channel) => channel.id == this.createEditForm.channel_id);
                    this.channel = channel;
                } else {
                    this.channel = null;
                }
            },
        },
    },
    created() {
        this.$store.dispatch("organizationModule/departmentModule/fetchAllItems");
        this.$store.dispatch("channelModule/fetchAllItems")
            .then(() => {
                const { params } = this.$route;

                if(params.channel_organization_id) {
                    return this.$store.dispatch("organizationModule/channelModule/fetchOneItem", params.channel_organization_id);
                }
            }).then((response) => {
                if(!response) return;
                // Lets set the mode to edit.
                this.mode = "edit";
                // Lets get the related channel object.
                const channel = response;
                // Lets get the settings from the pivot object.
                const { settings } = channel;
                // Lets set the channel id that is currently selected.
                this.createEditForm.channel_id = channel.channel_id;
                // Lets set the channel information.
                this.createEditForm.name = channel.name;
                this.createEditForm.department_id = channel.department_id;
                this.createEditForm.is_active = channel.is_active;
                // We add the settings values to the form.
                Object.keys(settings).forEach((key) => {
                    let setting = settings[key];
                    this.createEditForm.settings[key] = setting;
                });
            });
    },
    methods: {
        submitCreateEditForm(payload, mode) {
            if(mode == "create") {
                this.submitCreateForm(payload);
            }

            if(mode == "edit") {
                this.submitEditForm(payload);
            }
        },
        submitCreateForm(payload) {
            this.$store.dispatch("organizationModule/channelModule/storeItem", payload)
                .then((channelOrganization) => {
                    this.$router.push({
                        name: "settings.channels.edit",
                        params: { channel: channelOrganization.id },
                    });

                    // @todo add toast for success message.
                })
                .catch(() => {
                    // @todo add toast for error message.
                });
        },
        submitEditForm(payload) {
            this.$store.dispatch("organizationModule/channelModule/updateItem", { id: this.$route.params.channel_organization_id, payload })
                .then(() => {
                    // @todo add toast for success message.
                })
                .catch(() => {
                    // @todo add toast for error message.
                });
        },
    },
};
</script>