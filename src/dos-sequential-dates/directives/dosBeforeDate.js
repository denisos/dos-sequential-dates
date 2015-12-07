/*
 * dosBeforeDate - a directive to check that this date comes before
 *  another ngModel date
 * if not will flag an angular validity error 'sequential'
 * inspired by book "Mastering Web Application Development with Angular js"
 * chapter 8 Creating a Custom Validation Directive
 *
 * usage: <input name="startDate" ng-model="model.startDate" dos-before-date="model.endDate">
 * will set a validity error 'sequential' if model.startDate is not before
 *  model.endDate (which was defined as an ngModel elsewhere)
 *
 */
 (function(angular) {
    'use strict';
    angular
        .module('dosSequentialDates.directives')
        .directive('dosBeforeDate', dosBeforeDate);

    dosBeforeDate.$inject = ['SequentialDatesService'];

    function dosBeforeDate(SequentialDatesService) {
        return {
            restrict: 'A',
            require: 'ngModel',         // need access to ngModel to monitor it
            link: function(scope, element, attrs, ngModelController) {
                // is currentDate before attrs.dosBeforeDate? if so flag as ok, else error
                function handleIsBefore(currentDate) {
                    var isBefore = SequentialDatesService.isSequential(currentDate,
                                                                  scope.$eval(attrs.dosBeforeDate));
                    ngModelController.$setValidity('sequential', isBefore);
                    return currentDate;
                }

                // compares currentDate to the date in the other field which is
                //  passed in as attrs.dosBeforeDate
                function validateBeforeDate(currentDate) {
                    if (!currentDate) {
                        ngModelController.$setValidity('sequential', true);
                        return undefined;
                    }

                    return handleIsBefore(currentDate);
                }

                // push the fn onto the parsers and formatters angular pipeline
                ngModelController.$parsers.push(validateBeforeDate);
                ngModelController.$formatters.push(validateBeforeDate);

                // watch for the other date changing and if it does, check if
                //  this date is still valid or not
                scope.$watch(attrs.dosBeforeDate, function() {
                    // only force the validation if the field is dirty or has a value
                    //  in this way we don't flag as error totally new fields with no value
                    //  but we do force a check even if this field is unchanged
                    if (ngModelController.$dirty || ngModelController.$viewValue !== null ) {
                        handleIsBefore(ngModelController.$viewValue);
                  }
                });
            }
        };
    }
})(angular);