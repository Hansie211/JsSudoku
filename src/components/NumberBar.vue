<template>
    <div id="number-bar">
        <div v-for="index in Math.ceil(size / 2)" :key="index">
            <q-btn v-for="value in columnNumbers(index)" :key="value" size="xl" color="white" outline padding="none" class="number-btn" @click="() => $emit('click', value)">
                <div style="display: flex; flex-direction: column; height: 100%; justify-content: flex-start; width: 100%; padding-bottom: 10px; padding-top: 10px" :class="classObject(value)">
                    <div style="position: relative; display: flex; justify-content: center; align-items: center; margin-top: -8px; margin-bottom: 4px">
                        {{ value }}
                    </div>
                    <div style="height: 100%; display: flex; flex-direction: row; justify-content: center; align-items: center">
                        <q-icon name="adjust" class="number-icon active-icon q-pa-none q-ma-none" padding="none" size="sm" />
                        <q-icon name="done_all" class="number-icon completed-icon q-pa-none q-ma-none" padding="none" size="sm" />
                    </div>
                </div>
            </q-btn>
            <div v-if="columnNumbers(index).length === 1" class="number-btn"></div>
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
        /** @type {Array<Number> */
        completedNumbers: {
            type: Array,
            default: () => [],
        },
    },
    emits: ["click"],
    methods: {
        classObject(value) {
            console.log(this.completedNumbers);
            return {
                "active-number": this.activeNumbers.includes(value),
                "inactive-number": this.inactiveNumbers.includes(value),
                "completed-number": this.completedNumbers.includes(value),
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
    justify-content: space-evenly;
    align-items: center;
}

.number-btn {
    margin-left: 4px;
    margin-right: 4px;
    margin-top: 3px;
    margin-bottom: 3px;
    width: 2em;
    height: 40%;
    flex-grow: 0;
    flex-shrink: 0;
}

.number-icon {
    font-size: 0.5em !important;
    display: none;
    margin-left: 1px;
    margin-right: 1px;
}

.active-number .active-icon {
    display: block;
}

.completed-number .completed-icon {
    display: block;
}

.inactive-number {
    opacity: 0.6;
}

.circle {
    position: absolute;
    width: 80%;
    top: 0;
    bottom: 0;
    border-bottom: 1px double black;
}
</style>
