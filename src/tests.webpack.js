// This file is an entry point for angular tests
// Avoids some weird issues when using webpack + angular.

import 'angular';
import 'chai';
import 'angular-mocks/angular-mocks';
import {expect} from 'chai';

var testsContext = require.context(".", true, /.test$/);
testsContext.keys().forEach(testsContext);
