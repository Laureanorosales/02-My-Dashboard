import { Sidebar } from '../components/Sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<div style={{ background: '#080810', minHeight: '100vh', display: 'flex', width: '100vw', overflowX: 'hidden' }}>
			<Sidebar />
			<div style={{ flex: 1, overflowY: 'auto' }}>{children}</div>
		</div>
	);
}
