import Image from 'next/image';
import React from 'react';
import {
	IoBrowsersOutline,
	IoCalculatorOutline,
	IoExtensionPuzzleOutline,
	IoLogoReact,
} from 'react-icons/io5';
import { SidebarMenuItem } from './SidebarMenuItem';

const menuItems = [
	{
		path: '/dashboard/main',
		icon: <IoBrowsersOutline size={18} />,
		title: 'Dashboard',
		subTitle: 'Visualización',
	},
	{
		path: '/dashboard/counter',
		icon: <IoCalculatorOutline size={18} />,
		title: 'Counter',
		subTitle: 'Contador client side',
	},
	{
		path: '/dashboard/pokemons',
		icon: <IoExtensionPuzzleOutline size={18} />,
		title: 'Pokémons',
		subTitle: 'Generación estática',
	},
];

export const Sidebar = () => {
	return (
		<>
			<style>{`
				@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:wght@400;700&display=swap');

				.sb-root {
					width: 240px;
					min-width: 240px;
					min-height: 100vh;
					background: #080810;
					border-right: 1px solid rgba(255, 200, 50, 0.08);
					display: flex;
					flex-direction: column;
					position: relative;
					overflow: hidden;
					flex-shrink: 0;
				}

				/* Subtle background glow */
				.sb-root::before {
					content: '';
					position: absolute;
					top: -80px;
					left: -80px;
					width: 240px;
					height: 240px;
					background: radial-gradient(circle, rgba(255,200,50,0.06) 0%, transparent 70%);
					pointer-events: none;
				}

				/* Logo area */
				.sb-logo {
					padding: 28px 20px 20px;
					border-bottom: 1px solid rgba(255,255,255,0.04);
				}

				.sb-logo-mark {
					display: flex;
					align-items: center;
					gap: 8px;
				}

				.sb-logo-icon {
					color: #ffd740;
					animation: sb-spin 12s linear infinite;
					flex-shrink: 0;
				}

				@keyframes sb-spin {
					from { transform: rotate(0deg); }
					to   { transform: rotate(360deg); }
				}

				.sb-logo-text {
					font-family: 'Bebas Neue', sans-serif;
					font-size: 22px;
					letter-spacing: 0.06em;
					color: #f0f0f0;
					line-height: 1;
				}

				.sb-logo-text span {
					color: #ffd740;
				}

				.sb-logo-sub {
					font-family: 'Space Mono', monospace;
					font-size: 9px;
					color: rgba(255,255,255,0.2);
					letter-spacing: 0.12em;
					text-transform: uppercase;
					margin-top: 6px;
					padding-left: 2px;
				}

				/* Profile */
				.sb-profile {
					padding: 20px;
					border-bottom: 1px solid rgba(255,255,255,0.04);
					display: flex;
					align-items: center;
					gap: 12px;
				}

				.sb-avatar-ring {
					width: 38px;
					height: 38px;
					border-radius: 50%;
					padding: 2px;
					background: linear-gradient(135deg, #ffd740, rgba(255,215,64,0.2));
					flex-shrink: 0;
				}

				.sb-avatar-inner {
					width: 100%;
					height: 100%;
					border-radius: 50%;
					overflow: hidden;
					background: #080810;
				}

				.sb-profile-info {}

				.sb-welcome {
					font-family: 'Space Mono', monospace;
					font-size: 9px;
					letter-spacing: 0.1em;
					text-transform: uppercase;
					color: rgba(255,255,255,0.25);
					margin-bottom: 2px;
				}

				.sb-username {
					font-family: 'Space Mono', monospace;
					font-size: 12px;
					font-weight: 700;
					color: #f0f0f0;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					max-width: 140px;
				}

				/* Nav section */
				.sb-nav {
					flex: 1;
					padding: 16px 12px;
					display: flex;
					flex-direction: column;
					gap: 2px;
				}

				.sb-nav-label {
					font-family: 'Space Mono', monospace;
					font-size: 9px;
					letter-spacing: 0.18em;
					text-transform: uppercase;
					color: rgba(255,255,255,0.18);
					padding: 0 8px;
					margin-bottom: 8px;
				}

				/* Footer */
				.sb-footer {
					padding: 16px 20px;
					border-top: 1px solid rgba(255,255,255,0.04);
				}

				.sb-footer-text {
					font-family: 'Space Mono', monospace;
					font-size: 9px;
					color: rgba(255,255,255,0.15);
					letter-spacing: 0.08em;
				}

				.sb-footer-text span {
					color: rgba(255,200,50,0.4);
				}

				/* Vertical glow line at far left edge */
				.sb-edge-line {
					position: absolute;
					left: 0;
					top: 20%;
					bottom: 20%;
					width: 1px;
					background: linear-gradient(
						180deg,
						transparent 0%,
						rgba(255,200,50,0.4) 40%,
						rgba(255,200,50,0.4) 60%,
						transparent 100%
					);
				}
			`}</style>

			<aside className="sb-root">
				<div className="sb-edge-line" />

				{/* Logo */}
				<div className="sb-logo">
					<div className="sb-logo-mark">
						<IoLogoReact size={20} className="sb-logo-icon" />
						<div className="sb-logo-text">
							Dash<span>Board</span>
						</div>
					</div>
					<p className="sb-logo-sub">// next.js · app router</p>
				</div>

				{/* Profile */}
				<div className="sb-profile">
					<div className="sb-avatar-ring">
						<div className="sb-avatar-inner">
							<Image
								src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c"
								alt="User avatar"
								width={38}
								height={38}
								style={{ objectFit: 'cover', width: '100%', height: '100%' }}
							/>
						</div>
					</div>
					<div className="sb-profile-info">
						<div className="sb-welcome">Bienvenido</div>
						<div className="sb-username">Laureano Rosales</div>
					</div>
				</div>

				{/* Nav */}
				<nav className="sb-nav">
					<div className="sb-nav-label">// navegación</div>
					{menuItems.map((item) => (
						<SidebarMenuItem key={item.path} {...item} />
					))}
				</nav>

				{/* Footer */}
				<div className="sb-footer">
					<div className="sb-footer-text">
						Curso Udemy · <span>Fernando Herrera</span>
					</div>
				</div>
			</aside>
		</>
	);
};
