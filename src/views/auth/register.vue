<template>
    <div class="w-full h-full xl:overflow-y-auto">
        <div class="w-full border-b py-4 flex items-center justify-center">
            <x-application-logo />
        </div>

        <div class="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:py-12 lg:px-8">
            <h1 class="text-3xl font-extrabold text-gray-900">
                Create an Account
            </h1>

            <div class="bg-blue-50 border-l-4 border-blue-400 p-4 mt-6">
                <div class="flex">
                    <div class="flex-shrink-0">
                        <!-- Heroicon name: solid/exclamation -->
                        <svg class="h-5 w-5 text-blue-400" x-description="Heroicon name: solid/information-circle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                        </svg>
                    </div>

                    <div class="ml-3">
                        <p class="text-sm text-blue-700">
                            Your 30-day free trial will automatically be applied.
                        </p>
                    </div>
                </div>
            </div>

            <x-form class="mt-6 space-y-8 divide-y divide-y-blue-gray-200" @submit.prevent="submitRegisterForm(registerForm)">
                <div class="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                    <div class="sm:col-span-6">
                        <h2 class="text-xl font-medium text-gray-900">Organization</h2>
                        <p class="mt-1 text-sm text-gray-500">Tell us about the organization you're registering whether this is your company or just yourself.</p>
                    </div>

                    <div class="sm:col-span-6 space-y-1">
                        <x-form-label>Name</x-form-label>
                        <x-form-input v-model="registerForm.organization_name" type="text" class="max-w-full" />
                    </div>
                </div>

                <div class="pt-8 grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                    <div class="sm:col-span-6">
                        <h2 class="text-xl font-medium text-gray-900">Personal Information</h2>
                        <p class="mt-1 text-sm text-gray-500">We use this information to create your personal account inside the organization.</p>
                    </div>

                    <div class="sm:col-span-6 space-y-1">
                        <x-form-label>Full Name</x-form-label>
                        <x-form-input v-model="registerForm.name" type="text" class="max-w-full" :required="true" />
                    </div>

                    <div class="sm:col-span-6 space-y-1">
                        <x-form-label>Email</x-form-label>
                        <x-form-input v-model="registerForm.email" type="email" class="max-w-full" :required="true" />
                    </div>

                    <div class="sm:col-span-3 space-y-1">
                        <x-form-label>Password</x-form-label>
                        <x-form-input v-model="registerForm.password" type="password" class="max-w-full" :required="true" />
                    </div>

                    <div class="sm:col-span-3 space-y-1">
                        <x-form-label>Confirm Password</x-form-label>
                        <x-form-input v-model="registerForm.password_confirmation" type="password" class="max-w-full" :required="true" />
                    </div>
                </div>

                <div class="pt-8 text-right space-x-0 sm:space-x-2 space-y-2 sm:space-y-0">
                    <x-button color="primary" class="w-full sm:w-auto">
                        Create Account
                    </x-button>

                    <x-button :to="{ name: 'auth.login' }" color="white" class="w-full sm:w-auto">
                        Cancel
                    </x-button>
                </div>
            </x-form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            registerForm: {
                email: import.meta.env.VITE_TEST_EMAIL || "",
                name: import.meta.env.VITE_TEST_NAME || "",
                password: import.meta.env.VITE_TEST_PASSWORD || "",
                password_confirmation: import.meta.env.VITE_TEST_PASSWORD || "",
                organization_name: import.meta.env.VITE_TEST_ORGANIZATION_NAME || "",
            },
        };
    },
    methods: {
        submitRegisterForm(payload) {
            this.$auth.register(payload)
                .then((response) => {
                    const user = response.data;

                    return this.$auth.login({
                        username: `${user.master_organization.subdomain}:${payload.email}`,
                        password: payload.password,
                    });
                })
                .then(() => {
                    this.$router.push({
                        name: "panel.dashboard"
                    });
                })
                .catch((error) => {
                    console.log("error", error);
                    this.$toast().danger(error.response.data.message);
                });
        },
    },
};
</script>
