function PlantEater() {
    this.energy = 20;
}

PlantEater.prototype.act = function (context) {
    const space = context.find(" ");
    if (this.energy > 60 && space)
        return { type: "reproduce", direction: space };

    const plant = context.find("*");
    if (plant)
        return { type: "eat", direction: plant };

    if (space)
        return { type: "move", direction: space };
}

module.exports = PlantEater;