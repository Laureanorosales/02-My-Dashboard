import { Pokemon } from '@/app/pokemons';
import { TYPE_COLORS, STAT_LABELS } from '@/app/pokemons/constants';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import './pokemon.css';

interface Props {
	params: Promise<{ id: string }>;
}

// Solo se ejecuta en build time
export async function generateStaticParams() {
	// Vamos a generar todos los pokemons estaticos
	const static151Pokemons = Array.from({ length: 151 }).map((v, i) => `${i + 1}`);

	return static151Pokemons.map((id) => ({
		id: id,
	}));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	try {
		const { id } = await params;
		const pokemon = await getPokemon(id);
		return {
			title: `#${String(pokemon.id).padStart(3, '0')} ${pokemon.name.toUpperCase()} — Pokédex`,
			description: `Ficha completa de ${pokemon.name}: tipos, estadísticas, movimientos y sprites.`,
		};
	} catch {
		return {
			title: 'Pokédex',
			description: 'Ficha de Pokémon',
		};
	}
}

const getPokemon = async (id: string): Promise<Pokemon> => {
	try {
		const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
			cache: 'force-cache',
		}).then((resp) => resp.json());
		console.log('Se cargo: ', pokemon.name);
		return pokemon;
	} catch {
		notFound();
	}
};



export default async function PokemonPage({ params }: Props) {
	const { id } = await params;
	const pokemon = await getPokemon(id);

	const primaryType = pokemon.types[0]?.type.name ?? 'normal';
	const theme = TYPE_COLORS[primaryType] ?? TYPE_COLORS['normal'];
	const paddedId = String(pokemon.id).padStart(3, '0');

	const officialArt =
		pokemon.sprites.other?.['official-artwork']?.front_default ??
		pokemon.sprites.other?.dream_world.front_default ??
		'';
	const officialShiny = pokemon.sprites.other?.['official-artwork']?.front_shiny ?? '';

	const styleVariables = {
		'--theme-bg': theme.bg,
		'--theme-glow': theme.glow,
		'--theme-glow-08': theme.glow.replace('0.35', '0.08'),
		'--theme-glow-05': theme.glow.replace('0.35', '0.05'),
		'--theme-accent': theme.accent,
		'--theme-accent-55': `${theme.accent}55`,
		'--theme-accent-22': `${theme.accent}22`,
		'--theme-accent-88': `${theme.accent}88`,
		'--theme-accent-44': `${theme.accent}44`,
		'--theme-accent-33': `${theme.accent}33`,
		'--theme-pill': theme.pill,
	} as React.CSSProperties;

	return (
		<div className='pkd-page' style={styleVariables}>
				{/* Back link */}
				<Link href='/dashboard/pokemons' className='pkd-back-link'>
					← Volver a la Pokédex
				</Link>

				{/* Decorative background ID */}
				<div className='pkd-bg-id'>#{paddedId}</div>

				<div className='pkd-layout'>
					{/* ── LEFT: Hero ── */}
					<div className='pkd-left'>
						<div className='pkd-image-glow' />

						{officialArt && (
							<Image
								src={officialArt}
								width={280}
								height={280}
								alt={`Artwork oficial de ${pokemon.name}`}
								className='pkd-hero-img'
								priority
							/>
						)}

						<h1 className='pkd-name-hero'>{pokemon.name}</h1>

						<div className='pkd-types'>
							{pokemon.types.map((t) => (
								<span key={t.slot} className='pkd-type-pill'>
									{t.type.name}
								</span>
							))}
						</div>
					</div>

					{/* ── RIGHT: Data ── */}
					<div className='pkd-right'>
						{/* Info rápida */}
						<div>
							<div className='pkd-section-label'>// ficha técnica</div>
							<div className='pkd-info-grid'>
								<div className='pkd-info-cell'>
									<div className='pkd-info-cell-label'>N.º Pokédex</div>
									<div className='pkd-info-cell-value'>#{paddedId}</div>
								</div>
								<div className='pkd-info-cell'>
									<div className='pkd-info-cell-label'>Experiencia base</div>
									<div className='pkd-info-cell-value'>{pokemon.base_experience ?? '—'}</div>
								</div>
								<div className='pkd-info-cell'>
									<div className='pkd-info-cell-label'>Altura</div>
									<div className='pkd-info-cell-value'>{(pokemon.height / 10).toFixed(1)} m</div>
								</div>
								<div className='pkd-info-cell'>
									<div className='pkd-info-cell-label'>Peso</div>
									<div className='pkd-info-cell-value'>{(pokemon.weight / 10).toFixed(1)} kg</div>
								</div>
							</div>
						</div>

						<div className='pkd-divider' />

						{/* Stats */}
						<div>
							<div className='pkd-section-label'>// estadísticas base</div>
							{pokemon.stats.map((s, i) => (
								<div key={s.stat.name} className='pkd-stat-row'>
									<span className='pkd-stat-name'>{STAT_LABELS[s.stat.name] ?? s.stat.name}</span>
									<span className='pkd-stat-val'>{s.base_stat}</span>
									<div className='pkd-stat-track'>
										<div
											className='pkd-stat-fill'
											style={
												{
													width: `${Math.min((s.base_stat / 255) * 100, 100)}%`,
													'--delay': `${i * 0.08}s`,
												} as React.CSSProperties
											}
										/>
									</div>
								</div>
							))}
						</div>

						<div className='pkd-divider' />

						{/* Abilities */}
						<div>
							<div className='pkd-section-label'>// habilidades</div>
							<div className='pkd-abilities'>
								{pokemon.abilities.map((a) => (
									<span
										key={a.ability?.name}
										className={`pkd-ability-tag${a.is_hidden ? ' hidden-ability' : ''}`}
										title={a.is_hidden ? 'Habilidad oculta' : undefined}>
										{a.ability?.name}
										{a.is_hidden ? ' ✦' : ''}
									</span>
								))}
							</div>
						</div>

						<div className='pkd-divider' />

						{/* Sprites */}
						<div>
							<div className='pkd-section-label'>// sprites</div>
							<div className='pkd-sprites'>
								{[
									{ src: pokemon.sprites.front_default, label: 'Normal' },
									{ src: pokemon.sprites.back_default, label: 'Espalda' },
									{ src: pokemon.sprites.front_shiny, label: 'Shiny' },
									{ src: pokemon.sprites.back_shiny, label: 'Shiny ↩' },
								]
									.filter((s) => s.src)
									.map(({ src, label }) => (
										<div key={label} className='pkd-sprite-cell'>
											<Image src={src} width={72} height={72} alt={label} />
											<span className='pkd-sprite-sublabel'>{label}</span>
										</div>
									))}
							</div>
						</div>

						<div className='pkd-divider' />

						{/* Moves */}
						<div>
							<div className='pkd-section-label'>// movimientos ({pokemon.moves.length})</div>
							<div className='pkd-moves'>
								{pokemon.moves.map((m) => (
									<span key={m.move.name} className='pkd-move-tag'>
										{m.move.name}
									</span>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
	);
}
