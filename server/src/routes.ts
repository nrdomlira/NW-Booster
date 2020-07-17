import express from "express";

import ItemController from './controllers/itemsController/ItemController';
import PointsController from './controllers/pointsController/PointController';

const routes = express.Router();

const itemController = new ItemController();
const pointsController = new PointsController();


routes.get('/items', itemController.index);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

routes.post('/points', pointsController.create);

export default routes;

