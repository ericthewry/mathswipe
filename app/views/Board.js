// Generated by CoffeeScript 1.9.3
var Board,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Board = (function() {
  function Board(grid, two, Cell, colors, ClickHandler) {
    var board, cellWidth, offset, width;
    this.grid = grid;
    this.two = two;
    this.Cell = Cell;
    this.colors = colors;
    this.createCells = bind(this.createCells, this);
    this.createEmptyCells = bind(this.createEmptyCells, this);
    this.clickHandler = new ClickHandler(this, this.two);
    this.size = this.two.height * .80;
    offset = this.size * .025;
    width = (this.size - offset) / this.grid.dimension - offset;
    this.x = this.two.width / 2;
    this.y = this.two.height / 2;
    this.y = this.y < this.size / 2 ? this.size / 2 : this.y;
    board = this.two.makeRectangle(this.x, this.y, this.size, this.size);
    board.noStroke().fill = this.colors.board;
    board.visible = true;
    this.change = offset + width;
    cellWidth = ((this.size - offset) / this.grid.dimension) - offset;
    this.createEmptyCells(cellWidth - 5);
    this.createCells(cellWidth);
    this.clickHandler.bindDefaultClick(board);
    this.clickHandler.bindClickTo(this.cells);
    this.two.update();
  }

  Board.prototype.createEmptyCells = function(width) {
    var cell, col, i, ref, results, row;
    this.empty_cells = [];
    results = [];
    for (row = i = 0, ref = this.grid.dimension; 0 <= ref ? i < ref : i > ref; row = 0 <= ref ? ++i : --i) {
      this.empty_cells.push([]);
      results.push((function() {
        var j, ref1, results1;
        results1 = [];
        for (col = j = 0, ref1 = this.grid.dimension; 0 <= ref1 ? j < ref1 : j > ref1; col = 0 <= ref1 ? ++j : --j) {
          cell = new this.Cell(col, row, width, this.two, this);
          cell.setColor(this.colors.emptyCell);
          cell.setBorder(this.colors.emptyCellBorder);
          results1.push(this.empty_cells[row].push(cell));
        }
        return results1;
      }).call(this));
    }
    return results;
  };

  Board.prototype.createCells = function(width) {
    var cell, col, i, ref, results, row;
    this.cells = [];
    results = [];
    for (row = i = 0, ref = this.grid.dimension; 0 <= ref ? i < ref : i > ref; row = 0 <= ref ? ++i : --i) {
      this.cells.push([]);
      results.push((function() {
        var j, ref1, results1;
        results1 = [];
        for (col = j = 0, ref1 = this.grid.dimension; 0 <= ref1 ? j < ref1 : j > ref1; col = 0 <= ref1 ? ++j : --j) {
          cell = new this.Cell(col, row, width, this.two, this, this.clickHandler);
          cell.setColor(this.colors.cell);
          cell.setBorder(this.colors.cellBorder);
          results1.push(this.cells[row].push(cell));
        }
        return results1;
      }).call(this));
    }
    return results;
  };

  Board.prototype.deleteCells = function(solution) {
    var i, len, results, tuple;
    results = [];
    for (i = 0, len = solution.length; i < len; i++) {
      tuple = solution[i];
      results.push(this.deleteCellAt(tuple.x, tuple.y));
    }
    return results;
  };

  Board.prototype.deleteCellAt = function(x, y) {
    this.cells[y][x]["delete"]();
    return this.pushAllCellsToBottom();
  };

  Board.prototype.pushAllCellsToBottom = function() {
    var col, i, j, k, ref, ref1, ref2, row, up;
    for (row = i = ref = this.grid.dimension - 1; ref <= 1 ? i <= 1 : i >= 1; row = ref <= 1 ? ++i : --i) {
      for (col = j = ref1 = this.grid.dimension - 1; ref1 <= 0 ? j <= 0 : j >= 0; col = ref1 <= 0 ? ++j : --j) {
        if (this.cells[row][col].isDeleted) {
          for (up = k = ref2 = row - 1; ref2 <= 0 ? k <= 0 : k >= 0; up = ref2 <= 0 ? ++k : --k) {
            if (!this.cells[up][col].isDeleted) {
              this.swapCells(row, col, up, col);
              break;
            }
          }
        }
      }
    }
    return this.two.update();
  };

  Board.prototype.swapCells = function(r1, c1, r2, c2) {
    var temp;
    this.cells[r1][c1].shiftTo(r2, c2);
    this.cells[r2][c2].shiftTo(r1, c1);
    temp = this.cells[r1][c1];
    this.cells[r1][c1] = this.cells[r2][c2];
    return this.cells[r2][c2] = temp;
  };

  return Board;

})();

module.exports = Board;
