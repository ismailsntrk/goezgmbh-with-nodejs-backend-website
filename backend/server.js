const express = require("express")
const cors = require("cors")
require("dotenv").config(); //for env
require('./db/connectDB')
const app = express();
var bodyParser = require('body-parser');
// routes var 
compression = require('compression')

app.use(compression())



const authRoutes = require("./routes/auth")
const productRoutes = require("./routes/products")

//middlewares

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(express.json());
app.use(cors())
app.set("trust proxy",  1)

app.use('/api', authRoutes)
app.use('/product', productRoutes)

const port = process.env.PORT;

app.listen(port ,()=>{
    console.log(`Server is running on port: ${port}`);
})