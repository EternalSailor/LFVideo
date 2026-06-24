// 调色板：模板库的颜色单一事实源。每个 palette 由「主题名」索引，
// 与 Root.tsx 的 THEMES 同名，于是「一个主题名」即可统一驱动全片。

export interface Palette {
	bg: {from: string; to: string};
	text: {primary: string; secondary: string; muted: string};
	// 至少 4 个强调色，按卡片顺序循环取用。
	accent: string[];
	line: string;
	surface: string;
	// 终端 / 代码场景的暗底（与正文卡区分开）。
	codeBg: string;
}

export interface Fonts {
	family: string;
	mono: string;
}

// 中文优先字体栈，Latin 字形走前置的西文字体、CJK 自动回退。
const CJK = '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans SC", sans-serif';
const MONO = '"SF Mono", "JetBrains Mono", "Cascadia Code", Consolas, monospace';

export const PALETTES: Record<string, Palette> = {
	'warm-glass': {
		bg: {from: '#1A1320', to: '#2E2233'},
		text: {primary: '#F3E9DA', secondary: '#C9B5A0', muted: '#9C8A78'},
		accent: ['#FFB347', '#FF7EB6', '#7FD8C0', '#C9A6E8'],
		line: 'rgba(255,232,205,0.10)',
		surface: 'rgba(255,232,205,0.05)',
		codeBg: '#160E1C',
	},
	'flat-motion-graphics': {
		bg: {from: '#0F172A', to: '#1E293B'},
		text: {primary: '#F8FAFC', secondary: '#CBD5E1', muted: '#94A3B8'},
		accent: ['#7C3AED', '#EC4899', '#06B6D4', '#F59E0B'],
		line: 'rgba(255,255,255,0.08)',
		surface: 'rgba(255,255,255,0.04)',
		codeBg: '#0B1120',
	},
	'clean-professional': {
		bg: {from: '#FFFFFF', to: '#F1F5F9'},
		text: {primary: '#1F2937', secondary: '#4B5563', muted: '#6B7280'},
		accent: ['#2563EB', '#F59E0B', '#10B981', '#8B5CF6'],
		line: 'rgba(0,0,0,0.08)',
		surface: 'rgba(0,0,0,0.03)',
		codeBg: '#0F172A',
	},
	'minimalist-diagram': {
		bg: {from: '#FAFAFA', to: '#FFFFFF'},
		text: {primary: '#1A1A2E', secondary: '#3F3F5A', muted: '#6B7280'},
		accent: ['#E94560', '#0F3460', '#1A1A2E', '#9CA3AF'],
		line: 'rgba(0,0,0,0.07)',
		surface: 'rgba(0,0,0,0.025)',
		codeBg: '#1A1A2E',
	},
	'anime-ghibli': {
		bg: {from: '#0A0A1A', to: '#1A2332'},
		text: {primary: '#F0E6D3', secondary: '#C9BBA0', muted: '#A8957E'},
		accent: ['#FFB347', '#FF6B9D', '#A8E6CF', '#6B4C8A'],
		line: 'rgba(240,230,211,0.10)',
		surface: 'rgba(240,230,211,0.05)',
		codeBg: '#0A0F1A',
	},
};

export const FONTS: Record<string, Fonts> = {
	'warm-glass': {family: CJK, mono: MONO},
	'flat-motion-graphics': {family: `"Space Grotesk", ${CJK}`, mono: `"Fira Code", ${MONO}`},
	'clean-professional': {family: `"Inter", ${CJK}`, mono: `"JetBrains Mono", ${MONO}`},
	'minimalist-diagram': {family: `"IBM Plex Sans", ${CJK}`, mono: `"IBM Plex Mono", ${MONO}`},
	'anime-ghibli': {family: `"Noto Serif JP", ${CJK}`, mono: `"Fira Code", ${MONO}`},
};

export const DEFAULT_THEME_NAME = 'warm-glass';

export function resolvePalette(themeName?: string): Palette {
	return (themeName && PALETTES[themeName]) || PALETTES[DEFAULT_THEME_NAME];
}

export function resolveFonts(themeName?: string): Fonts {
	return (themeName && FONTS[themeName]) || FONTS[DEFAULT_THEME_NAME];
}
