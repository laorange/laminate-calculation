package main

import (
	"embed"
	"math/rand"
	"net/http"
	"os/exec"
	"strconv"
	"time"
)

//go:embed dist
var dist embed.FS

func main() {
	rand.Seed(time.Now().UnixNano())
	PORT := strconv.Itoa(8000 + rand.Intn(1000)) // 在8000-9000随机挑一个作为端口

	url := `http://127.0.0.1:`+PORT+"/dist/"

	println("这个黑框是复合材料性能计算程序的本地后台服务，请勿在结束使用前关闭它")
	println("您可以访问 " + url + " 来使用程序")

	http.Handle("/", http.FileServer(http.FS(dist)))

	// windows
	// exec.Command(`cmd`, `/c`, `start`, url).Start()

	// mac
	exec.Command(`open`, url).Start()

	http.ListenAndServe(":"+PORT, nil)
}
