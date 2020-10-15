const Grid = require("./Grid");
const Vector = require("./Vector");
const View = require("./View");
const { directions } = require('../utils/directionUtil');
const { formatMs } = require('../utils/timeUtil');
const elementUtil = require("../utils/elementUtil");
const figlet = require("figlet");
const { colors, paintText } = require('../utils/colorUtil');

let textHeader = "";
figlet.text('Eletronic Life', {
    font: 'Small',
    horizontalLayout: 'full',
    verticalLayout: 'full',
    width: 100,
    whitespaceBreak: false
}, (error, data) => {
    textHeader = paintText(data, colors.green) + "\n";
})

const World = function (map, legend, speed = 1000) {
    const grid = new Grid(map[0].length, map.length);
    this.grid = grid;
    this.legend = legend;
    this.speed = Number(speed);
    this.elapsedTime = Number(speed);

    map.forEach((line, y) => {
        for (let x = 0; x < line.length; x++)
            grid.set(new Vector(x, y),
                elementUtil.elementFromChar(legend, line[x]))
    });
}

World.prototype.toString = function () {
    let output = textHeader;
    let plants = 0;
    let plantsEaters = 0;
    let tigers = 0;

    function incrementCritter(ch) {
        switch (ch) {
            case '*': plants++; break;
            case 'O': plantsEaters++; break;
            case '@': tigers++; break;
        }
    }

    function paintChar(ch) {
        switch (ch) {
            case '*': return paintText(ch, colors.green);
            case 'O': return paintText(ch, colors.cyan);
            case '@': return paintText(ch, colors.red);
        }

        return ch;
    }

    function paintInfo(info) {
        return paintText(info, colors.yellow).replace("*", paintChar("*") + colors.yellow).replace("O", paintChar("O") + colors.yellow).replace("@", paintChar("@") + colors.yellow) + colors.reset;
    }

    for (let y = 0; y < this.grid.height; y++) {
        for (let x = 0; x < this.grid.width; x++) {
            let element = this.grid.get(new Vector(x, y));
            const char = elementUtil.charFromElement(element);

            output += paintChar(char);
            incrementCritter(char);
        }
        output += "\n";
    }

    this.elapsedTime += Number(this.speed);
    const info = `
    Plants(*): ${plants} PlantsEaters(O): ${plantsEaters}  Tigers(@): ${tigers} 
    Elapsed Time: ${formatMs(this.elapsedTime)}   CTRL + C to exit!
    `;
    output += paintInfo(info);
    return output;
}

World.prototype.turn = function () {
    const acted = [];
    this.grid.forEach((critter, vector) => {
        if (critter.act && acted.indexOf(critter) == -1) {
            acted.push(critter);
            this.letAct(critter, vector);
        }
    }, this);
}

World.prototype.letAct = function (critter, vector) {
    const action = critter.act(new View(this, vector));
    if (action && action.type === "move") {
        const dest = this.checkDestination(action, vector);
        if (dest && this.grid.get(dest) == null) {
            this.grid.set(vector, null);
            this.grid.set(dest, critter);
        }
    }
}

World.prototype.checkDestination = function (action, vector) {
    if (directions.hasOwnProperty(action.direction)) {
        const dest = vector.plus(directions[action.direction]);
        if (this.grid.isInside(dest)) return dest;
    }
}

module.exports = World;