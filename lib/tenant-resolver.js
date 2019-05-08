// Copyright IBM Corp. 2016. All Rights Reserved.
// Node module: loopback-multitenancy
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

var f = require('util').format;

module.exports = function tenantResolver(req, res, next) {
  // validation
  var tenantParams = [
    {name: 'tenantId', type: 'string'},
    {name: 'modelId', type: 'string'},
    {name: 'modelName', type: 'string'},
  ];
  var err;
  for (var i = 0, n = tenantParams.length; i < n; i++) {
    var tenantName = tenantParams[i].name;
    var param = req.params[tenantName];
    var tenantType = tenantParams[i].type;
    if (!param || typeof param !== tenantType) {
      var errMsg = f('Invalid %s. Expected %s, got %s.',
        tenantName, tenantType, typeof param);
      err = new Error(errMsg);
      break;
    }
  }

  if (err)
    return next(err);

  req.tenant = {
    id: req.params.tenantId,
    modelId: req.params.modelId,
    modelName: req.params.modelName,
  };
  next();
};
