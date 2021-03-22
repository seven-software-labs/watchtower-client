<template>
    <x-layouts-panel>
        <template v-slot:asideLeft v-if="mode == 'edit'">
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
            <x-section>
                <x-section-header>
                    <template v-slot:title>
                        <template v-if="$route.params.organization && createEditForm.name">
                            {{ createEditForm.name }}
                        </template>

                        <template v-else>
                            Create Organization
                        </template>
                    </template>
                </x-section-header>  

                <x-section-toolbar>
                    <x-button form="createEditForm" type="submit" color="primary">
                        Save Organization
                    </x-button>

                    <x-button type="submit" color="white" :to="{ name: 'organizations.index' }">
                        Cancel
                    </x-button>
                </x-section-toolbar>
                
                <x-vertical-scroll>
                    <x-form id="createEditForm" @submit.prevent="submitCreateEditForm(createEditForm, mode)">
                        <x-table>
                            <thead>
                                <x-table-row>
                                    <x-table-header colspan="100%">
                                        General Information
                                    </x-table-header>
                                </x-table-row>
                            </thead>

                            <x-table-row>
                                <x-table-data>
                                    Name
                                </x-table-data>
                                
                                <x-table-data>
                                    <x-form-input type="text" name="name" :required="true" v-model="createEditForm.name"/>
                                </x-table-data>
                            </x-table-row>
                        </x-table>
                    </x-form>         
                </x-vertical-scroll>
            </x-section>      
        </template>
    </x-layouts-panel>
</template>

<script>
export default {
    data() {
        return {
            mode: "create",
            createEditForm: {
                name: "",
                color: "gray",
                is_active: 0,
            },
            menu: [
                {
                    header: "Organization",
                    items: [
                        {
                            label: "General Settings",
                            route: { name: "account.profile" },
                        },
                        {
                            label: "Tickets",
                            route: { name: "account.settings" },
                        },
                        {
                            label: "Users",
                            route: { name: "account.settings" },
                        },
                    ],
                },
            ],            
        };
    },
    created() {
        const { params } = this.$route;

        if(params.organization) {
            this.$store.dispatch("organizationModule/fetchOneItem", params.organization)
                .then((organization) => {
                    this.createEditForm.name = organization.name;
                    this.mode = "edit";
                });
        }
    },
    methods: {
        submitCreateEditForm(payload, mode) {
            if(mode == "create")
                this.submitCreateForm(payload);
            if(mode == "edit")
                this.submitEditForm(payload);
        },
        submitCreateForm(payload) {
            this.$store.dispatch("organizationModule/storeItem", payload)
                .then((organization) => {
                    this.$router.push({
                        name: "organizations.edit",
                        params: { organization: organization.id },
                    });

                    // @todo add toast for success message.
                })
                .catch(() => {
                    // @todo add toast for error message.
                });
        },
        submitEditForm(payload) {
            this.$store.dispatch("organizationModule/updateItem", { id: this.$route.params.organization, payload })
                .then(() => {
                    // @todo add toast for success message.
                })
                .catch(() => {
                    // @todo add toast for error message.
                });
        },
    },
};
</script>