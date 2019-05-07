// Copyright IBM Corp. 2016. All Rights Reserved.
// Node module: loopback-multitenancy
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

var describe = require('../describe');
var expect = require('../init').expect;
var loopback = require('loopback');
var modelResolver = require('../../lib/model-resolver');
var request = require('supertest');
var tenantResolver = require('../../lib/tenant-resolver');

var app, Todo;

describe('model resolver', function() {
  beforeEach(setUpLoopBackAppWithResolvers);

  it('maps the URL to a namespaced URL', function(done) {
    var observedUrl;
    app.use(function(req, res, next) {
      observedUrl = req.url;
      next();
    });
    app.use(app.get('restApiRoot'), loopback.rest());
    request(app).get('/api/1/Joe/Todos').end(function(err, res) {
      if (err) return done(err);
      expect(observedUrl).to.equal('/api/1_Joe_Todos');
      done();
    });
  });

  it('returns the correct model data', function(done) {
    app.use(app.get('restApiRoot'), loopback.rest());
    Todo.create({content: 'a'}, function(err, todo) {
      if (err) return done(err);

      request(app).get('/api/1/Joe/Todos').expect(200, function(err, res) {
        if (err) return done(err);
        expect(res.body).to.eql([{id: 1, content: 'a'}]);
        done();
      });
    });
  });
});

function setUpLoopBackAppWithResolvers() {
  app = loopback({localRegistry: true});

  var db = app.dataSource('db', {connector: 'memory'});
  Todo = app.registry.createModel('1_Joe_Todo');
  Todo.attachTo(db);
  app.model(Todo);

  app.set('legacyExplorer', false);
  app.set('restApiRoot', '/api');

  app.use('/api/:tenantId/:modelId/:modelName', tenantResolver);
  app.use(modelResolver);
}
