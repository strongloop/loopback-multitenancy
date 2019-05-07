// Copyright IBM Corp. 2016. All Rights Reserved.
// Node module: loopback-multitenancy
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

var chai = require('chai');
var dirtyChai = require('dirty-chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

chai.use(dirtyChai);
chai.use(sinonChai);

exports.expect = chai.expect;
exports.sinon = sinon;
