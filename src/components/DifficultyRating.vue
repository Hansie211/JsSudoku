<template>
    <div style="display: flex; flex-direction: row; align-items: center"><q-icon v-for="index in starCount" :key="index" :size="size" name="star" color="yellow" /></div>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
    name: "DifficultyRating",
    props: {
        level: {
            type: Number,
            required: true,
        },
        size: {
            type: String,
            default: "",
        },
    },
    computed: {
        starCount() {
            return this.level + 1;
        },
    },
});
</script>
