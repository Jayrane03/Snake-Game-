let snakeVelocity = { x: 0, y: 0 };    //Initial Direction to be set 0
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');
const upbtn = document.getElementById('up')
const downbtn = document.getElementById('down')
const leftbtn = document.getElementById('left')
const rightbtn = document.getElementById('right')
const btns = document.querySelectorAll('.btn button')
// let board = document.getElementsByClassName('board')
let speed = 8;
let lastPaintTime = 0;
let score = 0;
let snakeArray = [
    { x: 13, y: 15 }
]
let food = { x: 8, y: 9 };



// Game functions

function main(ctime) {

    window.requestAnimationFrame(main);
    // musicSound.play();
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}
function isCollide(snake) {
    //  Touch snake own body
    for (let i = 1; i < snakeArray.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            // musicSound.pause();
            return true;
         
        }
    }

    // touch the wall
        if(snake[0].x >=18 || snake[0].x <=0 || snake[0].y >=18 || snake[0].y <=0 ){
                return true;
                // musicSound.pause();
        }
        return false;


   
}



function gameEngine() {
    // Updating the snake array
    if (isCollide(snakeArray)) {
        gameOverSound.play();
        musicSound.pause();
        snakeVelocity = { x: 0, y: 0 };
        alert("Game Over ! Press any key to continue");
        snakeArray = [{ x: 13, y: 15 }]
        // musicSound.pause();
        musicSound.play();
        score = 0;
    }
    // if eaten the food then add one to the body of the snake
    if (snakeArray[0].y === food.y && snakeArray[0].x === food.x) {
        foodSound.play();
        score += 1;
        if(score>highScoreVal){
            highScoreVal  = score;
            localStorage.setItem("highScore" ,JSON.stringify(highScoreVal))
            highScore.innerHTML = highScoreVal   
        }
        scores.innerHTML = score;
        // highScore.innerHTML = localStorage.setItem('itemJson');
        snakeArray.unshift({ x: snakeArray[0].x + snakeVelocity.x, y: snakeArray[0].y + snakeVelocity.y })
        let a = 2;
        let b = 15;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }  // formula to random number 

    }

    // Move the snake

    for (let i = snakeArray.length - 2; i >= 0; i--) {
        // const element = snakeArray[i];
        snakeArray[i + 1] = { ...snakeArray[i] };   // is the new object

    }
    snakeArray[0].x += snakeVelocity.x;
    snakeArray[0].y += snakeVelocity.y;






    //   Code for Displaying Snake
    let board = document.getElementById('board')
    board.innerHTML = "";
    snakeArray.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        // snakeElement.classList.add('snake');

        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}









// Main logic Start here
musicSound.play();
let highScore =document.getElementById("highScore");
 highScore = localStorage.getItem("highScore");
if(highScore=== null){
   let  highScoreVal = 0
    localStorage.setItem("highScore" ,JSON.stringify(highScoreVal))
}
else{
    highScoreVal = JSON.parse(highScore);
    highScore.innerHTML = highScore;
}


function keydown(key) {
    moveSound.play();
    switch (key) {
        case "ArrowUp":
            console.log("ArrowUp")
            snakeVelocity.x = 0;
            snakeVelocity.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown")
            snakeVelocity.x = 0;
            snakeVelocity.y = 1;
            break;
        case "ArrowRight":
            console.log("ArrowRight")
            snakeVelocity.x = 1;
            snakeVelocity.y = 0;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft")
            snakeVelocity.x = -1;
            snakeVelocity.y = 0;
            break;
        default:
            break;
    }
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    snakeVelocity = { x: 0, y: 1 }; //Game start's here
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            snakeVelocity.x = 0;
            snakeVelocity.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown")
            snakeVelocity.x = 0;
            snakeVelocity.y = 1;
            break;
        case "ArrowRight":
            console.log("ArrowRight")
            snakeVelocity.x = 1;
            snakeVelocity.y = 0;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft")
            snakeVelocity.x = -1;
            snakeVelocity.y = 0;
            break;
        default:
            break;

    }
  
});

btns.forEach(key => {
    key.addEventListener("click", () => keydown(key.dataset.key));
});