<template>
    <div style="display: flex; flex-direction: row; align-items: center"><q-icon v-for="index in starCount" :key="index" :size="size" name="star" :color="starColor" /></div>
</template>
<script>
import { getStarColor, getStarCount } from "src/lib/difficulties";
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
            return getStarCount(this.level);
        },
        starColor() {
            return getStarColor(this.level);
        },
    },
});
</script>
