const db = require('../../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService = require('../users/user.service');

const login = async (email, password) => {
  const user = await db('users').where({ email, is_active: true }).first();
  if (!user) {
    throw { statusCode: 401, message: 'Invalid credentials or inactive user' };
  }

  const isValid = await bcrypt.compare(password, user.password_hash);
  if (!isValid) {
    throw { statusCode: 401, message: 'Invalid credentials' };
  }

  // Create JWT
  const payload = {
    id: user.id,
    role: user.role,
    email: user.email,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
  
  return { token, user: { id: user.id, name: user.name, role: user.role } };
};

const register = async (userData) => {
  // Public registration forces 'viewer' role to prevent privilege escalation
  const newUserData = {
    ...userData,
    role: 'viewer',
    is_active: true
  };
  
  // create user
  await userService.createUser(newUserData);
  
  // auto login after registration
  return login(userData.email, userData.password);
};

module.exports = { login, register };
