import React, { useEffect, useState } from 'react';
import "./FlashCardPage.css"


const FlashCardPage = () => {

    const [cardInfo, setCardInfo] = useState([]);
    useEffect(() => {
      fetch('http://localhost:3000/Countries')
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
            <div className='cardFrame'>
              <div className='status'>
                <span>Status</span>
              </div>
              <div className="countryFlag">
                <img className='flag' src={card.flag} alt="Country Flag"/>
              </div>
              <div className="countryName">
                <span>{card.countryName}</span>
              </div>
              <div className='question'>
                <p>What is the capital of {card.countryName}</p>
              </div>
              <div className='dateCreated'>
                <span>Date created</span>
              </div>
              <div className='modificationOnCard'>
                <button>
                  Edit
                </button>
                <button>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  export default FlashCardPage;