import { VisualObject, Canvas } from './Canvas';

export class Grid implements VisualObject{
    canvas: Canvas;
    rows: number;
    columns: number;
    dx: number;
    dy: number;
    blockFilled: boolean[][] = [];
    lastX: number = -1;
    lastY: number = -1;

    constructor(canvas: Canvas, rows=3, columns=10){
        this.rows = rows; this.columns = columns;
        this.initializeBlockFilled();
        this.canvas = canvas;
    }

    private initializeBlockFilled(){
        this.blockFilled = [];
        for (let i = 0; i < this.rows; i++){
            this.blockFilled.push([]);
            for(let j = 0; j < this.columns; j++){
                this.blockFilled[i].push(false);
            }
        }
    }

    eventHandler (event: any, type: string){
        if ( (type == "mousemove" && event.drag) || type == "mousedown"){
            this.clickHandler(event);
            return true;
        }
        return false;
    }

    update (){
        return;
    }

    private clickHandler(event: any){
        let rect = this.canvas.canvas.getBoundingClientRect()
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        let col = Math.floor(x/this.dx);
        let row = Math.floor(y/this.dy);
        if (event.drag && col == this.lastX && row == this.lastY){
            return;
        }
        this.blockFilled[row][col] = !this.blockFilled[row][col];
        this.lastX = col; this.lastY = row;
    }

    collide(x: number, y: number){
        let col = Math.floor(x/this.dx);
        let row = Math.floor(y/this.dy);
        if (col  < 0 || col >= this.columns || row < 0 || row >= this.rows){
            return true;
        }
        if (this.blockFilled[row][col]){
            return true;
        }
        return false;
    }

    draw(){
        this.dx = this.canvas.canvas.width / this.columns;
        this.dy = this.canvas.canvas.height / this.rows;

        this.drawGrid();
        this.fillBlocks();
    }

    reset(type: string){
        if (type == "grid"){
            this.initializeBlockFilled();
            
        }
    }

    obstaclesfter(x: number, cols: number){
        let col = Math.floor(x/this.dx);
        let blocksFilled = [];

        for (let i = col; i < col + cols; i++){
            if (i < this.blockFilled[0].length){
                for (let r = 0; r < this.blockFilled.length; r++){
                    blocksFilled.push(this.blockFilled[r][i] == true ? 1 : 0);
                }
            } else {
                for (let r = 0; r < this.blockFilled.length; r++){
                    blocksFilled.push(0);
                }
            }
        } 
        return blocksFilled;
    }

    private drawGrid(){
        this.canvas.context.beginPath();
        for (let i = 0; i <= this.columns; i++) {
            let x = i * this.dx;
            this.canvas.context.moveTo(x, 0);
            this.canvas.context.lineTo(x, this.canvas.canvas.height);
        }

        for (let i = 0; i <= this.rows; i++) {
            let y = i * this.dy;
            this.canvas.context.moveTo(0, y);
            this.canvas.context.lineTo(this.canvas.canvas.width, y);
        }

        this.canvas.context.strokeStyle = "black";
        this.canvas.context.stroke();

        this.canvas.context.closePath();
    }

    private fillBlocks(){
        for (let row = 0; row < this.rows; row++ ){
            for (let col = 0; col < this.columns; col++){
                if (this.blockFilled[row][col]){
                    this.canvas.context.fillStyle = "black";
                    this.canvas.context.fillRect(col*this.dx, row*this.dy, this.dx, this.dy);
                }
            }
        }
    }
}