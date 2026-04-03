const userRepository = require('./user.repository');
const bcrypt = require('bcrypt');

const getAllUsers = async () => {
  return await userRepository.findAll();
};

const getUserById = async (id) => {
  const user = await userRepository.findById(id);
  if (!user) throw { statusCode: 404, message: 'User not found' };
  return user;
};

const createUser = async (userData) => {
  const existingUser = await userRepository.findByEmail(userData.email);
  if (existingUser) {
    throw { statusCode: 409, message: 'Email already in use' };
  }

  const password_hash = await bcrypt.hash(userData.password, 10);
  
  const payload = {
    name: userData.name,
    email: userData.email,
    password_hash,
    role: userData.role || 'viewer',
    is_active: userData.is_active !== undefined ? userData.is_active : true
  };

  const [newUser] = await userRepository.create(payload);
  return newUser;
};

const updateUserStatus = async (id, is_active) => {
  const user = await userRepository.findById(id);
  if (!user) throw { statusCode: 404, message: 'User not found' };

  const [updatedUser] = await userRepository.updateStatus(id, is_active);
  return updatedUser;
};

const updateUser = async (id, data) => {
  const user = await userRepository.findById(id);
  if (!user) throw { statusCode: 404, message: 'User not found' };

  const [updatedUser] = await userRepository.update(id, data);
  return updatedUser;
};

const deleteUser = async (id) => {
  const user = await userRepository.findById(id);
  if (!user) throw { statusCode: 404, message: 'User not found' };

  await userRepository.del(id);
  return { success: true };
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserStatus,
  updateUser,
  deleteUser
};
