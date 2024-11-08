import { useEffect, useState } from "react";
import "./ChatList.css";
import AddUser from "./addUser/AddUser";
import { useUserStore } from "../../../lib/userStore";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useChatStore } from "../../../lib/chatStore";

const ChatList = () => {
    const [addMode, setAddMode] = useState(false); // changing add img to minus img
    const [chats, setChats] = useState([]);
    const { currentUser } = useUserStore(); // call current user
    const { chatId, changeChat } = useChatStore();

    useEffect(() => {
        // Run only if currentUser is defined
        if (!currentUser?.id) return;

        const unSub = onSnapshot(doc(db, "userchats", currentUser.id), async (res) => {
            const items = res.data()?.chats || [];

            const promises = items.map(async (item) => {
                const userDocRef = doc(db, "users", item.receiverId);
                const userDocSnap = await getDoc(userDocRef);
                const user = userDocSnap.data();

                return { ...item, user };
            });

            const chatData = await Promise.all(promises);
            // Sort chats by updatedAt timestamp
            setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
        });

        return () => {
            unSub();
        };
    }, [currentUser?.id]);

    const handleSelect = async (chat) => {
      const userChats = chats.map(item=>{
        const {user, ...rest} = item;
        return rest;
      });
      const chatIndex = userChats.findIndex(item=>item.chatId === chat.chatId)

      userChats[chatIndex].isSeen = true;

      const userChatRef = doc(db,"userchats", currentUser.id);

      try {
        await updateDoc(userChatRef, {
          chats:userChats,
        });
        changeChat(chat.chatId, chat.user);
      } catch (err) {
        console.log(err)
        
      }

      
  };
  

    return (
        <div className="chatList">
            <div className="search">
                <div className="searchBar">
                    <img src="./search.png" alt="Search Icon" />
                    <input type="text" placeholder="Search" />
                </div>
                <img
                    src={addMode ? "./minus.png" : "./plus.png"}
                    alt="Toggle Add User"
                    className="add"
                    onClick={() => setAddMode((prev) => !prev)}
                />
            </div>

            {/* Display chats */}
            {chats.map((chat) => (
                <div className="item" 
                key={chat.chatId} 
                onClick={() => handleSelect(chat)}
                style={{
                  backgroundColor:chat.isSeen ? "transparent" :"#5183fe"
                }}>
                    <img src={chat.user?.avatar || "./avatar.png"} alt="User Avatar" />
                    <div className="texts">
                        <span>{chat.user?.username || "Unknown User"}</span>
                        <p>{chat.lastMessage || "No message available"}</p>
                    </div>
                </div>
            ))}

            {/* AddUser component displayed when addMode is true */}
            {addMode && <AddUser />}
        </div>
    );
};

export default ChatList;
