'use strict';
/* beautify preserve:start */
import 'chai';
import {expect} from 'chai';
import MainController from './main-controller';
/* beautify preserve:end */

describe('MainController', () => {

  it('should default randomNumber to null', () => {
    let ctrl = new MainController();
    expect(ctrl.randomNumber).to.equal(null);
  });

  it('should contain a  generateNumber', () => {
    let ctrl = new MainController();
    expect(ctrl.generateNumber).to.be.defined;
  });

  it('should generate a random number', () => {
    let ctrl = new MainController();
    ctrl.generateNumber();
    expect(ctrl.randomNumber).to.not.equal(null);
  });
});
