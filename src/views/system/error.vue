<template>
    <div class="w-full h-full flex flex-col items-center justify-center bg-gradient-to-r from-primary-500 to-primary-600">
        <div class="text-6xl">
            <h1>
                <span class="text-primary-300">
                    {{ $route.params.code }}
                </span>
            </h1>
            <h1 class="font-sans font-extrabold">
                <span class="text-primary-100 uppercase">{{ code }}</span>
            </h1>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                codes: {
                    "404": "Page Not Found",
                },
            };
        },
        computed: {
            code() {
                const errorCode = this.$route.params.code;

                if(!Object.keys(this.codes).includes(errorCode)) {
                    return this.codes["404"];
                }

                return this.codes[errorCode];
            },
        },
    };
</script>