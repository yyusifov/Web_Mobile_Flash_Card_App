import React from 'react';
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NavigationBar from '../src/components/NavigationBar';
import Home from '../src/components/Home';
import Contact from '../src/components/Contact';
import FlashCard from '../src/components/FlashCardPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavigationBar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/FlashCard" element={<FlashCard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
