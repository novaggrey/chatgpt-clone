import './App.css';
import gptLogo from './assets/chatgpt.svg';
import addBtn from './assets/add-30.png';
import msgIcon from './assets/message.svg';
import home from './assets/home.svg';
import saved from './assets/bookmark.svg';
import pro from './assets/rocket.svg';

function App() {
  return (
    <div className="App">
      <div className="sideBar">
        <div className="upperSide">
          <div className="upperSideTop"><img src={gptLogo} alt="Logo" className="logo"/><span className="brand">ChatGPT Clone</span></div>
          <button className="midBtn"><img src={addBtn} alt="New Chat" className="addBtn"/>New Chat</button>
          <div className="upperSideBottom">
            <button className="query"><img src={msgIcon} alt="Query" />What is Euphoria ?</button>
            <button className="query"><img src={msgIcon} alt="Query" />What is the aim of Euphoria ?</button>
          </div>
        </div>
        <div className="lowerSide">
          <div className="listItems"><img src={home} alt="Home" className="listitemsImg" />Home</div>
          <div className="listItems"><img src={saved} alt="Saved" className="listitemsImg" />Saved</div>
          <div className="listItems"><img src={pro} alt="Upgrade" className="listitemsImg" />Upgrade to Pro</div>
        </div>
      </div>
      <div className="main">

      </div>
    </div>
  );
}

export default App;
