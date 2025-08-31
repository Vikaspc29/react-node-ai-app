import express from 'express';
import type { Request, Response } from '@types/express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
   res.send(`open aki key ${process.env.OPENAI_API_KEY}`);
});

app.get('/api/hello', (req: Request, res: Response) => {
   res.json({ message: 'Hello World!' });
});

app.listen(port, () => {
   console.log(`Server is running on http://localhosppt:${port}`);
});
