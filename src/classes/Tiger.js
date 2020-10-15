const { randomElement } = require('../utils/elementUtil');

function Tiger() {
    this.energy = 100;
    this.direction = "w";
    this.preySeen = [];
}

Tiger.prototype.act = function (view) {
    const prey = view.findAll("O")
    this.preySeen.push(prey.length)

    const seenPerTurn = this.preySeen.reduce((a, b) => {
        return a + b
    }, 0) / this.preySeen.length

    if (this.preySeen.length > 6)
        this.preySeen.shift()

    if (prey.length && seenPerTurn > 0.50)
        return { type: 'eat', direction: randomElement(prey) }

    const space = view.find(" ")
    if (this.energy > 600 && space)
        return { type: 'reproduce', direction: space }
    if (view.look(this.direction) != " " && space)
        this.direction = space
    return { type: 'move', direction: this.direction }
}

module.exports = Tiger;