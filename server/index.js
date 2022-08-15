import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import giftsRoutes from './routes/gifts.js';

const app = express();
dotenv.config()

app.use(cors());
app.use(express.json());
app.use('/gifts', giftsRoutes);

app.get('/', (req, res) => {
    res.send("Gift Center API");
});


const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log("Server running on port", PORT)))
    .catch((e) => console.log(console.log(e.message)));

// mongoose.set(useFindAndModify: false);


