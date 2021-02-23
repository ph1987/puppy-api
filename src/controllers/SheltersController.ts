import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import shelterView from '../views/shelters_view';
import * as Yup from 'yup';

import Shelter from '../models/Shelter';

export default {

    async show(request: Request, response: Response) {

        const { id } = request.params;

        const sheltersRepository = getRepository(Shelter);

        const shelter = await sheltersRepository.findOneOrFail(id, {
            relations: ['images']
        });

        return response.json(shelterView.render(shelter));

    },

    async index(request: Request, response: Response) {

        const sheltersRepository = getRepository(Shelter);

        const shelters = await sheltersRepository.find({
            relations: ['images']
        });

        return response.json(shelterView.renderMany(shelters));

    },

    async create(request: Request, response: Response) {

        //console.log(request.files);

        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        } = request.body;
    
        const sheltersRepository = getRepository(Shelter);

        const requestImages = request.files as Express.Multer.File[];

        const images = requestImages.map(image => {
            return { path: image.filename }
        })

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends : open_on_weekends === 'true',
            images
        }

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required().max(300),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
                })
            )
        });

        await schema.validate(data, {
            abortEarly: false,
        });
    
        const shelter = sheltersRepository.create(data);
    
        await sheltersRepository.save(shelter);
    
        return response.status(201).json(shelter);

    }
};