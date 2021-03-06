<template>
    <div class="w-full"> 
        <x-section-header>
            <template v-slot:title>
                <template v-if="$route.params.user && createEditForm.name">
                    {{ createEditForm.name }}
                </template>

                <template v-else>
                    Create User
                </template>
            </template>
        </x-section-header>  

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
                    <x-form-input type="text" name="name" :required="true" placeholder="First and last name of the user." v-model="createEditForm.name"/>
                </x-table-data>
            </x-table-row>
            
            <x-table-row>
                <x-table-data>
                    Password
                </x-table-data>
                
                <x-table-data>
                    <x-form-input type="text" name="name" :required="true" placeholder="Leave blank to not change password." v-model="createEditForm.password"/>
                </x-table-data>
            </x-table-row>
            
            <x-table-row>
                <x-table-data>
                    Organization
                </x-table-data>
                
                <x-table-data>
                    <x-form-select name="organization_id" v-model="createEditForm.organization_id" :required="true">
                        <option :value="null">Select Organization</option>
                        <option :value="organizationOption.id" v-for="(organizationOption, organizationOptionIndex) in organizations" :key="'organizationOption_' + organizationOptionIndex">
                            {{ organizationOption.name}}
                        </option>
                    </x-form-select>
                </x-table-data>
            </x-table-row>
        </x-table>

        <x-form @submit.prevent="submitCreateEditForm(createEditForm, mode)">
             <x-card>
                <x-card-footer>
                    <x-button type="submit" color="blue">
                        Save User
                    </x-button>

                    <x-button type="submit" color="white" :to="{ name: 'users.index' }">
                        Cancel
                    </x-button>
                </x-card-footer>
             </x-card>
        </x-form>   
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    data() {
        return {
            mode: "create",
            createEditForm: {
                name: "",
                password: "",
                color: "gray",
                is_active: 0,
                organization_id: null,
            },
        };
    },
    computed: {
        ...mapGetters("organizationModule/organizationModule", {
            organizations: "getItems",
        }),
    },
    created() {
        this.$store.dispatch("organizationModule/organizationModule/fetchAllItems");

        const { params } = this.$route;

        if(params.user) {
            this.$store.dispatch("organizationModule/userModule/fetchOneItem", params.user)
                .then((user) => {
                    this.createEditForm.name = user.name;
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
            this.$store.dispatch("organizationModule/userModule/storeItem", payload)
                .then((user) => {
                    this.$router.push({
                        name: "users.edit",
                        params: { user: user.id },
                    });

                    // @todo add toast for success message.
                })
                .catch(() => {
                    // @todo add toast for error message.
                });
        },
        submitEditForm(payload) {
            this.$store.dispatch("organizationModule/userModule/updateItem", { id: this.$route.params.user, payload })
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