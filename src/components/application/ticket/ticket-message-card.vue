<template>
    <div :class="containerClasses">
        <x-card :class="cardClasses">
            <x-card-content>
                <div class="sm:flex sm:justify-between sm:items-baseline">
                    <h3 class="text-base font-medium">
                        <span class="text-gray-900">
                            {{ message?.sender?.name || "Error: No Sender" }}
                        </span>
                    </h3>

                    <p class="text-sm text-gray-600 whitespace-nowrap sm:mt-0 sm:ml-3">
                        <time :datetime="message.source_created_at">
                            {{ message.source_created_at }}
                        </time>
                    </p>
                </div>

                <div class="mt-4 space-y-6 text-sm text-gray-800" v-if="message && message.content">
                    <x-iframe :content="message.content"/>
                </div>
            </x-card-content>
        </x-card>
    </div>
</template>

<script>
import { computed } from "vue";

export default {
    props: {
        message: {
            type: Object,
            required: true,
        },
    },
    setup(props) {
        const message = props.message;

        /**
         * The message source.
         */
        const source = message.sender?.is_customer
            ? 'customer'
            : 'operator';

        /**
         * The available message sources.
         */
        const sources = {
            customer: "mr-auto",
            operator: "ml-auto",
        };
        
        /**
         * The available message types.
         */
        const messageTypes = {
            1: "bg-primary-100", // Message Reply
            2: "bg-yellow-100", // Message Note
        };

        /**
         * The compiled container classes.
         */
        const containerClasses = computed(() => `x-ticket-message-card w-full max-w-3xl ${sources[source]}`);

        /**
         * The compiled card classes.
         */
        const cardClasses = computed(() => `${messageTypes[message.message_type_id]}`);

        return {
            cardClasses,
            containerClasses,
            message,
        };
    },
}
</script>