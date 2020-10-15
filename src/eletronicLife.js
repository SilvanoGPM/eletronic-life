const shellWorld = require('./world-printers/shellWorld');
const LifelikeWorld = require('./classes/LifelikeWorld');
const Plant = require('./classes/Plant');
const SmartPlantEater = require('./classes/SmartPlantEater');
const Tiger = require('./classes/Tiger');
const Wall = function () { };

const valley = new LifelikeWorld([
    "####################################################",
    "#                 ####         ****              ###",
    "#   *  @  ##                 ########       OO    ##",
    "#   *    ##        O O                 ****       *#",
    "#       ##*                        ##########     *#",
    "#      ##***  *         ****                     **#",
    "#* **  #  *  ***      #########                  **#",
    "#* **  #      *               #   *              **#",
    "#     ##              #   O   #  ***          ######",
    "#*            @       #       #   *        O  #    #",
    "#*                    #  ######                 ** #",
    "###          ****          ***                  ** #",
    "#       O                        @         O       #",
    "#   *     ##  ##  ##  ##               ###      *  #",
    "#   **         #              *       #####  O     #",
    "##  **  O   O  #  #    ***  ***        ###      ** #",
    "###               #   *****                    ****#", "####################################################"
], { "#": Wall, "O": SmartPlantEater, "*": Plant, "@": Tiger },
    process.argv[2]);

shellWorld(valley);
