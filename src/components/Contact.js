import "./Contact.css"
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

                    <input type="submit"/>
                </form>
            </div>
        </div>
    );
};

export default Contact;