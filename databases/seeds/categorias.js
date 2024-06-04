exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("categoria")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("categoria").insert([
        {
          id: 3,
          categoria: "Hombre",
          descripcion: null,
          imagen:
            "static/uploads/images/285eb385573829e489e88cfe93266aa006d3.jpeg",
        },
        {
          id: 1,
          categoria: "Niños",
          descripcion: "Relaciona las joyas que se correspondan con niños",
          imagen:
            "static/uploads/images/fac2b52b3a4693189a7b5c5034fcd662580a.jpeg",
        },
        {
          id: 2,
          categoria: "Mujer",
          descripcion: "Prendas de mujer",
          imagen:
            "static/uploads/images/212ca601e70567b58c627d26b453056bb6bb.jpeg",
        },
      ]);
    });
};
