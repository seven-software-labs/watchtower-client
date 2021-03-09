<template>
    <x-layouts-auth>
        <form class="space-y-6" action="#" method="POST" @submit.prevent="submitLoginForm(loginForm)">
            <div>
                <x-form-label for="email">
                    Email address
                </x-form-label>
                <x-form-input type="email" v-model="loginForm.email" required/>
            </div>

            <div>
                <x-form-label for="password">
                    Password
                </x-form-label>
                <x-form-input type="password" v-model="loginForm.password" required/>
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
                <x-button type="submit" color="blue" class="w-full flex items-center justify-center">
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
                email: "",
                password: "",
            },
        };
    },
    methods: {
        submitLoginForm(payload) {
            this.$store.dispatch("authModule/login", payload)
                .then(() => {
                    this.$router.push({
                        name: "tickets.index"
                    });
                });
        },
    },
};
</script>
