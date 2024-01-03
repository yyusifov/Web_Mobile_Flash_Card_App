import "./Home.css";
const Home = () => {
    return <div>
    <h1 className="PageIntro">Welcome to Flash Card Page</h1>
    <div className="aboutMeContainer">
      <div className="aboutMe">
        <p>
          My name is Yadigar Yusifov. I am glad to accommodate you in my Flash Card Page.
          I am a senior Computer Sciences student at ADA University.
          I have done my internship at Div Academy as a back-end mentor.
          I have experience in android development and front-end.
        </p>
      </div>
    </div>
    <div className="projectContainer">
      
      <div className="project">
        <div className="projectInfo">
          <p>
            <h2>Park Application</h2> It is an mobile application. The main purpose of this application is to help people reserve free slots in the parks they want. As a result,
            it prevents time consumption. With the help of this application, you can also view all parks that exist in USA.
            For more info:
          </p>
        </div>
        <div className="projectLink">
          <a href="https://github.com/yyusifov/Park_Application.git" target="_blank">
            Link
          </a>
        </div>
      </div>
      <div className="project">
        <div className="projectInfo">
          <p>
            <h2>Online Bet Application</h2>
            It is an mobile application. With help of this application, you will be able to bet online without wasting your time. It provides you
            with live scores and interactive UI which faciliates betting. For more info:
          </p>
        </div>
        <div className="projectLink">
          <a href="https://github.com/yyusifov/Online-Bet-Application.git" target="_blank">
            Link
          </a>
        </div>        
      </div>
      <div className="project">
        <div className="projectInfo">
          <p>
          <h2>Quiz Application</h2>
            It is an mobile application. In this application, you will have set of questions which you should answer. If you can answer all of them 
            succesfully, you will get full point. After finishing test, you will be able to see your result.
            For more info:
          </p>
        </div>
        <div className="projectLink">
          <a href="https://github.com/yyusifov/Quiz-App.git" target="_blank">
            Link
          </a>
        </div>
      </div>
      <div className="project">
        <div className="projectInfo">
          <p>
          <h2>Portfolio</h2>
            In this web page, you will be able to see my protfolio, and some personal information about me. 
            I also share link to my repositories.
            For more info:
          </p>
        </div>
        <div className="projectLink">
          <a href="https://github.com/yyusifov/Web-Mobile-Portfolio.git" target="_blank">
            Link
          </a>
        </div>
      </div>
      <div className="project">
        <div className="projectInfo">
          <p style={{color:'black'}}>
            <h2>E-Store</h2>
            By fetching data from a predefined API, the web page shows you different products. You can search or filter products. 
            Besides that, the products are divided to different pages.
            For more info:
          </p>
        </div>
        <div className="projectLink">
          <a href="https://github.com/yyusifov/Web-Mobile-E-store.git" target="_blank">
            Link
          </a>
        </div>
      </div>
    </div>
  </div>
};

export default Home;