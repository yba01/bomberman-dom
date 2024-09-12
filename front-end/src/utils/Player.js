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
    BombOn1Up = true, BombOn2Up = true, BombOn3Up = true, BombOn4Up = true

const RegisterPlayer = () => {
    username = document.getElementById('username').value;
    if (username.split(' ').join('') != '' && username.length < 7) {
        console.log(window.location.hostname);

        socket = new WebSocket(`ws://${window.location.hostname + ":8081"}/ws`);

        socket.onopen = () => {
            socket.send(JSON.stringify({ username }));
            stateManager.setState('socket', { username, socket });
            update(WaitingRoomComponent(), document.querySelector('.chatRoom'))
            eventSystem.on('click', '#sendMessage', () => { chatHandle(socket) })
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log(event.data);
            if (data.MessageType == "drawmap") {
                update(GameMapComponent(data.DataMap), document.querySelector(".game-map"))
                mapLayout = data.DataMap
                tiles = document.querySelectorAll(".tile");
                speedUpIndex = data.PowerUpIndex[0]
                bombUpIndex = data.PowerUpIndex[1]
                flameUpIndex = data.PowerUpIndex[2]
                console.log(speedUpIndex, bombUpIndex, flameUpIndex);

            }

            if (data.MessageType == "playerCount") {
                if (counter == 1) {
                    ActualUser = data
                    console.log(data);
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
                    console.log(height, Width);

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
                    console.log(stateManager.getState("playerIndex"));

                    counter++
                }
                document.getElementById('waitingMessage').textContent = `Waiting for other players to join... (${data.PlayerCount}/4)`;
                if (data.PlayerCount === 4 && !gameStarted) {
                    document.getElementById('player1').style.display = 'flex'
                    document.getElementById('player2').style.display = 'flex'
                    document.getElementById('player3').style.display = 'flex'
                    document.getElementById('player4').style.display = 'flex'
                    clearTimeout(countdownTimer); // Stop the existing timer
                    gameStarted = true
                    startGameCountdown(2); // Start the final 10 seconds countdown
                } else if ((data.PlayerCount >= 2 && data.PlayerCount < 4) && !gameStarted) {
                    // Start the 20 seconds countdown, or skip to 10 seconds if 4 players join
                    if (data.PlayerCount == 2) {
                        document.getElementById('player1').style.display = 'flex'
                        document.getElementById('player2').style.display = 'flex'
                    } else {
                        document.getElementById('player1').style.display = 'flex'
                        document.getElementById('player2').style.display = 'flex'
                        document.getElementById('player3').style.display = 'flex'
                    }
                    clearTimeout(countdownTimer);
                    startGameCountdown(10);
                } else {
                    clearTimeout(countdownTimer);
                    document.getElementById('WRtimer').textContent = 'At least 2 players...';
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
            if (data.MessageType == "powerUp") {
                if (data.Player.SpeedUp) {
                    let speedY = speedUpIndex[0]
                    let speedX = speedUpIndex[1]
                    let tileIndex = (speedY * 19) + speedX
                    tiles[tileIndex].classList.remove("speed")
                    tiles[tileIndex].style.backgroundImage = 'none'
                    let player = document.getElementById(data.Player.InGameName)
                    player.style.transition = 'transform 0.01s ease-in-out'
                }
                if (data.Player.BombUp) {
                    let bombY = bombUpIndex[0]
                    let bombX = bombUpIndex[1]
                    let tileIndex = (bombY * 19) + bombX
                    tiles[tileIndex].classList.remove("bombing")
                    tiles[tileIndex].style.backgroundImage = 'none'
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

            }

        };

        socket.onerror = (error) => {
            alert('Error: Unable to join the game. It may have already started.');
        };
    } else {
        alert('Please enter a valid name! valid len(<7)');
    }
}
function startGameCountdown(seconds) {
    const timerElement = document.getElementById('WRtimer');
    let WaitMessage = 'Waiting...'
    if (seconds == 10) {
        WaitMessage = 'Game starts in'
    }
    timerElement.textContent = `${WaitMessage} ${seconds} seconds`;

    countdownTimer = setInterval(() => {
        seconds--;
        timerElement.textContent = `${WaitMessage} ${seconds} seconds`;

        if (seconds <= 0) {
            clearInterval(countdownTimer);
            if (!gameStarted) {
                startGameCountdown(10)
                gameStarted = true
                let messageStruct = {
                    MessageType: "gameStarted",
                    TheMessage: "",
                    PlayerCount: 0,
                    PlayerName: ""
                }
                sendMessage(socket, messageStruct)
            } else {
                setGame()
            }
        }
    }, 1000);
}



export default RegisterPlayer;