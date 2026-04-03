const authService = require('./auth.service');
const { createUserSchema } = require('../users/user.schema');

const login = async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  const result = await authService.login(email, password);
  res.json({ success: true, data: result });
};

const register = async (req, res) => {
  const validatedData = createUserSchema.parse(req.body);
  const result = await authService.register(validatedData);
  res.status(201).json({ success: true, data: result });
};

module.exports = { login, register };
