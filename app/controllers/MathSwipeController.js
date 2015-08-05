// Generated by CoffeeScript 1.9.3
var $, AdjacentCellsCalculator, Board, Cell, ClickHandler, Colors, DFS, ExpressionGenerator, InputSolver, MathSwipeController, RandomizedFitLength, ResetButton, SolutionService, Tuple,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

AdjacentCellsCalculator = require('../services/AdjacentCellsCalculator');

ClickHandler = require('../services/ClickHandler');

DFS = require('../services/DFS');

ExpressionGenerator = require('../services/ExpressionGenerator');

InputSolver = require('../services/InputSolver');

ResetButton = require('../services/ResetButton');

SolutionService = require('../services/SolutionService');

RandomizedFitLength = require('../services/RandomizedFitLength');

Tuple = require('../models/Tuple');

Board = require('../views/Board');

Cell = require('../views/Cell');

Colors = require('../views/Colors');

$ = require('jquery');

MathSwipeController = (function() {
  function MathSwipeController() {
    this.testDFS = bind(this.testDFS, this);
    this.testInputSolver = bind(this.testInputSolver, this);
    this.testCellDelete = bind(this.testCellDelete, this);
    this.testExpGen = bind(this.testExpGen, this);
    this.testResetButton = bind(this.testResetButton, this);
    this.testRandomizedFitLength = bind(this.testRandomizedFitLength, this);
    this.tests = bind(this.tests, this);
    var goals, gridModel, input, inputs, k, len, length, symbols, two;
    length = 3;
    two = this.createTwo();
    symbols = this.getSymbols(two);
    inputs = this.generateInputs(length);
    goals = [];
    for (k = 0, len = inputs.length; k < len; k++) {
      input = inputs[k];
      goals.push(InputSolver.compute(input.join('')));
    }
    gridModel = this.generateBoard(inputs, length);
    console.log(goals);
    this.board = new Board(gridModel, two, Cell, Colors, ClickHandler, SolutionService, goals, symbols);
    this.tests();
  }

  MathSwipeController.prototype.createTwo = function() {
    var game, size, two;
    game = document.getElementById('game');
    size = Math.min(Math.max($(window).width(), 310), 500);
    two = new Two({
      fullscreen: false,
      autostart: true,
      width: size,
      height: size
    }).appendTo(game);
    return two;
  };

  MathSwipeController.prototype.getSymbols = function(two) {
    var i, k, len, s, svgs, symbols;
    svgs = $('#assets svg');
    symbols = [];
    for (i = k = 0, len = svgs.length; k < len; i = ++k) {
      s = svgs[i];
      symbols.push(two.interpret(s));
      symbols[i].visible = false;
    }
    two.update();
    return symbols;
  };

  MathSwipeController.prototype.randExpression = function(length) {
    return ExpressionGenerator.generate(length);
  };

  MathSwipeController.prototype.generateInputs = function(length) {
    var i, inputs, k, ref;
    inputs = [];
    for (i = k = 0, ref = length; 0 <= ref ? k < ref : k > ref; i = 0 <= ref ? ++k : --k) {
      inputs.push(this.randExpression(length).split(''));
    }
    return inputs;
  };

  MathSwipeController.prototype.generateBoard = function(inputs, length) {
    return DFS.setEquationsOnGrid(length, inputs, AdjacentCellsCalculator);
  };

  MathSwipeController.prototype.tests = function() {
    this.testResetButton();
    this.testRandomizedFitLength();
    this.testExpGen();
    this.testInputSolver();
    return this.testDFS();
  };

  MathSwipeController.prototype.testRandomizedFitLength = function() {
    var i, j, k, l, len, list, size, sum;
    size = 25;
    for (i = k = 0; k < 100; i = ++k) {
      list = RandomizedFitLength.generate(size);
      sum = 0;
      for (l = 0, len = list.length; l < len; l++) {
        j = list[l];
        sum += j;
      }
      if (sum !== size) {
        console.log("Something went wrong with RandomizedFitLength");
        console.log(list);
        break;
      }
    }
    console.log(list);
    return console.log("Passed RandomizedFitLength");
  };

  MathSwipeController.prototype.testResetButton = function() {
    return ResetButton.bindClick(this.board);
  };

  MathSwipeController.prototype.testExpGen = function() {
    var expression, k, length, results;
    results = [];
    for (length = k = 1; k <= 30; length = ++k) {
      expression = ExpressionGenerator.generate(length);
      results.push(console.log(length, expression, InputSolver.compute(expression)));
    }
    return results;
  };

  MathSwipeController.prototype.testCellDelete = function() {
    var solution;
    solution = [new Tuple(0, 0), new Tuple(1, 1), new Tuple(0, 2)];
    return this.board.deleteCells(solution);
  };

  MathSwipeController.prototype.testInputSolver = function() {
    return console.log(InputSolver.compute('1+2*3'));
  };

  MathSwipeController.prototype.testDFS = function() {
    var each, i, inputList, j, k, l, len, len1, len2, length, line, m, n, ref, ref1, results;
    length = 5;
    inputList = [];
    for (i = k = 0, ref = length; 0 <= ref ? k < ref : k > ref; i = 0 <= ref ? ++k : --k) {
      inputList.push((ExpressionGenerator.generate(length)).split(''));
    }
    for (l = 0, len = inputList.length; l < len; l++) {
      each = inputList[l];
      console.log(each);
    }
    console.log('\n');
    ref1 = DFS.setEquationsOnGrid(length, inputList, AdjacentCellsCalculator);
    results = [];
    for (m = 0, len1 = ref1.length; m < len1; m++) {
      each = ref1[m];
      line = '';
      for (n = 0, len2 = each.length; n < len2; n++) {
        j = each[n];
        line += j + '\t';
      }
      results.push(console.log(line));
    }
    return results;
  };

  return MathSwipeController;

})();

module.exports = MathSwipeController;
