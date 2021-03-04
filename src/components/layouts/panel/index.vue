<template>
    <main class="min-w-0 flex-1 border-gray-200 xl:flex">
        <section aria-labelledby="message-heading" class="min-w-0 flex-1 h-full flex flex-col overflow-hidden xl:order-last">
            <slot></slot>
        </section>

        <!-- Left Column -->
        <aside class="hidden xl:block xl:flex-shrink-0 xl:order-first" v-if="showAsideLeft">
            <div class="h-full relative w-72 border-r border-gray-200 bg-white">
                <slot name="asideLeft"></slot>
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
