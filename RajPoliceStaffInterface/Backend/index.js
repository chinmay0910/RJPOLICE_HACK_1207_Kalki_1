const express = require('express');
const connectToMongo = require('./db.js')
const cors = require('cors')


connectToMongo();
const app = express();
app.use(cors())
const PORT = process.env.PORT || 5001

app.use(express.json())


app.use('/api/auth',require('./routes/auth.js'))
app.use('/api/complaint',require('./routes/complaint.js'))



app.listen(PORT, ()=>{
    console.log("Listening on Port http://localhost:"+PORT);
})