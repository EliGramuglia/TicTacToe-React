import { useState } from 'react';


const initialGameBoard = [ // Matriz de nulos
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const winningCombinations = [
  // Filas
  [[0, 0], [0, 1], [0, 2]], 
  [[1, 0], [1, 1], [1, 2]], 
  [[2, 0], [2, 1], [2, 2]],
  // Columnas
  [[0, 0], [1, 0], [2, 0]], 
  [[0, 1], [1, 1], [2, 1]], 
  [[0, 2], [1, 2], [2, 2]], 
  // Diagonales
  [[0, 0], [1, 1], [2, 2]],
  [[0, 2], [1, 1], [2, 0]]
];


// Recibe la funcion que se ejecuta cuando clickeo en una celda, y un arreglo de turnos (los ya clickeados)
export default function GameBoard({ onSelectSquare, turnosYaClickeados }) {
  let gameBoard = initialGameBoard;
  const [winner, setWinner] = useState(null); // Para manejar el ganador

  //Cada vez que el componente se renderiza se ejecuta este for, que hace que los casilleros se completen
  for (const turn of turnosYaClickeados) {
    const { square, player } = turn;
    const { row, column } = square;
    gameBoard[row][column] = player;
  } 

  /*function handleSelectSquare(rowIndex, colIndex) {
    if (gameBoard[rowIndex][colIndex]) {
      setError('Esta casilla ya está ocupada');
      setTimeout(() => { //Para mostrar el cartel de error durante 2 seg
        setError('');
      }, 2000);
      return;
    }

    setGameBoard((prevGameBoard) => {
      const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
      updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
      return updatedBoard;
    });

    const currentWinner = checkWinner(gameBoard);
    if (currentWinner) {
      setWinner(currentWinner); // Actualizar el estado del ganador
    }

    onSelectSquare();
  }*/


  /*function checkWinner(board) {
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      const first = board[a[0]][a[1]];
      const second = board[b[0]][b[1]];
      const third = board[c[0]][c[1]];
  
      if (first && first === second && second === third) {
        return first;
      }
    }
  
    return null; // Nadie ganó
  }*/




  return (
    <>
      {winner && <div>¡{winner} ganó!</div>}
      <ol id="game-board">
        {gameBoard.map((row, rowIndex) => (
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
    </>
  );
}