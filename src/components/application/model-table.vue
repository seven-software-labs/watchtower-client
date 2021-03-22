<template>   
    <x-table>
        <thead>
            <x-table-row>
                <x-table-header v-if="isLoading" colspan="100%">
                    Loading, please wait.
                </x-table-header>

                <x-table-header :class="header.align ? `text-${header.align}`:''" v-for="(header, headerIndex) in columns" :key="'header_' + headerIndex" v-if="!isLoading">
                    {{ header.label }}    
                </x-table-header>
            </x-table-row>
        </thead>

        <tbody>
            <x-table-row v-if="isLoading">
                <x-table-data colspan="100%" align="center">
                    <x-loader></x-loader>
                </x-table-data>
            </x-table-row>

            <x-table-row v-for="(row, rowIndex) in items.data" :key="'row' + rowIndex" v-if="!isLoading">
                <x-table-data v-for="(column, columnIndex) in columns" :key="'column_' + columnIndex" :align="column.align || 'left'">
                    <slot :name="'column_' + columnIndex" :row="row" :rowIndex="rowIndex" :column="column" :columnIndex="columnIndex">
                        {{ column.parse(row[columnIndex]) }}
                    </slot>    
                </x-table-data>
            </x-table-row>

            <x-table-row v-if="!isLoading && (!items.data || !items.data.length)">
                <x-table-data colspan="100%" align="center">
                    No results found.
                </x-table-data>
            </x-table-row>
        </tbody>
    </x-table>
</template>

<script>
import Loader from "./loader.vue";
import _ from "lodash";

export default {
    components: {
        "x-loader": Loader,
    },
    props: {
        model: {
            type: String,
            required: true,
        },
        columns: {
            type: Object,
            required: true,
        },
        filters: {
            type: Object,
            required: false,
        },
    },
    data() {
        return {
            isLoading: true,
            
            // Get the Vuex Module.
            module: `${_.camelCase(this.model)}Module`,

            // Get the channel that listens to the index.
            channel: `organization-${this.$me.user().master_organization.id}-${this.model}-channel`,

            // The actual items.
            items: [],
        };
    },
    methods: {
        fetchAllItems() {
            return new Promise((resolve, reject) => {
                const handleSuccess = (items) => {
                    this.items = items;
                    resolve(items);
                };

                const handleFailure = (error) => {
                    this.$toast().danger(error.response.data.message);
                    reject(error);
                };

                this.$store.dispatch(`${this.module}/fetchAllItems`, this.filters)
                    .then(handleSuccess)
                    .catch(handleFailure);
            });
        },
    },
    created() {
        this.fetchAllItems()
            .finally(() => {
                this.toggleLoading(300);
            });
    },
    mounted() {
        const channel = window.EchoInstance.private(this.channel);

        const events = [
            `.App\\Events\\${_.startCase(this.model)}\\${_.startCase(this.model)}Created`,
            `.App\\Events\\${_.startCase(this.model)}\\${_.startCase(this.model)}Deleted`,
            `.App\\Events\\${_.startCase(this.model)}\\${_.startCase(this.model)}Updated`,
        ];

        events.forEach((event) => {
            channel.listen(event, (event) => {
                this.fetchAllItems();
            });
        });
    },
    beforeUnmount() {
        window.EchoInstance.leave(this.channel);
    },    
}
</script>