const scoreTextDisplay = document.getElementById('score__value');
const playButtons = document.querySelectorAll('button.play-btn');
const rulesBtn = document.querySelector('.rules > button');
const rulesModalCloseBtn = document.querySelector('.rules > .rules__modal > button');
const gameContainer = document.getElementById('game-container');
const landingScene = document.querySelector('.rps-landing');
const playingScene = document.querySelector('.rps-playing');
const playAgainBtn = document.getElementById('play-again');
const declarationText = document.querySelector('.declaration > p');

let playerChoice = null;
let computerChoice = null;
let playerScore = 0;
const acceptedChoices = ['rock','paper','scissors'];

const openRulesModal=()=>{
    rulesBtn.parentElement.firstElementChild.classList.add('open');
}
const closeRulesModal=()=>{
    rulesBtn.parentElement.firstElementChild.classList.remove('open');
}
const handlePlayerSelection=()=>{
    const playerBtn = document.createElement('button');
    playerBtn.setAttribute('class','play-btn');
    playerBtn.setAttribute('id', playerChoice);

    const playerDiv = playingScene.querySelector('.player');
    const text = playerDiv.querySelector('p');
    playerDiv.insertBefore(playerBtn,text);
}
const handleComputerSelection=()=>{
    const computerBtn = document.createElement('button');
    computerBtn.setAttribute('class','play-btn');
    computerBtn.setAttribute('id', computerChoice);

    const computerDiv = playingScene.querySelector('.computer');
    const text = computerDiv.querySelector('p');
    computerDiv.insertBefore(computerBtn,text);
}
const handleReset=()=>{
    // set choices
    playerChoice = null;
    computerChoice = null;

    // set scenes
    landingScene.style.display = 'block';
    playingScene.style.display = 'none';

    // remove buttons from previous round
    playingScene.querySelector('.player button').remove();
    playingScene.querySelector('.computer button').remove();
}
const handleCheckWinner=(pChoice,AIChoice)=>{
    if (AIChoice === pChoice) {

        declarationText.textContent = 'It\'s a Tie';
      } else if (
        (AIChoice === 'rock' && pChoice === 'paper') ||
        (AIChoice === 'paper' && pChoice === 'scissors') ||
        (AIChoice === 'scissors' && pChoice === 'rock')
      ) {
        playerScore++;
        scoreTextDisplay.textContent = playerScore;
        declarationText.textContent = 'You won';
    } else {
          declarationText.textContent = 'You lost';
      }
}
const handlePlayButtonClick=(event)=>{
    // set choices
    playerChoice = event.target.id;
    computerChoice = acceptedChoices[Math.floor(Math.random() * acceptedChoices.length)]

    // set scenes
    landingScene.style.display = 'none';
    playingScene.style.display = 'grid';

    // create elements for player choice
    handlePlayerSelection();
    
    // create elements for computer choice
    handleComputerSelection()

    // check winner
    handleCheckWinner(playerChoice,computerChoice);
}

// EVENT LISTENERS SETUP
rulesBtn.addEventListener('click',openRulesModal,false);
rulesModalCloseBtn.addEventListener('click',closeRulesModal,false);
playAgainBtn.addEventListener('click', handleReset, false);
playButtons.forEach((btn)=>{
    btn.addEventListener('click',handlePlayButtonClick,false);
});
