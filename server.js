import express from 'express'

let app = express()
app.use(express.static('public'))
app.listen(3000, () => console.log("Connected to Mongo \nListening on port 3k"))