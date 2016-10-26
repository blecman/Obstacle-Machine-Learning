import { Grid } from './grid';
import { Car } from './car';
import { reproduce } from './genetic';

export interface VisualObject{
    canvas: Canvas;

    draw(): void;
    eventHandler(event: any, type: string): boolean;
    collide(x: number, y:number): boolean;
    update(): void;
    reset(type: string): void;
}

export class Canvas {
    canvas: HTMLCanvasElement;
    get context() { return this.canvas.getContext("2d"); }
    objects: VisualObject[] = [];
    mouseDown: boolean = false;
    dt: number;
    grid: Grid;
    cars: Car[] = [];
    startTime: number;

    update(){
        for (let obj of this.objects){
            obj.update();
        }

        this.redraw();

        this.checkFinished();
    }

    constructor(canvas: HTMLCanvasElement, dt = .07, grid=true, cars=20){
        this.canvas = canvas;
        this.dt = dt;

        if (grid == true){
            this.grid = new Grid(this, 3, 15);
            this.addObject(this.grid);
        }

        for (let i = 0; i < cars; i++){
            let car = new Car(this);
            this.cars.push(car);
            this.addObject(car);
        }

        setInterval(() => { this.update();}, 50);
        this.startTime = new Date().getTime();
    }

    clear(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    checkFinished(){
        let finished = true;
        for (let car of this.cars){
            finished = finished && (car.crashed || car.finished);
        }
        let timeDiff = new Date().getTime() - this.startTime;
        finished = finished ||  timeDiff > 5000;

        if (finished){
            this.reproduce();
        } 
    }

    addObject(obj: VisualObject){
        this.objects.push(obj);
        obj.draw();
    }

    redraw(){
        this.clear();

        for (let obj of this.objects){
            obj.draw();
        }
    }

    eventHandler(event: any, type: string){
        event.drag = this.mouseDown;

        if (type == 'mousedown'){
            this.mouseDown = true;
        } else if (type == 'mouseup'){
            this.mouseDown = false;
        }

        let updated = false;
        for (let obj of this.objects){
            updated = updated || obj.eventHandler(event, type);
        }
    }

    reset(type: string){
        for (let obj of this.objects){
            obj.reset(type);
        }
    }

    reproduce(){
        let dnas = [];
        for (let car of this.cars){
            dnas.push({
                'fitness': car.fitness(),
                'dna': car.network.getDna()
            })
        }

        dnas = reproduce(dnas);
        for (let i = 0; i < this.cars.length; i++){
            this.cars[i].network.setDna(dnas[i]);
        }

        this.reset("car");
        this.startTime = new Date().getTime();
    }

}