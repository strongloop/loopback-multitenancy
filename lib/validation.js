exports.mountPath = mountPath;
exports.params = validateParams;
exports.restApiRoot = restApiRoot;
exports.scheme = validateScheme;

function mountPath(mountPath) {
  //should be a valid url or default to '' (because this gets appended to
  //restApiRoot -- ie. /api + '')
}

function restApiRoot(restApiRoot) {
  // should be a valid url or default to /api
}

function validateParams(validParams, givenParams) {
  for (var i = 0; i < validParams.length; i++) {
    var validParamName = validParams[i].name;
    var param = given[validParamName];
    var validParamType = validParams[i].type;
    if (typeof param !== validParamType)
      return new Error(f('Invalid %s. Expected %s, got %s.',
        validParamName, validParamType, typeof param));
  }
}

function validateScheme(scheme) {
  // should loop the resolvers dir to get valid schemes array based on filenames
  // without .js extension (filenames === scheme names)
  // this will allow us to copy paste new schemes without modifying anything else in the module
  var validSchemes = ['header', 'url', 'virtual-host'];
  // use array.includes instead once node6 is our recommended version
  var isValidScheme = validSchemes.indexOf(scheme) !== -1;
  if (!isValidScheme)
    // loop resolvers dir to form error message listing valid schemes
    // the name of the scheme should be the same as the filename without .js
    throw new Error('Invalid scheme `' + scheme + '`. Must be `header`, ' +
      '`url` or `virtual-host`');
}
