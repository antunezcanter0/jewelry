exports.up = (knex) => {
  return knex.schema.createTable("producto", (table) => {
    table.increments("id").primary();
    table.string("producto");
    table.string("descripcion");
    table.string("imagen");
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable("producto");
};
