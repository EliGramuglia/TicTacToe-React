import { useState } from 'react';
import ErrorMessage from './ErrorMessage/ErrorMessage';


const initialGameBoard = [
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


export default function GameBoard({ onSelectSquare, activePlayerSymbol }) {
  const [gameBoard, setGameBoard] = useState(initialGameBoard);
  const [error, setError] = useState(''); //Para manejar el error
  const [winner, setWinner] = useState(null); // Para manejar el ganador


  function handleSelectSquare(rowIndex, colIndex) {
    if (gameBoard[rowIndex][colIndex] || winner) {
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
  }


  function checkWinner(board) {
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
  }




  return (
    <>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {winner && <div className="winner-message">¡{winner} ganó!</div>}
      <ol id="game-board">
        {gameBoard.map((row, rowIndex) => (
          <li key={rowIndex}>
            <ol>
              {row.map((playerSymbol, colIndex) => (
                <li key={colIndex}>
                  <button onClick={() => handleSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </>
  );
}