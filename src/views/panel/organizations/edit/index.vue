<template>
    <x-layouts-panel>
        <template v-slot:asideLeft>
            <x-section-header>
                <template v-slot:title>
                    <template v-if="isLoading">
                        Loading Organization
                    </template>

                    <template v-else>
                        <div class="truncate whitespace-nowrap">
                            {{ organization.name }}
                        </div>
                    </template>
                </template>
            </x-section-header>

            <div v-for="(menu, menuIndex) in menu" :key="'menu_' + menuIndex" v-if="organization && organization.id">
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
            isLoading: true,
            organization: null,
        };
    },
    computed: {
        menu() {
            if(!this.organization) {
                return {};
            }

            return [
                {
                    header: "Manage Organization",
                    items: [
                        {
                            label: "General",
                            route: { name: "organizations.edit.general", params: { organization: this.organization.id } },
                        },
                        {
                            label: "Tickets",
                            route: { name: "organizations.edit.tickets", params: { organization: this.organization.id } },
                        },
                        {
                            label: "Users",
                            route: { name: "organizations.edit.users", params: { organization: this.organization.id } },
                        },
                    ],
                },
            ];
        },
    },
    created() {
        this.$store.dispatch("organizationModule/fetchOneItem", this.$route.params.organization)
            .then((organization) => {
                this.organization = organization;

                window.EchoInstance.private(`organization-${organization.master_organization_id}-organization-${organization.id}-channel`)
                    .listen(".App\\Events\\Organization\\OrganizationUpdated", ({ organization }) => {
                        this.organization = organization;
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
        const organization = this.organization;
        window.EchoInstance.leave(`organization-${organization.master_organization_id}-organization-${organization.id}-channel`);
    },
};
</script>