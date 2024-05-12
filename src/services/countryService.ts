import { findOne, findById, findAll, create, update, remove } from './databaseService.js';
import Country from '../models/Country.js';
import type CountryI from '../types/CountryI.js';

const getCountryService = async (filter: any) => {
  const country = await findOne(Country, filter, {});
  return country;
}

const getCountryByIdService = async (id: string) => {
  const country = await findById(Country, id, {});
  return country;
}

const getCountriesService = async (pagination: { skip: number, limit: number }) => {
  const countries = await findAll(Country, {}, pagination);
  return countries;
}

const createCountryService = async (countryData: CountryI) => {
  const country = new Country(countryData);
  const countryCreated = await create(country);
  return countryCreated;
}

const updateCountryService = async (countryData: CountryI) => {
  const country = new Country(countryData);
  const countryUpdated = await update(Country, country, {});
  return countryUpdated;
}

const removeCountryService =  async (id: string) => {
  const country = await remove(Country, id, {});
  return country;
}

export { getCountryService, getCountryByIdService, getCountriesService, createCountryService, updateCountryService, removeCountryService };
