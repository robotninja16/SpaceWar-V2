class Input {
    static #thrusters;
    static get thrusters() {
        return this.#thrusters;
    }
    static set thrusters(value) {
        if (this.#thrusters != value) {
            this.#thrusters = value;
            socket.emit('toggle_thrusters', value);
        }
    }
}