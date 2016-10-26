"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var canvas_1 = require('./canvas');
var MapBuilderComponent = (function () {
    function MapBuilderComponent() {
    }
    MapBuilderComponent.prototype.ngAfterViewInit = function () {
        // Component views are initialized
        this.mapCanvas = new canvas_1.Canvas(document.getElementById("mapCanvas"));
        // window.setInterval(function(){
        //     console.log("hello");
        //     console.log(this.mapCanvas.dt);
        //     this.mapCanvas.update();
        // }, 100);
    };
    MapBuilderComponent.prototype.handleKeyboardEvent = function (event) {
        this.eventHandler(event, "keydown");
    };
    MapBuilderComponent.prototype.eventHandler = function (event, type) {
        this.mapCanvas.eventHandler(event, type);
    };
    MapBuilderComponent.prototype.reset = function (type) {
        this.mapCanvas.reset(type);
    };
    __decorate([
        core_1.HostListener('document:keydown', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], MapBuilderComponent.prototype, "handleKeyboardEvent", null);
    MapBuilderComponent = __decorate([
        core_1.Component({
            selector: 'map-builder',
            template: "\n    <canvas id=\"mapCanvas\" width=\"1300\" height=\"400\" (keyup)=\"eventHandler($event, 'keyup')\" (mousedown)=\"eventHandler($event, 'mousedown')\" (mouseup)=\"eventHandler($event, 'mouseup')\" (mousemove)=\"eventHandler($event, 'mousemove')\"></canvas>\n    <button (click)=\"reset('car')\">Reset Car</button>\n    <button (click)=\"reset('grid')\">Reset Grid</button>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], MapBuilderComponent);
    return MapBuilderComponent;
}());
exports.MapBuilderComponent = MapBuilderComponent;
//# sourceMappingURL=map-builder.component.js.map