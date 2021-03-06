<template>
    <x-layouts-panel>
        <template v-slot:asideLeft>
            <x-section-header>
                <template v-slot:title>
                    Settings
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
            <x-layouts-container/>
        </template>
    </x-layouts-panel>
</template>

<script>
export default {
    data() {
        return {
            menu: [
                {
                    header: "Tickets",
                    items: [
                        {
                            label: "Channels",
                            route: { name: "settings.channels" },
                        },
                        {
                            label: "Departments",
                            route: { name: "settings.departments" },
                        },
                        {
                            label: "Priorities",
                            route: { name: "settings.priorities" },
                        },
                        {
                            label: "Statuses",
                            route: { name: "settings.statuses" },
                        },
                    ],
                },
            ],
        };
    },
};
</script>