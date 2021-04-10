var buttonColors = ['green', 'red', 'yellow', 'blue'];  //step 2
var gamePattern = []; //step 2
var userClickedPattern = []; //step 4
var started = false;  //step 7
var level = 0;  //step 7

//button

$(".btn").on('click', function(){  // step 4
  var userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playSound(userChosenColour);  //step 5
  animationPress(userChosenColour); //step 6
  checkAnswer(userClickedPattern.length-1);  //step 8
});

//keydown

$(document).on('keydown', function(){  //step 7
  if(!started){
    $('#level-title').text('level: '+level);
    nextSequence();
    started = true;
  }
});

$('.butn').on('click', function(){  //step 7
  if(!started){
    $('#level-title').text('level: '+level);
    nextSequence();
    started = true;
  }
});



function nextSequence(){

  userClickedPattern = [];  //step 8

  level++;  //step 7

  $('#level-title').text('level '+level); //step 7

  var randomNumber = Math.floor(Math.random()*4);  //step 2

  var randomChosenColour = buttonColors[randomNumber]; //step 2

  gamePattern.push(randomChosenColour); //step 2

  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); // step 3

  playSound(randomChosenColour);  // step 5
}


function playSound(name){ // step 5
  var audio = new Audio('sounds/'+name+'.mp3');
  audio.play();
}


function animationPress(currentColour){  //step 6
  $('#'+currentColour).addClass('pressed');
  setTimeout(function(){
    $('#'+currentColour).removeClass('pressed');
  }, 100);
}


function checkAnswer(currentLevel){  //step 8
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");
    if (gamePattern.length === userClickedPattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }
  else{
    playSound('wrong');
    $('body').addClass('gameOver');
    setTimeout(function(){
      $('body').removeClass('gameOver');
    }, 200);
    $('#level-title').text('Game Over, Press any key to Restart.!');
    startOver();
  }
}


function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
