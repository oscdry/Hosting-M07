import { Request, Response } from 'express';
import { 
  getCountryService, 
  getCountryByIdService, 
  getCountriesService, 
  createCountryService, 
  updateCountryService, 
  removeCountryService 
} from '../../services/countryService.js';

const getCountry = async (req: Request, res: Response) => {
  try {
    const country = await getCountryService(req.query);
    res.json(country);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getCountryById = async (req: Request, res: Response) => {
  try {
    const country = await getCountryByIdService(req.params.id);
    res.json(country);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getCountries = async (req: Request, res: Response) => {
  try {
    const pagination = { skip: Number(req.query.skip) ||  0, limit: Number(req.query.limit) || 0};
    const countries = await getCountriesService(pagination);
    res.json(countries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const createCountry = async (req: Request, res: Response) => {
  try {
    const country = await createCountryService(req.body);
    res.status(201).json(country);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

const updateCountry = async (req: Request, res: Response) => {
  try {
    const country = await updateCountryService(req.body);
    res.json(country);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

const removeCountry = async (req: Request, res: Response) => {
  try {
    const country = await removeCountryService(req.params.id);
    res.json(country);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export { getCountry, getCountryById, getCountries, createCountry, updateCountry, removeCountry };
