import { stateManager } from "../app.js"
import { sendMessage } from "./messages.js";
import { ActualUser, BombOn1Up, BombOn2Up, BombOn3Up, BombOn4Up, mapLayout, socket, tiles, username, ApplyFlame } from "./Player.js"

let BombOn1, BombOn2, BombOn3, BombOn4 = false, PLayerHealth = 3

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

function explodeBomb(bomb, indexBomb, tiles, bombY, bombX, playerIGName) {
    const currentPositions = stateManager.getState('playerPosition')[0] 
    console.log('bombY, curre', bombY, currentPositions.heightPosition, bombX, currentPositions.sidePosition)
    if (bombY*30 == currentPositions.heightPosition && bombX*30 == currentPositions.sidePosition) {
        PLayerHealth--
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
            document.getElementById('loose').style.display = 'flex'
        }
    }
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
            if (explodePos[0]*30 == currentPositions.heightPosition && explodePos[1]*30 == currentPositions.sidePosition) {
                PLayerHealth--
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
                }
                document.getElementById('loose').style.display = 'flex'
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
        case 'player1': BombOn1 = false; break;
        case 'player2': BombOn2 = false; break;
        case 'player3': BombOn3 = false; break;
        case 'player4': BombOn4 = false; break;
    }
}

function flameIt(key, player, oneMoreIndex, bombY, bombX) {
    console.log(key)
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
                        PlayerCount: 0,
                        Player: {
                            Username: username,
                            InGameName: ActualUser.Player.InGameName
                        }
                    };
                    sendMessage(socket, messageStruct);
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

