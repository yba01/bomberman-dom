package handlers

import (
	"bombermandom/pkg/models"
	"fmt"
	"math/rand"

	"github.com/gorilla/websocket"
)

const (
	Empty                     = 0
	WallFixed                 = 1
	WallDestructible          = 2
	WallDestructibleAndBomb   = 3
	WallDestructibleAndSpeed  = 4
	WallDestructibleAndFlames = 5
)

func randomValues() [][2]int { 
	pairExists := func(pairs [][2]int, x, y int) bool {
		for _, pair := range pairs {
			if pair[0] == x && pair[1] == y {
				return true
			}
		}
		return false
	}
	pairs := [][2]int{}
	for len(pairs) < 3 {
		x := rand.Intn(7) + 3 // génère un nombre entre 3 et 9
        y := rand.Intn(13) + 3 

		// Vérifier que x et y ne sont pas tous les deux pairs
		if !(x%2 == 0 && y%2 == 0 && !pairExists(pairs, x, y)) {
			pairs = append(pairs, [2]int{x, y})
		}
	}
	fmt.Println(pairs)
	return pairs
}

var RandomValues = randomValues()

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
			} else if i == RandomValues[0][0] && j == RandomValues[0][1] {
				gameMap[i][j] = WallDestructibleAndSpeed
			} else if i == RandomValues[1][0] && j == RandomValues[1][1] {
				gameMap[i][j] = WallDestructibleAndBomb
			} else if i == RandomValues[2][0] && j == RandomValues[2][1] {
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
		PowerUpIndex: RandomValues,
	}

	if playerConn, ok := players[playerName]; ok {
		playerConn.WriteJSON(msg)
	}

}
