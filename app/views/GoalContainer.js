// Generated by CoffeeScript 1.9.3
var $, GoalContainer;

$ = require('jquery');

GoalContainer = (function() {
  function GoalContainer(scene, inputs, symbols, Colors) {
    this.scene = scene;
    this.inputs = inputs;
    this.symbols = symbols;
    this.Colors = Colors;
    this.container = $('#goals');
    this.show();
  }

  GoalContainer.prototype.show = function() {
    var goal, i, len, ref, results;
    console.log(this.inputs);
    ref = this.inputs;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      goal = ref[i];
      results.push(this.container.append('<span class="goal-span">' + goal + '</span>'));
    }
    return results;
  };

  GoalContainer.prototype.deleteGoal = function(index) {};

  GoalContainer.prototype.resetGoals = function() {};

  GoalContainer.prototype.clearGoals = function() {
    return this.container.empty();
  };

  return GoalContainer;

})();

module.exports = GoalContainer;
