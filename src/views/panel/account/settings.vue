<template>
    <x-section>
        <x-section-header>
            <template v-slot:title>
                Account Settings
            </template>
        </x-section-header>

        <x-section-toolbar>
            <x-button form="updatePasswordForm" type="submit" color="primary" :disabled="isLoading">
                Save Changes
            </x-button>
        </x-section-toolbar>

        <x-vertical-scroll>
            <x-form id="updatePasswordForm" @submit.prevent="submitUpdatePasswordForm">
                <x-table>
                    <thead>
                        <x-table-row>
                            <x-table-header colspan="100%">
                                Security Information
                            </x-table-header>
                        </x-table-row>
                    </thead>
                    
                    <x-table-row>
                        <x-table-data>
                            Current Password
                        </x-table-data>

                        <x-table-data>
                            <x-form-input type="password" name="current_password" :disabled="isLoading" v-model="updatePasswordForm.current_password" required="required"/>
                        </x-table-data>
                    </x-table-row>
                    
                    <x-table-row>
                        <x-table-data>
                            New Password
                        </x-table-data>

                        <x-table-data>
                            <x-form-input type="password" name="new_password" :disabled="isLoading" v-model="updatePasswordForm.new_password" required="required"/>
                        </x-table-data>
                    </x-table-row>
                    
                    <x-table-row>
                        <x-table-data>
                            Confirm Password
                        </x-table-data>

                        <x-table-data>
                            <x-form-input type="password" name="new_password_confirmation" :disabled="isLoading" v-model="updatePasswordForm.new_password_confirmation" required="required"/>
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
            updatePasswordForm: {
                current_password: "",
                new_password: "",
                new_password_confirmation: "",
            },
        };
    },
    created() {
        window.EchoInstance.private(`user-${this.$me.user().id}-channel`)
            .listen(".App\\Events\\User\\UserUpdated", ({ user }) => {
                // ...
            });
    },
    beforeUnmount() {
        const channel = `user-${this.$me.user().id}-channel`;
        window.EchoInstance.leave(channel);
    },
    methods: {
        submitUpdatePasswordForm() {
            this.toggleLoading();

            this.$auth.updatePassword(this.updatePasswordForm)
                .then(() => {
                    this.$toast().success("Successfully updated password!");
                    this.updatePasswordForm.current_password = "";
                    this.updatePasswordForm.new_password = "";
                    this.updatePasswordForm.new_password_confirmation = "";
                })
                .catch((error) => {
                    this.$toast().danger(error.response.data.message);
                })
                .finally(() => {
                    this.toggleLoading();
                });
        },
    },
};
</script>