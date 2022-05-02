import type * as ivs from 'amazon-ivs-player';
import React from 'react';
import { Socket } from 'socket.io-client';
import './App.css';
import MainRouter from './pages/MainRouter';

declare global {
  interface Window {
    socket: Socket;
    IVSPlayer: typeof ivs;
  }
}

function App() {
  return <MainRouter />;
}

export default App;
