
import {useEffect, useState} from "react";
import TinderCard from "react-tinder-card";
import{useCookies} from "react-cookie";
import ChatContainer from "../components/ChatContainer";
import axios from "axios";

const Dashboard = () => {

    const[cookies,setCookie, removeCookie] = useCookies(['user'])
    const[itemsWithType,setItemsWithType] = useState(null)
    const[item,setItem] = useState(null)
    const itemId = cookies.ItemId

    const getItem = async () =>{
        try{
            const response = await axios.get('http://localhost:8000/item',{
                params:{itemId}
            })
            setItem(response.data)
        } catch (err){
            console.log(err)
        }
    }
    const getItemsWithType = async () =>{
        try{
            const response = await axios.get('http://localhost:8000/items_with_type',{
                params:{item_type: item?.item_interest}
            })
            setItemsWithType(response.data)
        }catch (err){
            console.log(err)
        }
    }
    useEffect(() =>{
        getItem()
        getItemsWithType()
    },[item, itemsWithType])
    console.log(item)
    const characters = [
        {
            name: 'Richard Hendricks',
            url: 'https://static.nadirkitap.com/fotograf/108863/26/Kitap_202203211509471088639.jpg'
        },
        {
            name: 'Erlich Bachman',
            url: 'https://static.nadirkitap.com/fotograf/108863/26/Kitap_202203211509471088639.jpg'
        },
        {
            name: 'Monica Hall',
            url: 'https://i.imgur.com/oPj4A8u.jpeg'
        },
        {
            name: 'Jared Dunn',
            url: 'https://i.imgur.com/oPj4A8u.jpeg'
        },
        {
            name: 'Dinesh Chugtai',
            url: 'https://i.imgur.com/oPj4A8u.jpeg'
        }
    ]
    const [lastDirection, setLastDirection] = useState()

    const updateMatches = async (matchedItemId) =>{
        try{
            await axios.put('http://localhost:8000/addmatch',{
                itemId,
                matchedItemId
            })
            getItem()
        }catch (err){
            console.log(err)
        }
    }
    console.log(item)
    const swiped = (direction, swipedItemId) => {
        if(direction === 'right'){
            updateMatches(swipedItemId)
        }
        setLastDirection(direction)
    }

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
    }

    const matchedItemIds = item?.matches?.map(({item_id}) => item_id).concat(itemId)
    const filteredItemsWithType = itemsWithType?.filter(
        itemWithType => !matchedItemIds?.includes(itemWithType.item_id)
    )
    return (
        <>
            {item && <div className="dashboard">
            <ChatContainer item = {item}/>
            <div className="swiper_container">
                <div className="card_container">
                    {filteredItemsWithType?.map((itemWithType) =>
                        <TinderCard className='swipe' key={itemWithType.item_id} onSwipe={(dir) => swiped(dir, itemWithType.item_id)} onCardLeftScreen={() => outOfFrame(itemWithType.item_name)}>
                            <div style={{ backgroundImage: 'url(' + itemWithType.url + ')' }} className='card'>
                                <h3>{itemWithType.item_name}</h3>
                            </div>
                        </TinderCard>
                    )}
                    <div className="swipe_info">
                        {lastDirection ? <p>You swiped {lastDirection}</p>: <p/>}
                    </div>
                </div>
            </div>
        </div>}
        </>
    );
}
export default Dashboard