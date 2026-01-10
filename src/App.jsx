import { useState } from 'react';

import './App.css';

import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

function App() {
  const [count, setCount] = useState(0);

  return (
    <main className="section container">
      <div className="flex-center">
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="grid-center">
        <h1 className="text-center">Vite + React + SWC + ESLint + Prettier + alias @</h1>
        <div className="card grid-center">
          <button onClick={() => setCount(count => count + 1)}>count is {count}</button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
      </div>
    </main>
  );
}

export default App;
