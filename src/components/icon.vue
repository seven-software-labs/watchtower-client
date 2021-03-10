<template>
    <div :class="classes">
        <component :is="`${name}-icon`"/>
    </div>
</template>

<script>
import { computed } from "vue";
import Circle from "./icons/circle.vue";
import FolderSmall from "./icons/folder-sm.vue";
import Square from "./icons/square.vue";
import TrashSmall from "./icons/trash-sm.vue";
import UserAddSmall from "./icons/user-add-sm.vue";

export default {
    name: "x-icon",
    inheritAttrs: false,
    components: {
        "circle-icon": Circle,
        "folder-small-icon": FolderSmall,
        "square-icon": Square,
        "trash-small": TrashSmall,
        "user-add-small": UserAddSmall,
    },
    props: {
        name: {
            type: String,
            required: false,
            default: () => "",
        },
        color: {
            type: String,
            required: false,
            default: () => "gray",
        },
    },
    setup(props) {
        // Base classes for the component.
        const baseClasses = "x-icon mr-1 h-6 inline-flex items-center justify-center";

        // List of available colors for the component.
        const colors = {
            black: "text-gray-900",
            gray: "text-gray-500",
            primary: "text-primary-500",
            secondary: "text-secondary-500",
            success: "text-success-500",
            warning: "text-warning-500",
            danger: "text-danger-500",
            red: "text-red-500",
            orange: "text-orange-500",
            yellow: "text-yellow-500",
            green: "text-green-500",
            blue: "text-primary-500",
            indigo: "text-indigo-500",
            purple: "text-purple-500",
            pink: "text-pink-500",
        };

        const compiledClasses = computed(() => {
            return `${baseClasses} ${colors[props.color]}`;
        });

        return {
            classes: compiledClasses,
        };
    },
};
</script>