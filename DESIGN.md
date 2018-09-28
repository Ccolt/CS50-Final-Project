    While we do have an "application.py" file, it exists solely for the purpose of running the game on a web server. All of the back-end
code for our game lies in the "pve.js" and "pvp.js" javascript files.

PVP.JS ("PVP" stands for player vs. player):
    To store all the relevant information for our tic-tac-toe grid, we initialized an array called "big_grid." big_grid consists of
ten arrays. Nine of these arrays each represent one "mini-grid" (referred to in the code as a "grid"). The "mini-grid" is itself an array
that consists of the nine "cells" within it. The mini-grid and the cells are ordered from left to right. For instance, big_grid[2][4]
represents the second cell in the second row of the third mini-grid in the first row. Additionally, the tenth array in big_grid serves
as a "winner's grid," which stores the player that wins a mini-grid. For example, if "X" wins the first mini-grid, then big_grid[9][0]
will store "X".
    There are three functions in pvp.js. The first is "clicked," which marks either an "X" or an "O" wherever a player clicks.
If a player wins a mini-grid, then all the cells in it get disabled and either an "X" or an "O" pattern appears on the mini-grid.
When a player wins the overall grid, then all remaining enabled cells get disabled. Finally, the computer switches turns.
    "shift_focus" shifts the "focus" of the grid, telling the player where within the grid he/she can play his/her next move. This proved
to be quite tricky, since the game's rules about legal moves can prove to be rather complicated. First, all cells that haven't been won
are marked white. Then, according to the rules, if one player moves the focus of the grid to a mini-grid that hasn't been won yet,
the next player can play only within that mini-grid. The program highlights all cells that haven't yet been marked with "X" or "O" in
the relevant mini-grid. Finally, if one player moves the focus to a mini-grid that *has* been won, then the program highlights every
cell that hasn't been marked within every mini-grid that hasn't been won.
    Lastly, "win" returns an "X" or an "O" if either a mini-grid or the overall grid has been won. There are eight possible ways to win
a grid in tic-tac-toe, and we check each possible state in the function. Unfortunately, there isn't a way to cleverly check all
eight conditions in one line.

PVE.JS ("PVE" stands for player vs. environment, or in other words, player vs. computer):
    pve.js is quite similar to pvp.js, with some critical adjustments. Firstly, every cell in the grid gets assigned one of four values:
"X", "O", "E", or "D", where "E" and "D" stand for "enabled" and "disabled", respectively. We had to mark cells as "enabled" or "disabled"
so that the CPU opponent can know which cells it can legally make moves in. While this was a necessary step, we did have to adjust
"clicked" and "shift_focus" accordingly, which caused some complications (especially in relation to the latter). Now, to determine
a player can legally mark off a grid or a cell, we will often have to check whether its value is "D" or "E", or accordingly change
its value to "D" or "E".
    "clicked" calls another function, "ai_move," which programs the movements of the CPU. In easy mode, the movements of the AI are
random. In normal mode, "ai_move" calls a function named "could_win," which checks whether the human or the CPU could win a mini-grid
in its next move. "could_win" essentially places an "X" or an "O" in all valid positions in the grid and sees whether any of those
placements will result in a winning configuration. Then, if the opportunity is available, the CPU either blocks the human from winning
or plays its next move such that it wins a mini-grid. Also, we wanted to code an unbeatable CPU using a Monte Tree Searching Algorithm,
but that turned out to require an unfeasible amount of computing power.

HTML:
    The major challenge that we encountered when coding our front-end was creating a tic-tac-toe grid with 9 mini-grids. We had to
code a four-level for loop - that is, four for loops nested within each other, each representing a row or a column in either
the overall grid or the mini-grids. Constructing the tic-tac-toe grid required Jinja, which we implemented in "pvpgame.html" and
"pvegame.html". All of the layout design for the website was written in "layout.html".

