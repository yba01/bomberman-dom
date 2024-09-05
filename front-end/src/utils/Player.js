import { eventSystem, router, stateManager } from "../app.js";
import WaitingRoomComponent from "../components/WaitingRoom.js";
import { update } from "../core/state.js";
import { chatDisplay, chatHandle } from "./Chat.js";
export let countdownTimer;

const RegisterPlayer = () => {
    const username = document.getElementById('username').value;
    if (username) {
        const socket = new WebSocket('ws://localhost:8081/ws');

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

                if (data.PlayerCount === 4) {
                    clearTimeout(countdownTimer); // Stop the existing timer
                    startGameCountdown(10); // Start the final 10 seconds countdown
                } else if (data.PlayerCount >= 2 && data.PlayerCount < 4) {
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
    } else {
        alert('Please enter a name!');
    }
}

function startGameCountdown(seconds) {
    const timerElement = document.getElementById('WRtimer');
    timerElement.textContent = `Game starts in ${seconds} seconds`;

    countdownTimer = setInterval(() => {
        seconds--;
        timerElement.textContent = `Game starts in ${seconds} seconds`;

        if (seconds <= 0) {
            clearInterval(countdownTimer);
            router.navigateTo('/game'); // Start the game
        }
    }, 1000);
}

export default RegisterPlayer;