import express from 'express';
import { getCity, addCityToMyCities, getMyCities } from '../controllers/CityController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const CityRouter = express.Router();

CityRouter.get('/cities/:startsWith',authenticateToken , getCity);
CityRouter.post('/my-cities',authenticateToken , addCityToMyCities);
CityRouter.get('/my-cities',authenticateToken , getMyCities );



export default CityRouter;