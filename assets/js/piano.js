$(document).ready(function() {

    // Initialise the score and high score variables
    var score = 0;
    var highScore = 0;

    // Function that will play score + 1 numbers of notes
    function playNotes(score) {

    }

    // Reset the high score
    if (highScore < score) {
        highScore = score;
    }

    // Show the score and high score on the page
    $("#score").text(score);
    $("#high-score").text(highScore);
})