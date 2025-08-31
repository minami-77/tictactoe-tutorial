import { useState } from "react";

function Square({value, onSquareClick}) {

  return (
    <button
      className="square"
      // Call onSquareClick(=>handleClick) function from Board component (parent)
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board({xIsNext, squares, onPlay}) {

  // Update an array
  function handleClick(i){
    // Return when the selected square is already taken or the game is over
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    //Copy an array of squares
    const nextSquares = squares.slice();
    if (xIsNext) {
      // Update ith value of the array
      nextSquares[i] = "X"
    } else {
      nextSquares[i] = "O";
    }
    // call onPlay(=>handlePlay) function from Game component
    console.log("Boardから親に渡す nextSquares:", nextSquares);
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        {/* Give props to Square component (child) */}
        <Square
          value={squares[0]}
          // Execute handleClick(i) after button is clicked
          onSquareClick={() => handleClick(0)}
        />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
    </>
  );
}
// Main function
export default function Game() {
  // keep track the history of squares on each turns
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] =useState(0);
  // who is the next player
  const xIsNext = currentMove % 2 === 0;
  // current squares
  const currentSquares = history[currentMove];

  //
  function handlePlay(nextSquares){
    console.log("Gameで受け取った nextSquares:", nextSquares);
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove){
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move)=>{
    let description;
    if (move > 0){
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick = {()=> jumpTo(move)}>{description}</button>
      </li>
    )
  })

  return (
    <div className = "game">
      <div className="game-board">
        {/* pass props to Board component(child) */}
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}


function calculateWinner(squares) {
  const lines =[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c ] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }
  return null;
}
