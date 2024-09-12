import { stateManager } from "../app.js"
import { sendMessage } from "./messages.js"
import { mapLayout, socket, username } from "./Player.js"
import { bombUp, speedUp, flameUp } from "./powerUp.js";

export function movePlayer(direction) {
    const currentPositions = stateManager.getState('playerPosition')[0] || {
        sidePosition: 30,
        heightPosition: 30
    };

    let newSidePosition = currentPositions.sidePosition;
    let newHeightPosition = currentPositions.heightPosition;
    // Modify position based on direction
    switch (direction.key) {
        case 'ArrowLeft':
            if (newSidePosition > 30 && verifyNextBlock(newHeightPosition, newSidePosition - 30)) {
                newSidePosition -= 30;
            }
            break;
        case 'ArrowRight':
            if (newSidePosition < 510 && verifyNextBlock(newHeightPosition, newSidePosition + 30)) {
                newSidePosition += 30;
            }
            break;
        case 'ArrowUp':
            if (newHeightPosition > 30 && verifyNextBlock(newHeightPosition - 30, newSidePosition)) {
                newHeightPosition -= 30;
            }
            break;
        case 'ArrowDown':
            if (newHeightPosition < 330 && verifyNextBlock(newHeightPosition + 30, newSidePosition)) {
                newHeightPosition += 30;
            }
            break;
        default:
            break;
    }
    stateManager.setState('playerPosition', {
        sidePosition: newSidePosition,
        heightPosition: newHeightPosition
    });
    console.log(stateManager.getState("playerPosition"));

    stateManager.setState('playerIndex', {
        index_Y: newHeightPosition / 30,
        index_X: newSidePosition / 30,
    })
    console.log(stateManager.getState("playerIndex"));

    let messageStruct = {
        MessageType: "playerMovement",
        TheMessage: ``,
        PlayerCount: 0,
        Player: {
            Username: username,
            Height: `${newHeightPosition}`,
            Width: `${newSidePosition}`
        }
    }
    console.log('messageStruct', messageStruct)
    sendMessage(socket, messageStruct)
}

export function verifyNextBlock(posY, posX) {
    posY = posY / 30
    posX = posX / 30
    if (mapLayout[posY][posX] == 0) {
        return true
    } else {
        return false
    }
}

export function displayMovement(mess) {
    let player = document.getElementById(mess.Player.InGameName)
    // console.log(typeof mess.Player.Height);

    stateManager.setState(mess.Player.InGameName, {
        index_Y: parseInt(mess.Player.Height, 10) / 30,
        index_X: parseInt(mess.Player.Width, 10) / 30,
    })

    player.style.transform = `translate(${mess.Player.Width}px, ${mess.Player.Height}px)`

    speedUp(mess.Player.InGameName)
    bombUp(mess.Player.InGameName)
    flameUp(mess.Player.InGameName)

}

