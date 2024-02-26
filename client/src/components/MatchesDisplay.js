import axios from "axios";
import {useEffect, useState} from "react";

const MatchesDisplay = ({matches, setClickedItem}) =>{
    const [matchedProfiles, setMatchedProfiles] = useState(null)
    const matchedItemIds = matches.map(({item_id}) => item_id)


    const getMatches = async () =>{
        try{
            const response = await axios.get('http://localhost:8000/items',{
                params: {itemIds: JSON.stringify(matchedItemIds)}

            })
            setMatchedProfiles(response.data)
        }catch (err){
            console.log(err)
        }

    }
    useEffect(() => {
        getMatches()
    }, [matches]);


    return (

        <div className="matches_display">
            {matchedProfiles?.map((match, _index) => (
                <div key={{_index}}
                     className="match_card"
                     onClick={() => setClickedItem(match)}>
                    <div className="img_container">
                        <img src={match?.url} alt={match?.item_name + ' profile'}/>
                    </div>
                    <h3>{match?.item_name}</h3>
                </div>
            ))}


        </div>
    )

}

export default MatchesDisplay