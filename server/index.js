import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import fs from 'fs';
import giftsRoutes from './routes/gifts.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/gifts', giftsRoutes);


const CONNECTION_URL = "mongodb+srv://starbrain:mongodbpass@cluster0.g5hwgnb.mongodb.net/GiftCenterdb?retryWrites=true&w=majority";
const PORT = process.env.PORT || 3001;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log("Server running on port", PORT)))
    .catch((e) => console.log(console.log(e.message)));

// mongoose.set(useFindAndModify: false);


