/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("links", (table) => {
    table.increments("id").primary();
    table.string("label").notNullable();
    table.string("url").notNullable().unique();
    table.boolean("active").defaultTo(1);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("links");
};
