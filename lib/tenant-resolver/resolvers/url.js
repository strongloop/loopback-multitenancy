var f = require('util').format;
var validate = require('../../validation');

module.exports = function urlResolverMiddleware(req, res, next) {
  // validate tenantId in req.params
  // validate groupId in req.params
  // validate resourceId in req.params
  req.tenant = {
    id: req.params.tenantId,
    groupId: req.params.groupId,
    resourceId: req.params.resourceId,
  };
  next();
};
