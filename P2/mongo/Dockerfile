FROM mongo
COPY restaurantes.json /restaurantes.json
CMD mongoimport --host mongodb --db restaurants --collection restaurants --drop --file restaurantes.json
