// Copyright IBM Corp. 2016. All Rights Reserved.
// Node module: loopback-multitenancy
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

var describe = require('../describe');
var expect = require('../init').expect;
var sinon = require('../init').sinon;
var tenantResolver = require('../../lib/tenant-resolver');

describe('tenant resolver', function() {
  context('middleware', function() {
    it('should be a function', function() {
      expect(tenantResolver).to.be.a('function');
    });

    it('should call `next` when execution is finished', function() {
      var spy = sinon.spy();
      tenantResolver(getValidRequest(), null, spy);
      expect(spy).to.have.been.called();
    });
  });

  context('validation', function() {
    it('is invalid when tenant id is a not string', function(done) {
      var reqWithInvalidTenantId = {
        params: {
          tenantId: false,
        },
      };
      tenantResolver(reqWithInvalidTenantId, null, function(err) {
        expect(err).to.exist();
        expect(err.message).to.contain('Invalid');
        done();
      });
    });

    it('is valid when tenant id is a string', function(done) {
      tenantResolver(getValidRequest(), null, function(err) {
        expect(err).to.not.exist();
        done();
      });
    });

    it('is invalid when model id is not a string', function(done) {
      var reqWithInvalidModelId = {
        params: {
          tenantId: '1',
          modelId: false,
        },
      };
      tenantResolver(reqWithInvalidModelId, null, function(err) {
        expect(err).to.exist();
        expect(err.message).to.contain('Invalid');
        done();
      });
    });

    it('is valid when model id is a string', function(done) {
      tenantResolver(getValidRequest(), null, function(err) {
        expect(err).to.not.exist();
        done();
      });
    });

    it('is invalid when model name is not a string', function(done) {
      var reqWithInvalidModelName = {
        params: {
          tenantId: '1',
          modelId: '1',
          modelName: false,
        },
      };
      tenantResolver(reqWithInvalidModelName, null, function(err) {
        expect(err).to.exist();
        expect(err.message).to.contain('Invalid');
        done();
      });
    });

    it('is valid when model name is a string', function(done) {
      tenantResolver(getValidRequest(), null, function(err) {
        expect(err).to.not.exist();
        done();
      });
    });
  });

  context('request object tenant data', function() {
    var req;

    before(setModifiedRequest);

    it('contains the tenant id', function() {
      expect(req.tenant.id).to.equal('1');
    });

    it('contains the model id', function() {
      expect(req.tenant.modelId).to.equal('1');
    });

    it('contains the model name', function() {
      expect(req.tenant.modelName).to.equal('Customer');
    });

    function setModifiedRequest(done) {
      // tenant resolver modifies the original request object during execution,
      // therefore we need to store the modified instance to verify changes
      req = getValidRequest();
      tenantResolver(req, {}, done);
    }
  });
});

function getValidRequest() {
  return {
    params: {
      tenantId: '1',
      modelId: '1',
      modelName: 'Customer',
    },
  };
}
