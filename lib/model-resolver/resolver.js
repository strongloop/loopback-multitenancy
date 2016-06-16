var format = require('util').format;

module.exports = function modelResolverMiddleware(req, res, next) {
  if (!req.tenant)
    return next();

  var namespacedUrl = format('/%s_%s_%s',
    req.tenant.id, req.tenant.groupId, req.tenant.resourceId);
  req.url = namespacedUrl;
  next();
};
