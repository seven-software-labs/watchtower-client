<template>
    <div v-if="channels || channels.items">
        <x-section-header>
            <template v-slot:title>
                <template v-if="createEditForm.name">
                    Editing {{ createEditForm.name }}
                </template>

                <template v-else>
                    Create Channel
                </template>
            </template>
        </x-section-header>

        <x-form @submit.prevent="submitCreateEditForm(createEditForm, mode)">
            <x-card>
                <x-card-content>
                    <div class="grid grid-cols-6 gap-6">
                        <x-form-group class="col-span-3">
                            <x-form-label>Name</x-form-label>
                            <x-form-input type="text" name="name" :required="true" v-model="createEditForm.name"/>
                        </x-form-group>

                        <x-form-group class="col-span-3">
                            <x-form-label>Channel</x-form-label>
                            <x-form-select name="channel_id" v-model="createEditForm.channel_id" :disabled="mode == 'edit'" :required="true">
                                <option :value="null">Select Channel</option>
                                <option :value="channelOption.id" v-for="(channelOption, channelOptionIndex) in channels" :key="'channelOption_' + channelOptionIndex">
                                    {{ channelOption.name}}
                                </option>
                            </x-form-select>
                        </x-form-group>

                        <x-form-group class="col-span-3">
                            <x-form-label>Department</x-form-label>
                            <x-form-select name="is_active" v-model="createEditForm.department_id" :required="true">
                                <option :value="null">Select Department</option>
                                <option :value="departmentOption.id" v-for="(departmentOption, departmentOptionIndex) in departments" :key="'departmentOption_' + departmentOptionIndex">
                                    {{ departmentOption.name}}
                                </option>
                            </x-form-select>
                        </x-form-group>

                        <x-form-group class="col-span-3">
                            <x-form-label>Status</x-form-label>
                            <x-form-select name="is_active" v-model="createEditForm.is_active" :required="true">
                                <option :value="1">Active</option>
                                <option :value="0">Disabled</option>
                            </x-form-select>
                        </x-form-group>
                    </div>

                    <div class="grid grid-cols-2 gap-6 mt-6" v-if="channel && channel.channel_settings">
                        <x-form-group v-for="(setting, settingIndex) in channel.channel_settings" :key="'setting_' + settingIndex">
                            <x-form-label>
                                {{ setting.name }} 
                            </x-form-label>

                            <x-form-input 
                                :type="setting.field_type ?? 'text'" 
                                :name="setting.slug" 
                                :required="setting.is_required"
                                :placeholder="setting.name"
                                v-model="createEditForm.settings[setting.slug]"
                            />
                        </x-form-group>
                    </div>
                </x-card-content>

                <x-card-footer>
                    <x-button type="submit" color="blue" :disabled="!channel">
                        Save Channel
                    </x-button>

                    <x-button type="submit" color="white" :to="{ name: 'settings.channels.list' }">
                        Cancel
                    </x-button>
                </x-card-footer>
            </x-card>
        </x-form>
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
        this.$store.dispatch("organizationModule/organizationModule/fetchAllItems");
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
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        submitEditForm(payload) {
            this.$store.dispatch("organizationModule/channelModule/updateItem", { id: this.$route.params.channel_organization_id, payload })
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
};
</script>