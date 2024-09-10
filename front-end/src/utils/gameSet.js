import { eventSystem, stateManager } from "../app.js"
import { sendMessage } from "./messages.js"
import { movePlayer } from "./Mouvements.js"
import { ActualUser, socket, username } from "./Player.js"

export default function setGame() {
    document.querySelector(".chatRoom").style.display = "none"
    document.querySelector(".game-map").style.display = "block"
    document.querySelector(".info").style.display = "block"
    let count = 10

    eventSystem.on('keydown', '#root', (e) => {
        console.log('chekcing movements');

        if (count % 10 == 0) {
            movePlayer(e)
        }
        count++
    })
    eventSystem.on('keyup', '#root', ({ key }) => {
        console.log('chekcing movements');
        count = 0


        if (key == " ") {
            let actualPlayer = ActualUser.Player.InGameName
            console.log(actualPlayer);
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