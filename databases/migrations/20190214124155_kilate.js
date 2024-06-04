
exports.up = (knex) => {
    return knex.schema.createTable("kilate", (table) => {
        table.increments("id").primary();
        table.integer("kilate");
  })
};

exports.down = (knex) => {
  return knex.schema.dropTable("kilate");
};
