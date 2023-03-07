const express = require("express");
const cors = require('cors');
const app = express();

const museum = require("./routes/museum")
const exhibit = require("./routes/exhibit")


app.use(cors())
app.use(express.json())
app.use('/images', express.static('images'));
app.use(museum)
app.use(exhibit)


app.listen(8888, () => {
    console.log("listening port : " + 8888);
})
