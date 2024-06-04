exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("forma_pago")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("forma_pago").insert([
        {
          id: 1,
          forma_pago: "Paypal",
          descripcion: null,
        },
        {
          id: 2,
          forma_pago: "Credict card",
          descripcion: null,
        },
        {
          id: 3,
          forma_pago: "Cach",
          descripcion: null,
        },
      ]);
    });
};
