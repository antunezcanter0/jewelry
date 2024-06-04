exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("producto")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("producto").insert([
        {
          id: 2,
          producto: "Anillos",
          descripcion: null,
          imagen:
            "static/uploads/images/d995883270c5a989bea79785bb5672a2f2d1.jpeg",
        },
        {
          id: 3,
          producto: "Aretes",
          descripcion: "",
          imagen:
            "static/uploads/images/5c8564093f9a678cdd9aa14daf5c209dc58b.jpeg",
        },
        {
          id: 1,
          producto: "Cadenas",
          descripcion: " ",
          imagen:
            "static/uploads/images/05f3ddbf6893244df3c2d97b1cf75cde40a6.jpeg",
        },
        {
          id: 6,
          producto: "Medallas",
          descripcion: null,
          imagen:
            "static/uploads/images/dcb99b54a92f7ece77090871c85539554d87.jpg",
        },
        {
          id: 5,
          producto: "Relojes",
          descripcion: null,
          imagen:
            "static/uploads/images/461edd7380daf895d1b7d2decd48b496a508.jpeg",
        },
        {
          id: 4,
          producto: "Tobilleras",
          descripcion: null,
          imagen:
            "static/uploads/images/a6908b3f56a59b09c234722615d14c1dc206.jpg",
        },
      ]);
    });
};
