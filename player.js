const Vector2 = require('./Vector2d'),
    game = require('./game.js');

module.exports = class Player {
    position = Vector2.zero;
    velocity = Vector2.zero;
    rotation = 0;
    shields = 0;
    energy = 0;
    isDead = false;

    thrusters = false;
    rotationInput = 0;
    shootingTorpedoes = false;
    shootingPhasers = false;
    transferringEnergyToShields = false;

    constructor(socket, position = Vector2.zero) {
        game.players[socket.id] = this;
        socket.player = this;
        this.socket = socket;
        this.position = position;

        
        socket.on('toggle_thrusters', value => {
            this.player.thrusters = value;
        });
        socket.on('rotation_input', value => {
            this.player.rotationInput = value;
        });
        socket.on('shoot_torpedoes', () => {
            this.player.shootingTorpedoes = true;
        });
        socket.on('toggle_phasers', value => {
            this.player.shootingPhasers = value;
        });
        socket.on('toggle_transfer_energy_to_shields', value => {
            this.player.transferringEnergyToShields = value;
        });
    }

    update() {
        this.position.modifySelf.add(this.velocity);
        this.energy++;
    }
}