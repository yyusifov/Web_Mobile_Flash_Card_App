import "./Contact.css"

const sendMessage = () => {
    message = {};
    fetch('http://localhost:3000/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({message})
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
    return <h1>Hello</h1>
};

const Contact = () => {
    return (
        <div className="contactBody">
            <div className="contactForm">
                <form id="conForm">
                    <label for="subject">Subject</label>
                    <input id="subject" type="text" placeholder={"Insert Subject"}/>

                    <label for="emailText">Email</label>
                    <input id="emailText" type="email" placeholder={"Insert Email"}/>

                    <label for="messageContent">Content</label>
                    <input id="messageContent" type="text" placeholder={"Insert Content"}/>

                    <input type="submit" onClick={sendMessage}/>
                </form>
            </div>
        </div>
    );
};

export default Contact;