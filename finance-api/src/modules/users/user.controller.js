const userService = require('./user.service');
const { createUserSchema, updateUserSchema, updateUserStatusSchema } = require('./user.schema');

const getAllUsers = async (req, res) => {
  const users = await userService.getAllUsers();
  res.json({ success: true, data: users });
};

const getUserById = async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  res.json({ success: true, data: user });
};

const createUser = async (req, res) => {
  const validatedData = createUserSchema.parse(req.body); 
  const user = await userService.createUser(validatedData);
  res.status(201).json({ success: true, data: user });
};

const updateUserStatus = async (req, res) => {
  const { id } = req.params;
  const validatedData = updateUserStatusSchema.parse(req.body);
  const user = await userService.updateUserStatus(id, validatedData.is_active);
  res.json({ success: true, data: user });
};

const updateUser = async (req, res) => {
  const validatedData = updateUserSchema.parse(req.body);
  const user = await userService.updateUser(req.params.id, validatedData);
  res.json({ success: true, data: user });
};

const deleteUser = async (req, res) => {
  await userService.deleteUser(req.params.id);
  res.status(204).send();
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserStatus,
  updateUser,
  deleteUser
};
