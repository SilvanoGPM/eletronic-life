const { directions } = require('../utils/directionUtil');
const { charFromElement, randomElement } = require('../utils/elementUtil');

const View = function (world, vector) {
    this.world = world;
    this.vector = vector;
}

View.prototype.look = function (dir) {
    const target = this.vector.plus(directions[dir]);
    if (this.world.grid.isInside(target)) {
        return charFromElement(this.world.grid.get(target));
    } else {
        return "#";
    }
}

View.prototype.findAll = function (ch) {
    const found = [];
    for (let dir in directions) {
        if (this.look(dir) == ch) {
            found.push(dir);
        }
    }

    return found;
}

View.prototype.find = function (ch) {
    const found = this.findAll(ch);
    if (found.length == 0) return null;
    return randomElement(found);
}

module.exports = View;