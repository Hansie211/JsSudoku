import Difficulty from "src/data/difficulty.json";

const DifficultyLevels = Difficulty.levels.map((x, idx) => {
    x.level = idx;
    return x;
});

export default DifficultyLevels;
