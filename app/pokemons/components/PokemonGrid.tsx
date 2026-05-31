import React from 'react';
import { SimplePokemon } from '../interfaces/simple-pokemon';
import Image from 'next/image';
import { PokemonCard } from './PokemonCard';

interface Props {
	pokemons: SimplePokemon[];
}

export const PokemonGrid = ({ pokemons }: Props) => {
	return (
		<div style={{
			display: 'grid',
			gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
			gap: '24px',
			padding: '24px',
		}}>
			{pokemons.map((pokemon: SimplePokemon) => (
				<PokemonCard key={pokemon.id} pokemon={pokemon} />
			))}
		</div>
	);
};
