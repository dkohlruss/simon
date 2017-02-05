'use strict';

var Game = (function() {
    var gameArray = [];
    var userArray = [];
    var counter = 0; // Counter for moveLoop
    var totalMoves = 0; // Counter for user Input
    var round = 1 ;
    var timeouts = []; // Array of all timeouts

    // Get elements
    var red = document.querySelector('#red');
    var green = document.querySelector('#green');
    var blue = document.querySelector('#blue');
    var yellow = document.querySelector('#yellow');
    var buttons = document.querySelectorAll('.btn');
    var strict = document.querySelector('#strict');
    var reset = document.querySelector('#reset');
    var display = document.querySelector('#counter');
    var strictLight = document.querySelector('#strict-light');
    var strictMode = false;

    // Handle audio
    var audioArray = [new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
        new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
        new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
        new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'),
        new Audio('http://www.pacdv.com/sounds/mechanical_sound_effects/spring_2.wav'),
        new Audio('http://www.pacdv.com/sounds/applause-sounds/app-20.mp3')];
    // Sets ListenEvents for buttons
    setButtonListeners(); // only does this once

    function getArray(arr) {
        return arr;
    }

    function getMoves(bool) {  // Newgame function
        if (bool === true) {
            setRound();
            setGameArray();
            setNewGame();
        } else {
            setNewGame();
        }

        moveLoopButtonDown();
    }

    function getNumbersForButtons(value) { // For converting the div IDs into numerical values to be stored in array
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i] === value) {
                return i;
            }
        }
    }

    function moveLoopButtonDown() {
        var buttondown = setTimeout(function() {
            renderLight(buttons[gameArray[counter]]);
            moveLoopButtonUp(buttons[gameArray[counter]]);
            counter++;
            if (counter < round) {
                moveLoopButtonDown();
            } else {
                setPointerEvent(true);
                counter = 0;
            }
        }, 1000);
        timeouts.push(buttondown);
    }

    function moveLoopButtonUp(color) {
        var buttonup = setTimeout(function() {
            renderLightOff(color);
        },300);
        timeouts.push(buttonup);
    }

    function checkAccuracy() {
        // Compare all values of userArray with gameArray
        // Has to match start of array and each value must match and userArray must be < gameArray
        if (userArray[totalMoves] === gameArray[totalMoves] && userArray.length <= gameArray.slice(0,round).length) {
            // Successful button press
            totalMoves++;
            if (userArray.length === round) {
                totalMoves = 0;
                round++;
                if (round === 21) { // User has won -- reset game
                    audioArray[5].play();
                    setTimeout(function() {
                        getMoves(true);
                    }, 10000);
                }
                setPointerEvent(false); // End of round -- Start next round
                setTimeout(function() {
                    getMoves(false);
                }, 1500);
            }
        } else {
            // Failure
            setTimeout(function() {
                audioArray[4].play();
            }, 500);
            setPointerEvent(false);
            counter = 0;
            setTimeout(function() {
                if (!strictMode) { // If not in strict mode, does not generate a new array & restart
                    getMoves(false);
                } else {
                    getMoves(true);
                }

            }, 1500);
        }
    }

    // Listeners for all buttons
    function setButtonListeners() {
        buttons.forEach(function(button) {
            button.addEventListener('mousedown',function() {
                renderLight(button);
                userArray.push(getNumbersForButtons(button));
            });
            button.addEventListener('mouseup',function() {
                renderLightOff(button);
                checkAccuracy();
            });
        });

        reset.addEventListener('click', function() {
            var i = 0;
            while (timeouts.length > 0) { // Clears all timeouts for button presses
                window.clearTimeout(timeouts[i]);
                timeouts.shift();
            }
                getMoves(true);
        });

        strict.addEventListener('click', function() {
            if (!strictMode) {
                strictMode = true;
                strictLight.style.background = 'red';
            } else {
                strictMode = false;
                strictLight.style.background = "#2D2D2D";
            }
        });

        setPointerEvent(false); // Turns off pointer events until game starts
    }

    function setPointerEvent(bool) {
        if (bool === true) {
            buttons.forEach(function(button) {
               button.style.pointerEvents = 'auto';
            });
        } else {
            buttons.forEach(function(button) {
                button.style.pointerEvents = 'none';
            });
        }
    }

    function setNewGame() {
        userArray.length = 0;
        counter = 0; // Counter for moveLoop
        totalMoves = 0; // Counter for user Input
        display.innerHTML = round;
    }

    function setGameArray() {
        gameArray.length = 0;
        var num;
        for (var i = 0; i < 20; i++) {
            num = Math.floor(Math.random() * 4);
            gameArray.push(num);
        }
    }

    function setRound() {
        round = 1;
    }

    function renderLight(color) {
        switch(color) {
            case (green):
                color.style.background = 'palegreen';
                audioArray[3].play();
                break;
            case (red):
                color.style.background = 'pink';
                audioArray[0].play();
                break;
            case (yellow):
                color.style.background = 'greenyellow';
                audioArray[2].play();
                break;
            case (blue):
                color.style.background = 'lightblue';
                audioArray[1].play();
                break;
        }
    }

    function renderLightOff(color) {
        switch(color) {
            case (red):
                color.style.background = 'red';
                break;
            case (blue):
                color.style.background = 'blue';
                break;
            case (yellow):
                color.style.background = 'yellow';
                break;
            case (green):
                color.style.background = 'green';
                break;
        }
    }

    return {
        gameArray: gameArray, // remove
        userArray: userArray, // remove
        setGameArray: setGameArray, // remove
        getArray: getArray,
        getMoves: getMoves // remove
    };
})();

