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

    // If the cell doesn't exist, the letter doesn't fit
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

    // Otherwise, we can't place the letter
    return false;
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
    // Get the size of the grid
    const sizeY = grid.length;
    const sizeX = grid[0].length;

    // Select random offset to start iterating from
    const offsetY = Math.floor(Math.random() * sizeY);
    const offsetX = Math.floor(Math.random() * sizeX);

    // Iterate through the grid
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            // Offset the position circularly
            // This prevents a bias towards the top left of the grid
            const posX = (x + offsetX) % sizeX;
            const posY = (y + offsetY) % sizeY;

            // Get the valid directions for the current position
            const position = { x: posX, y: posY };
            const validDirections = getValidDirections(grid, position, word);

            // If there are valid directions, return a placement object
            if (validDirections.length > 0) {
                return { position, directions: validDirections };
            }
        }
    }

    return null;
}