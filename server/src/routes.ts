import express from "express";
import multer from 'multer';
import multerConfig from './config/multer';
import {celebrate, Joi} from 'celebrate';

import ItemController from './controllers/itemsController/ItemController';
import PointsController from './controllers/pointsController/PointController';

const routes = express.Router();
const upload = multer(multerConfig);

const itemController = new ItemController();
const pointsController = new PointsController();


routes.get('/items', itemController.index);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

routes.post('/points', upload.single('image'),
celebrate({
    body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email,
        whatsapp: Joi.number().required(),
        latitude: Joi.number().required(),
        city: Joi.string().required(),
        uf: Joi.string().required().max(2),
        items: Joi.string().required(),
    })
},{
    abortEarly: false,
}),
pointsController.create);

export default routes;

