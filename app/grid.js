"use strict";
var Grid = (function () {
    function Grid(canvas, rows, columns) {
        if (rows === void 0) { rows = 3; }
        if (columns === void 0) { columns = 10; }
        this.blockFilled = [];
        this.lastX = -1;
        this.lastY = -1;
        this.rows = rows;
        this.columns = columns;
        this.initializeBlockFilled();
        this.canvas = canvas;
    }
    Grid.prototype.initializeBlockFilled = function () {
        this.blockFilled = [];
        for (var i = 0; i < this.rows; i++) {
            this.blockFilled.push([]);
            for (var j = 0; j < this.columns; j++) {
                this.blockFilled[i].push(false);
            }
        }
    };
    Grid.prototype.eventHandler = function (event, type) {
        if ((type == "mousemove" && event.drag) || type == "mousedown") {
            this.clickHandler(event);
            return true;
        }
        return false;
    };
    Grid.prototype.update = function () {
        return;
    };
    Grid.prototype.clickHandler = function (event) {
        var rect = this.canvas.canvas.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        var col = Math.floor(x / this.dx);
        var row = Math.floor(y / this.dy);
        if (event.drag && col == this.lastX && row == this.lastY) {
            return;
        }
        this.blockFilled[row][col] = !this.blockFilled[row][col];
        this.lastX = col;
        this.lastY = row;
    };
    Grid.prototype.collide = function (x, y) {
        var col = Math.floor(x / this.dx);
        var row = Math.floor(y / this.dy);
        if (col < 0 || col >= this.columns || row < 0 || row >= this.rows) {
            return true;
        }
        if (this.blockFilled[row][col]) {
            return true;
        }
        return false;
    };
    Grid.prototype.draw = function () {
        this.dx = this.canvas.canvas.width / this.columns;
        this.dy = this.canvas.canvas.height / this.rows;
        this.drawGrid();
        this.fillBlocks();
    };
    Grid.prototype.reset = function (type) {
        if (type == "grid") {
            this.initializeBlockFilled();
        }
    };
    Grid.prototype.obstaclesfter = function (x, cols) {
        var col = Math.floor(x / this.dx);
        var blocksFilled = [];
        for (var i = col; i < col + cols; i++) {
            if (i < this.blockFilled[0].length) {
                for (var r = 0; r < this.blockFilled.length; r++) {
                    blocksFilled.push(this.blockFilled[r][i] == true ? 1 : 0);
                }
            }
            else {
                for (var r = 0; r < this.blockFilled.length; r++) {
                    blocksFilled.push(0);
                }
            }
        }
        return blocksFilled;
    };
    Grid.prototype.drawGrid = function () {
        this.canvas.context.beginPath();
        for (var i = 0; i <= this.columns; i++) {
            var x = i * this.dx;
            this.canvas.context.moveTo(x, 0);
            this.canvas.context.lineTo(x, this.canvas.canvas.height);
        }
        for (var i = 0; i <= this.rows; i++) {
            var y = i * this.dy;
            this.canvas.context.moveTo(0, y);
            this.canvas.context.lineTo(this.canvas.canvas.width, y);
        }
        this.canvas.context.strokeStyle = "black";
        this.canvas.context.stroke();
        this.canvas.context.closePath();
    };
    Grid.prototype.fillBlocks = function () {
        for (var row = 0; row < this.rows; row++) {
            for (var col = 0; col < this.columns; col++) {
                if (this.blockFilled[row][col]) {
                    this.canvas.context.fillStyle = "black";
                    this.canvas.context.fillRect(col * this.dx, row * this.dy, this.dx, this.dy);
                }
            }
        }
    };
    return Grid;
}());
exports.Grid = Grid;
//# sourceMappingURL=grid.js.map