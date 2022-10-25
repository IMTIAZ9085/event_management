// require("dotenv").config();
const dotenv = require("dotenv");
dotenv.config({
      path: './config.env'
 }); 
 const cors = require("cors");
const express = require('express');
const app = express();
const connectDB = require('./controllers/config/db');
const errorHandler = require('./middleware/error');

//connecting with database
connectDB();


app.use(cors());
app.use(express.urlencoded({extended: false}));



app.use(express.json());

//error handler should last middleware
app.use(errorHandler);

app.use('/api/auth', require("./routes/auth"));
app.use('/api/private', require("./routes/private"));
app.use('/api/event',require("./routes/event"));

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, (req, res) => {
      console.log(`listening on PORT ${PORT}.....`);
});
 
process.on("unhandledRejection", (err, Promise) => {
      console.log(`Logged Error: ${err}`);
      server.close(() => process.exit(1));
});