import { eventSystem } from "../app.js"
import { sendMessage } from "./messages.js"
import { movePlayer } from "./Mouvements.js"
import { socket, username } from "./Player.js"

export default function setGame() {
    document.querySelector(".chatRoom").style.display = "none"
    document.querySelector(".game-map").style.display = "block"
    document.querySelector(".info").style.display = "block"
    let count = 10

    eventSystem.on('keydown', '#root', (e)=>{
        console.log('chekcing movements');
        
        if (count % 10 == 0) {
            movePlayer(e)
        }
        count++
    })
    eventSystem.on('keyup', '#root', (e)=>{
        console.log('chekcing movements');
        
        count = 0
    })
}