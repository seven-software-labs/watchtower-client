<template>
    <x-section>
        <x-section-header>
            <template v-slot:title>
                Departments
            </template>
        </x-section-header>
        
        <x-section-toolbar>
            <x-button :to="{ name: 'settings.departments.create' }" color="primary">
                Create Department
            </x-button>
        </x-section-toolbar>

        <x-vertical-scroll>
            <x-department-table/>
        </x-vertical-scroll>
    </x-section>
</template>

<script>
import DepartmentTable from "./../../../../components/application/department/department-table.vue";

export default {
    components: {
        "x-department-table": DepartmentTable,
    },
};
</script>