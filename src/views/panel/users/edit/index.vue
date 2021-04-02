<template>
    <x-layouts-panel>
        <template v-slot:asideLeft>
            <x-section-header>
                <template v-slot:title>
                    <template v-if="isLoading">
                        Loading User
                    </template>

                    <template v-else>
                        <div class="truncate whitespace-nowrap">
                            {{ user.name }}
                        </div>
                    </template>
                </template>
            </x-section-header>

            <div v-for="(menu, menuIndex) in menu" :key="'menu_' + menuIndex" v-if="user && user.id">
                <x-vertical-menu-header>
                    {{ menu.header }}
                </x-vertical-menu-header>

                <x-vertical-menu-item :to="menuItem.route" :active="$route.name == menuItem.route.name" v-for="(menuItem, menuItemIndex) in menu.items" :key="'menuItem_' + menuItemIndex">
                    {{ menuItem.label }}
                </x-vertical-menu-item>
            </div>
        </template>

        <template v-slot:default>
            <router-view :user="user" v-if="user"/>
        </template>
    </x-layouts-panel>
</template>

<script>
export default {
    data() {
        return {
            isLoading: true,
            user: null,
        };
    },
    computed: {
        menu() {
            if(!this.user) {
                return {};
            }

            return [
                {
                    header: "Manage User",
                    items: [
                        {
                            label: "General",
                            route: { name: "users.edit.general", params: { user: this.user.id } },
                        },
                        {
                            label: "Channels",
                            route: { name: "users.edit.channels", params: { user: this.user.id } },
                        },
                        {
                            label: "Tickets",
                            route: { name: "users.edit.tickets", params: { user: this.user.id } },
                        },
                    ],
                },
            ];
        },
    },
    created() {
        this.$store.dispatch("userModule/fetchOneItem", this.$route.params.user)
            .then((user) => {
                this.user = user;

                window.EchoInstance.private(`user-${user.master_organization_id}-user-${user.id}-channel`)
                    .listen(".App\\Events\\User\\UserUpdated", ({ user }) => {
                        this.user = user;
                    })
                    .listen(".App\\Events\\User\\UserDeleted", ({ user }) => {
                        this.user.deleted_at = user.deleted_at;
                    });                    
            })
            .catch((error) => {
                this.$toast().danger(error.response.data.message);
            })
            .finally(() => {
                this.toggleLoading();
            });
    },
    beforeUnmount() {
        const user = this.user;
        window.EchoInstance.leave(`user-${user.master_organization_id}-user-${user.id}-channel`);
    },
};
</script>