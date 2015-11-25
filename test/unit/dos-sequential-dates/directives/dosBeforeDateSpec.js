'use strict';

// Test the dos-before-date directive
//

describe('dosBeforeDate', function() {
    // Store references to scope and element
    // so they are available to all tests in this describe block
    var element, scope, modelController;

    // Load the module, which contains the directive
    beforeEach(module('dosSequentialDates'));


    beforeEach(inject(function($compile, $rootScope) {
        // make scope and put data into it
        scope = $rootScope.$new();
        scope.model = {};

        // compile some html with the directive and provide the scope
        // 2 fields, each a date; start_date should be before end_date
        //
        element = $compile('<form name="testForm">' +
                           '  <input name="startInput" ng-model="model.start_date" dos-before-date="model.end_date"/>' +
                           '  <input name="testInput" ng-model="model.end_date" />' +
                           '</form>')(scope);

        scope.$digest();   // required to force scope data thru to element

        modelController = scope.testForm.startInput;
    }));

    afterEach(function() {
        scope.$destroy();  // scope is not cleaned up within Karma so must destroy
    });

    it('should be valid if start-date before end-date', function() {
        scope.model.start_date = "12/02/2015";
        scope.model.end_date = "12/25/2015"; // date to be before
        scope.$digest();
        expect(modelController.$valid).toBe(true);
        expect(modelController.$error['sequential']).toBeUndefined();
        expect(modelController.$viewValue).toBe(scope.model.start_date);
    });


    it('should be invalid with sequential error if end-date before start-date', function() {
        scope.model.start_date = "12/12/2015"; // date to be before
        scope.model.end_date = "12/02/2015";
        scope.$digest();
        expect(modelController.$valid).toBe(false);
        expect(modelController.$error['sequential']).toBe(true);
    });
});
