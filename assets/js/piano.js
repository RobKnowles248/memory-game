$(document).ready(function() {

    // Initialise the score and high score variables
    var score = 0;
    var highScore = 0;

    // Make a constant array with the names of the notes
    const notes = ["c", "cs", "d", "ds", "e", "f", "fs", "g", "gs", "a", "as", "b"];

    // Function that will play a note when given the name of that note
    function playNote(note) {

        //Check if the input is a string
        if (typeof(note) != "string") {
            console.log("playNote didn't receive a string");
        }
        
        //First check if it is a white or black note
        if (note.length == 1) {
            $(`#${note}`).addClass("active-white");
            setTimeout(function() {
                $(`#${note}`).removeClass("active-white");
            }, 500);
        } else if (note.length == 2) {
            $(`#${note}`).addClass("active-black");
            setTimeout(function() {
                $(`#${note}`).removeClass("active-black");
            }, 500);
        };

        //Play the sound of that note
    }

    // Function that will play score + 1 numbers of notes
    function playNotes(score) {
        for (var i = 0; i < score; i++) {
            //Need to randomize a note here to give a random note
            playNote(note);
            // Now need to append an array that keeps track of which notes were played
        }
    }

    // Reset the scores on index.html
    function resetScores() {

        //Reset the high score
        if (highScore < score) {
            highScore = score;
        };

        //Shows the score and high score on index.html
        $("#score").text(score);
        $("#high-score").text(highScore);
    }

    //Call the playNote function when a note is clicked
    $(".key").click(function() {
        let keyValue = $(this).attr("id");
        playNote(keyValue);
    })

    //Call the resetScores function
    resetScores();
})