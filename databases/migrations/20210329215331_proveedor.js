exports.up = (knex) => {
  return knex.schema.createTable("proveedor", (table) => {
    table.increments("id").primary();
    table.string("proveedor");
    table.string("descripcion");
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable("proveedor");
};
