exports.up = (knex) => {
  return knex.schema.createTable("color", (table) => {
    table.increments("id").primary();
    table.string("color");
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable("color");
};
