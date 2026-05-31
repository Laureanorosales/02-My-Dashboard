import { CartCounter } from '@/app/shopping-cart/components/CartCounter';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Shopping Cart',
	description: 'Un simple contador',
};

export default function CounterPage() {
	return (
		<>
			<div style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				minHeight: '100vh',
				fontFamily: "'Space Mono', monospace",
				gap: '8px',
			}}>
				<p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,200,50,0.6)', marginBottom: '4px' }}>
					// carrito de compras
				</p>
				<span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginBottom: '16px' }}>
					Productos en el carrito
				</span>
				<CartCounter value={10} />
			</div>
		</>
	);
}
