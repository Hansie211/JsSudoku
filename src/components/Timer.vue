<template>
    <div>{{ time }}</div>
</template>
<script>
import { defineComponent, ref, watch } from "vue";
import { useQuasar } from "quasar";

export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Timer",
    emits: ["update"],
    setup(_, context) {
        const $q = useQuasar();

        const seconds = ref(0);
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
    computed: {
        time() {
            const s = this.seconds % 60;
            const m = Math.floor(this.seconds / 60);

            return m.toString().padStart(2, "0") + ":" + s.toString().padStart(2, "0");
        },
    },
});
</script>
