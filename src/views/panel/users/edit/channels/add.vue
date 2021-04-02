<template>
    <x-section>
        <x-section-toolbar>
            <x-button form="addForm" type="submit" color="primary" :disabled="isLoading|| addForm.deleted_at">
                Save Channel
            </x-button>

            <x-button color="white" :to="{ name: 'users.edit.channels.index', params: { user: $route.params.user || 0 } }">
                Cancel
            </x-button>
        </x-section-toolbar>

        <x-vertical-scroll>
            <x-form id="addForm" @submit.prevent="submitAddForm(addForm, mode)">
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
                            Channel
                        </x-table-data>

                        <x-table-data>
                            <x-form-select name="channel_id" v-model="addForm.channel_id" :disabled="isLoading || addForm.deleted_at">
                                <option :value="null">Select Service</option>
                                <option :value="channel.id" v-for="(channel, channelIndex) in channels.data" :key="'channel_' + channelIndex">
                                    {{ channel.name }}
                                </option>
                            </x-form-select>
                        </x-table-data>
                    </x-table-row>
                    
                    <template v-if="selectedService && selectedService.required_fields">
                        <x-table-row v-for="(requiredField, requiredFieldIndex) in selectedService.required_fields" :key="'requiredField_' + requiredFieldIndex">
                            <x-table-data>
                                {{ requiredField.label }}
                            </x-table-data>

                            <x-table-data>
                                <x-form-input 
                                    :type="'text'" 
                                    :name="requiredField.name" 
                                    :disabled="isLoading || addForm.deleted_at" 
                                    :required="true"
                                    v-model="addForm[requiredField.name]" 
                                />
                            </x-table-data>
                        </x-table-row>
                    </template>
                </x-table>
            </x-form>
        </x-vertical-scroll>
    </x-section>
</template>

<script>
import Loader from "./../../../../../components/application/loader.vue";
import { mapGetters } from "vuex";

export default {
    components: {
        "x-loader": Loader,
    },
    props: {
        user: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            addForm: {
                channel_id: null,
            },
        };
    },
    computed: {
        ...mapGetters("channelModule", {
            channels: "getItems",
        }),
        selectedChannel() {
            if(!this.addForm.channel_id) return [];

            return this.channels.data.find((channel) => {
                return channel.id == this.addForm.channel_id
            });
        },
        selectedService() {
            if(!this.selectedChannel && !this.selectedChannel.length) return [];

            return this.selectedChannel.service;
        },
    },
    watch: {
        "addForm": {
            handler() {
                let allowedKeys = ["channel_id"];

                // Inject Keys
                if(this.selectedService && this.selectedService.required_fields) {
                    Object.keys(this.selectedService.required_fields).forEach((requiredFieldIndex) => {
                        const { name: fieldName } = this.selectedService.required_fields[requiredFieldIndex];
                        allowedKeys.push(fieldName);
                        this.addForm[fieldName] = this.user[fieldName];
                    });
                }

                // Remove Keys
                Object.keys(this.addForm).forEach((key) => {
                    if(!allowedKeys.includes(key)) {
                        delete this.addForm[key];
                    }
                });
            },
            deep: true,
            immediate: true,
        },
    },
    created() {
        this.$store.dispatch("channelModule/fetchAllItems");
    },
    methods: {
        submitAddForm() {
            // ...
        },
    },
};
</script>