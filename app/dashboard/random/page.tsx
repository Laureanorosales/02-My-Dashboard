import { cacheLife } from 'next/cache';

export default async function RandomPage() {
	'use cache';
	cacheLife({
		stale: 5, // en 5 segundos el cache se considera viejo
		revalidate: 10, // revalida cada 10 segundos
		// expire: 86400, // expira en 1 dia
	});
	// Non-deterministic operations
	const random = Math.random();
	const now = Date.now();
	const date = new Date();
	const uuid = crypto.randomUUID();
	const bytes = crypto.getRandomValues(new Uint8Array(16));

	return (
		<div className='text-white'>
			<p>{random}</p>
			<p>{now}</p>
			<p>{date.getTime()}</p>
			<p>{uuid}</p>
			<p>{bytes.join(', ')}</p>
		</div>
	);
}
