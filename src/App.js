import './App.css';
import gptLogo from './assets/chatgpt.svg';
import addBtn from './assets/add-30.png';
import msgIcon from './assets/message.svg';
import home from './assets/home.svg';
import saved from './assets/bookmark.svg';
import pro from './assets/rocket.svg';
import sendBtn from './assets/send.svg';
import chatBtn from './assets/chatgptLogo.svg';
import userIcon from './assets/me01.jpg';

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
          <div className="listItems"><img src={home} alt="Home" className="listItemsImg" />Home</div>
          <div className="listItems"><img src={saved} alt="Saved" className="listItemsImg" />Saved</div>
          <div className="listItems"><img src={pro} alt="Upgrade" className="listItemsImg" />Upgrade to Pro</div>
        </div>
      </div>
      <div className="main">
        <div className="chats">
          <div className="chat"><img src={userIcon} alt="ChatGPT" className="chatImg" />
            <p className="txt">Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
          </div>
          <div className="chat bot"><img src={chatBtn} alt="User" className="chatImg" />
            <p className="txt">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem saepe ratione sed unde beatae nemo iure voluptate doloribus minima reprehenderit illum sint autem explicabo voluptatem natus optio repellendus, dicta nulla, sapiente assumenda illo quaerat! Culpa neque deserunt beatae doloremque recusandae, quisquam quod dolor obcaecati possimus iusto, praesentium, velit quibusdam autem laborum dolorem nobis illum voluptatibus. Voluptates numquam tempora aperiam nulla, modi quas nobis similique? Quaerat saepe animi sequi expedita unde fugiat voluptatibus nulla suscipit error reprehenderit tempora officia amet voluptatem aliquam, illo eaque debitis quos alias praesentium repellat beatae quo. Eius error fugiat placeat ipsam hic deserunt aspernatur est beatae?</p>
          </div>
        </div>
        <div className="chatFooter">
          <div className="inp">
            <input type="text" placeholder='Send a Message'/><button className="send"><img src={sendBtn} alt="Send" /></button>
          </div>
          <p>ChatGPT may produce inaccurate information about people, places, or facts. ChatGPT October 05 Version</p>
        </div>
      </div>
    </div>
  );
}

export default App;
