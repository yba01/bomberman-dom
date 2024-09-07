package handlers

import (
	"fmt"
	"log"
)

func broadcast(mess Message) {
	fmt.Println("broadcasting", mess)
	for player, conn := range players {
		err := conn.WriteJSON(mess)
		if err != nil {
			log.Println("Error sending player count:", err)
			removePlayer(player)
		}
	}
}

func removePlayer(player string) {
	fmt.Println("removed:", player)
	var mess Message
	delete(players, player)
	mess.MessageType = "playerCount"
	mess.PlayerCount = len(players)
	broadcast(mess)
}
