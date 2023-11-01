class Board{
    constructor(p1,p2){
        this.turn = 1;

        this.x = p1;
        this.o = p2;

        this.board = [];
        for (let c = 0; c<3; c++){
            this.board.push([])
            for (let r = 0; r<3; r++){
                this.board[this.board.length-1].push(0)
            }
        }
    }
    simRound(){
        while (this.gameOver().state == 'gaming'){
            this.play()
        }
    }
    play(){
        let move
        if (this.turn == 1){
            move = this.x.move()
        }else{
            move = this.o.move()
        }

        this.makeMove(move[0],move[1],this.turn)

        if (this.gameOver().state == 'win'){
            rBoardState = clone(this.board)
            roundOver(this.turn)
        }else if (this.gameOver().state == 'draw'){
            rBoardState = clone(this.board)
            roundOver(0)
        }

        this.turn = this.turn == 1 ? -1 : 1

    }
    makeMove(x,y,side){
        this.board[y][x] = side;
    }
    gameOver(){
        const allEqual = arr => arr.every( v => v === arr[0] )
    
        let columns = [[],[],[]]
        let diags = [[],[]]

        let full = 0;

        for (let [y,row] of this.board.entries()){
            for (let [x,val] of row.entries()){
                if (val != 0){
                    full ++;
                }

                columns[x].push(val)
                
                if (y==x){
                    diags[0].push(val)
                }
                if ((y==0 && x==2) || (y==1 && x==1) || (y==2 && x==0)){
                    diags[1].push(val)
                }

                if (allEqual(row) && row[0]!=0){
                    return {state:'win',winner:row[0]}
                }
            }
        }
        
        for (let c of columns){
            if (allEqual(c) && c[0]!=0){
                return {state:'win',winner:c[0]}
            }
        }
        for (let d of diags){
            if (allEqual(d) && d[0]!=0){
                return {state:'win',winner:d[0]}
            }
        }

        if (full == 9){
            return {state:'draw'}
        }

        return {state:'gaming'}

    }
    draw(){
        //console.log(this.board)
        line(100,0,100,300)
        line(200,0,200,300)
        line(0,100,300,100)
        line(0,200,300,200)
        
        textSize(100)
        
        for (let [col,row] of this.board.entries()){
            for (let [i,e] of row.entries()){
                char = ''
                if (e == -1){
                    char = 'o'
                }else if (e==1){
                    char = 'x'
                }

                text(char,25+(col*100),75+(i*100))
            }
        }

    }
}