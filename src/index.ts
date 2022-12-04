import express from 'express';
import * as http from 'http';
import * as bodyparser from 'body-parser';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import { CommonRoutesConfig } from './common/common.routes.config';
import debug from 'debug';
import { UserRoutes } from './users/user.routes.config';
import * as dotenv from 'dotenv';
import connectDB from './config/database';
import session from 'express-session';
import { TodoRoutesConfig } from './todo/todo.routes.config';

declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any };
  }
}
if (!process.env.NODE_ENV) {
  dotenv.config();
}
connectDB();
const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 5000;
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug('app');

app.use(bodyparser.json());
app.use(cors());
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  }),
);
app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json(),
    ),
  }),
);

routes.push(new UserRoutes(app));
routes.push(new TodoRoutesConfig(app));

app.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).send(`Server running at http://localhost:${port}`);
});
server.listen(port, () => {
  debugLog(`Server running at http://localhost:${port}`);
  routes.forEach((route: CommonRoutesConfig) => {
    debugLog(`Routes configured for ${route.getName()}`);
  });
});
