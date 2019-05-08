// Copyright IBM Corp. 2016. All Rights Reserved.
// Node module: loopback-multitenancy
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

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
