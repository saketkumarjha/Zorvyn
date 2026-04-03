const { ROLE_PERMISSIONS } = require('../constants/permissions');

const authorize = (requiredPermission) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({ success: false, message: 'Unauthorized: User not authenticated properly' });
    }

    const userPermissions = ROLE_PERMISSIONS[req.user.role] || [];
    if (!userPermissions.includes(requiredPermission)) {
      return res.status(403).json({ success: false, message: 'Forbidden: Insufficient permissions' });
    }

    next();
  };
};

module.exports = authorize;
