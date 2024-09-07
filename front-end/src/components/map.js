import { createElement } from "../core/dom.js";

export function GameMapComponent(dataMap) {
   
    let tileDivs = []
    dataMap.forEach(tiles => {
        tiles.forEach((tile) => {
            switch (tile) {
                case 2:
                    tileDivs.push(createElement('div', { class: "tile break" }))
                    break
                case 1:
                    tileDivs.push(createElement('div', { class: "tile unbreak" }))
                    break
                default:
                    tileDivs.push(createElement('div', { class: "tile" }))
                    break

            }
        })
    });

    return  createElement('div',{},...tileDivs);
}
