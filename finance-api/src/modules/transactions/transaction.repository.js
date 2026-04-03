const db = require('../../config/db');

const findAll = (filters = {}) => {
  let query = db('transactions').whereNull('deleted_at');
  
  if (filters.type) query = query.where({ type: filters.type });
  if (filters.category) query = query.where({ category: filters.category });
  if (filters.startDate) query = query.where('date', '>=', filters.startDate);
  if (filters.endDate) query = query.where('date', '<=', filters.endDate);
  
  const limitValue = parseInt(filters.limit);
  const pageValue = parseInt(filters.page);

  if (!isNaN(limitValue) && limitValue > 0) {
    query = query.limit(limitValue);
    
    if (!isNaN(pageValue) && pageValue > 0) {
      const offset = (pageValue - 1) * limitValue;
      query = query.offset(offset);
    }
  }
  
  return query.orderBy('date', 'desc');
};

const findById = (id) => db('transactions').where({ id }).whereNull('deleted_at').first();

const create = (data) => db('transactions').insert(data).returning('*');

const update = (id, data) => {
  data.updated_at = db.fn.now();
  return db('transactions').where({ id }).whereNull('deleted_at').update(data).returning('*');
};

const softDelete = (id) => db('transactions').where({ id }).update({ deleted_at: db.fn.now() }).returning(['id']);

module.exports = {
  findAll,
  findById,
  create,
  update,
  softDelete
};
