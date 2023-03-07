const express = require("express");
const connectDb = require('./config/dbConnection')
const env = require("dotenv").config();
const {errorHandler} = require('./middleware/errorHandler')
const cors =require('cors');

connectDb();
const app = express();

app.use(cors());

const port = process.env.PORT || 5001;

app.use(express.json());
app.use("/api/employee", require("./routes/employeeRoute"));
app.use("/api/authentication", require("./routes/userRoute"));
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Sever running dd on port ${port}`);
});
