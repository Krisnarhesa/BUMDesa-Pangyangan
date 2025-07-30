import { route } from 'ziggy-js';
import api from '../api';

type GetGalleryItemsReturnProps = {
	success: boolean;
	message: string;
	data: AlbumItem[];
};

export const getGalleryItems = async () => {
	try {
		const { data } = await api.get<GetGalleryItemsReturnProps>(route('api.galeri.index'));
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
