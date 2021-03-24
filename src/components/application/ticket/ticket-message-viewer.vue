<template>
    <x-vertical-scroll id="ticket-message-viewer" class="p-6 relative border mb-4 rounded-md">
        <template v-if="isLoading">
            <div class="absolute top-0 left-0 bg-white w-full h-full flex items-center justify-center">
                <x-loader/>
            </div>
        </template>
        
        <ticket-message-card 
            :message="message" 
            v-for="(message, messageIndex) in messages.data" 
            :key="'message_' + messageIndex"
        />
    </x-vertical-scroll>

    <ticket-message-editor :ticket="ticket" @message-created="onMessageCreated"/>
</template>

<script>
import TicketMessageCard from "./ticket-message-card.vue";
import TicketMessageEditor from "./ticket-message-editor.vue";
import Loader from "./../loader.vue";
import { mapGetters } from "vuex";

export default {
    components: {
        TicketMessageCard,
        TicketMessageEditor,
        "x-loader": Loader,
    },
    props: {
        ticket: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            isLoading: true,
        };
    },
    computed: {
        ...mapGetters("messageModule", {
            messages: "getItems", 
        }),
    },
    created() {
        if(!this.isLoading) {
            this.toggleLoading();
        }

        this.$store.dispatch("messageModule/fetchAllItems", { ticket_id: this.ticket.id })
            .finally(() => {
                this.scrollViewer();
                this.toggleLoading(1500);
            });
    },
    methods: {
        onMessageCreated(message) {
            this.messages.data.push(message);
            this.scrollViewer();
        },
        scrollViewer() {
            this.$nextTick(() => {
                const messageViewer = document.querySelector("#ticket-message-viewer");
                messageViewer.scrollTop = messageViewer.scrollHeight + 99999;
            });
        },
    },
    mounted() {
        window.EchoInstance.private(`organization-${this.ticket.organization_id}-ticket-${this.ticket.id}-channel`)
            .listen(".App\\Events\\Message\\MessageCreated", ({ message }) => {
                const localMessage = this.messages.data.find((localMessage) => localMessage.id == message.id);
                
                if(!localMessage) {
                    this.messages.data.push(message);
                    this.scrollViewer();
                }
            })
            .listen(".App\\Events\\Message\\MessageUpdated", ({ message }) => {
                const localMessage = this.messages.data.find((localMessage) => localMessage.id == message.id);
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