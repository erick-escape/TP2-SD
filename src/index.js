import express, { Router } from 'express';
import bodyParser from 'body-parser';
import { devs } from '@/app/controllers';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from './swagger.json';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use('/devs', devs);

app.get("/terms", (req, res) => {
    return res.json({
        message: "Terms of Service: Don't be a douche!",
    });
});

console.log(`Server running on the link http://localhost:${port}`);
app.listen(port);