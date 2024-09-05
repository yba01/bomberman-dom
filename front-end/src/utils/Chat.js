import { createElement } from "../core/dom.js";

export function chatHandle(socket) {
    const message = document.getElementById('MessageInput')
    let messageContent = message.value
    console.log(messageContent);
    
    let messageStruct = {
        MessageType: "chat",
        TheMessage: messageContent,
        PlayerCount: 0,
        PlayerName: ""
    }
    socket.send(JSON.stringify(messageStruct))
    message.value = ''
}

export function chatDisplay(message) {
    const broadCast = document.getElementById('BroadcastChat')
    broadCast.append(createElement('p', {}, message.PlayerName+':'+message.TheMessage).render())
}