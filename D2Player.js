class D2Player extends Player{
    constructor(side){
        super(side)
    }
    move(){
        let moves = this.getLegalMoves(board.board)

        let candidates = []

        for (let move of moves){
            let b = this.copyBoard(board.board)
            b.makeMove(move[0],move[1],this.side)
            if (b.gameOver().state == 'win'){
                return move
            }
            b.makeMove(move[0],move[1],this.side == 1 ? -1 : 1)
            if (b.gameOver().state == 'win'){
                return move
            }
        }

        if (candidates.length > 0){
            return candidates.random()
        }else{
            return moves.random()
        }
    }
}