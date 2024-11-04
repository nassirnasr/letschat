import { useState } from "react"
import "./ChatList.css"
import AddUser from "./addUser/AddUser"
const ChatList = () => {
    const [addMode,setAddMode] = useState(false) // changing add img to minus img 
  return (
    <div className='chatList'>
        <div className="search">
            <div className="searchBar">
                <img src="./search.png" alt="" />
                <input type="text" placeholder="Search"/>
            </div>
            <img src={addMode ? "./minus.png" : "./plus.png"} alt="" className="add"
            onClick={()=>setAddMode(prev=>!prev)}
            />
        </div>
        <div className="item">
          <img src="./avatar.png" alt=""/>
          <div className="texts">
            <span >Saleh Fedha</span>
            <p>Assalam aleikum</p>
          </div>
        </div>
        <div className="item">
          <img src="./avatar.png" alt=""/>
          <div className="texts">
            <span >Saleh Fedha</span>
            <p>Assalam aleikum</p>
          </div>
        </div>
        <div className="item">
          <img src="./avatar.png" alt=""/>
          <div className="texts">
            <span >Saleh Fedha</span>
            <p>Assalam aleikum</p>
          </div>
        </div>
        <div className="item">
          <img src="./avatar.png" alt=""/>
          <div className="texts">
            <span >Saleh Fedha</span>
            <p>Assalam aleikum</p>
          </div>
        </div>
        <div className="item">
          <img src="./avatar.png" alt=""/>
          <div className="texts">
            <span >Saleh Fedha</span>
            <p>Assalam aleikum</p>
          </div>
        </div>
        <div className="item">
          <img src="./avatar.png" alt=""/>
          <div className="texts">
            <span >Saleh Fedha</span>
            <p>Assalam aleikum</p>
          </div>
        </div>
        {addMode && <AddUser/>}
    </div>
  )
}

export default ChatList