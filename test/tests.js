'use strict';

describe('instanceCounter()', function () {
  it('should handle no instances', function() {
    expect(instanceCounter("I am a test", "quiz")).to.equal(0);
  });

  it('should handle a single instance', function() {
    expect(instanceCounter("I am a test", "test")).to.equal(1);
  });

  it('should handle multiple instances', function() {
    expect(instanceCounter("I am a test a test is what I am", "test")).to.equal(2);
  });

  it('should find text within text', function() {
    expect(instanceCounter("I am testing", "test")).to.equal(1);
  });

  it('should handle uppercase text', function() {
    expect(instanceCounter("I am Test and I am TESTING", "test")).to.equal(2);
  });
});

describe('videoItem()', function() {
  it('Ensures when function is ran, its argument is not null', function() {
    expect(videoItem("test video")).to.not.be.null
  })
});
