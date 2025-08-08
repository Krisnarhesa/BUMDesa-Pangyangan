import { route } from 'ziggy-js';
import api from '../api';
import { InferType } from 'yup';
import { AddCarouselSchema, UpdateCarouselSchema } from '../yup/schemas';
import { serialize } from 'object-to-formdata';

type GetCarouselsReturnProps = {
	success: boolean;
	message: string;
	data: Carousel[];
};

type PostCarouselReturnProps = {
	success: boolean;
	message: string;
};

type UpdateCarouselReturnProps = {
	success: boolean;
	message: string;
};

type DeleteCarouselReturnProps = {
	success: boolean;
	message: string;
};

// GET carousels
export const getCarousels = async () => {
	try {
		const { data } = await api.get<GetCarouselsReturnProps>(route('api.carousel.index'));
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

// POST carousel
export const addCarousel = async (data: InferType<typeof AddCarouselSchema>) => {
	const formData = serialize(data);

	if (data.image instanceof FileList && data.image.length > 0) {
		formData.append('image', data.image[0]); // ✅ only append the first file
	}

	try {
		const res = await api.post<PostCarouselReturnProps>(route('api.carousel.store'), formData, {
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

// UPDATE carousel
export const updateCarousel = async (id: number, data: InferType<typeof UpdateCarouselSchema>) => {
	const formData = serialize(data);

	if (data.image instanceof FileList && data.image.length > 0) {
		formData.append('image', data.image[0]); // ✅ only append the first file
	}

	try {
		const res = await api.post<UpdateCarouselReturnProps>(route('api.carousel.update', { id: id }), formData, {
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

// DELETE carousel
export const deleteCarousel = async (id: number) => {
	try {
		const res = await api.delete<DeleteCarouselReturnProps>(route('api.carousel.destroy', { id: id }));

		return res.data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
