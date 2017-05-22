# Práctica 3: Bases de datos NoSQL. MongoDB.

El objetivo de esta práctica es familiarizarse con el uso de un sistema de gestión de bases de datos en entornos Big Data. Para ello, se hará uso de la aplicación más conocida en este ámbito como es MongoDB.

## Objetivo #1 [tarea1.js]()

Crear la colección pedidos en cada BD asociada a vuestro usuario, sobre la que se realizarán diversas operaciones CRUD. Para crear la colección abre y ejecuta el script insertar_pedidos.js (accesible en tmp/mongo). Las tareas a realizar son las siguientes:

1. Visualiza la colección pedidos y familiarízate con ella. Observa los distintos tipos de datos y sus estructuras dispares.
2. Visualiza sólo el primer documento de la colección. Utiliza los métodos .limit()y.findOne().
3. Visualiza el cliente con id_cliente = 2222.
4. Visualiza los clientes que hayan pedido algún producto de más de 94 euros.
5. Visualiza los clientes de Jaén o Salamanca (excluye los datos de los pedidos). Utiliza los operador $or e $in.
6. Visualiza los clientes no tienen campo pedidos.
7. Visualiza los clientes que hayan nacido en 1963.
8. Visualiza los clientes que hayan pedido algún producto fabricado por Canon y algún producto cuyo precio sea inferior a 15 euros.
9. Datos personales (id_cliente, Nombre, Direccion, Localidad y Fnacimiento) de los clientes cuyo nombre empieza por la cadena "c" (No distinguir entre mayusculas y minúsculas).
10. Visualiza los datos personales de los clientes (excluyendo _id). Limita los documentos a 4.
11. Ídem anterior pero ordenando los documentos por Localidad (ascendente) e id_cliente (descendente).


## Objetivo #2 [tarea2.js]()

A partir de la colección pedidos utilizaremos consultas más complejas por medio de los operadores de agregación (pipeline). Las tareas a realizar en este caso obtener:

1. No total de clientes.
2. No total de clientes de Jaén.
3. Facturación total clientes por localidad.
4. Facturación media de clientes por localidad para las localidades distintas a "Jaen" con facturación media mayor de 5000. Ordenación por Localidad descendente. Eliminar el _id y poner el nombre en mayúsculas.
5. Calcula la cantidad total facturada por cada cliente (uso de “unwind”).

## Objetivo #3 [tarea3.js]()

Vamos a utilizar la base de datos libre GeoWorldMap de GeoBytes. Es una base de datos de países, con sus estados/regiones y ciudades importantes. Sobre esta Base de datos vamos a obtener el par de ciudades que se encuentran más cercanas en cada país, excluyendo a los EEUU. Vamos a importar en nuestra BD de MongoDB un archivo con 37245 ciudades del mundo que está en formato csv (/tmp/mongo/Cities.csv)

Las tareas a realizar en este caso son las siguientes:
1. Encontrar las ciudades más cercanas sobre la colección recién creada mediante un enfoque MapReduce conforme a los pasos que se ilustran en el tutorial práctico.
2. ¿Cómo podríamos obtener la ciudades más distantes en cada país?
3. ¿Qué ocurre si en un país hay dos parejas de ciudades que están a la misma distancia mínima? ¿Cómo harías para que aparecieran todas?
4. ¿Cómo podríamos obtener adicionalmente la cantidad de parejas de ciudades evaluadas para cada país consultado?
5. ¿Cómo podríamos la distancia media entre las ciudades de cada país?
6. ¿Mejoraría el rendimiento si creamos un índice?¿Sobre que campo? Comprobadlo.
