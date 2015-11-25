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
