import { useState, useEffect } from 'react';
import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
import GameHistory from './components/GameHistory/GameHistory.jsx';
import GameOver from './components/GameOver.jsx';
import { WINNING_COMBINATIONS } from './utils.js';

const cantCeldas = 9;

const initialGameBoard = [ // Matriz de nulos
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const jugadores = { // Objeto para guardar los nombres
  X: 'Player 1',
  O: 'Player 2'
};



/*------------------------------------------- FUNCIONES DERIVADAS -------------------------------------------*/
/* Los estados o funciones derivadas son más baratos computacionalmente (estados que se derivan de otros estados).
Cuando se modifica una variable de estado, React renderiza todo el componente -> para evitar lags, es importante reducir dichas variables */

// Devuelve quién es el jugador activo actual (ya que cambia de turno)
function cambiarJugadorActivo(turnosPrevios){
  let jugadorActual = 'X';

  if(turnosPrevios.length > 0 && turnosPrevios[0].player === 'X') { // si ya hay algo en el arr, y si el último que jugó fue X..
        jugadorActual = 'O'; // cambio el actual jugador, le toca a O
  }

  return jugadorActual;
}


// Devuelve un tablero 3x3 actualizado, en base a las jugadas hechas
function cargarTableroActual(turnosYaClickeados){
  let gameBoard = [...initialGameBoard.map((arr) => [...arr])];

  // Cada vez que el componente se renderiza se ejecuta este for, que hace que los casilleros se completen
  for (const turn of turnosYaClickeados) {
    const { square, player } = turn; // const square = turn.square; const player = turn.player;
    const { row, column } = square; 
    gameBoard[row][column] = player;
  } 

  return gameBoard;
}


// Chequea si hay un ganador y lo devuelve (Pepe (O))
function chequearSiHayGanador(gameBoard, players) {
   let winner;
  
    for (const combination of WINNING_COMBINATIONS) {
      const firstSymbol = gameBoard[combination[0].row][combination[0].column];
      const secondSymbol = gameBoard[combination[1].row][combination[1].column];
      const thirdSymbol  = gameBoard[combination[2].row][combination[2].column];
  
      if (firstSymbol && firstSymbol === secondSymbol && firstSymbol === thirdSymbol) {
        winner = `${players[firstSymbol]} (${firstSymbol})`;
      }
    }
  
    return winner;
}



/*------------------------------------------- COMPONENTE APP (RAÍZ) -------------------------------------------*/
function App() {
  // Variables de estado: useState
  const [gameTurns, setGameTurns] = useState([]); // Esta variable de estado va a almacenar objetitos json en un array, que guarden las coordenadas del tablero clickeado y el jugador que hizo la jugada.
  const [players, setPlayers] = useState(jugadores);
  
  // Variables derivadas:
  const activePlayer = cambiarJugadorActivo(gameTurns);
  const gameBoard = cargarTableroActual(gameTurns);
  const ganador = chequearSiHayGanador(gameBoard, players);
  const hayEmpate = gameTurns.length === cantCeldas && !ganador;

  // Variable que usa LocalStorage
  const [historial, setHistorial] = useState(() => {
  const guardado = localStorage.getItem('historial');
  try {
    return guardado ? JSON.parse(guardado) : [];
  } catch {
    return [];
  }
  });

  useEffect(() => {
    localStorage.setItem('historial', JSON.stringify(historial));
  }, [historial]);
  

  // Función que agrega una jugada
  function handleSelectSquare(filaIndex, columIndex) {
    // Creo una función anónima para crear un nuevo estado en base al anterior (un nuevo array)
    setGameTurns((turnosPrevios) => { // recibe un arreglo (turnoPrevios[] -> el valor anterior del estado gameTurns.)
      let currentPlayer = cambiarJugadorActivo(turnosPrevios);

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


  // Función para resetear la partida
  function handleRestart(){
    guardarHistorial();
    setGameTurns([]);
  }

  // Función para guardar la nueva partida finalizada
  function guardarHistorial(){
    const resultado = ganador ? `Ganó ${ganador}` : 'Empate';

    setHistorial(partidasPrevias => [
    ...partidasPrevias,
      {
        jugadores: `${players.X} vs ${players.O}`,
        resultado: resultado
      }
    ]);
  }

  // Función para cambiar el nombre del jugador
  function cambiarNombreDelJugador(symbol, newName) {
     setPlayers(jugadores => { // Le paso a la arrow function el objeto (jugadores)
      return {
        ...jugadores, // Hago una copia de ese objeto, ej: Jugadores={  X: 'Player 1', O: 'Player 2'}
        [symbol]: newName // Sobreescribe sólo la clave que tenga el símbolo que viene por parámetro
      };
    });
  }
  /*setPlayers(prev => {
  if (symbol === 'X') {
    return { ...prev, X: newName };
  } else if (symbol === 'O') {
    return { ...prev, O: newName };
  }
  });*/


  // Función para limpiar el historial tanto en el estado como en localStorage
  function handleResetHistorial() {
    setHistorial([]); // vaciamos el estado
    localStorage.removeItem('historial'); // borramos el localStorage
  }



  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName={players.X} symbol="X" isActive={activePlayer === 'X'} onNameChange={cambiarNombreDelJugador} />
          <Player initialName={players.O} symbol="O" isActive={activePlayer === 'O'} onNameChange={cambiarNombreDelJugador} />
        </ol>
        {(ganador || hayEmpate) && (
          <GameOver winner={ganador} onRestart={handleRestart} />
        )}
        <GameBoard onSelectSquare = {handleSelectSquare} board={gameBoard} />
      </div>
      <GameHistory historial={historial} />
      <button className='#game-over' onClick={handleResetHistorial}>Borrar historial</button>
    </main>
  );
}

export default App;

/* React recomienda nombrar las funciones que se pasan como props, comenzando con on... */