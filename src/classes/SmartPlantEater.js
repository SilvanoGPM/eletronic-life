const { randomElement } = require('../utils/elementUtil');

function SmartPlantEater() {
    this.energy = 30;
    this.direction = "e";
}

SmartPlantEater.prototype.act = function (context) {
    let space = context.find(" ");
    if (this.energy > 90 && space)
        return { type: "reproduce", direction: space };

    const plants = context.findAll("*");
    if (plants.length > 1)
        return { type: "eat", direction: randomElement(plants) };

    if (context.look(this.direction) != " " && space) {
        this.direction = space;
    }

    return { type: "move", direction: this.direction };
}

module.exports = SmartPlantEater;