export function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export function formatDate(date) {
	const options = { year: 'numeric', month: 'long', day: 'numeric' };
	return new Date(date).toLocaleDateString('en', options);
}
