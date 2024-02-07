<template>
    <x-layouts-panel>
        <template v-slot:default>
            <x-section>
                <x-section-header>
                    <template v-slot:title>
                        Organizations
                    </template>
                </x-section-header>
            
                <x-section-toolbar>
                    <x-button :to="{ name: 'organizations.create' }" color="primary">
                        Create Organization
                    </x-button>
                </x-section-toolbar>
                
                <x-vertical-scroll>
                    <x-organization-table/>
                </x-vertical-scroll>
            </x-section>
        </template>
    </x-layouts-panel>
</template>

<script>
import OrganizationTable from "./../../../components/application/organization/organization-table.vue";

export default {
    components: {
        "x-organization-table": OrganizationTable,
    },
};
</script>