(function (angular) {

  // Create all modules and define dependencies to make sure they exist
  // and are loaded in the correct order to satisfy dependency injection
  // before all nested files are concatenated by Gulp

  // Config
  angular.module('dosSequentialDates.config', [])
      .value('dosSequentialDates.config', {
          debug: true
      });

  // Modules
  angular.module('dosSequentialDates.directives', []);
  angular.module('dosSequentialDates.services', []);
  angular.module('dosSequentialDates',
      [
          'dosSequentialDates.config',
          'dosSequentialDates.directives',
          'dosSequentialDates.services'
      ]);


})(angular);

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
'use strict';
angular.module('dosSequentialDates.directives')
.directive('dosBeforeDate', ['SequentialDatesService', function(SequentialDatesService) {
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
            var validateBeforeDate = function(currentDate) {
                if (!currentDate) {
                    ngModelController.$setValidity('sequential', true);
                    return undefined;
                }

                return handleIsBefore(currentDate);
            };

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
}]);

(function(angular, moment) {
    'use strict';

    angular
        .module('dosSequentialDates.services')
        .service('SequentialDatesService', SequentialDatesService);

    // no params to inject so no call to SequentialDatesService.$inject

    // has 1 public api method isSequential() which takes 2 dates which can
    //  be Date objects or string
    // uses moment.js to convert string to date since javascript Date
    function SequentialDatesService() {

        // public api
        this.isSequential = isSequential;


        //////////////////////////////

        /*
         * is first first before second date
         * @param {Date}/string first - can be a Date object or a string "12/23/15"
         * @param {Date}/string second - date
         * @return boolean true is first date before second date
         */
        function isSequential(first, second) {
            // if both are undefined then yes sequential
            if (!first && !second) {
                return true;
            }

            // if first undefined but second is not then not sequential
            if (!first && second) {
                return false;
            }

            // both have values so do straight compare
            return (makeDate(first) <= makeDate(second));
        }

        // if date is a string then convert it to Date using moment.js
        function makeDate(date) {
            if (!date) {
                return date;
            }

            var made = angular.copy(date);
            if (typeof date === 'string') {
                made = moment(date).toDate();
            }

            return made;
        }
    }

})(angular, moment);
