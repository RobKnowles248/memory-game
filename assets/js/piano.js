$(document).ready(function() {

    // Initialise the score and high score variables
    var score = 0;
    var highScore = 0;

    // Make a constant array with the names of the notes
    const pianoNotes = ["c", "cs", "d", "ds", "e", "f", "fs", "g", "gs", "a", "as", "b"];

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
        
        //Highlight a black note for 0.5s
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

    // Function that will play (score + 1) numbers of notes. It will return an array of the notes played.
    function playNotes(score) {
        let notesPlayed = [];
        for (let i = 0; i <= score; i++) {
            let randomNote = pianoNotes[Math.floor(Math.random() * pianoNotes.length)];
            console.log(randomNote);
            playNote(randomNote);
            notesPlayed.push(randomNote);
        }
        return notesPlayed;
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
        playNote($(this).attr("id"));
    });

    /*
    //Start the game when restart game is clicked
    $("#restart-button").click(function() {
        score = 0; //Reset the score to 0
        var lost = false; //Declares a variable to keep track of whether the game has been lost yet
        while (lost == false) {
            let playedNotes = playNotes(score);
            //Here want to write a something that checks for the right clicks of buttons
            score += 1
        }
    })
    */

    //Call the resetScores function
    resetScores();
})