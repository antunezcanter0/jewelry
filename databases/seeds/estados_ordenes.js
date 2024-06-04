exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("estado_orden")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("estado_orden").insert([
        {
          id: 1,
          estado_orden: "Ordenada",
          descripcion: "Orden creada por cliente",
        },
        {
          id: 2,
          estado_orden: "Aprobada",
          descripcion: "Aprobada por la tienda",
        },
        {
          id: 3,
          estado_orden: "Facturada",
          descripcion:
            "Facturada por la tienda, en espera de ser recogida en la tienda o entregada en el domicilio",
        },
        {
          id: 4,
          estado_orden: "Terminada",
          descripcion: "Orden terminada, entregada al cliente",
        },
      ]);
    });
};
