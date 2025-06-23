import React from 'react';
import Weather from './Components/Weather';
import Header from './Components/Header';
import './App.css';
import Footer from './Components/Footer';

const App = () => {
  return (
    <div className="app">
      <div className="app-layout">
        <Header />
        <Weather />
      </div>
      <Footer/>
    </div>
  );
};

export default App;
