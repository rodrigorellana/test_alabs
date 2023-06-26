import React from 'react';
import './App.css'
import Jokes from './services/jokes';

function App() {
  const data = Jokes()
  return (
    <div className="App">
      <header>
       <h1> Prueba Tecnica para Acid Labs </h1>
       <main>
       <pre>{JSON.stringify(data, null, 4)}</pre>

       </main>
      </header>
    </div>
  );
}

export default App;
