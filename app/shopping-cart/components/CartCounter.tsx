'use client';

import React, { useState } from 'react';

interface Props {
	value?: number;
}

export const CartCounter = ({ value = 0 }: Props) => {
	const [counter, setCounter] = useState(value);

	const handleAdd = () => {
		setCounter((prev) => prev + 1);
	};

	const handleSubstract = () => {
		setCounter((prev) => prev - 1);
	};
	return (
		<>
			<span style={{ fontSize: '120px', fontFamily: "'Space Mono', monospace", fontWeight: 700, color: '#f0f0f0', lineHeight: 1, letterSpacing: '-0.04em' }}>{counter}</span>

			<div className='flex'>
				<button
					onClick={handleAdd}
					style={{ width: '100px', padding: '10px', background: 'rgba(255,200,50,0.1)', border: '1px solid rgba(255,200,50,0.3)', color: '#ffd740', fontFamily: "'Space Mono', monospace", fontSize: '16px', fontWeight: 700, borderRadius: '8px', cursor: 'pointer', transition: 'background 0.2s' }}
					onMouseOver={e => (e.currentTarget.style.background = 'rgba(255,200,50,0.2)')}
					onMouseOut={e => (e.currentTarget.style.background = 'rgba(255,200,50,0.1)')}
				>
					+1
				</button>
				<button
					onClick={handleSubstract}
					style={{ width: '100px', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)', fontFamily: "'Space Mono', monospace", fontSize: '16px', fontWeight: 700, borderRadius: '8px', cursor: 'pointer', transition: 'background 0.2s' }}
					onMouseOver={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
					onMouseOut={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
				>
					-1
				</button>
			</div>
		</>
	);
};
