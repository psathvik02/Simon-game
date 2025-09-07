var is_playing = false;
var showSequence = false;
var inputSequence = [];
var computerSequence = [];
var level = 0;

$(".btn").on("click", function () {
    if (showSequence) return;
    handleClicks(this.id)
});

$(document).on("keypress", function () {
    if (!is_playing && !showSequence) {
        is_playing = true;
        StartGame();
    }
});

function StartGame(){
    computerSequence = [];
    level = 0;
    is_playing = true;
    nextRound();

}
function nextRound(){
    level++;
    $("h1").html("Level "+level);
    inputSequence = [];
    var random_number = Math.floor(Math.random() * 4 + 1);
    var color = randomButton(random_number);
    computerSequence.push(color);
    showingSequence();
}
function showingSequence(){
    showSequence = true;
    flashButton(computerSequence[computerSequence.length - 1]);
    setTimeout(function(){
        showSequence = false; 
    },1000)
}
function flashButton(color){
    $("#"+color).addClass("pressed");
    makeSound(color);
    setTimeout(function(){
        $("#" + color).removeClass("pressed");
    },300);
}

function makeSound(color){
    var audio = new Audio("./sounds/"+color+".mp3");
    audio.play();
}
function gameOverSound(){
    var audio = new Audio("./sounds/wrong.mp3");
    audio.play();
}
function randomButton(random_number){
    switch(random_number){
        case 1:
            color = "blue";
            break;
        case 2:
             color = "green";
             break;
        case 3:
            color = "red";
            break;
        case 4:
            color = "yellow";
            break;
    }
    return color;
}

function handleClicks(color){
    flashButton(color);
    inputSequence.push(color);
    if (inputSequence[inputSequence.length - 1] !== computerSequence[inputSequence.length - 1]){
            gameOver();
            return;
    }
   
    if(computerSequence.length === inputSequence.length){
        setTimeout(function(){
            nextRound()
        },1000);
    }
}
function gameOver(){
    gameOverSound();
    is_playing = false;
    showSequence = false; 
    setTimeout(function(){
        $("h1").html("Press A Key to Start");
    },3000);
    $("h1").html("Game Over!");
}

