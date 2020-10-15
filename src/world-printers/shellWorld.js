const shell = require('shelljs');
const path = require('path');

function animation(world) {
    const animationPath = path.join(__dirname, '../../animation.txt');
    function tick() {
        const string = world.toString();
        shell.ShellString(string).to(animationPath);
        world.turn();
        shell.exec('clear');
        shell.echo('-ne', shell.cat(animationPath));
    }

    tick();
    intervalId = setInterval(tick, world.speed);
}

module.exports = animation;
