import { EventSystem } from '../core/events.js';
import { Router } from '../core/router.js';



export const EventPlayNow = new EventSystem()
export let socket
const butt = document.querySelector(".button")

export function WebsocketOn() {
    EventPlayNow.on('click', "#play", (e) => {
        e.preventDefault()
        console.log(location.host);

        socket = new WebSocket(`ws:localhost:8081/ws`)
    })

}



