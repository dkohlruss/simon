'use strict';

var Game = (function() {
    var gameArray = [];
    var userArray = [];
    var counter = 0; // Counter for moveLoop
    var totalMoves = 0; // Counter for user Input
    var round = 1 ; // CHANGE THIS TO 1

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

    // Handle audio
    var audioArray = [new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'), new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'), new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'), new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')];

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
        setTimeout(function() {
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
    }

    function moveLoopButtonUp(color) {
        setTimeout(function() {
            renderLightOff(color);
        },300);
    }

    function checkAccuracy() {
        // Compare all values of userArray with gameArray
        // Has to match start of array and each value must match and userArray must be < gameArray
        console.log(userArray);
        console.log(userArray.length);
        console.log(gameArray.slice(0,counter).length);

        if (userArray[totalMoves] === gameArray[totalMoves] && userArray.length <= gameArray.slice(0,round).length) {
            console.log("right");
            // Everything is ok!
           totalMoves++;
        } else {
            // Failure
            // TODO: Add boolean conditioning for strict mode (if strict getMoves true)
            setPointerEvent(false);
            counter = 0;
            console.log('fail');
            setTimeout(function() {
                getMoves(false);
            }, 1000);
        }

        if (userArray.length === round) {
            console.log("WIN THIS ROUND!");
            totalMoves = 0;
            round++;
            setPointerEvent(false);
            setTimeout(function() {
                getMoves(false);
            }, 1000);
        }
    }

    // bool true = turn on, false = turn off
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
            // Code snippit to remove all timeouts from http://stackoverflow.com/questions/8860188/is-there-a-way-to-clear-all-time-outs
            var id = window.setTimeout(function() {}, 0);
            while (id--) {
                window.clearTimeout(id); // will do nothing if no timeout with id is present
            }
            // Code snippit to remove all timeouts from http://stackoverflow.com/questions/8860188/is-there-a-way-to-clear-all-time-outs
            getMoves(true);
        });
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

