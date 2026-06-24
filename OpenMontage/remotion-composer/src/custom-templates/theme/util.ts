// 把 #RRGGBB / #RGB 转成带 alpha 的 rgba()。用于从主题底色派生玻璃卡面，
// 避免在组件里硬编码具体 rgba。
export function withAlpha(hex: string, alpha: number): string {
	const clean = hex.replace('#', '');
	const full =
		clean.length === 3
			? clean
					.split('')
					.map((c) => c + c)
					.join('')
			: clean;
	const bigint = parseInt(full, 16);
	const r = (bigint >> 16) & 255;
	const g = (bigint >> 8) & 255;
	const b = bigint & 255;
	return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
