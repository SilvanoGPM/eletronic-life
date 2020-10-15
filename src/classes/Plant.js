function Plant() {
    this.energy = (Math.random() * 4) + 3;
}

Plant.prototype.act = function (context) {
    if (this.energy > 15) {
        const space = context.find(" ");
        
        if (space) {
            return { type: "reproduce", direction: space };
        }
    }
    if (this.energy < 20)
        return { type: "grow" };
}

module.exports = Plant;