<template>
    <x-vertical-scroll id="ticket-message-viewer" class="pb-6">
        <ticket-message-card 
            :message="message" 
            v-for="(message, messageIndex) in messages" 
            :key="'message_' + messageIndex"
        />
    </x-vertical-scroll>

    <ticket-message-editor :ticket="ticket" @message-created="onMessageCreated"/>
</template>

<script>
import TicketMessageCard from "./ticket-message-card.vue";
import TicketMessageEditor from "./ticket-message-editor.vue";

export default {
    components: {
        TicketMessageCard,
        TicketMessageEditor,
    },
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
        onMessageCreated(message) {
            this.messages.push(message);
        },
        scrollViewer() {
            console.log("Scrolling Into View");
            const messageViewer = document.querySelector("#ticket-message-viewer");
            messageViewer.scrollTop = messageViewer.scrollHeight + 99999;
        },
    },
    mounted() {
        window.EchoInstance.private(`organization-${this.ticket.organization_id}-ticket-${this.ticket.id}-channel`)
            .listen(".App\\Events\\Message\\MessageCreated", ({ message }) => {
                const localMessage = this.messages.find((localMessage) => localMessage.id == message.id);
                
                if(!localMessage) {
                    this.messages.push(message);
                }
            })
            .listen(".App\\Events\\Message\\MessageUpdated", ({ message }) => {
                const localMessage = this.messages.find((localMessage) => localMessage.id == message.id);
                localMessage.is_sent = message.is_sent;
                localMessage.is_delivered = message.is_delivered;
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