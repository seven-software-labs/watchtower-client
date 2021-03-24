<template>
    <x-section>
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

        <x-vertical-scroll>
            <x-channel-table/>
        </x-vertical-scroll>    
    </x-section>
</template>

<script>
import ChannelTable from "./../../../../components/application/channel/channel-table.vue";

export default {
    components: {
        "x-channel-table": ChannelTable,
    },
};
</script>