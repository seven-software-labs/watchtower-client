<template>
    <div>
        <x-section-header>
            <template v-slot:title>
                <template v-if="createEditForm.name">
                    Editing {{ createEditForm.name }}
                </template>

                <template v-else>
                    Create Priority
                </template>
            </template>
        </x-section-header>   

        <x-form @submit.prevent="submitCreateEditForm(createEditForm, mode)">
             <x-card>
                <x-card-content>
                    <div class="grid grid-cols-6 gap-6">
                        <x-form-group class="col-span-2">
                            <x-form-label>Name</x-form-label>
                            <x-form-input type="text" name="name" :required="true" v-model="createEditForm.name"/>
                        </x-form-group>

                        <x-form-group class="col-span-2">
                            <x-form-label>Color</x-form-label>
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
                        </x-form-group>

                        <x-form-group class="col-span-2">
                            <x-form-label>Default</x-form-label>
                            <x-form-select name="is_active" v-model="createEditForm.is_active" :required="true">
                                <option :value="1">Yes</option>
                                <option :value="0">No</option>
                            </x-form-select>
                        </x-form-group>
                    </div>
                </x-card-content>
                
                <x-card-footer>
                    <x-button type="submit" color="blue">
                        Save Priority
                    </x-button>

                    <x-button type="submit" color="white" :to="{ name: 'settings.priorities.index' }">
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

        if(params.priority) {
            this.$store.dispatch("organizationModule/priorityModule/fetchOneItem", params.priority)
                .then((response) => {
                    const priority = response;
                    this.createEditForm.name = priority.name;
                    this.createEditForm.color = priority.color;
                    this.createEditForm.is_active = priority.is_active;
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
            this.$store.dispatch("organizationModule/priorityModule/storeItem", payload)
                .then((priority) => {
                    this.$router.push({
                        name: "settings.priorities.edit",
                        params: { priority: priority.id },
                    });

                    // @todo add toast for success message.
                })
                .catch(() => {
                    // @todo add toast for error message.
                });
        },
        submitEditForm(payload) {
            this.$store.dispatch("organizationModule/priorityModule/updateItem", { id: this.$route.params.priority, payload })
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