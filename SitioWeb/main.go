package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"html/template"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"os"
)

type curso struct {
	Nombre string
}

func getServiceJs(w http.ResponseWriter, r *http.Request) {

	url := "http://localhost:3000/saludo"

	log.Printf(url)

	//Enviamos una peticion GET a nodejs
	resp, err := http.Get(url)
	if err != nil {
		log.Fatalln(err)
	}

	defer resp.Body.Close()
	bodyBytes, _ := ioutil.ReadAll(resp.Body)

	log.Printf(string(bodyBytes))

	var c curso
	_ = json.Unmarshal(bodyBytes, &c)

	t := template.Must(template.ParseFiles("index.html"))
	t.Execute(w, c)
}

func postServiceJs(w http.ResponseWriter, r *http.Request) {

	url := "http://localhost:3000/analizar"

	log.Printf(url)
	java := r.FormValue("contenido-archivo")
	req, err := json.Marshal(map[string]string{
		"contenido": java,
	})
	//Enviamos una peticion POST a nodejs
	resp, err := http.Post(url, "application/json", bytes.NewBuffer(req))
	if err != nil {
		log.Fatal(err)
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
	}
	log.Println(string(body))

	t := template.Must(template.ParseFiles("index.html"))
	t.Execute(w, "")
}

func index(w http.ResponseWriter, r *http.Request) {
	t := template.Must(template.ParseFiles("index.html"))
	t.Execute(w, "")
}

func uploader(w http.ResponseWriter, r *http.Request) {
	r.ParseMultipartForm(2000)

	file, fileInfo, err := r.FormFile("file")

	f, err := os.OpenFile("./public/"+fileInfo.Filename, os.O_WRONLY|os.O_CREATE, 0666)

	if err != nil {
		log.Fatal(err)
		return
	}
	defer f.Close()

	io.Copy(f, file)

	//fmt.Fprintf(w, fileInfo.Filename)
	t := template.Must(template.ParseFiles("index.html"))
	t.Execute(w, "")
}

func main() {

	http.Handle("/public/", http.StripPrefix("/public/", http.FileServer(http.Dir("public/"))))
	http.HandleFunc("/", index)
	http.HandleFunc("/node", getServiceJs)
	http.HandleFunc("/analizar", postServiceJs)
	http.HandleFunc("/upload", uploader)
	log.Println("Running")
	http.ListenAndServe(":8080", nil)
	fmt.Println("Escuchando")
}
