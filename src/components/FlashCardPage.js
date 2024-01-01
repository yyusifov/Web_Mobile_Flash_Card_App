import React, { useEffect, useState } from 'react';
import "./FlashCardPage.css"

const FlashCardPage = () => {
    const [cardInfo, setCardInfo] = useState([]);
    const [dateUpdated, setNewDate] = useState(new Date().toLocaleTimeString());
    const [initalUrl, setUrl] = useState("http://localhost:3000/cards");

    const filterCards = () => {
      const chosenStatus = document.getElementById("filter").value;
      if(chosenStatus === "All"){
        setUrl("http://localhost:3000/cards");
      }
      else{
        const url = "http://localhost:3000/cards?status=" + chosenStatus;
        setUrl(url);
      }
    }

    const showAnswer = (card) => {
      const cardFrame = document.getElementById(`cardFrame_${card.id}`);
      const buttonText = document.getElementById(`answerButText_${card.id}`);
      const answerButtonFrame = document.getElementById(`answerButtonFrame_${card.id}`);
      const modificationOnCard = document.getElementById(`modificationOnCard_${card.id}`);
      const answerFrame = document.getElementById(`answerFrame_${card.id}`);

      if (buttonText.textContent === "Show answer") {
        cardFrame.style.transform = "rotateY(180deg)";
        answerButtonFrame.style.transform = "rotateY(180deg)";
        answerFrame.style.transform = "rotateY(180deg)";
        buttonText.textContent = "Show question";
      } else {
        cardFrame.style.transform = "rotateY(0deg)";
        answerButtonFrame.style.transform = "rotateY(0deg)";
        answerFrame.style.transform = "rotateY(0deg)";
        buttonText.textContent = "Show answer";
      }    

      const childElementsOfCardFrame = cardFrame.children;

      for (const element of childElementsOfCardFrame) {

        if(buttonText.textContent === "Show question" && element !== answerButtonFrame){
          element.style.display = 'none';
          answerFrame.style.display = 'flex';
        }
        else {
          
          element.style.display = "flex";
          
          answerFrame.style.display = "none";

          cardFrame.addEventListener("mouseenter", () => {
            modificationOnCard.style.display = "flex";
          });
          
          cardFrame.addEventListener("mouseleave", () => {
            modificationOnCard.style.display = "none";
          });
        }
      }
    };

    const editCard = (card) => {   
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
          countryName: "countryName",
          flag: card.flag,
          question: "questionForCard",
          answer: card.answer,
          status: card.status
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
        status: card.status
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

        const changeTimeAfterEdit = new Date().toLocaleTimeString();
        setNewDate(changeTimeAfterEdit);
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
      fetch(initalUrl)
        .then(response => response.json())
        .then(data => {
          for(let i = 0; i < data.length; i++){
            console.log(data[i].countryName + "\n" + data[i].flag + "\n" + data[i].capital);
          }
          setCardInfo(data);
        })
        .catch(error => console.error('Error fetching JSON:', error));
    }, [initalUrl]);

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

        <select className='filtering' id="filter" onChange={filterCards}>
          <option>All</option>
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
                <span>{card.status}</span>
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
                <span>{dateUpdated}</span>
              </div>
              <div className="answerFrame" id={`answerFrame_${card.id}`}>
                <span id={`answer_${card.id}`}>{card.answer}</span>
              </div>
              <div id={`answerButtonFrame_${card.id}`}>
                <button onClick={() => {showAnswer(card)}}><span id={`answerButText_${card.id}`}>Show answer</span></button>
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