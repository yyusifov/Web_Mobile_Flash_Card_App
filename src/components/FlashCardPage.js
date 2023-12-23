import searchCardIcon from "../assets/searchCardIcon.svg"
const FlashCardPage = () => {
    return (
      <div className='flashCardPage'>
        <div className='searchBar'>
          <div className='searchFrame'>
            <div className='icon'>
              <img src={searchCardIcon} alt='Search Icon' />
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
            <div className='modificationOnCard'>
              <button>
                Edit
              </button>
              <button>
                Delete
              </button>
            </div>
          </div>

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
            <div className='modificationOnCard'>
              <button>
                Edit
              </button>
              <button>
                Delete
              </button>
            </div>
          </div>

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
            <div className='modificationOnCard'>
              <button>
                Edit
              </button>
              <button>
                Delete
              </button>
            </div>
          </div>

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
            <div className='modificationOnCard'>
              <button>
                Edit
              </button>
              <button>
                Delete
              </button>
            </div>
          </div>

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
            <div className='modificationOnCard'>
              <button>
                Edit
              </button>
              <button>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default FlashCardPage;