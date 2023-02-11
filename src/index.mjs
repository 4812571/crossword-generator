import { generateGrid, mapGrid } from "./grid.mjs";
import { randomLetter } from "./randomLetter.mjs";
import { findValidPlacement } from "./findValidPlacement.mjs";
import { placeWord } from "./placeWord.mjs";

function selectRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function generateWordSearch(width, height, words) {
    const grid = generateGrid(width, height, null);

    for (const word of words) {
        // Get a placement to place the word into the grid
        const placement = findValidPlacement(grid, word);

        // If no placement was found, we can't place the word, and we should throw an error
        if (placement === null) {
            throw new Error(`Unable to place word ${word} into grid`);
        }

        // Destructure the placement object
        const { position, directions } = placement;

        // Select a random direction to place the word
        const direction = selectRandom(directions);

        // Place the word into the grid
        placeWord(grid, word, position, direction);
    }

    // Fill in the rest of the grid with random letters
    return mapGrid(grid, cell => {
        if (cell === null) {
            return randomLetter();
        }

        return cell;
    })
}