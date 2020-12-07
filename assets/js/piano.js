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

    // Initialise the piano locked boolean
    var pianoLocked = false;

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

        //Play the sound of that note
        $(`audio#${note}-audio`)[0].play();

        //Highlight note for 0.5s
        let colour = whiteOrBlackNote(note);
        $(`#${note}`).addClass(`active-${colour}`);
        let timeOut = setTimeout(function() {
                $(`#${note}`).removeClass(`active-${colour}`);
                clearTimeout(timeOut);
            }, 500);
    }

    // Function that will play (score + 1) numbers of notes. It will return an array of the notes played.
    function playNotes(score) {
        pianoLocked = true;
        notesClicked = [];
        notesPlayed = [];
        let noteNumber = 0;
        var interval = setInterval(function() {
            let randomNote = pianoNotes[Math.floor(Math.random() * pianoNotes.length)];
            playNote(randomNote);
            notesPlayed.push(randomNote);
            if (noteNumber >= score) {
                clearInterval(interval);
                pianoLocked = false;
            }
            noteNumber += 1;
        }, 1000);
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
        if (!pianoLocked) {
            playNote($(this).attr("id"));
            notesClicked.push($(this).attr("id"));
        }
    });

    //Function that restarts the game
    function restartGame() {
        currentScore = 0;
        resetScores();
        if (!$("#submit-button").attr("disabled")) {
            toggleSubmitButton();
        }
        playNotes(currentScore); //Starts the game
    }

    $("#start-game").click(function() {
        window.location.href = "game.html";
        restartGame();
    })
    
    //Start the game when restart game is clicked
    $("#restart-button").click(function() {
        restartGame();
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
            toggleSubmitButton();
            $("#gameOverModal").modal("show");
        }
    })

    //Restarts the game and closes the modal when the modal restart button is clicked
    $("#modal-restart-button").click(function() {
        $("#gameOverModal").modal("hide");
        restartGame();
    })

    //Call the resetScores function
    resetScores();
})