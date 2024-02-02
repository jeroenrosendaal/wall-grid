import { fabric } from 'fabric';
import Grid from './Grid';

const canvas = new fabric.Canvas('canvas'); 
canvas.setWidth(document.body.clientWidth);
canvas.setHeight(document.body.clientHeight);

const grid = new Grid(
    1000,
    canvas
);

const addPostButton = document.getElementById('addPost');
if (addPostButton) {
    addPostButton.addEventListener('click', () => {
        grid.appendToGroup();
    }); 
}