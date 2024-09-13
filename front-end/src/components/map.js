import { createElement } from "../core/dom.js";

const Divplayer1 = createElement('div', { id: 'player1' }),
    Divplayer2 = createElement('div', { id: 'player2' }),
    Divplayer3 = createElement('div', { id: 'player3' }),
    Divplayer4 = createElement('div', { id: 'player4' })


export function GameMapComponent(dataMap) {

    let tileDivs = []
    dataMap.forEach(tiles => {
        tiles.forEach((tile) => {
            switch (tile) {
                case 5:
                    tileDivs.push(createElement('div', { class: "tile break flame" }))
                    break
                case 4:
                    tileDivs.push(createElement('div', { class: "tile break speed"}))
                    break
                case 3:
                    tileDivs.push(createElement('div', { class: "tile break bombing"}))
                    break
                case 2:
                    tileDivs.push(createElement('div', { class: "tile break"}))
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


    return createElement('div', { id: "theMap", style: "width:100%; height:100%" }, ...tileDivs, Divplayer1, Divplayer2, Divplayer3, Divplayer4);
}
