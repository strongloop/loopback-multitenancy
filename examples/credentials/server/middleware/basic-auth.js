var auth = require('basic-auth');

module.exports = function() {
  return function(req, res, next) {
    var credentials = auth(req);
    if (!credentials)
      return next(new Error('Invalid credentials'));

    req.app.models.user.findOne({
      where: {
        username: credentials.name
      }
    }, function(err, user) {
      if (err) return next(err);

      if (!user) return next(new Error('Invalid credentials'));

      req.user = user;
      next();
    });
  };
};
