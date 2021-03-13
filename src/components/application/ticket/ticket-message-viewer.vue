<template>
    <div class="w-full h-full space-y-4">
        <div class="max-w-3xl" :class="(message.user.is_customer) ? 'mr-auto':'ml-auto'" v-for="(message, messageIndex) in ticket.messages" :key="'message_' + messageIndex">
            <x-card>
                <div :class="(message.message_type_id == 1) ? 'bg-primary-100':'bg-yellow-100'">
                    <x-card-content>
                        <div class="sm:flex sm:justify-between sm:items-baseline">
                            <h3 class="text-base font-medium">
                                <span class="text-gray-900">{{ message.user.name }}</span>
                            </h3>

                            <p class="mt-1 text-sm text-gray-600 whitespace-nowrap sm:mt-0 sm:ml-3">
                                <time datetime="2021-01-28T19:24">{{ message.source_created_at }}</time>
                            </p>
                        </div>

                        <div class="mt-4 space-y-6 text-sm text-gray-800" v-if="message && message.content">
                            <x-iframe :content="message.content"/>
                        </div>
                    </x-card-content>
                </div>
            </x-card>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        ticket: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            messages: [],
            messageForm: {
                content: "",
                user_id: 1, // Replace this with logged in user later on.
            },
        };
    },
    created() {
        this.messages = this.ticket.messages;
    },
    methods: {
        submitMessageForm(payload, message_type_id) {
            this.toggleLoading();

            // Attach more payload items.
            payload.ticket_id = this.ticket.id;
            payload.message_type_id = message_type_id;

            this.$store.dispatch("organizationModule/messageModule/storeItem", payload)
                .then(() => {
                    this.$toast().success("Message sent!");
                })
                .catch((error) => {
                    this.$toast().danger(error.response.data.message);
                })
                .finally(() => {
                    this.toggleLoading();
                });
        },
    },
    mounted() {
        window.EchoInstance.private(`organization-${this.ticket.organization_id}-ticket-${this.ticket.id}-channel`)
            .listen(".App\\Events\\Message\\MessageCreated", ({ message }) => {
                console.log("Updated Ticket", {
                    message,
                });

                this.messages.push(message);
            });
    },
    beforeUnmount() {
        if(this.ticket) {
            const channel = `organization-${this.ticket.organization_id}-ticket-${this.ticket.id}-channel`;
            window.EchoInstance.leave(channel);
        }
    },
};
</script>