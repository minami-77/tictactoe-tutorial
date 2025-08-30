import { useState } from "react";

function Square({value, onSquareClick}) {

  return (
    <button
      className="square"
      // Call onSquareClick function from Board component (parent)
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));

  // Update an array
  function handleClick(i){
    const nextSquares = squares.slice();
    nextSquares[i]= "X";
    setSquares(nextSquares);
  }


  return (
    <>
      <div className="board-row">
        {/* Give props to Square component (child) */}
        <Square
          value={square[0]}
          onSquareClick={() => handleClick(0)}
        />
        <Square value={square[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={square[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={square[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={square[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={square[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={square[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={square[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={square[8]} onSquareClick={() => handleClick(8)}/>
      </div>
    </>
  );
}
