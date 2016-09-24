'use strict';

module.exports = function(app, cb) {
  /*eslint-disable camelcase*/
  var One_Joe_Todo = app.models.One_Joe_Todo;
  app.dataSources.db1.automigrate('One_Joe_Todo', function(err) {
    if (err) return cb(err);
    One_Joe_Todo.create([
      {content: 'a'},
      {content: 'b'},
      {content: 'c'},
    ], cb);
  });
  /*eslint-enable camelcase*/
};
