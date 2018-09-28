// Single Player Game Script for Ultimate Tic Tac Toe Game

// Create array of all mini-boards
let big_grid = [];

// Create nine mini-board arrays of all boxes
for(let i = 0; i < 10; i++) {
    big_grid[i] = [];

    // Loop through all entries to make all of them 'E' for "Enabled"
    for (let j = 0; j < 9; j++){
        big_grid[i][j] = "E";
    }
}

// Boolean for deciding whose turn it is
let x_turn = true;

// Set default difficulty
let diff = 1;

// Function to be called when "Change Difficulty" button is pressed
function changeDiff(){
    diff = (diff + 1) % 2;
    if (diff == 0){
        document.getElementById("choose_difficulty").value = "Easy Mode";
        document.getElementById("choose_difficulty").style = "background-color:White;text-align:center";
    }
    else if (diff == 1){
        document.getElementById("choose_difficulty").value = "Normal Difficulty";
        document.getElementById("choose_difficulty").style = "background-color:Gainsboro;text-align:center";
    }
}

// Called any time a clickable square is clicked
function clicked(square) {

    // Update array with X claiming corresponding space
    big_grid[square[1]][square[4]] = "X";

    // Show X on html table in corresponding space
    document.getElementById(square).value = "X";

    // Assign easier variable for which game grid was just played in
    let grid = square[1];

    // Check if X won this subgrid
    if (win(grid) == "X"){

        // Update winner grid to store that X won this subgrid
        big_grid[9][grid] = "X";

        // Disable all buttons in this grid to bring it out of play, and mark it as claimed by X
        for (let i = 0; i < 9; i++){
            big_grid[grid][i] = "X"
            document.getElementById('[' + grid + '][' + i + ']').disabled = true;
            if (i % 2 == 0){
                document.getElementById('[' + grid + '][' + i + ']').style = "background-color:OrangeRed";
            }
            else{
                document.getElementById('[' + grid + '][' + i + ']').style = "background:transparent; border:none;";
            }
        }
    }

    // Check winner table to see if overall game has been won
    let winner = win(9);
    if (winner != null){

        // Displays winner
        document.getElementById("notification").value = winner + " Wins!!";

        // Disables all buttons upon end of game
        // Loop to disable and color white all squares unless their grid has been won
        for (let i = 0; i < 9; i++) {
            for(let j = 0; j < 9; j++) {

                // Claims winner array entirely with X's
                big_grid[i][j] = "X";

                // Checks if grid has not been won
                if (big_grid[9][i] == "D" || big_grid[9][i] == "E"){
                        document.getElementById('[' + i + '][' + j + ']').disabled = true;
                        document.getElementById('[' + i + '][' + j + ']').style = "background:transparent; border:none;";
                }
            }
        }
    }

    // Switch turns
    x_turn = false;

    // Shift AI's focus so it knows which spaces it can play in
    shift_focus(square);

    // Compute where next move should be for O
    let chosen_square = ai_move();

    // Check if O won this subgrid
    let chosen_grid = chosen_square[1];
    if (win(chosen_grid) == "O"){

        // Update winner grid to store that O won this subgrid
        big_grid[9][chosen_grid] = "O";

        // Disable all buttons in this grid to bring it out of play, and mark it as claimed by O
        for (let i = 0; i < 9; i++){
            document.getElementById('[' + chosen_grid + '][' + i + ']').disabled = true;
            big_grid[chosen_grid][i] = "O";
            if(i != 4){
                document.getElementById('[' + chosen_grid + '][' + i + ']').style = "background-color:MediumSeaGreen";
            }
            else{
                document.getElementById('[' + chosen_grid + '][' + i + ']').style = "background:transparent; border:none;";
            }
        }
    }

    // Shift focus of play to relevant grid(s)
    shift_focus(chosen_square);

    // Check winner table to see if overall game has been won
    winner = win(9);
    if (winner != null){

        // Displays winner
        document.getElementById("notification").value = winner + " Wins!!";

        // Disables all buttons upon end of game
        // Loop to disable and color white all squares unless their grid has been won
        for (let i = 0; i < 9; i++) {
            for(let j = 0; j < 9; j++) {

                // Claims winner array entirely with X's
                big_grid[i][j] = "X";

                // Checks if grid has not been won
                if (big_grid[9][i] == "D" || big_grid[9][i] == "E"){
                        document.getElementById('[' + i + '][' + j + ']').disabled = true;
                        document.getElementById('[' + i + '][' + j + ']').style = "background:transparent; border:none;";
                }
            }
        }
    }
    else{
        document.getElementById("notification").value = "X's Turn";
    }

    // Switch whose turn it is
    x_turn = true;
}

