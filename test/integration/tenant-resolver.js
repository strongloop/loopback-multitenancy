var expect = require('../init').expect;
var loopback = require('loopback');
var request = require('supertest');
var tenantResolver = require('../../lib/tenant-resolver');

var app;

describe('tenant resolver', function() {
  before(setUpLoopBackApp);
  before(registerTenantResolver);

  it('should set tenant data on the request object', function(done) {
    app.use(function(req, res, next) {
      expect(req.tenant).to.eql({id: '1', modelId: '2', modelName: 'Todo'});
      done();
    });
    app.use(loopback.rest()); // must be called later in the middleware chain
    request(app).get('/api/1/2/Todo').end();
  });
});

function setUpLoopBackApp() {
  app = loopback({localRegistry: true});
  var db = app.dataSource('db', {connector: 'memory'});
  var Todo = app.registry.createModel('Todo', {});
  Todo.attachTo(db);
  app.set('legacyExplorer', false);
}

function registerTenantResolver() {
  app.use('/api/:tenantId/:modelId/:modelName', tenantResolver());
}
