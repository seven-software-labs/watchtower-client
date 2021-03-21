<template>
    <x-section>
        <x-section-header>
            <template v-slot:title>
                Statuses
            </template>
        </x-section-header>
        
        <x-section-toolbar>
            <x-button :to="{ name: 'settings.statuses.create' }" color="primary">
                Create Status
            </x-button>
        </x-section-toolbar>

        <x-vertical-scroll v-if="!isInitializing">
            <x-table>
                <thead>
                    <x-table-row>
                        <x-table-header>Name</x-table-header>
                        <x-table-header>Color</x-table-header>
                        <x-table-header class="text-right">Tickets</x-table-header>
                    </x-table-row>
                </thead>

                <tbody>
                    <x-table-row v-for="({ id, name, tickets_count, is_default, color, deleted_at }, statusIndex) in statuses.data" :key="'status_' + statusIndex">
                        <x-table-data>
                            <x-link class="mr-2" :to="{ name: 'settings.statuses.edit', params: { status: id } }" :disabled="deleted_at">
                                {{ name }}
                            </x-link>

                            <x-badge color="green" v-if="is_default">
                                Default
                            </x-badge>
                        </x-table-data>

                        <x-table-data>
                            <x-badge :color="color">
                                <x-icon name="circle" :color="color"/>
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

                    <x-table-row v-if="!statuses || (statuses.length < 1)">
                        <x-table-data align="center">
                            No results found.
                        </x-table-data>
                    </x-table-row>
                </tbody>
            </x-table>
        </x-vertical-scroll>
    </x-section>
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
        this.$store.dispatch("organizationModule/statusModule/fetchAllItems")
            .finally(() => {
                this.toggleInitialize();
            });
    },
    mounted() {
        const organization = this.$store.getters["authModule/getUser"].organization;
        const channel = `organization-${organization.id}-status-channel`;

        window.EchoInstance.private(channel)
            .listen(".App\\Events\\Status\\StatusCreated", ({ status }) => {
                this.$toast().info(`The status ${status.name} was created.`);
                this.$store.dispatch("organizationModule/statusModule/fetchAllItems");
            })
            .listen(".App\\Events\\Status\\StatusDeleted", ({ status }) => {
                this.$toast().info(`The status ${status.name} was deleted.`);
                this.$store.dispatch("organizationModule/statusModule/fetchAllItems");
            })
            .listen(".App\\Events\\Status\\StatusUpdated", () => {
                this.$store.dispatch("organizationModule/statusModule/fetchAllItems");
            });
    },
    beforeUnmount() {
        const organization = this.$store.getters["authModule/getUser"].organization;
        const channel = `organization-${organization.id}-status-channel`;
        window.EchoInstance.leave(channel);
    },
};
</script>