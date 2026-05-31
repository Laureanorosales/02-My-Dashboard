import { redirect } from 'next/navigation';

export default function HomePage() {
	redirect('/dashboard/main');

	return (
		<>
			<h1 className='text-4xl font-semibold'>Hola mundo</h1>
		</>
	);
}
