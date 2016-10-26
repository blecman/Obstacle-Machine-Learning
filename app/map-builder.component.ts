import { Component, AfterViewInit, HostListener } from '@angular/core';

import { Canvas } from './canvas';
import { Grid } from './grid';
import { Car } from './car';
import { Network } from './neural';

@Component({
  selector: 'map-builder',
  template: `
    <canvas id="mapCanvas" width="1300" height="400" (keyup)="eventHandler($event, 'keyup')" (mousedown)="eventHandler($event, 'mousedown')" (mouseup)="eventHandler($event, 'mouseup')" (mousemove)="eventHandler($event, 'mousemove')"></canvas>
    <button (click)="reset('car')">Reset Car</button>
    <button (click)="reset('grid')">Reset Grid</button>
  `
})
export class MapBuilderComponent implements AfterViewInit{ 
    mapCanvas: Canvas;

    ngAfterViewInit() {
        // Component views are initialized
        this.mapCanvas = new Canvas(<HTMLCanvasElement>document.getElementById("mapCanvas"));

        // window.setInterval(function(){
        //     console.log("hello");
        //     console.log(this.mapCanvas.dt);
        //     this.mapCanvas.update();
        // }, 100);

    }

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: any) { 
        this.eventHandler(event, "keydown");
    }


    eventHandler(event: any, type: string){
        this.mapCanvas.eventHandler(event, type);
    }

    reset(type: string){
        this.mapCanvas.reset(type);
    }
}