import Shelter from '../models/Shelter';
import ImagesView from './images_view';

export default {
    render(shelter: Shelter) {
        return {
            id: shelter.id,
            name: shelter.name,
            latitude: shelter.latitude,
            longitude: shelter.longitude,
            about: shelter.about,
            instructions: shelter.instructions,
            opening_hours: shelter.opening_hours,
            open_on_weekends: shelter.open_on_weekends,
            images: ImagesView.renderMany(shelter.images)
        };
    },

    renderMany(shelters: Shelter[]) {
        return shelters.map(shelter => this.render(shelter));
    }
};