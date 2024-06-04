exports.up = (knex) => {
  return knex.schema.createTable("articulo", (table) => {
    table.increments("id").primary();
    table.integer("id_producto_categoria").notNullable();
    table.integer("id_proveedor").notNullable();
    table.integer("id_color").notNullable();
    table.integer("id_kilate").notNullable();
    table.string("descripcion");
    table.float("peso");
    table.float("largo");
    table.float("ancho");
    table.string("imagen");
    table.integer("existencia").defaultTo(0);
    table.boolean("en_oferta").defaultTo(false);
    table.float("precio_costo");
    table.float("precio_venta");
    table.float("precio_oferta");
    table.integer("deseado").defaultTo(0);
    table.integer("compartido").defaultTo(0);
    table.timestamp("fecha").defaultTo(knex.fn.now());
    table.boolean("activo").defaultTo(true);    

    // References
    table.foreign("id_producto_categoria").references("id").inTable("producto_categoria");
    table.foreign("id_proveedor").references("id").inTable("proveedor");
    table.foreign("id_color").references("id").inTable("color");
    table.foreign("id_kilate").references("id").inTable("kilate");
  })
};

exports.down = (knex) => {
  return knex.schema.dropTable("articulo");
};
