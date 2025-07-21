import { SPEED } from "./config.js";

export default class Cactus{
    constructor(x, y, w, h, imagesrc){
        this.x = x;
        this.h = h;
        this.w = w;
        this.y = y-this.h;
        this.image = new Image();
        this.image.src = imagesrc;
    }
    draw(context){
        // console.log('Yes',this);
        context.drawImage(this.image , this.x , this.y , this.w , this.h);
        this.move();
    }
    move(){
        this.x -= SPEED;
    }
    isOutOfScreen(){
        return (this.x < 0);
    }
}