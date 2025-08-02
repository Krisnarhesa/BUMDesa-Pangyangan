import { route } from 'ziggy-js';
import api from '../api';
import { InferType } from 'yup';
import { AddAlbumSchema } from '../yup/schemas';

type GetAlbumsReturnProps = {
	success: boolean;
	message: string;
	data: Album[];
};

type PostAlbumReturnProps = {
	success: boolean;
	message: string;
};

// GET albums
export const getAlbums = async () => {
	try {
		const { data } = await api.get<GetAlbumsReturnProps>(route('api.album.index'));
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

// POST album
export const addAlbum = async (data: InferType<typeof AddAlbumSchema>) => {
	try {
		const res = await api.post<PostAlbumReturnProps>(route('api.album.store'), data);

		return res.data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
