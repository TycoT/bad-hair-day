exports.up = function (knex, Promise) {

  return knex
    .schema
    .createTable('ingredients', function (ingredientsTable) {

      // Primary Key
      ingredientsTable.increments();

      // Data
      ingredientsTable.string('name', 50).notNullable();
      ingredientsTable.string('desc', 250).notNullable();
      ingredientsTable.string('rating', 50).notNullable();
      ingredientsTable.string('guid', 36).notNullable().unique();

      ingredientsTable.timestamp('created_at').notNullable();

    })

};

exports.down = function (knex, Promise) {

  // We use `...ifExists` because we're not sure if the table's there. Honestly, this is just a safety measure. 
  return knex
    .schema
    .dropTableIfExists('ingredientsTable')

};