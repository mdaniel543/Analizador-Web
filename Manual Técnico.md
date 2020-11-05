# Manual Técnico 



- #### Frontend

Se utiliza HTML, CSS, JavaScript para poder darle un diseño a la pagina web

Con el uso del lenguaje Golang se levanta el servidor y se puede hacer las peticiones post a los demás servidores

Lo primero que la pagina le solicita es que se pueda cargar el archivo en el editor, o crear un archivo desde el editor. Ya hecho esto se procede enviar el texto al servidor de node 

![](https://github.com/mdaniel543/OLC1_P2_201709450/blob/master/Imagenes/Captura%20de%20pantalla%20(40).png)

- #### Backend

Con el backend utilizamos JavaScript con node js que hacemos que reciba las peticion del servidor web 

Para analizar la entrada y dar como resultado la traducción de JavaScript utilizamos la herramienta de jison que es  un analizador que nos devuelve un json y utilizamos objetos para poder desarrollar el árbol AST



- #### Docker

Con docker creamos la imagen de cada servidor 

###### Servicio de node js

```
docker build -t Servicio . 
```

###### Servidor Web

```
docker build -t SitioWeb .
```

y se utiliza el docker compose para que se puedan comunicar las imagenes  

###### Docker Compose 

```
docker -compose up
```

