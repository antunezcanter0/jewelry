exports.up = (knex) => {
  return knex.schema.createTable("forma_pago", (table) => {
    table.increments("id").primary();
    table.string("forma_pago");
    table.string("descripcion");
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable("forma_pago");
};
