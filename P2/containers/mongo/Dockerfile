FROM mvertes/alpine-mongo
COPY restaurantes.json /restaurantes.json
CMD mongoimport --db restaurants --collection restaurants --drop --file restaurantes.json
