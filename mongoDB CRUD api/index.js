import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

import router from './routes/contact.js';
app.use('/contacts', router);

const conDB = async () => {
    try{
        await mongoose.connect('mongodb://localhost:27017/mydatabase', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');

    } catch(error){
        console.log('Error: ', error);
        process.exit(1);
    }
}

conDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on http//:localhost:${PORT}`);
});