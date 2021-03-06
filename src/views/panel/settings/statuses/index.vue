<template>
    <div>
        <x-section-header>
            <template v-slot:title>
                Statuses
            </template>
        </x-section-header>
        
        <x-section-toolbar>
            <x-button :to="{ name: 'settings.statuses.create' }" color="blue">
                Create Status
            </x-button>
        </x-section-toolbar>

        <x-table>
            <thead>
                <x-table-row>
                    <x-table-header>Name</x-table-header>
                    <x-table-header>Color</x-table-header>
                    <x-table-header class="text-right">Tickets</x-table-header>
                </x-table-row>
            </thead>

            <tbody>
                <x-table-row v-for="({ id, name, tickets_count, is_default, color }, statusIndex) in statuses" :key="'status_' + statusIndex">
                    <x-table-data>
                        <x-link class="mr-2" :to="{ name: 'settings.statuses.edit', params: { status: id } }">
                            {{ name }}
                        </x-link>

                        <x-badge color="green" v-if="is_default">
                            Default
                        </x-badge>
                    </x-table-data>

                    <x-table-data>
                        <x-badge :color="color">
                            <x-icon name="square" :color="color"/>
                            <span class="capitalize">
                                {{ color }}
                            </span>
                        </x-badge>
                    </x-table-data>

                    <x-table-data align="right">
                        <x-badge>
                            {{ tickets_count }}
                        </x-badge>
                    </x-table-data>
                </x-table-row>

                <x-table-row align="center" v-if="statuses && (statuses.length < 1)">
                    No results found.
                </x-table-row>
            </tbody>
        </x-table>
    </div>
</template>


<script>
import { mapGetters } from "vuex";

export default {
    computed: {
        ...mapGetters("organizationModule/statusModule", {
            statuses: "getItems",
        }),
    },
    created() {
        this.$store.dispatch("organizationModule/statusModule/fetchAllItems");
    },
};
</script>