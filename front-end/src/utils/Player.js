import { eventSystem, router, stateManager } from "../app.js";
import WaitingRoomComponent from "../components/WaitingRoom.js";
import { StateManager, update } from "../core/state.js";
import { chatDisplay, chatHandle } from "./Chat.js";
import { GameMapComponent } from "../components/map.js";
import { sendMessage } from "./messages.js";
import setGame from "./gameSet.js";
import { displayMovement } from "./Mouvements.js";
import { PlaceBomb } from "./Bomb.js";
// import { renderGameMap } from "./MapDraw.js";
export let countdownTimer, gameStarted = false, socket,
    username, ActualUser, counter = 1, mapLayout, tiles,
    speedUpIndex, bombUpIndex, flameUpIndex,
    BombOn1Up = true, BombOn2Up = true, BombOn3Up = true, BombOn4Up = true, ApplyFlame = {user:"", flame: false}

const RegisterPlayer = () => {
    username = document.getElementById('username').value;
    if (username.split(' ').join('') != '' && username.length < 7) {
        document.getElementById('error').textContent = ''

        socket = new WebSocket(`ws://${window.location.hostname + ":8081"}/ws`);

        socket.onopen = () => {
            socket.send(JSON.stringify({ username }));
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.MessageType == "drawmap") {
                update(GameMapComponent(data.DataMap), document.querySelector(".game-map"))
                mapLayout = data.DataMap
                tiles = document.querySelectorAll(".tile");
                speedUpIndex = data.PowerUpIndex[0]
                bombUpIndex = data.PowerUpIndex[1]
                flameUpIndex = data.PowerUpIndex[2]

            }

            if (data.MessageType === "getCountDown") {
                clearTimeout(countdownTimer)
                startGameCountdown(data.Countdown);
            }

            if (data.MessageType == "playerCount") {
                if (counter == 1) {
                    stateManager.setState('socket', { username, socket });
            update(WaitingRoomComponent(), document.querySelector('.chatRoom'))
            let sendMsg = document.getElementById('sendMessage')
            eventSystem.on('click',sendMsg, () => { chatHandle(socket) })
                    ActualUser = data
                    switch (ActualUser.Player.InGameName) {
                        case 'player1':
                            stateManager.setState('playerPosition', {
                                heightPosition: 30,// Initial height position
                                sidePosition: 30   // Initial side position
                            });
                            document.getElementById('player1').style.display = 'flex'
                            break;
                        case 'player2':
                            stateManager.setState('playerPosition', {
                                heightPosition: 30,  // Initial height position 
                                sidePosition: 510 // Initial side position
                            });
                            break;
                        case 'player3':
                            stateManager.setState('playerPosition', {
                                heightPosition: 330,  // Initial height position
                                sidePosition: 30  // Initial side position
                            });
                            break;
                        case 'player4':
                            stateManager.setState('playerPosition', {
                                heightPosition: 330,  // Initial height position
                                sidePosition: 510  // Initial side position
                            });
                            break;
                        default:
                            break
                    }
                    let height = (stateManager.getState("playerPosition")[0]).heightPosition
                    let Width = (stateManager.getState("playerPosition")[0]).sidePosition

                    let messageStruct = {
                        MessageType: "playerMovement",
                        TheMessage: ``,
                        PlayerCount: 0,
                        Player: {
                            Username: username,
                            Height: `${height}`,
                            Width: `${Width}`
                        }
                    }
                    sendMessage(socket, messageStruct)

                    counter++
                }
                document.getElementById('waitingMessage').textContent = `Waiting for other players to join... (${data.PlayerCount}/4)`;

                if (!gameStarted) {
                    for (let i = 1; i <= data.PlayerCount; i++) {
                        document.getElementById(`player${i}`).style.display = 'block'
                    }
                }
                if (data.PlayerCount === 4 && !gameStarted) {
                    clearTimeout(countdownTimer);
                    gameStarted = true;
                    startGameCountdown(10); // Final 10 seconds countdown
                } else if (data.PlayerCount == 2 && !gameStarted) {
                    clearTimeout(countdownTimer);
                    startGameCountdown(10); // Start 20 seconds countdown
                } else {
                    // Handle single player left
                    if (gameStarted && data.PlayerCount === 1) {
                        if (ActualUser.Player.InGameName == 'player1') {
                            document.getElementById('win').style.content = `url(./assets/img/mess.jpeg)`
                        }
                        if (ActualUser.Player.InGameName == 'player2') {
                            document.getElementById('win').style.content = `url(./assets/img/ron.jpg)`
                        }
                        if (ActualUser.Player.InGameName == 'player3') {
                            document.getElementById('win').style.content = `url(./assets/img/benz.jpg)`
                        }
                        if (ActualUser.Player.InGameName == 'player4') {
                            document.getElementById('win').style.content = `url(./assets/img/modr.jpeg)`
                        }
                        document.getElementById('win').style.display = 'flex'
                        socket.close();
                        return;
                    }
                    if (!gameStarted && data.PlayerCount == 1) {
                        clearTimeout(countdownTimer);
                        document.getElementById('WRtimer').textContent = 'At least 2 players...';
                    }
                    if (!gameStarted && data.PlayerCount == 3) {
                        let messageStruct = {
                            MessageType: "getCountDown",
                        };
                        sendMessage(socket, messageStruct)
                    }
                }
            }

            if (data.MessageType == 'chat') {
                chatDisplay(data)
            }

            if (data.MessageType == 'playerMovement') {
                displayMovement(data)
            }

            if (data.MessageType == 'playerPlaceBomb') {
                PlaceBomb(data)
            }
            
            if (data.MessageType == 'ErrorName') {
                document.getElementById('error').textContent = 'Name Already taken'
            }

            if (data.MessageType == "powerUp") {
                if (data.Player.SpeedUp) {
                    let speedY = speedUpIndex[0]
                    let speedX = speedUpIndex[1]
                    let tileIndex = (speedY * 19) + speedX
                    tiles[tileIndex].classList.remove("speed")
                    tiles[tileIndex].style.backgroundImage = ''
                    let player = document.getElementById(data.Player.InGameName)
                    player.style.transition = 'transform 0.01s ease-in-out'
                }
                if (data.Player.BombUp) {
                    let bombY = bombUpIndex[0]
                    let bombX = bombUpIndex[1]
                    let tileIndex = (bombY * 19) + bombX
                    tiles[tileIndex].classList.remove("bombing")
                    tiles[tileIndex].style.backgroundImage = ''
                    switch (data.Player.InGameName) {
                        case 'player1':
                            BombOn1Up = false
                            break;
                        case 'player2':
                            BombOn2Up = false
                            break;
                        case 'player3':
                            BombOn3Up = false
                            break;
                        case 'player4':
                            BombOn4Up = false
                            break;
                        default:
                            break
                    }
                }
                if (data.Player.FlameUp) {
                    let flameY = flameUpIndex[0]
                    let flameX = flameUpIndex[1]
                    let tileIndex = (flameY * 19) + flameX
                    tiles[tileIndex].classList.remove("flame")
                    tiles[tileIndex].style.backgroundImage = ''
                    ApplyFlame.user = data.Player.InGameName
                    ApplyFlame.flame = true
                }

            }

            if (data.MessageType === "lost") {
                document.getElementById(data.Player.InGameName).style.display = "none"
            }

        };

        socket.onerror = () => {
            document.getElementById('error').textContent = 'A Game Has Already started Please try Later'
        };
    } else {
        document.getElementById('error').textContent = 'Please enter a valid name! valid len(<7)'
    }
}
function startGameCountdown(seconds) {
    const timerElement = document.getElementById('WRtimer');
    let WaitMessage = seconds === 10 ? 'Game starts in' : 'Waiting...';
    timerElement.textContent = `${WaitMessage} ${seconds} seconds`;

    countdownTimer = setInterval(() => {
        seconds--;
        timerElement.textContent = `${WaitMessage} ${seconds} seconds`;

        // Broadcast the current countdown state to all players
        let messageStruct = {
            MessageType: "countdownUpdate",
            Countdown: seconds
        };
        sendMessage(socket, messageStruct);

        if (seconds <= 0) {
            clearInterval(countdownTimer);
            if (!gameStarted) {
                startGameCountdown(10);  // Fallback to a shorter countdown
                gameStarted = true;
                let messageStruct = {
                    MessageType: "gameStarted",
                    TheMessage: "",
                    PlayerCount: 0,
                    PlayerName: ""
                };
                sendMessage(socket, messageStruct);
            } else {
                document.getElementById('error').textContent = '';
                setGame();
            }
        }
    }, 1000);
}

// export function updatePower(bombUP, theBol) {
//     bombUP = theBol
// }



export default RegisterPlayer;