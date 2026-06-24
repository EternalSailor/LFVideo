import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {Background, HOLOGRAPHIC} from './custom-templates/background/Background';
import {
	Beams,
	Threads,
	RetroGrid,
	Scanlines,
} from './custom-templates/background/holographicEffects';

// 背景特效目录（catalog）合成：把当前所有背景特效逐个铺开，每个展示 5 秒，
// 并在画面上写明调用方式。仅用于在 Studio 里查阅 / 出片演示，不参与 ep02 渲染。
// 想新增一个特效：在 holographicEffects.tsx 写好组件后，往 DEMOS 里加一项即可。

export const SEGMENT_FRAMES = 150; // 5s @ 30fps

interface Demo {
	id: string;
	kind: 'variant' | 'effect';
	note: string;
	usage: string;
	render: () => React.ReactNode;
}

// 单独特效演示时垫一层全息底色，便于看清该特效本身。
const baseStyle: React.CSSProperties = {
	background: `linear-gradient(135deg, ${HOLOGRAPHIC.bg.from} 0%, ${HOLOGRAPHIC.bg.to} 100%)`,
};

const onBase = (node: React.ReactNode): React.ReactNode => (
	<AbsoluteFill style={baseStyle}>{node}</AbsoluteFill>
);

const DEMOS: Demo[] = [
	{
		id: 'gradient',
		kind: 'variant',
		note: '网格渐变底 + 斜向光束 + 扫描线（默认）',
		usage: '<Background variant="gradient" />',
		render: () => <Background variant="gradient" />,
	},
	{
		id: 'grid',
		kind: 'variant',
		note: '渐变底 + 透视网格地板 + 扫描线',
		usage: '<Background variant="grid" />',
		render: () => <Background variant="grid" />,
	},
	{
		id: 'particles',
		kind: 'variant',
		note: '渐变底 + 漂浮粒子 + 扫描线',
		usage: '<Background variant="particles" />',
		render: () => <Background variant="particles" />,
	},
	{
		id: 'holo',
		kind: 'variant',
		note: '全息满配：网格地板 + 光束 + 丝线 + 扫描线',
		usage: '<Background variant="holo" />',
		render: () => <Background variant="holo" />,
	},
	{
		id: 'Beams',
		kind: 'effect',
		note: '斜向光束：缓慢飘移与明灭',
		usage: '<Beams colors={HOLOGRAPHIC} count={6} />',
		render: () => onBase(<Beams colors={HOLOGRAPHIC} />),
	},
	{
		id: 'Threads',
		kind: 'effect',
		note: '流动丝线：水平正弦曲线随帧推进',
		usage: '<Threads colors={HOLOGRAPHIC} count={5} />',
		render: () => onBase(<Threads colors={HOLOGRAPHIC} />),
	},
	{
		id: 'RetroGrid',
		kind: 'effect',
		note: '透视全息地板 + 地平辉光，向地平线推进',
		usage: '<RetroGrid colors={HOLOGRAPHIC} speed={0.8} />',
		render: () => onBase(<RetroGrid colors={HOLOGRAPHIC} />),
	},
	{
		id: 'Scanlines',
		kind: 'effect',
		note: 'CRT 扫描线 + 缓慢竖向扫掠',
		usage: '<Scanlines colors={HOLOGRAPHIC} />',
		render: () => onBase(<Scanlines colors={HOLOGRAPHIC} />),
	},
];

export const SHOWCASE_FRAMES = DEMOS.length * SEGMENT_FRAMES;

const Card: React.FC<{demo: Demo; index: number; total: number}> = ({
	demo,
	index,
	total,
}) => {
	const importLine =
		demo.kind === 'effect'
			? `import {${demo.id}, HOLOGRAPHIC} from './custom-templates';`
			: "import {Background} from './custom-templates';";
	return (
		<div
			style={{
				position: 'absolute',
				left: 64,
				bottom: 64,
				maxWidth: 1180,
				padding: '24px 32px',
				borderRadius: 16,
				background: 'rgba(4, 12, 28, 0.62)',
				border: '1px solid rgba(120,205,255,0.35)',
				boxShadow: '0 0 40px rgba(54,208,255,0.18)',
				backdropFilter: 'blur(6px)',
				fontFamily: '"Space Grotesk", system-ui, sans-serif',
				color: '#EAF6FF',
			}}
		>
			<div
				style={{
					fontSize: 18,
					letterSpacing: 2,
					color: '#5FE6FF',
					marginBottom: 6,
				}}
			>
				背景特效目录 {index + 1} / {total}
				<span style={{color: '#6F92B5', marginLeft: 12}}>
					{demo.kind === 'variant' ? 'Background variant' : '单独特效组件'}
				</span>
			</div>
			<div style={{fontSize: 52, fontWeight: 700, lineHeight: 1.1}}>{demo.id}</div>
			<div style={{fontSize: 22, color: '#A9CCEA', margin: '8px 0 18px'}}>
				{demo.note}
			</div>
			<pre
				style={{
					margin: 0,
					padding: '16px 20px',
					borderRadius: 10,
					background: '#041222',
					border: '1px solid rgba(120,205,255,0.22)',
					fontFamily: '"Fira Code", ui-monospace, monospace',
					fontSize: 22,
					color: '#9CEFFF',
					whiteSpace: 'pre-wrap',
				}}
			>
				{importLine + '\n' + demo.usage}
			</pre>
		</div>
	);
};

const Heading: React.FC = () => (
	<div
		style={{
			position: 'absolute',
			top: 48,
			left: 64,
			fontFamily: '"Space Grotesk", system-ui, sans-serif',
			color: '#EAF6FF',
		}}
	>
		<div style={{fontSize: 40, fontWeight: 700}}>全息背景特效 · Background Showcase</div>
		<div style={{fontSize: 22, color: '#A9CCEA', marginTop: 4}}>
			每个特效展示 5 秒 · 配色统一来自 HOLOGRAPHIC 调色板
		</div>
	</div>
);

export const BackgroundShowcase: React.FC = () => {
	return (
		<AbsoluteFill style={{backgroundColor: '#02070F'}}>
			{DEMOS.map((demo, i) => (
				<Sequence
					key={demo.id}
					from={i * SEGMENT_FRAMES}
					durationInFrames={SEGMENT_FRAMES}
					name={`${demo.kind}:${demo.id}`}
				>
					<AbsoluteFill>{demo.render()}</AbsoluteFill>
					<Heading />
					<Card demo={demo} index={i} total={DEMOS.length} />
				</Sequence>
			))}
		</AbsoluteFill>
	);
};
