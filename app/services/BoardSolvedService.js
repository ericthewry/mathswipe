// Generated by CoffeeScript 1.9.3
var $, BoardSolvedService;

$ = require('jquery');

BoardSolvedService = (function() {
  function BoardSolvedService() {}

  BoardSolvedService.isCleared = function(board) {
    var dim, i, len, ref, value;
    dim = board.dimension;
    ref = board.boardValues[dim - 1];
    for (i = 0, len = ref.length; i < len; i++) {
      value = ref[i];
      if (value !== ' ') {
        return false;
      }
    }
    return true;
  };

  BoardSolvedService.createNewBoard = function() {
    document.getElementById('new-game-button').disabled = false;
    return $('#new-game-button').trigger('click');
  };

  return BoardSolvedService;

})();

module.exports = BoardSolvedService;
