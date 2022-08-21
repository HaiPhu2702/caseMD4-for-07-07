import express from 'express';
import {router} from "./src/routes/route";
import mongoose from "mongoose";
import cors from 'cors';
import bodyParser from "body-parser";
import {errorHandler} from "./src/middleware/error";

const PORT = 3000;
const app = express();
app.use(cors());
app.use(bodyParser.json());
const DB_URL = "mongodb+srv://ProjectMD4:Jenj76EHqz8gfRnM@cluster0.pebdgeg.mongodb.net/CaseStudy-MD4?retryWrites=true&w=majority";
mongoose.connect(DB_URL)
// mongoose.connect('mongodb://localhost:27017/product_management').then(() => {
//     console.log('Connect success!')
// }).catch(e => {
//     console.log(e);
// })
app.use('', router);
app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
