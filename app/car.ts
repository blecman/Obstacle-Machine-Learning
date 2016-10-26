import { VisualObject, Canvas } from './canvas';
import { Network } from './neural';

export class Car implements VisualObject{
    canvas: Canvas;
    x: number = 10;
    y: number = 10;
    vx: number = 0;
    vy: number= 0;
    crashed: boolean = false;
    finished: boolean = false;
    width: number = 10;
    height: number = 10;
    maxSpeed: number = 80;
    network: Network;
    viewScope: number;

    constructor(canvas, viewScope=3){
        this.viewScope = viewScope;
        this.canvas = canvas;
        this.y = canvas.canvas.height/2;
        let layerSizes = [2 + viewScope*this.canvas.grid.rows, 5, 4]
        this.network = new Network(layerSizes);
    }


    draw(){
        this.canvas.context.beginPath();
        this.canvas.context.moveTo(this.x,this.y);
        this.canvas.context.fillStyle = this.finished ? "green" : this.crashed ? "red" : "blue";
        this.canvas.context.fillRect(this.x,this.y, this.width, this.height);
        this.canvas.context.closePath();
    }

    eventHandler(event: any, type: string){
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
    }

    collide (x: number, y: number){
        return false;
    }

    steer(){
        let position = [(this.x % this.canvas.grid.dx)/this.canvas.grid.dx, this.y/this.canvas.canvas.height];
        let blocksFilledAfter = this.canvas.grid.obstaclesfter(this.x, this.viewScope);
        let input = position.concat(blocksFilledAfter);
        let direction = this.network.apply(input);
        this.accelerate(direction);
    }

    fitness(){
        return Math.pow(this.x, 1);
    }

    private accelerate(direction: number[]){
        if (direction[0] == 1){
            this.vy -= 5; //up
        }

        if (direction[1] == 1){
            this.vy += 5; //down
        }

        if (direction[2] == 1){
            this.vx -=5; //left
        }

        if (direction[3] == 1){
            this.vx += 5; //right
        }

        if (Math.abs(this.vx) > this.maxSpeed) {this.vx = this.maxSpeed*Math.sign(this.vx)};
        if (Math.abs(this.vy) > this.maxSpeed) {this.vy = this.maxSpeed*Math.sign(this.vy)};
    }

    update(){
        this.steer();
        this.move(this.vx * this.canvas.dt, this.vy * this.canvas.dt);
    }

    reset(type: string){
        if (type == "car"){
            this.x = 10; this.y = this.canvas.canvas.height/2;
            this.vx = 0; this.vy = 0;
            this.crashed = false;
            this.finished = false;
        }
    }

    private move(dx: number, dy: number){
        if (!this.crashed){
            let oldX = this.x; let oldY = this.y;
            this.x += dx; this.y += dy;
            if (this.x + this.width >= this.canvas.canvas.width) { this.finished = true};
            this.checkCrashed();
            if (this.crashed){
                this.x = oldX; this.y = oldY;
            }
        }
    }

    private checkCrashed(){
        if (this.crashed) {return;}

        for (let corner of this.corners()){
            for (let obj of this.canvas.objects){
                if (!this.crashed && obj.collide(corner['x'], corner['y'])){
                    this.crashed = true;
                    return;
                }
            }
        }
    }

    private corners(){
        return [
            {'x': this.x, 'y': this.y},
            {'x': this.x + this.width, 'y': this.y},
            {'x': this.x + this.width, 'y': this.y + this.height},
            {'x': this.x, 'y': this.y + this.height},
        ]
    }
}