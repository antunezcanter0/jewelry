exports.up = function (knex) {
  return knex.schema.createTable("consecutivo", (table) => {
    table.increments("id").primary();
    table.integer("anno").defaultTo(new Date().getFullYear())
    table.integer("valor").defaultTo(0);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("consecutivo");
};
