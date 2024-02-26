import {useState} from "react";
import axios from "axios";
const ChatInput = ({item, clickedItem, getItemsMessages, getClickedItemsMessages}) =>{
    const [textArea, setTextArea] = useState(null)
    const itemId = item?.item_id
    const clickedItemId = clickedItem?.item_id

    const addMessage = async () =>{
        const message = {
            timestamp: new Date().toISOString(),
            from_itemId: itemId,
            to_itemId: clickedItemId,
            message: textArea
        }
        try{
            await axios.post('http://localhost:8000/message',{message})
            getItemsMessages()
            getClickedItemsMessages()
            setTextArea('')
        }catch (err){
            console.log(err)
        }
    }

    return (

        <div className="chat_input">
            <textarea value={textArea} onChange={(e) => setTextArea(e.target.value)}/>
            <button className="secondaryBtn" onClick={addMessage}>Submit</button>
        </div>
    )

}

export default ChatInput