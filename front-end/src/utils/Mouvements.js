import { sendMessage } from "./messages.js"
import { ActualUser, socket, username } from "./Player.js"

export let PlayerSidePosition = 30, PlayerHeightPosition = 30


let [Y, X] = [1, 2]
export {X , Y}
export function movePlayer(direction) {
    switch (ActualUser.Player.Username) {
        case 'player1':
            PlayerHeightPosition=30
            PlayerSidePosition=30
        case 'player2':
            PlayerHeightPosition=30
            PlayerSidePosition=510
        case 'player3':
            PlayerHeightPosition=330
            PlayerSidePosition=30
        case 'player4':
            PlayerHeightPosition=330
            PlayerSidePosition=510
        default:
            break
    }
        switch (direction.key) {
            case 'ArrowLeft':
                if (PlayerSidePosition > 30) {
                    PlayerSidePosition -= 30
                    // player.style.transform = `translate(${PlayerSidePosition}px, ${PlayerHeightPosition}px)`
                    Y = PlayerHeightPosition / 30, X = (PlayerSidePosition + 30) / 30;
                }
                break
                case 'ArrowRight':
                    if (PlayerSidePosition < 560) {
                        PlayerSidePosition += 30
                    // player.style.transform = `translate(${PlayerSidePosition}px, ${PlayerHeightPosition}px)`
                    Y = PlayerHeightPosition / 30, X = (PlayerSidePosition + 30) / 30;
                }
                break
                case 'ArrowUp':
                    if (PlayerHeightPosition > 30) {
                        PlayerHeightPosition -= 30
                        // player.style.transform = `translate(${PlayerSidePosition}px, ${PlayerHeightPosition}px)`
                        Y = PlayerHeightPosition / 30, X = (PlayerSidePosition + 30) / 30;
                    }
                    break;
                    case 'ArrowDown':
                        if (PlayerHeightPosition < 560) {
                            PlayerHeightPosition += 30
                    Y = PlayerHeightPosition / 30, X = (PlayerSidePosition + 30) / 30;
                }
                break;
                default:
                    break;
                }
                let messageStruct = {
                    MessageType: "playerMovement",
                    TheMessage: ``,
                    PlayerCount: 0,
                    Player: {
                        Username: username,
                        Height: `${PlayerHeightPosition}`,
                        Width: `${PlayerSidePosition}`
                    }
                }
                sendMessage(socket, messageStruct)
}
// export function verifyNextBlock(posY, posX) {
//     posY = posY / 30
//     posX = posX / 30
//     if (mapLayout[posY][posX] == 0) {
//         return true
//     } else {
//         return false
//     }
// }

export function displayMovement(mess) {
    let player = document.getElementById(mess.Player.Username)

    player.style.transform = `translate(${mess.Player.Width}px, ${mess.Player.Height}px)`
}