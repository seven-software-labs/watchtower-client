<template>
    <x-section>
        <x-section-header>
            <template v-slot:title>
                My Profile
            </template>
        </x-section-header>

        <x-section-toolbar>
            <x-button type="submit" color="primary" :disabled="isLoading">
                Save Changes
            </x-button>
        </x-section-toolbar>

        <x-vertical-scroll>
            <x-form>
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
                            <x-form-input type="text" name="name" :disabled="isLoading" v-model="userForm.name"/>
                        </x-table-data>
                    </x-table-row>
                </x-table>
            </x-form>
        </x-vertical-scroll>
    </x-section>
</template>

<script>
export default {
    data() {
        return {
            userForm: {
                name: this.$auth().user().name,
            },
        };
    },
    created() {
        window.EchoInstance.private(`user-${this.$auth().user().id}-channel`)
            .listen(".App\\Events\\User\\UserUpdated", ({ user }) => {
                this.userForm.name = user.name;
            });
    },
    beforeUnmount() {
        if(this.priority) {
            const channel = `user-${this.$auth().user().id}-channel`;
            window.EchoInstance.leave(channel);
        }
    },
    methods: {
        submitUserForm() {
            // ...
        },
    },
};
</script>