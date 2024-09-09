import { eventSystem, router, stateManager } from "../app.js";
import WaitingRoomComponent from "../components/WaitingRoom.js";
import { update } from "../core/state.js";
import { chatDisplay, chatHandle } from "./Chat.js";
import { GameMapComponent } from "../components/map.js";
import { sendMessage } from "./messages.js";
import setGame from "./gameSet.js";
import { displayMovement} from "./Mouvements.js";
// import { renderGameMap } from "./MapDraw.js";
export let countdownTimer, gameStarted = false, socket, username, ActualUser, counter = 1, mapLayout

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
            }
            
            if (data.MessageType == "playerCount") {
                if (counter ==1) {
                    ActualUser = data
                    console.log(data);
                    switch (ActualUser.Player.InGameName) {
                        case 'player1':
                            stateManager.setState('playerPosition', {
                                heightPosition: 30,  // Initial side position
                                sidePosition: 30 // Initial height position
                            });
                            document.getElementById('player1').style.display = 'flex'
                            break;
                            case 'player2':
                            stateManager.setState('playerPosition', {
                                heightPosition: 30,  // Initial side position
                                sidePosition: 510 // Initial height position
                            });
                            break;
                        case 'player3':
                            stateManager.setState('playerPosition', {
                                heightPosition: 330,  // Initial side position
                                sidePosition: 30 // Initial height position
                            });
                            break;
                        case 'player4':
                            stateManager.setState('playerPosition', {
                                heightPosition: 330,  // Initial side position
                                sidePosition: 510 // Initial height position
                            });
                            break;
                        default:
                            break
                        }
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
                    if (data.PlayerCount==2) {
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