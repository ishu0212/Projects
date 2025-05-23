var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function (){
  if(!started){
    $("#level-title").text("Level "+ level);
    setTimeout(function (){
      nextSequence();
    }, 1000);
    started = true;
  }
})

$(".btn").click(function (){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  animatePress(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userClickedPattern.length-1)
});
  

function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColors = buttonColors[randomNumber];
  gamePattern.push(randomChosenColors);

  $("#"+randomChosenColors).fadeOut(100).fadeIn(100);

  playSound(randomChosenColors);
}

function playSound(name){
  var audio = new Audio("./sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function () {$("#"+currentColor).removeClass("pressed")},100);
}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
    console.log("success");
    if(gamePattern.length == userClickedPattern.length){
      setTimeout(function (){
        nextSequence();
      }, 1000);
    }
  } else{
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function (){
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  } 
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}