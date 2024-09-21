package handlers

import (
	"bombermandom/pkg/models"
	"log"
)

func broadcast(mess models.Message) {
	models.Mu.Lock()
	defer models.Mu.Unlock()
	for player, conn := range players {
		err := conn.WriteJSON(mess)
		if err != nil {
			log.Println("Error sending player count:", err)
			removePlayer(player)
		}
	}
}

func removePlayer(player string) {
	var mess models.Message
	delete(players, player)
	if len(players) <= 1 {
		gameStarted = false
	}
	mess.MessageType = "playerCount"
	mess.PlayerCount = len(players)
	broadcast(mess)
}
