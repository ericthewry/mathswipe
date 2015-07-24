// Generated by CoffeeScript 1.9.3
var AdjacentCellsCalculator, DFS, GameGrid;

GameGrid = require("../models/GameGrid");

AdjacentCellsCalculator = require("./AdjacentCellsCalculator");

DFS = (function() {
  var getSeed, shuffle;

  function DFS() {}

  getSeed = function(grid) {
    var i, j, len, ref, x, y;
    ref = this.grid;
    for (j = 0, len = ref.length; j < len; j++) {
      i = ref[j];
      x = Math.floor(Math.random() * this.grid.length) + 1;
      y = Math.floor(Math.random() * this.grid.length) + 1;
      if (this.grid[y][x] !== null) {
        return [y, x];
      }
    }
    return false;
  };

  shuffle = function(array) {
    var i, m, t;
    m = array.length;
    t = void 0;
    i = void 0;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  };

  DFS = function(seed) {
    var toVisit;
    toVisit = shuffle((new AdjacentCellsCalculator(new GameGrid(3), null, 1, 1)).calculate());
    return console.log(toVisit);
  };

  return DFS;

})();

module.exports = DFS;
