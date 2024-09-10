package handlers

import (
	"bombermandom/pkg/models"
	"fmt"
	"log"
)

func broadcast(mess models.Message) {
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
	var mess models.Message
	delete(players, player)
	mess.MessageType = "playerCount"
	mess.PlayerCount = len(players)
	broadcast(mess)
}
