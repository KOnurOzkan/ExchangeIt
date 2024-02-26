const Chat = ({descendingOrderMessages}) =>{
    return (
        <>
        <div className="chat_display">
            {descendingOrderMessages.map((message,_index) =>(
                <div key ={_index}>
                <div className="chat_message_header">
                    <div className="img_container">
                        <img src={message.img} alt={message.item_name + ' profile'}/>
                    </div>
                    <p>{message.name + ':'}</p>
                </div>
                    <p>{message.message}</p>
                </div>
                ))}
        </div>
        </>
    )

}

export default Chat