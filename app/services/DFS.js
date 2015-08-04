// Generated by CoffeeScript 1.9.3
var DFS, GridCell, Tuple;

Tuple = require('../models/Tuple');

GridCell = require('../models/GridCell');

DFS = (function() {
  function DFS() {}

  DFS.setEquationsOnGrid = function(grid, inputList, AdjacentCells) {
    var col, i, j, k, l, n, o, ref, ref1, ref2, ref3, row;
    this.grid = grid;
    this.AdjacentCells = AdjacentCells;
    this.clearSolutionGrid();
    for (i = j = 0; j < 10000; i = ++j) {
      if (this.hasFoundSolution(inputList)) {
        break;
      }
      for (row = k = 0, ref = this.grid.dimension; 0 <= ref ? k < ref : k > ref; row = 0 <= ref ? ++k : --k) {
        for (col = l = 0, ref1 = this.grid.dimension; 0 <= ref1 ? l < ref1 : l > ref1; col = 0 <= ref1 ? ++l : --l) {
          this.grid.set(row, col, ' ');
          this.clearSolutionGrid();
        }
      }
    }
    if (this.hasFoundSolution) {
      for (row = n = 0, ref2 = this.solutionGrid.length; 0 <= ref2 ? n < ref2 : n > ref2; row = 0 <= ref2 ? ++n : --n) {
        for (col = o = 0, ref3 = this.solutionGrid.length; 0 <= ref3 ? o < ref3 : o > ref3; col = 0 <= ref3 ? ++o : --o) {
          this.grid.set(this.solutionGrid[row][col].x, this.solutionGrid[row][col].y, this.solutionGrid[row][col].value);
        }
      }
      return true;
    }
    return false;
  };

  DFS.clearSolutionGrid = function() {
    var col, j, ref, results, row;
    this.solutionGrid = [];
    results = [];
    for (row = j = 0, ref = this.grid.dimension; 0 <= ref ? j < ref : j > ref; row = 0 <= ref ? ++j : --j) {
      this.solutionGrid.push([]);
      results.push((function() {
        var k, ref1, results1;
        results1 = [];
        for (col = k = 0, ref1 = this.grid.dimension; 0 <= ref1 ? k < ref1 : k > ref1; col = 0 <= ref1 ? ++k : --k) {
          results1.push(this.solutionGrid[row].push(new GridCell(col, row)));
        }
        return results1;
      }).call(this));
    }
    return results;
  };

  DFS.hasFoundSolution = function(inputList) {
    var cloneGrid, hasPlaced, i, index, j, k, ref, seedX, seedY;
    for (i = j = 0, ref = inputList.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      hasPlaced = false;
      for (index = k = 0; k < 20; index = ++k) {
        if (!hasPlaced) {
          cloneGrid = this.cloneSolutionGrid();
          seedX = Math.floor(Math.random() * this.grid.dimension);
          seedY = Math.floor(Math.random() * this.grid.dimension);
          if (this.search(seedX, seedY, inputList[i])) {
            hasPlaced = true;
          } else {
            this.solutionGrid = cloneGrid;
          }
        }
      }
      if (hasPlaced) {
        this.pushDownSolutionGrid();
      } else {
        return false;
      }
    }
    return true;
  };

  DFS.search = function(seedX, seedY, input) {
    var curr, toVisit;
    if (input.length === 0) {
      return true;
    }
    toVisit = this.shuffle(this.AdjacentCells.getAdjacent(this.solutionGrid, seedX, seedY));
    if (toVisit.length === 0) {
      return false;
    }
    curr = toVisit.pop();
    while (curr !== void 0) {
      this.solutionGrid[curr.y][curr.x].value = input[0];
      if (!this.search(curr.x, curr.y, input.slice(1, input.length))) {
        this.solutionGrid[curr.y][curr.x].value = ' ';
        curr = toVisit.pop();
      } else {
        return true;
      }
    }
    return false;
  };

  DFS.cloneSolutionGrid = function() {
    var cloneGrid, col, j, k, ref, ref1, row;
    cloneGrid = [];
    for (row = j = 0, ref = this.solutionGrid.length; 0 <= ref ? j < ref : j > ref; row = 0 <= ref ? ++j : --j) {
      cloneGrid.push([]);
      for (col = k = 0, ref1 = this.solutionGrid.length; 0 <= ref1 ? k < ref1 : k > ref1; col = 0 <= ref1 ? ++k : --k) {
        cloneGrid[row].push(new GridCell(this.solutionGrid[row][col].x, this.solutionGrid[row][col].y));
        cloneGrid[row][col].value = this.solutionGrid[row][col].value;
      }
    }
    return cloneGrid;
  };

  DFS.pushDownSolutionGrid = function() {
    var col, j, ref, results, row, up;
    results = [];
    for (row = j = ref = this.solutionGrid.length - 1; ref <= 1 ? j <= 1 : j >= 1; row = ref <= 1 ? ++j : --j) {
      results.push((function() {
        var k, ref1, results1;
        results1 = [];
        for (col = k = ref1 = this.solutionGrid.length - 1; ref1 <= 0 ? k <= 0 : k >= 0; col = ref1 <= 0 ? ++k : --k) {
          if (this.solutionGrid[row][col].value !== ' ') {
            results1.push((function() {
              var l, ref2, results2;
              results2 = [];
              for (up = l = ref2 = row - 1; ref2 <= 0 ? l <= 0 : l >= 0; up = ref2 <= 0 ? ++l : --l) {
                if (this.solutionGrid[up][col].value === ' ') {
                  this.swapCells(row, col, up, col);
                  break;
                } else {
                  results2.push(void 0);
                }
              }
              return results2;
            }).call(this));
          } else {
            results1.push(void 0);
          }
        }
        return results1;
      }).call(this));
    }
    return results;
  };

  DFS.swapCells = function(r1, c1, r2, c2) {
    var temp;
    temp = this.solutionGrid[r1][c1];
    this.solutionGrid[r1][c1] = this.solutionGrid[r2][c2];
    return this.solutionGrid[r2][c2] = temp;
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
