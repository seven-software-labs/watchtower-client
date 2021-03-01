<template>
    <x-layouts-panel>
        <template v-slot:default>
            <x-section-header>
                <template v-slot:title>
                    Organization
                </template>
            </x-section-header>

            <x-table>
                <thead>
                    <x-table-row>
                        <x-table-header>Name</x-table-header>
                        <x-table-header class="text-right"># of Members</x-table-header>
                    </x-table-row>
                </thead>

                <tbody>
                    <x-table-row>
                        <x-table-data>
                            <x-link href="#">
                                O'Leary Funds
                            </x-link>
                        </x-table-data>

                        <x-table-data align="right">
                            <x-badge>15</x-badge>
                        </x-table-data>
                    </x-table-row>
                </tbody>
            </x-table>
        </template>
    </x-layouts-panel>
</template>