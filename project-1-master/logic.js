console.log('connected');
jQuery(function(){
  // My landing page stuff
  var $playerName = window.location.href.split('=')[1];
  // Someone can basically edit the URL, hit enter, and make their name anything. So the form from the landing
  // really only serves to edit the URL for the user, interesting. Thanks for the resources guys!
  // But really thanks to Bilal for telling me how easy it is, lol.

  // I got the game sounds from here https://www.freecodecamp.com/challenges/build-a-simon-game
  var sound1 = new Audio('simonSound1.mp3');
  var sound2 = new Audio('simonSound2.mp3');
  var sound3 = new Audio('simonSound3.mp3');
  var sound4 = new Audio('simonSound4.mp3');

  //my selectors
  var $butts = $('.button');
  var $redButt = $('.red');
  var $greenButt = $('.green');
  var $yellowButt = $('.yellow');
  var $blueButt = $('.blue');
  var buttonSelect = [$redButt, $greenButt, $yellowButt, $blueButt];
  var $score = $('.score');

  // The computer absolutely needs memory for which color pattern it created. Players' for comparison
  var cpuColor = [];    // cpuGoes() fills this on its own.
  var playerColor = []; // it'll be assigned an empty array in playerGoes();

  // Score counter, also helps in deciding who's turn it is
  var score = -1;
  var pClick = -1; // inside of the player's turn function, so it's redefined every invocation

  // This following block is the step by step to choose any color.
  var randomToThree = function(){
    var num = Math.floor(Math.random()*4);
    return num;
  }

  //I need functions that turn on the light, and turn it back off after a SET TIME.
  var lightUpRed = function(){
    buttonSelect[0].addClass('redbg');
    sound1.play();
    window.setTimeout(function(){
      buttonSelect[0].removeClass('redbg');
     }, 1000);
  }

  var lightUpGreen = function(){
    buttonSelect[1].addClass('greenbg');
    sound2.play();
    window.setTimeout(function(){
      buttonSelect[1].removeClass('greenbg');
     }, 1000);
  }

  var lightUpYellow = function(){
    buttonSelect[2].addClass('yellowbg');
    sound3.play();
    window.setTimeout(function(){
      buttonSelect[2].removeClass('yellowbg');
     }, 1000);
  }

  var lightUpBlue = function(){
    buttonSelect[3].addClass('bluebg');
    sound4.play();
    window.setTimeout(function(){
      buttonSelect[3].removeClass('bluebg');
     }, 1000);
  }

  // I can make all things light up and stop! Will be used for the intro
  var allOfTheLights = function(){
    lightUpRed();
    lightUpGreen();
    lightUpYellow();
    lightUpBlue();
  }

  // This temporarily removes clicks. Occurs per click before rebinding, and during cpuGoes
  var unbindR = function(){
    $.each(buttonSelect, function(index, value){
      value.unbind();
    });
  }

  // These are my clickers, for the players. Binds the click events appropriately
  var clickRed = function(){
    buttonSelect[0].click(function(){
      lightUpRed();
      pClick++;
      playerColor.push(0);
      isTurnOver();
    });
  }

  var clickGreen = function(){
    buttonSelect[1].click(function(){
      lightUpGreen();
      pClick++;
      playerColor.push(1);
      isTurnOver();
    });
  }

  var clickYellow = function(){
    buttonSelect[2].click(function(){
      lightUpYellow();
      pClick++;
      playerColor.push(2);
      isTurnOver();
    });
  }

  var clickBlue = function(){
    buttonSelect[3].click(function(){
      lightUpBlue();
      pClick++;
      playerColor.push(3);
      isTurnOver();
    });
  }

  // This plays when you click the wrong color.
  var wrongColor = function(element){
    element.click(function(){
      console.log('game OVER');
      unbindR();
      window.alert('You lose! Your score is '+score+'. Try again?');
      allOfTheLights();
    });
  }

  // Iterates over the cpu's color pattern, checks riN for which color, displays 1 by 1
  var cpuDisplay = function(){
    $.each(cpuColor, function(index, value){
      window.setTimeout(function(){
         if (value === 0){
           lightUpRed();
         } else if (value === 1){
           lightUpGreen();
         } else if (value === 2){
           lightUpYellow();
         } else {
           lightUpBlue();
         }
      }, 1150 + (1300*index));
    });
  }

  // Cpu's turn. Grabs a new random value, adds it to the pattern, displays entire pattern. Player goes next
  var cpuGoes = function(){
    score++;
    $score.text($playerName + "\'s score: " + score);
    var riN = randomToThree();
    cpuColor.push(riN);
    window.setTimeout(function(){
      cpuDisplay();
    }, 334);
    window.setTimeout(function(){
      playerGoes();
    }, 1150 + (1300*cpuColor.length)); // Made sure that you can't click the lights until the cpu finishes going.
  }

  // This binds the correct click only to the correct color. Everything else gets the game over
  var rebindR = function(){
    if (cpuColor[pClick+1] === 0){
      clickRed();
    } else if (cpuColor[pClick+1] === 1){
      clickGreen();
    } else if (cpuColor[pClick+1] === 2){
      clickYellow();
    } else if (cpuColor[pClick+1] === 3){
      clickBlue();
    }
    $.each(buttonSelect, function(index, value){
      if (cpuColor[pClick+1] === index){
      } else {
        wrongColor(value);
      }
    });
  }

  // This checks if the player's turn is over, so that the cpu goes after the last click. Otherwise, next color
  var isTurnOver = function(){
    unbindR();
    if (playerColor.length === cpuColor.length){
      cpuGoes();
    } else {
      rebindR();
    }
  }

  // resets the player's pattern array, and the index counter.
  var playerGoes = function(){
    playerColor = [];
    pClick = -1;
    rebindR();
  }


  // LET'S PLAY!
  allOfTheLights();
  cpuGoes();
}); // JQ ends here, personal thoughts and planning begins here



/////////////////////////
// NEXT MVP /////////////
/////////////////////////

// Game Over: needs an alert, make sure it displays the player's name and score
// and confirms if you want to play again, to bring you to the index.

/////////////////////////
// FEATURES /////////////
/////////////////////////

// MAKING MY COLORS MOVE FASTER
// I have a set timeout for the display, and a multiplier for iterating over the CPU's colors.
// first set time out
// var lightSpeed = 1000;
// var multiplier = lightSpeed + 334
// line 132, do multiplier /*(20 frames)*/ + (multiplier*index)

// when cpuGoes();, give another function called checkLevel().
// checkLevel is going to run through if statements, asking for the score. If the score is above 10,
// redefine lightSpeed global variable to a lower value.
// do if (above 13), else if (above 26), and an else for a max speed.

// EVERY 20 POINTS, DISPLAY AN INSTRUCTORS FACE, GET IMAGES FROM SLACK
// TOGETHER, THE HIGHEST SCORE GETS TIM'S :GOD: EMOJI FROM SLACK


