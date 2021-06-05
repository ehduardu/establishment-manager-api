import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { router } from './routes';

const allowedOrigins = [
  'http://localhost:3000',
];

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors({
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg =
        'A política de CORS para este site não ' +
        'permite acesso a partir da origem especificada.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
}))

app.use(router);

export { app }