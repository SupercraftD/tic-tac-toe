let simulating = false

let board 

let p1 = RandomPlayer
let p2 = RandomPlayer


function modeChanged(e){
  if (document.getElementById('Sim').checked){
    simulating = true
  }else{
    simulating = false
  }
}


function genBoard(){
  board = new Board(new p1(1),new p2(-1))
}

let xwins = 0
let owins = 0
let draws = 0

let rBoardState;

let bots={
  'Random':RandomPlayer,
  'Depth 1 (will play winning moves)':D1Player,
  'Depth 2 (will also block winning moves for opponent)':D2Player
}

function changeBot(){
  p1 = bots[document.getElementById('p1').value]
  p2 = bots[document.getElementById('p2').value]

  genBoard()
}

function setup(){
  let sim = document.getElementById('Sim')
  let man = document.getElementById('Manual')
  
  man.checked = true
  
  sim.onclick = modeChanged
  man.onclick = modeChanged

  for (let bot in bots){
    document.getElementById('p1').innerHTML += `<option value="${bot}">${bot}</option>`
    document.getElementById('p2').innerHTML += `<option value="${bot}">${bot}</option>`
  }
  document.getElementById('p1').onchange = changeBot
  document.getElementById('p2').onchange = changeBot


  genBoard()
  createCanvas(300,300)
}

function draw(){
  background(255)
  
  if (simulating){
    board.simRound()
    drawBoard(rBoardState)  
  }else{
    board.draw()
  }

  document.getElementById('wins').innerHTML = `X wins: ${xwins}    <br>   O Wins: ${owins}  <br> Draws: ${draws}`

}

function drawBoard(){
  line(100,0,100,300)
  line(200,0,200,300)
  line(0,100,300,100)
  line(0,200,300,200)
  
  textSize(100)
  
  for (let [col,row] of rBoardState.entries()){
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

function roundOver(winner){
  if (winner == 0){
    draws ++
  }else if (winner == 1){
    xwins ++
  }else{
    owins ++
  }
  genBoard()

}

function mousePressed(){
  if (!simulating){
    board.play()
    console.log(board.x,board.o)
  }
}