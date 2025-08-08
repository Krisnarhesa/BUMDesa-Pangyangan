import { route } from 'ziggy-js';
import api from '../api';
import { InferType } from 'yup';
import { AddNewsSchema, UpdateNewsSchema } from '../yup/schemas';
import { serialize } from 'object-to-formdata';

type GetNewsReturnProps = {
	success: boolean;
	message: string;
	data: {
		berita: News[];
	};
};

type PostBeritaReturnProps = {
	success: boolean;
	message: string;
};

type UpdateBeritaReturnProps = {
	success: boolean;
	message: string;
};

type DeleteBeritaReturnProps = {
	success: boolean;
	message: string;
};

// GET berita
export const getNews = async () => {
	try {
		const { data } = await api.get<GetNewsReturnProps>(route('api.berita.index'));

		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

// POST berita
export const addNews = async (data: InferType<typeof AddNewsSchema>) => {
	const formData = serialize(data);

	if (data.gambar_cover instanceof FileList && data.gambar_cover.length > 0) {
		formData.append('gambar_cover', data.gambar_cover[0]); // Only append the first file
	}

	try {
		const res = await api.post<PostBeritaReturnProps>(route('api.berita.store'), formData, {
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

// UPDATE berita
export const updateNews = async (id: number, data: InferType<typeof UpdateNewsSchema>) => {
	const formData = serialize(data);

	if (data.gambar_cover instanceof FileList && data.gambar_cover.length > 0) {
		formData.append('gambar_cover', data.gambar_cover[0]); // Only append the first file
	}

	try {
		const res = await api.post<UpdateBeritaReturnProps>(route('api.berita.update', { id }), formData, {
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

// DELETE berita
export const deleteNews = async (id: number) => {
	try {
		const res = await api.delete<DeleteBeritaReturnProps>(route('api.berita.destroy', { id }));

		return res.data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
