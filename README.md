Welcome to the amazing world of Tic Off! Get ready for the classic game reinvented with a unique twist, adding strategy and excitement.
While the basic idea of the game remains the same, read on to learn about some of the nuances and differences.

HOW TO RUN THE CODE:
On the terminal of the CS50 IDE, execute:
cd ~/workspace/finalproject/game
flask run

You will find a page that describes the instructions of the game (these are also transcribed in the paragraphs below). You'll also
see a navigation bar that leads to four pages: "Instructions," "Single Player," "Two Player," and "About." In "Single Player" mode,
you play our game against a CPU that we have programmed. You'll notice that there are two difficulty levels - easy and normal - which
you can toggle between by pressing the button at the top of the tic-tac-toe grid. The bottom of the page displays the winner at the end
of each game.
    In "Two Player" mode, you can play this game with a friend if you are both using the same computer. Note that the bottom of the page
will display both the winner (at the appropriate time) and whose turn it is.

RULES OF THE GAME:
    The game consists of one big 3x3 Tic-Tac-Toe board, where each individual cell is made up by another mini 3x3 game board. The object
is to get three in a row on the large board. X’s and O’s are made on the big board by winning the mini boards. When a player gets
three in a row on a mini board, the board will be claimed for them and contribute to their X’s or O’s in the big game. If a mini game
results in a tie, that board becomes null and cannot be used in the big game to win.
    Most importantly, which mini board a player gets to play on during their turn is not for them to decide. A player must play on the
mini board that corresponds to their opponent’s previous move. For example, if Player 1 places an X in the top right corner of any
mini board, Player 2 will have to make their next O move somewhere on the mini board that is in the top right corner of the big game.
Likewise, if Player 2 puts an O in the middle of that mini board, Player 2 will have to make their next move in the mini board in the
middle of the big board. This rule adds all the complexity and strategy to the game, so make sure you’re thinking ahead and watch out!
    However, as the game progresses and mini boards are won, sending your opponent to an already claimed board has a different effect.
When this happens, they are given the option to choose where they go next. Additionally, when Player 1 makes the very first move
in the game they also can choose on what mini board to play.
    As you’ll quickly discover, Tic Off is much more intense than its simpler cousin! Thinking multiple moves ahead like in chess and
keeping an eye out for patterns in your opponent's play are important for you to emerge victorious. Prepare to have a ton of fun, and
just be careful not to tick off your friends!