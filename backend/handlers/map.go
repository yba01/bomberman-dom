package handlers

import (
	"bombermandom/pkg/models"
	"fmt"
	"math/rand"

	"github.com/gorilla/websocket"
)

const (
	Empty            = 0
	WallFixed        = 1
	WallDestructible = 2
	WallDestructibleAndBomb = 3
	WallDestructibleAndSpeed = 4
	WallDestructibleAndFlames = 5

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
			} else if (i == 6 && j == 9) {
				gameMap[i][j] = WallDestructibleAndSpeed
			} else if (i == 6 && j == 5){
				gameMap[i][j] = WallDestructibleAndBomb
			}else if (i == 6 && j == 13) {
				gameMap[i][j] = WallDestructibleAndFlames
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
	fmt.Println(gameMap)
	return gameMap
}

func DrawMap(playerName string, dataMap [][]int, palyers map[string]*websocket.Conn) {
	msg := models.Message{
		MessageType: "drawmap",
		DataMap:     dataMap,
	}

	if playerConn, ok := players[playerName]; ok {
		playerConn.WriteJSON(msg)
	}

}
