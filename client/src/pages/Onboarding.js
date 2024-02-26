import {useState} from "react";
import Nav from "../components/Nav";
import{useCookies} from "react-cookie";
import axios from "axios";
import {useNavigate} from "react-router-dom";



const Onboarding = () => {
    const[cookies,setCookie,removeCookie] = useCookies(['user'])
    const[formData,setFormData] = useState({
        item_id: cookies.ItemId,
        item_name:"",
        item_type:"Vehicle",
        price:"",
        about:"",
        item_interest:"Vehicle",
        url:"",
        matches:[]
        }
    )
    const navigate = useNavigate()
    const handleSubmit = async (e) =>{
        console.log("submitted")
        e.preventDefault()
        try{
            const response = await axios.put('http://localhost:8000/item', {formData})
            const success = response.status === 200
            if (success) navigate('/dashboard')
        }catch (err){
            console.log(err)
        }
    }
    const handleChange = (e) =>{
        console.log(e)
        const value = e.target.value
        const name = e.target.name
        console.log('value' + value + 'name' + name)

        setFormData((prevState) => ({
            ...prevState,
            [name] : value
        }))
    }
    console.log(formData)
    return (
        <>
            <Nav
                minimal={true}
                setShowModal = {() => {}}
                showModal={false}
                />
        <div className="onboarding">
            <h2>CREATE ACCOUNT</h2>
            <form onSubmit={handleSubmit}>
                <section>
                    <label htmlFor="item_name">Item Name</label>
                    <input
                        id="item_name"
                        type="text"
                        name="item_name"
                        placeholder="Item Name"
                        required={true}
                        value={formData.item_name}
                        onChange={handleChange}
                    />
                    <label htmlFor="price">Approximate Price(In U.S Dollars)</label>
                    <input
                        id="item_name"
                        type="number"
                        name="price"
                        placeholder="Item Price"
                        required={true}
                        value={formData.price}
                        onChange={handleChange}
                    />
                    <label>Type</label>
                    <div className="multiple-input-container">
                        <input
                            id="vehicle_item_type"
                            type="radio"
                            name="item_type"
                            required={true}
                            value="vehicle"
                            onChange={handleChange}
                            checked={formData.item_type === "vehicle"}
                        />
                        <label htmlFor="vehicle_item_type">Vehicle</label>
                        <input
                            id="electronics_item_type"
                            type="radio"
                            name="item_type"
                            required={true}
                            value="electronics"
                            onChange={handleChange}
                            checked={formData.item_type === "electronics"}
                        />
                        <label htmlFor="electronics_item_type">Electronics</label>
                        <input
                            id="book_item_type"
                            type="radio"
                            name="item_type"
                            required={true}
                            value="book"
                            onChange={handleChange}
                            checked={formData.item_type === "book"}
                        />
                        <label htmlFor="book_item_type">Book</label>
                        <input
                            id="furniture_item_type"
                            type="radio"
                            name="item_type"
                            required={true}
                            value="furniture"
                            onChange={handleChange}
                            checked={formData.item_type === "furniture"}
                        />
                        <label htmlFor="furniture_item_type">Furniture</label>
                        <input
                            id="antique_item_type"
                            type="radio"
                            name="item_type"
                            required={true}
                            value="antique"
                            onChange={handleChange}
                            checked={formData.item_type === "antique"}
                        />
                        <label htmlFor="antique_item_type">Antique</label>
                        <input
                            id="collectables_item_type"
                            type="radio"
                            name="item_type"
                            required={true}
                            value="collectables"
                            onChange={handleChange}
                            checked={formData.item_type === "collectables"}
                        />
                        <label htmlFor="collectables_item_type">Collectable</label>
                        <input
                            id="clothing_item_type"
                            type="radio"
                            name="item_type"
                            required={true}
                            value="clothing"
                            onChange={handleChange}
                            checked={formData.item_type === "clothing"}
                        />
                        <label htmlFor="clothing_item_type">Clothing</label>
                        <input
                            id="other_item_type"
                            type="radio"
                            name="item_type"
                            required={true}
                            value="other"
                            onChange={handleChange}
                            checked={formData.item_type === "other"}
                        />
                        <label htmlFor="other_item_type">Other</label>
                    </div>
                    <label>Show Me</label>
                    <div className="multiple-input-container">
                        <input
                            id="vehicle_item_interest"
                            type="radio"
                            name="item_interest"
                            required={true}
                            value="vehicle"
                            onChange={handleChange}
                            checked={formData.item_interest === "vehicle"}
                        />
                        <label htmlFor="vehicle_item_interest">Vehicle</label>
                        <input
                            id="electronics_item_interest"
                            type="radio"
                            name="item_interest"
                            required={true}
                            value="electronics"
                            onChange={handleChange}
                            checked={formData.item_interest === "electronics"}
                        />
                        <label htmlFor="electronics_item_interest">Electronics</label>
                        <input
                            id="book_item_interest"
                            type="radio"
                            name="item_interest"
                            required={true}
                            value="book"
                            onChange={handleChange}
                            checked={formData.item_interest === "book"}
                        />
                        <label htmlFor="book_item_interest">Book</label>
                        <input
                            id="furniture_item_interest"
                            type="radio"
                            name="item_interest"
                            required={true}
                            value="furniture"
                            onChange={handleChange}
                            checked={formData.item_interest === "furniture"}
                        />
                        <label htmlFor="furniture_item_interest">Furniture</label>
                        <input
                            id="antique_item_interest"
                            type="radio"
                            name="item_interest"
                            required={true}
                            value="antique"
                            onChange={handleChange}
                            checked={formData.item_interest === "antique"}
                        />
                        <label htmlFor="antique_item_interest">Antique</label>
                        <input
                            id="collectables_item_interest"
                            type="radio"
                            name="item_interest"
                            required={true}
                            value="collectables"
                            onChange={handleChange}
                            checked={formData.item_interest === "collectables"}
                        />
                        <label htmlFor="collectables_item_interest">Collectable</label>
                        <input
                            id="clothing_item_interest"
                            type="radio"
                            name="item_interest"
                            required={true}
                            value="clothing"
                            onChange={handleChange}
                            checked={formData.item_interest === "clothing"}
                        />
                        <label htmlFor="clothing_item_interest">Clothing</label>
                        <input
                            id="all_item_interest"
                            type="radio"
                            name="item_interest"
                            required={true}
                            value="all"
                            onChange={handleChange}
                            checked={formData.item_interest === "all"}
                        />
                        <label htmlFor="all_item_interest">All Items</label>
                    </div>
                    <label htmlFor="about">About my Item
                    <input
                    id="about"
                    type="text"
                    name="about"
                    required={true}
                    placeholder="What I have is a..."
                    value={formData.about}
                    onChange={handleChange}
                    />
                    </label>
                    <input type="submit"/>
                </section>
                <section>
                    <label htmlFor="about">Profile Picture</label>
                    <input
                        type="url"
                        name="url"
                        id="url"
                        required={true}
                        onChange={handleChange}
                    />
                    <div className="photo_container">
                        {formData.url && <img src={formData.url} alt="item pic preview"/>}
                    </div>
                </section>
            </form>
        </div>
        </>
    );
}
export default Onboarding