// 1. Encontrar las ciudades más cercanas sobre la colección recién creada mediante
//    un enfoque MapReduce conforme a los pasos que se ilustran en el tutorial
//    práctico.
var map = function() {
	var key = this.CountryID;
	var value = {data: [{city: this.City, lat: this.Latitude, lng: this.Longitude}]};
	emit(key, value);
};

var reduce = function(key, values) {
	var reduced = {data: []};
	for(var i in values) {
		var inter = values[i];
		for(var j in inter.data)
			reduced.data.push(inter.data[j]);
	}
	return reduced;
};

var finalize = function(key, reduced) {
	if(reduced.data.length == 1){
		return {CountryID: key, message: "Este país sólo tiene una ciudad"};
	}
	var min = 999999999999;
	var city1 = {name: ""};
	var city2 = {name: ""};
	for(var i=0; i<reduced.data.length; i++){
		for(var j=i+1; j<reduced.data.length; j++){
			var x1 = reduced.data[i].lat;
			var y1 = reduced.data[i].lng;
			var x2 = reduced.data[j].lat;
			var y2 = reduced.data[j].lng;
			var d = (x2-x1)*(x2-x1) + (y2-y1)*(y2-y1);
			if(d < min){
				city1.name = reduced.data[i].city;
				city2.name = reduced.data[j].city;
				min = d;
			}
		}
	}
	return {CountryID: key, city1: city1.name, city2: city2.name, distance: Math.sqrt(min)};
};

db.cities.mapReduce(map, reduce, {finalize: finalize, query: { CountryID: { $ne: 254 } }, out: { merge: "near_cities" }});

// 2. ¿Cómo podríamos obtener la ciudades más distantes en cada país?
// cambiamos la función finalize para que busque la distancia máxima en lugar
// de la mínima
var finalize = function(key, reduced) {
	if(reduced.data.length == 1){
		return {CountryID: key, message: "Este país sólo tiene una ciudad"};
	}
	var max = -1;
	var city1 = {name: ""};
	var city2 = {name: ""};
	for(var i=0; i<reduced.data.length; i++){
		for(var j=i+1; j<reduced.data.length; j++){
			var x1 = reduced.data[i].lat;
			var y1 = reduced.data[i].lng;
			var x2 = reduced.data[j].lat;
			var y2 = reduced.data[j].lng;
			var d = (x2-x1)*(x2-x1) + (y2-y1)*(y2-y1);
			if(d > max){
				city1.name = reduced.data[i].city;
				city2.name = reduced.data[j].city;
				max = d;
			}
		}
	}
	return {CountryID: key, city1: city1.name, city2: city2.name, distance: Math.sqrt(max)};
}

db.cities.mapReduce(map, reduce, {finalize: finalize, query: { CountryID: { $ne: 254 } }, out: { merge: "far_cities" }});

// 3. ¿Qué ocurre si en un país hay dos parejas de ciudades que están a la misma
//    distancia mínima? ¿Cómo harías para que aparecieran todas?
// de nuevo, solo modificamos la función finalize para que añada las ciudades
// con la misma distancia que la mínima a una lista
var finalize = function(key, reduced) {
	if(reduced.data.length == 1){
		return {CountryID: key, message: "Este país sólo tiene una ciudad"};
	}
	var min = 999999999999;
	var cities = [];
	for(var i=0; i<reduced.data.length; i++){
		for(var j=i+1; j<reduced.data.length; j++){
			var x1 = reduced.data[i].lat;
			var y1 = reduced.data[i].lng;
			var x2 = reduced.data[j].lat;
			var y2 = reduced.data[j].lng;
			var d = (x2-x1)*(x2-x1) + (y2-y1)*(y2-y1);
			if(d < min){
				min = d;
				cities = [];
				cities.push({city1: reduced.data[i].city, city2: reduced.data[j].city})
			}
			else if(d == min){
				cities.push({city1: reduced.data[i].city, city2: reduced.data[j].city})
			}
		}
	}
	return {CountryID: key, cities: cities, distance: Math.sqrt(min)};
}

db.cities.mapReduce(map, reduce, {finalize: finalize, query: { CountryID: { $ne: 254 } }, out: { merge: "near_cities2" }});

// 4. ¿Cómo podríamos obtener adicionalmente la cantidad de parejas de ciudades
//    evaluadas para cada país consultado?
// podemos hacerlo añadiendo un contador en la función finalize
var finalize = function(key, reduced) {
	if(reduced.data.length == 1){
		return {CountryID: key, message: "Este país sólo tiene una ciudad"};
	}
	var max = -1;
	var city1 = {name: ""};
	var city2 = {name: ""};
	var count = 0;
	for(var i=0; i<reduced.data.length; i++){
		for(var j=i+1; j<reduced.data.length; j++){
			var x1 = reduced.data[i].lat;
			var y1 = reduced.data[i].lng;
			var x2 = reduced.data[j].lat;
			var y2 = reduced.data[j].lng;
			var d = (x2-x1)*(x2-x1) + (y2-y1)*(y2-y1);
			if(d > max){
				city1.name = reduced.data[i].city;
				city2.name = reduced.data[j].city;
				max = d;
			}
			count = count + 1;
		}
	}
	return {CountryID: key, city1: city1.name, city2: city2.name, distance: Math.sqrt(max), count: count};
}

db.cities.mapReduce(map, reduce, {finalize: finalize, query: { CountryID: { $ne: 254 } }, out: { merge: "near_cities_count" }});

// 6. ¿Cómo podríamos obtener la distancia media entre las ciudades de cada país?.
// la función map y reduce serían igual que las anteriores y en la función finalize
// calculamos la distancia media dividiendo la suma de todas las distancias entre
// el número de parejas de ciudades evaluadas
var finalize = function(key, reduced) {
	if(reduced.data.length == 1){
		return {CountryID: key, message: "Este país sólo tiene una ciudad"};
	}
	var suma = 0;
	var count = 0;
	for(var i=0; i<reduced.data.length; i++){
		for(var j=i+1; j<reduced.data.length; j++){
			var x1 = reduced.data[i].lat;
			var y1 = reduced.data[i].lng;
			var x2 = reduced.data[j].lat;
			var y2 = reduced.data[j].lng;
			var d = (x2-x1)*(x2-x1) + (y2-y1)*(y2-y1);
			suma = suma + Math.sqrt(d);
			count = count + 1;
		}
	}
	return {CountryID: key, distance_mean: suma/count};
}

db.cities.mapReduce(map, reduce, {finalize: finalize, query: { CountryID: { $ne: 254 } }, out: { merge: "mean_distance_cities" }});

// 7. ¿Mejoraría el rendimiento si creamos un índice? ¿Sobre que campo? Comprobadlo.
db.cities.ensureIndex({CountryID: 1});

