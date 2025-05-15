import { useState } from 'react'; //Hook useState de React (para manejar estados)
import ErrorMessage from './ErrorMessage/ErrorMessage';


export default function Player({ initialName = 'Please edit me!', symbol, isActive, onNameChange }) {
  // Crea un estado local playerName y su función para actualizarlo setPlayerName
  // El valor inicial es el que vino como initialName por parametro
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);    // Crea otro estado local y su función para actualizarlo. Comienza en false
  
  const [error, setError] = useState('');
  const errorMessage = 'Por favor, ingrese su nombre';

  function handleEditClick() {
    if (isEditing) {
      if (playerName.trim() === '') { //trim() elimina los espacios
        setError(errorMessage);
        setTimeout(() => { //Borrar el error después de 2 segundos
          setError('');
        }, 2000);
        return;
      } 
      if(onNameChange) {
        onNameChange(symbol, playerName.trim());
      }
    }
    else {
      setPlayerName('');
    }
    
    setIsEditing((actual) => !actual); // No seteo directamente el estado que ya tengo, si no que creo uno nuevo, no hago setIsEditing(!isEditing)
  }


  function handleChange(event) {
    setPlayerName(event.target.value); // Captura lo que escribe el usuario en el <input>, y actualiza el estado con ese valor.
  }

  
  let editablePlayerName = <span className="player-name">{playerName}</span>; //Define que se va a mostrar como nombre del jugador

  if (isEditing) {
    editablePlayerName = (
      <input type="text" required value={playerName} onChange={handleChange} placeholder="Introduzca su nombre"/> //onChange={(event) => handleChange(event)}
    );
  }

  return (
    <li className={isActive ? 'active' : undefined}>
      <div className="player">
        <span className="player">
          {editablePlayerName}
          <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleEditClick}>
          {isEditing ? 'Guardar' : 'Editar'}
        </button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </div>
    </li>
  );
}
