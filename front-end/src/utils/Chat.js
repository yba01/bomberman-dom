import { createElement } from "../core/dom.js";

export function chatHandle(socket) {
    const message = document.getElementById('MessageInput')
    let messageContent = message.value
    if (messageContent.split(' ').join('') == '' || messageContent.length > 40) {
        alert('invalid message (must be shorter than 40 and not empty)')
        return
    }
    console.log(messageContent);
    
    let messageStruct = {
        MessageType: "chat",
        TheMessage: messageContent,
        PlayerCount: 0,
    }
    socket.send(JSON.stringify(messageStruct))
    message.value = ''
}

export function chatDisplay(message) {
    const broadCast = document.getElementById('BroadcastChat')
    broadCast.append(createElement('p', {}, message.Player.Username+':'+message.TheMessage).render())
}