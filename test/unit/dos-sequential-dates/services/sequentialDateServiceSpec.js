'use strict';

describe('SequentialDatesService', function() {

  var SequentialDatesService;

  // load the module
  beforeEach(module('dosSequentialDates.services'));

  // inject the service
  beforeEach(inject(function(_SequentialDatesService_) {
    SequentialDatesService = _SequentialDatesService_;
  }));

  it('should have a public method called isSequential', function() {
    expect(SequentialDatesService.isSequential).toBeDefined();
  });

  // Date object test
  it('should return false because first date is after second', function() {
    expect(SequentialDatesService.isSequential(new Date(2015, 1, 11),
                                                new Date(2015, 1, 1))).toBe(false);
  });

  // string test
  it('should return true because first date is before second', function() {
    expect(SequentialDatesService.isSequential('12/01/15', '12/12/15')).toBe(true);
  });

  // string & Date object test
  it('should return true because first date is before second', function() {
    expect(SequentialDatesService.isSequential('12/01/15', new Date(2015, 12, 25))).toBe(true);
  });


  // more string tests
  it('should return false because first date is before second', function() {
    expect(SequentialDatesService.isSequential('12/03/15', '12/01/15')).toBe(false);
  });

  it('should return true because first date is before second', function() {
    expect(SequentialDatesService.isSequential('12/01/15', '12/1/15')).toBe(true);
  });

  it('should return false that first date is after second', function() {
    expect(SequentialDatesService.isSequential(undefined, '12/02/15')).toBe(false);
  });

  it('should return false that first date is after second', function() {
    expect(SequentialDatesService.isSequential('12/02/15', undefined)).toBe(false);
  });

  it('should return true because both dates are undefined', function() {
    expect(SequentialDatesService.isSequential()).toBe(true);
  });

  it('should return false because first date is before second', function() {
    expect(SequentialDatesService.isSequential('12/41/15', '11/12/15')).toBe(false);
  });

  // other string formats
  it('should return true because first date is before second', function() {
    expect(SequentialDatesService.isSequential('2015-11-11', '2015-11-26')).toBe(true);
  });

  it('should return false because first date is after second', function() {
    expect(SequentialDatesService.isSequential('2015-01-11', '2015-01-01')).toBe(false);
  });

  // Date object tests
  it('should return false because first date is after second', function() {
    expect(SequentialDatesService.isSequential(new Date('2015-01-11'), new Date('2015-01-01'))).toBe(false);
  });

  it('should return false because first date is after second', function() {
    expect(SequentialDatesService.isSequential(new Date(2015, 1, 23),
                                                new Date(2015, 1, 1))).toBe(false);
  });

});