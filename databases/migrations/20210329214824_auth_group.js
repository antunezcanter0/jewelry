exports.up = (knex) => {
  return knex.schema.createTable("auth_group", (table) => {
    table.increments("id").primary();
    table.string("role");
    table.string("description");
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable(auth_group);
};
