<template>
    <x-section>
        <x-section-header>
            <template v-slot:title>
                My Profile
            </template>
        </x-section-header>

        <x-section-toolbar>
            <x-button form="updateProfileForm" type="submit" color="primary" :disabled="isLoading">
                Save Changes
            </x-button>
        </x-section-toolbar>

        <x-vertical-scroll>
            <x-form id="updateProfileForm" @submit.prevent="submitUpdateProfileForm">
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
                            <x-form-input type="email" name="email" :disabled="isLoading" v-model="updateProfileForm.email" required="required"/>
                        </x-table-data>
                    </x-table-row>
                    
                    <x-table-row>
                        <x-table-data>
                            Name
                        </x-table-data>

                        <x-table-data>
                            <x-form-input type="text" name="name" :disabled="isLoading" v-model="updateProfileForm.name" required="required"/>
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
            updateProfileForm: {
                email: this.$me.user().email,
                name: this.$me.user().name,
            },
        };
    },
    created() {
        window.EchoInstance.private(`user-${this.$me.user().id}-channel`)
            .listen(".App\\Events\\User\\UserUpdated", ({ user }) => {
                this.updateProfileForm.name = user.name;
            });
    },
    beforeUnmount() {
        const channel = `user-${this.$me.user().id}-channel`;
        window.EchoInstance.leave(channel);
    },
    methods: {
        submitUpdateProfileForm() {
            this.toggleLoading();

            this.$auth.updateProfile(this.updateProfileForm)
                .then(() => {
                    this.$toast().success("Successfully updated profile!");
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