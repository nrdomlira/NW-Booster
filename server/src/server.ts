require('dotenv').config()
import express from 'express';
import cors from 'cors';
import path from 'path';
import Routes from './routes';



const app = express();

app.use(cors());
app.use(express.json())
app.use(Routes)

app.use('/uploads', express.static(path.resolve(__dirname, '..','uploads')))


app.listen(3000, '0.0.0.0', function() {
    console.log(`server está rodando... e na porta: ${process.env.SERVER_PORT}`)
})
