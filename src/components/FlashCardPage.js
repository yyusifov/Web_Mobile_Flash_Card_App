import React, { useEffect, useState } from 'react';
import "./FlashCardPage.css"



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
      flag: `/countryFlags/Flag_of_${card.countryName}.svg`,
      question:questionForCard,
      capital: card.capital
    };

    updateOnFlashCardPage(updatedData)
  }
};

const updateOnFlashCardPage = (card) => {
  const countryName = document.getElementById(`countryName_${card.id}`).textContent;
  const questionForCard = document.getElementById(`question_${card.id}`).textContent;

  const updatedData = {
    id: card.id,
    countryName: countryName,
    flag: `/countryFlags/Flag_of_${card.countryName}.svg`,
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
    .catch(error => console.error('Error updating data on the server:', error))
};
/*
const deleteCard = (cardId, cardInfo) => {
  const isolatedListFromPreviousElement = cardInfo.filter((card) => {card.id !== cardId})
  

}
*/

const FlashCardPage = () => {

    const [cardInfo, setCardInfo] = useState([]);
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
    }, []);

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
            <div className='cardFrame' id='cardFrame'>
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
              <div className='modificationOnCard' id={`modificationOnCard_${card.id}`}>
                <button id={`editButton_${card.id}`} onClick={()=>{editCard(card)}}>Edit</button>
                <button>Delete</button>

                {/*<button onClick={() => {deleteCard(card.id, cardInfo)}}>Delete</button>*/}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  export default FlashCardPage;