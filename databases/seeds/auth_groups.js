exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("auth_group")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("auth_group").insert([
        {
          id: 1,
          role: "admin",
          description: null,
        },
        {
          id: 2,
          role: "client",
          description: null,
        },
      ]);
    });
};
