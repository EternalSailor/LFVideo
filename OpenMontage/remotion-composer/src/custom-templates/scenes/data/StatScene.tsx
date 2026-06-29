import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {z} from 'zod';
import {useTheme} from '../../theme/ThemeContext';
import {withAlpha} from '../../theme/util';

export const statSchema = z.object({
	stat: z.string(),
	subtitle: z.string().optional(),
	label: z.string().optional(),
});
export type StatProps = z.infer<typeof statSchema>;

// 单个核心数字 / 硬指标。主题驱动配色，大号数字弹入 + 副标题错峰淡入。
export const StatScene: React.FC<StatProps> = ({stat, subtitle, label}) => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();
	const {colors, fonts, FONT_SIZE, SPACING} = useTheme();

	const color = colors.accent[0];

	const scale = spring({frame, fps, config: {damping: 12, stiffness: 120}, from: 0.8, to: 1});
	const subProgress = spring({frame: frame - 8, fps, config: {damping: 20}});
	const fadeOut = interpolate(
		frame,
		[durationInFrames - 15, durationInFrames],
		[1, 0],
		{extrapolateLeft: 'clamp'},
	);

	return (
		<AbsoluteFill
			style={{
				fontFamily: fonts.family,
				justifyContent: 'center',
				alignItems: 'center',
				textAlign: 'center',
				opacity: fadeOut,
			}}
		>
			<div
				style={{
					position: 'absolute',
					width: 700,
					height: 320,
					borderRadius: '50%',
					background: `radial-gradient(circle, ${withAlpha(color, 0.18)} 0%, transparent 70%)`,
					filter: 'blur(80px)',
					zIndex: 0,
					pointerEvents: 'none',
				}}
			/>
			{label && (
				<div
					style={{
						fontSize: FONT_SIZE.subtitle,
						fontWeight: 700,
						letterSpacing: 4,
						textTransform: 'uppercase',
						color: colors.text.secondary,
						marginBottom: SPACING.md,
						opacity: subProgress,
						zIndex: 1,
					}}
				>
					{label}
				</div>
			)}
			<div
				style={{
					transform: `scale(${scale})`,
					fontSize: 200,
					fontWeight: 900,
					lineHeight: 1,
					letterSpacing: -4,
					background: `linear-gradient(135deg, ${colors.accent[0]} 0%, ${colors.accent[1]} 100%)`,
					WebkitBackgroundClip: 'text',
					WebkitTextFillColor: 'transparent',
					zIndex: 1,
				}}
			>
				{stat}
			</div>
			{subtitle && (
				<div
					style={{
						fontSize: FONT_SIZE.subtitle,
						color: colors.text.primary,
						fontWeight: 600,
						marginTop: SPACING.lg,
						maxWidth: 1200,
						lineHeight: 1.4,
						opacity: subProgress,
						transform: `translateY(${interpolate(subProgress, [0, 1], [20, 0])}px)`,
						zIndex: 1,
					}}
				>
					{subtitle}
				</div>
			)}
		</AbsoluteFill>
	);
};
