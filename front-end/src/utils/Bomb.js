import { stateManager } from "../app.js"
import { displayLooseImg } from "./gameSet.js";
import { sendMessage } from "./messages.js";
import { ActualUser, BombOn1Up, BombOn2Up, BombOn3Up, BombOn4Up, mapLayout, socket, tiles, username, ApplyFlame } from "./Player.js"

let BombOn1, BombOn2, BombOn3, BombOn4 = false, PLayerHealth = 3
export let BC1=0, BC2=0, BC3=0, BC4=0

export function PlaceBomb(message) {

    switch (message.Player.InGameName) {
        case "player1":

            if (!BombOn1) {
                if ((BC1 < 2 && BombOn1Up == false)|| BombOn1Up != false ) {
                    BC1= BC1+1
                    let bombX = message.Player.Bomb_X
                    let bombY = message.Player.Bomb_Y
    
                    let indexBomb = (bombY * 19) + bombX
    
                    let bomb = tiles[indexBomb]
    
                    bomb.classList.remove("explode");
                    bomb.classList.add("bomb");
                    BombOn1 = BombOn1Up
                    setTimeout(explodeBomb, 2000, bomb, indexBomb, tiles, bombY, bombX, message.Player.InGameName);
                }

            }
            break
        case "player2":

            if (!BombOn2) {
                if ((BC2 < 2 && BombOn2Up == false)|| BombOn2Up != false) {
                    BC2= BC2+1
                    let bombX = message.Player.Bomb_X
                    let bombY = message.Player.Bomb_Y
    
                    let indexBomb = (bombY * 19) + bombX
    
                    let bomb = tiles[indexBomb]
    
                    bomb.classList.remove("explode");
                    bomb.classList.add("bomb");
                    BombOn2 = BombOn2Up
                    setTimeout(explodeBomb, 2000, bomb, indexBomb, tiles, bombY, bombX, message.Player.InGameName);
                }

            }
            break
        case "player3":

            if (!BombOn3) {
                if ((BC3 < 2 && BombOn3Up == false)|| BombOn3Up != false) {
                    BC3= BC3+1
                    
                    let bombX = message.Player.Bomb_X
                    let bombY = message.Player.Bomb_Y
    
                    let indexBomb = (bombY * 19) + bombX
    
                    let bomb = tiles[indexBomb]
    
                    bomb.classList.remove("explode");
                    bomb.classList.add("bomb");
                    BombOn3 = BombOn3Up
                    setTimeout(explodeBomb, 2000, bomb, indexBomb, tiles, bombY, bombX, message.Player.InGameName);
                }

            }

            break
        case "player4":

            if (!BombOn4) {
                if ((BC4 < 2 && BombOn4Up == false)|| BombOn4Up != false) {
                    BC4= BC4+1

                    let bombX = message.Player.Bomb_X
                    let bombY = message.Player.Bomb_Y
    
                    let indexBomb = (bombY * 19) + bombX
    
                    let bomb = tiles[indexBomb]
    
                    bomb.classList.remove("explode");
                    bomb.classList.add("bomb");
                    BombOn4 = BombOn4Up
                    setTimeout(explodeBomb, 2000, bomb, indexBomb, tiles, bombY, bombX, message.Player.InGameName);
                }

            }

            break
    }

}

function explodeBomb(bomb, indexBomb, tiles, bombY, bombX, playerIGName) {
    const currentPositions = stateManager.getState('playerPosition')[0] 
    if (bombY*30 == currentPositions.heightPosition && bombX*30 == currentPositions.sidePosition) {
        PLayerHealth--
        if (PLayerHealth <= 0) {
            PLayerHealth = 0
        }
        document.getElementById('lives').textContent = `HEALTH : ${PLayerHealth}`
        if (PLayerHealth == 0) {
            let messageStruct = {
                MessageType: "lost",
                TheMessage: ``,
                PlayerCount: 0,
                Player: {
                    Username: username,
                    InGameName: ActualUser.Player.InGameName
                }
            }
            sendMessage(socket, messageStruct)
            document.getElementById(ActualUser.Player.InGameName).style.display = 'none'
            displayLooseImg(ActualUser)
            document.getElementById('loose').style.display = 'flex'
        }
    }
    bomb.classList.remove("bomb")
    bomb.classList.add("explode")
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
            if (explodePos[0]*30 == currentPositions.heightPosition && explodePos[1]*30 == currentPositions.sidePosition) {
                PLayerHealth--
                document.getElementById('lives').textContent = `HEALTH : ${PLayerHealth}`
                if (PLayerHealth == 0) {
                    let messageStruct = {
                        MessageType: "lost",
                        TheMessage: ``,
                        Player: {
                            Username: ActualUser.Player.Username,
                            InGameName: ActualUser.Player.InGameName
                        }
                    }
                    sendMessage(socket, messageStruct)
                    displayLooseImg(ActualUser)
                    document.getElementById('loose').style.display = 'flex'
                }
            }
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
        case 'player1':
             BC1=BC1-1
             if (BC1 <= 1) {
                BombOn1 = false
                // updatePower(BombOn1Up, false)
            }
              break;
        case 'player2':
            BC2=BC2-1
            if (BC2 <= 1) {
                BombOn2 = false
                // updatePower(BombOn2Up, false)
            }
              break;
        case 'player3':
            BC3=BC3-1
            if (BC3 <= 1) {
                BombOn3 = false
                // updatePower(BombOn3Up, false)
            }
              break;
        case 'player4':
            BC4=BC4-1
            if (BC4 <= 1) {
                BombOn4 = false
                // updatePower(BombOn4Up, false)
            }
              break;
    }
    console.log('first', BC1, BC2, BC3, BC4, BombOn1, BombOn2, BombOn3, BombOn4)

}

function flameIt(key, player, oneMoreIndex, bombY, bombX) {
    const currentPositions = stateManager.getState('playerPosition')[0];  // Ensure this is retrieved
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
            
            // Check if player is in the explosion range
            if (explodePos[0] * 30 == currentPositions.heightPosition && explodePos[1] * 30 == currentPositions.sidePosition) {
                PLayerHealth--;
                document.getElementById('lives').textContent = `HEALTH : ${PLayerHealth}`;
                if (PLayerHealth == 0) {
                    let messageStruct = {
                        MessageType: "lost",
                        TheMessage: ``,
                        Player: {
                            Username: ActualUser.Player.Username,
                            InGameName: ActualUser.Player.InGameName
                        }
                    };
                    sendMessage(socket, messageStruct);
                    displayLooseImg(ActualUser)
                    document.getElementById('loose').style.display = 'flex'
                }
            }

            // Apply explosion effect
            position.classList.remove("break");
            position.classList.add("explode");

            // Update map layout
            mapLayout[explodePos[0]][explodePos[1]] = 0;

            // Render bonus if applicable
            renderBonus(position);
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

