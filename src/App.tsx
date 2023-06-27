import React from 'react';
import './App.css'
import Jokes from './services/jokes';
import Table from './components/table';
import { IJoke } from './interfaces/jokes';

function App() {
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
  );
}

export default App;
