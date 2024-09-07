import { createElement } from "../core/dom.js";

// Create a Block component that represents each block in the grid
function Block() {
    return createElement('div', { 
        class: 'block',
        style: 'width: 30px; height: 30px; border: 1px solid black;'
    });
}

// Create the Game Map component which renders the grid based on the specified rows and columns
function GameMapComponent(rows, cols) {
    const blocks = [];

    // Generate the grid by creating the appropriate number of blocks
    for (let row = 0; row < rows; row++) {
        const rowBlocks = [];

        for (let col = 0; col < cols; col++) {
            rowBlocks.push(Block());
        }

        // Wrap each row of blocks inside a row container
        const rowElement = createElement('div', { 
            class: 'block-row', 
            style: 'display: flex;' 
        }, ...rowBlocks);
        
        blocks.push(rowElement);
    }

    // Wrap all rows inside a map container
    const gameMapContainer = createElement('div', { 
        class: 'game-map',
        style: 'display: flex; flex-direction: column;'
    }, ...blocks);

    return gameMapContainer;
}

export default GameMapComponent;