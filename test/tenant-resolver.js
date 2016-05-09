var tenantResolver = require('../lib/tenant-resolver');

describe('tenant resolver', function() {
  var resolver, validReq;

  before('set up the tenant resolver', function() {
    resolver = tenantResolver();
  });
  before('set up a valid request', function() {
    validReq = {
      params: {
        tenantId: '1',
        modelId: '1',
        modelName: 'Customer',
      },
    };
  });

  describe('middleware', function() {
    it('should be a function', function() {
      expect(resolver).to.be.a('function');
    });

    it('should call `next` when execution is finished', function() {
      var spy = sinon.spy();
      resolver(validReq, null, spy);
      expect(spy).to.have.been.called();
    });
  });

  describe('validation', function() {
    it('is invalid when tenant id is a not string', function(done) {
      var req = {
        params: {
          tenantId: false,
        },
      };
      resolver(req, null, function(err) {
        expect(err).to.exist();
        expect(err.message).to.contain('Invalid');
        done();
      });
    });

    it('is valid when tenant id is a string', function(done) {
      resolver(validReq, null, function(err) {
        expect(err).to.not.exist();
        done();
      });
    });

    it('is invalid when model id is not a string', function(done) {
      var req = {
        params: {
          tenantId: '1',
          modelId: false,
        },
      };
      resolver(req, null, function(err) {
        expect(err).to.exist();
        expect(err.message).to.contain('Invalid');
        done();
      });
    });

    it('is valid when model id is a string', function(done) {
      resolver(validReq, null, function(err) {
        expect(err).to.not.exist();
        done();
      });
    });

    it('is invalid when model name is a not string', function(done) {
      var req = {
        params: {
          tenantId: '1',
          modelId: '1',
          modelName: false,
        },
      };
      resolver(req, null, function(err) {
        expect(err).to.exist();
        expect(err.message).to.contain('Invalid');
        done();
      });
    });

    it('is valid when model name is a string', function(done) {
      resolver(validReq, null, function(err) {
        expect(err).to.not.exist();
        done();
      });
    });
  });

  describe('request object tenant data', function() {
    var req = {
      params: {
        tenantId: '1',
        modelId: '1',
        modelName: 'Customer',
      },
    };

    it('contains the tenant id', function(done) {
      resolver(req, {}, function() {
        expect(req.tenant.id).to.equal('1');
        done();
      });
    });

    it('contains the model id', function(done) {
      resolver(req, {}, function() {
        expect(req.tenant.modelId).to.equal('1');
        done();
      });
    });

    it('contains the model name', function(done) {
      resolver(req, {}, function() {
        expect(req.tenant.modelName).to.equal('Customer');
        done();
      });
    });
  });
});
