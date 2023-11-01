class D1Player extends Player{
    constructor(side){
        super(side)
    }
    move(){
        let moves = this.getLegalMoves(board.board)

        for (let move of moves){
            let b = this.copyBoard(board.board)
            b.makeMove(move[0],move[1],this.side)
            if (b.gameOver().state == 'win'){
                return move
            }
        }
        return moves.random()
    }
}