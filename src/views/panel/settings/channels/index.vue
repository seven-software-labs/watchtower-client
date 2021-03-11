<template>
    <div v-if="!isInitializing">
        <x-section-header>
            <template v-slot:title>
                Channel Settings
            </template>
        </x-section-header>

        <x-section-toolbar>
            <x-button :to="{ name: 'settings.channels.create' }" color="primary">
                Create Channel
            </x-button>
        </x-section-toolbar>

        <x-table>
            <thead>
                <x-table-row>
                    <x-table-header>Name</x-table-header>
                    <x-table-header>Service</x-table-header>
                    <x-table-header>Department</x-table-header>
                    <x-table-header>Active</x-table-header>
                </x-table-row>
            </thead>

            <tbody>
                <x-table-row v-for="(channel, channelIndex) in channels.data" :key="'channel_' + channelIndex">
                    <x-table-data>
                        <x-link :to="{ name: 'settings.channels.edit', params: { channel: channel.id } }">
                            {{ channel.name }}
                        </x-link>
                    </x-table-data>

                    <x-table-data>
                        {{ channel.service.name }}
                    </x-table-data>

                    <x-table-data>
                        <x-link :to="{ name: 'settings.departments.edit', params: { department: channel.department.id } }">
                            {{ channel.department.name }}
                        </x-link>
                    </x-table-data>
                    
                    <x-table-data>
                        <x-badge :color="channel.is_active ? 'green':'gray'">
                            <span v-if="channel.is_active">Active</span>
                            <span v-else>Disabled</span>
                        </x-badge>
                    </x-table-data>
                </x-table-row>

                <x-table-row v-if="!channels">
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
            channels: "getItems",
        }),
    },
    created() {
        this.$store.dispatch("organizationModule/channelModule/fetchAllItems")
            .finally(() => {
                this.toggleInitialize();
            });
    },
    mounted() {
        const organization = this.$store.getters["authModule/getUser"].organization;
        const channel = `organization-${organization.id}-channel-channel`;

        window.EchoInstance.private(channel)
            .listen(".App\\Events\\Channel\\ChannelCreated", ({ channel }) => {
                this.$toast().info(`The channel ${channel.name} was created.`);
                this.$store.dispatch("organizationModule/channelModule/fetchAllItems");
            })
            .listen(".App\\Events\\Channel\\ChannelDeleted", ({ channel }) => {
                this.$toast().info(`The channel ${channel.name} was deleted.`);
                this.$store.dispatch("organizationModule/channelModule/fetchAllItems");
            })
            .listen(".App\\Events\\Channel\\ChannelUpdated", () => {
                this.$store.dispatch("organizationModule/channelModule/fetchAllItems");
            });
    },
    beforeUnmount() {
        const organization = this.$store.getters["authModule/getUser"].organization;
        const channel = `organization-${organization.id}-channel-channel`;
        window.EchoInstance.leave(channel);
    },
};
</script>