// Recibe la funcion que se ejecuta cuando clickeo en una celda, y un arreglo de turnos (los ya clickeados)
export default function GameBoard({ onSelectSquare, board }) {
  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button 
                  onClick={() => onSelectSquare(rowIndex, colIndex)} 
                  disabled={playerSymbol !== null} // deshabilito el btn si el casillero tiene un símbolo distinto de nulo
                > {playerSymbol} </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}