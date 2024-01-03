import React, { useEffect, useState } from 'react';
import "./FlashCardPage.css"

const FlashCardPage = () => {
    const [cardInfo, setCardInfo] = useState([]);
    const [lastId, setId] = useState("");
    const [dateUpdated, setNewDate] = useState();
    const [searchValue, setSearchValue] = useState("");
    const [filterValue, setFilterValue] = useState("All");
    const [sortValue, setSortValue] = useState("_sort=modificationDate&_order=desc");
    const [initalUrl, setUrl] = useState("http://localhost:3000/cards?_sort=modificationDate&_order=desc");

    const setEnvForNewCard = () => {
      document.getElementById("newCard").style.display = "flex";

      document.getElementById("flashCardCon").style.display = "none";
    }
    
    const addNewCard = () => {

      const changeTimeAfterEdit = new Date().getTime();

      const question = document.getElementById("questionID").value;

      const answer = document.getElementById("answerID").value;

      const field = document.getElementById("fieldChoice").value;

      let imgFieldT = "";
      if(field === "Math"){
        imgFieldT = "/fieldImages/Math.png";
      }
      else if(field === "Literature"){
        imgFieldT = "/fieldImages/Literature.jpeg";
      }
      else if(field === "Sociology"){
        imgFieldT = "/fieldImages/Sociology.png";
      }
      else if(field === "Physics"){
        imgFieldT = "/fieldImages/Physics.jpg";
      }
      else{
        imgFieldT = "/fieldImages/Chemistry.jpeg";
      }

      setId((parseInt(lastId) + 1).toString());
      
      var newObject = {
        id: lastId,
        Field: field,
        imgField: imgFieldT,
        question: question,
        answer: answer,
        status: "Want to Learn", 
        modificationDate: changeTimeAfterEdit
      };

      fetch('http://localhost:3000/cards?_sort=modificationDate&_order=desc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newObject),
      })
      .then(response => response.json())
      .then(addedDataFromServer => {
        console.log('Data added on the server:', addedDataFromServer);
        fetch(initalUrl)
          .then(response => response.json())
          .then(data => {
            setCardInfo(data);
          })
          .catch(error => console.error('Error fetching JSON:', error));
      })
      .catch(err => console.error('Error: ', err));

      document.getElementById("newCard").style.display = "none";

      document.getElementById("flashCardCon").style.display = "flex";
    }

    const sortCards = () => {

      const valueToBeSorted = document.getElementById("sort").value;

      setSortValue(valueToBeSorted);

      if (valueToBeSorted === "Newest") {
        setSortValue("_sort=modificationDate&_order=desc");
        if(filterValue === "All"){
          const url = "http://localhost:3000/cards?q=" + searchValue + "&" + "_sort=modificationDate&_order=desc";
          setUrl(url);
        }
        else{
          const url = "http://localhost:3000/cards?q=" + searchValue + "&status=" + filterValue + "&" + "_sort=modificationDate&_order=desc";
          setUrl(url);
        }

      } else if (valueToBeSorted === "Oldest") {
        setSortValue("_sort=modificationDate&_order=asc");
        if(filterValue === "All"){
          const url = "http://localhost:3000/cards?q=" + searchValue + "&" + "_sort=modificationDate&_order=asc";
          setUrl(url);
        }
        else{
          const url = "http://localhost:3000/cards?q=" + searchValue + "&status=" + filterValue + "&" + "_sort=modificationDate&_order=asc";
          setUrl(url);
        }
      }

    };
    

    const searchCard = () => {
      const searchValue1 = document.getElementById("searchedValue").value;
      setSearchValue(searchValue1);
      const url = "http://localhost:3000/cards?q=" + searchValue1 + "&_sort=modificationDate&_order=desc";
      setUrl(url);
      document.getElementById("sort").value = "Newest";
      document.getElementById("filter").value = "All";
    }

    const filterCards = () => {
      const chosenStatus = document.getElementById("filter").value;
      setFilterValue(chosenStatus);
      if(chosenStatus === "All"){
        const url = "http://localhost:3000/cards?q=" + searchValue + "&" + sortValue;
        setUrl(url);
      }
      else{
        const url = "http://localhost:3000/cards?q=" + searchValue + "&status=" + chosenStatus + "&" + sortValue;
        setUrl(url);
        setCardInfo(cardInfo => cardInfo.filter(card => {
          return card.status === chosenStatus;
        }));
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
        modificationOnCard.style.transform = "rotateY(180deg)";
        buttonText.textContent = "Show question";
      } else {
        cardFrame.style.transform = "rotateY(0deg)";
        answerButtonFrame.style.transform = "rotateY(0deg)";
        answerFrame.style.transform = "rotateY(0deg)";
        modificationOnCard.style.transform = "rotateY(0deg)";
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
    
        document.getElementById(`answer_${card.id}`).contentEditable = true;
    
        document.getElementById(`question_${card.id}`).contentEditable = true;
        
        document.getElementById(`statusDefiner_${card.id}`).style.display = "flex";

        document.getElementById(`currentStatus_${card.id}`).style.display = "none";
      }
      else{
        document.getElementById(`editButton_${card.id}`).textContent = "Edit";
    
        document.getElementById(`answer_${card.id}`).contentEditable = false;
    
        document.getElementById(`statusDefiner_${card.id}`).style.display = "none";

        document.getElementById(`question_${card.id}`).contentEditable = false;

        document.getElementById(`currentStatus_${card.id}`).style.display = "flex";

    
        const updatedData = {
          id: card.id,
          Field: card.Field,
          imgField: card.imgField,
          question: "questionForCard",
          answer: "answerForCard",
          status: card.status, 
          modificationDate: dateUpdated
        };        

        updateOnFlashCardPage(updatedData);
      }
    };

    const updateOnFlashCardPage = (card) => {
      const questionForCard = document.getElementById(`question_${card.id}`).textContent;

      const answerForCard = document.getElementById(`answer_${card.id}`).textContent;

      let status = card.status;
      if(document.getElementById(`wantToLearn_${card.id}`).checked){
        status = "Want to Learn";
      }
      else if(document.getElementById(`Learned_${card.id}`).checked){
        status = "Learned";
      }
      else if(document.getElementById(`Noted_${card.id}`).checked){
        status = "Noted";
      }

      const updatedData = {
        id: card.id,
        Field: card.Field,
        imgField: card.imgField,
        question: questionForCard,
        answer: answerForCard,
        status: status,
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
          fetch(initalUrl)
          .then(response => response.json())
          .then(data => {
            setCardInfo(data);
          })
          .catch(error => console.error('Error fetching JSON:', error));
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
          var maxId = 0;
          for(let i = 0; i < data.length; i++){
            if(maxId < parseInt(data[i].id)){
              maxId = parseInt(data[i].id);
            }
            console.log(data[i].countryName + "\n" + data[i].flag + "\n" + data[i].capital);
          }
          setCardInfo(data);
          if(initalUrl === "http://localhost:3000/cards?_sort=modificationDate&_order=desc"){
            setId((maxId + 1).toString());
          }
        })
        .catch(error => console.error('Error fetching JSON:', error));
    }, [initalUrl]);

    return (
      <div className='flashCardPage'>
        <div className='searchBar'>
          <div className='searchFrame'>
            <div onClick={searchCard} className='icon'>
              <img id="searchCard" src={require("../assets/searchCardIcon.svg").default} alt='Search Icon' />
            </div>
            <div className='inputText'>
              <input id="searchedValue" placeholder="Search" type='text'/>
            </div>
          </div>
        </div>
      <div className='addCard'>
        <button className='additionFrame' onClick={setEnvForNewCard}>
          <span className='newCard'>Add a new card</span>
        </button>

        <select className='filtering' id="filter" onChange={filterCards}>
          <option>All</option>
          <option>Learned</option>
          <option>Want to Learn</option>
          <option>Noted</option>
        </select>

        <select className='sorting' id="sort" onChange={sortCards}>
          <option>Newest</option>
          <option>Oldest</option>
        </select>
      </div>

      <div id='newCard'>
        <span>New Card</span>
        <input id="questionID" type='text' placeholder='Question'/>
        <input id="answerID" type='text' placeholder='Answer'/>
        <select id='fieldChoice'>
          <option>Math</option>
          <option>Chemistry</option>
          <option>Physics</option>
          <option>Literature</option>
          <option>Sociology</option>
        </select>
        <button id="saveCard" onClick={addNewCard}>Add a card</button>
      </div>
        <div id='flashCardCon'>
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
                              <span id={`currentStatus_${cardInfo[cardIndex].id}`}>{cardInfo[cardIndex].status}</span>
                              <div className="statusDefiner" id={`statusDefiner_${cardInfo[cardIndex].id}`}>
                                <div className='radioInput'>
                                  <input class="radioType" type='radio' id={`wantToLearn_${cardInfo[cardIndex].id}`} name={`setStatus_${cardInfo[cardIndex].id}`}/>
                                  <label for={`wantToLearn_${cardInfo[cardIndex].id}`}>Want to Learn</label>
                                </div>
                                <div className='radioInput'>
                                  <input class="radioType" type='radio' id={`Learned_${cardInfo[cardIndex].id}`} name={`setStatus_${cardInfo[cardIndex].id}`}/>
                                  <label for={`Learned_${cardInfo[cardIndex].id}`}>Learned</label>
                                </div>
                                <div className='radioInput'>
                                  <input class="radioType" type='radio' id={`Noted_${cardInfo[cardIndex].id}`} name={`setStatus_${cardInfo[cardIndex].id}`}/>
                                  <label for={`Noted_${cardInfo[cardIndex].id}`}>Noted</label>
                                </div>
                              </div>
                            </div>
                            <div className="fieldImage">
                              <img className='imgF' src={cardInfo[cardIndex].imgField} alt="Field Image"/>
                            </div>
                            <div className="fieldName" id={`fieldName_${cardInfo[cardIndex].id}`}>
                              <span>{cardInfo[cardIndex].Field}</span>
                            </div>
                            <div className='questionFrame' id={`question_${cardInfo[cardIndex].id}`}>
                              <p className='quest'>{cardInfo[cardIndex].question}</p>
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
                              <button className="showAns" onClick={() => {showAnswer(cardInfo[cardIndex])}}><span className="answerBut" id={`answerButText_${cardInfo[cardIndex].id}`}>Show answer</span></button>
                            </div>
                            <div className='modificationOnCard' id={`modificationOnCard_${cardInfo[cardIndex].id}`}>
                              <button className="editDelBut" id={`editButton_${cardInfo[cardIndex].id}`} onClick={()=>{editCard(cardInfo[cardIndex])}}>Edit</button>
                              <button className="editDelBut" onClick={() => {deleteCard(cardInfo[cardIndex].id)}}>Delete</button>
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
      </div>
    );
  };

  export default FlashCardPage;