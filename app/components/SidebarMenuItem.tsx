'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { JSX } from 'react';
import styles from './SidebarMenuItem.module.css';

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
		<Link
			href={path}
			className={`${styles.menuItem} group flex items-center gap-3 px-3 py-2.5 rounded-xl relative overflow-hidden no-underline transition-colors duration-200 ${
				isActive
					? styles.active
					: 'hover:bg-[rgba(255,255,255,0.04)]'
			}`}
		>
			<div
				className={`shrink-0 transition-colors duration-200 ${
					isActive
						? 'text-[#ffd740]'
						: 'text-white/35 group-hover:text-[rgba(255,215,64,0.7)]'
				}`}
			>
				{icon}
			</div>
			<div>
				<div
					className={`font-space text-xs font-bold leading-tight transition-colors duration-200 ${
						isActive ? 'text-[#f5f5f5]' : 'text-white/50'
					}`}
				>
					{title}
				</div>
				<div
					className={`font-space text-[9px] tracking-wide transition-colors duration-200 ${
						isActive
							? 'text-[rgba(255,215,64,0.55)]'
							: 'text-white/20'
					}`}
				>
					{subTitle}
				</div>
			</div>
		</Link>
	);
};
