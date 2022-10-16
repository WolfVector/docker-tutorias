# Documentación docker

Esta documentación es relacionada a docker, si quieres ver la documentación de la página web ingresa al siguiente enlace <a href="../web_project">doc</a>

## Estructura

Los archivos relacionados a docker los podrás encontrar en la carpeta padre:
- mongo.yaml
- prod.yaml
- Dockerfile

## mongo.yaml
En este archivo se especifican las imágenes que se utilizarán para la base de datos, `mongo` y `mongo-express`. Si inspecciones el código notarás que hay parámetros que se les especifica a estos contenedores. Básicamente es otra forma de escribir `docker run`.

---

```
volumes: #Volumen para persistir datos
      - mongo-data:/data/db
```
En el código de arriba se establece la persistencia de datos. `mongo-data` es el nombre del volumen que es manejado por docker para guardar la información fuera del contenedor y `/data/db` es la **ruta dentro del contenedor** que mongodb utiliza para guardar los datos.

En otras palabras, cada vez que ejecutamos los contenedores, `mongo-data` es montado o transferido al espacio virtual `/data/db`.

## prod.yaml
Muy similar a `mongo.yaml` con la diferencia que aquí se crea el contenedor de la página web:
```
web_project: #Contenedor de nuestra aplicacion
    build: .
    ports:
      - 3000:3000
```

La línea `build: .` ejecuta el archivo Dockerfile que se encuentra en la carpeta padre.

## Dockerfile
Este archivo se encarga de crear la imagen para la página web. 
- `FROM node`: esto descargará la imagen base, es decir, la imagen en la cual correrá nuestra aplicación.
- `RUN mkdir -p /home/app`: crea una carpeta `app` dentro del contenedor.
- `COPY ./web_project /home/app`: copia la página web al contenedor
- `WORKDIR /home/app`: cambia de directorio (en el contenedor)
- `RUN npm install`: instala las dependencias del proyecto
- `RUN npm run build`: compila (producción)
- `CMD ["npm", "run", "start"]`: Corre la aplicación. Cabe destacar que `CMD` es un punto de entrada, es decir, se ejecutará cuando sea llamado (se llama automaticamente en `prod.yaml`, no es necesario hacer `docker run`)
