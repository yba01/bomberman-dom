package models


type Player struct {
	MessageType string
	Username string
	InGameName string
	Height string
	Width string
	Bomb_X int
	Bomb_Y int
}

type Message struct {
	MessageType string
	TheMessage string
	PlayerCount int
	Player Player
	DataMap [][]int
}
