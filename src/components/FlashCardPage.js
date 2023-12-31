import React, { useEffect, useState } from 'react';
import "./FlashCardPage.css"

const FlashCardPage = () => {
    const [cardInfo, setCardInfo] = useState([]);

    const showAnswer = (card) => {
      const cardFrame = document.getElementById(`cardFrame_${card.id}`);

      const buttonText = document.getElementById('answerButText');

      if(buttonText.textContent === "Show answer"){
        buttonText.textContent = "Show question";
      }
      else{
        buttonText.textContent = "Show answer";
      }
      cardFrame.style.transform = "rotateY(180deg)";
    };

    const editCard = (card) => {

      const countryName = document.getElementById(`countryName_${card.id}`);
    
      const questionForCard = document.getElementById(`question_${card.id}`);
    
      if(document.getElementById(`editButton_${card.id}`).textContent === "Edit"){
    
        document.getElementById(`editButton_${card.id}`).textContent = "Save";
    
        document.getElementById(`countryName_${card.id}`).contentEditable = true;
    
        document.getElementById(`question_${card.id}`).contentEditable = true;
      }
      else{
        document.getElementById(`editButton_${card.id}`).textContent = "Edit";
    
        document.getElementById(`countryName_${card.id}`).contentEditable = false;
    
        document.getElementById(`question_${card.id}`).contentEditable = false;
    
        const updatedData = {
          id: card.id,
          countryName: countryName,
          flag: card.flag,
          question: questionForCard,
          capital: card.capital
        };        

        updateOnFlashCardPage(updatedData);
      }
    };

    const updateOnFlashCardPage = (card) => {
      const countryName = document.getElementById(`countryName_${card.id}`).textContent;
      const questionForCard = document.getElementById(`question_${card.id}`).textContent;
    
      const updatedData = {
        id: card.id,
        countryName: countryName,
        flag: card.flag,
        question: questionForCard,
        capital: card.capital
      };
    
      fetch(`http://localhost:3000/cards/${updatedData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      })
        .then(response => response.json())
        .then(updatedDataFromServer => {
          console.log('Data updated on the server:', updatedDataFromServer);
        })
        .catch(err => console.error('Error: ', err));
    };
    
    const deleteCard = (cardId) => {
      fetch(`http://localhost:3000/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
      })
      .catch(err => console.error('Error: ', err));
      
      setCardInfo(cardInfo => cardInfo.filter(card => card.id !== cardId));
    }

    
    useEffect(() => {
      fetch('http://localhost:3000/cards')
        .then(response => response.json())
        .then(data => {
          for(let i = 0; i < data.length; i++){
            console.log(data[i].countryName + "\n" + data[i].flag + "\n" + data[i].capital);
          }
          setCardInfo(data);
        })
        .catch(error => console.error('Error fetching JSON:', error));
    }, [cardInfo]);

    return (
      <div className='flashCardPage'>
        <div className='searchBar'>
          <div className='searchFrame'>
            <div className='icon'>
              <img src={require("../assets/searchCardIcon.svg").default} alt='Search Icon' />
            </div>
            <div className='inputText'>
              <input type='text'/>
            </div>
          </div>
        </div>
      <div className='addCard'>
        <button className='additionFrame'>
          <span>Add a new card</span>
        </button>

        <select className='filtering'>
          <option>Learned</option>
          <option>Want to Learn</option>
          <option>Noted</option>
        </select>

        <select className='sorting'>
          <option>attribute 1</option>
          <option>attribute 2</option>
          <option>attribute 3</option>
        </select>
      </div>
        <div className='flashCardRow'>
          {cardInfo.map(card => (
            <div className='cardFrame' id={`cardFrame_${card.id}`}>
              <div className='status'>
                <span>Status</span>
              </div>
              <div className="countryFlag">
                <img className='flag' src={card.flag} alt="Country Flag"/>
              </div>
              <div className="countryName" id={`countryName_${card.id}`}>
                <span>{card.countryName}</span>
              </div>
              <div className='question' id={`question_${card.id}`}>
                <p>{card.question}</p>
              </div>
              <div className='dateCreated'>
                <span>Date created</span>
              </div>
              <div className='answerButtonFrame'>
                <button onClick={() => {showAnswer(card)}}><span id='answerButText'>Show answer</span></button>
              </div>
              <div className='modificationOnCard' id={`modificationOnCard_${card.id}`}>
                <button id={`editButton_${card.id}`} onClick={()=>{editCard(card)}}>Edit</button>
                <button onClick={() => {deleteCard(card.id)}}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  export default FlashCardPage;