import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import PostRoute from './routes/PostRoute.js';
import DallyRoute from './routes/DallyRoute.js';
import connectDB from './db/connect.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit : '50MB'}));
app.use(bodyParser.json({ extended : true }));
app.use(bodyParser.urlencoded({ extended : false}))


app.get('/', async (req,res) => {
    res.send('hello world')
});

app.use('/api/v1/posts', PostRoute);
app.use('/api/v1/dalle', DallyRoute);

const startServer = async()=>{

    try {
        connectDB(process.env.MONGO_URL)
        app.listen(8080,() =>console.log('server is running on port http://localhost:8080'))
    } catch (error) {
        console.log(error)
    }
};

startServer();