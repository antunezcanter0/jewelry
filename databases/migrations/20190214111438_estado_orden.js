
exports.up = function(knex) {
    return knex.schema.createTable("estado_orden", (table) => {
        table.increments("id").primary();
        table.string("estado_orden");
        table.string("descripcion");
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("estado_orden");
};
