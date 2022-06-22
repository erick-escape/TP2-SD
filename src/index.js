import express, { Router } from 'express';
import bodyParser from 'body-parser';
import { devs } from '@/app/controllers';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/devs', devs);

console.log(`Server running on the link http://localhost:${port}`);
app.listen(port);