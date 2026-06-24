import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {osc01} from '../animation/presence';
import type {Palette} from '../theme/palettes';

// 全息背景特效层（全部 frame 驱动、确定性，无 WebGL 依赖）。
// 观感参考：react-bits 的 Beams / Threads / Iridescence、MagicUI 的 Retro Grid，
// 以及 CRT 扫描线。按我们自己的接口重写，保证 Remotion 逐帧导出一致。

function hexToRgb(hex: string): {r: number; g: number; b: number} {
	const clean = hex.replace('#', '');
	const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean;
	const bigint = parseInt(full, 16);
	return {r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255};
}

const rgba = (hex: string, a: number): string => {
	const {r, g, b} = hexToRgb(hex);
	return `rgba(${r}, ${g}, ${b}, ${a})`;
};

// 透视地平网格（synthwave / 全息地板）——参考 MagicUI Retro Grid。
// 用 CSS 3D 把一张网格倾倒成地板，backgroundPosition 随帧滚动产生向地平线
// 推进的运动；顶部叠一条地平辉光。
export const RetroGrid: React.FC<{colors: Palette; speed?: number}> = ({
	colors,
	speed = 0.6,
}) => {
	const frame = useCurrentFrame();
	const cell = 80;
	const scroll = (frame * speed) % cell;
	const line = rgba(colors.accent[0], 0.5);

	const plane = (originY: string): React.CSSProperties => ({
		position: 'absolute',
		left: '-50%',
		right: '-50%',
		bottom: 0,
		height: '140%',
		transform: 'rotateX(72deg)',
		transformOrigin: originY,
		backgroundImage: `linear-gradient(${line} 1px, transparent 1px), linear-gradient(90deg, ${line} 1px, transparent 1px)`,
		backgroundSize: `${cell}px ${cell}px`,
		backgroundPositionY: `${scroll}px`,
		maskImage: 'linear-gradient(to top, #000 0%, rgba(0,0,0,0.15) 55%, transparent 80%)',
		WebkitMaskImage: 'linear-gradient(to top, #000 0%, rgba(0,0,0,0.15) 55%, transparent 80%)',
	});

	return (
		<AbsoluteFill style={{overflow: 'hidden', perspective: 420}}>
			{/* 地平辉光带 */}
			<div
				style={{
					position: 'absolute',
					left: 0,
					right: 0,
					top: '46%',
					height: 2,
					background: rgba(colors.accent[1], 0.55),
					boxShadow: `0 0 60px 14px ${rgba(colors.accent[1], 0.35)}`,
				}}
			/>
			<div style={{...plane('center bottom'), top: '46%'}} />
		</AbsoluteFill>
	);
};

// 斜向光束（react-bits Beams）——若干细长渐变条，缓慢飘移与明灭。
export const Beams: React.FC<{colors: Palette; count?: number}> = ({
	colors,
	count = 5,
}) => {
	const frame = useCurrentFrame();
	const {fps, width} = useVideoConfig();
	return (
		<AbsoluteFill style={{overflow: 'hidden', mixBlendMode: 'screen'}}>
			{Array.from({length: count}, (_, i) => {
				const color = colors.accent[i % colors.accent.length];
				const baseX = (width / (count + 1)) * (i + 1);
				const sway = Math.sin((frame / fps) * 0.5 + i) * 60;
				const glow = 0.18 + 0.16 * osc01(frame, fps, 6 + i, i * 0.7);
				return (
					<div
						key={i}
						style={{
							position: 'absolute',
							top: '-30%',
							left: baseX + sway,
							width: 130,
							height: '160%',
							background: `linear-gradient(180deg, transparent 0%, ${rgba(color, glow)} 45%, transparent 100%)`,
							filter: 'blur(30px)',
							transform: `rotate(${18 + (i % 2) * 4}deg)`,
						}}
					/>
				);
			})}
		</AbsoluteFill>
	);
};

// 流动丝线（react-bits Threads）——若干水平正弦曲线，相位随帧推进。
export const Threads: React.FC<{colors: Palette; count?: number}> = ({
	colors,
	count = 4,
}) => {
	const frame = useCurrentFrame();
	const {fps, width, height} = useVideoConfig();
	const seg = 24;
	const t = frame / fps;
	return (
		<AbsoluteFill style={{mixBlendMode: 'screen'}}>
			<svg
				width={width}
				height={height}
				viewBox={`0 0 ${width} ${height}`}
				style={{position: 'absolute', inset: 0}}
			>
				{Array.from({length: count}, (_, i) => {
					const color = colors.accent[i % colors.accent.length];
					const yBase = (height / (count + 1)) * (i + 1);
					const amp = 36 + i * 10;
					const pts = Array.from({length: seg + 1}, (_, k) => {
						const x = (width / seg) * k;
						const y =
							yBase +
							Math.sin((k / seg) * Math.PI * 2 * 1.5 + t * (0.6 + i * 0.15) + i) * amp;
						return `${x.toFixed(1)},${y.toFixed(1)}`;
					});
					return (
						<polyline
							key={i}
							points={pts.join(' ')}
							fill="none"
							stroke={rgba(color, 0.34)}
							strokeWidth={1.6}
						/>
					);
				})}
			</svg>
		</AbsoluteFill>
	);
};

// 全息扫描线 + 缓慢竖向扫掠（CRT 质感）。
export const Scanlines: React.FC<{colors: Palette}> = ({colors}) => {
	const frame = useCurrentFrame();
	const {fps, height} = useVideoConfig();
	const sweepY = (osc01(frame, fps, 8) * (height + 200)) - 100;
	return (
		<AbsoluteFill style={{pointerEvents: 'none', mixBlendMode: 'screen'}}>
			<AbsoluteFill
				style={{
					backgroundImage: `repeating-linear-gradient(0deg, ${rgba(colors.accent[0], 0.07)} 0px, ${rgba(colors.accent[0], 0.07)} 1px, transparent 1px, transparent 3px)`,
				}}
			/>
			<div
				style={{
					position: 'absolute',
					left: 0,
					right: 0,
					top: sweepY,
					height: 120,
					background: `linear-gradient(180deg, transparent, ${rgba(colors.accent[1], 0.14)}, transparent)`,
				}}
			/>
		</AbsoluteFill>
	);
};
