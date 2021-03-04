<template>
    <x-layouts-panel>
        <template v-slot:default>
            <x-section-header>
                <template v-slot:title>
                    Users
                </template>
            </x-section-header>

            <x-table>
                <thead>
                    <x-table-row>
                        <x-table-header>User</x-table-header>
                        <x-table-header>Organization</x-table-header>
                    </x-table-row>
                </thead>

                <tbody>
                    <x-table-row v-for="(user, userIndex) in users" :key="'user_' + userIndex">
                        <x-table-data class="flex flex-col">
                            <div class="flex items-center">
                                <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-50">
                                    <img class="h-10 w-10 rounded-full object-cover" :src="user.profile_photo_url" alt="">
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
                        </x-table-data>

                        <x-table-data>
                            <x-link :to="{ name: 'organizations.edit', params: { organization: user.primary_organization.id } }" v-if="user.primary_organization">
                                {{ user.primary_organization.name }}
                            </x-link>
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
        ...mapGetters("userModule", {
            users: "getItems",
        }),
    },
    created() {
        this.$store.dispatch("userModule/fetchAllItems");
    },
};
</script>