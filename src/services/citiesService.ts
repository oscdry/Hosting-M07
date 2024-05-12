import { findOne, findById, findAll, create, update, remove } from './databaseService.js';
import City from '../models/City.js';
import type CityI from '../types/CityI.js';

const getCityService = async (startsWith: string) => {
    const filter = { name: { $regex: `^${startsWith}`, $options: 'i' } };
    const cities = await City.find(filter).sort({ name: 1 });
    return cities;
  }
const getCityByIdService = async (id: string) => {
  const city = await findById(City, id, {});
  return city;
}

const getCitiesService = async (pagination: { skip: number, limit: number }) => {
  const cities = await findAll(City, {}, pagination);
  return cities;
}

const getTotalCityCount = async () => {
  const totalCount = await City.countDocuments();
  return totalCount;
};

const createCityService = async (cityData: CityI) => {
  const city = new City(cityData);
  const cityCreated = await create(city);
  return cityCreated;
}

const updateCityService = async (cityData: CityI) => {
  const city = new City(cityData);
  const cityUpdated = await update(City, city, {});
  return cityUpdated;
}

const removeCityService =  async (id: string) => {
  const city = await remove(City, id, {});
  return city;
}

export { getTotalCityCount, getCityService, getCityByIdService, getCitiesService, createCityService, updateCityService, removeCityService };
