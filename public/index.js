// these vaiables are for selecting between cross and naught
const crossBox = document.getElementById('cross-box');
const circleBox = document.getElementById('circle-box');
const dynamicCircle = document.getElementById('dynamic-circle');
const dynamicCross = document.getElementById('dynamic-cross');

const gameLoader = document.getElementById('game-loader'); 
const startBtn = document.getElementById('start-btn');
const gameBoard = document.getElementById('game-board');
const restartBtn = document.getElementById('restart');

const gameBoardGrid = document.querySelectorAll('.game-board__grid__child');

const winnerSequence = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];


let playerChoice = 'x';
let totalMoves = 0;
let foundWinner = false;
function crossWon(){
    let winnerFound = false;
   
    for(let i=0;i<winnerSequence.length;i++){
        let requiredWinningSequence = 0;

        for(let j=0;j<winnerSequence[i].length;j++){
            if(gameBoardGrid[winnerSequence[i][j]].hasChildNodes() && gameBoardGrid[winnerSequence[i][j]].firstElementChild.classList.contains('cross-move')){
                requiredWinningSequence += 1;
            }
            else{
                requiredWinningSequence = 0
                winnerFound = false;
                break
            }
        }

        if (requiredWinningSequence === 3){
            winnerFound = true;
            foundWinner = true;
            break;
        }
    }

    return winnerFound;
}

function checkDraw(){
    if(totalMoves === 9 && foundWinner === false){
        console.log('draw.')
    }
}

function naughtWon(){
    let winnerFound = false;
   
    for(let i=0;i<winnerSequence.length;i++){
        let requiredWinningSequence = 0;

        for(let j=0;j<winnerSequence[i].length;j++){
            if(gameBoardGrid[winnerSequence[i][j]].hasChildNodes() && gameBoardGrid[winnerSequence[i][j]].firstElementChild.classList.contains('circle-move')){
                requiredWinningSequence += 1;
            }
            else{
                requiredWinningSequence = 0
                winnerFound = false;
                break
            }
        }

        if (requiredWinningSequence === 3){
            winnerFound = true;
            foundWinner = true;
            break;
        }
    }
    
    return winnerFound;
}

function printMove(type){
    let element;
    if(type === 'x'){
        element = document.createElement('div');
        element.classList.add('cross-move');
    }
    else if(type === 'o'){
        element = document.createElement('div');
        element.classList.add('circle-move');
    }
    return element;
}

function computerMove(){
    let compRandomMove = Math.floor((Math.random() * 9));
    if(gameBoardGrid[compRandomMove].childElementCount === 0){
        const compChoice = playerChoice === 'x'?'o':'x';
        const Cmove = printMove(type = compChoice);
        gameBoardGrid[compRandomMove].removeEventListener('click',handleClick)
        gameBoardGrid[compRandomMove].appendChild(Cmove);
        totalMoves += 1;
        const compWon = compChoice==='x'?crossWon():naughtWon();
        if(compWon === true){
            console.log('computer won')
            gameBoardGrid.forEach((box)=>{
                box.removeEventListener('click',handleClick)
            })
        }
        checkDraw()
    }
    else if(totalMoves === 9){
        console.log('game over.')
    }
    else{
        computerMove()
    }
    
}
function handleClick(event){
    const pMove = printMove(type = playerChoice)
    totalMoves += 1;

    event.target.appendChild(pMove)

    event.target.removeEventListener('click',handleClick)
    let isPlayerWon = playerChoice === 'x'?crossWon():naughtWon()
    
    if(isPlayerWon === true){
        console.log('player won')
        gameBoardGrid.forEach((box)=>{
            box.removeEventListener('click',handleClick)
        })
    }
 
    else{
        computerMove()

    }
    checkDraw()
}

function playerMove(){
    gameBoardGrid.forEach((box)=>{
        if(box.childElementCount === 0){
            box.addEventListener('click',handleClick)
        }
    })
}

function gameStart(){
    gameLoader.style.visibility = 'hidden';
    gameBoard.style.visibility = 'visible';
    computerMove()
    playerMove()
}

function gameReset(){
    gameLoader.style.visibility = 'visible';
    gameBoard.style.visibility= 'hidden'
    gameBoardGrid.forEach((box)=>{
        box.removeEventListener('click',handleClick);
        box.innerHTML = '';
    })
}
function userChoice(event){
    const choosen = event.target.id
    if(choosen==='dynamic-cross'){
        playerChoice = 'x';

        // change selected cross-box styles
        crossBox.style.backgroundColor = '#f9c831';
        dynamicCross.style.setProperty('--dynamic-cross','#ff4d4d')

        //change not selected circle-box styles
        circleBox.style.background = '#ff4d4d';
        dynamicCircle.style.setProperty('--dynamic-circle-background-color','#f9c831')
        dynamicCircle.style.setProperty('--dynamic-circle-psuedo-color','#ff4d4d')
    }
    else if(choosen==='dynamic-circle'){
        playerChoice = 'o'

        // change selected circle-box styles
        circleBox.style.backgroundColor = '#f9c831';
        dynamicCircle.style.setProperty('--dynamic-circle-background-color','#ff4d4d')
        dynamicCircle.style.setProperty('--dynamic-circle-psuedo-color','#f9c831')

        //change not selected cross-box styles
        crossBox.style.backgroundColor = '#ff4d4d';
        dynamicCross.style.setProperty('--dynamic-cross','#f9c831')
    }
}


restartBtn.addEventListener('click',gameReset);
startBtn.addEventListener('click',gameStart)
crossBox.addEventListener('click',userChoice);
circleBox.addEventListener('click',userChoice);
