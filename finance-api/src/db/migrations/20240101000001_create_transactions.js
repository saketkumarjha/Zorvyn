exports.up = function(knex) {
  return knex.schema.createTable('transactions', table => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().references('id').inTable('users').onDelete('SET NULL');
    table.decimal('amount', 15, 2).notNullable();
    table.string('type', 20).notNullable();
    table.string('category', 100).notNullable();
    table.date('date').notNullable();
    table.text('notes');
    table.datetime('deleted_at', { useTz: true }).defaultTo(null);
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('transactions');
};
