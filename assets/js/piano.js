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
            console.log("The function playNote didn't receive a string");
        }
        
        //Highlight a white note for 0.5s
        if (note.length == 1) {
            $(`#${note}`).addClass("active-white");
            setTimeout(function() {
                $(`#${note}`).removeClass("active-white");
            }, 500);
        
        //Hihglight a black note for 0.5s
        } else if (note.length == 2) {
            $(`#${note}`).addClass("active-black");
            setTimeout(function() {
                $(`#${note}`).removeClass("active-black");
            }, 500);

        //Log that the note string was the wrong length    
        } else {
            console.log("The string inputted to playNote was the wrong length");
        }

        //Play the sound of that note
        $(`audio#${note}-audio`)[0].play();
    }

    // Function that will play score + 1 numbers of notes
    function playNotes(score) {
        for (let i = 0; i < score; i++) {
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