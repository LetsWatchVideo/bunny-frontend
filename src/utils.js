export function arrayToQueryString(array_in) {
	const out = [];

	Object.keys(array_in).forEach(key => {
		if (array_in[key]) out.push(key + '=' + encodeURIComponent(array_in[key]));
	});

	return out.join('&');
}

export function getDateSubstractDays(days = 1) {
	const d = new Date();
	d.setDate(d.getDate() - days);
	return d;
}

export function getDateSubstractMonths(months = 1) {
	const d = new Date();
	d.setMonth(d.getMonth() - months);
	return d;
}

export function getDateSubstractYears(years = 1) {
	const d = new Date();
	d.setFullYear(d.getFullYear() - years);
	return d;
}

export async function asyncForEach(array, callback) {
	/* eslint-disable no-await-in-loop */
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
}
