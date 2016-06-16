var validate = require('../validation');

exports.getMountPath = getMountPath;
exports.getResolver = getResolver;

function getMountPath(app, options) {
  var restApiRoot = app.get('restApiRoot') || 'url';
  validate.restApiRoot(restApiRoot);
  var mountPath = options.mountPath || '';
  validate.mountPath(mountPath);
  // normalize mountPath for windows
  return restApiRoot + mountPath;
}

function getResolver(options) {
  var scheme = options.scheme || 'url';
  validate.scheme(scheme);
  // use path to normalize the /'s in the require
  var schemeBasedTenantResolverMiddleware = require('./resolvers/' + scheme);
  return schemeBasedTenantResolverMiddleware;
}
