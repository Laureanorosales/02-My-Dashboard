'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { JSX } from 'react';

interface Props {
	path: string;
	icon: JSX.Element;
	title: string;
	subTitle: string;
}

export const SidebarMenuItem = ({ path, icon, title, subTitle }: Props) => {
	const currentPath = usePathname();
	const isActive = currentPath === path;

	return (
		<>
			<style>{`
				.sb-menu-item {
					display: flex;
					align-items: center;
					gap: 12px;
					padding: 10px 12px;
					border-radius: 10px;
					text-decoration: none;
					position: relative;
					transition: background 0.2s ease;
					overflow: hidden;
				}

				.sb-menu-item::before {
					content: '';
					position: absolute;
					left: 0;
					top: 20%;
					bottom: 20%;
					width: 2px;
					border-radius: 2px;
					background: #ffd740;
					box-shadow: 0 0 8px rgba(255, 215, 64, 0.7);
					opacity: 0;
					transition: opacity 0.2s ease;
				}

				.sb-menu-item.active {
					background: rgba(255, 215, 64, 0.07);
				}

				.sb-menu-item.active::before {
					opacity: 1;
				}

				.sb-menu-item:not(.active):hover {
					background: rgba(255, 255, 255, 0.04);
				}

				.sb-menu-item:not(.active):hover .sb-mi-icon {
					color: rgba(255,215,64,0.7);
				}

				.sb-mi-icon {
					color: ${isActive ? '#ffd740' : 'rgba(255,255,255,0.35)'};
					flex-shrink: 0;
					transition: color 0.2s ease;
				}

				.sb-mi-title {
					font-family: 'Space Mono', monospace;
					font-size: 12px;
					font-weight: 700;
					color: ${isActive ? '#f5f5f5' : 'rgba(255,255,255,0.5)'};
					line-height: 1.2;
					transition: color 0.2s ease;
				}

				.sb-mi-subtitle {
					font-family: 'Space Mono', monospace;
					font-size: 9px;
					color: ${isActive ? 'rgba(255,215,64,0.55)' : 'rgba(255,255,255,0.2)'};
					letter-spacing: 0.06em;
					transition: color 0.2s ease;
				}
			`}</style>

			<Link
				href={path}
				className={`sb-menu-item${isActive ? ' active' : ''}`}
			>
				<div className="sb-mi-icon">{icon}</div>
				<div>
					<div className="sb-mi-title">{title}</div>
					<div className="sb-mi-subtitle">{subTitle}</div>
				</div>
			</Link>
		</>
	);
};
