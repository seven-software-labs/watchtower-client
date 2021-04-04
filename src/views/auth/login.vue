<template>
    <x-layouts-auth background="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940">
        <template v-slot:page-title>
            Sign in to your account
        </template>

        <template v-slot:page-description>
            Or <x-link :to="{ name: 'auth.register' }">start your 30-day free trial</x-link>.
        </template>

        <form class="space-y-6" action="#" method="POST" @submit.prevent="submitLoginForm(loginForm)">
            <div>
                <x-form-label for="username">
                    Organization Subdomain
                </x-form-label>
                <x-form-input type="text" v-model="loginForm.organization_subdomain" required :disabled="isLoading"/>
            </div>

            <div>
                <x-form-label for="username">
                    Email address
                </x-form-label>
                <x-form-input type="email" v-model="loginForm.username" required :disabled="isLoading"/>
            </div>

            <div>
                <x-form-label for="password">
                    Password
                </x-form-label>
                <x-form-input type="password" v-model="loginForm.password" required :disabled="isLoading"/>
            </div>

            <div class="flex items-center justify-between">
                <div class="flex items-center">
                    <input id="remember_me" name="remember_me" type="checkbox" class="h-4 w-4 text-primary-600 focus:ring-blue-500 border-gray-300 rounded">
                    <label for="remember_me" class="ml-2 block text-sm text-gray-900">
                    Remember me
                    </label>
                </div>

                <div class="text-sm">
                    <a href="#" class="font-medium text-primary-600 hover:text-primary-500">
                    Forgot your password?
                    </a>
                </div>
            </div>

            <div>
                <x-button type="submit" color="blue" class="w-full flex items-center justify-center" :disabled="isLoading">
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
