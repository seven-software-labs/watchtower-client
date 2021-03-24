<template>
    <div>
        <p class="text-center text-sm font-semibold uppercase text-gray-500 tracking-wide">
            Available on multiple platforms.
        </p>

        <div class="mt-6 grid grid-cols-2 gap-1 md:grid-cols-6 lg:grid-cols-5">
            <div class="bg-gray-50 py-4 col-span-1 flex justify-center md:col-span-2 lg:col-span-1" v-for="(platform, platformIndex) in platforms" :key="'platform_' + platformIndex">
                <img class="h-12" :src="platform.image" :alt="platform.label">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            platforms: [
                {
                    "label": "Email",
                    "image": "https://tailwindui.com/img/logos/tuple-logo-gray-400.svg",
                },
                {
                    "label": "Twitter",
                    "image": "https://tailwindui.com/img/logos/mirage-logo-gray-400.svg",
                },
                {
                    "label": "Facebook",
                    "image": "https://tailwindui.com/img/logos/statickit-logo-gray-400.svg",
                },
                {
                    "label": "Telegram",
                    "image": "https://tailwindui.com/img/logos/transistor-logo-gray-400.svg",
                },
                {
                    "label": "WhatsApp",
                    "image": "https://tailwindui.com/img/logos/workcation-logo-gray-400.svg",
                },
            ],
        };
    },
}
</script>