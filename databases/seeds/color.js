exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("color")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("color").insert([
        {
          id: 1,
          color: "Amarillo",
        },
        {
          id: 2,
          color: "Blanco",
        },
        {
          id: 3,
          color: "Rosa",
        },
        {
          id: 4,
          color: "Rodinado",
        },
      ]);
    });
};
