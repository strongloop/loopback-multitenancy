var f = require('util').format;

module.exports = function modelResolver(req, res, next) {
  if (!req.tenant)
    return next();

  var namespacedUrl = f('/%s_%s_%s',
    req.tenant.id,
    req.tenant.modelId,
    req.tenant.modelName);
  req.url = namespacedUrl;
  next();
};
