import { stateManager } from "../app.js"
import { BombOn1Up, BombOn2Up, BombOn3Up, BombOn4Up, mapLayout, tiles, ApplyFlame } from "./Player.js"

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
                BombOn1 = BombOn1Up
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
                BombOn2 = BombOn2Up
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
                BombOn3 = BombOn3Up
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
                BombOn4 = BombOn4Up
                setTimeout(explodeBomb, 2000, bomb, indexBomb, tiles, bombY, bombX, message.Player.InGameName);

            }

            break
    }

}




// function explodeBomb(bomb, indexBomb, tiles, bombY, bombX, playerIGName) {


//     bomb.classList.remove("bomb")
//     bomb.classList.add("explode")


//     const brickExplodeUp = tiles[indexBomb - 19], brickExplodeDown = tiles[indexBomb + 19], brickExplodeLeft = tiles[indexBomb - 1], brickExplodeRight = tiles[indexBomb + 1]
//     const brickExplodeOneMoreUp = tiles[indexBomb - 38], brickExplodeOneMoreDown = tiles[indexBomb + 38], brickExplodeOneMoreLeft = tiles[indexBomb - 2], brickExplodeOneMoreRight = tiles[indexBomb + 2]
//     let positionExplodeUp, posExplodeDown, posExplodeLeft, posExplodeRight, posExplodeOneMoreUp, posExplodeOneMoreDown, posExplodeOneMoreLeft, posExplodeOneMoreRight
//     if (!brickExplodeLeft.classList.contains("unbreak")) {
//         posExplodeLeft = [bombY, bombX - 1]
//         brickExplodeLeft.classList.remove("break")
//         brickExplodeLeft.classList.add("explode")

//         mapLayout[bombY][bombX - 1] = 0
//         // ennemyDie(posExplodeLeft, posEnnemys)
//         renderBonus(brickExplodeLeft)
//         flameIt("left", playerIGName)
//     }


//     if (!brickExplodeRight.classList.contains("unbreak")) {
//         posExplodeRight = [bombY, bombX + 1]

//         brickExplodeRight.classList.remove("break")
//         brickExplodeRight.classList.add("explode")
//         mapLayout[bombY][bombX + 1] = 0
//         renderBonus(brickExplodeRight)
//         flameIt("right", playerIGName)

//     }


//     if (!brickExplodeUp.classList.contains("unbreak")) {
//         positionExplodeUp = [bombY - 1, bombX]
//         // if (brickExplodeUp.classList.contains("break")) {
//         //     Score(100)
//         // }
//         brickExplodeUp.classList.remove("break")
//         brickExplodeUp.classList.add("explode")
//         mapLayout[bombY - 1][bombX] = 0
//         renderBonus(brickExplodeUp)
//         flameIt("up", playerIGName)
//     }
//     if (!brickExplodeDown.classList.contains("unbreak")) {
//         posExplodeDown = [bombY + 1, bombX]
//         brickExplodeDown.classList.remove("break")
//         brickExplodeDown.classList.add("explode")
//         mapLayout[bombY + 1][bombX] = 0
//         renderBonus(brickExplodeDown)
//         flameIt("down", playerIGName)

//     }

//     // if (ApplyFlame.user = playerIGName && ApplyFlame.flame) {
//     //     if (!brickExplodeOneMoreLeft.classList.contains("unbreak")) {
//     //         let left = [bombY, bombX - 2]
//     //         brickExplodeOneMoreLeft.classList.remove("break")
//     //         brickExplodeOneMoreLeft.classList.add("explode")
    
//     //         mapLayout[bombY][bombX - 2] = 0
//     //         // ennemyDie(posExplodeOneMoreLeft, posEnnemys)
//     //         renderBonus(brickExplodeOneMoreLeft)
//     //     }
    
    
//     //     if (!brickExplodeOneMoreRight.classList.contains("unbreak")) {
//     //         posExplodeOneMoreRight = [bombY, bombX + 2]
    
//     //         brickExplodeOneMoreRight.classList.remove("break")
//     //         brickExplodeOneMoreRight.classList.add("explode")
//     //         mapLayout[bombY][bombX + 2] = 0
//     //         renderBonus(brickExplodeOneMoreRight)
//     //     }
    
    
//     //     if (!brickExplodeOneMoreUp.classList.contains("unbreak")) {
//     //         posExplodeOneMoreUp = [bombY - 2, bombX]
//     //         // if (brickExplodeOneMoreUp.classList.contains("break")) {
//     //         //     Score(100)
//     //         // }
//     //         brickExplodeOneMoreUp.classList.remove("break")
//     //         brickExplodeOneMoreUp.classList.add("explode")
//     //         mapLayout[bombY - 2][bombX] = 0
//     //         renderBonus(brickExplodeOneMoreUp)
//     //     }
//     //     if (!brickExplodeOneMoreDown.classList.contains("unbreak")) {
//     //         posExplodeOneMoreDown = [bombY + 2, bombX]
//     //         brickExplodeOneMoreDown.classList.remove("break")
//     //         brickExplodeOneMoreDown.classList.add("explode")
//     //         mapLayout[bombY + 2][bombX] = 0
//     //         renderBonus(brickExplodeOneMoreDown)
//     //     }
//     // }

//     setTimeout(() => {
//         bomb.classList.remove("explode")//middle
//         brickExplodeLeft.classList.remove("explode")
//         brickExplodeRight.classList.remove("explode")
//         brickExplodeUp.classList.remove("explode")
//         brickExplodeDown.classList.remove("explode")
//         brickExplodeOneMoreLeft.classList.remove("explode")
//         brickExplodeOneMoreRight.classList.remove("explode")
//         brickExplodeOneMoreUp.classList.remove("explode")
//         brickExplodeOneMoreDown.classList.remove("explode")

