// Copyright IBM Corp. 2016. All Rights Reserved.
// Node module: loopback-multitenancy
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

var tenantResolver = require('./lib/tenant-resolver');
var modelResolver = require('./lib/model-resolver');

module.exports = function(app, options) {
  var tenantResolverMountPath = app.get('restApiRoot') +
    '/:tenantId/:modelId/:modelName';
  app.middleware('parse', options.tenantResolverMountPath, tenantResolver);

  var modelResolverMountPath = app.get('restApiRoot');
  app.middleware('parse', options.modelResolverMountPath, modelResolver);
};
