/* eslint-disable jsx-a11y/anchor-is-valid */
import './App.css'
import Table from './components/table';
import { Jokes as JokePage } from './pages/jokes';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import ProtectedRoute from './config/protectedRoute';
import useAuth from './hooks/auth';
import useDarkMode from './hooks/darkMode';

function App() {

  const ListJokes = () => {
    const { user, signOut } = useAuth();
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    return (
      <div className="App">
        <header>
          <div><h1> Prueba Tecnica para Acid Labs 2023 </h1></div>
          <div>
            <p>{user?.name}</p>
            <a href='/' onClick={signOut}>Cerrar sesion</a> 
            <a href='#' onClick={toggleDarkMode}>Cambiar a {isDarkMode? 'Light': 'Dark'} </a> 
            {/* PULGX ETA ACTUALI_nDO L PGINA!! */}
          </div>
        </header>
        <main>
          <Table />
        </main>
      </div>
    )
  }

  return (
    <Router>
      <Switch>
        <ProtectedRoute exact path="/" component={ListJokes} />
        <ProtectedRoute exact path="/jokes" component={ListJokes} />
        <ProtectedRoute path="/joke/:jokeId" component={JokePage} />
        <ProtectedRoute path="/joke" component={JokePage} />
      </Switch>
    </Router>
  );
}

export default App;
