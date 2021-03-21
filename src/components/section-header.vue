<template>
    <div class="flex-shrink-0">
        <div class="pb-3 flex items-center justify-between">
            <div class="" :class="showDescription ? '':''">
                <h2 class="text-ls font-medium text-gray-900">
                    <slot name="title"></slot>
                </h2>

                <x-text color="muted" v-if="showDescription">
                    <slot name="description"></slot>
                </x-text>
            </div>

            <div class="flex space-x-2">
                <slot name="actions"></slot>
            </div>
        </div>
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