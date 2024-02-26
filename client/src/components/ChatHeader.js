import {useCookies} from "react-cookie";

const ChatHeader = ({item}) =>{
    const[cookies,setCookie, removeCookie] = useCookies(['user'])
    const logout = () =>{
        removeCookie('ItemId', cookies.ItemId)
        removeCookie('Token',cookies.Token)
        window.location.reload()

    }
    return (

        <div className="chat_container_header">
        <div className="profile">
            <div className="img_container">
                <img src={item.url} alt={"photo of " + item.item_name}/>
            </div>
            <h3>{item.item_name}</h3>
        </div>
            <i className="log_out_icon" onClick={logout}>←</i>
        </div>
    )

}

export default ChatHeader