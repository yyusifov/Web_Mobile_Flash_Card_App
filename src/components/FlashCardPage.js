import React, { useEffect, useState } from 'react';
import "./FlashCardPage.css"

const FlashCardPage = () => {
    const [cardInfo, setCardInfo] = useState([]);
    const [dateUpdated, setNewDate] = useState();
    const [initalUrl, setUrl] = useState("http://localhost:3000/cards");

    const searchCard = () => {
      const searchValue = document.getElementById("searchedValue").value;
      if(searchValue.trim() === ""){
        setUrl("http://localhost:3000/cards");
      }
      else{
        const url = "http://localhost:3000/cards?q=" + searchValue;
        setUrl(url);
      }
    }

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

      const changeTimeAfterEdit = new Date().getTime();
      setNewDate(changeTimeAfterEdit); 
      
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
          Field: card.Field,
          imgField: card.imgField,
          question: "questionForCard",
          answer: card.answer,
          status: card.status, 
          modificationDate: dateUpdated
        };        

        updateOnFlashCardPage(updatedData);
      }
    };

    const updateOnFlashCardPage = (card) => {
      const questionForCard = document.getElementById(`question_${card.id}`).textContent;
    
      const updatedData = {
        id: card.id,
        Field: card.Field,
        imgField: card.imgField,
        question: questionForCard,
        status: card.status,
        modificationDate: dateUpdated
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
      fetch(initalUrl)
        .then(response => response.json())
        .then(data => {
          for(let i = 0; i < data.length; i++){
            console.log(data[i].countryName + "\n" + data[i].flag + "\n" + data[i].capital);
          }
          setCardInfo(data);
        })
        .catch(error => console.error('Error fetching JSON:', error));
    }, [initalUrl, cardInfo]);

    return (
      <div className='flashCardPage'>
        <div className='searchBar'>
          <div className='searchFrame'>
            <div onClick={searchCard} className='icon'>
              <img id="searchCard" src={require("../assets/searchCardIcon.svg").default} alt='Search Icon' />
            </div>
            <div className='inputText'>
              <input id="searchedValue" type='text'/>
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
          <option>Last Modified</option>
          <option>attribute 2</option>
          <option>attribute 3</option>
        </select>
      </div>
          {cardInfo.map((card, index) => {
              if ((index) % 5 === 0) {
                return (
                  <div className='flashCardRow' key={`row_${index}`}>
                    {[0, 1, 2, 3, 4].map(offset => {
                      const cardIndex = index + offset;
                      if (cardInfo[cardIndex]) {
                        return (
                          <div className='cardFrame' id={`cardFrame_${cardInfo[cardIndex].id}`} key={`card_${cardInfo[cardIndex].id}`}>
                            <div className='status'>
                              <span>{cardInfo[cardIndex].status}</span>
                            </div>
                            <div className="fieldImage">
                              <img className='imgF' src={cardInfo[cardIndex].imgField} alt="Field Image"/>
                            </div>
                            <div className="countryName" id={`countryName_${cardInfo[cardIndex].id}`}>
                              <span>{cardInfo[cardIndex].Field}</span>
                            </div>
                            <div className='questionFrame' id={`question_${cardInfo[cardIndex].id}`}>
                              <p>{cardInfo[cardIndex].question}</p>
                            </div>
                            <div className='dateCreated'>
                              <span>{new Date(cardInfo[cardIndex].modificationDate).toLocaleString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: true,
                              })}</span>
                            </div>
                            <div className="answerFrame" id={`answerFrame_${cardInfo[cardIndex].id}`}>
                              <span id={`answer_${cardInfo[cardIndex].id}`}>{cardInfo[cardIndex].answer}</span>
                            </div>
                            <div id={`answerButtonFrame_${cardInfo[cardIndex].id}`}>
                              <button onClick={() => {showAnswer(cardInfo[cardIndex])}}><span id={`answerButText_${cardInfo[cardIndex].id}`}>Show answer</span></button>
                            </div>
                            <div className='modificationOnCard' id={`modificationOnCard_${cardInfo[cardIndex].id}`}>
                              <button id={`editButton_${cardInfo[cardIndex].id}`} onClick={()=>{editCard(cardInfo[cardIndex])}}>Edit</button>
                              <button onClick={() => {deleteCard(cardInfo[cardIndex].id)}}>Delete</button>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                );
              }
          })}

      </div>
    );
  };

  export default FlashCardPage;