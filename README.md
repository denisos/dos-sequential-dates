# dos sequential dates
Two custom attribute directives to check if a date is before or after another ngModel date. In case of error then a 'sequential' ngModel error is flagged (i.e. $error.sequential). You can then decide how to handle this on your form.

## Plunkr
http://plnkr.co/edit/IV727ex9qp9t3rnsYZrD?p=preview

## Provides 2 directives:
+ dos-after-date this date should be after the dos-after-date ngModel
``` html
<input name="startInput" ng-model="vm.start_date" />' +
<input name="testInput" ng-model="vm.end_date" dos-after-date="vm.start_date"/>
```

+ dos-before-date this date should be before the dos-before-date ngModel
``` html
<input name="startInput" ng-model="vm.start_date" dos-before-date="vm.end_date"/>
<input name="testInput" ng-model="vm.end_date" />
```

## How to use

+ Install with bower from the github repo

+ Include source js from the dist folder in your index.html
++ also include dependency moment.js which must be version 2.5

+ Include the module dosSequentialDates as a module dependency



## License:
Licensed under the MIT license