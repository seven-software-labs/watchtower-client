/**
 * Component Status Mixin.
 * 
 * Provides common loading states and functions.
 */

const componentStatusMixin = {
    data() {
        return {
            isLoading: false,
            isInitializing: true,
        };
    },
    methods: {
        toggleLoading(delay = 0) {
            setTimeout(() => {
                this.isLoading = !this.isLoading;
            }, delay);
        },
        toggleInitialize(delay = 0) {
            setTimeout(() => {
                this.isInitializing = !this.isInitializing;
            }, delay);
        },
    },
};

export default componentStatusMixin;