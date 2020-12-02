$(document).ready(function() {

    // Initialise the score and high score variables
    var currentScore = 0;
    var highScore = 0;

    // Make a constant array with the names of the notes
    const pianoNotes = ["c", "cs", "d", "ds", "e", "f", "fs", "g", "gs", "a", "as", "b"];

    // Initialise the notes clicked array
    var notesClicked = [];

    // Initialise the notes played array
    var notesPlayed = [];

    // Function that toggles the submit button enabled or disabled
    function toggleSubmitButton() {
        $("#submit-button").toggleClass("disabled-button");
        if ($("#submit-button").attr("disabled")) {
            $("#submit-button").removeAttr("disabled");
        } else {
            $("#submit-button").attr("disabled", "disabled");
        }
    }

    // Function that checks if a note is white or black and gives a class accordingly
    function whiteOrBlackNote(note) {

        if (note.length == 1) {
            return "white";
        } else if (note.length == 2) {
            return "black";
        } else {
            alert("Error: neither black nor white note");
            return;
        }
    }

    // Function that will play a note when given the name of that note
    function playNote(note) {

        //Check if the input is a string
        if (typeof(note) != "string") {
            console.log("The function playNote didn't receive a string");
            return;
        }

        //Highlight note for 0.5s
        let colour = whiteOrBlackNote(note);
        $(`#${note}`).addClass(`active-${colour}`);
        let timeOut = setTimeout(function() {
                $(`#${note}`).removeClass(`active-${colour}`);
                clearTimeout(timeOut);
            }, 500);
        
        //Play the sound of that note
        $(`audio#${note}-audio`)[0].play();
    }

    // Function that will play (score + 1) numbers of notes. It will return an array of the notes played.
    function playNotes(score) {
        notesClicked = [];
        notesPlayed = [];
        for (let i = 0; i <= score; i++) {
            let randomNote = pianoNotes[Math.floor(Math.random() * pianoNotes.length)];
            console.log(randomNote);
            playNote(randomNote);
            notesPlayed.push(randomNote);
        };
        console.log(notesPlayed);
        toggleSubmitButton();
    }

    // Function that checks if the notesPlayed and notesClicked arrays match
    function doNotesMatchUp(firstNotes, secondNotes) {
        console.log(JSON.stringify(firstNotes));
        console.log(JSON.stringify(secondNotes));
        return JSON.stringify(firstNotes) == JSON.stringify(secondNotes);
    }

    // Reset the scores on index.html
    function resetScores() {

        //Reset the high score
        if (highScore < currentScore) {
            highScore = currentScore;
        };

        //Shows the score and high score on index.html
        $("#score").text(currentScore);
        $("#high-score").text(highScore);
    }

    //Call the playNote function when a note is clicked
    $(".key").click(function() {
        playNote($(this).attr("id"));
        notesClicked.push($(this).attr("id"));
    });

    
    //Start the game when restart game is clicked
    $("#restart-button").click(function() {
        $("#restart-button").text("Restart Game"); //Changes the button to say Restart game rather than start game
        currentScore = 0;
        resetScores();
        if (!$("#submit-button").attr("disabled")) {
            toggleSubmitButton();
        }
        playNotes(currentScore); //Starts the game
    })

    //Checks the scores when the submit button is clicked
    $("#submit-button").click(function() {
        //Checks if the submit button is disabled
        if ($("#submit-button").attr("disabled")) {
            return;
        };

        console.log(notesClicked);
        console.log(notesPlayed);

        // Check if the user clicked the correct keys
        let matched = doNotesMatchUp(notesClicked, notesPlayed);
        console.log(matched);
        if (matched) {
            toggleSubmitButton();
            notesPlayed = [];
            notesClicked = [];
            currentScore += 1;
            resetScores();
            playNotes(currentScore);
        } else {
            console.log("Game Over");
        }
    })

    //Call the resetScores function
    resetScores();
})