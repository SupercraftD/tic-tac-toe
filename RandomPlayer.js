class RandomPlayer extends Player{
    constructor(side){
        super(side)
    }
    move(){
        let moves = this.getLegalMoves(board.board)
        return moves.random()
    }
}