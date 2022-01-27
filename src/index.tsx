import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Concert from './routes/concert/Concert';
import Home from './routes/Home';
import Homes from './routes/Homes';
import Login from './routes/Login';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider resetCSS>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/concert" element={<Concert />}></Route>
            <Route path="home" element={<Homes />}>
              <Route
                index
                element={
                  <main style={{ padding: '1rem' }}>
                    <p>Index로 기본 설정</p>
                  </main>
                }
              />
              <Route path=":homeId" element={<Home />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route
              path="*"
              element={
                <main style={{ padding: '1rem' }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
