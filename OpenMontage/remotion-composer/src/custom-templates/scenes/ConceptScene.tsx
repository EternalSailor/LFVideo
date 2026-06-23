import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {z} from 'zod';
import {TitleFrame} from '../primitives';
import {useTheme} from '../theme/ThemeContext';
import {withAlpha} from '../theme/util';

export const conceptItemSchema = z.object({
	label: z.string(),
	title: z.string(),
	desc: z.string(),
	icon: z.string(),
});
export type ConceptItem = z.infer<typeof conceptItemSchema>;

export const conceptSchema = z.object({
	eyebrow: z.string().optional(),
	title: z.string(),
	items: z.array(conceptItemSchema),
});
export type ConceptProps = z.infer<typeof conceptSchema>;

const ItemCard: React.FC<{
	item: ConceptItem;
	color: string;
	startFrame: number;
	index: number;
}> = ({item, color, startFrame, index}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const {colors, FONT_SIZE, SPACING, RADIUS, SPRING} = useTheme();
	const progress = spring({
		fps,
		frame: frame - startFrame,
		config: SPRING.snappy,
	});
	const opacity = interpolate(progress, [0, 1], [0, 1]);
	const translateY = interpolate(progress, [0, 1], [60, 0]);
	const scale = interpolate(progress, [0, 1], [0.95, 1]);

	const cardAnimName = `card-glow-${index}`;
	const iconAnimName = `icon-float-${index}`;
	const cardBg = withAlpha(colors.bg.to, 0.45);

	return (
		<div
			style={{
				opacity,
				transform: `translateY(${translateY}px) scale(${scale})`,
				display: 'flex',
				alignItems: 'flex-start',
				gap: SPACING.md,
				background: cardBg,
				border: `1.5px solid ${color}22`,
				borderRadius: RADIUS.lg,
				padding: `${SPACING.md + 4}px ${SPACING.lg}px`,
				marginBottom: SPACING.md,
				backdropFilter: 'blur(16px)',
				boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.05)',
				animation: `${cardAnimName} 6s infinite ease-in-out`,
				animationDelay: `${index * 0.5}s`,
				position: 'relative',
				overflow: 'hidden',
			}}
		>
			<style>{`
				@keyframes ${cardAnimName} {
					0% { border-color: ${color}22; box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.5), 0 0 0px ${color}00; }
					50% { border-color: ${color}77; box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.7), 0 0 18px ${color}22; }
					100% { border-color: ${color}22; box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.5), 0 0 0px ${color}00; }
				}
				@keyframes ${iconAnimName} {
					0% { transform: translateY(0px) rotate(0deg); }
					50% { transform: translateY(-6px) rotate(4deg); }
					100% { transform: translateY(0px) rotate(0deg); }
				}
			`}</style>

			<div
				style={{
					position: 'absolute',
					left: -50,
					top: -50,
					width: 150,
					height: 150,
					borderRadius: '50%',
					background: `radial-gradient(circle, ${color}15 0%, transparent 70%)`,
					pointerEvents: 'none',
				}}
			/>

			<div
				style={{
					width: 80,
					height: 80,
					borderRadius: RADIUS.md,
					background: `${color}18`,
					border: `1.5px solid ${color}44`,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					fontSize: 40,
					flexShrink: 0,
					boxShadow: `0 4px 20px -2px ${color}18`,
					animation: `${iconAnimName} 5s infinite ease-in-out`,
					animationDelay: `${index * 0.3}s`,
				}}
			>
				{item.icon}
			</div>

			<div style={{flex: 1, zIndex: 1}}>
				<div
					style={{
						fontSize: FONT_SIZE.caption,
						letterSpacing: 4,
						color,
						fontWeight: 800,
						marginBottom: SPACING.xs - 2,
						textTransform: 'uppercase',
						opacity: 0.9,
					}}
				>
					{item.label}
				</div>
				<div
					style={{
						fontSize: FONT_SIZE.subtitle,
						fontWeight: 800,
						color: colors.text.primary,
						marginBottom: SPACING.xs,
						lineHeight: 1.2,
						letterSpacing: -0.5,
					}}
				>
					{item.title}
				</div>
				<div
					style={{
						fontSize: FONT_SIZE.body,
						color: colors.text.secondary,
						lineHeight: 1.65,
					}}
				>
					{item.desc}
				</div>
			</div>
		</div>
	);
};

export const ConceptScene: React.FC<
	ConceptProps & {cardStart?: number; cardStagger?: number}
> = ({eyebrow, title, items, cardStart = 20, cardStagger = 25}) => {
	const {colors, fonts, SPACING} = useTheme();
	return (
		<AbsoluteFill
			style={{
				fontFamily: fonts.family,
				padding: `${SPACING.xl}px ${SPACING.gutter}px`,
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
			}}
		>
			<TitleFrame eyebrow={eyebrow} title={title} />
			{items.map((item, i) => (
				<ItemCard
					key={item.title}
					item={item}
					color={colors.accent[i % colors.accent.length]}
					startFrame={cardStart + i * cardStagger}
					index={i}
				/>
			))}
		</AbsoluteFill>
	);
};
