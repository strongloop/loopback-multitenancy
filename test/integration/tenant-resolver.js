var expect = require('../init').expect;
var loopback = require('loopback');
var request = require('supertest');
var tenantResolver = require('../../lib/tenant-resolver');

var app;

describe('tenant resolver', function() {
  before(setUpLoopBackApp);
  before(registerTenantResolver);

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

function setUpLoopBackApp() {
  app = loopback({localRegistry: true});
  var db = app.dataSource('db', {connector: 'memory'});
  var Todo = app.registry.createModel('Todo', {});
  Todo.attachTo(db);
}

function registerTenantResolver() {
  app.use('/api/:tenantId/:modelId/:modelName', tenantResolver);
}
