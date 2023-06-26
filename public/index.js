// these vaiables are for selecting between cross and naught
const crossBox = document.getElementById('cross-box');
const circleBox = document.getElementById('circle-box');
const dynamicCircle = document.getElementById('dynamic-circle');
const dynamicCross = document.getElementById('dynamic-cross');

let playerChoice;


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


crossBox.addEventListener('click',userChoice);
circleBox.addEventListener('click',userChoice);
