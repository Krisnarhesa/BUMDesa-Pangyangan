import { type ClassValue, clsx } from 'clsx';
import { format, fromUnixTime } from 'date-fns';
import { id } from 'date-fns/locale';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const IDRFormat = (value: number) => {
	return new Intl.NumberFormat('id-ID', {
		style: 'currency',
		currency: 'IDR',
	})
		.format(value)
		.split(',')[0];
};

// Helper function to determine if a value is an object (including arrays)
function isObject(object: any): object is Record<string, any> {
	return object != null && typeof object === 'object';
}

// Improved deepEqual function with TypeScript types and property exclusion
export function deepEqual(object1: any, object2: any, ignoredKeys: string[] = []): boolean {
	// Handle array comparison separately
	if (Array.isArray(object1) && Array.isArray(object2)) {
		if (object1.length !== object2.length) return false;
		const sortedArray1 = [...object1].sort();
		const sortedArray2 = [...object2].sort();
		for (let i = 0; i < sortedArray1.length; i++) {
			if (!deepEqual(sortedArray1[i], sortedArray2[i], ignoredKeys)) return false;
		}
		return true;
	}

	// Only proceed if both objects are indeed objects and not null
	if (isObject(object1) && isObject(object2)) {
		const keys1 = Object.keys(object1).filter((key) => !ignoredKeys.includes(key));
		const keys2 = Object.keys(object2).filter((key) => !ignoredKeys.includes(key));

		// Quick key length check can save processing time
		if (keys1.length !== keys2.length) {
			return false;
		}

		for (const key of keys1) {
			if (!keys2.includes(key)) {
				return false;
			}
			const val1 = object1[key];
			const val2 = object2[key];
			const areObjects = isObject(val1) && isObject(val2);
			if ((areObjects && !deepEqual(val1, val2, ignoredKeys)) || (!areObjects && val1 !== val2)) {
				return false;
			}
		}
		return true;
	}
	// If neither are objects or arrays, perform a simple comparison
	return object1 === object2;
}

export const DateFormat = (value?: string | number, withTime = false) => {
	let dateValue: Date;

	if (typeof value === 'number') {
		// If the value is a number/UNIX time, assume it's a timestamp and convert it to a Date object
		dateValue = fromUnixTime(value);
	} else {
		// If the value is a string or undefined, create a Date object based on it
		dateValue = value ? new Date(value) : new Date();
	}

	if (isNaN(dateValue.getTime())) {
		// If the resulting date is invalid, you can handle the error accordingly
		console.error('Invalid date value:', value);
		return 'Invalid Date';
	}

	if (withTime) {
		return format(dateValue, 'PPPpppp OOOO', { locale: id });
	}

	return format(dateValue, 'PPP', { locale: id });
};

export function removeFieldsFromArray<T extends object, K extends keyof T>(array: T[], fields: K[]): Omit<T, K>[] {
	const fieldsToRemove = new Set(fields); // Use a Set for O(1) lookup time

	return array.map((item) => {
		// Create a new object by filtering out the specified fields
		const filteredEntries = Object.entries(item).filter(([key]) => !fieldsToRemove.has(key as K));

		// Return the new object using Object.fromEntries with an inferred type
		return Object.fromEntries(filteredEntries) as Omit<T, K>;
	});
}

export const sleep = async (ms: number) => {
	await new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
};

export const splitPathname = (pathname?: string) => {
	if (!pathname) return '';
	const paths = pathname.split('/');

	return '/' + (paths.slice(1, 3).join('/') ?? '');
};
