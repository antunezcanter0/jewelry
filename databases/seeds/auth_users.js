
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('auth_user').del()
    .then(function () {
      // Inserts seed entries
      return knex('auth_user').insert([
      {
          "id": 120,
          "first_name": "Ariel",
          "last_name": "Antunez Cantero",
          "username": "ariel.antunezcantero",
          "email": "ariel.antunezcantero@gmail.com",
          "password": "$2b$10$iw6NskyxSo.yXru3CxEpdOg50SbYhNcPZqHvIdeRnUCwWdOWX.gZe"
      }
      ]);
    });
};
