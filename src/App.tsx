import React from 'react';
import './App.css'
import Jokes from './services/jokes';
import Table from './components/table';
import { IJoke } from './interfaces/jokes';
import { Jokes as JokePage } from './pages/jokes';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
 
  const ListJokes = () => {
    const data = Jokes() as IJoke[]
    return (
      <div className="App">
        <header>
          <h1> Prueba Tecnica para Acid Labs </h1>
          <main>
            <Table data={data} />
          </main>
        </header>
      </div>
    )
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ListJokes} />
        <Route exact path="/jokes" component={ListJokes} />
        <Route path="/joke/:jokeId" component={JokePage} />
        <Route path="/joke" component={JokePage} />
      </Switch>
    </Router>
  );
}

export default App;
