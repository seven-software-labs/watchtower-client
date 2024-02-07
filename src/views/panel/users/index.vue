<template>
    <x-layouts-panel>
        <template v-slot:default>
            <x-section>
                <x-section-header>
                    <template v-slot:title>
                        Users
                    </template>
                </x-section-header>
            
                <x-section-toolbar>
                    <x-button :to="{ name: 'users.create' }" color="primary">
                        Create User
                    </x-button>
                </x-section-toolbar>

                <x-vertical-scroll>
                    <x-user-table/>
                </x-vertical-scroll>
            </x-section>
        </template>
    </x-layouts-panel>
</template>

<script>
import UserTable from "./../../../components/application/user/user-table.vue";

export default {
    components: {
        "x-user-table": UserTable,
    },
};
</script>