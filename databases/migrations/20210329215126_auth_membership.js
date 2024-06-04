exports.up = (knex) => {
  return knex.schema.createTable("auth_membership", (table) => {
    table.increments("id").primary();
    table.integer("id_user").notNullable();
    table.integer("id_group").notNullable();
    table.foreign("id_user").references("id").inTable("auth_user");
    table.foreign("id_group").references("id").inTable("auth_group");
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable("auth_membership");
};
