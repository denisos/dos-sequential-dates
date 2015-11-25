'use strict';

describe('', function() {

  var module;
  var dependencies;
  dependencies = [];

  var hasModule = function(module) {
    return dependencies.indexOf(module) >= 0;
  };

  beforeEach(function() {

  // Get module
  module = angular.module('dosSequentialDates');
    dependencies = module.requires;
  });

  it('should load config module', function() {
    expect(hasModule('dosSequentialDates.config')).toBe(true);
  });

  it('should load directives module', function() {
    expect(hasModule('dosSequentialDates.directives')).toBe(true);
  });

  it('should load services module', function() {
    expect(hasModule('dosSequentialDates.services')).toBe(true);
  });


});