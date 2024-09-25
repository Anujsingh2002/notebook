const connectDB=require("./db.js");
const express=require("express");
const authRoute = require('./routes/auth.js');
const notesRoute = require('./routes/notes.js');
const cors=require('cors');

connectDB();

const app = express()
const port = 5000

app.use(express.json())
app.use(cors());

app.get('/', (req, res) => {
  res.send('notebook project!')
})

//routes available
app.use('/api/auth',authRoute);
app.use('/api/notes',notesRoute);


app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})