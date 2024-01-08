// these variables are for selecting between cross and naught
const crossBox = document.getElementById('cross-box');
const circleBox = document.getElementById('circle-box');
const dynamicCircle = document.getElementById('dynamic-circle');
const dynamicCross = document.getElementById('dynamic-cross');



// variable  that toggles the ui.

const gameLoader = document.getElementById('game-loader'); 
const startBtn = document.getElementById('start-btn');
const gameBoard = document.getElementById('game-board');
const restartBtn = document.getElementById('restart');
const gameBoardGrid = document.querySelectorAll('.game-board__grid__child');
const refreshBtn = document.getElementById('refresh');
const logo = document.getElementById('logo');
const gameToggle = document.getElementById('game-toggle');
const score = document.getElementById('score');


// variables to display score.
const playerScoreText = document.getElementById('player_score_box_text');
const playerScoreValue = document.getElementById('player_score_box_score');
const cpuScoreText = document.getElementById('cpu_score_box_text');
const cpuScoreValue = document.getElementById('cpu_score_box_score');
const draw = document.getElementById('draw');



const winnerSequence = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
let playerChoice = 'x';
let totalMoves = 0;
let playerScore = 0;
let cpuScore = 0;
let foundWinner = false;
let winner;


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
        const winner = document.createElement('div');
        winner.innerHTML = 'Draw'
        winner.classList.add('winner');
        gameBoard.appendChild(winner);
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
            const winner = document.createElement('div');
            winner.innerHTML = 'computer won'
            winner.classList.add('winner');
            gameBoard.appendChild(winner);
            gameBoardGrid.forEach((box)=>{
                box.removeEventListener('click',handleClick)
            })
        }
        else if(compWon === false && totalMoves === 9){
            checkDraw()
        }
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
    checkDraw()
    
    if(isPlayerWon === true){
        const winner = document.createElement('div');
        winner.innerHTML = 'You won'
        winner.classList.add('winner');
        gameBoard.appendChild(winner);
        gameBoardGrid.forEach((box)=>{
            box.removeEventListener('click',handleClick)
        })
    }
    else{
        computerMove()

    }
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
    logo.style.visibility = 'visible';
    gameToggle.style.visibility = 'visible';
    score.style.visibility = 'visible';
    computerMove()
    playerMove()
}

function gameReset(){
    // gameLoader.style.visibility = 'visible';
    // gameBoard.style.visibility= 'hidden';
    // logo.style.visibility = 'hidden';
    // gameToggle.style.visibility = 'hidden';
    // score.style.visibility = 'hidden';
    // const lastChild = document.querySelector('.winner');
    // if(lastChild !== null){
    //     gameBoard.removeChild(lastChild)
    // }
    // gameBoardGrid.forEach((box)=>{
    //     box.removeEventListener('click',handleClick);
    //     box.innerHTML = '';
    // })
    // totalMoves = 0;
    // foundWinner = false;
    window.location.reload()
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

function refresh(){
    const lastChild = document.querySelector('.winner');
    if(lastChild !== null){
        gameBoard.removeChild(lastChild)
    }
    gameBoardGrid.forEach((box)=>{
        box.removeEventListener('click',handleClick);
        box.innerHTML = '';
    })
    totalMoves = 0;
    foundWinner = false;
    gameStart()
}
refreshBtn.addEventListener('click',refresh)
restartBtn.addEventListener('click',gameReset);
startBtn.addEventListener('click',gameStart)
crossBox.addEventListener('click',userChoice);
circleBox.addEventListener('click',userChoice);
