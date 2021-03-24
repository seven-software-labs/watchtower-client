<template>
    <div class="relative py-12">
        <svg class="absolute top-0 left-full transform -translate-x-1/2 -translate-y-3/4 lg:left-auto lg:right-full lg:translate-x-2/3 lg:translate-y-1/4" width="404" height="784" fill="none" viewBox="0 0 404 784" aria-hidden="true">
        <defs>
            <pattern id="8b1b5f72-e944-4457-af67-0c6d15a99f38" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
            </pattern>
        </defs>
        <rect width="404" height="784" fill="url(#8b1b5f72-e944-4457-af67-0c6d15a99f38)" />
        </svg>

        <div class="relative lg:grid lg:grid-cols-3 lg:gap-x-8">
        <div class="lg:col-span-1">
            <h2 class="text-3xl font-montserrat font-bold uppercase tracking-tight text-gray-900 sm:text-4xl">
                Keep your work simple.
            </h2>
        </div>
        <dl class="mt-10 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 lg:mt-0 lg:col-span-2">
            <div v-for="(feature, featureIndex) in features" :key="'feature_' + featureIndex">
                <dt>
                    <div class="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-primary-500 to-primary-600 text-white">
                        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                        </svg>
                    </div>

                    <p class="mt-5 text-lg leading-6 font-bold text-gray-900 uppercase font-kollektif">
                        {{ feature.label }}
                    </p>
                </dt>

                <dd class="mt-2 text-base text-gray-500 font-montserrat">
                    {{ feature.description }}
                </dd>
            </div>
        </dl>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            features: [
                {
                    "icon": "",
                    "label": "No Bloatware",
                    "description": "Sollicitudin tristique eros erat odio sed vitae, consequat turpis elementum. Lorem nibh vel, eget pretium arcu vitae.",
                },
                {
                    "icon": "",
                    "label": "Transparent Pricing",
                    "description": "Sollicitudin tristique eros erat odio sed vitae, consequat turpis elementum. Lorem nibh vel, eget pretium arcu vitae.",
                },
                {
                    "icon": "",
                    "label": "Multiple Channels",
                    "description": "Sollicitudin tristique eros erat odio sed vitae, consequat turpis elementum. Lorem nibh vel, eget pretium arcu vitae.",
                },
                {
                    "icon": "",
                    "label": "Easy Setup",
                    "description": "Sollicitudin tristique eros erat odio sed vitae, consequat turpis elementum. Lorem nibh vel, eget pretium arcu vitae.",
                },
            ],
        };
    },
}
</script>