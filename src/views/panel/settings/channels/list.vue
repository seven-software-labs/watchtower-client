<template>
    <div>
        <x-section-header>
            <template v-slot:title>
                Channel Settings
            </template>
        </x-section-header>

        <x-section-toolbar>
            <x-button :to="{ name: 'settings.channels.create' }" color="blue">
                Add Channel
            </x-button>
        </x-section-toolbar>

        <x-table>
            <thead>
                <x-table-row>
                    <x-table-header>Nickname</x-table-header>
                    <x-table-header>Channel</x-table-header>
                    <x-table-header>Department</x-table-header>
                    <x-table-header>Status</x-table-header>
                </x-table-row>
            </thead>

            <tbody>
                <x-table-row v-for="(channelOrganization, channelOrganizationIndex) in channelOrganizations" :key="'channelOrganization_' + channelOrganizationIndex">
                    <x-table-data>
                        <x-link :to="{ name: 'settings.channels.edit', params: { channel_organization_id: channelOrganization.id } }">
                            {{ channelOrganization.name }}
                        </x-link>
                    </x-table-data>
                    
                    <x-table-data>
                        {{ channelOrganization.channel.name }}
                    </x-table-data>
                    
                    <x-table-data>
                        {{ channelOrganization.department.name }}
                    </x-table-data>
                    
                    <x-table-data>
                        <x-badge :color="channelOrganization.is_active ? 'green':'gray'">
                            <span v-if="channelOrganization.is_active">Active</span>
                            <span v-else>Disabled</span>
                        </x-badge>
                    </x-table-data>
                </x-table-row>

                <x-table-row v-if="!channelOrganizations">
                    <x-table-data align="center">
                        No results found.
                    </x-table-data>
                </x-table-row>
            </tbody>
        </x-table>     
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    computed: {
        ...mapGetters("organizationModule/channelModule", {
            channelOrganizations: "getItems",
        }),
    },
    created() {
        this.$store.dispatch("organizationModule/channelModule/fetchAllItems");
    },
};
</script>