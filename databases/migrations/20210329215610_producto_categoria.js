exports.up = (knex) => {
  return knex.schema.createTable("producto_categoria", (table) => {
    table.increments("id").primary();
    table.integer("id_categoria").notNullable();
    table.integer("id_producto").notNullable();

    // References
    table.foreign("id_categoria").references("id").inTable("categoria");
    table.foreign("id_producto").references("id").inTable("producto");
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable("producto_categoria");
};
