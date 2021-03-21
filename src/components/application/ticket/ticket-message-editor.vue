<template>
    <div class="space-y-4">
        <div class="">
            <x-form-editor v-model="messageForm.content" placeholder="Type your message here." :disabled="isLoading"/>
        </div>

        <div class="space-x-2 text-right">
            <x-button color="primary" @click.prevent="submitMessageForm(messageForm, 1)" :disabled="isLoading">
                Send Reply
            </x-button>

            <x-button color="white" @click.prevent="submitMessageForm(messageForm, 2)" :disabled="isLoading">
                Send Note
            </x-button>
        </div>
    </div>
</template>

<script>
export default {
    emits: ["message-created"],
    props: {
        ticket: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            messageForm: {
                content: "",
                user_id: 1, // Replace this with logged in user later on.
            },
        };
    },
    methods: {
        submitMessageForm(payload, message_type_id) {
            this.toggleLoading();

            // Attach more payload items.
            payload.ticket_id = this.ticket.id;
            payload.message_type_id = message_type_id;

            this.$store.dispatch("messageModule/storeItem", payload)
                .then((message) => {
                    this.$emit("message-created", message);
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
};
</script>