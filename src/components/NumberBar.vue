<template>
    <div id="number-bar">
        <div v-for="index in Math.ceil(size / 2)" :key="index">
            <q-btn v-for="value in columnNumbers(index)" :key="value" size="xl" color="white" outline padding="none" class="number-btn" @click="() => $emit('click', value)"
                ><div style="display: flex; flex-direction: column; height: 100%; justify-content: flex-start" :class="classObject(value)">
                    {{ value }}
                    <q-icon name="close" class="number-icon active-icon q-pa-none q-ma-none" padding="none" size="sm" />
                </div>
            </q-btn>
        </div>
    </div>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
    name: "NumberBar",
    props: {
        size: {
            type: Number,
            required: true,
        },
        /** @type {Array<Number> */
        activeNumbers: {
            type: Array,
            default: () => [],
        },
        /** @type {Array<Number> */
        inactiveNumbers: {
            type: Array,
            default: () => [],
        },
    },
    emits: ["click"],
    methods: {
        classObject(value) {
            return {
                "active-number": this.activeNumbers.includes(value),
                "inactive-number": this.inactiveNumbers.includes(value),
            };
        },
        columnNumbers(colIndex) {
            const lowVal = colIndex;
            const highVal = colIndex + Math.ceil(this.size / 2);
            if (highVal > this.size) return [lowVal];

            return [lowVal, highVal];
        },
    },
});
</script>
<style scoped>
#number-bar {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex-grow: 1;
    min-height: 0;
    max-height: 100%;
    height: 100%;

    padding-bottom: 10px;
}

#number-bar > div {
    height: 100%;

    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
}

.number-btn {
    margin-left: 4px;
    margin-right: 4px;
    margin-top: 3px;
    margin-bottom: 3px;
    width: 2em;
    height: 45%;
    flex-grow: 0;
    flex-shrink: 0;
}

.number-icon {
    font-size: 0.5em !important;
}

.active-icon {
    opacity: 0;
}

.active-number > .active-icon {
    opacity: 1;
}

.inactive-number {
    opacity: 0.6;
}
</style>
