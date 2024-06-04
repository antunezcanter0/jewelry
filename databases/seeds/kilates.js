exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("kilate")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("kilate").insert([
        {
          id: 1,
          kilate: 1,
        },
        {
          id: 2,
          kilate: 8,
        },
        {
          id: 3,
          kilate: 10,
        },
        {
          id: 4,
          kilate: 14,
        },
        {
          id: 5,
          kilate: 18,
        },
        {
          id: 6,
          kilate: 20,
        },
        {
          id: 7,
          kilate: 22,
        },
        {
          id: 8,
          kilate: 24,
        },
      ]);
    });
};
