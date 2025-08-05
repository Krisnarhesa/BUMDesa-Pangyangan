import { route } from 'ziggy-js';
import api from '../api';
import { InferType } from 'yup';
import { AddStructureSchema, UpdateStructureSchema } from '../yup/schemas';
import { serialize } from 'object-to-formdata';

type GetStructureReturnProps = {
	success: boolean;
	message: string;
	data: Structure[];
};

type PostStructureReturnProps = {
	success: boolean;
	message: string;
};

type UpdateStructureReturnProps = {
	success: boolean;
	message: string;
};

// GET struktur
export const getStructures = async () => {
	try {
		const { data } = await api.get<GetStructureReturnProps>(route('api.struktur.index'));

		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

// POST struktur
export const addStructure = async (data: InferType<typeof AddStructureSchema>) => {
	const formData = serialize(data);

	if (data.foto instanceof FileList && data.foto.length > 0) {
		formData.append('foto', data.foto[0]); // ✅ only append the first file
	}

	try {
		const res = await api.post<PostStructureReturnProps>(route('api.struktur.store'), formData, {
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

// UPDATE
export const updateStructure = async (id: number, data: InferType<typeof UpdateStructureSchema>) => {
	const formData = serialize(data);

	if (data.foto instanceof FileList && data.foto.length > 0) {
		formData.append('foto', data.foto[0]); // ✅ only append the first file
	}

	try {
		const res = await api.post<UpdateStructureReturnProps>(route('api.struktur.update', { id: id }), formData, {
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
