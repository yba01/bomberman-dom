import { createElement } from "../core/dom.js";
export let player1 = createElement('div', {id:'player1'}),
    player2 = createElement('div', {id:'player2'}),
    player3 = createElement('div', {id:'player3'}),
    player4 = createElement('div', {id:'player4'})

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


    return  createElement('div',{id:"theMap", style:"width:100%; height:100%"},...tileDivs, player1, player2, player3, player4);
}
