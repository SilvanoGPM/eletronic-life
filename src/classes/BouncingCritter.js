const { randomElement } = require('../utils/elementUtil');
const { directionNames } = require('../utils/directionUtil');

const BouncingCritter = function () {
    this.direction = randomElement(directionNames);
}

BouncingCritter.prototype.act = function (view) {
    if (view.look(this.direction) != " ") {
        this.direction = view.find(" ") || "n";
    }

    return { type: "move", direction: this.direction };
}

module.exports = BouncingCritter;