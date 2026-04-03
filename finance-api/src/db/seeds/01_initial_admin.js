const bcrypt = require('bcrypt');

exports.seed = async function(knex) {
  await knex('transactions').del();
  await knex('users').del();
  
  const hash = await bcrypt.hash('admin123', 10);
  
  await knex('users').insert([
    {
      name: 'Super Admin',
      email: 'admin@finance.local',
      password_hash: hash,
      role: 'admin',
      is_active: true
    }
  ]);
};
