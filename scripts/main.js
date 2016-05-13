function playGame() {
    $(".menuItem").fadeOut(2000);
    $(".gamePage").fadeIn(2000);
    document.getElementById("gameID").style.display = "inline-block";
    document.getElementById("player1score").innerHTML = "Player1 Points: " + player1Score.toString();
    document.getElementById("player2score").innerHTML = "Player2 Points: " + player2Score.toString();
}

/*
function distributeWords() {
    for (var i = 0; i < 20; i++) {
        current
    }

    for (var i = 0; i < 20; i++) {
        var currentSet = randomValidNumber();

        if (currentSetSquare[0] == 1) {
            currentWordDataLvl1[currentSetSquare[1] - 1] = wordDataLvl1[currentSet - 1];
            currentQuestionDataLvl1[currentSetSquare[1] - 1] = questionDataLvl1[currentSet - 1];
        } else if (currentSetSquare[0] == 2) {
            currentWordDataLvl2[currentSetSquare[1] - 1] = wordDataLvl2[currentSet - 1];
            currentQuestionDataLvl2[currentSetSquare[1] - 1] = questionDataLvl2[currentSet - 1];
        } else if (currentSetSquare[0] == 3) {
            currentWordDataLvl3[currentSetSquare[1] - 1] = wordDataLvl3[currentSet - 1];
            currentQuestionDataLvl3[currentSetSquare[1] - 1] = questionDataLvl3[currentSet - 1];
        } else if (currentSetSquare[0] == 4) {
            currentWordDataLvl4[currentSetSquare[1] - 1] = wordDataLvl4[currentSet - 1];
            currentQuestionDataLvl4[currentSetSquare[1] - 1] = questionDataLvl4[currentSet - 1];
        } else if (currentSetSquare[0] == 5) {
            currentWordDataLvl5[currentSetSquare[1] - 1] = wordDataLvl5[currentSet - 1];
            currentQuestionDataLvl5[currentSetSquare[1] - 1] = questionDataLvl5[currentSet - 1];
        }

        if (currentSetSquare[1] == 4) {
            currentSetSquare[1] = 1;
            currentSetSquare[0]++;
            currentAvailibleSquares = [1, 2, 3, 4];
            currentUnavailibleSquares = [];
        } else {
            currentSetSquare[1]++;
        }
    }

    var randomSpace = Math.floor(Math.random() * 5);
    var randomSquare = Math.floor(Math.random() * 4);
    randomSpace++;
    randomSquare++;
    gameSquarePressed(randomSpace, randomSquare);
}

*/

var LEFTKEY = 37, UPKEY = 38, RIGHTKEY = 39, DOWNKEY = 40, chooseturn = "jsdflksajfld", player1turn = "jsdfksldf", player2turn = "sdflkjsdfsj";
var keystate = [];

document.addEventListener("keydown", function (e) {
    keystate[e.keyCode] = true;
    checkKeys();
});

document.addEventListener("keydown", function (e) {
    delete keystate[e.keyCode];
    checkKeys();
});

var currentState = chooseturn;

function checkKeys() {
    if (keystate[LEFTKEY]) {
        currentState = player1turn;
    }
    if (keystate[RIGHTKEY]) {
        currentState = player2turn;
    }
    checkState();
}

function checkState() {
    if (currentState == player1turn) {
        document.getElementById("turn").innerHTML = "It is Player 1's turn.";
    } else if (currentState == player2turn) {
        document.getElementById("turn").innerHTML = "It is Player 2's turn.";
    } else if (currentState == chooseturn) {
        document.getElementById("turn").innerText = "Waiting...";
    }
}

function randomValidNumber() {
    for (var i = 0; i < currentAvailibleSquares.length; i++) {
        if (currentAvailibleSquares[i] == null) {
            currentUnavailibleSquares.push(i + 1);
        }
    }
    var randomNumber = checkValidNo();
    return randomNumber;
}

function checkValidNo() {
    var randomnumber = Math.floor(Math.random() * 4);
    randomnumber++;
    var proper = true;
    for (var i = 0; i < currentUnavailibleSquares.length; i++) {
        if (currentUnavailibleSquares[i] == randomnumber) {
            proper = false;
        }
    }
    if (proper == true) {
        return randomnumber;
    } else {
        return checkValidNo;
    }
}

