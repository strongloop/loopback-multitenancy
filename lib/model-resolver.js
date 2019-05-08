// Copyright IBM Corp. 2016. All Rights Reserved.
// Node module: loopback-multitenancy
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

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
