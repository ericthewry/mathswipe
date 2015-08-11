// Generated by CoffeeScript 1.9.3
var $, Cell, Colors;

$ = require('jquery');

Colors = require('./Colors');

Cell = (function() {
  function Cell(col1, row1, size, scene, board, clickHandler, symbolBlueprint) {
    this.col = col1;
    this.row = row1;
    this.size = size;
    this.scene = scene;
    this.board = board;
    this.clickHandler = clickHandler;
    this.isDeleted = false;
    this.isSelected = false;
    this.rect = this.scene.makeRectangle(this.getX(), this.getY(), this.size, this.size);
    if (symbolBlueprint) {
      this.cell = this.scene.makeGroup(this.rect, this.newSymbol(symbolBlueprint));
    } else {
      this.cell = this.scene.makeGroup(this.rect);
    }
    this.scene.update();
    if (this.clickHandler != null) {
      if (!this.clickHandler.isOnMobile()) {
        this.bindMouseMove();
        this.bindMouseUp();
        this.bindMouseDown();
      } else {
        this.bindClick();
      }
    }
  }

  Cell.prototype.newSymbol = function(blueprint) {
    var offset, symbol;
    offset = -this.size * 4 / 10;
    symbol = blueprint.clone();
    symbol.translation.set(this.getX() + offset, this.getY() + offset);
    symbol.scale = (this.size / 100) * .8;
    symbol.noStroke().fill = Colors.symbol;
    return symbol;
  };

  Cell.prototype.setColor = function(c) {
    this.color = c;
    this.rect.fill = c;
    return this.scene.update();
  };

  Cell.prototype.setBorder = function(c) {
    this.rect.stroke = c;
    this.rect.linewidth = 6;
    return this.scene.update();
  };

  Cell.prototype.hide = function() {
    this.cell.visible = false;
    return this.scene.update();
  };

  Cell.prototype.getX = function(col) {
    if (col == null) {
      col = this.col;
    }
    return this.board.x - (this.board.size + this.size) / 2 + (col + 1) * this.board.change;
  };

  Cell.prototype.getY = function(row) {
    if (row == null) {
      row = this.row;
    }
    return this.board.y - (this.board.size + this.size) / 2 + (row + 1) * this.board.change;
  };

  Cell.prototype.setIndices = function(row, col) {
    if ((row != null) && (col != null)) {
      this.row = row;
      return this.col = col;
    }
  };

  Cell.prototype.shiftTo = function(row, col) {
    var end, goingDown, start;
    end = new Two.Vector(this.getX(col), this.getY(row));
    start = new Two.Vector(this.getX(), this.getY());
    goingDown = end.y > start.y;
    this.scene.bind('update', (function(_this) {
      return function(frameCount) {
        var delta, dist;
        dist = start.distanceTo(end);
        if (dist < .00001) {
          _this.cell.translation.clone(end);
          _this.scene.unbind('update');
        }
        delta = new Two.Vector(0, dist * .125);
        if (goingDown) {
          _this.cell.translation.addSelf(delta);
          return start = start.addSelf(delta);
        } else {
          _this.cell.translation.subSelf(delta);
          return start = start.subSelf(delta);
        }
      };
    })(this)).play();
    return this.setIndices(row, col);
  };

  Cell.prototype.bindClick = function() {
    return $('#' + this.cell.id).click((function(_this) {
      return function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (_this.isDeleted) {
          return;
        }
        if (!_this.isSelected) {
          return _this.clickHandler.onSelect(_this);
        } else {
          return _this.clickHandler.onUnselect(_this);
        }
      };
    })(this));
  };

  Cell.prototype.bindMouseMove = function() {
    return $('#' + this.cell.id).mousemove((function(_this) {
      return function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (_this.isDeleted) {
          return;
        }
        if (!_this.isSelected && _this.clickHandler.isMouseDown() && _this.inHitBox(e.offsetX, e.offsetY)) {
          return _this.clickHandler.onSelect(_this);
        }
      };
    })(this));
  };

  Cell.prototype.bindMouseUp = function() {
    return $('#' + this.cell.id).mouseup((function(_this) {
      return function(e) {
        e.preventDefault();
        e.stopPropagation();
        return _this.clickHandler.setMouseDown(false);
      };
    })(this));
  };

  Cell.prototype.bindMouseDown = function() {
    return $('#' + this.cell.id).mousedown((function(_this) {
      return function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (_this.isDeleted) {
          return;
        }
        if (!_this.isSelected) {
          return _this.clickHandler.onSelect(_this);
        }
      };
    })(this));
  };

  Cell.prototype.inHitBox = function(mouseX, mouseY) {
    var shrinkSize;
    shrinkSize = (0.70 * this.size) / 2.0;
    return Math.abs(mouseX - this.getX()) < shrinkSize && Math.abs(mouseY - this.getY()) < shrinkSize;
  };

  Cell.prototype.select = function() {
    this.isSelected = true;
    return this.setColor(Colors.select);
  };

  Cell.prototype.unselect = function() {
    this.isSelected = false;
    return this.setColor(Colors.cell);
  };

  Cell.prototype["delete"] = function() {
    this.hide();
    return this.isDeleted = true;
  };

  Cell.prototype.x = function() {
    return this.col;
  };

  Cell.prototype.y = function() {
    return this.row;
  };

  return Cell;

})();

module.exports = Cell;
