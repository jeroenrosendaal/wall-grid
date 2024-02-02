import { fabric } from 'fabric';

class Post {

    private onClickCallback: (obj: fabric.Object) => void;
    private postObj: fabric.Obj;

    private getRandomHeight(min: number, max: number): number {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
    }

    public onClick(callback: (obj: fabric.Object) => void): void {
        this.onClickCallback = callback;
    }

    public changeHeight() {
        this.postObj.set('height', this.getRandomHeight(40, 400),);
    }

    private random_rgba() {
        var o = Math.round, r = Math.random, s = 255;
        return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
    }

    private onMouseDown() {

        this.postObj.set('fill', this.random_rgba());

        this.onClickCallback ?
            this.onClickCallback(this.postObj) :
            null;
    }

    public render(): fabric.Rect {

        // const post = new fabric.Rect({
        //     height: this.getRandomHeight(40, 400),
        //     strokeWidth: 0,
        //     fill: '#000',
        //     selectable: false,
        //     hoverCursor: 'pointer',
        // });

        const post = new fabric.Group([], {
            height: this.getRandomHeight(40, 400),
            strokeWidth: 0,
            fill: '#000',
            selectable: false,
            hoverCursor: 'pointer',
        });

        post.on('mousedown', this.onMouseDown.bind(this));

        this.postObj = post;
        return post;
    }
}

export default Post;