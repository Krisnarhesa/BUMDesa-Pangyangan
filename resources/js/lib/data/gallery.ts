import { route } from 'ziggy-js';
import api from '../api';
import { InferType } from 'yup';
import { AddGalleryItemSchema } from '../yup/schemas';
import { serialize } from 'object-to-formdata';

type GetGalleryItemsReturnProps = {
	success: boolean;
	message: string;
	data: {
		galeri: AlbumItem[];
	};
};

type PostGalleryItemsReturnProps = {
	success: boolean;
	message: string;
};

// GET galeri
export const getGalleryItems = async () => {
	try {
		const { data } = await api.get<GetGalleryItemsReturnProps>(route('api.galeri.index'));
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

// POST galeri
export const addGalleryItem = async (data: InferType<typeof AddGalleryItemSchema>) => {
	const formData = serialize(data);

	if (data.jenis === 'foto' && data.foto instanceof FileList && data.foto.length > 0) {
		formData.append('foto', data.foto[0]); // ✅ only append the first file
	}

	try {
		const res = await api.post<PostGalleryItemsReturnProps>(route('api.galeri.store'), formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		return res.data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
