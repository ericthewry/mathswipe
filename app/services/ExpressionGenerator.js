// Generated by CoffeeScript 1.9.3
var ExpressionGenerator;

ExpressionGenerator = (function() {
  function ExpressionGenerator() {}

  ExpressionGenerator.prototype.randInclusive = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  ExpressionGenerator.prototype.genRandomDigit = function(min, max) {
    return this.randInclusive(min, max).toString();
  };

  ExpressionGenerator.prototype.genRandomOperator = function() {
    switch (this.randInclusive(0, 2)) {
      case 0:
        return "+";
      case 1:
        return "-";
      case 2:
        return "*";
      default:
        return "?";
    }
  };

  ExpressionGenerator.prototype.generate = function(length) {
    var opIndex;
    if (length <= 0) {
      throw "Length cannot be less than 1";
    } else if (length === 1) {
      return this.genRandomDigit(1, 9);
    } else if (length === 2) {
      return (this.genRandomDigit(1, 9)) + (this.genRandomDigit(0, 9));
    } else if (length === 3) {
      return (this.genRandomDigit(1, 9)) + this.genRandomOperator() + (this.genRandomDigit(1, 9));
    } else {
      opIndex = this.randInclusive(2, length - 1);
      return (this.generate(opIndex - 1)) + this.genRandomOperator() + (this.generate(length - opIndex));
    }
  };

  return ExpressionGenerator;

})();

module.exports = ExpressionGenerator;