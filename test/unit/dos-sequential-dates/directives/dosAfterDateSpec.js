'use strict';

// Test the dos-after-date directive
//

describe('dosAfterDate', function() {
    // Store references to scope and element
    // so they are available to all tests in this describe block
    var element, scope, modelController;

    // Load the module, which contains the directive
    beforeEach(module('dosSequentialDates'));


    beforeEach(inject(function($compile, $rootScope) {
        // make scope and put data into it
        scope = $rootScope.$new();
        scope.vm = {};

        // compile some html with the directive and provide the scope
        // 2 fields, each a date; end_date should be after start_date
        //
        element = $compile('<form name="testForm">' +
                           '  <input name="startInput" ng-model="vm.start_date" />' +
                           '  <input name="testInput" ng-model="vm.end_date" dos-after-date="vm.start_date"/>' +
                           '</form>')(scope);

        scope.$digest();   // required to force scope data thru to element

        modelController = scope.testForm.testInput;
    }));

    afterEach(function() {
        scope.$destroy();  // scope is not cleaned up within Karma so must destroy
    });

    it('should be valid when end-date after start-date', function() {
        scope.vm.start_date = "12/02/2015";
        scope.vm.end_date = "12/25/2015";
        scope.$digest();
        expect(modelController.$valid).toBe(true);
        expect(modelController.$error['sequential']).toBeUndefined();
        expect(modelController.$viewValue).toBe(scope.vm.end_date);
    });

    it('should be valid when end-date same as start-date', function() {
        scope.vm.start_date = "12/02/2015";
        scope.vm.end_date = "12/02/2015";
        scope.$digest();
        expect(modelController.$valid).toBe(true);
        expect(modelController.$error['sequential']).toBeUndefined();
        expect(modelController.$viewValue).toBe(scope.vm.end_date);
    });

    it('should be invalid with sequential error when end-date not after start-date', function() {
        scope.vm.start_date = "12/12/2015"; // date to be before
        scope.vm.end_date = "12/02/2015";
        scope.$digest();
        expect(modelController.$valid).toBe(false);
        expect(modelController.$error['sequential']).toBe(true);
    });
});
