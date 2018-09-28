// Two Player Game Script for Ultimate Tic Tac Toe Game

// Create array of all mini-boards
let big_grid = [];

// Create nine mini-board arrays of all boxes
for(let i = 0; i < 10; i++) {
    big_grid[i] = [];
}

// Boolean for deciding whose turn it is
var x_turn = true;

// Called any time a clickable square is clicked
function clicked(square){

    if(x_turn) {

        // Update array with X claiming corresponding space
        big_grid[square[1]][square[4]] = "X";

        // Show X on html table in corresponding space
        document.getElementById(square).value = "X";

        // Display whose turn it is now
        document.getElementById("notification").value = "O's Turn";
    }
    else {

        // Update array with O claiming corresponding space
        big_grid[square[1]][square[4]] = "O";

        // Show O on html table in corresponding space
        document.getElementById(square).value = "O";

        // Displayy whose turn it is now
        document.getElementById("notification").value = "X's Turn";
    }

    // Assign easier variable for which game grid was just played in
    let grid = square[1];

    // Check if X won this subgrid
    if (win(grid) == "X"){

        // Update winner grid to store that X won this subgrid
        big_grid[9][grid] = "X";

        // Disable all buttons in this grid to bring it out of play, and mark it as claimed by X
        for (let i = 0; i < 9; i++){
            document.getElementById('[' + grid + '][' + i + ']').disabled = true;
            if (i % 2 == 0){
                document.getElementById('[' + grid + '][' + i + ']').style = "background-color:OrangeRed";
            }
            else{
                document.getElementById('[' + grid + '][' + i + ']').style = "background:transparent; border:none;";
            }
        }
    }

    // Check if O won this subgrid
    else if (win(grid) == "O"){

        // Update winner grid to store that O won this subgrid
        big_grid[9][grid] = "O";

        // Disable all buttons in this grid to bring it out of play, and mark it as claimed by O
        for (let i = 0; i < 9; i++){
            document.getElementById('[' + grid + '][' + i + ']').disabled = true;
            if(i != 4){
                document.getElementById('[' + grid + '][' + i + ']').style = "background-color:MediumSeaGreen";
            }
            else{
                document.getElementById('[' + grid + '][' + i + ']').style = "background:transparent; border:none;";
            }
        }
    }

    // Shift focus of play to relevant grid(s)
    shift_focus(square);

    // Check winner table to see if overall game has been won
    let winner = win(9);
    if (winner != null){

        // Displays winner
        document.getElementById("notification").value = winner + " Wins!!";

        // Disables all buttons upon end of game
        // Loop to disable and color white all squares unless their grid has been won
        for (let i = 0; i < 9; i++) {

            // Checks if grid has not been won
            if (big_grid[9][i] == null){

                for(let j = 0; j < 9; j++) {
                    document.getElementById('[' + i + '][' + j + ']').disabled = true;
                    document.getElementById('[' + i + '][' + j + ']').style = "background:transparent; border:none;";
                }
            }
        }
    }

    // Switch whose turn it is
    x_turn = !x_turn;
}

// Shifts focus of game to relevant, legal grid(s)
function shift_focus(square) {

    // Set variables for grid to shift focus to and boolean for whether that grid is filled
    let grid = square[4];
    let filled = true;

    // Check if grid to send to is already full
    for (let i = 0; i < 9; i++){
        if (big_grid[grid][i] == null){
            filled = false;
        }
    }

    // Loop to disable and color white all squares unless their grid has been won
    for (let i = 0; i < 9; i++) {

        // Checks if grid has not been won
        if (big_grid[9][i] == null){

            for(let j = 0; j < 9; j++) {
                document.getElementById('[' + i + '][' + j + ']').disabled = true;
                document.getElementById('[' + i + '][' + j + ']').style = "background:transparent; border:none;";
            }
        }
    }

    // Covers case that the grid being sent to has not been won or filled yet
    if (big_grid[9][grid] == null && !filled) {

        // Loop to enable and color yellow all valid squares
        for (let i = 0; i < 9; i++) {

            // Checks to make sure grid space doesn't already have a letter in it
            if (big_grid[grid][i] == null) {
                document.getElementById('[' + grid + '][' + i + ']').disabled = false;
                document.getElementById('[' + grid + '][' + i + ']').style = "background-color:PaleGoldenRod";
            }
        }
    }

    // Covers case that the grid being sent to has already been won or is full
    else {

        // Iterates through each grid
        for (let i = 0; i < 9; i++){

            // Checks if grid has not been won
            if (big_grid[9][i] == null){

                // Iterates through each square in a mini-grid
                for (let j = 0; j < 9; j++){

                    // Checks that grid space has not already been claimed
                    if (big_grid[i][j] == null){
                        document.getElementById('[' + i + '][' + j + ']').disabled = false;
                        document.getElementById('[' + i + '][' + j + ']').style = "background-color:PaleGoldenRod";
                    }
                }
            }
        }
    }
}

// Returns player who won grid
function win(grid) {
    let check_var = "O";
    if (x_turn){
        check_var = "X";
    }
    // Checks for all possible combinations that would constitute "three in a row"
    if (((big_grid[grid][0] == big_grid[grid][1]) && (big_grid[grid][1] == big_grid[grid][2]) && (big_grid[grid][2] == check_var)) ||
        ((big_grid[grid][3] == big_grid[grid][4]) && (big_grid[grid][4] == big_grid[grid][5]) && (big_grid[grid][5] == check_var)) ||
        ((big_grid[grid][6] == big_grid[grid][7]) && (big_grid[grid][7] == big_grid[grid][8]) && (big_grid[grid][8] == check_var)) ||
        ((big_grid[grid][0] == big_grid[grid][3]) && (big_grid[grid][3] == big_grid[grid][6]) && (big_grid[grid][6] == check_var)) ||
        ((big_grid[grid][1] == big_grid[grid][4]) && (big_grid[grid][4] == big_grid[grid][7]) && (big_grid[grid][7] == check_var)) ||
        ((big_grid[grid][2] == big_grid[grid][5]) && (big_grid[grid][5] == big_grid[grid][8]) && (big_grid[grid][8] == check_var)) ||
        ((big_grid[grid][0] == big_grid[grid][4]) && (big_grid[grid][4] == big_grid[grid][8]) && (big_grid[grid][8] == check_var)) ||
        ((big_grid[grid][2] == big_grid[grid][4]) && (big_grid[grid][4] == big_grid[grid][6]) && (big_grid[grid][6] == check_var))){
            return check_var;
        }
    else return null;
}