"use strict";
var neural_1 = require('./neural');
var Car = (function () {
    function Car(canvas, viewScope) {
        if (viewScope === void 0) { viewScope = 3; }
        this.x = 10;
        this.y = 10;
        this.vx = 0;
        this.vy = 0;
        this.crashed = false;
        this.finished = false;
        this.width = 10;
        this.height = 10;
        this.maxSpeed = 80;
        this.viewScope = viewScope;
        this.canvas = canvas;
        this.y = canvas.canvas.height / 2;
        var layerSizes = [2 + viewScope * this.canvas.grid.rows, 5, 4];
        this.network = new neural_1.Network(layerSizes);
    }
    Car.prototype.draw = function () {
        this.canvas.context.beginPath();
        this.canvas.context.moveTo(this.x, this.y);
        this.canvas.context.fillStyle = this.finished ? "green" : this.crashed ? "red" : "blue";
        this.canvas.context.fillRect(this.x, this.y, this.width, this.height);
        this.canvas.context.closePath();
    };
    Car.prototype.eventHandler = function (event, type) {
        // if (type == "keydown" && !this.crashed){
        //     return true;
        //     let key = event.key;
        //     if (key == 'ArrowUp'){
        //         this.vy -= 5;
        //     } else if (key == 'ArrowDown'){
        //         this.vy += 5;
        //     } else if (key == 'ArrowLeft'){
        //         this.vx -= 5;
        //     } else if (key == 'ArrowRight'){
        //         this.vx += 5;
        //     }
        //     if (Math.abs(this.vx) > this.maxSpeed) {this.vx = this.maxSpeed*Math.sign(this.vx)};
        //     if (Math.abs(this.vy) > this.maxSpeed) {this.vy = this.maxSpeed*Math.sign(this.vy)};
        //     return true;
        // }
        return false;
    };
    Car.prototype.collide = function (x, y) {
        return false;
    };
    Car.prototype.steer = function () {
        var position = [(this.x % this.canvas.grid.dx) / this.canvas.grid.dx, this.y / this.canvas.canvas.height];
        var blocksFilledAfter = this.canvas.grid.obstaclesfter(this.x, this.viewScope);
        var input = position.concat(blocksFilledAfter);
        var direction = this.network.apply(input);
        this.accelerate(direction);
    };
    Car.prototype.fitness = function () {
        return Math.pow(this.x, 1);
    };
    Car.prototype.accelerate = function (direction) {
        if (direction[0] == 1) {
            this.vy -= 5; //up
        }
        if (direction[1] == 1) {
            this.vy += 5; //down
        }
        if (direction[2] == 1) {
            this.vx -= 5; //left
        }
        if (direction[3] == 1) {
            this.vx += 5; //right
        }
        if (Math.abs(this.vx) > this.maxSpeed) {
            this.vx = this.maxSpeed * Math.sign(this.vx);
        }
        ;
        if (Math.abs(this.vy) > this.maxSpeed) {
            this.vy = this.maxSpeed * Math.sign(this.vy);
        }
        ;
    };
    Car.prototype.update = function () {
        this.steer();
        this.move(this.vx * this.canvas.dt, this.vy * this.canvas.dt);
    };
    Car.prototype.reset = function (type) {
        if (type == "car") {
            this.x = 10;
            this.y = this.canvas.canvas.height / 2;
            this.vx = 0;
            this.vy = 0;
            this.crashed = false;
            this.finished = false;
        }
    };
    Car.prototype.move = function (dx, dy) {
        if (!this.crashed) {
            var oldX = this.x;
            var oldY = this.y;
            this.x += dx;
            this.y += dy;
            if (this.x + this.width >= this.canvas.canvas.width) {
                this.finished = true;
            }
            ;
            this.checkCrashed();
            if (this.crashed) {
                this.x = oldX;
                this.y = oldY;
            }
        }
    };
    Car.prototype.checkCrashed = function () {
        if (this.crashed) {
            return;
        }
        for (var _i = 0, _a = this.corners(); _i < _a.length; _i++) {
            var corner = _a[_i];
            for (var _b = 0, _c = this.canvas.objects; _b < _c.length; _b++) {
                var obj = _c[_b];
                if (!this.crashed && obj.collide(corner['x'], corner['y'])) {
                    this.crashed = true;
                    return;
                }
            }
        }
    };
    Car.prototype.corners = function () {
        return [
            { 'x': this.x, 'y': this.y },
            { 'x': this.x + this.width, 'y': this.y },
            { 'x': this.x + this.width, 'y': this.y + this.height },
            { 'x': this.x, 'y': this.y + this.height },
        ];
    };
    return Car;
}());
exports.Car = Car;
//# sourceMappingURL=car.js.map