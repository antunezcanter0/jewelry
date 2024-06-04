exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("proveedor")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("proveedor").insert([
        {
          id: 1,
          proveedor: "Prueba",
          descripcion: "Proveedor de prueba",
        },
      ]);
    });
};
