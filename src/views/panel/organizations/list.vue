<template>
    <x-layouts-panel>
        <template v-slot:default>
            <x-section-header>
                <template v-slot:title>
                    Organization
                </template>
            </x-section-header>

            <x-table>
                <thead>
                    <x-table-row>
                        <x-table-header>Name</x-table-header>
                        <x-table-header class="text-right"># of Members</x-table-header>
                    </x-table-row>
                </thead>

                <tbody>
                    <x-table-row v-for="(organization, organizationIndex) in organizations" :key="'organization_' + organizationIndex">
                        <x-table-data>
                            <x-link :to="{ name: 'organizations.edit', params: { organization: organization.id } }">
                                {{ organization.name }}
                            </x-link>
                        </x-table-data>

                        <x-table-data align="right">
                            <x-badge>
                                {{ organization.users_count }}
                            </x-badge>
                        </x-table-data>
                    </x-table-row>
                </tbody>
            </x-table>
        </template>
    </x-layouts-panel>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    computed: {
        ...mapGetters("organizationModule/organizationModule", {
            organizations: "getItems",
        }),
    },
    created() {
        this.$store.dispatch("organizationModule/organizationModule/fetchAllItems");
    },
};
</script>