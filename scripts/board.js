import Cactus from "./cactus.js";
import { FRAME_RATE, GAME_HEIGHT, GAME_WIDTH, MAX, MIN } from "./config.js";
import Floor from "./floor.js";
import Player from "./player.js";

let player;
let context;
let floor;

window.addEventListener('load' , gameStart);

function gameStart(){
    bindEvents();
    prepareCanvas();
    loadSprites();
    gameLoop();
}

function bindEvents(){
    window.addEventListener('keyup', doJump);
}

function doJump(event){
    console.log(event.code);
    if(event.code === 'Space'){
        player.jump();
    }
}

function prepareCanvas(){
    const canvas = document.querySelector('#canvas');
    canvas.height = GAME_HEIGHT;
    canvas.width = GAME_WIDTH;
    context = canvas.getContext('2d');
}

function loadSprites(){
    player = new Player();
    floor = new Floor();
    loadCactus();
}

function generateRandomNumber(){
    return Math.floor(Math.random() * MAX - MIN + 1)+ MIN;
}

let delay = 1;
function generateRandomCactus(){
    if(delay >= 50){
        delay = 0;
        setTimeout(()=>{
        loadCactus();
        },generateRandomNumber());
    }
    else{
        delay++;
    }
}

let cactusArray = [];
function loadCactus(){
    const cactusArr = ['./assets/LargeCactus1.png' , './assets/LargeCactus2.png' , './assets/LargeCactus3.png'];
    let gap = 1;
    for(var c of cactusArr){
        const cactus = new Cactus(GAME_WIDTH * gap , GAME_HEIGHT-20 , 40 , 71 , c);
        gap++;
        cactusArray.push(cactus);
    }
}

function printCactus(context){
    for(let cactus of cactusArray){
        cactus.draw(context);
    }
}

function removeUnusedCactus(){
    cactusArray = cactusArray.filter(c => !c.isOutOfScreen());
}

function printGameOver(){
    context.font = 'bold 48px serif';
    context.fillStyle = 'grey';
    context.fillText('GAME OVER' , GAME_WIDTH/3 , GAME_HEIGHT/2);
}

function gameLoop(){
    clearScreen();
    if(isCollisionHappens()){
        player.draw(context);
        floor.draw(context);
        printCactus(context);
        generateRandomCactus();
        removeUnusedCactus();
        printGameOver();
        score();
    }
    else{
        player.draw(context);
        floor.draw(context);
        printCactus(context);
        generateRandomCactus();
        removeUnusedCactus();
        score();
        setTimeout(function(){
            requestAnimationFrame(gameLoop);
        }, FRAME_RATE);
    }
}

// let scoreValue = 0;
// function score(){
//     scoreValue++;
//     if(!localStorage.maxScore){
//         localStorage.maxScore = scoreValue;
//     }
//     if(Number(localStorage.maxScore) < scoreValue){
//         localStorage.maxScore = scoreValue;
//     }
//     context.font = 'bold 20px serif';
//     context.fillStyle = 'grey';
//     context.fillText(scoreValue.toString().padStart(5,0 ) , GAME_WIDTH - 100 , 40);
//     context.fillText(Number(localStorage.maxScore).toString().padStart(5,0), GAME_WIDTH - 200 , 40);
// }

let scoreValue = 0;

function score() {
    scoreValue++;

    let maxScore = parseInt(localStorage.getItem('maxScore')) || 0;

    if (scoreValue > maxScore) {
        maxScore = scoreValue;
        localStorage.setItem('maxScore', maxScore);
    }

    context.font = 'bold 20px serif';
    context.fillStyle = 'grey';

    context.fillText(scoreValue.toString().padStart(5, '0'), GAME_WIDTH - 100, 40);
    context.fillText(maxScore.toString().padStart(5, '0'), GAME_WIDTH - 200, 40);
}


function clearScreen(){
    context.fillStyle = 'white';
    context.fillRect(0,0,GAME_WIDTH,GAME_HEIGHT);
}

function isCollide(cactus){
    return player.x < cactus.x + cactus.w && player.x + player.w > cactus.x && player.y < cactus.y + cactus.h && player.y + player.h > cactus.y ;
}

function isCollisionHappens(){
    return cactusArray.some(c=>isCollide(c));
}
