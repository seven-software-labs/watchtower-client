<template>
    <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
            <component :is="Component" class="h-full overflow-hidden"/>
        </transition>
    </router-view>
</template>