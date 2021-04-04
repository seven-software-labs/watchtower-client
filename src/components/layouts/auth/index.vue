<template>
    <div class="min-h-screen bg-white flex">
        <div class="hidden lg:block relative w-0 flex-1" v-if="background">
            <slot name="showcase">
                <img class="absolute inset-0 h-full w-full object-cover" :src="background">
                <div class="w-full h-full flex space-y-1 flex-col items-center justify-center absolute top-0 left-0" style="background: rgba(0,0,0,.7)">
                    <div class="max-w-xl space-y-2">
                        <x-heading :size="1" class="text-white font-bold uppercase">
                            Keep it light
                        </x-heading>

                        <x-paragraph class="text-gray-200 text-lg">
                            Focus on growing your business, not fighting with your software; Watchtower keeps your customer interactions simple and straightforward.
                        </x-paragraph>
                    </div>
                </div>
            </slot>
        </div>

        <div class="mx-auto flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-gradient-to-r">
            <div class="w-full mx-auto space-y-6 max-w-sm lg:w-96">
                <x-application-logo />

                <div>
                    <x-heading :size="2">
                        <slot name="page-title">
                            Page Title
                        </slot>
                    </x-heading>

                    <x-paragraph>
                        <slot name="page-description">
                            This is a page description.
                        </slot>
                    </x-paragraph>
                </div>

                <div>
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, reactive } from "vue";

export default defineComponent({
    props: {
        background: {
            type: String,
            required: false,
        },
    },
});
</script>
