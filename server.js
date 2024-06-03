const express = require("express")
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')
const cors = require('cors')
const connectDb = require("./config/db")
// dot config
dotenv.config();

// mongodb connection
connectDb();

// rest object
const app = express()

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

//routes
app.use("/api/v1/test", require("./routes/testRouts"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/inventory", require("./routes/inventoryRoutes"));
app.use("/api/v1/analytics", require("./routes/analyticsRoutes"));

// port
const port = process.env.PORT || 8080;

// listen
app.listen(port, ()=>{
    console.log(`Node server running in ${process.env.DEV_MODE} on port ${process.env.PORT}`.bgBlue.white);
});

