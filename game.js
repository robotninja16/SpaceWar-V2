class Game {
    players = {};

    update() {
        let playerArray = Object.entries(players);
        for (let i = 0; i < playerArray.length; i++) {
            playerArray[i].update();
        }
    }
}

const game = new Game();

setInterval(() => {
    game.update();
}, 16)

module.exports = game;