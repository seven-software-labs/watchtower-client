<template>
    <main class="min-w-0 flex-1 border-gray-200 xl:flex">
        <slot name="area">
            <section aria-labelledby="message-heading" class="bg-white px-2 min-w-0 flex-1 h-full">
                <x-container class="h-full mx-auto flex flex-col overflow-hidden xl:order-last py-3">
                    <slot></slot>
                </x-container>
            </section>
        </slot>

        <!-- Left Column -->
        <aside class="hidden xl:block xl:flex-shrink-0 xl:order-first" v-if="showAsideLeft">
            <div class="h-full relative w-72 bg-gray-50">
                <x-container class="py-3">
                    <slot name="asideLeft"></slot>
                </x-container>
            </div>
        </aside>
    </main>
</template>

<script>
import { computed, defineComponent } from "vue";

export default defineComponent({
    setup(props, { slots }) {
        const showAsideLeft = computed(() => !!slots.asideLeft);

        return {
            showAsideLeft,
        };
    },
});
</script>
