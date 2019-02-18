
var randomNumber = Math.floor(Math.random() * 99) + 1;
var guesses = document.querySelector('#guesses');
var lastResult = document.querySelector('#lastResult');
var lowOrHi = document.querySelector('#lowOrHi');

var guessSubmit = document.querySelector('.guessSubmit');
var guessField = document.querySelector('.guessField');

var guessCount = 1;
var winCount = 0;
var loseCount = 0;

var gameCountP = document.querySelector("#gameCount");
$("#gameCount").html("Games Won: " + winCount + " || Games Lost: " + loseCount);

var resetButton = document.querySelector('#reset');

resetButton.style.display = 'none';
guessField.focus();

$(guessSubmit).click(function(){
    var userGuess = Number(guessField.value);
    if (guessCount === 1) {
        guesses.innerHTML = 'Previous guesses: ';
    }
    guesses.innerHTML += userGuess + ' ';
    
    if (userGuess === randomNumber) {
        lastResult.innerHTML = 'Congratulations! You got it right!';
        $(lastResult).css("backgroundColor", "green");
        lowOrHi.innerHTML = '';
        winCount++;
        setGameOver();
    } else if (guessCount === 7) {
        lastResult.innerHTML = 'Sorry, you lost!';
        loseCount++;
        setGameOver();
    } else {
        lastResult.innerHTML = 'Wrong!';
        $(lastResult).css("backgroundColor", "red");
    }
    
    if(typeof userGuess != "number" || userGuess > 99 || userGuess < 1){
        lowOrHi.innerHTML = "Wrong input!";
    }
    else if(userGuess < randomNumber) {
        lowOrHi.innerHTML = 'Last guess was too low!';
    } 
    else if(userGuess > randomNumber) {
        lowOrHi.innerHTML = 'Last guess was too high!';
    }

    guessCount++;
    guessField.value = '';
    guessField.focus();
});

function setGameOver() {
    gameCountP.innerHTML = "Games Won: " + winCount + " || Games Lost: " + loseCount;
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton.style.display = 'inline';
    resetButton.addEventListener('click', resetGame);
}

function resetGame() {
    guessCount = 1;
    
    var resetParas = document.querySelectorAll('.resultParas p');
    for (var i = 0 ; i < resetParas.length ; i++) {
      resetParas[i].textContent = '';
    }
    
    resetButton.style.display = 'none';
    
    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();
    $("#gameCount").html("Games Won: " + winCount + " || Games Lost: " + loseCount);
    
    lastResult.style.backgroundColor = 'white';
    
    randomNumber = Math.floor(Math.random() * 99) + 1;
}