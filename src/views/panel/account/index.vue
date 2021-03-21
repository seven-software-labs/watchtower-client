<template>
    <x-layouts-panel>
        <template v-slot:asideLeft>
            <x-section-header>
                <template v-slot:title>
                    {{ $me.user().name }}
                </template>
            </x-section-header>
            
            <div v-for="(menu, menuIndex) in menu" :key="'menu_' + menuIndex">
                <x-vertical-menu-header>
                    {{ menu.header }}
                </x-vertical-menu-header>

                <x-vertical-menu-item :to="menuItem.route" :active="$route.name == menuItem.route.name" v-for="(menuItem, menuItemIndex) in menu.items" :key="'menuItem_' + menuItemIndex">
                    {{ menuItem.label }}
                </x-vertical-menu-item>
            </div>
        </template>

        <template v-slot:default>
            <router-view/>
        </template>
    </x-layouts-panel>
</template>

<script>
export default {
    data() {
        return {
            menu: [
                {
                    header: "My Account",
                    items: [
                        {
                            label: "User Profile",
                            route: { name: "account.profile" },
                        },
                        {
                            label: "Account Settings",
                            route: { name: "account.settings" },
                        },
                    ],
                },
            ],
        };
    },
};
</script>