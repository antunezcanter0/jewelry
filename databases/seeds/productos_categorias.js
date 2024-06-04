exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("producto_categoria")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("producto_categoria").insert([
        {
          id: 1,
          id_categoria: 1,
          id_producto: 1,
        },
        {
          id: 3,
          id_categoria: 1,
          id_producto: 5,
        },
        {
          id: 4,
          id_categoria: 1,
          id_producto: 6,
        },
        {
          id: 5,
          id_categoria: 2,
          id_producto: 1,
        },
        {
          id: 6,
          id_categoria: 2,
          id_producto: 2,
        },
        {
          id: 9,
          id_categoria: 2,
          id_producto: 3,
        },
        {
          id: 10,
          id_categoria: 2,
          id_producto: 4,
        },
        {
          id: 11,
          id_categoria: 2,
          id_producto: 5,
        },
        {
          id: 13,
          id_categoria: 2,
          id_producto: 6,
        },
        {
          id: 14,
          id_categoria: 3,
          id_producto: 1,
        },
        {
          id: 15,
          id_categoria: 3,
          id_producto: 2,
        },
        {
          id: 17,
          id_categoria: 3,
          id_producto: 5,
        },
        {
          id: 18,
          id_categoria: 3,
          id_producto: 6,
        },
      ]);
    });
};
