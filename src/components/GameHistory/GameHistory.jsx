export default function GameHistory( {historial} ) {
    return(
        <div>
            <h2>Histórico</h2>
            <table>
                <thead>
                    <tr>
                        <th>Jugadores</th>
                        <th>Resultado</th>
                        <th>Partidas Jugadas</th>
                    </tr>
                </thead>
                 <tbody>
                    {historial.map((partida, index) => (
                    <tr key={index}>
                    <td>{partida.jugadores}</td>
                    <td>{partida.resultado}</td>
                    <td>{index + 1}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}