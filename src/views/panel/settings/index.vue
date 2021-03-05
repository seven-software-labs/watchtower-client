<template>
    <x-layouts-panel>
        <template v-slot:asideLeft>
            <x-section-header>
                <template v-slot:title>
                    Settings
                </template>
            </x-section-header>

            <x-table>
                <thead>
                    <x-table-row>
                        <x-table-header>
                            Organization Settings
                        </x-table-header>
                    </x-table-row>
                </thead>

                <tbody>
                    <x-table-row>
                        <x-table-data>General</x-table-data>
                    </x-table-row>

                    <x-table-row>
                        <x-table-data>Channels</x-table-data>
                    </x-table-row>
                </tbody>
            </x-table>

            <x-table>
                <thead>
                    <x-table-row>
                        <x-table-header>
                            Data Management
                        </x-table-header>
                    </x-table-row>
                </thead>

                <tbody>
                    <x-table-row>
                        <x-table-data>
                            Departments
                        </x-table-data>
                    </x-table-row>

                    <x-table-row>
                        <x-table-data>
                            Priorities
                        </x-table-data>
                    </x-table-row>

                    <x-table-row>
                        <x-table-data>
                            Statuses
                        </x-table-data>
                    </x-table-row>
                </tbody>
            </x-table>
        </template>

        <template v-slot:default>
            <x-layouts-container/>
        </template>
    </x-layouts-panel>
</template>

<script>

</script>