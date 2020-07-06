class Game {
    constructor() {
        this.inProgress = true; //starts game
        this.winner = null; // o or x
        this.currentTurn = Game.O;  //starts at O
        this.movesMade = 0; //counting moves to check for tie
        this.xWins=0;
        this.oWins=0;
        this.squares = new Array(9).fill().map(s => new Square()); //renders 9 empty squares
    }

   reset(){
    this.squares = new Array(9).fill().map(s => new Square());
        
   }
//checks if game is in progress + switches current turn
    makeMove(i) {
        if (this.inProgress && !this.squares[i].value) {
            this.squares[i].value = this.currentTurn;//mark the square with whoevers turn it is

            //counts moves and checks combinations for winner each turn
            this.movesMade++;
            this.checkForWinner();
            //ternary expression switch the current turn if its O's turn switch to X other switch to O's
            this.currentTurn = (this.currentTurn === Game.O) ? Game.X : Game.O;
        }
    }

//possible winning combinations that get checked for
    checkForWinner() {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];//create an array that holds every win condition ex. [0,1,2] is the first row [3,4,5] is the second row [0,3,6] is down


        winningCombinations.forEach((wc) => {//for every win condition
            const [a, b, c] = wc;
            const sqA = this.squares[a];//retrieve a value from the corresponding square
            const sqB = this.squares[b];
            const sqC = this.squares[c];

            if (sqA.value && sqA.value === sqB.value && sqA.value === sqC.value) {//if they match
                this.inProgress = false;//stop the game
                this.winner = sqA.value;//declare the winner
                if(this.winner==="X"){//if the winner is X then add to their wins
                    this.xWins++;
                    
                }else if(this.winner==="O"){//if the winner is O then add to their wins
                    this.oWins++;
                   
                }
                sqA.isHighlighted = sqB.isHighlighted = sqC.isHighlighted = true;//highlight the squares that won the game
            }
        });

        //checks for tie, once counter hit 9 stop game
        if (this.movesMade === this.squares.length) {
            this.inProgress = false;
        }
    }
}
//send variables for game
Game.O = 'O';
Game.X = 'X';
