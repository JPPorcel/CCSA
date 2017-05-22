// 1. No total de clientes
db.pedidos.count()

// 2. No total de clientes de Jaén
db.pedidos.find({Localidad: "Jaen"}).count()

// 3. Facturación total clientes por localidad
db.pedidos.aggregate([
	{$group:
		{_id: "$Localidad",
		 total: {$sum : "$Facturacion"}}
	}
])

// 4. Facturación media de clientes por localidad para las localidades distintas a
//    "Jaen" con facturación media mayor de 5000. Ordenación por Localidad
//    descendente. Eliminar el _id y poner el nombre en mayúsculas.
db.pedidos.aggregate([
	{$match: {Localidad: {$ne: "Jaen"}}},
	{$group:
		{_id: "$Localidad",
		 media: {$avg : "$Facturacion"}}
	},
	{$match: {media: {$gt: 5000}}},
	{$sort: {_id: -1}},
	{$project: {_id: 0, Localidad: {$toUpper: "$_id"}, media: 1}}
])

// 5. Calcula la cantidad total facturada por cada cliente (uso de “unwind”)
db.pedidos.aggregate([
	{$unwind: "$Pedidos"},
	{$unwind: "$Pedidos.Productos"},
	{$group: 
		{_id: {id_cliente: "$id_cliente", nombre: "$Nombre"},
		 "Total Cliente": {$sum : {$multiply: ["$Pedidos.Productos.Precio_unidad", "$Pedidos.Productos.Cantidad"]}}}
	}
])

