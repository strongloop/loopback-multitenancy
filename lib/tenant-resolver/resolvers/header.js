module.exports = function headerResolverMiddleware(req, res, next) {
  var tenants = req.app.get('tenants');
  var tenant;
  for (var i = 0; i < tenants.length; i++) {
    if (tenants[i].username === req.user.username) {
      tenant = tenants[i];
    }
  }
  if (!tenant)
    return next(new Error('Invalid tenant'));

  req.tenant = {
    id: tenant.tenantId,
    groupId: req.params.groupId,
    resourceId: req.params.resourceId,
  };
  next();
};
