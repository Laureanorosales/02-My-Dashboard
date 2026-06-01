import { PokemonGrid, PokemonsResponse, SimplePokemon } from '@/app/pokemons';
import Image from 'next/image';
import { Metadata } from 'next';
import { cacheLife, cacheTag, revalidateTag } from 'next/cache';

export const metadata: Metadata = {
	title: 'Pokédex',
	description: 'Listado de pokemons',
};

const getPokemons = async (limit = 20, offset = 0): Promise<SimplePokemon[]> => {
	const data: PokemonsResponse = await fetch(
		`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
	).then((res) => res.json());

	const pokemons = data.results.map((pokemon) => ({
		id: pokemon.url.split('/').at(-2)!,
		name: pokemon.name,
	}));

	// throw new Error('Esto es un error que no deberia suceder');

	return pokemons;
};

export default async function PokemonsPage() {
	'use cache';

	cacheTag('pokemons');

	// cacheLife({
	// 	stale: 10,
	// 	revalidate: 60,
	// });

	// revalidateTag('pokemons');

	const pokemons = await getPokemons(151);

	return (
		<div className='flex flex-col'>
			<span className='font-bebas text-5xl tracking-wide text-[#ffd740] my-2'>
				Listado de pokemons{' '}
				<small className='font-space text-sm text-white/30 tracking-[0.12em] uppercase'>estático</small>
			</span>
			<PokemonGrid pokemons={pokemons} />
		</div>
	);
}
