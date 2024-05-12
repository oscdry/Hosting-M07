import express from 'express';
import { getCountries } from '../controllers/CountryController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const CountryRouter = express.Router();

CountryRouter.get('/countries',authenticateToken , getCountries);

export default CountryRouter;