function gameSquarePressed(spaceNo, number) {
    currentPointsForGrabs = spaceNo * 100;
    var id = spaceNo + "b" + number;
    document.getElementById(id).style.color = "red";
    document.getElementById(id).href = "#";
    var question;
    var answer;
    if (spaceNo == 1) {
        question = currentQuestionDataLvl1[number - 1];
        answer = currentWordDataLvl1[number - 1];
    } else if (spaceNo == 2) {
        question = currentQuestionDataLvl2[number - 1];
        answer = currentWordDataLvl2[number - 1];
    } else if (spaceNo == 3) {
        question = currentQuestionDataLvl3[number - 1];
        answer = currentWordDataLvl3[number - 1];
    } else if (spaceNo == 4) {
        question = currentQuestionDataLvl4[number - 1];
        answer = currentWordDataLvl4[number - 1];
    } else if (spaceNo == 5) {
        question = currentQuestionDataLvl5[number - 1];
        answer = currentWordDataLvl5[number - 1];
    }
    currentAnswer = answer;
    document.getElementById("question").innerHTML = "Question: Write the whole word for " + question + " below.";
}

function submitAnswer() {
    var userInput = document.getElementById("answerEnter").value;
	document.getElementById("answerEnter").value = "";
    if (userInput == currentAnswer) {
        if (currentState == player1turn) {
            player1Score = player1Score + currentPointsForGrabs;
        }
        if (currentState == player2turn) {
            player2Score = player2Score + currentPointsForGrabs;
        }
    }
    if (player2Score > 1000) {
        alert("Player 2 Wins!");
    }
    if (player1Score > 1000) {
        alert("Player 1 Wins!")
    }
    document.getElementById("player1score").innerHTML = "Player1 Points: " + player1Score.toString();
    document.getElementById("player2score").innerHTML = "Player2 Points: " + player2Score.toString();
    currentState = chooseturn;
    document.getElementById("question").innerHTML = "Choose a square";
    checkState();
}

var player1Score = 0;
var player2Score = 0;
var currentAnswer;
var currentSetSquare = [1, 1];
var currentUnavailibleSquares = [];
var currentAvailibleSquares = [1, 2, 3, 4];
var currentPointsForGrabs;

function instructions() {
    $(".menu").fadeOut(2000, instructions2());
}

function instructions2() {
    $(".instructions").fadeIn(2000);
}

function backMenu() {
    $(".menu").fadeIn(2000);
    $(".instructions").fadeOut(2000);
}

var wordDataLvl1 = ["irate", "coordinate", "ordain", "orderly"];
var questionDataLvl1 = ["ir__e", "coord___te", "or__in", "ord__ly"];
var wordDataLvl2 = ["flagrant", "lucrative", "disorder", "inordinate"];
var questionDataLvl2 = ["fla____t", "l____tive", "___order", "i____inate"];
var wordDataLvl3 = ["uncordinated", "subordinate", "treacherous", "refrigerator"];
var questionDataLvl3 = ["unco____ated", "___ordinate", "treacherous", "refrigerator"];
var wordDataLvl4 = ["taciturn", "scrupulous", "imminent", "congratulations"];
var questionDataLvl4 = ["taci____", "scrup____s", "im____nt", "_______ulations"];
var wordDataLvl5 = ["nominal", "insubordinate", "ordinal", "ordinance"];
var questionDataLvl5 = ["no___al", "_____ordinate", "or___al", "_____ance"];

var currentWordDataLvl1 = ["irate", "coordinate", "ordain", "orderly"];
var currentQuestionDataLvl1 = ["ir__e", "coord___te", "or__in", "ord__ly"];
var currentWordDataLvl2 = ["flagrant", "lucrative", "disorder", "inordinate"];
var currentQuestionDataLvl2 = ["fla____t", "l____tive", "___order", "i____inate"];
var currentWordDataLvl3 = ["uncordinated", "subordinate", "treacherous", "refrigerator"];
var currentQuestionDataLvl3 = ["unco____ated", "___ordinate", "trea____ous", "re____erator"];
var currentWordDataLvl4 = ["taciturn", "scrupulous", "imminent", "congratulations"];
var currentQuestionDataLvl4 = ["taci____", "scrup____s", "im____nt", "_______ulations"];
var currentWordDataLvl5 = ["nominal", "insubordinate", "ordinal", "ordinance"];
var currentQuestionDataLvl5 = ["no___al", "_____ordinate", "or___al", "_____ance"];
