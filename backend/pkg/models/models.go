package models

type Player struct {
	MessageType string
	Username    string
	InGameName  string
	Height      string
	Width       string
	Bomb_X      int
	Bomb_Y      int
	SpeedUp     bool
	BombUp      bool
}

type Message struct {
	MessageType  string
	TheMessage   string
	PlayerCount  int
	Player       Player
	DataMap      [][]int
	PowerUpIndex [][2]int
}
