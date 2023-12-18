import React, { useState } from 'react';
import './App.css';

function App() {
  const navigationBar = () => {
    return (
      <div className='navBar'>
        <div className='contForPages'>
          <button className='page' onClick={() => moveToDiffPage('home')}>
            <span>Home Page</span>
          </button>
          <button className='page' onClick={() => moveToDiffPage('flashCard')}>
            <span>Flash Card</span>
          </button>
          <button className='page' onClick={() => moveToDiffPage('addCard')}>
            <span>Add Card</span>
          </button>
        </div>
      </div>
    );
  };

  const addCard = () => {
    return (
      <div>
        <div>
          <span>Add a new card</span>
        </div>
      </div>
    );
  };

  const FlashCardPage = () => {
    return (
      <div className='flashCardPage'>
        <div className='cardFrame'>
          <div className='status'>
            <span>Status</span>
          </div>
          <div className='question'>
            <p>Question</p>
          </div>
          <div className='dateCreated'>
            <span>Date created</span>
          </div>
        </div>
      </div>
    );
  };

  const [currentPage, showPage] = useState('home');

  const moveToDiffPage = (page) => {
    showPage(page);
  };

  return (
    <div className="App">
      {navigationBar()}

      {currentPage === 'home' && (
        <div>
          <h1>Welcome to Flash Card Page</h1>
          <div>
            <p>
              My name is Yadigar Yusifov. I am glad to accommodate you in my Flash Card Page.
              I am a senior Computer Sciences student at ADA University.
              I have done my internship at Div Academy as a back-end mentor.
              I have experience in android development and front-end.
            </p>
          </div>
          <div>
            <ul>
              <li>Park Application: Link to repository: <a target='blank' href="https://github.com/yyusifov/Park_Application.git">Link</a></li>
              <li>Online Bet Application: Link to repository: <a target='blank' href="https://github.com/yyusifov/Online-Bet-Application.git">Link</a></li>
              <li>Quiz Application: Link to repository: <a target='blank' href="https://github.com/yyusifov/Quiz-App.git">Link</a></li>
              <li>Portfolio: Link to repository: <a target='blank' href="https://github.com/yyusifov/Web-Mobile-Portfolio.git">Link</a></li>
              <li>E-Store: Link to repository: <a target='blank' href="https://github.com/yyusifov/Web-Mobile-E-store.git">Link</a></li>
            </ul>
          </div>
        </div>
      )}

      {currentPage === 'flashCard' && <FlashCardPage />}
      {currentPage === 'addCard' && <>{addCard()}</>}
    </div>
  );
}

export default App;