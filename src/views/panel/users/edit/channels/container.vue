<template>
    <router-view :user="user" v-if="user"/>
</template>

<script>
export default {
    props: {
        user: {
            type: Object,
            required: true,
        },
    },
}
</script>