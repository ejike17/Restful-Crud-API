const express = require('express')
const mongoose = require('mongoose')

const app = express();

app.use(express.json())

app.get('/', (req, res)=>{
    res.send("This is the home page.")
})

app.get('/about', (req, res)=>{
    res.send("This is the about page")
})

app.post('/product', (req, res)=>{
    console.log(req.body);
    res.send(req.body);
})

mongoose.set("strictQuery", false);
mongoose.connect('mongodb+srv://blogApp:HXNQlkMwLRC5UOsW@cluster0.sdch9vy.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(()=>{
    console.log("Connected successfully");
    app.listen(8080, ()=>{
        console.log("Server is running on port 8080...");
    })
})
.catch((err)=>{
    console.log("There was an error");
})
//HXNQlkMwLRC5UOsW(password)