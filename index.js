var tenantResolver = require('./lib/tenant-resolver');
var modelResolver = require('./lib/model-resolver');

module.exports = function component(app, options) {
  app.set('tenants', options.tenants);
  registerTenantResolverMiddleware(app, options);
  registerModelResolverMiddleware(app, options);
};

function registerTenantResolverMiddleware(app, options) {
  var mountPath = tenantResolver.getMountPath(app, options);
  var middleware = tenantResolver.getResolver(options);
  app.middleware('parse', mountPath, middleware);
}

function registerModelResolverMiddleware(app, options) {
  var mountPath = modelResolver.getMountPath(app, options);
  var middleware = modelResolver.getResolver(options);
  app.middleware('parse', mountPath, middleware);
}
