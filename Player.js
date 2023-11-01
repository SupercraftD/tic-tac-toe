class Player{
    constructor(side){
        this.side = side
    }
    copyBoard(bo){
        let b = clone(bo)
        let r = new Board(board.x,board.o)
        r.board = b
        return r
    }
    getLegalMoves(b){
        let moves = []

        for (let [y,row] of b.entries()){
            for (let [x,val] of row.entries()){
                if (val == 0){
                    moves.push([x,y])
                }
            }
        }

        return moves
    }
}