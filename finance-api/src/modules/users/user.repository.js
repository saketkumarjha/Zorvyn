const db = require('../../config/db');

const findAll = () => db('users').select('id', 'name', 'email', 'role', 'is_active', 'created_at');
const findById = (id) => db('users').where({ id }).first('id', 'name', 'email', 'role', 'is_active', 'created_at');
const findByEmail = (email) => db('users').where({ email }).first();
const create = (data) => db('users').insert(data).returning(['id', 'name', 'email', 'role']);
const updateStatus = (id, is_active) => db('users').where({ id }).update({ is_active }).returning(['id', 'is_active']);

const update = (id, data) => {
  data.updated_at = db.fn.now();
  return db('users').where({ id }).update(data).returning(['id', 'name', 'email', 'role', 'is_active']);
};
const del = (id) => db('users').where({ id }).del(); // Hard delete per requirement

module.exports = {
  findAll,
  findById,
  findByEmail,
  create,
  updateStatus,
  update,
  del
};
