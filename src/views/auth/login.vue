<template>
    <x-layouts-auth background="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940">
        <template v-slot:page-title>
            Sign in to your account
        </template>

        <template v-slot:page-description>
            Or <x-link :to="{ name: 'auth.register' }">start your 30-day free trial</x-link>.
        </template>

        <form class="space-y-6" action="#" method="POST" @submit.prevent="submitLoginForm(loginForm)">
            <x-form-group>
                <x-form-label for="username">
                    Organization Subdomain
                </x-form-label>
                <x-form-input type="text" v-model="loginForm.organization_subdomain" required :disabled="isLoading"/>
            </x-form-group>

            <x-form-group>
                <x-form-label for="username">
                    Email address
                </x-form-label>
                <x-form-input type="email" v-model="loginForm.username" required :disabled="isLoading"/>
            </x-form-group>

            <x-form-group>
                <x-form-label for="password">
                    Password
                </x-form-label>
                <x-form-input type="password" v-model="loginForm.password" required :disabled="isLoading"/>
            </x-form-group>

            <div>
                <x-button type="submit" color="primary" class="w-full flex items-center justify-center" :disabled="isLoading">
                    Sign in
                </x-button>
            </div>
        </form>
    </x-layouts-auth>
</template>

<script>
export default {
    data() {
        return {
            loginForm: {
                organization_subdomain: import.meta.env.VITE_TEST_ORGANIZATION_SUBDOMAIN || "",
                username: import.meta.env.VITE_TEST_EMAIL || "",
                password: import.meta.env.VITE_TEST_PASSWORD || "",
            },
        };
    },
    methods: {
        submitLoginForm(payload) {
            this.toggleLoading();

            this.$auth.login({
                username: `${payload.organization_subdomain}:${payload.username}`,
                password: payload.password,
            })
                .then(() => {
                    this.$router.push({
                        name: "panel.dashboard"
                    });
                })
                .catch((error) => {
                    console.log("error");
                    console.log(error);
                    console.log(error.response);
                    this.$toast().danger(error.response.data.message);
                })
                .finally(() => {
                    this.toggleLoading();
                });
        },
    },
};
</script>
