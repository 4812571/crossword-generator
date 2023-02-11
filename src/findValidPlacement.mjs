const directions = [
    // Cardinals
    { x: 0, y: 1 },
    // { x: 0, y: -1 },
    { x: 1, y: 0 },
    // { x: -1, y: 0 },

    // Diagonals
    { x: 1, y: 1 },
    { x: 1, y: -1 },
    // { x: -1, y: 1 },
    // { x: -1, y: -1 }
]

function canPlaceLetter(grid, position, letter) {
    const { x, y } = position;

    // If the row doesn't exist, the letter doesn't fit
    if (grid[y] === undefined) {
        return false;
    }

    if (grid[y][x] === undefined) {
        return false;
    }

    // If there is no letter in the cell, we can place the letter
    if (grid[y][x] === null) {
        return true;
    }

    // If the letter in the cell is the same as the letter we want to place, we can place the letter
    if (grid[y][x] === letter) {
        return true;
    }
}

function canPlaceWord(grid, position, direction, word) {
    const { x, y } = position;
    const { x: dx, y: dy } = direction;

    for (let i = 0; i < word.length; i++) {
        const currentPosition = { x: x + (i * dx), y: y + (i * dy) };

        if (!canPlaceLetter(grid, currentPosition, word[i])) {
            return false;
        }
    }

    return true;
}

function getValidDirections(grid, position, word) {
    return directions.filter(direction => {
        return canPlaceWord(grid, position, direction, word);
    });
}

export function findValidPlacement(grid, word) {
    // Select random offset to start iterating from
    const offsetX = Math.floor(Math.random() * grid[0].length);
    const offsetY = Math.floor(Math.random() * grid.length);

    // Iterate through the grid
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            const position = { x: (x + offsetX) % grid[y].length, y: (y + offsetY) % grid.length };

            const validDirections = getValidDirections(grid, position, word);

            if (validDirections.length > 0) {
                return { position, directions: validDirections };
            }
        }
    }

    return null;
}