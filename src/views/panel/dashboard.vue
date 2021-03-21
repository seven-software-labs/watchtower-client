<template>
    <x-layouts-panel>
        <template v-slot:area>
            <div class="w-full h-full flex flex-col items-center justify-center bg-white">
                <span class="block text-4xl text-primary-500 uppercase font-black tracking-widest">
                    Watchtower
                </span>

                <span class="block text-gray-800 uppercase">
                    Next generation ticketing system
                </span>

                <div class="py-4 space-x-2">
                    <x-button color="primary" :to="{ name: 'tickets' }">
                        View Tickets
                    </x-button>

                    <x-button color="white" :to="{ name: 'settings' }">
                        Settings
                    </x-button>
                </div>
            </div>
        </template>
    </x-layouts-panel>
</template>

<script>
export default {
    mounted() {
        console.log(this.$me.user());
    }
}
</script>