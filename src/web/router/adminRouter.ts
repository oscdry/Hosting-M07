import express, { Request, Response } from 'express';
const AdminRouter = express.Router();
import City from '../../models/City.js';
import {
    getCitiesService,
    createCityService,
    getCityByIdService,
    updateCityService,
    removeCityService,
    getTotalCityCount

  } from '../../services/c  itiesService.js';
  AdminRouter.get('/cities', async (req, res) => {
    try {
        const totalCityCount = await getTotalCityCount();

        const page = req.query.page ? parseInt(req.query.page.toString()) : 1; 
        const pageSize = 10; 

        const skip = (page - 1) * pageSize; 
        const limit = pageSize; 
        
        const cities = await getCitiesService({ skip, limit }); 

        const totalPages = Math.ceil(totalCityCount / pageSize);

        res.render('cities-list', { cities, page, totalPages }); 
    } catch (error) {
        res.redirect('/api/v1/admin/cities'); 
    }
});
  
  AdminRouter.get('/cities/create', (req: Request, res: Response) => {
    const defaultCity = { name: '', country: '' };  
    res.render('cities-create', { city: defaultCity });
  });
  
  AdminRouter.post('/cities/create', async (req: Request, res: Response) => {
      try {
        const { name, country } = req.body;
        const newCity = new City({ name, country : country });
        console.log(newCity);
        await newCity.save();
        res.redirect('/api/v1/admin/cities'); 
      } catch (error) {
          res.redirect('/api/v1/admin/cities'); 
      }
  });
  
  AdminRouter.get('/cities/:id/edit', async (req: Request, res: Response) => {
      try {
          const city = await getCityByIdService(req.params.id);
          res.render('cities-edit', { city }); 
      } catch (error) {
        res.redirect('/api/v1/admin/cities');  
      }
  });
  
  AdminRouter.post('/cities/:id', async (req: Request, res: Response) => {
      try {
        const { name, country } = req.body;
    
        console.log('id' + req.params.id)
        console.log('body editar' + req.params.name);
        await City.findByIdAndUpdate(req.params.id, { name, country: country });
          res.redirect('/api/v1/admin/cities'); 
      } catch (error) {
        console.log(error.message);
        res.redirect('/api/v1/admin/cities'); 
      }
  });
  
  AdminRouter.post('/cities-delete/:id', async (req: Request, res: Response) => {
    try {
        await removeCityService(req.params.id);
        res.redirect('/api/v1/admin/cities');
    } catch (error) {
        res.redirect('/api/v1/admin/cities'); 
    }
});
  
export default AdminRouter;