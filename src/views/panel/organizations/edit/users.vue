<template>
    <x-section>
        <x-section-toolbar>
            <x-button :to="{ name: 'users.create', query: { organization_id: this.$route.params.organization } }" color="primary">
                Create User
            </x-button>
        </x-section-toolbar>

        <x-vertical-scroll>
            <x-user-table :filters="{ organization_id: $route.params.organization }"/>
        </x-vertical-scroll>
    </x-section>
</template>

<script>
import UserTable from "../../../../components/application/user/user-table.vue";

export default {
    components: {
        "x-user-table": UserTable,
    },
}
</script>