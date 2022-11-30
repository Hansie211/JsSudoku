import Difficulty from "src/data/difficulty.json";

const DifficultyLevels = Difficulty.levels.map((x, idx) => {
    x.level = idx;
    return x;
});

export default DifficultyLevels;

export const STARS_PER_LEVEL = 3;

/**
 * @param {Number} level
 * @returns {String}
 */
export function getStarColor(level) {
    const starLevel = Math.max(0, Math.min(Math.floor(level / STARS_PER_LEVEL), Difficulty.starColors.length - 1));
    return Difficulty.starColors[starLevel];
}

/**
 * @param {Number} level
 * @returns {Number}
 */
export function getStarCount(level) {
    return Math.max(0, level % STARS_PER_LEVEL) + 1;
}
