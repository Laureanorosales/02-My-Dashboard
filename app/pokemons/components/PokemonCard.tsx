import Link from 'next/link';
import React from 'react';
import { SimplePokemon } from '../interfaces/simple-pokemon';
import Image from 'next/image';

interface Props {
	pokemon: SimplePokemon;
}

export const PokemonCard = ({ pokemon }: Props) => {
	const { id, name } = pokemon;
	const paddedId = String(id).padStart(3, '0');

	return (
		<>
			<style>{`
				@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');

				.poke-card {
					font-family: 'DM Sans', sans-serif;
					position: relative;
					width: 200px;
					border-radius: 20px;
					background: linear-gradient(145deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%);
					border: 1px solid rgba(255, 200, 50, 0.15);
					box-shadow:
						0 0 0 1px rgba(255, 200, 50, 0.08),
						0 8px 32px rgba(0, 0, 0, 0.5),
						inset 0 1px 0 rgba(255,255,255,0.05);
					transition:
						transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
						box-shadow 0.35s ease;
					transform-style: preserve-3d;
					overflow: hidden;
					text-decoration: none;
					display: block;
				}

				.poke-card::before {
					content: '';
					position: absolute;
					inset: 0;
					border-radius: 20px;
					background: linear-gradient(
						135deg,
						rgba(255, 200, 50, 0.12) 0%,
						transparent 40%,
						transparent 60%,
						rgba(255, 200, 50, 0.06) 100%
					);
					opacity: 0;
					transition: opacity 0.35s ease;
					pointer-events: none;
					z-index: 1;
				}

				.poke-card::after {
					content: '';
					position: absolute;
					top: -60%;
					left: -60%;
					width: 60%;
					height: 200%;
					background: linear-gradient(
						105deg,
						transparent 40%,
						rgba(255, 220, 80, 0.08) 50%,
						transparent 60%
					);
					transform: rotate(25deg);
					transition: left 0.6s ease;
					pointer-events: none;
					z-index: 2;
				}

				.poke-card:hover {
					transform: translateY(-10px) rotateX(4deg) scale(1.03);
					box-shadow:
						0 0 0 1px rgba(255, 200, 50, 0.35),
						0 20px 60px rgba(0, 0, 0, 0.6),
						0 0 40px rgba(255, 180, 30, 0.12),
						inset 0 1px 0 rgba(255,255,255,0.08);
				}

				.poke-card:hover::before {
					opacity: 1;
				}

				.poke-card:hover::after {
					left: 120%;
				}

				.poke-id-badge {
					font-family: 'Syne', sans-serif;
					font-weight: 800;
					font-size: 11px;
					letter-spacing: 0.12em;
					color: rgba(255, 200, 50, 0.55);
					text-transform: uppercase;
				}

				.poke-img-wrapper {
					position: relative;
					width: 110px;
					height: 110px;
					margin: 0 auto;
					filter: drop-shadow(0 0 18px rgba(255, 200, 50, 0.2));
					transition: filter 0.35s ease, transform 0.35s ease;
				}

				.poke-card:hover .poke-img-wrapper {
					filter: drop-shadow(0 0 28px rgba(255, 200, 50, 0.45));
					transform: translateY(-4px) scale(1.05);
				}

				.poke-name {
					font-family: 'Syne', sans-serif;
					font-weight: 800;
					font-size: 17px;
					letter-spacing: 0.03em;
					color: #f0f0f0;
					text-transform: capitalize;
					margin-top: 10px;
					line-height: 1.1;
				}

				.poke-divider {
					width: 32px;
					height: 2px;
					background: linear-gradient(90deg, rgba(255,200,50,0.7), rgba(255,200,50,0.1));
					border-radius: 2px;
					margin: 10px auto 0;
				}

				.poke-detail-btn {
					display: inline-block;
					margin-top: 14px;
					padding: 6px 18px;
					border-radius: 100px;
					background: rgba(255, 200, 50, 0.08);
					border: 1px solid rgba(255, 200, 50, 0.3);
					color: rgba(255, 200, 50, 0.9);
					font-family: 'DM Sans', sans-serif;
					font-size: 11px;
					font-weight: 500;
					letter-spacing: 0.08em;
					text-transform: uppercase;
					transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
				}

				.poke-card:hover .poke-detail-btn {
					background: rgba(255, 200, 50, 0.18);
					border-color: rgba(255, 200, 50, 0.7);
					color: #ffd840;
				}

				.poke-footer {
					margin-top: 14px;
					border-top: 1px solid rgba(255, 255, 255, 0.05);
					padding: 10px 16px;
					display: flex;
					align-items: center;
					gap: 8px;
				}

				.poke-dot {
					width: 6px;
					height: 6px;
					border-radius: 50%;
					background: rgba(255, 200, 50, 0.35);
					flex-shrink: 0;
				}

				.poke-footer-text {
					font-size: 11px;
					color: rgba(255, 255, 255, 0.3);
					font-family: 'DM Sans', sans-serif;
				}

				@keyframes pulse-glow {
					0%, 100% { box-shadow: 0 0 6px rgba(255, 200, 50, 0.25); }
					50%        { box-shadow: 0 0 14px rgba(255, 200, 50, 0.55); }
				}
				.poke-dot-animated {
					animation: pulse-glow 2.5s ease-in-out infinite;
					border-radius: 50%;
					width: 6px;
					height: 6px;
					background: rgba(255, 200, 50, 0.45);
					flex-shrink: 0;
				}
			`}</style>

			<Link href={`/dashboard/pokemon/${id}`} className="poke-card">
				{/* Main body */}
				<div style={{ padding: '22px 16px 0', textAlign: 'center', position: 'relative', zIndex: 3 }}>
					{/* ID Badge */}
					<div className="poke-id-badge">#{paddedId}</div>

					{/* Pokémon Image */}
					<div className="poke-img-wrapper">
						<Image
							fill
							alt={name}
							priority={false}
							src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
							className="object-contain"
						/>
					</div>

					{/* Name */}
					<p className="poke-name">{name}</p>

					{/* Decorative divider */}
					<div className="poke-divider" />

					{/* CTA */}
					<span className="poke-detail-btn">Ver detalle</span>
				</div>

				{/* Footer */}
				<div className="poke-footer" style={{ position: 'relative', zIndex: 3 }}>
					<div className="poke-dot-animated" />
					<span className="poke-footer-text">Pokédex Nacional</span>
				</div>
			</Link>
		</>
	);
};