// Shifts focus of game to relevant, legal grid(s)
function shift_focus(square) {

    // Set variables for grid to shift focus to and boolean for whether that grid is filled
    let new_grid = square[4];
    let filled = true;

    // Check if grid to send to is already full
    for (let i = 0; i < 9; i++){
        if (big_grid[new_grid][i] == "D" || big_grid[new_grid][i] == "E"){
            filled = false;
        }
    }

    // Loop to disable and color white all squares unless their grid has been won
    for (let i = 0; i < 9; i++) {

        // Checks if grid has been won
        if (big_grid[9][i] == "D" || big_grid[9][i] == "E"){

            for(let j = 0; j < 9; j++) {
                document.getElementById('[' + i + '][' + j + ']').disabled = true;
                document.getElementById('[' + i + '][' + j + ']').style = "background:transparent; border:none;";
                if ((big_grid[i][j] != "X") && (big_grid[i][j] != "O")){
                    big_grid[i][j] = "D";
                }
            }
        }
    }

    // Covers case that the grid being sent to has not been won or filled yet
    if ((big_grid[9][new_grid] == "D" || big_grid[9][new_grid] == "E") && !filled) {

        // Loop to enable and color yellow all valid squares
        for (let i = 0; i < 9; i++) {

            // Checks to make sure grid space doesn't already have a letter in it
            if ((big_grid[new_grid][i] == "D") || (big_grid[new_grid][i] == "E")) {
                big_grid[new_grid][i] = "E";
                document.getElementById('[' + new_grid + '][' + i + ']').disabled = false;
                document.getElementById('[' + new_grid + '][' + i + ']').style = "background-color:PaleGoldenRod";
            }
        }
    }

    // Covers case that the grid being sent to has already been won or is full
    else {

        // Iterates through each grid
        for (let i = 0; i < 9; i++){

            // Checks if grid has not been won and is valid
            if (big_grid[9][i] == "E"){

                // Iterates through each cell in a mini-grid
                for (let j = 0; j < 9; j++){

                    // Checks that cell has not already been claimed
                    if (big_grid[i][j] == "D"){
                        big_grid[i][j] = "E";
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

// Function to decide where the ai should move next
function ai_move() {

    // Create array of valid cells to play in
    let valid_cells = [];
    for (let grid = 0; grid < 9; grid++){
        for(let cell = 0; cell < 9; cell++) {
            if(big_grid[grid][cell] == "E") {
                valid_cells.push("[" + grid + "][" + cell + "]");
            }
        }
    }

    // Check if O can win in this turn, if so, eliminate all other options
    if ((could_win("O", valid_cells).length != 0) && (diff == 1)){
        valid_cells = could_win("O", valid_cells);
    }

    // Check if X can win in this grid, if so, elimininate options that DON'T block X from winning grid
    if ((could_win("X", valid_cells).length != 0) && (diff == 1)) {
        valid_cells = could_win("X", valid_cells);
    }

    // Stretch goal: For each option, check where X will be sent. If X can win THAT grid, eliminate that option.

    // Finally, choose randomly from remaining cells
    let chosen_cell = valid_cells[Math.floor(Math.random()*valid_cells.length)];
    big_grid[chosen_cell[1]][chosen_cell[4]] = "O";
    document.getElementById(chosen_cell).value = "O";
    return chosen_cell;
}

// Function to determine if "player" could win a grid by filling in the spaces in valid_cells, and return the spaces that would give such a result
function could_win(player, valid_cells){
    let winning_cells = [];
    for (let element = 0; element < valid_cells.length; element++) {
        let grid = valid_cells[element][1];
        let cell = valid_cells[element][4];
        big_grid[grid][cell] = player;

        // If 'player' can win this grid by claiming this cell, add the corresponding square to winning_cells
        if (win(grid) == player) {
            winning_cells.push("[" + grid + "][" + cell + "]");
        }
        big_grid[grid][cell] = "E";
    }
    return winning_cells;
}

