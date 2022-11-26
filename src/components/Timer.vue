<template>
    <div>{{ time }}</div>
</template>
<script>
import { defineComponent, ref, watch } from "vue";
import { useQuasar } from "quasar";

/**
 * @param {String} str
 * @param {Number} defaultValue
 * @returns {Number}
 */
function parseDefault(str, defaultValue) {
    const num = parseInt(str);
    if (isNaN(num)) return defaultValue;
    return num;
}

export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Timer",
    emits: ["update"],
    exposes: ["reset"],
    props: {
        initialValue: {
            type: Number,
            default: 0,
        },
    },
    setup(props, context) {
        const $q = useQuasar();

        const seconds = ref(parseDefault(props.initialValue, 0));
        const timer = ref(0);

        const updateTimer = () => {
            seconds.value++;
            context.emit("update", seconds.value);
        };

        watch(
            () => $q.appVisible,
            (val) => {
                if (val) {
                    timer.value = window.setInterval(updateTimer, 1000);
                } else {
                    window.clearInterval(timer.value);
                }
                console.debug(val ? "App became visible" : "App went in the background");
            },
            { immediate: true }
        );

        return {
            seconds,
            timer,
        };
    },
    methods: {
        reset() {
            this.seconds = 0;
        },
    },
    computed: {
        time() {
            const s = this.seconds % 60;
            const m = Math.floor(this.seconds / 60);

            return m.toString().padStart(2, "0") + ":" + s.toString().padStart(2, "0");
        },
    },
});
</script>
