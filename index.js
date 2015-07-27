// Generated by CoffeeScript 1.9.3
var DFS, GameGrid, InputSolver, LastInColumn, cat, grid, seed;

InputSolver = require("./app/services/InputSolver");

GameGrid = require("./app/models/GameGrid");

DFS = require("./app/services/DFS");

LastInColumn = require("./app/services/LastInColumn");

grid = new GameGrid(3);

cat = new DFS(grid);

seed = {
  x: 1,
  y: 1
};

cat.search(seed, grid);
