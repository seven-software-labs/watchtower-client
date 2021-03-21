<template>
    <div class="h-screen overflow-hidden bg-gray-100 flex flex-col" v-if="$me.user()">
        <!-- Bottom section -->
        <div class="min-h-0 flex-1 flex overflow-hidden">
            <!-- Narrow sidebar-->
            <nav aria-label="Sidebar" class="hidden lg:block lg:flex-shrink-0 lg:overflow-y-auto">
                <div class="flex flex-col justify-between w-full h-full overflow-y-auto">
                    <div class="relative w-20 flex flex-col p-3 space-y-3">
                        <div class="w-14 h-14 flex items-center justify-center rounded-md">
                            <svg class="w-6 h-6 text-primary-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clip-rule="evenodd" />
                            </svg>
                        </div>

                        <x-icon-menu-item :to="{ name: 'panel.dashboard' }">
                            <span class="sr-only">Dashboard</span>
                            <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </x-icon-menu-item>

                        <x-icon-menu-item :to="{ name: 'tickets' }">
                            <span class="sr-only">Tickets</span>
                            <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                            </svg>
                        </x-icon-menu-item>

                        <x-icon-menu-item :to="{ name: 'users' }">
                            <span class="sr-only">Users</span>
                            <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </x-icon-menu-item>

                        <x-icon-menu-item :to="{ name: 'organizations' }">
                            <span class="sr-only">Organizations</span>
                            <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </x-icon-menu-item>

                        <x-icon-menu-item :to="{ name: 'settings' }">
                            <span class="sr-only">Settings</span>
                            <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </x-icon-menu-item>
                    </div>

                    <div class="relative w-20 flex flex-col p-3 space-y-3">
                        <x-icon-menu-item :to="{ name: 'account' }" >
                            <span class="sr-only">Account</span>
                            <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </x-icon-menu-item>

                        <x-icon-menu-item :to="{ name: 'auth.logout' }" >
                            <span class="sr-only">Logout</span>
                            <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </x-icon-menu-item>
                    </div>
                </div>
            </nav>

            <!-- Main area -->
            <main class="min-w-0 flex-1 border-gray-200 xl:flex">
                <router-view v-slot="{ Component }">
                    <transition name="fade" mode="out-in">
                        <component :is="Component" />
                    </transition>
                </router-view>
            </main>
        </div>
    </div>
</template>

<script>
import Echo from "laravel-echo";
import IconMenuItem from "./../../components/layouts/panel/icon-menu-item.vue";
import RequestClient from "./../../services/request-client";

export default {
    components: {
        "x-icon-menu-item": IconMenuItem,
    },
    mounted() {
        const user = this.$me.user();

        if(!user) {
            this.$me.fetchUser();
        }
    },
    setup () {
        window.EchoInstance = new Echo({
            authEndpoint : `${import.meta.env.VITE_API_URL}/broadcasting/auth`,
            broadcaster: "pusher",
            key: import.meta.env.VITE_ECHO_KEY,
            cluster: import.meta.env.VITE_ECHO_CLUSTER,
            encrypted: true,
            authorizer: (channel) => {
                return {
                    authorize: (socketId, callback) => {
                        RequestClient.post("/broadcasting/auth", {
                            socket_id: socketId,
                            channel_name: channel.name
                        })
                            .then(response => {
                                callback(false, response.data);
                            })
                            .catch(error => {
                                callback(true, error);
                            });
                    }
                };
            },
        });
    },
};


</script>