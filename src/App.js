import logo from './logo.svg';
import './App.css';

function App() {

  const navigationBar = ()=>{
    <div className='navBar'>
      <div className='contForPages'>
        <div className='page'>
          <a><span>Home Page</span></a>
        </div>
        <div className='page'>
          <a><span>Flash Card</span></a>
        </div>
        <div className='page'>
          <a><span>Contact Me</span></a>
        </div>
      </div>
    </div>
  }

  const addCard = ()=>{
    <div>
      <div>
        <span>Add a new card</span>
      </div>
    </div>
  }
  const FlashCardPage = ()=>{
    return (
      <div className='flashCardPage'>
        <div className='cardFrame'>
          <div className='status'>
            <span>Status</span>
          </div>
          <div className='question'>
            <p>
              Question
            </p>
          </div>
          <div className='dateCreated'>
            <span>Date created</span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="App">
      <div>
        <h1>Welcome to Flash Card Page</h1>
      </div>
      <div>
        <p>
          My name is Yadigar Yusifov. I am glad to accomodate you in my Flash Card Page.
          I am senior Computer Sciences student at ADA University. 
          I have done my internship in Div Academy as a back-end mentor.
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
  );
}

export default App;
