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
import {glowBlob} from '../../theme/surfaces';
import {textStyles} from '../../theme/textStyles';

export const introSchema = z.object({
	title: z.string(),
	subtitle: z.string().optional(),
});
export type IntroProps = z.infer<typeof introSchema>;

export const IntroScene: React.FC<IntroProps> = ({title, subtitle}) => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();
	const theme = useTheme();
	const {colors, fonts, FONT_SIZE, SPACING} = theme;
	const t = textStyles(theme);

	const enter = spring({fps, frame, config: {damping: 20, stiffness: 90}});
	const opacity = interpolate(enter, [0, 1], [0, 1]);
	const scale = interpolate(enter, [0, 1], [0.9, 1]);

	const fadeOut = interpolate(
		frame,
		[durationInFrames - 15, durationInFrames],
		[1, 0],
		{extrapolateLeft: 'clamp'}
	);

	// frame 驱动的标题流光（取代 CSS `text-shine ... infinite`，8s 一循环）。
	const shineX = ((frame / fps / 8) % 1) * 200;
	// frame 驱动的副标题揭示（取代 CSS `subtitle-reveal`，延迟 0.4s、时长 1.2s）。
	const subT = interpolate(frame, [fps * 0.4, fps * 1.6], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const subEase = 1 - Math.pow(1 - subT, 3);
	const subOpacity = subEase * 0.85;
	const subTranslateY = (1 - subEase) * 20;

	return (
		<AbsoluteFill
			style={{
				fontFamily: fonts.family,
				justifyContent: 'center',
				alignItems: 'center',
				textAlign: 'center',
				opacity: opacity * fadeOut,
				transform: `scale(${scale})`,
			}}
		>
			<div style={glowBlob(colors.accent[0], {width: 600, height: 250, intensity: 0.12})} />

			<div
				style={{
					fontSize: FONT_SIZE.display,
					fontWeight: 900,
					lineHeight: 1.15,
					marginBottom: SPACING.lg,
					maxWidth: 1500,
					padding: '0 80px',
					letterSpacing: -1.5,
					background: `linear-gradient(90deg, ${colors.text.primary} 0%, ${colors.accent[0]} 25%, ${colors.accent[1]} 50%, ${colors.accent[3] ?? colors.accent[0]} 75%, ${colors.text.primary} 100%)`,
					backgroundSize: '200% auto',
					backgroundPosition: `${shineX}% 50%`,
					WebkitBackgroundClip: 'text',
					WebkitTextFillColor: 'transparent',
					zIndex: 1,
				}}
			>
				{title}
			</div>
			{subtitle && (
				<div
					style={{
						...t.bodyMuted,
						fontSize: FONT_SIZE.subtitle,
						fontWeight: 600,
						letterSpacing: 2,
						textTransform: 'uppercase',
						opacity: subOpacity,
						transform: `translateY(${subTranslateY}px)`,
						zIndex: 1,
					}}
				>
					{subtitle}
				</div>
			)}
		</AbsoluteFill>
	);
};
