import {Request, Response} from 'express';
import knex from '../../database/connection';

class itemController {
    async index(req: Request, res: Response) {
        const items = await knex('items').select('*'); 
    
        const serializedItems = items.map(item => {
            return {
                id: item.id,
                title: item.title,
                image_url: `http://192.168.25.2:3000/uploads/${item.image}`
            };
        })
    
        return res.json(serializedItems);
    }
}

export default itemController;