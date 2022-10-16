# Proyecto Docker

Este será el repositorio para el proyecto de sistemas virtuales. Aquí encontarás los pasos para instalar y la <a href="/doc">documentación</a>.

## Instalación

Para la instalación sigue los siguientes pasos:
- Primero que nada deben instalar <a href="https://nodejs.org/es/">node</a>
- Tener docker instalado
- Clona el repositorio o descarga el zip de esta página (en el botón `code`)
- Accede con la terminal a la carpeta descomprimida. Ahí verás otra carpeta llamada `web_project`, accede a ella y ejecuta el siguiente comando:

```
$ npm install
```
Esto instalará las dependencias.

## Base de datos

La base de datos utilizada por el momento es mongodb. Si desean cambiarla no hay problema, es lo de menos. Sólo avísenme para hacer los cambios.

La base de datos ya es persistente, es decir, pueden detener y eliminar los conetendores y los datos seguirán intactos.

## Correr la aplicación en ambiente de prueba

En el ambiente de prueba sólo los contenedores de la base de datos son creados. El contenedor de la página web es únicamente creado en el ambiente de producción. Esto se hace así para agilizar el proceos de modificaciones y testeo.

Para probar la aplicación ejecuta el siguiente comando en la carpeta padre (**Nota: es muy probable que tengas que abrir docker y esperar a que se inicialize**)
```
$ docker-compose -f mongo.yaml up 
```
Esto descargará el contenedor de mongodb y una interfaz para ver la base de datos (similar a phpMyAdmin)

En otra terminal entra a la carpeta `web_project` e ingresa:
```
$ npm run dev
```
Con esto el ambiente de prueba estará corriendo. Puedes acceder a la página con la url `localhost:3000`.
Para realizar una prueba y verificar que la base de datos está funcionado pueden acceder a `localhost:3000/api/hello`. Esta url creará un tutelado en la tabla `tutelados`, dicha tabla se localiza en la tabla `tutorias`.  

Puedes acceder a la base de datos con la url `localhost:8081`

Si deseas detener el ambiente de prueba, con otra terminal ingresa a la carpeta padre y ejecuta:
```
$ docker-compose -f mongo.yaml down
```

Esto dentendrá y eliminará los contenedores.

Para deter la página web abre la terminal donde está corriendo dicho proceso e ingresa `Ctrl+C`.

Si corren nuevamente el ambiente de prueba e ingresan a la base de datos, podrán ver que la información permaneció intacta.

## Correr la aplicación en producción

Ingresa a la carpeta padre con una terminal y ejecuta:
```
$ docker-compose -f prod.yaml up
```

Esto no sólo creará los contenedores de la base de datos, sino también el contenedor de la página web.
Podrás acceder a la página web y a la base de datos con las mismas urls que viene especificadas arriba.

Para detener y eliminar los contenedores ingresa:

```
$ docker-compose -f prod.yaml down
```

#### Cualquier duda o comentario avísenme :)