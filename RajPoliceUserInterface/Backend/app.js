const express = require('express');
const cookieParser = require('cookie-parser')
const connectToMongo = require('./db/connection')
const cors = require('cors')


connectToMongo();
const app = express();
app.use(cors())
const PORT = process.env.PORT || 5000

app.use(express.json())

app.use(cookieParser())


app.use('/api/auth',require('./routes/auth.js'))
app.use('/api/post',require('./routes/post.js'))
app.use('/api/complaint',require('./routes/complaint.js'))
app.use('/api/sendmessage',require('./routes/sendAImessage.js'))
app.use('/api/feedback',require('./routes/feedback.js'))



app.listen(PORT, ()=>{
    console.log("Listening on Port http://localhost:"+PORT);
})