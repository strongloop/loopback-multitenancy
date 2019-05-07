// Copyright IBM Corp. 2016. All Rights Reserved.
// Node module: loopback-multitenancy
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

var describe = require('../describe');
var expect = require('../init').expect;
var loopback = require('loopback');
var request = require('supertest');
var tenantResolver = require('../../lib/tenant-resolver');

var app;

describe('tenant resolver', function() {
  before(setUpLoopBackAppWithResolver);

  it('sets tenant data on the request object', function(done) {
    var observedRequest = null;
    app.use(function(req, res, next) {
      observedRequest = req;
      next();
    });
    request(app).get('/api/1/2/Todo').end(function(err) {
      if (err) return done(err);

      expect(observedRequest).to.have.property('tenant').eql({
        id: '1',
        modelId: '2',
        modelName: 'Todo',
      });
      done();
    });
  });
});

function setUpLoopBackAppWithResolver() {
  app = loopback({localRegistry: true});
  var db = app.dataSource('db', {connector: 'memory'});
  var Todo = app.registry.createModel('Todo', {});
  Todo.attachTo(db);
  app.use('/api/:tenantId/:modelId/:modelName', tenantResolver);
}
