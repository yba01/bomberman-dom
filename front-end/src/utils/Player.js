import { eventSystem, router, stateManager } from "../app.js";
import WaitingRoomComponent from "../components/WaitingRoom.js";
import { update } from "../core/state.js";
import { chatDisplay, chatHandle } from "./Chat.js";
import { renderGameMap } from "./MapDraw.js";
export let countdownTimer, gameStarted = false, socket

const RegisterPlayer = () => {
    const username = document.getElementById('username').value;
    if (username.split(' ').join('') != '' && username.length < 7) {
        socket = new WebSocket('ws://localhost:8081/ws');

        socket.onopen = () => {
            socket.send(JSON.stringify({ username }));
            stateManager.setState('socket', { username, socket });
            update(WaitingRoomComponent())
            eventSystem.on('click', '#sendMessage', ()=> {chatHandle(socket)})
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            
            console.log(event.data);

            if (data.MessageType == "playerCount") {
                document.getElementById('waitingMessage').textContent = `Waiting for other players to join... (${data.PlayerCount}/4)`;
                if (data.PlayerCount === 4 && !gameStarted) {
                    clearTimeout(countdownTimer); // Stop the existing timer
                    gameStarted = true
                    startGameCountdown(10); // Start the final 10 seconds countdown
                } else if ((data.PlayerCount >= 2 && data.PlayerCount < 4) && !gameStarted) {
                    // Start the 20 seconds countdown, or skip to 10 seconds if 4 players join
                    clearTimeout(countdownTimer);
                    startGameCountdown(20);
                } else {
                    clearTimeout(countdownTimer);
                    document.getElementById('WRtimer').textContent = 'At least 2 players...';
                }
            }

            if (data.MessageType == 'chat') {
                chatDisplay(data)
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
            } else {
                renderGameMap()
            }
            // router.navigateTo('/game'); // Start the game
        }
    }, 1000);
}



export default RegisterPlayer;