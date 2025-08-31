import { useState } from "react";

function Square({value, onSquareClick}) {
  return (
    <button
      className="square"
      // Call the onSquareClick function passed from the Board component (parent)
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board({xIsNext, squares, onPlay}) {
  // Handle a click on a square
  function handleClick(i){
    // Ignore the click if the square is already filled or the game has a winner
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    // Create a copy of the current squares array (do not mutate the original)
    const nextSquares = squares.slice();
    if (xIsNext) {
      // Place "X" or "O" depending on whose turn it is
      nextSquares[i] = "X"
    } else {
      nextSquares[i] = "O";
    }
    // Call the onPlay (→ handlePlay) function from the Game component, passing the new board state (nextSquares)
    // → This triggers Game's handlePlay(), which updates the history
    console.log("Pass nextSquares from Board component:", nextSquares);
    onPlay(nextSquares);
  }

  // Check if there's a winner
  const winner = calculateWinner(squares);
  // Display the game status (winner or next player)
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
        {/* Give props to Square component */}
        {/* Arrow function: call handleClick(0) only after the button is clicked */}
        <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
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
// Main component
export default function Game() {
  // Keep track of the history of board states (each element is an array of 9 squares)
  const [history, setHistory] = useState([Array(9).fill(null)]);
  // Track the current move index
  const [currentMove, setCurrentMove] =useState(0);
  // Determine whose turn it is (even: X, odd: O)
  const xIsNext = currentMove % 2 === 0;
  // Get the board state for the current move
  const currentSquares = history[currentMove];

  // Called by the Board component with the new board state (nextSquares) when a move is made
  function handlePlay(nextSquares){
    console.log("Received nextSquares on Game component:", nextSquares);
    // Add nextSquares to history (discarding any "future" moves if we had time-traveled)
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    // Update the history and currentMove
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }
  // Jump to a specific move in history
  function jumpTo(nextMove){
    setCurrentMove(nextMove);
  }
    // Generate the list of moves for time travel
    const moves = history.map((squares, move)=>{
    let description;
    if (move > 0){
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      // React requires a unique "key" for list items to identify and update them efficiently.
      // Here, "move" (the turn index) is used as a unique key.
      <li key={move}>
        <button onClick = {()=> jumpTo(move)}>{description}</button>
      </li>
    )
  })

  return (
    <div className = "game">
      <div className="game-board">
        {/* pass props to Board */}
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

// Utility function to check if someone has won
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
