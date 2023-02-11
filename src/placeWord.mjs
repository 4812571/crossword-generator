export function placeWord(grid, word, position, direction) {
    const { x, y } = position;
    const { x: dx, y: dy } = direction;

    for (let i = 0; i < word.length; i++) {
        const posX = x + (i * dx);
        const posY = y + (i * dy);
        grid[posY][posX] = word[i];
    }
}