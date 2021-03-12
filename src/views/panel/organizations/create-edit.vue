<template>
    <x-layouts-panel>
        <template v-slot:default>
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

            <x-form @submit.prevent="submitCreateEditForm(createEditForm, mode)">
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

                <!-- <x-card-content>
                    public function channels()
                    public function tickets()
                    public function users()
                    // Invite Codes
                    <div class="grid grid-cols-6 gap-6">
                        <x-form-group class="col-span-2">
                            <x-form-label>Name</x-form-label>
                            <x-form-input type="text" name="name" :required="true" v-model="createEditForm.name"/>
                        </x-form-group>
                    </div>
                </x-card-content> -->
                
                <x-card-footer>
                    <x-button type="submit" color="blue">
                        Save Organization
                    </x-button>

                    <x-button type="submit" color="white" :to="{ name: 'organizations.index' }">
                        Cancel
                    </x-button>
                </x-card-footer>
            </x-form>               
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
        };
    },
    created() {
        const { params } = this.$route;

        if(params.organization) {
            this.$store.dispatch("organizationModule/organizationModule/fetchOneItem", params.organization)
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
            this.$store.dispatch("organizationModule/organizationModule/storeItem", payload)
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
            this.$store.dispatch("organizationModule/organizationModule/updateItem", { id: this.$route.params.organization, payload })
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