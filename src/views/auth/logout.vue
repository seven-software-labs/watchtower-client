<template>
    <div class="w-full h-full flex items-center justify-center bg-gray-100">
        <h1 class="text-md font-thin uppercase">
            Logging out.
        </h1>
    </div>
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
    created() {
        this.submitLogoutForm();
    },
    methods: {
        submitLogoutForm() {
            this.$store.dispatch("authModule/logout")
                .then(() => {
                    this.$toast().success("Successfully logged out.");
                })
                .catch((error) => {
                    this.$toast().danger(error.response.data.message);
                })
                .finally(() => {
                    this.$router.push({ name: "auth.login" });
                });
        },
    },
};
</script>