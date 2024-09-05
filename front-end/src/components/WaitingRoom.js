import { createElement } from "../core/dom.js";

function WaitingRoomComponent() {
    const waitingMessage = createElement('h2', { id: 'waitingMessage' }, 'Waiting for other players to join... (1/4)');
    const timer = createElement('h3', { id: 'WRtimer' }, 'At least 2 players...')
    const inputMessage = createElement('input', {type: 'text', placeholder: 'send a message', id: 'MessageInput'})
    const submitMessage = createElement('button', {type: 'submit', id: 'sendMessage'}, 'SEND MESS')
    const broadcast = createElement('div', {id: 'BroadcastChat'})
    const chat = createElement('div', {id: 'chatSpace'}, broadcast, inputMessage, submitMessage)
    const waitingContainer = createElement('div', { class: 'waiting-container' },timer,  waitingMessage, chat);
    return waitingContainer
}

export default WaitingRoomComponent