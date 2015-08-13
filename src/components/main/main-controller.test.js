'use strict';

import main from './index';

describe('MainController', () => {
  let $controller;

  beforeEach(angular.mock.module(main));

  beforeEach(angular.mock.inject((_$controller_) => {
    $controller = _$controller_;
  }));

  it('should default randomNumber to null', () => {
    let ctrl = $controller('MainController');
    expect(ctrl.randomNumber).to.equal(null);
  });

  it('should contain a  generateNumber', () => {
    let ctrl = $controller('MainController');
    expect(ctrl.generateNumber).to.be.defined;
  });

  it('should generate a random number', () => {
    let ctrl = $controller('MainController');
    ctrl.generateNumber();
    expect(ctrl.randomNumber).to.not.equal(null);
  });
});
