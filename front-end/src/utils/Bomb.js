import { stateManager } from "../app.js"
import { mapLayout, tiles } from "./Player.js"

let BombOn1, BombOn2, BombOn3, BombOn4 = false

export function PlaceBomb(message) {
    console.log(message.Player.InGameName);

    switch (message.Player.InGameName) {
        case "player1":
            console.log(BombOn1);

            if (!BombOn1) {
                let bombX = message.Player.Bomb_X
                let bombY = message.Player.Bomb_Y

                let indexBomb = (bombY * 19) + bombX
                console.log(tiles);

                let bomb = tiles[indexBomb]
                console.log(bomb);

                bomb.classList.remove("explode");
                bomb.classList.add("bomb");
                BombOn1 = true
                setTimeout(explodeBomb, 2000, bomb, indexBomb, tiles, bombY, bombX, message.Player.InGameName);

            }
            break
        case "player2":

            if (!BombOn2) {
                let bombX = message.Player.Bomb_X
                let bombY = message.Player.Bomb_Y

                let indexBomb = (bombY * 19) + bombX
                console.log(tiles);

                let bomb = tiles[indexBomb]
                console.log(bomb);

                bomb.classList.remove("explode");
                bomb.classList.add("bomb");
                BombOn2 = true
                setTimeout(explodeBomb, 2000, bomb, indexBomb, tiles, bombY, bombX, message.Player.InGameName);

            }
            break
        case "player3":

            if (!BombOn3) {
                let bombX = message.Player.Bomb_X
                let bombY = message.Player.Bomb_Y

                let indexBomb = (bombY * 19) + bombX
                console.log(tiles);

                let bomb = tiles[indexBomb]
                console.log(bomb);

                bomb.classList.remove("explode");
                bomb.classList.add("bomb");
                BombOn3 = true
                setTimeout(explodeBomb, 2000, bomb, indexBomb, tiles, bombY, bombX, message.Player.InGameName);

            }

            break
        case "player4":

            if (!BombOn4) {
                let bombX = message.Player.Bomb_X
                let bombY = message.Player.Bomb_Y

                let indexBomb = (bombY * 19) + bombX
                console.log(tiles);

                let bomb = tiles[indexBomb]
                console.log(bomb);

                bomb.classList.remove("explode");
                bomb.classList.add("bomb");
                BombOn4 = true
                setTimeout(explodeBomb, 2000, bomb, indexBomb, tiles, bombY, bombX, message.Player.InGameName);

            }

            break
    }

}




function explodeBomb(bomb, indexBomb, tiles, bombY, bombX, playerIGName) {


    bomb.classList.remove("bomb")
    bomb.classList.add("explode")


    const brickExplodeUp = tiles[indexBomb - 19], brickExplodeDown = tiles[indexBomb + 19], brickExplodeLeft = tiles[indexBomb - 1], brickExplodeRight = tiles[indexBomb + 1]
    let positionExplodeUp, posExplodeDown, posExplodeLeft, posExplodeRight
    if (!brickExplodeLeft.classList.contains("unbreak")) {
        posExplodeLeft = [bombY, bombX - 1]
        brickExplodeLeft.classList.remove("break")
        brickExplodeLeft.classList.add("explode")

        mapLayout[bombY][bombX - 1] = 0
        // ennemyDie(posExplodeLeft, posEnnemys)
    }


    if (!brickExplodeRight.classList.contains("unbreak")) {
        posExplodeRight = [bombY, bombX + 1]

        brickExplodeRight.classList.remove("break")
        brickExplodeRight.classList.add("explode")
        mapLayout[bombY][bombX + 1] = 0
    }


    if (!brickExplodeUp.classList.contains("unbreak")) {
        positionExplodeUp = [bombY - 1, bombX]
        if (brickExplodeUp.classList.contains("break")) {
            Score(100)
        }
        brickExplodeUp.classList.remove("break")
        brickExplodeUp.classList.add("explode")
        mapLayout[bombY - 1][bombX] = 0
    }
    if (!brickExplodeDown.classList.contains("unbreak")) {
        posExplodeDown = [bombY + 1, bombX]
        brickExplodeDown.classList.remove("break")
        brickExplodeDown.classList.add("explode")
        mapLayout[bombY + 1][bombX] = 0
    }
    switch(playerIGName){
        case 'player1':
           BombOn1 = false
            break;
        case 'player2':
           BombOn2 = false
            
            break;
        case 'player3':
            BombOn3 = false
           
            break;
        case 'player4':
            BombOn4 = false
            break;
    }

}


