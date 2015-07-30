// Generated by CoffeeScript 1.9.3
var GridCell,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

GridCell = (function() {
  function GridCell() {
    this.isEmpty = bind(this.isEmpty, this);
    this.value = ' ';
    this.isClicked = false;
  }

  GridCell.prototype.isEmpty = function() {
    return this.value === ' ';
  };

  return GridCell;

})();

module.exports = GridCell;