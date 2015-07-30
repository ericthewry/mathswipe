// Generated by CoffeeScript 1.9.3
var DFS, Tuple, TupleSet;

Tuple = require('../models/Tuple');

TupleSet = require('../models/TupleSet');

DFS = (function() {
  function DFS() {}

  DFS.setEquationsOnGrid = function(grid, inputList, AdjacentCells) {
    var allCells, col, i, j, k, l, n, o, p, ref, ref1, ref2, ref3, row;
    this.grid = grid;
    this.AdjacentCells = AdjacentCells;
    allCells = [];
    for (i = k = 0, ref = this.grid.dimension; 0 <= ref ? k < ref : k > ref; i = 0 <= ref ? ++k : --k) {
      for (j = l = 0, ref1 = this.grid.dimension; 0 <= ref1 ? l < ref1 : l > ref1; j = 0 <= ref1 ? ++l : --l) {
        allCells.push(new Tuple(i, j));
      }
    }
    for (i = n = 0; n < 10000; i = ++n) {
      if (this.hasInitializeGrid(allCells, inputList)) {
        break;
      }
      for (row = o = 0, ref2 = this.grid.dimension; 0 <= ref2 ? o < ref2 : o > ref2; row = 0 <= ref2 ? ++o : --o) {
        for (col = p = 0, ref3 = this.grid.dimension; 0 <= ref3 ? p < ref3 : p > ref3; col = 0 <= ref3 ? ++p : --p) {
          this.grid.set(row, col, ' ');
        }
      }
    }
    return true;
  };

  DFS.hasInitializeGrid = function(allCells, inputList) {
    var i, index, k, l, ref, seed;
    for (i = k = 0, ref = inputList.length; 0 <= ref ? k < ref : k > ref; i = 0 <= ref ? ++k : --k) {
      for (index = l = 0; l < 20; index = ++l) {
        seed = allCells[Math.floor(Math.random() * allCells.length)];
        if (this.search(seed, inputList[i], new TupleSet)) {
          break;
        }
        return false;
      }
    }
    return true;
  };

  DFS.search = function(seed, input, takenCells) {
    var calculator, curr, hasSolution, toVisit;
    if (input.length === 0) {
      return true;
    }
    calculator = new this.AdjacentCells(this.grid, seed.x, seed.y);
    toVisit = this.shuffle(calculator.getToVisit(takenCells.list));
    if (toVisit.length === 0) {
      return false;
    }
    curr = toVisit.pop();
    if (this.isValidSeed(curr.x, curr.y)) {
      return false;
    }
    while (curr !== void 0) {
      this.grid.set(curr.x, curr.y, input[0]);
      takenCells.push(new Tuple(curr.x, curr.y));
      hasSolution = this.search(curr, input.slice(1, input.length), takenCells);
      if (hasSolution) {
        return true;
      }
      this.grid.set(curr.x, curr.y, ' ');
      takenCells.pop();
      curr = toVisit.pop();
    }
    return false;
  };

  DFS.isValidSeed = function(x, y) {
    var col, emptyInCol, k, l, len, numEmpty, ref, ref1, row;
    if (x - 1 < 0 || x + 1 >= this.grid.dimension) {
      return false;
    }
    emptyInCol = [];
    ref = [x - 1, x, x + 1];
    for (k = 0, len = ref.length; k < len; k++) {
      col = ref[k];
      numEmpty = 0;
      for (row = l = 0, ref1 = this.grid.dimension; 0 <= ref1 ? l < ref1 : l > ref1; row = 0 <= ref1 ? ++l : --l) {
        if (this.grid.isEmpty(col, row)) {
          numEmpty += 1;
        }
      }
      emptyInCol.push(numEmpty);
    }
    return emptyInCol[0] > 0 && emptyInCol[1] === 1 && emptyInCol[2] > 0;
  };

  DFS.shuffle = function(array) {
    var i, m, t;
    m = array.length;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  };

  return DFS;

})();

module.exports = DFS;
