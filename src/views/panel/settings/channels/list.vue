<template>
    <div>
        <x-section-header>
            <template v-slot:title>
                Channel Settings
            </template>
        </x-section-header>

        <x-section-header>
            <template v-slot:toolbar>
                <x-button :to="{ name: 'settings.channels.create' }" color="blue">
                    Add Channel
                </x-button>
            </template>
        </x-section-header>

        <x-table>
            <thead>
                <x-table-row>
                    <x-table-header>Nickname</x-table-header>
                    <x-table-header>Channel</x-table-header>
                    <x-table-header>Tickets</x-table-header>
                    <x-table-header>Status</x-table-header>
                </x-table-row>
            </thead>

            <tbody>
                <x-table-row v-for="(channel, channelIndex) in channels" :key="'channel_' + channelIndex">
                    <x-table-data>
                        <x-link :to="{ name: 'settings.channels.edit', params: { pivot_id: channel.pivot.id } }">
                            {{ channel.pivot.name }}
                        </x-link>
                    </x-table-data>
                    
                    <x-table-data>
                        {{ channel.name }}
                    </x-table-data>
                    
                    <x-table-data>
                        <x-badge>{{ channel.tickets_count }}</x-badge>
                    </x-table-data>
                    
                    <x-table-data>
                        <x-badge :color="channel.pivot.is_active ? 'green':'gray'">
                            <span v-if="channel.pivot.is_active">Active</span>
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
        this.$store.dispatch("organizationModule/channelModule/fetchAllItems");
    },
};
</script>