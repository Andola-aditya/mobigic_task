import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes';
import mongoose from './database';
import devConfig from '../config/development.json';
import prodConfig from '../config/production.json';

const app = express();
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send('Hello World!');
});
const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

mongoose.connection.on(
    'error',
    console.error.bind(console, 'MongoDB connection error:')
);
app.use('/api/v1', routes);
app.use(cors());


app.listen(config.port, () => {
    console.log(`\x1b[93m App listening at http://localhost:${config.port} \x1b[39m`);
});
