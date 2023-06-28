import React, { useEffect } from 'react';
import './App.css'
import Jokes from './services/jokes';
import Table from './components/table';
import { IJoke } from './interfaces/jokes';
import { Jokes as JokePage } from './pages/jokes';
// import { JokesGET } from './services/jokes';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import useJokes from './hooks/jokes';
import ProtectedRoute from './config/protectedRoute';

function App() {

  const ListJokes = () => {

    // const [data, setData] = React.useState<IJoke[]>([])
    // useEffect(() => {
    //   const fetchJokes = async () => {
    //     const jokes = await JokesGET();
    //     console.log({jokes})
    //     setData(jokes)
    //   }
    //   fetchJokes()
    // }, [])

    // useEffect(() => {
    //   fetchJokes()
    // }, [])

    return (
      <div className="App">
        <header>
          <h1> Prueba Tecnica para Acid Labs 2023 </h1>
          <main>
            <Table />
          </main>
        </header>
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
