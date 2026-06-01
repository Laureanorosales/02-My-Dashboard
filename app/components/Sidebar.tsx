import Image from 'next/image';
import React from 'react';
import {
	IoBrowsersOutline,
	IoCalculatorOutline,
	IoExtensionPuzzleOutline,
	IoLogoReact,
} from 'react-icons/io5';
import { SidebarMenuItem } from './SidebarMenuItem';
import styles from './Sidebar.module.css';

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
		<aside className={styles.root}>
			<div className={styles.edgeLine} />

			<div className="border-b border-white/5 px-5 pt-7 pb-5">
				<div className="flex items-center gap-2">
					<IoLogoReact size={20} className={styles.logoIcon} />
					<div className="font-bebas text-[22px] leading-none tracking-wide text-[#f0f0f0]">
						Dash<span className="text-[#ffd740]">Board</span>
					</div>
				</div>
				<p className="font-space text-[9px] uppercase tracking-[0.12em] text-white/20 mt-1.5 pl-0.5">
					{'// next.js · app router'}
				</p>
			</div>

			<div className="flex items-center gap-3 border-b border-white/5 px-5 py-5">
				<div className={styles.avatarRing}>
					<div className={styles.avatarInner}>
						<Image
							src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c"
							alt="User avatar"
							width={38}
							height={38}
							className="object-cover"
						/>
					</div>
				</div>
				<div>
					<div className="font-space text-[9px] uppercase tracking-[0.1em] text-white/25 mb-0.5">
						Bienvenido
					</div>
					<div className="font-space text-xs font-bold text-[#f0f0f0] truncate max-w-[140px]">
						Laureano Rosales
					</div>
				</div>
			</div>

			<nav className="flex flex-1 flex-col gap-0.5 px-3 py-4">
				<div className="font-space text-[9px] uppercase tracking-[0.18em] text-white/18 px-2 mb-2">
					{'// navegación'}
				</div>
				{menuItems.map((item) => (
					<SidebarMenuItem key={item.path} {...item} />
				))}
			</nav>

			<div className="border-t border-white/5 px-5 py-4">
				<div className="font-space text-[9px] tracking-[0.08em] text-white/15">
					Curso Udemy · <span className="text-[rgba(255,200,50,0.4)]">Fernando Herrera</span>
				</div>
			</div>
		</aside>
	);
};
