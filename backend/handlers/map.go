package handlers

import (
	"math/rand/v2"

	"github.com/gorilla/websocket"
)

const (
	Empty            = 0
	WallFixed        = 1
	WallDestructible = 2
)

func GenerateMap(rows, cols int) [][]int {
	// Initialisation de la carte
	gameMap := make([][]int, rows)
	for i := range gameMap {
		gameMap[i] = make([]int, cols)
	}

	// Placement des murs fixes
	for i := 0; i < rows; i++ {
		for j := 0; j < cols; j++ {
			if i == 0 || i == rows-1 || j == 0 || j == cols-1 || (j%2 == 0 && 2 <= j && j <= 16 && i%2 == 0) {
				gameMap[i][j] = WallFixed
			} else if rand.Float64() < 0.2 { // Placement aléatoire des murs destructibles (20% de chance)
				if (i == 1 && j == 1) || (i == 1 && j == 17) ||
					(i == 11 && j == 1) || (i == 11 && j == 17) ||
					(i == 1 && j == 2) || (i == 2 && j == 1) ||
					(i == 1 && j == 16) || (i == 2 && j == 17) ||
					(i == 10 && j == 1) || (i == 11 && j == 2) ||
					(i == 10 && j == 17) || (i == 11 && j == 16) {
					continue
				}
				gameMap[i][j] = WallDestructible
			}
		}
	}

	return gameMap
}

func DrawMap(playerName string, dataMap [][]int, palyers map[string]*websocket.Conn) {
	msg := Message{
		MessageType: "drawmap",
		DataMap:     dataMap,
	}

	if playerConn, ok := players[playerName]; ok {
		playerConn.WriteJSON(msg)
	}

}
