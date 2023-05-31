import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import {ChakraProvider} from "@chakra-ui/react";

// component
import Navbar from './components/Navbar/index.tsx';
import App from './App.tsx';
import Footer from './components/Footer/index.tsx';

// global styles
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <Router>
        <Navbar />
        <App />
        <Footer />
      </Router>
    </ChakraProvider>
  </React.StrictMode>,
);
