import { stateManager } from "../app.js"
import { sendMessage } from "./messages.js"
import { mapLayout, socket, username } from "./Player.js"

let [Y, X] = [1, 2]
export {X , Y}
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
                Y = newHeightPosition / 30, X = (newSidePosition + 30) / 30;
            }
            break;
        case 'ArrowRight':
            if (newSidePosition < 510 && verifyNextBlock(newHeightPosition, newSidePosition + 30)) {
                newSidePosition += 30;
                Y = newHeightPosition / 30, X = (newSidePosition + 30) / 30;
            }
            break;
        case 'ArrowUp':
            if (newHeightPosition > 30 && verifyNextBlock(newHeightPosition-30, newSidePosition)) {
                newHeightPosition -= 30;
                Y = newHeightPosition / 30, X = (newSidePosition + 30) / 30;
            }
            break;
        case 'ArrowDown':
            if (newHeightPosition < 330 && verifyNextBlock(newHeightPosition+30, newSidePosition)) {
                newHeightPosition += 30;
                Y = newHeightPosition / 30, X = (newSidePosition + 30) / 30;
            }
            break;
        default:
            break;
    }
    stateManager.setState('playerPosition', {
        sidePosition: newSidePosition,
        heightPosition: newHeightPosition
    });
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

    player.style.transform = `translate(${mess.Player.Width}px, ${mess.Player.Height}px)`
}