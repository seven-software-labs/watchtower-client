<template>
    <x-layouts-auth>
        <template v-slot:title>
            Create Account    
        </template>

        <template v-slot:description>
            Already have an account? <x-link :to="{ name: 'auth.login' }">Login</x-link> instead.
        </template>

        <template v-slot:showcase>
            <img class="absolute inset-0 h-full w-full object-cover" src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="">
            <div class="w-full h-full flex space-y-1 flex-col items-center justify-center absolute top-0 left-0" style="background: rgba(0,0,0,.7)">
                <div class="w-full max-w-xl space-y-2">
                    <h1 class="text-4xl text-white font-bold text-left font-serif">
                        Simple, transparent pricing.
                    </h1>

                    <p class="mt-4 text-xl text-gray-100">
                        No hidden charges, no additional fees, cancel anytime. All plans come with a 14-day free trial.
                    </p>
                    <div class="pt-2 grid grid-cols-2 gap-6">
                        <div class="flex flex-col rounded-lg shadow-lg overflow-hidden">
                            <div class="h-full px-6 py-8 bg-white">
                                <div>
                                    <h3 class="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-gray-100 text-gray-600" id="tier-standard">
                                    Monthly
                                    </h3>
                                </div>

                                <div class="mt-4 flex items-baseline text-5xl font-extrabold">
                                    $12
                                    <span class="ml-1 text-2xl font-medium text-gray-500">
                                    /user
                                    </span>
                                </div>

                                <p class="mt-5 text-lg text-gray-500">
                                    Get all the features that Watchtower has.
                                </p>

                                <div class="mt-5">
                                    <x-button color="white" class="w-full flex items-center justify-center">
                                        Select Monthly
                                    </x-button>
                                </div>
                            </div>
                        </div>

                        <div class="flex flex-col rounded-lg shadow-lg overflow-hidden">
                            <div class="h-full px-6 py-8 bg-white">
                                <div>
                                    <h3 class="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-primary-100 text-primary-600" id="tier-standard">
                                        Yearly
                                    </h3>
                                </div>
                                <div class="mt-4 flex items-baseline text-5xl font-extrabold">
                                    $9
                                    <span class="ml-1 text-2xl font-medium text-gray-500">
                                    /user
                                    </span>
                                </div>
                                <p class="mt-5 text-lg text-gray-500">
                                    All the features plus a 25% discount.
                                </p>

                                <div class="mt-5">
                                    <x-button color="success" class="w-full flex items-center justify-center">
                                        <svg class="w-5 h-5 mr-1 text-success-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                        </svg>
                                        Selected
                                    </x-button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </template>

        <form class="space-y-6" action="#" method="POST" @submit.prevent="submitLoginForm(loginForm)">
            <div>
                <x-form-label for="email">
                    Organization Name
                </x-form-label>
                <x-form-input type="email" v-model="loginForm.email" required/>
            </div>

            <div>
                <x-form-label for="email">
                    Organization Subdomain
                </x-form-label>
                <x-form-input type="email" v-model="loginForm.email" required/>
            </div>
            
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

            <div>
                <x-form-label for="password">
                    Confirm Password
                </x-form-label>
                <x-form-input type="password" v-model="loginForm.password" required/>
            </div>

            <div>
                <x-button type="submit" color="blue" class="w-full flex items-center justify-center">
                    Create Account
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
                .then((response) => {
                    console.log("Helo", response);
                    this.$router.push({
                        name: "tickets.index"
                    });
                })
                .catch((error) => {
                    console.log(error);
                    console.log(error.response);
                });
        },
    },
};
</script>
