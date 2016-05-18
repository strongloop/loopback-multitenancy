var f = require('util').format;

module.exports = function() {
  return function modelResolver(req, res, next) {
    if (!req.tenant)
      return next(new Error('`req.tenant` is undefined. Did you register the ' +
        'tenant resolver middleware?'));

    var namespacedUrl = f('%s/%s_%s_%s',
      req.app.get('restApiRoot'),
      req.tenant.id,
      req.tenant.modelId,
      req.tenant.modelName);
    req.url = namespacedUrl;
    next();
  };
};
