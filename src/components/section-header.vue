<template>
    <div class="flex-shrink-0 bg-white border-b border-gray-200">
        <x-container class="py-4 bg-white flex flex-col justify-center">
            <div class="flex">
                <div class="" :class="showDescription ? '':'py-1.5 mt-0.5'">
                    <h2 class="text-ls font-medium text-gray-900">
                        <slot name="title"></slot>
                    </h2>

                    <x-text color="muted" v-if="showDescription">
                        <slot name="description"></slot>
                    </x-text>
                </div>

                <div class="flex space-x-2">
                    <slot name="toolbar"></slot>
                </div>
            </div>
        </x-container>
    </div>
</template>

<script>
import { computed, defineComponent } from "vue";

export default defineComponent({
    setup(props, { slots }) {
        const showDescription = computed(() => !!slots.description);

        return {
            showDescription,
        };
    },
});
</script>