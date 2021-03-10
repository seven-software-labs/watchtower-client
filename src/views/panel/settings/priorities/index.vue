<template>
    <div v-if="!isInitializing">
        <x-section-header>
            <template v-slot:title>
                Priorities
            </template>
        </x-section-header>
        
        <x-section-toolbar>
            <x-button :to="{ name: 'settings.priorities.create' }" color="blue">
                Create Priority
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
                <x-table-row v-for="({ id, name, tickets_count, is_default, color, deleted_at }, priorityIndex) in priorities.data" :key="'priority_' + priorityIndex">
                    <x-table-data>
                        <x-link class="mr-2" :to="{ name: 'settings.priorities.edit', params: { priority: id } }" :disabled="deleted_at">
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

                <x-table-row align="center" v-if="priorities && (priorities.length < 1)">
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
        ...mapGetters("organizationModule/priorityModule", {
            priorities: "getItems",
        }),
    },
    created() {
        this.$store.dispatch("organizationModule/priorityModule/fetchAllItems")
            .finally(() => {
                this.toggleInitialize();
            });
    },
    mounted() {
        const organization = this.$store.getters["authModule/getUser"].organization;
        const channel = `organization-${organization.id}-priority-channel`;

        window.EchoInstance.private(channel)
            .listen(".App\\Events\\Priority\\PriorityCreated", ({ priority }) => {
                this.$toast().info(`The priority ${priority.name} was created.`);
                this.$store.dispatch("organizationModule/priorityModule/fetchAllItems");
            })
            .listen(".App\\Events\\Priority\\PriorityDeleted", ({ priority }) => {
                this.$toast().info(`The priority ${priority.name} was deleted.`);
                this.$store.dispatch("organizationModule/priorityModule/fetchAllItems");
            })
            .listen(".App\\Events\\Priority\\PriorityUpdated", () => {
                this.$store.dispatch("organizationModule/priorityModule/fetchAllItems");
            });
    },
    beforeUnmount() {
        const organization = this.$store.getters["authModule/getUser"].organization;
        const channel = `organization-${organization.id}-priority-channel`;
        window.EchoInstance.leave(channel);
    },
};
</script>