"use strict";
var grid_1 = require('./grid');
var car_1 = require('./car');
var genetic_1 = require('./genetic');
var Canvas = (function () {
    function Canvas(canvas, dt, grid, cars) {
        var _this = this;
        if (dt === void 0) { dt = .07; }
        if (grid === void 0) { grid = true; }
        if (cars === void 0) { cars = 20; }
        this.objects = [];
        this.mouseDown = false;
        this.cars = [];
        this.canvas = canvas;
        this.dt = dt;
        if (grid == true) {
            this.grid = new grid_1.Grid(this, 3, 15);
            this.addObject(this.grid);
        }
        for (var i = 0; i < cars; i++) {
            var car = new car_1.Car(this);
            this.cars.push(car);
            this.addObject(car);
        }
        setInterval(function () { _this.update(); }, 50);
        this.startTime = new Date().getTime();
    }
    Object.defineProperty(Canvas.prototype, "context", {
        get: function () { return this.canvas.getContext("2d"); },
        enumerable: true,
        configurable: true
    });
    Canvas.prototype.update = function () {
        for (var _i = 0, _a = this.objects; _i < _a.length; _i++) {
            var obj = _a[_i];
            obj.update();
        }
        this.redraw();
        this.checkFinished();
    };
    Canvas.prototype.clear = function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };
    Canvas.prototype.checkFinished = function () {
        var finished = true;
        for (var _i = 0, _a = this.cars; _i < _a.length; _i++) {
            var car = _a[_i];
            finished = finished && (car.crashed || car.finished);
        }
        var timeDiff = new Date().getTime() - this.startTime;
        finished = finished || timeDiff > 5000;
        if (finished) {
            this.reproduce();
        }
    };
    Canvas.prototype.addObject = function (obj) {
        this.objects.push(obj);
        obj.draw();
    };
    Canvas.prototype.redraw = function () {
        this.clear();
        for (var _i = 0, _a = this.objects; _i < _a.length; _i++) {
            var obj = _a[_i];
            obj.draw();
        }
    };
    Canvas.prototype.eventHandler = function (event, type) {
        event.drag = this.mouseDown;
        if (type == 'mousedown') {
            this.mouseDown = true;
        }
        else if (type == 'mouseup') {
            this.mouseDown = false;
        }
        var updated = false;
        for (var _i = 0, _a = this.objects; _i < _a.length; _i++) {
            var obj = _a[_i];
            updated = updated || obj.eventHandler(event, type);
        }
    };
    Canvas.prototype.reset = function (type) {
        for (var _i = 0, _a = this.objects; _i < _a.length; _i++) {
            var obj = _a[_i];
            obj.reset(type);
        }
    };
    Canvas.prototype.reproduce = function () {
        var dnas = [];
        for (var _i = 0, _a = this.cars; _i < _a.length; _i++) {
            var car = _a[_i];
            dnas.push({
                'fitness': car.fitness(),
                'dna': car.network.getDna()
            });
        }
        dnas = genetic_1.reproduce(dnas);
        for (var i = 0; i < this.cars.length; i++) {
            this.cars[i].network.setDna(dnas[i]);
        }
        this.reset("car");
        this.startTime = new Date().getTime();
    };
    return Canvas;
}());
exports.Canvas = Canvas;
//# sourceMappingURL=canvas.js.map