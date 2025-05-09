import { useState } from 'react';
import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';


function App() {
  // Esta variable de estado va a almacenar objetitos json en un arr,
  // que guarden las coordenadas del tablero clickeado y el jugador que hizo la jugada.
  const [gameTurns, setGameTurns] = useState([]);


  function handleSelectSquare(filaIndex, columIndex) {
    // Creo una función anónima para crear un nuevo estado en base al anterior (un nuevo array)
    setGameTurns((turnosPrevios) => { // recibe un arreglo
      let currentPlayer = 'X';

      if(turnosPrevios.length > 0 && turnosPrevios[0].player === 'X') { // si ya hay algo en el arr, y si el último que jugó fue X..
        currentPlayer = '0'; // cambio el actual jugador, le toca a O
      }

      const turnosActualizados = [ // creo un nuevo arreglo, pero con la nueva jugada (que va a estar en la pos[0])
        {                          // agrega el nuevo objeto json
          square: {
            row: filaIndex,
            column: columIndex
          },
          player: currentPlayer
        },
        ...turnosPrevios, // clona todos los items que ya tenía
      ];

      return turnosActualizados;
    })
  }


  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} />
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'} />
        </ol>
        <GameBoard onSelectSquare = {handleSelectSquare} turnosYaClickeados = {gameTurns} />
      </div>
      LOG
    </main>
  );
}

export default App;
