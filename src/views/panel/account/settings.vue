<template>
    <x-section>
        <x-section-header>
            <template v-slot:title>
                Account Settings
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
                            Email
                        </x-table-data>

                        <x-table-data>
                            <x-form-input type="email" name="email" :disabled="isLoading" v-model="userForm.email"/>
                        </x-table-data>
                    </x-table-row>
                    
                    <x-table-row>
                        <x-table-data>
                            Password
                        </x-table-data>

                        <x-table-data>
                            <x-form-input type="password" name="password" :disabled="isLoading" v-model="userForm.password"/>
                        </x-table-data>
                    </x-table-row>
                    
                    <x-table-row>
                        <x-table-data>
                            Confirm Password
                        </x-table-data>

                        <x-table-data>
                            <x-form-input type="password" name="password_confirmation" :disabled="isLoading" v-model="userForm.password_confirmation"/>
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
                email: this.$auth().user().email,
                password: "",
                password_confirmation: "",
            },
        };
    },
    created() {
        window.EchoInstance.private(`user-${this.$auth().user().id}-channel`)
            .listen(".App\\Events\\User\\UserUpdated", ({ user }) => {
                this.userForm.email = user.email;
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
            this.userForm.password = "";
            this.userForm.password_confirmation = "";
        },
    },
};
</script>