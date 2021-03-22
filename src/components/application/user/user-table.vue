<template>
    <x-model-table :model="'user'" :columns="columns">
        <template v-slot:column_name="{ row: user, column }">
            <div class="flex flex-col">
                <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-50">
                        <div class="h-10 w-10 rounded-full object-cover"></div>
                        <!-- <img class="h-10 w-10 rounded-full object-cover" :src="user.profile_photo_url" alt=""> -->
                    </div>
                    <div class="ml-4 flex flex-col font-medium">
                        <x-link :to="{ name: 'users.edit', params: { user: user.id } }">
                            {{ user.name }}
                        </x-link>

                        <x-text color="muted">
                            {{ user.email }}
                        </x-text>
                    </div>
                </div>
            </div>
        </template>

        <template v-slot:column_organization="{ row: user, column, columnIndex }">
            <template v-if="user[columnIndex]">
                <x-link :to="{ name: 'organizations.edit', params: { organization: user[columnIndex].id } }">
                    {{ user[columnIndex].name }}
                </x-link>
            </template>
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
                "organization": {
                    "label": "Organization",
                    "parse" : (organization) => organization,
                },
            },
        };
    },
}
</script>
