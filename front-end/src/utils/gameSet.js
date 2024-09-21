import { eventSystem, stateManager } from "../app.js"
import { sendMessage } from "./messages.js"
import { movePlayer } from "./Mouvements.js"
import { ActualUser, socket, username } from "./Player.js"

export default function setGame() {
    document.querySelector(".chatRoom").style.display = "none"
    document.querySelector(".game-map").style.display = "block"
    document.querySelector(".info").style.display = "block"
    let count = 10
    let root = document.getElementById("root")
    eventSystem.on('keydown', root, (e) => {

        if (count % 10 == 0) {
            movePlayer(e)
        }
        count++
    })
    eventSystem.on('keyup', root, ({ key }) => {
        count = 0

        if (key == " ") {
            let actualPlayer = ActualUser.Player.InGameName
            let x = stateManager.getState(actualPlayer)[0].index_X// index x of user when the bomb is place
            let y = stateManager.getState(actualPlayer)[0].index_Y // index y of user when the bomb is place
            let message = {
                MessageType: "playerPlaceBomb",
                Player: {
                    InGameName: actualPlayer,
                    Bomb_X: x,
                    Bomb_Y: y
                }
            }
            sendMessage(socket, message)

        }
    })
}

export function displayLooseImg(ActualUser) {
    if (ActualUser.Player.InGameName == 'player1') {
        document.getElementById('loose').style.content = `url(./assets/img/meloose.jpg)`
    }
    if (ActualUser.Player.InGameName == 'player2') {
        document.getElementById('loose').style.content = `url(./assets/img/roloose.jpg)`
    }
    if (ActualUser.Player.InGameName == 'player3') {
        document.getElementById('loose').style.content = `url(./assets/img/beloose.jpg)`
    }
    if (ActualUser.Player.InGameName == 'player4') {
        document.getElementById('loose').style.content = `url(./assets/img/moloose.jpg)`
    }
}