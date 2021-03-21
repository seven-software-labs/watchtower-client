<template>
    <div class="w-full h-full flex items-center justify-center bg-gray-100">
        <h1 class="text-md font-thin uppercase">
            Logging out.
        </h1>
    </div>
</template>

<script>
export default {
    created() {
        this.submitLogoutForm();
    },
    methods: {
        submitLogoutForm() {
            this.$auth.removeCookies();
            this.$router.push({ name: "auth.login" });
        },
    },
};
</script>