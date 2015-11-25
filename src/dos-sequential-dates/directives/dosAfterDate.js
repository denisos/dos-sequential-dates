/*
 * dosAfterDate - a directive to check that this date comes after another ngModel
 *  date;
 * if not will flag an angular validity error 'sequential'
 * inspired by book "Mastering Web Application Development with Angular js"
 *  chapter 8 Creating a Custom Validation Directive
 *
 * usage: <input name="endDate" ng-model="model.endDate" dos-after-date="model.startDate">
 *  will set a validity error if model.endDate is not after model.startDate
 *   (which is defined as an ngModel elsewhere)
 *
 */
'use strict';
angular.module('dosSequentialDates.directives')
.directive('dosAfterDate', ['SequentialDatesService', function(SequentialDatesService) {
    return {
        restrict: 'A',
        require: 'ngModel',         // need access to ngModel to monitor it
        link: function(scope, element, attrs, ngModelController) {
            // is currentDate before attrs.dosAfterDate? if so flag as ok, else error
            function handleIsAfter(currentDate) {
                var isAfter =
                    SequentialDatesService.isSequential(scope.$eval(attrs.dosAfterDate),
                                                        currentDate);
                ngModelController.$setValidity('sequential', isAfter);
                return currentDate;
            }

            // compares currentDate to the date in the other field which is
            //  passed in as attrs.after-date
            var validateAfterDate = function(currentDate) {
                if (!currentDate) {
                    return;
                }
                return handleIsAfter(currentDate);
            };

            // push the fn onto the parsers and formatters angular pipeline
            ngModelController.$parsers.push(validateAfterDate);
            ngModelController.$formatters.push(validateAfterDate);

            // watch for the other date changing and if it does, check if
            //  this date is still valid or not
            scope.$watch(attrs.dosAfterDate, function() {
                // only force the validation if the field is dirty or has a value
                //  in this way we don't flag as error totally new fields with no value
                //  but we do force a check even if this field is unchanged
                if (ngModelController.$dirty || ngModelController.$viewValue !== null ) {
                    handleIsAfter(ngModelController.$viewValue);
                }
            });
        }
    };
}]);
