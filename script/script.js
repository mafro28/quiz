//Initialising variables

var answerOne = document.getElementById("answerOne");
var answerTwo = document.getElementById("answerTwo");
var answerThree = document.getElementById("answerThree");
var AnswerFour = document.getElementById("answerFour");
var quizform = document.getElementById("quizform");
var score = 0;
var questionContainer = document.getElementById("questionContainer");
var quizQuestion = document.getElementById("title");
var currentQuestionNumber = 0;
var timeLeft = 60;
var timerInterval = 0;



// Quiz questions and answers stored in objects within an array

var questions = [{
        title: "Who appeared in the post-credits scene of Iron Man to set up the Avengers?",
        choices: [
            "Agent Coulson",
            "Nick Fury",
            "Maria Hill",
            "Captain America"
        ],
        answer: "Nick Fury"
    },
    {
        title: "Which of these Avengers made their debut in Thor?",
        choices: [
            "Black Widow",
            "Captain America",
            "Ant-Man",
            "Hawkeye"
        ],
        answer: "Hawkeye"
    },
    {
        title: "Who was the main villain in Guardians of the Galaxy?",
        choices: [
            "Ronan the Accuser",
            "Adam Warlock",
            "Galactus",
            "Annihilus"
        ],
        answer: "Ronan the Accuser"
    },
    {
        title: "What is the name of the evil organisation that infiltrates S.H.I.E.L.D. in Captain America: The Winter Soldier?",
        choices: [
            "A.I.M.",
            "S.W.O.R.D.",
            "H.A.M.M.E.R.",
            "HYDRA"
        ],
        answer: "HYDRA"
    },
    {
        title: "Which superhero made his cinematic debut in Captain America: Civil War?",
        choices: [
            "Ant-Man",
            "Spider-Man",
            "Falcon",
            "Black Panther"
        ],
        answer: "Black Panther"
    },
    {
        title: "What is the name of T'Challa's sister in Black Panther?",
        choices: [
            "Shuri",
            "Naika",
            "Okoye",
            "Ororo"
        ],
        answer: "Shuri"
    },
    {
        title: "In Black Widow, what is the name of Russia's version of Captain America?",
        choices: [
            "Omega Red",
            "Ursa Major",
            "Crimson Dynamo",
            "Red Guardian"
        ],
        answer: "Red Guardian"
    },
    {
        title: "Which of these villains was NOT in Spider-Man: No Way Home?",
        choices: [
            "Green Goblin",
            "Doctor Octopus",
            "Electro",
            "Scorpion"
        ],
        answer: "Scorpion"
    }
];

//Calls the page to load
init();

// Displays the question and answers
function displayQuestion(questionBlock) {
    quizQuestion.innerText = questionBlock.title;
    answerOne.textContent = questionBlock.choices[0];
    answerTwo.textContent = questionBlock.choices[1];
    answerThree.textContent = questionBlock.choices[2];
    answerFour.textContent = questionBlock.choices[3];

}

// The quiz starts on page load
function init() {
    startQuiz();
    quizform.addEventListener("click", function (e) {
        var buttonClicked = e.target;
        checkAnswer(buttonClicked.innerText);
    });
}

//Start quiz function to display the first question and start timer
function startQuiz() {
    displayQuestion(questions[0]);
    tickTimer();
}

//Validates quiz answers
function checkAnswer(userAnswerText) {
    if (userAnswerText === questions[currentQuestionNumber].answer) {
        score += 5;
    } else {
        timeLeft -= 10;
    }
    showNextQuestion();
}

//Shows the questions until there are none left and ends the quiz
function showNextQuestion() {
    if (currentQuestionNumber === questions.length - 1) {
        endQuiz();
    } else {
        currentQuestionNumber++;
        displayQuestion(questions[currentQuestionNumber]);
    };
}

//End of quiz displays score, prompt to enter initials and saves score to local storage

function endQuiz() {
    quizform.remove();
    quizQuestion.textContent = "Your score is " + score;

    var userInput = document.createElement("p");
    userInput.textContent = "To save your score enter your name";
    userInput.setAttribute("style", "margin-left:50px; font-size: 30px; margin-top: 20px");
    quizQuestion.appendChild(userInput);

    var userInitials = document.createElement("input");
    userInitials.setAttribute("type", "text");
    userInitials.setAttribute("style", "margin-left:50px; width:6rem");
    quizQuestion.appendChild(userInitials);

    var savehighScoreBtn = document.createElement("button");
    savehighScoreBtn.setAttribute("type", "button");
    savehighScoreBtn.setAttribute("style", "background-color: #ea3939; border-radius: 8px; margin-left:20px; padding-left: 15px; padding-right: 15px; color:white; border-color: #ea3939; font-size:30px; font-weight:200");
    savehighScoreBtn.textContent = "Save";
    quizQuestion.appendChild(savehighScoreBtn);
    clearTimer();

    //Alerts user to enter name if they click button without doing so

    savehighScoreBtn.addEventListener("click", function (e) {
        e.preventDefault();
        if (userInitials.value === "") {
            alert("Please enter your name!")
        } else {
            storeScore(userInitials.value, score);
        }

    });

    //Stores username and score to local storage and displays high scores on the scores.html page

    function storeScore(userName, newScore) {
        localStorage.setItem("newHighScoreAdded", JSON.stringify({
            userName,
            newScore
        }));
        window.location.assign("scores.html");
    }
}

// Timer function that alerts user when time runs out and ends the quiz

function tickTimer() {
    document.getElementById("timeRemaining").innerHTML = timeLeft;
    timeLeft--;
    if (timeLeft < 0) {
        alert('You ran out of time, game OVER!');
        window.location.assign("scores.html");
    } else {
        timerInterval = setTimeout(tickTimer, 1000);
    }
};

function clearTimer() {
    clearTimeout(timerInterval);
};