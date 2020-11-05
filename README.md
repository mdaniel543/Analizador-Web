# Manual de Usuario 

1. ##### Inicio 

![](https://github.com/mdaniel543/OLC1_P2_201709450/blob/master/Imagenes/Captura%20de%20pantalla%20(36).png)

> Se muestra el diseño de inicio y se coloca con mucho énfasis donde poder subir el archivo que se desea analizar



2. ##### Subir archivo y cargar 

![](https://github.com/mdaniel543/OLC1_P2_201709450/blob/master/Imagenes/Captura%20de%20pantalla%20(37).png)

> Se selecciona el archivo de tipo java localmente y se presiona enviar para cargarlo en el servidor 

3. ##### Se muestra el archivo en editor

![](https://github.com/mdaniel543/OLC1_P2_201709450/blob/master/Imagenes/Captura%20de%20pantalla%20(39).png)



![](https://github.com/mdaniel543/OLC1_P2_201709450/blob/master/Imagenes/Captura%20de%20pantalla%20(40).png)

 

> Se puede visualizar el archivo y se le da en enviar cuando se desea analizar



4. ##### Descargar Traducción de JavaScript

![](https://github.com/mdaniel543/OLC1_P2_201709450/blob/master/Imagenes/Captura%20de%20pantalla%20(49).png)

> En la parte de arriba hay un apartado donde se puede descargar el archivo de JavaScript



5. ##### Descargar Traducción de Python

![](https://github.com/mdaniel543/OLC1_P2_201709450/blob/master/Imagenes/Captura%20de%20pantalla%20(50).png)

> En el mismo apartado para descarga, se puede descargar el archivo de tipo Python 



6. ##### Reporte de Tokens y errores 

![](https://github.com/mdaniel543/OLC1_P2_201709450/blob/master/Imagenes/Captura%20de%20pantalla%20(51).png)

![](https://github.com/mdaniel543/OLC1_P2_201709450/blob/master/Imagenes/Captura%20de%20pantalla%20(52).png)



> Se coloca un apartado de reportes donde se puede descargar el reporte que se desea, como se muestra en pantalla



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

