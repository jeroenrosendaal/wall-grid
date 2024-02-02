import { fabric } from 'fabric';
import Column from './Column';
import Post from './Post';

class Grid {

    private width: number;
    private columns: number = 4;
    private padding: number = 20;
    private canvas: fabric.canvas;
    private groups: Array<Column> = [];

    constructor(width: number, canvas: fabric.canvas) {
        this.canvas = canvas
        this.width = width;
        this.render();
    }

    private getRandomGroup() {
        const index = Math.floor(Math.random() * this.groups.length);
        return this.groups[index]; 
    }

    public appendToGroup() {

        const group = this.getRandomGroup();
        const post = new Post();
        post.onClick((obj: fabric.Object) => {

            post.changeHeight();
            this.canvas.renderAll();
            group.reAlign();
            // group.remove(obj);
        });

        group.add(post.render());
    }

    public render() {

        for (let i = 0; i < this.columns; i++) {
            const width = this.width / this.columns;

            const rect = new fabric.Rect({
                width: width, 
                height: 10,
                fill: 'red',
                left: 0,
                top: 0,
                originX: 'left',
                originY: 'top',
                strokeWidth: 0,
            });

            const column = new Column(
                this.canvas,
                width,
                (i * width) + (i * this.padding),
                20,
            );

            column.add(rect);
            this.groups.push(column);
        }
    }
}

export default Grid;