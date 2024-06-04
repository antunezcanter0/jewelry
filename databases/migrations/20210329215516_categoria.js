exports.up = (knex) => {
  return knex.schema.createTable("categoria", (table) => {
    table.increments("id").primary();
    table.string("categoria");
    table.string("descripcion");
    table.string("imagen");
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable("categoria");
};
