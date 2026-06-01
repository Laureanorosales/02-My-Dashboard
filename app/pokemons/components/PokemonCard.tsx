import Link from 'next/link';
import React from 'react';
import { SimplePokemon } from '../interfaces/simple-pokemon';
import Image from 'next/image';
import styles from './PokemonCard.module.css';

interface Props {
	pokemon: SimplePokemon;
}

export const PokemonCard = ({ pokemon }: Props) => {
	const { id, name } = pokemon;
	const paddedId = String(id).padStart(3, '0');

	return (
		<Link href={`/dashboard/pokemons/${name}`} className={styles.card}>
			<div className='px-4 pt-[22px] pb-0 text-center relative z-3'>
				<div className='font-syne font-extrabold text-[11px] tracking-[0.12em] text-[rgba(255,200,50,0.55)] uppercase'>
					#{paddedId}
				</div>

				<div className={styles.imgWrapper}>
					<Image
						fill
						alt={name}
						priority={false}
						src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
						className='object-contain'
					/>
				</div>

				<p className='font-syne font-extrabold text-[17px] tracking-[0.03em] text-[#f0f0f0] capitalize mt-2.5 leading-tight'>
					{name}
				</p>

				<div className='w-8 h-0.5 mx-auto mt-2.5 rounded-full bg-gradient-to-r from-[rgba(255,200,50,0.7)] to-[rgba(255,200,50,0.1)]' />

				<span className={styles.detailBtn}>Ver detalle</span>
			</div>

			<div className='relative z-3 mt-3.5 border-t border-white/5 px-4 py-2.5 flex items-center gap-2'>
				<div className={styles.dotAnimated} />
				<span className='text-[11px] text-white/30 font-dm'>Pokédex Nacional</span>
			</div>
		</Link>
	);
};
