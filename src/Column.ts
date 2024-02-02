import { fabric } from 'fabric';

class Column {

    private objects: Array<any> = [];
    private width: number;
    private left: number;
    private top: number;
    private padding: number = 20;
    private canvas: fabric.Canvas;

    constructor(canvas: fabric.Canvas, width: number, left: number, top: number) {
        this.canvas = canvas;
        this.width = width;
        this.left = left;
        this.top = top;
    }

    public add(obj: fabric.Object) {
        this.renderObj(obj);
        this.objects.push(obj);
    }

    private getPrevTop() {
        const prevObj = this.objects[this.objects.length - 1];
        return prevObj ? prevObj.top + prevObj.height + this.padding : this.top;
    }

    private renderObj(obj: fabric.Obj) {
        const top = this.getPrevTop();
        obj.set({
            left: this.left,
            top: top, 
            width: this.width,
        });
        this.canvas.add(obj);
        this.canvas.renderAll();
    }

    public reAlign() {
        for (let i = 0; i <= this.objects.length -1; i++) {

            const obj = this.objects[i]

            //first obj
            if (i == 0) {
                obj.set('top', this.top);
                continue;
            }

            const prevObj = this.objects[i - 1];
            obj.set('top', prevObj.top + prevObj.height + this.padding);
            obj.setCoords();
        }
        this.canvas.renderAll();
    }

    public remove(removedObj: fabric.Object) {

        //get index
        // const removedObjIndex = this.objects.findIndex(
        //     o => o == removedObj 
        // );

        //update later posts
        // for (let i = removedObjIndex + 1; i <= this.objects.length - 1; i++) {
        //     const columnObj = this.objects[i];
        //     console.log('update', columnObj);
        //     const newTop = columnObj.top - removedObj.height - this.padding;
        //     columnObj.set('top', newTop);
        //     columnObj.setCoords();
        // }

        //remove post
        this.objects = this.objects.filter(
            o => o !== removedObj
        );

        this.canvas.remove(removedObj);
        this.canvas.renderAll();
        this.reAlign();
    }
}

export default Column;