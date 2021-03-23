<template>
    <x-section>
        <x-section-toolbar>
            <x-button :to="{ name: 'tickets.create', query: { organization_id: this.$route.params.organization } }" color="primary">
                Create Ticket
            </x-button>
        </x-section-toolbar>

        <x-vertical-scroll>
            <x-ticket-table :filters="{ organization_id: $route.params.organization }"/>
        </x-vertical-scroll>
    </x-section>
</template>

<script>
import TicketTable from "../../../../components/application/ticket/ticket-table.vue";

export default {
    components: {
        "x-ticket-table": TicketTable,
    },
}
</script>