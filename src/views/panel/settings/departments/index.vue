<template>
    <x-section>
        <x-section-header>
            <template v-slot:title>
                Departments
            </template>
        </x-section-header>
        
        <x-section-toolbar>
            <x-button :to="{ name: 'settings.departments.create' }" color="primary">
                Create Department
            </x-button>
        </x-section-toolbar>

        <x-vertical-scroll v-if="!isInitializing">
            <x-table>
                <thead>
                    <x-table-row>
                        <x-table-header>Name</x-table-header>
                        <x-table-header>Color</x-table-header>
                        <x-table-header class="text-right">Channels</x-table-header>
                        <x-table-header class="text-right">Tickets</x-table-header>
                    </x-table-row>
                </thead>

                <tbody>
                    <x-table-row v-for="({ id, name, channels_count, tickets_count, is_default, color, deleted_at }, departmentIndex) in departments.data" :key="'department_' + departmentIndex">
                        <x-table-data>
                            <x-link class="mr-2" :to="{ name: 'settings.departments.edit', params: { department: id } }" :disabled="deleted_at">
                                {{ name }}
                            </x-link>

                            <x-badge color="green" v-if="is_default">
                                Default
                            </x-badge>
                        </x-table-data>

                        <x-table-data>
                            <x-badge :color="color">
                                <x-icon name="folder-small" :color="color"/>
                                <span class="capitalize">
                                    {{ color }}
                                </span>
                            </x-badge>
                        </x-table-data>

                        <x-table-data align="right">
                            <x-badge>
                                {{ channels_count }}
                            </x-badge>
                        </x-table-data>

                        <x-table-data align="right">
                            <x-badge>
                                {{ tickets_count }}
                            </x-badge>
                        </x-table-data>
                    </x-table-row>

                    <x-table-row v-if="!departments || (departments.length < 1)">
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
        ...mapGetters("organizationModule/departmentModule", {
            departments: "getItems",
        }),
    },
    created() {
        this.$store.dispatch("organizationModule/departmentModule/fetchAllItems")
            .finally(() => {
                this.toggleInitialize();
            });
    },
    mounted() {
        const organization = this.$store.getters["authModule/getUser"].organization;
        const channel = `organization-${organization.id}-department-channel`;

        window.EchoInstance.private(channel)
            .listen(".App\\Events\\Department\\DepartmentCreated", ({ department }) => {
                this.$toast().info(`The department ${department.name} was created.`);
                this.$store.dispatch("organizationModule/departmentModule/fetchAllItems");
            })
            .listen(".App\\Events\\Department\\DepartmentDeleted", ({ department }) => {
                this.$toast().info(`The department ${department.name} was deleted.`);
                this.$store.dispatch("organizationModule/departmentModule/fetchAllItems");
            })
            .listen(".App\\Events\\Department\\DepartmentUpdated", () => {
                this.$store.dispatch("organizationModule/departmentModule/fetchAllItems");
            });
    },
    beforeUnmount() {
        const organization = this.$store.getters["authModule/getUser"].organization;
        const channel = `organization-${organization.id}-department-channel`;
        window.EchoInstance.leave(channel);
    },
};
</script>