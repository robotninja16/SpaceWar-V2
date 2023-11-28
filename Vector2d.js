/** Determines whether two numbers are roughly equal (closer than the limit, by default less than 10^-15 apart) */
Math.__proto__.approximatelyEquals = (a, b, limit = 0.000000000000001) => Math.abs(a - b) < limit;

module.exports = class Vector2 {
    /** Gets the x-coordinate of this vector */ x;
    /** Gets the y-coordinate of this vector */ y;
    /** Gets the angle of the vector (radians) */
    get angle() { return Math.atan2(this.y, this.x); }
    /** Gets the length of the vector (distance from origin) */
    get length() { return Math.sqrt((this.x ** 2) + (this.y ** 2)); }
    #modifySelf = false;
    /** Sets a flag to make the next call modify this vector */
    get modifySelf() { this.#modifySelf = true; return this; }
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    /** Returns the origin (0, 0) */
    static get zero() { return new Vector2(0, 0); }
    /** Returns a unit vector facing left (-1, 0) */
    static get left() { return new Vector2(-1, 0); }
    /** Returns a unit vector facing right (1, 0) */
    static get right() { return new Vector2(1, 0); }
    /** Returns a unit vector facing up (0, 1) */
    static get up() { return new Vector2(0, 1); }
    /** Returns a unit vector facing down (0, -1) */
    static get down() { return new Vector2(0, -1); }
    /** Returns a unit vector facing up and left (-SQRT2 / 2, SQRT2 / 2) */
    static get upLeft() { return new Vector2(-Math.SQRT2 / 2, Math.SQRT2 / 2); }
    /** Returns a unit vector facing up and right (SQRT2 / 2, SQRT2 / 2) */
    static get upRight() { return new Vector2(Math.SQRT2 / 2, Math.SQRT2 / 2); }
    /** Returns a unit vector facing down and left (-SQRT2 / 2, -SQRT2 / 2) */
    static get downLeft() { return new Vector2(-Math.SQRT2 / 2, -Math.SQRT2 / 2); }
    /** Returns a unit vector facing down and right (SQRT2 / 2, -SQRT2 / 2) */
    static get downRight() { return new Vector2(Math.SQRT2 / 2, -Math.SQRT2 / 2); }
    /** Returns a unit vector facing up and right (SQRT2 / 2, SQRT2 / 2) */
    static get one() { return new Vector2(Math.SQRT2 / 2, Math.SQRT2 / 2); }
    /** Returns a unit vector facing down and left (-SQRT2 / 2, -SQRT2 / 2) */
    static get negOne() { return new Vector2(-Math.SQRT2 / 2, -Math.SQRT2 / 2); }
    /** Gets a unit vector from an angle (radians) */
    static fromAngle(angle) { return new Vector2(Math.sin(angle), Math.cos(angle)); }
    /** Gets a vector from a string (ex "(1,2)" or even " 1 , 2)\n" to new Vector2(1, 2))*/
    static parse(str) { let xy = str.replace(/[\u0028\u0029\s]/, "").split(","); return new Vector2(Number(xy[0]), Number(xy[1])); }
    /** Converts a vector to a string (ex Vector2(1, 2) => "(1,2)") */
    toString() { return "(" + this.x + "," + this.y + ")"; }
    /** Same as toString, but without parenthesis (ex Vector2(1, 2) => "1,2") */
    toMinimalString() { return this.x + "," + this.y; }
    /** Converts a vector to a Json string (ex Vector2(1, 2) => "{"x":"1","y":"2"}") */
    toJsonString() { return "{\"x\":\"" + this.x + "\",\"y\":\"" + this.y + "\"}"; }
    /** Determines whether two vectors are roughly equal (closer than the limit, by default less than 10^-15 apart) */
    approximatelyEquals(vector, limit = 0.000000000000001) { return Math.approximatelyEquals(this.x, vector.x, limit) && Math.approximatelyEquals(this.y, vector.y, limit); }
    /** Duplicates this vector */
    copy() { return new Vector2(this.x, this.y); }
    /** Rounds x and y coordinates */
    round() { let returnValue = new Vector2(Math.round(this.x), Math.round(this.y)); if (this.#modifySelf) { this.x = returnValue.x; this.y = returnValue.y; this.#modifySelf = false; return this; } return returnValue;}
    /** Rounds x and y coordinates down */
    floor() { let returnValue = new Vector2(Math.floor(this.x), Math.floor(this.y)); if (this.#modifySelf) { this.x = returnValue.x; this.y = returnValue.y; this.#modifySelf = false; return this; } return returnValue;}
    /** Rounds x and y coordinates up */
    ceil() { let returnValue = new Vector2(Math.ceil(this.x), Math.ceil(this.y)); if (this.#modifySelf) { this.x = returnValue.x; this.y = returnValue.y; this.#modifySelf = false; return this; } return returnValue;}
    /** Clamps x and y coordinates to be within the rectangle created by minVector and maxVector */
    clamp(minVector, maxVector) { let returnValue = new Vector2(Math.clamp(this.x, minVector, maxVector), Math.clamp(this.y, minVector, maxVector)); if (this.#modifySelf) { this.x = returnValue.x; this.y = returnValue.y; this.#modifySelf = false; return this; } return returnValue;}
    /** Adds this vector to another */
    add(vector) { let returnValue = new Vector2(this.x + vector.x, this.y + vector.y); if (this.#modifySelf) { this.x = returnValue.x; this.y = returnValue.y; this.#modifySelf = false; return this; } return returnValue;}
    /** Subtracts another vector from this one */
    subtract(vector) { let returnValue = new Vector2(this.x - vector.x, this.y - vector.y); if (this.#modifySelf) { this.x = returnValue.x; this.y = returnValue.y; this.#modifySelf = false; return this; } return returnValue;}
    /** Multiplies (scales) this vector by a number or another vector */
    multiply(arg) { return typeof (arg) == 'number' ? this.#multiply_num(arg) : this.#multiply_vec(arg); }
    #multiply_num(number) { let returnValue = new Vector2(this.x * number, this.y * number); if (this.#modifySelf) { this.x = returnValue.x; this.y = returnValue.y; this.#modifySelf = false; return this; } return returnValue;}
    #multiply_vec(vector) { let returnValue = new Vector2(this.x * vector.x, this.y * vector.y); if (this.#modifySelf) { this.x = returnValue.x; this.y = returnValue.y; this.#modifySelf = false; return this; } return returnValue;}
    /** Divides this vector by a number or another vector */
    divide(arg) { return typeof (arg) == 'number' ? this.#divide_num(arg) : this.#divide_vec(arg); }
    #divide_num(number) { let returnValue = new Vector2(this.x / number, this.y / number); if (this.#modifySelf) { this.x = returnValue.x; this.y = returnValue.y; this.#modifySelf = false; return this; } return returnValue;}
    #divide_vec(vector) { let returnValue = new Vector2(this.x / vector.x, this.y / vector.y); if (this.#modifySelf) { this.x = returnValue.x; this.y = returnValue.y; this.#modifySelf = false; return this; } return returnValue;}
    /** Normalizes the vector (sets its length to 1) */
    normalized() { let returnValue = this.divide(this.length); if (this.#modifySelf) { this.x = returnValue.x; this.y = returnValue.y; this.#modifySelf = false; return this; } return returnValue;}
    /** Checks if the vector is normalized */
    isNormalized() { return Math.approximatelyEquals(this.length, 1); }
    /** Rotates this vector around the origin */
    rotated(rotation) { let returnValue = Vector2.fromAngle(this.angle + rotation).multiply(this.length); if (this.#modifySelf) { this.x = returnValue.x; this.y = returnValue.y; this.#modifySelf = false; return this; } return returnValue;}
    /** Rotates this vector around another */
    rotatedAround(vector, rotation) {
        var relativeVector = this.subtract(vector);
        let returnValue = Vector2.fromAngle(relativeVector.angle + rotation).multiply(relativeVector.length).add(vector);
        if (this.#modifySelf) {
            this.x = returnValue.x;
            this.y = returnValue.y;
            this.#modifySelf = false;
            return this;
        }
        return returnValue;
    }
    /** Returns the angle between this vector and another (radians) */
    angleBetweenVectors(vector) {
        var angle = vector.angle - this.angle;
        if (Math.abs(angle) == Math.PI) return Math.PI;
        if (angle > Math.PI || angle <= -Math.PI)
            angle = (vector.angle + (Math.PI * 2)) - this.angle;
        if (angle > Math.PI || angle <= -Math.PI)
            angle = vector.angle - (this.angle + (Math.PI * 2));
        return angle;
    }
    /** Returns this vector's angle relative to another (radians) */
    angleRelativeTo(vector) { return this.subtract(vector).angle; }
    /** Interpolates between this vector and another (weight = 0 returns this, weight = 1 returns other vector) */
    lerp(vector, weight) { let returnValue = vector.subtract(this).multiply(weight).add(this); if (this.#modifySelf) { this.x = returnValue.x; this.y = returnValue.y; this.#modifySelf = false; return this; } return returnValue;}
    /** Invert the vector (multiply by -1) */
    invert(axis = 'both') { let returnValue = new Vector2(axis == 'both' || axis == 'x' ? -this.x : this.x, axis == 'both' || axis == 'y' ? -this.y : this.y); if (this.#modifySelf) { this.x = returnValue.x; this.y = returnValue.y; this.#modifySelf = false; return this; } return returnValue;}
    /** Returns the dot product of this vector and another (how far apart the angles are from -1 (opposite) to 1 (aligned)) */
    dot(vector) { return this.length * vector.length * Math.cos(this.angleBetweenVectors(vector)); }
    /** Returns this vector, reflected across another as though the second were an axis or line */
    reflect(vector) { let returnValue = this.subtract(vector.multiply(this.dot(vector) * 2)); if (this.#modifySelf) { this.x = returnValue.x; this.y = returnValue.y; this.#modifySelf = false; return this; } return returnValue;}
    /** Returns this vector, bounced on another as though the second were an axis or line */
    bounce(vector) { let returnValue = vector.multiply(this.dot(vector) * 2).subtract(this); if (this.#modifySelf) { this.x = returnValue.x; this.y = returnValue.y; this.#modifySelf = false; return this; } return returnValue;}
    //cross(vector) { return }
}