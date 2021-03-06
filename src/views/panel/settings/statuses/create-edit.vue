<template>
    <div>
        <x-section-header>
            <template v-slot:title>
                <template v-if="createEditForm.name">
                    {{ createEditForm.name }}
                </template>

                <template v-else>
                    Create Status
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

                <x-table-row>
                    <x-table-data>
                        <x-form-label>
                            Color
                        </x-form-label>
                    </x-table-data>

                    <x-table-data>
                        <x-form-select name="color" :required="true" v-model="createEditForm.color">
                                <option value="gray">Gray</option>
                                <option value="primary">Primary</option>
                                <option value="secondary">Secondary</option>
                                <option value="red">Red</option>
                                <option value="orange">Orange</option>
                                <option value="yellow">Yellow</option>
                                <option value="green">Green</option>
                                <option value="blue">Blue</option>
                                <option value="indigo">Indigo</option>
                                <option value="purple">Purple</option>
                                <option value="pink">Pink</option>
                            </x-form-select>
                    </x-table-data>
                </x-table-row>

                <x-table-row>
                    <x-table-data>
                        <x-form-label>
                            Default
                        </x-form-label>
                    </x-table-data>

                    <x-table-data>
                        <x-form-select name="is_active" v-model="createEditForm.is_active" :required="true">
                            <option :value="1">Yes</option>
                            <option :value="0">No</option>
                        </x-form-select>
                    </x-table-data>
                </x-table-row>
            </x-table>

            <x-card>
                <x-card-footer>
                    <x-button type="submit" color="blue">
                        Save Status
                    </x-button>

                    <x-button type="submit" color="white" :to="{ name: 'settings.statuses.index' }">
                        Cancel
                    </x-button>
                </x-card-footer>
             </x-card>
        </x-form>   
    </div>
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

        if(params.status) {
            this.$store.dispatch("organizationModule/statusModule/fetchOneItem", params.status)
                .then((response) => {
                    const status = response;
                    this.createEditForm.name = status.name;
                    this.createEditForm.color = status.color;
                    this.createEditForm.is_active = status.is_active;
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
            this.$store.dispatch("organizationModule/statusModule/storeItem", payload)
                .then((status) => {
                    this.$router.push({
                        name: "settings.statuses.edit",
                        params: { status: status.id },
                    });

                    // @todo add toast for success message.
                })
                .catch(() => {
                    // @todo add toast for error message.
                });
        },
        submitEditForm(payload) {
            this.$store.dispatch("organizationModule/statusModule/updateItem", { id: this.$route.params.status, payload })
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