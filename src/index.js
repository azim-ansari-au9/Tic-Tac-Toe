import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css'

const Square =(props)=>{
  return(
    <button 
    className="Square"
    onClick={props.onClickEvent}
    >

      {props.value}
    </button>
  )
}

const Board = () => {
  const initialSquares = Array(9).fill(null);
  const [squares ,setSaquares] = useState(initialSquares);
  const [xIsNext, setXIsNext] = useState(true)
  const handleClickEvent = (i)=>{
    // alert(`square ${i} clicked`);
    //make a copy of aquare state array
     const newSquares = [...squares]
     const winnerDecleared = Boolean(calculatorWinner(newSquares))
    const squareFilled = Boolean(newSquares[i])
    if (winnerDecleared || squareFilled){
      return;
    }
    //mutate the copy setting the i th element to 'X'.
     newSquares[i] = xIsNext ? 'X': 'O'
    //call the setSquares function with the muted copy.
    
     setSaquares(newSquares);
     setXIsNext(!xIsNext)
  }

  const renderSquare = (i) =>{
    return(
      <Square value={squares[i]}
      onClickEvent={()=> handleClickEvent(i)}
      />
    )
  }
  const winner = calculatorWinner(squares);
  const status = winner ?
  `Winner: ${winner}`:
  `Next playes: ${xIsNext ? 'X' : 'O'}`


  return (
    <div >
      <div className='status'>{status}</div>
      <div className="board-row">
      {renderSquare(0)} {renderSquare(1)} {renderSquare(2)} 
      </div>
      <div className="board-row">
      {renderSquare(3)} {renderSquare(4)} {renderSquare(5)}
      </div>
      <div className="board-row">
      {renderSquare(6)} {renderSquare(7)} {renderSquare(8)} 
      </div>
    </div>
  )
}

const Game = () => {
  return (
    <div className="game">
      Tic-Tac-Toe
      <Board />
    </div>
  );
}
ReactDOM.render(
  <Game />,
  document.getElementById('root')
)

function calculatorWinner(squares){
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],  //row
    [0,3,6],[1,4,7],[2,5,8],  //columns
    [0,4,8],[2,4,6]  //diagonals
  ]
  for (let line of lines) {
    const [a,b,c] = line;

    if (squares[a] && squares[a]===squares[b] && squares[a]===squares[c]){
      return squares[a]; //'X' or 'O'
    }
  }

  return null;
}