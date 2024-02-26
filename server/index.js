const PORT = 8000
const { MongoClient } = require('mongodb')
const uri = 'mongodb+srv://OnurOzkan:SecretPassword@cluster0.k08jzar.mongodb.net/Cluster0?retryWrites=true&w=majority'
const express = require('express')
const jwt = require('jsonwebtoken')
const{v4:uuidv4} = require('uuid')
const cors = require('cors')
const bcrypt = require('bcrypt')


const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req,res) =>{
    res.json('Hello to my app')
})
app.post('/signup', async (req,res) =>{
    const client = new MongoClient(uri)
    const{email, password} = req.body

    const generatedUserId = uuidv4()
    const hashedPassword = await bcrypt.hash(password, 10)

    try{
        await client.connect()
        const database = client.db('app-data')
        const items = database.collection('items')

        const existingUser = await items.findOne({email})

        if(existingUser){
            return res.status(409).send('User already exists.Log in to change your item.')
        }
        const properEmail = email.toLowerCase()
        const data = {
            item_id: generatedUserId,
            email: properEmail,
            hashed_password: hashedPassword
        }
        const insertedUser = await items.insertOne(data)

        const token = jwt.sign(insertedUser,properEmail, {
            expiresIn: 60*24,
        })
        res.status(201).json({token, itemId: generatedUserId})
    }catch(err){
        console.log(err)
    }
})
app.post('/login', async(req,res) =>{
    const client = new MongoClient(uri)
    const{email, password} = req.body

    try{
        await client.connect()
        const database=  client.db('app-data')
        const items = database.collection('items')

        const item = await items.findOne({email})

        const correctPassword = await bcrypt.compare(password,item.hashed_password)
        if(item && correctPassword){
            const token = jwt.sign(item, email, {
                expiresIn: 60*24
            })
            res.status(201).json({token, itemId: item.item_id})
        }
        res.status(400).send('Invalid credentials')
    }catch (err){
        console.log(err)
    }


})


app.get('/item', async (req,res) =>{
    const client = new MongoClient(uri)
    const itemId =  req.query.itemId

    try{
        await client.connect()
        const database = client.db('app-data')
        const items = database.collection('items')

        const query = {item_id: itemId}
        const item = await items.findOne(query)
        res.send(item)
    }finally {
        await client.close()
    }
})

app.get('/items', async (req,res) =>{
    const client = new MongoClient(uri)
    const itemIds = JSON.parse(req.query.itemIds)
    console.log(itemIds)
    try{
        await client.connect()
        const database=  client.db('app-data')
        const items = database.collection('items')
        const pipeline = [
            {
                '$match':{
                    'item_id':{
                        '$in': itemIds
                    }
                }
            }

        ]
        const foundItems = await items.aggregate(pipeline).toArray()
        console.log(foundItems)
        res.send(foundItems)
    }finally {
        await client.close()
    }
})

app.get('/items_with_type', async (req,res) =>{
   const client = new MongoClient(uri)
   const itemType = req.query.item_type

    try{
       await client.connect()
       const database=  client.db('app-data')
       const items = database.collection('items')
       const query = {item_type: {$eq : itemType}}
       const foundItems = await items.find(query).toArray()
       res.send(foundItems)
    } finally {
        await client.close()
    }
})




app.put('/item', async(req,res) =>{

    const client = new MongoClient(uri)
    const formData = req.body.formData

    console.log(formData)
    try{
        await client.connect()
        const database=  client.db('app-data')
        const items = database.collection('items')

        const query = {item_id: formData.item_id}
        const updateDocument ={
            $set: {
                item_name: formData.item_name,
                item_type: formData.item_type,
                price: formData.price,
                about: formData.about,
                matches: formData.matches,
                item_interest: formData.item_interest,
                url: formData.url
            },
        }
        const insertedItem = await items.updateOne(query, updateDocument)
        res.json(insertedItem)
    }finally {
        await client.close()
    }
})

app.put('/addmatch', async(req,res) =>{
    const client = new MongoClient(uri)
    const{itemId, matchedItemId} = req.body

    try{
        await client.connect()
        const database = client.db('app-data')
        const items = database.collection('items')

        const query = {item_id: itemId}
        const updateDocument = {
            $push:{matches:{item_id: matchedItemId}}
        }
        const item = await items.updateOne(query,updateDocument)
        res.send(item)
    }finally {
        await client.close()
    }
})

app.get('/messages', async (req,res) => {
    const client = new MongoClient(uri)
    const{itemId,correspondingItemId} = req.query
    console.log(itemId,correspondingItemId)
    try{
    await client.connect()
    const database = client.db('app-data')
    const messages = database.collection('messages')

    const query = {
        from_itemId: itemId, to_itemId: correspondingItemId
    }
    const foundMessages = await messages.find(query).toArray()
    res.send(foundMessages)
    }finally {
        await client.close()
    }

})

app.post('/message', async(req,res) =>{
    const client = new MongoClient(uri)
    const message = req.body.message
    try {
        await client.connect()
        const database = client.db('app-data')
        const messages = database.collection('messages')
        const insertedMessage = await messages.insertOne(message)
        res.send(insertedMessage)
    }finally {
        await client.close()
    }

})




app.listen(PORT , () => console.log('Server running on PORT ' + PORT))