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
                    header: "Organization Settings",
                    items: [
                        {
                            label: "General",
                            route: { path: "#" },
                        },
                        {
                            label: "Channels",
                            route: { name: "settings.channels.list" },
                        },
                    ],
                },
                {
                    header: "Data Management",
                    items: [
                        {
                            label: "Departments",
                            route: { path: "#" },
                        },
                        {
                            label: "Priorities",
                            route: { path: "#" },
                        },
                        {
                            label: "Statuses",
                            route: { path: "#" },
                        },
                    ],
                },
            ],
        };
    },
    methods: {
        // ...
    },
};
</script>