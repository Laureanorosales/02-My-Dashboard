import { Pokemon } from '@/app/pokemons';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Props {
	params: Promise<{ id: string }>;
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

// Color map por tipo de Pokémon
const TYPE_COLORS: Record<string, { bg: string; accent: string; glow: string; pill: string }> = {
	fire:     { bg: '#1a0800', accent: '#ff6b2b', glow: 'rgba(255,107,43,0.35)', pill: 'rgba(255,107,43,0.15)' },
	water:    { bg: '#00091a', accent: '#4fc3f7', glow: 'rgba(79,195,247,0.35)', pill: 'rgba(79,195,247,0.15)' },
	grass:    { bg: '#001a08', accent: '#69f0ae', glow: 'rgba(105,240,174,0.35)', pill: 'rgba(105,240,174,0.15)' },
	electric: { bg: '#1a1500', accent: '#ffd740', glow: 'rgba(255,215,64,0.35)',  pill: 'rgba(255,215,64,0.15)'  },
	psychic:  { bg: '#1a0015', accent: '#f48fb1', glow: 'rgba(244,143,177,0.35)', pill: 'rgba(244,143,177,0.15)' },
	ice:      { bg: '#001018', accent: '#80deea', glow: 'rgba(128,222,234,0.35)', pill: 'rgba(128,222,234,0.15)' },
	dragon:   { bg: '#0d0020', accent: '#b388ff', glow: 'rgba(179,136,255,0.35)', pill: 'rgba(179,136,255,0.15)' },
	dark:     { bg: '#0a0a0a', accent: '#bcaaa4', glow: 'rgba(188,170,164,0.35)', pill: 'rgba(188,170,164,0.15)' },
	fairy:    { bg: '#1a0018', accent: '#f8bbd0', glow: 'rgba(248,187,208,0.35)', pill: 'rgba(248,187,208,0.15)' },
	fighting: { bg: '#1a0500', accent: '#ff8a65', glow: 'rgba(255,138,101,0.35)', pill: 'rgba(255,138,101,0.15)' },
	poison:   { bg: '#12001a', accent: '#ce93d8', glow: 'rgba(206,147,216,0.35)', pill: 'rgba(206,147,216,0.15)' },
	ground:   { bg: '#1a0e00', accent: '#ffcc80', glow: 'rgba(255,204,128,0.35)', pill: 'rgba(255,204,128,0.15)' },
	rock:     { bg: '#111008', accent: '#d7ccc8', glow: 'rgba(215,204,200,0.35)', pill: 'rgba(215,204,200,0.15)' },
	ghost:    { bg: '#0a001a', accent: '#9575cd', glow: 'rgba(149,117,205,0.35)', pill: 'rgba(149,117,205,0.15)' },
	steel:    { bg: '#0d0f12', accent: '#b0bec5', glow: 'rgba(176,190,197,0.35)', pill: 'rgba(176,190,197,0.15)' },
	bug:      { bg: '#0d1200', accent: '#aed581', glow: 'rgba(174,213,129,0.35)', pill: 'rgba(174,213,129,0.15)' },
	flying:   { bg: '#000d1a', accent: '#90caf9', glow: 'rgba(144,202,249,0.35)', pill: 'rgba(144,202,249,0.15)' },
	normal:   { bg: '#111111', accent: '#e0e0e0', glow: 'rgba(224,224,224,0.3)',  pill: 'rgba(224,224,224,0.12)' },
};

const STAT_LABELS: Record<string, string> = {
	hp:              'HP',
	attack:          'ATQ',
	defense:         'DEF',
	'special-attack':'S.ATQ',
	'special-defense':'S.DEF',
	speed:           'VEL',
};

export default async function PokemonPage({ params }: Props) {
	const { id } = await params;
	const pokemon = await getPokemon(id);

	const primaryType = pokemon.types[0]?.type.name ?? 'normal';
	const theme = TYPE_COLORS[primaryType] ?? TYPE_COLORS['normal'];
	const paddedId = String(pokemon.id).padStart(3, '0');

	const officialArt = pokemon.sprites.other?.['official-artwork']?.front_default
		?? pokemon.sprites.other?.dream_world.front_default
		?? '';
	const officialShiny = pokemon.sprites.other?.['official-artwork']?.front_shiny ?? '';

	return (
		<>
			<style>{`
				@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:wght@400;700&display=swap');

				.pkd-page {
					min-height: 100vh;
					background: ${theme.bg};
					background-image:
						radial-gradient(ellipse 80% 50% at 20% 50%, ${theme.glow.replace('0.35', '0.08')} 0%, transparent 60%),
						radial-gradient(ellipse 60% 80% at 80% 20%, ${theme.glow.replace('0.35', '0.05')} 0%, transparent 60%);
					font-family: 'Space Mono', monospace;
					color: #e0e0e0;
					padding: 0;
					position: relative;
					overflow-x: hidden;
				}

				.pkd-back-link {
					display: inline-flex;
					align-items: center;
					gap: 8px;
					color: ${theme.accent};
					font-family: 'Space Mono', monospace;
					font-size: 11px;
					letter-spacing: 0.1em;
					text-transform: uppercase;
					text-decoration: none;
					opacity: 0.7;
					transition: opacity 0.2s;
					padding: 24px 28px 0;
				}
				.pkd-back-link:hover { opacity: 1; }

				/* Background giant ID number */
				.pkd-bg-id {
					position: absolute;
					top: -10px;
					right: -20px;
					font-family: 'Bebas Neue', sans-serif;
					font-size: clamp(160px, 22vw, 320px);
					color: ${theme.accent};
					opacity: 0.04;
					line-height: 1;
					pointer-events: none;
					user-select: none;
					z-index: 0;
				}

				.pkd-layout {
					display: grid;
					grid-template-columns: 1fr 1fr;
					gap: 0;
					min-height: calc(100vh - 60px);
					position: relative;
					z-index: 1;
				}

				/* LEFT PANEL — Hero image */
				.pkd-left {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					padding: 32px 24px 40px;
					position: relative;
				}

				.pkd-image-glow {
					position: absolute;
					width: 320px;
					height: 320px;
					border-radius: 50%;
					background: radial-gradient(circle, ${theme.glow} 0%, transparent 70%);
					pointer-events: none;
				}

				.pkd-hero-img {
					position: relative;
					z-index: 2;
					filter: drop-shadow(0 0 40px ${theme.glow});
					transition: filter 0.4s ease, transform 0.4s ease;
					animation: pkd-float 4s ease-in-out infinite;
				}

				@keyframes pkd-float {
					0%, 100% { transform: translateY(0px); }
					50%       { transform: translateY(-12px); }
				}

				.pkd-name-hero {
					font-family: 'Bebas Neue', sans-serif;
					font-size: clamp(52px, 7vw, 88px);
					letter-spacing: 0.04em;
					color: ${theme.accent};
					text-transform: uppercase;
					line-height: 1;
					text-align: center;
					margin-top: 16px;
					text-shadow: 0 0 40px ${theme.glow};
				}

				.pkd-types {
					display: flex;
					gap: 8px;
					margin-top: 10px;
					justify-content: center;
				}

				.pkd-type-pill {
					padding: 4px 14px;
					border-radius: 100px;
					background: ${theme.pill};
					border: 1px solid ${theme.accent}55;
					color: ${theme.accent};
					font-size: 11px;
					letter-spacing: 0.12em;
					text-transform: uppercase;
					font-weight: 700;
				}

				/* RIGHT PANEL — Data */
				.pkd-right {
					border-left: 1px solid ${theme.accent}22;
					padding: 40px 32px;
					display: flex;
					flex-direction: column;
					gap: 32px;
					overflow-y: auto;
				}

				.pkd-section-label {
					font-size: 10px;
					letter-spacing: 0.2em;
					text-transform: uppercase;
					color: ${theme.accent};
					opacity: 0.6;
					margin-bottom: 12px;
				}

				/* Stats bars */
				.pkd-stat-row {
					display: grid;
					grid-template-columns: 52px 38px 1fr;
					align-items: center;
					gap: 12px;
					margin-bottom: 10px;
				}

				.pkd-stat-name {
					font-size: 10px;
					letter-spacing: 0.08em;
					text-transform: uppercase;
					color: rgba(255,255,255,0.4);
				}

				.pkd-stat-val {
					font-size: 13px;
					font-weight: 700;
					color: ${theme.accent};
					text-align: right;
				}

				.pkd-stat-track {
					height: 4px;
					background: rgba(255,255,255,0.06);
					border-radius: 4px;
					overflow: hidden;
				}

				.pkd-stat-fill {
					height: 100%;
					border-radius: 4px;
					background: linear-gradient(90deg, ${theme.accent}88, ${theme.accent});
					box-shadow: 0 0 8px ${theme.glow};
					transform-origin: left;
					animation: pkd-stat-in 1s cubic-bezier(0.34, 1.56, 0.64, 1) both;
					animation-delay: var(--delay, 0s);
				}

				@keyframes pkd-stat-in {
					from { width: 0; }
				}

				/* Info grid */
				.pkd-info-grid {
					display: grid;
					grid-template-columns: 1fr 1fr;
					gap: 12px;
				}

				.pkd-info-cell {
					background: rgba(255,255,255,0.03);
					border: 1px solid rgba(255,255,255,0.06);
					border-radius: 12px;
					padding: 14px 16px;
				}

				.pkd-info-cell-label {
					font-size: 10px;
					letter-spacing: 0.12em;
					text-transform: uppercase;
					color: rgba(255,255,255,0.3);
					margin-bottom: 4px;
				}

				.pkd-info-cell-value {
					font-size: 15px;
					font-weight: 700;
					color: ${theme.accent};
				}

				/* Abilities */
				.pkd-abilities {
					display: flex;
					flex-wrap: wrap;
					gap: 8px;
				}

				.pkd-ability-tag {
					padding: 5px 12px;
					border-radius: 100px;
					background: ${theme.pill};
					border: 1px solid ${theme.accent}44;
					font-size: 11px;
					color: ${theme.accent};
					text-transform: capitalize;
					letter-spacing: 0.05em;
				}

				.pkd-ability-tag.hidden-ability {
					border-style: dashed;
					opacity: 0.6;
				}

				/* Moves cloud */
				.pkd-moves {
					display: flex;
					flex-wrap: wrap;
					gap: 6px;
					max-height: 160px;
					overflow-y: auto;
				}

				.pkd-moves::-webkit-scrollbar { width: 3px; }
				.pkd-moves::-webkit-scrollbar-track { background: transparent; }
				.pkd-moves::-webkit-scrollbar-thumb { background: ${theme.accent}44; border-radius: 3px; }

				.pkd-move-tag {
					padding: 3px 10px;
					border-radius: 6px;
					background: rgba(255,255,255,0.04);
					border: 1px solid rgba(255,255,255,0.08);
					font-size: 10px;
					color: rgba(255,255,255,0.5);
					text-transform: capitalize;
					letter-spacing: 0.04em;
					transition: background 0.15s, color 0.15s;
				}
				.pkd-move-tag:hover {
					background: ${theme.pill};
					color: ${theme.accent};
					border-color: ${theme.accent}44;
				}

				/* Sprites row */
				.pkd-sprites {
					display: grid;
					grid-template-columns: repeat(4, 1fr);
					gap: 8px;
				}

				.pkd-sprite-cell {
					background: rgba(255,255,255,0.03);
					border: 1px solid rgba(255,255,255,0.06);
					border-radius: 10px;
					padding: 8px;
					display: flex;
					flex-direction: column;
					align-items: center;
					gap: 4px;
					transition: border-color 0.2s, background 0.2s;
				}
				.pkd-sprite-cell:hover {
					border-color: ${theme.accent}44;
					background: ${theme.pill};
				}

				.pkd-sprite-sublabel {
					font-size: 9px;
					letter-spacing: 0.08em;
					text-transform: uppercase;
					color: rgba(255,255,255,0.3);
					text-align: center;
				}

				/* Divider */
				.pkd-divider {
					height: 1px;
					background: linear-gradient(90deg, transparent, ${theme.accent}33, transparent);
				}

				/* Responsive */
				@media (max-width: 768px) {
					.pkd-layout {
						grid-template-columns: 1fr;
					}
					.pkd-right {
						border-left: none;
						border-top: 1px solid ${theme.accent}22;
					}
				}
			`}</style>

			<div className="pkd-page">
				{/* Back link */}
				<Link href="/dashboard/pokemons" className="pkd-back-link">
					← Volver a la Pokédex
				</Link>

				{/* Decorative background ID */}
				<div className="pkd-bg-id">#{paddedId}</div>

				<div className="pkd-layout">
					{/* ── LEFT: Hero ── */}
					<div className="pkd-left">
						<div className="pkd-image-glow" />

						{officialArt && (
							<Image
								src={officialArt}
								width={280}
								height={280}
								alt={`Artwork oficial de ${pokemon.name}`}
								className="pkd-hero-img"
								priority
							/>
						)}

						<h1 className="pkd-name-hero">{pokemon.name}</h1>

						<div className="pkd-types">
							{pokemon.types.map((t) => (
								<span key={t.slot} className="pkd-type-pill">{t.type.name}</span>
							))}
						</div>
					</div>

					{/* ── RIGHT: Data ── */}
					<div className="pkd-right">

						{/* Info rápida */}
						<div>
							<div className="pkd-section-label">// ficha técnica</div>
							<div className="pkd-info-grid">
								<div className="pkd-info-cell">
									<div className="pkd-info-cell-label">N.º Pokédex</div>
									<div className="pkd-info-cell-value">#{paddedId}</div>
								</div>
								<div className="pkd-info-cell">
									<div className="pkd-info-cell-label">Experiencia base</div>
									<div className="pkd-info-cell-value">{pokemon.base_experience ?? '—'}</div>
								</div>
								<div className="pkd-info-cell">
									<div className="pkd-info-cell-label">Altura</div>
									<div className="pkd-info-cell-value">{(pokemon.height / 10).toFixed(1)} m</div>
								</div>
								<div className="pkd-info-cell">
									<div className="pkd-info-cell-label">Peso</div>
									<div className="pkd-info-cell-value">{(pokemon.weight / 10).toFixed(1)} kg</div>
								</div>
							</div>
						</div>

						<div className="pkd-divider" />

						{/* Stats */}
						<div>
							<div className="pkd-section-label">// estadísticas base</div>
							{pokemon.stats.map((s, i) => (
								<div key={s.stat.name} className="pkd-stat-row">
									<span className="pkd-stat-name">{STAT_LABELS[s.stat.name] ?? s.stat.name}</span>
									<span className="pkd-stat-val">{s.base_stat}</span>
									<div className="pkd-stat-track">
										<div
											className="pkd-stat-fill"
											style={{
												width: `${Math.min((s.base_stat / 255) * 100, 100)}%`,
												'--delay': `${i * 0.08}s`,
											} as React.CSSProperties}
										/>
									</div>
								</div>
							))}
						</div>

						<div className="pkd-divider" />

						{/* Abilities */}
						<div>
							<div className="pkd-section-label">// habilidades</div>
							<div className="pkd-abilities">
								{pokemon.abilities.map((a) => (
									<span
										key={a.ability?.name}
										className={`pkd-ability-tag${a.is_hidden ? ' hidden-ability' : ''}`}
										title={a.is_hidden ? 'Habilidad oculta' : undefined}
									>
										{a.ability?.name}{a.is_hidden ? ' ✦' : ''}
									</span>
								))}
							</div>
						</div>

						<div className="pkd-divider" />

						{/* Sprites */}
						<div>
							<div className="pkd-section-label">// sprites</div>
							<div className="pkd-sprites">
								{[
									{ src: pokemon.sprites.front_default, label: 'Normal' },
									{ src: pokemon.sprites.back_default,  label: 'Espalda' },
									{ src: pokemon.sprites.front_shiny,   label: 'Shiny' },
									{ src: pokemon.sprites.back_shiny,    label: 'Shiny ↩' },
								].filter(s => s.src).map(({ src, label }) => (
									<div key={label} className="pkd-sprite-cell">
										<Image src={src} width={72} height={72} alt={label} />
										<span className="pkd-sprite-sublabel">{label}</span>
									</div>
								))}
							</div>
						</div>

						<div className="pkd-divider" />

						{/* Moves */}
						<div>
							<div className="pkd-section-label">// movimientos ({pokemon.moves.length})</div>
							<div className="pkd-moves">
								{pokemon.moves.map((m) => (
									<span key={m.move.name} className="pkd-move-tag">{m.move.name}</span>
								))}
							</div>
						</div>

					</div>
				</div>
			</div>
		</>
	);
}
