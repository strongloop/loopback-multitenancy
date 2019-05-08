// Copyright IBM Corp. 2016. All Rights Reserved.
// Node module: loopback-multitenancy
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

module.exports = function(app, cb) {
  /*eslint-disable camelcase*/
  var Two_Bob_Todo = app.models.Two_Bob_Todo;
  app.dataSources.db2.automigrate('Two_Bob_Todo', function(err) {
    if (err) return cb(err);
    Two_Bob_Todo.create([
      {content: 'd'},
      {content: 'e'},
      {content: 'f'},
    ], cb);
  });
  /*eslint-enable camelcase*/
};
