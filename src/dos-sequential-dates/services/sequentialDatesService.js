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
