export const TYPE_COLORS: Record<string, { bg: string; accent: string; glow: string; pill: string }> = {
	fire: { bg: '#1a0800', accent: '#ff6b2b', glow: 'rgba(255,107,43,0.35)', pill: 'rgba(255,107,43,0.15)' },
	water: { bg: '#00091a', accent: '#4fc3f7', glow: 'rgba(79,195,247,0.35)', pill: 'rgba(79,195,247,0.15)' },
	grass: { bg: '#001a08', accent: '#69f0ae', glow: 'rgba(105,240,174,0.35)', pill: 'rgba(105,240,174,0.15)' },
	electric: { bg: '#1a1500', accent: '#ffd740', glow: 'rgba(255,215,64,0.35)', pill: 'rgba(255,215,64,0.15)' },
	psychic: { bg: '#1a0015', accent: '#f48fb1', glow: 'rgba(244,143,177,0.35)', pill: 'rgba(244,143,177,0.15)' },
	ice: { bg: '#001018', accent: '#80deea', glow: 'rgba(128,222,234,0.35)', pill: 'rgba(128,222,234,0.15)' },
	dragon: { bg: '#0d0020', accent: '#b388ff', glow: 'rgba(179,136,255,0.35)', pill: 'rgba(179,136,255,0.15)' },
	dark: { bg: '#0a0a0a', accent: '#bcaaa4', glow: 'rgba(188,170,164,0.35)', pill: 'rgba(188,170,164,0.15)' },
	fairy: { bg: '#1a0018', accent: '#f8bbd0', glow: 'rgba(248,187,208,0.35)', pill: 'rgba(248,187,208,0.15)' },
	fighting: { bg: '#1a0500', accent: '#ff8a65', glow: 'rgba(255,138,101,0.35)', pill: 'rgba(255,138,101,0.15)' },
	poison: { bg: '#12001a', accent: '#ce93d8', glow: 'rgba(206,147,216,0.35)', pill: 'rgba(206,147,216,0.15)' },
	ground: { bg: '#1a0e00', accent: '#ffcc80', glow: 'rgba(255,204,128,0.35)', pill: 'rgba(255,204,128,0.15)' },
	rock: { bg: '#111008', accent: '#d7ccc8', glow: 'rgba(215,204,200,0.35)', pill: 'rgba(215,204,200,0.15)' },
	ghost: { bg: '#0a001a', accent: '#9575cd', glow: 'rgba(149,117,205,0.35)', pill: 'rgba(149,117,205,0.15)' },
	steel: { bg: '#0d0f12', accent: '#b0bec5', glow: 'rgba(176,190,197,0.35)', pill: 'rgba(176,190,197,0.15)' },
	bug: { bg: '#0d1200', accent: '#aed581', glow: 'rgba(174,213,129,0.35)', pill: 'rgba(174,213,129,0.15)' },
	flying: { bg: '#000d1a', accent: '#90caf9', glow: 'rgba(144,202,249,0.35)', pill: 'rgba(144,202,249,0.15)' },
	normal: { bg: '#111111', accent: '#e0e0e0', glow: 'rgba(224,224,224,0.3)', pill: 'rgba(224,224,224,0.12)' },
};

export const STAT_LABELS: Record<string, string> = {
	hp: 'HP',
	attack: 'ATQ',
	defense: 'DEF',
	'special-attack': 'S.ATQ',
	'special-defense': 'S.DEF',
	speed: 'VEL',
};
