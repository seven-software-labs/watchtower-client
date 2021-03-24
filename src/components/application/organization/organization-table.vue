<template>
    <x-model-table :model="'organization'" :columns="columns">
        <template v-slot:column_name="{ row: organization, column }">
            <x-link :to="{ name: 'organizations.edit', params: { organization: organization.id } }">
                {{ organization.name }}
            </x-link>
        </template>

        <template v-slot:column_users_count="{ row: organization }">
            <x-badge>
                {{ organization.users_count }}
            </x-badge>
        </template>
    </x-model-table>
</template>

<script>
export default {
    data() {
        return {
            columns: {
                "name": {
                    "label": "Name",
                    "parse" : (name) => name,
                },
                "users_count": {
                    "label": "# of Users",
                    "parse" : (users_count) => users_count,
                },
            },
        };
    },
}
</script>
