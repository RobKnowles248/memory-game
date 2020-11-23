$(document).ready(function() {

    // Initialise the score and high score variables
    var score = 0;
    var highScore = 0;

    // Make a constant array with the names of the notes
    const notes = ["c", "c#", "d", "d#", "e", "f", "f#", "g", "g#", "a", "a#", "b"];

    // Function that will play a note when given the name of that note
    function playNote(note) {
        switch (note) {
            case "c": break;
            case "c#": break;
            case "d": break;
            case "d#": break;
            case "e": break;
            case "f": break;
            case "f#": break;
            case "g": break;
            case "g#": break;
            case "a": break;
            case "a#": break;
            case "b": break;
        }
    }

    // Function that will play score + 1 numbers of notes
    function playNotes(score) {
        for (var i = 0; i < score; i++) {
            //Need to randomize a note here to give a random note
            playNote(note);
            // Now need to append an array that keeps track of which notes were played
        }
    }

    // Reset the high score
    if (highScore < score) {
        highScore = score;
    }

    // Show the score and high score on the page
    $("#score").text(score);
    $("#high-score").text(highScore);
})