import ChatInput from "./ChatInput";
import Chat from "./Chat";
import axios from "axios";
import {useEffect, useState} from "react";
const ChatDisplay = ({item,clickedItem}) =>{
    const itemId = item?.item_id
    const clickedItemId = clickedItem?.item_id
    const[itemMessages,setItemsMessages] = useState(null)
    const[clickedItemMessages,setClickedItemsMessages] = useState(null)
    const getItemsMessages = async () =>{
        try{
        const response = await axios.get('http://localhost:8000/messages', {
            params: {itemId: itemId, correspondingItemId: clickedItemId}
        })
        setItemsMessages(response.data)
        }catch (err){
            console.log(err)
        }
    }
    const getClickedItemsMessages = async () =>{
        try{
            const response = await axios.get('http://localhost:8000/messages', {
                params: {itemId: clickedItemId, correspondingItemId: itemId}
            })
            setClickedItemsMessages(response.data)
        }catch (err){
            console.log(err)
        }
    }

    useEffect(() => {
        getItemsMessages()
        getClickedItemsMessages()
    }, []);

    const messages = []

    itemMessages?.forEach(message => {
        const formattedMessage = {}
        formattedMessage['name'] = item?.item_name
        formattedMessage['img'] = item?.url
        formattedMessage['message'] = message.message
        formattedMessage['timestamp'] = message.timestamp
        messages.push(formattedMessage)
    })
    clickedItemMessages?.forEach(message => {
        const formattedMessage = {}
        formattedMessage['name'] = clickedItem?.item_name
        formattedMessage['img'] = clickedItem?.url
        formattedMessage['message'] = message.message
        formattedMessage['timestamp'] = message.timestamp
        messages.push(formattedMessage)
    })

    const descendingOrderMessages = messages?.sort((a,b) => a.timestamp.localeCompare(b.timestamp))

    return (
        <>
        <Chat descendingOrderMessages={descendingOrderMessages}></Chat>
        <ChatInput
            item = {item}
            clickedItem = {clickedItem}
            getItemsMessages = {getItemsMessages}
            getClickedItemsMessages = {getClickedItemsMessages}/>
        </>
    )

}

export default ChatDisplay