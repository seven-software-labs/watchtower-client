<template>
    <div class="w-full h-full">
        <div class="rounded-sm overflow-hidden" v-html="content">
        </div>
    </div>
</template>

<script>
export default {
    props: {
        content: {
            type: String,
            required: false,
            default: () => "This is iframe content.",
        },
    },
    data() {
        return {
            identifier: null,
            height: 0,
        };
    },
    beforeMount() {
        this.identifier = this.generateIdentifier();
    },
    methods: {
        generateIdentifier(length = 40) {
            var result = "";
            var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var charactersLength = characters.length;

            for ( var i = 0; i < length; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }

            return result;
        },
        onFrameLoad() {
            this.resizeFrame();
            
            window.addEventListener("resize", () => {
                this.resizeFrame();
            });
        },
        resizeIframe() {
            const frame = document.getElementById(this.identifier);
            const frameScrollHeight = frame.contentWindow.document.body.scrollHeight;
            // const frameOffsetHeight = frame.contentWindow.document.body.offsetHeight;
            this.height = frameScrollHeight;

            // console.table([
            //     ["Scroll Height", "Offset Height"],
            //     [frameScrollHeight, frameOffsetHeight],
            // ]);
        },
    },
};
</script>