import ChatHeader from "./ChatHeader";
import MatchesDisplay from "./MatchesDisplay";
import ChatDisplay from "./ChatDisplay";
import {useState} from "react";
const ChatContainer = ({item}) =>{
    const[clickedItem, setClickedItem] = useState(null)
    return (

        <div className="chat_container">
            <ChatHeader item={item}/>
            <div>
                <button className="option" onClick={() =>setClickedItem(null)}>Matches</button>
                <button className="option" disabled={!clickedItem}>Chat</button>
            </div>
            {!clickedItem && <MatchesDisplay matches={item.matches} setClickedItem={setClickedItem}/>}

            {clickedItem && <ChatDisplay item={item} clickedItem={clickedItem}/>}
        </div>
    )

}

export default ChatContainer