//     }, 350)

//     switch (playerIGName) {
//         case 'player1':
//             BombOn1 = false
//             break;
//         case 'player2':
//             BombOn2 = false

//             break;
//         case 'player3':
//             BombOn3 = false

//             break;
//         case 'player4':
//             BombOn4 = false
//             break;
//     }

// }

// function flameIt( key, player ) {
//     if (ApplyFlame.name == player) {
//         console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
//         switch (key) {
//             case "left":
//                 position = tiles[indexBomb - 2] != undefined ? tiles[indexBomb - 2] : undefined
//                 if (!position) return
//                 if (!position.classList.contains("unbreak")) {
//                     let explode = [bombY, bombX - 2]
//                     position.classList.remove("break")
//                     position.classList.add("explode")
//                     mapLayout[bombY][bombX - 2] = 0
//                     // ennemyDie(posExplodeOneMoreLeft, posEnnemys)
//                     renderBonus(position)
//                 }
//                 break;
//             case "right":
//                 position = tiles[indexBomb + 2] != undefined ? tiles[indexBomb + 2] : undefined
//                 if (!position) return
//                 if (!position.classList.contains("unbreak")) {
//                     let explode = [bombY, bombX + 2]
//                     position.classList.remove("break")
//                     position.classList.add("explode")
//                     mapLayout[bombY][bombX + 2] = 0
//                     // ennemyDie(posExplodeOneMoreLeft, posEnnemys)
//                     renderBonus(position)
//                 }
//                 break;
//             case "up":
//                 position = tiles[indexBomb - 38] != undefined ? tiles[indexBomb - 38] : undefined
//                 if (!position) return
//                 if (!position.classList.contains("unbreak")) {
//                     let explode = [bombY, bombX + 2]
//                     position.classList.remove("break")
//                     position.classList.add("explode")
//                     mapLayout[bombY - 2][bombX] = 0
//                     // ennemyDie(posExplodeOneMoreLeft, posEnnemys)
//                     renderBonus(position)
//                 }
//                 break;
//             case "down":
//                 position = tiles[indexBomb + 38] != undefined ? tiles[indexBomb + 38] : undefined
//                 if (!position) return
//                 if (!position.classList.contains("unbreak")) {
//                     let explode = [bombY, bombX + 2]
//                     position.classList.remove("break")
//                     position.classList.add("explode")
//                     mapLayout[bombY - 2][bombX] = 0
//                     // ennemyDie(posExplodeOneMoreLeft, posEnnemys)
//                     renderBonus(position)
//                 }
//                 break;    
//             default:
//                 break;
//         }

//     }
// }


function explodeBomb(bomb, indexBomb, tiles, bombY, bombX, playerIGName) {
    bomb.classList.remove("bomb")
    bomb.classList.add("explode")
    console.log(ApplyFlame)
    // Create objects for explosion tiles
    const directions = {
        left: { index: indexBomb - 1, pos: [bombY, bombX - 1], oneMore: indexBomb - 2 },
        right: { index: indexBomb + 1, pos: [bombY, bombX + 1], oneMore: indexBomb + 2 },
        up: { index: indexBomb - 19, pos: [bombY - 1, bombX], oneMore: indexBomb - 38 },
        down: { index: indexBomb + 19, pos: [bombY + 1, bombX], oneMore: indexBomb + 38 }
    }

    for (let direction in directions) {
        let brick = tiles[directions[direction].index];
        if (brick && !brick.classList.contains("unbreak")) {
            let explodePos = directions[direction].pos;
            brick.classList.remove("break")
            brick.classList.add("explode")
            mapLayout[explodePos[0]][explodePos[1]] = 0
            renderBonus(brick)
            flameIt(direction, playerIGName, directions[direction].oneMore, bombY, bombX)
        }
    }

    setTimeout(() => {
        bomb.classList.remove("explode") // Reset middle
        for (let direction in directions) {
            tiles[directions[direction].index].classList.remove("explode");
            tiles[directions[direction].oneMore]?.classList.remove("explode"); // If flames are active
        }
    }, 350);

    switch (playerIGName) {
        case 'player1': BombOn1 = false; break;
        case 'player2': BombOn2 = false; break;
        case 'player3': BombOn3 = false; break;
        case 'player4': BombOn4 = false; break;
    }
}

function flameIt(key, player, oneMoreIndex, bombY, bombX) {
    console.log(key)
    if (ApplyFlame.user === player) {
        const position = tiles[oneMoreIndex];
        if (position && !position.classList.contains("unbreak")) {
            let explodePos;
            switch (key) {
                case "left": explodePos = [bombY, bombX - 2]; break;
                case "right": explodePos = [bombY, bombX + 2]; break;
                case "up": explodePos = [bombY - 2, bombX]; break;
                case "down": explodePos = [bombY + 2, bombX]; break;
            }
            position.classList.remove("break")
            position.classList.add("explode")
            mapLayout[explodePos[0]][explodePos[1]] = 0
            renderBonus(position)
        }
    }
}



function renderBonus(div) {
    if (div.classList.contains("bombing")) {
        // div.classList.remove("explode")
        div.style.backgroundImage = "url('./assets/img/bomb.png')";
    }
    if (div.classList.contains("speed")) {
        // div.classList.remove("explode")

        div.style.backgroundImage = `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"><text x="50%" y="50%" font-size="20" text-anchor="middle" dominant-baseline="middle">👟</text></svg>')`;
    }
    if (div.classList.contains("flame")) {
        // div.classList.remove("explode")

        div.style.backgroundImage = `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"><text x="50%" y="50%" font-size="20" text-anchor="middle" dominant-baseline="middle">🔥</text></svg>')`;
    }
}

