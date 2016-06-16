var modelResolverMiddleware = require('./resolver');
var validate = require('../validation');

exports.getMountPath = getMountPath;
exports.getResolver = getResolver;

function getMountPath(app, options) {
  var restApiRoot = app.get('restApiRoot') || 'url';
  validate.restApiRoot(restApiRoot);
  return restApiRoot;
}

function getResolver() {
  return modelResolverMiddleware;
}
