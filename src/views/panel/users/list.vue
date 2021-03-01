<template>
    <x-layouts-panel>
        <template v-slot:default>
            <x-section-header>
                <template v-slot:title>
                    Users
                </template>
            </x-section-header>

            <x-table>
                <thead>
                    <x-table-row>
                        <x-table-header>User</x-table-header>
                        <x-table-header>Organization</x-table-header>
                        <x-table-header>Status</x-table-header>
                    </x-table-row>
                </thead>

                <tbody>
                    <x-table-row>
                        <x-table-data class="flex flex-col">
                            <div class="flex items-center">
                                <div class="flex-shrink-0 h-10 w-10">
                                    <img class="h-10 w-10 rounded-full object-cover" src="https://ei.marketwatch.com/Multimedia/2019/08/01/Photos/ZG/MW-HO614_KevinO_20190801104821_ZG.jpg?uuid=685e86fc-b46b-11e9-8493-9c8e992d421e" alt="">
                                </div>
                                <div class="ml-4 flex flex-col font-medium">
                                    <x-link href="#">
                                        Kevin'O Leary
                                    </x-link>

                                    <x-text color="muted">
                                        mr@wonderful.com
                                    </x-text>
                                </div>
                            </div>
                        </x-table-data>

                        <x-table-data>
                            <x-link href="#">
                                O'Leary Funds
                            </x-link>
                        </x-table-data>

                        <x-table-data>
                            <x-badge color="success">
                                Active
                            </x-badge>
                        </x-table-data>
                    </x-table-row>
                </tbody>
            </x-table>
        </template>
    </x-layouts-panel>
</template>