import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import SelectPlayers from './Pages/PlayerSelect';
import PlayerSetup from './Pages/PlayerSetup';
import { RoutesName } from './utils/routes';
import GameBoard from './Pages/GameBoard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutesName.home} element={<Home />} />
        <Route path={RoutesName.players} element={<SelectPlayers />} />
        <Route path={RoutesName.playersName} element={<PlayerSetup />} />
        <Route path={RoutesName.gameBoard} element={ <GameBoard /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
