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

export const timelineEventSchema = z.object({
	year: z.string(),
	title: z.string(),
	desc: z.string(),
	icon: z.string(),
});
export type TimelineEvent = z.infer<typeof timelineEventSchema>;

export const timelineSchema = z.object({
	eyebrow: z.string().optional(),
	title: z.string(),
	events: z.array(timelineEventSchema),
});
export type TimelineProps = z.infer<typeof timelineSchema>;

const TimelineCard: React.FC<{
	event: TimelineEvent;
	color: string;
	startFrame: number;
	index: number;
}> = ({event, color, startFrame, index}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const {colors, FONT_SIZE, SPACING, RADIUS, SPRING} = useTheme();

	const progress = spring({
		fps,
		frame: frame - startFrame,
		config: SPRING.snappy,
	});

	const opacity = interpolate(progress, [0, 1], [0, 1]);
	const translateY = interpolate(progress, [0, 1], [40, 0]);
	const scale = interpolate(progress, [0, 1], [0.9, 1]);

	const glowAnimName = `timeline-glow-${index}`;
	const cardBg = withAlpha(colors.bg.to, 0.4);
	const iconBg = withAlpha(colors.bg.to, 0.6);

	return (
		<div
			style={{
				opacity,
				transform: `translateY(${translateY}px) scale(${scale})`,
				flex: 1,
				background: cardBg,
				border: `1.5px solid ${color}33`,
				borderRadius: RADIUS.lg,
				padding: `${SPACING.md + 4}px ${SPACING.md}px`,
				backdropFilter: 'blur(12px)',
				boxShadow: '0 10px 30px -15px rgba(0, 0, 0, 0.6)',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				textAlign: 'center',
				position: 'relative',
				overflow: 'hidden',
				animation: `${glowAnimName} 5s infinite ease-in-out`,
				animationDelay: `${index * 0.4}s`,
			}}
		>
			<style>{`
				@keyframes ${glowAnimName} {
					0% { border-color: ${color}33; box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.6); }
					50% { border-color: ${color}88; box-shadow: 0 10px 35px -5px ${color}15; }
					100% { border-color: ${color}33; box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.6); }
				}
			`}</style>

			<div
				style={{
					position: 'absolute',
					top: -40,
					width: 120,
					height: 120,
					borderRadius: '50%',
					background: `radial-gradient(circle, ${color}18 0%, transparent 70%)`,
					pointerEvents: 'none',
				}}
			/>

			<div
				style={{
					background: `${color}18`,
					border: `1.5px solid ${color}55`,
					borderRadius: RADIUS.md,
					padding: '4px 14px',
					fontSize: FONT_SIZE.caption,
					fontWeight: 900,
					color,
					marginBottom: SPACING.md,
					letterSpacing: 2,
					boxShadow: `0 4px 15px -2px ${color}15`,
				}}
			>
				{event.year}
			</div>

			<div
				style={{
					width: 64,
					height: 64,
					borderRadius: '50%',
					background: iconBg,
					border: `1.5px solid ${color}44`,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					fontSize: 32,
					marginBottom: SPACING.md,
					boxShadow: `inset 0 0 10px ${color}11`,
				}}
			>
				{event.icon}
			</div>

			<div
				style={{
					fontSize: FONT_SIZE.subtitle - 2,
					fontWeight: 800,
					color: colors.text.primary,
					marginBottom: SPACING.sm,
					letterSpacing: -0.5,
				}}
			>
				{event.title}
			</div>

			<div
				style={{
					fontSize: FONT_SIZE.body - 2,
					color: colors.text.secondary,
					lineHeight: 1.6,
				}}
			>
				{event.desc}
			</div>
		</div>
	);
};

export const TimelineScene: React.FC<
	TimelineProps & {startFrame?: number; stagger?: number}
> = ({eyebrow, title, events, startFrame = 20, stagger = 20}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const {colors, fonts, SPACING} = useTheme();

	const lineProgress = spring({
		fps,
		frame: frame - startFrame,
		config: {
			damping: 14,
			mass: 0.8,
			stiffness: 70,
		},
	});

	const lineWidth = interpolate(lineProgress, [0, 1], [0, 100]);

	return (
		<AbsoluteFill
			style={{
				fontFamily: fonts.family,
				padding: `${SPACING.xl}px ${SPACING.gutter}px`,
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				position: 'relative',
			}}
		>
			<TitleFrame eyebrow={eyebrow} title={title} />

			<div
				style={{
					position: 'relative',
					display: 'flex',
					gap: SPACING.lg,
					justifyContent: 'space-between',
					alignItems: 'stretch',
					marginTop: SPACING.xl,
					padding: `0 ${SPACING.md}px`,
				}}
			>
				<div
					style={{
						position: 'absolute',
						top: 104,
						left: SPACING.gutter,
						right: SPACING.gutter,
						height: 3,
						background: colors.line,
						zIndex: 0,
					}}
				/>

				<div
					style={{
						position: 'absolute',
						top: 104,
						left: SPACING.gutter,
						width: `calc(${lineWidth}% - ${SPACING.gutter * 2}px)`,
						height: 3,
						background: `linear-gradient(90deg, ${colors.accent[0]}99, ${colors.accent[1]}ee, ${colors.accent[2] ?? colors.accent[0]}99)`,
						boxShadow: `0 0 12px ${colors.accent[1]}aa`,
						zIndex: 1,
					}}
				/>

				{events.map((event, i) => (
					<TimelineCard
						key={event.title}
						event={event}
						color={colors.accent[i % colors.accent.length]}
						startFrame={startFrame + i * stagger}
						index={i}
					/>
				))}
			</div>
		</AbsoluteFill>
	);
};
