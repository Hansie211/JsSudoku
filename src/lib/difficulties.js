import Difficulty from "src/data/difficulty.json";

const Difficulties = Difficulty.map((x, idx) => {
    x.level = idx;
    return x;
});

export default Difficulties;
