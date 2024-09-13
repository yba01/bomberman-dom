import { stateManager } from "../app.js"
import { sendMessage } from "./messages.js"
import { ActualUser, socket, tiles } from "./Player.js"


function speedUp(actualPlayer) {
    if (ActualUser.Player.InGameName == actualPlayer) {
        let ActualPlayerY = stateManager.getState(actualPlayer)[0].index_Y
        let ActualPlayerX = stateManager.getState(actualPlayer)[0].index_X
        let tileIndex = (ActualPlayerY * 19) + ActualPlayerX
        if (tiles[tileIndex].classList.contains("speed")) {
            let message = {
                MessageType: "powerUp",
                Player: {
                    InGameName: actualPlayer,
                    SpeedUp: true
                },
            }
            sendMessage(socket, message)

        }

    }

}

function bombUp(actualPlayer) {
    if (ActualUser.Player.InGameName == actualPlayer) {
        let ActualPlayerY = stateManager.getState(actualPlayer)[0].index_Y
        let ActualPlayerX = stateManager.getState(actualPlayer)[0].index_X
        let tileIndex = (ActualPlayerY * 19) + ActualPlayerX
        if (tiles[tileIndex].classList.contains("bombing")) {
            let message = {
                MessageType: "powerUp",
                Player: {
                    InGameName: actualPlayer,
                    BombUp: true
                },
            }
            sendMessage(socket, message)
            return 30
        }

    }
}

function flameUp(actualPlayer) {
    if (ActualUser.Player.InGameName == actualPlayer) {
        let ActualPlayerY = stateManager.getState(actualPlayer)[0].index_Y
        let ActualPlayerX = stateManager.getState(actualPlayer)[0].index_X
        let tileIndex = (ActualPlayerY * 19) + ActualPlayerX
        if (tiles[tileIndex].classList.contains("flame")) {
            let message = {
                MessageType: "powerUp",
                Player: {
                    InGameName: actualPlayer,
                    FlameUp: true
                },
            }
            sendMessage(socket, message)
        }

    }
}

export { speedUp, bombUp, flameUp }