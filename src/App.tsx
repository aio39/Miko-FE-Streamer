import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <nav
        style={{
          borderBottom: 'solid 1px',
          paddingBottom: '1rem',
        }}
      >
        <Link to="/home">home</Link> | <Link to="/login">login</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
