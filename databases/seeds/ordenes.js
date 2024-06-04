exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("orden")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("orden").insert([
        {
          id: 142,
          id_user: 120,
          id_articulo: 1,
          id_forma_pago: 1,
          id_estado_orden: 3,
          entrega_domicilio: true,
          direccion: "jhgvhgkh k ",
          cantidad: 2,
          id_venta: 202191438,
          fecha: "2021-09-14T10:32:39.896Z",
        },
        {
          id: 143,
          id_user: 120,
          id_articulo: 3,
          id_forma_pago: 1,
          id_estado_orden: 3,
          entrega_domicilio: true,
          direccion: "jhgvhgkh k ",
          cantidad: 2,
          id_venta: 202191438,
          fecha: "2021-09-14T10:32:39.896Z",
        },
        {
          id: 144,
          id_user: 120,
          id_articulo: 1,
          id_forma_pago: 1,
          id_estado_orden: 2,
          entrega_domicilio: true,
          direccion: "jASLNASMDN ",
          cantidad: 2,
          id_venta: 202191439,
          fecha: "2021-09-14T10:53:00.388Z",
        },
        {
          id: 145,
          id_user: 120,
          id_articulo: 2,
          id_forma_pago: 1,
          id_estado_orden: 2,
          entrega_domicilio: true,
          direccion: "jASLNASMDN ",
          cantidad: 2,
          id_venta: 202191439,
          fecha: "2021-09-14T10:53:00.388Z",
        },
        {
          id: 141,
          id_user: 120,
          id_articulo: 2,
          id_forma_pago: 1,
          id_estado_orden: 1,
          entrega_domicilio: true,
          direccion: "bdn D A.DS.",
          cantidad: 4,
          id_venta: 202191437,
          fecha: "2021-09-14T10:24:34.268Z",
        },
      ]);
    });
};
