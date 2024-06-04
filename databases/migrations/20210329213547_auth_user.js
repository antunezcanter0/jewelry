exports.up = (knex) => {
  return knex.schema.createTable("auth_user", (table) => {
    table.increments("id").primary();
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.string("username").notNullable();
    table.string("email").notNullable().unique();
    table.string("password");
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable("auth_user");
};
