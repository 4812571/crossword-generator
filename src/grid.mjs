export function generateGrid(width, height, value) {
    return new Array(height).fill(null).map(() => {
        return new Array(width).fill(value);
    })
}

export function mapGrid(grid, callback) {
    return grid.map((row, y) => {
        return row.map((cell, x) => {
            return callback(cell, x, y);
        });
    });
}