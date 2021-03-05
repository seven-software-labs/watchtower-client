<template>
    <div v-if="channels || channels.items">
        <x-section-header>
            <template v-slot:title>
                <template v-if="channel && channel.pivot">
                    Editing {{ channel.pivot.name }}
                </template>

                <template v-else>
                    Create Channel
                </template>
            </template>
        </x-section-header>

        <x-form @submit.prevent="submitCreateEditForm(createEditForm, mode)">
            <x-card>
                <x-card-content>
                    <div class="grid grid-cols-3 gap-6">
                        <x-form-group>
                            <x-form-label>Name</x-form-label>
                            <x-form-input type="text" name="name" :required="true" v-model="createEditForm.name"/>
                        </x-form-group>

                        <x-form-group>
                            <x-form-label>Channel</x-form-label>
                            <x-form-select name="channel_id" v-model="createEditForm.channel_id" :disabled="mode == 'edit'">
                                <option :value="null">Select Channel</option>
                                <option :value="channelOption.id" v-for="(channelOption, channelOptionIndex) in channels" :key="'channelOption_' + channelOptionIndex">
                                    {{ channelOption.name}}
                                </option>
                            </x-form-select>
                        </x-form-group>

                        <x-form-group>
                            <x-form-label>Status</x-form-label>
                            <x-form-select name="is_active" v-model="createEditForm.is_active">
                                <option :value="true">Active</option>
                                <option :value="false">Disabled</option>
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
                name: "",
                is_active: false,
                settings: {},
            },
        };
    },
    computed: {
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
        this.$store.dispatch("channelModule/fetchAllItems")
            .then(() => {
                const { params } = this.$route;

                if(params.pivot_id) {
                    return this.$store.dispatch("organizationModule/channelModule/fetchAttachedItem", params.pivot_id);
                }
            }).then((response) => {
                if(!response) return;
                // Lets set the mode to edit.
                this.mode = "edit";
                // Lets get the related channel object.
                const channel = response.data;
                // Lets get the settings from the pivot object.
                const { settings } = channel.pivot;
                // Lets set the channel id that is currently selected.
                this.createEditForm.channel_id = channel.id;
                // Lets set the channel information.
                // this.createEditForm.name = channel.pivot.name;
                this.createEditForm.is_active = channel.pivot.is_active;
                // We add the settings values to the form.
                Object.keys(settings).forEach((key) => {
                    let setting = settings[key];
                    console.log(key);
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
            this.$store.dispatch("organizationModule/channelModule/attachItem", payload)
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        submitEditForm(payload) {
            this.$store.dispatch("organizationModule/channelModule/updateAttachedItem", payload)
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