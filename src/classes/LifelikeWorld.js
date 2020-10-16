const View = require('./View');
const World = require('./World');
const { elementFromChar } = require('../utils/elementUtil');

function LifelikeWorld(map, legend, speed = 100) {
    World.call(this, map, legend, speed);
}

LifelikeWorld.prototype = Object.create(World.prototype);

let actionTypes = Object.create(null);

actionTypes.grow = function (critter) {
    critter.energy += 0.5;
    return true;
}

actionTypes.move = function (critter, vector, action) {
    const dest = this.checkDestination(action, vector);
    if (dest == null ||
        critter.energy <= 1 ||
        this.grid.get(dest) != null
    )
        return false;

    critter.energy -= 1;
    this.grid.set(vector, null);
    this.grid.set(dest, critter);
    return true;
}

actionTypes.eat = function (critter, vector, action) {
    const dest = this.checkDestination(action, vector);
    const atDest = dest != null && this.grid.get(dest);

    if (!atDest || atDest.energy == null) return false;

    critter.energy += atDest.energy;
    this.grid.set(dest, null);
    return true;
}

actionTypes.reproduce = function (critter, vector, action) {
    const baby = elementFromChar(this.legend, critter.originChar);
    const dest = this.checkDestination(action, vector);

    if (dest == null ||
        critter.energy < 2 * baby.energy ||
        this.grid.get(dest) != null)
        return false;

    critter.energy -= 2 * baby.energy;
    this.grid.set(dest, baby);
    return true;
}

LifelikeWorld.prototype.letAct = function (critter, vector) {
    
    const action = critter.act(new View(this, vector));
    const handled = action &&
        action.type in actionTypes &&
        actionTypes[action.type].call(this, critter, vector, action);

    if (!handled) {
        critter.energy -= 0.2;
        if (critter.energy <= 0)
            this.grid.set(vector, null);
    }
}

module.exports = LifelikeWorld;