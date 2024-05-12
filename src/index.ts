import express, { type Express } from 'express';
import cors from 'cors'; 
import createConnection from './config/db.js';
import countryRouter from './api/routers/CountryRouter.js';
import CityRouter from './api/routers/CitiesRouter.js';
import UserRouter from './api/routers/UserRouter.js';
import AdminRouter from './web/router/adminRouter.js';
import configViewEngine from './web/config/configViewEngine.js';

// Initialize express
const app: Express = express();
const port = process.env.HOST_PORT ?? '3000';
app.use(express.urlencoded({extended:true}));
app.use(express.json());
configViewEngine(app);

// Utiliza el middleware cors
app.use(cors());

app.use('/api/v1', countryRouter);
app.use('/api/v1', CityRouter);
app.use('/api/v1', UserRouter);
app.use('/api/v1/admin', AdminRouter);

(async () => {
  await createConnection();
  app.listen(process.env.HOST_PORT, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
})();

export default app;
