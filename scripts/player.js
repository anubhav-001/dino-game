import { GAME_HEIGHT, GRAVITY } from "./config.js";

export default class Player{
    constructor(){
        this.x = 10;
        this.h = 101;
        this.w = 97;
        this.y = GAME_HEIGHT - this.h - 20;
        this.image = new Image();
        // this.image.src = '../assets/dinoStart.png';
        this.runImages = ['./assets/DinoRun1.png' , './assets/DinoRun2.png'];
        this.index = 0;
        this.image.src = this.runImages[this.index];
        this.isJumping = false;
    }

    jump(){
        if(!this.isJumping){
            this.y = this.y - (GAME_HEIGHT - this.h);
            this.isJumping = true;
        }
    }
    
    fall(){
        const FLOOR = GAME_HEIGHT - this.h - 10;
        if(this.y >= FLOOR){
            this.isJumping = false;
            return;
        }
        else{
            this.y += GRAVITY;
        }
    }

    draw(context){
        context.drawImage(this.image , this.x , this.y , this.w , this.h);
        this.walkAnimation();
        this.fall();
    }

    walkAnimation(){
        if(this.index >= 2){
            this.index = 0;
        }
        this.image.src = this.runImages[this.index];
        this.index++;
    }
}
