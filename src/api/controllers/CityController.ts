import { Request, Response } from 'express';
import User from '../../models/User.js'; 
import City from '../../models/City.js'; 

import { 
  getCityService, 
  getCityByIdService, 
  getCitiesService, 
  createCityService, 
  updateCityService, 
  removeCityService 
} from '../../services/citiesService.js';

const getMyCities = async (req: Request, res: Response) => {
  try {

    
    const userId = req.user.userId;


    const user = await User.findById(userId).populate('myCities').lean().exec();
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const cities = await City.find({ _id: { $in: user.myCities } }).lean().exec();
    cities.sort((a, b) => (a.name < b.name ? -1 : 1));

    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

 const addCityToMyCities = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    const userId = req.user?.userId;
    console.log(userId);
    if (!userId) {
      return res.sendStatus(401); // Unauthorized
    }
    const city = await City.findById(id);
    if (!city) {
      return res.status(404).json({ message: 'La ciudad no existe' });
    }

    const user = await User.findById(userId);
    if (user && user.myCities.includes(id)) {
      return res.status(400).json({ message: 'La ciudad ya está en tu lista de ciudades' });
    }

    await User.findByIdAndUpdate(userId, { $addToSet: { myCities: id } });

    res.status(200).json({ message: 'Ciudad agregada a mis ciudades correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCity = async (req: Request, res: Response) => {
    try {
      const startsWith = req.params.startsWith as string;
      if (!startsWith) {
        return res.status(400).json({ message: 'Parámetro "startsWith" requerido' });
      }
      const cities = await getCityService(startsWith);
      res.json(cities);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

const getCityById = async (req: Request, res: Response) => {
  try {
    const city = await getCityByIdService(req.params.id);
    res.json(city);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getCities = async (req: Request, res: Response) => {
  try {
    const pagination = { skip: Number(req.query.skip) ||  0, limit: Number(req.query.limit) || 0};
    const cities = await getCitiesService(pagination);
    res.json(cities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}



const createCity = async (req: Request, res: Response) => {
  try {
    const city = await createCityService(req.body);
    res.status(201).json(city);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

const updateCity = async (req: Request, res: Response) => {
  try {
    const updatedCity = req.body;
    const city = await updateCityService(updatedCity);
    res.json(city);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

const removeCity = async (req: Request, res: Response) => {
  try {
    const city = await removeCityService(req.params.id);
    res.json(city);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export { getMyCities, addCityToMyCities, getCity, getCityById, getCities, createCity, updateCity, removeCity };
