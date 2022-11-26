<template>
    <q-dialog ref="dialog" @hide="onDialogHide" persistent>
        <q-card class="q-dialog-plugin q-pa-sm">
            <q-card-section class="text-h4"> Victories </q-card-section>
            <q-card-section class="q-my-md text-h6">
                <template v-if="victories.length">
                    <q-markup-table separator="horizontal" flat bordered class="text-subtitle2">
                        <tbody>
                            <tr v-for="(result, idx) in victories" :key="idx">
                                <td class="text-center"><q-icon v-for="x in result.difficultyLevel + 1" :key="x" name="star" color="yellow" /></td>
                                <td class="text-left">#{{ result.level }}</td>
                                <td class="row items-center text-left"><q-icon name="o_lightbulb" outline /> {{ result.hintCount }}</td>
                                <td class="text-left">{{ this.displayTime(result.time) }}</td>
                            </tr>
                        </tbody>
                    </q-markup-table>
                </template>
                <template v-else><div class="text-body1">No items in this list</div></template>
            </q-card-section>
            <q-card-section align="right">
                <q-btn label="Close" outline color="primary" @click="hide" />
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script>
export default {
    name: "VictoryHistoryScreen",
    props: {
        victories: {
            type: Array,
            required: true,
        },
    },
    emits: ["ok", "hide"],
    methods: {
        show() {
            this.$refs.dialog.show();
        },
        hide() {
            this.$refs.dialog.hide();
        },
        onDialogHide() {
            this.$emit("hide");
        },

        displayTime(time) {
            const s = time % 60;
            const m = Math.floor(time / 60);

            return m.toString().padStart(2, "0") + ":" + s.toString().padStart(2, "0");
        },
    },
};
</script>
