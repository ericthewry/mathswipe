// Generated by CoffeeScript 1.9.3
var GameGrid, InputSolver, MathSwipeController;

InputSolver = require('../services/InputSolver');

GameGrid = require('../models/GameGrid');

MathSwipeController = (function() {
  function MathSwipeController() {
    var board, boardX, boardY, change, i, j, l, m, offset, rect, ref, ref1, size, startX, startY, width;
    console.log(InputSolver.compute("1+2*3"));
    this.gridModel = new GameGrid(3);
    this.two = new Two({
      fullscreen: true,
      autostart: true
    }).appendTo(document.body);
    size = this.two.height * .80;
    offset = size * .025;
    width = (size - offset) / this.gridModel.dimension - offset;
    boardX = this.two.width / 2;
    boardY = this.two.height / 2;
    boardY = boardY < size / 2 ? size / 2 : boardY;
    board = this.two.makeRectangle(boardX, boardY, size, size);
    board.fill = '#F0F8FF';
    startX = boardX - (size + width) / 2;
    startY = boardY - (size + width) / 2;
    change = offset + width;
    this.gridView = [];
    for (i = l = 1, ref = this.gridModel.dimension; 1 <= ref ? l <= ref : l >= ref; i = 1 <= ref ? ++l : --l) {
      this.gridView.push([]);
      for (j = m = 1, ref1 = this.gridModel.dimension; 1 <= ref1 ? m <= ref1 : m >= ref1; j = 1 <= ref1 ? ++m : --m) {
        rect = this.two.makeRectangle(startX + j * change, startY + i * change, width, width);
        rect.fill = '#FFEBCD';
        this.gridView[i - 1].push(rect);
      }
    }
  }

  MathSwipeController.prototype.deleteCell = function(y, x) {
    return this.gridView[y][x].fill = '#FFFFFF';
  };

  MathSwipeController.prototype.pushAllCellsToBottom = function() {
    var i, j, k, l, m, n, ref, ref1, ref2;
    for (i = l = ref = this.gridModel.dimension - 1; ref <= 0 ? l <= 0 : l >= 0; i = ref <= 0 ? ++l : --l) {
      for (j = m = ref1 = this.gridModel.dimension - 1; ref1 <= 1 ? m <= 1 : m >= 1; j = ref1 <= 1 ? ++m : --m) {
        if (this.gridView[j][i].fill === '#FFFFFF') {
          for (k = n = ref2 = j - 1; ref2 <= 0 ? n <= 0 : n >= 0; k = ref2 <= 0 ? ++n : --n) {
            if (this.gridView[k][i].fill !== '#FFFFFF') {
              this.gridView[j][i] = this.gridView[k][i];
              this.gridView[k][i].fill = '#FFFFFF';
            }
          }
        }
      }
    }
    return this.two.update();
  };

  return MathSwipeController;

})();

module.exports = MathSwipeController;
