import "./Contact.css"

const postMessage = (subject, email, messageContent) => {
    const message = {
      subject: subject,
      email: email,
      messageContent: messageContent
    };
  
    fetch('http://localhost:3000/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
  
  };
    
  const clickSubmit = (e) => {
    e.preventDefault();

    const subject = document.getElementById("subject").value;

    const Email = document.getElementById("emailText").value;

    const messageContent = document.getElementById("messageContent").value;

    console.log(subject + "\n" + Email + "\n" + messageContent);
    alert("Message was sent!");
    postMessage(subject, Email, messageContent);
  }

const Contact = () => {
    return (
        <div className="contactBody">
            <div className="contactForm">
                <form id="conForm">
                    <label htmlFor="subject">Subject</label>
                    <input id="subject" type="text" placeholder={"Insert Subject"} required/>

                    <label htmlFor="emailText">Email</label>
                    <input id="emailText" type="email" placeholder={"Insert Email"} required/>

                    <label htmlFor="messageContent">Content</label>
                    <input id="messageContent" type="text" placeholder={"Insert Content"} required/>

                    <input type="submit" onClick={clickSubmit}/>
                </form>
            </div>
        </div>
    );
};

export default Contact;