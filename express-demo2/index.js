import express from 'express';
import bodyParser from 'body-parser';
import usersRouter from './routes/users.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use('/users', usersRouter);

app.listen(PORT, () => console.log(`listening on port http://localhost:${PORT}`));

app.get('/', (req, res) => {res.send('Hello World!');});