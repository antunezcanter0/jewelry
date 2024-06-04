exports.up = (knex) => {
  return knex.schema.createTable("orden", (table) => {
    table.increments("id").primary();
    table.integer("id_user").notNullable();
    table.integer("id_articulo").notNullable();
    table.integer("id_forma_pago").notNullable();
    table.integer("id_estado_orden").notNullable();
    table.boolean("entrega_domicilio").defaultTo(false);
    table.string("direccion");
    table.integer("cantidad");
    table.integer("id_venta");
    table.timestamp("fecha").defaultTo(knex.fn.now());
    
    // References
    table.foreign("id_user").references("id").inTable("auth_user");
    table.foreign("id_articulo").references("id").inTable("articulo");
    table.foreign("id_forma_pago").references("id").inTable("forma_pago");
    table.foreign("id_estado_orden").references("id").inTable("estado_orden");
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable("orden");
};
