//Initialising variables

var highscoresList = document.querySelector("#HSlist");
var highScoreArray = JSON.parse(localStorage.getItem("highScoreArray")) || [];
var clearBth = document.getElementById("clearBtn");

var addUser = JSON.parse(localStorage.getItem("newHighScoreAdded"));

init();


if (addUser) {
    saveArray(addUser);
    listItem();
    console.log("new user is " + addUser.userName);
    localStorage.removeItem("newHighScoreAdded");
} else {
    listItem();
}

//Adds new score to local storage and pushes it to the highScoreArray
function saveArray(scoreEntry) {
    highScoreArray.push(scoreEntry);
    highScoreArray.sort(function (a, b) { return b.newScore - a.newScore });
    console.log(highScoreArray);
    localStorage.setItem("highScoreArray", JSON.stringify(highScoreArray));
}

//Displays high scores on the scores.html page
function listItem() {
    for (i = 0; i < highScoreArray.length; i++) {
        var newlistItem = document.createElement("li");
        newlistItem.appendChild(document.createTextNode(`${highScoreArray[i].userName} - ${highScoreArray[i].newScore}`));
        highscoresList.appendChild(newlistItem);
    }
}

//Clears local storage and resets high scores
function init() {
    clearBth.addEventListener("click", function (e) {
        localStorage.clear();
        highScoreArray = [];
        highscoresList.textContent = "";
    });

}






