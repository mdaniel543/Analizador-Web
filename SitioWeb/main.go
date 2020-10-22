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

type ast struct {
	contenido string
}

var as = ""

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

	t := template.Must(template.ParseFiles("index.html"))
	t.Execute(w, "")
}

func postServiceJs(w http.ResponseWriter, r *http.Request) {

	url := "http://localhost:3000/analizar"

	log.Printf(url)
	java := r.FormValue("contenido-archivo")
	as = java
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

	var c ast
	_ = json.Unmarshal(body, &c)

	t := template.Must(template.ParseFiles("index.html"))
	t.Execute(w, c)
}

func postTraducorJs(w http.ResponseWriter, r *http.Request) {

	url := "http://localhost:3000/traductor"
	//log.Println(string(as))
	req, err := json.Marshal(map[string]string{
		"resultado": as,
	})
	resp, err := http.Post(url, "application/json", bytes.NewBuffer(req))
	if err != nil {
		log.Fatal(err)
	}
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
	}
	log.Println(string(body))

	var path = "./public/traduccion.js"
	var _, errs = os.Stat(path)
	//Crea el archivo si no existe
	if os.IsNotExist(errs) {
		var file, err = os.Create(path)
		if existeError(err) {
			return
		}
		defer file.Close()
	}
	var file, errss = os.OpenFile(path, os.O_RDWR, 0644)
	if existeError(errss) {
		return
	}
	defer file.Close()
	// Escribe algo de texto linea por linea
	_, err = file.WriteString(string(body))
	if existeError(err) {
		return
	}
	// Salva los cambios
	err = file.Sync()
	if existeError(err) {
		return
	}

	w.Header().Set("Content-Disposition", "attachment; filename= traduccion.js")
	w.Header().Set("Content-Type", "application/octet-stream")
	http.ServeFile(w, r, path)

	t := template.Must(template.ParseFiles("index.html"))
	t.Execute(w, "")
}

func postError(w http.ResponseWriter, r *http.Request) {

	url := "http://localhost:3000/reporterror"
	//log.Println(string(as))
	req, err := json.Marshal(map[string]string{
		"resultado": as,
	})
	resp, err := http.Post(url, "application/json", bytes.NewBuffer(req))
	if err != nil {
		log.Fatal(err)
	}
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
	}
	log.Println(string(body))

	var path = "./public/Errores.html"
	var _, errs = os.Stat(path)
	//Crea el archivo si no existe
	if os.IsNotExist(errs) {
		var file, err = os.Create(path)
		if existeError(err) {
			return
		}
		defer file.Close()
	}
	var file, errss = os.OpenFile(path, os.O_RDWR, 0644)
	if existeError(errss) {
		return
	}
	defer file.Close()
	// Escribe algo de texto linea por linea
	_, err = file.WriteString(string(body))
	if existeError(err) {
		return
	}
	// Salva los cambios
	err = file.Sync()
	if existeError(err) {
		return
	}

	w.Header().Set("Content-Disposition", "attachment; filename= Errores.html")
	w.Header().Set("Content-Type", "application/octet-stream")
	http.ServeFile(w, r, path)

	t := template.Must(template.ParseFiles("index.html"))
	t.Execute(w, "")
}

func postReporte(w http.ResponseWriter, r *http.Request) {

	url := "http://localhost:3000/reportetoken"
	//log.Println(string(as))
	req, err := json.Marshal(map[string]string{
		"resultado": as,
	})
	resp, err := http.Post(url, "application/json", bytes.NewBuffer(req))
	if err != nil {
		log.Fatal(err)
	}
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
	}
	log.Println(string(body))

	var path = "./public/Reporte.html"
	var _, errs = os.Stat(path)
	//Crea el archivo si no existe
	if os.IsNotExist(errs) {
		var file, err = os.Create(path)
		if existeError(err) {
			return
		}
		defer file.Close()
	}
	var file, errss = os.OpenFile(path, os.O_RDWR, 0644)
	if existeError(errss) {
		return
	}
	defer file.Close()
	// Escribe algo de texto linea por linea
	_, err = file.WriteString(string(body))
	if existeError(err) {
		return
	}
	// Salva los cambios
	err = file.Sync()
	if existeError(err) {
		return
	}

	w.Header().Set("Content-Disposition", "attachment; filename= ReporteTokens.html")
	w.Header().Set("Content-Type", "application/octet-stream")
	http.ServeFile(w, r, path)

	t := template.Must(template.ParseFiles("index.html"))
	t.Execute(w, "")
}

func postTraducorPy(w http.ResponseWriter, r *http.Request) {

	url := "http://localhost:3000/traductorpy"
	//log.Println(string(as))
	req, err := json.Marshal(map[string]string{
		"resultado": as,
	})
	resp, err := http.Post(url, "application/json", bytes.NewBuffer(req))
	if err != nil {
		log.Fatal(err)
	}
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
	}
	log.Println(string(body))

	var path = "./public/traduccion.py"
	var _, errs = os.Stat(path)
	//Crea el archivo si no existe
	if os.IsNotExist(errs) {
		var file, err = os.Create(path)
		if existeError(err) {
			return
		}
		defer file.Close()
	}
	var file, errss = os.OpenFile(path, os.O_RDWR, 0644)
	if existeError(errss) {
		return
	}
	defer file.Close()
	// Escribe algo de texto linea por linea
	_, err = file.WriteString(string(body))
	if existeError(err) {
		return
	}
	// Salva los cambios
	err = file.Sync()
	if existeError(err) {
		return
	}

	w.Header().Set("Content-Disposition", "attachment; filename= traduccion.py")
	w.Header().Set("Content-Type", "application/octet-stream")
	http.ServeFile(w, r, path)

	t := template.Must(template.ParseFiles("index.html"))
	t.Execute(w, "")
}

func existeError(err error) bool {
	if err != nil {
		fmt.Println(err.Error())
	}
	return (err != nil)
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
	http.HandleFunc("/traductor", postTraducorJs)
	http.HandleFunc("/error", postError)
	http.HandleFunc("/reporte", postReporte)
	http.HandleFunc("/traductorpy", postTraducorPy)
	log.Println("Running")
	http.ListenAndServe(":8080", nil)
	fmt.Println("Escuchando")
}
