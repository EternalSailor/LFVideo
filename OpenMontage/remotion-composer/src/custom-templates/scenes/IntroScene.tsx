import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {z} from 'zod';
import {useTheme} from '../theme/ThemeContext';

export const introSchema = z.object({
	title: z.string(),
	subtitle: z.string().optional(),
});
export type IntroProps = z.infer<typeof introSchema>;

export const IntroScene: React.FC<IntroProps> = ({title, subtitle}) => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();
	const {colors, fonts, FONT_SIZE, SPACING} = useTheme();

	const enter = spring({fps, frame, config: {damping: 20, stiffness: 90}});
	const opacity = interpolate(enter, [0, 1], [0, 1]);
	const scale = interpolate(enter, [0, 1], [0.9, 1]);

	const fadeOut = interpolate(
		frame,
		[durationInFrames - 15, durationInFrames],
		[1, 0],
		{extrapolateLeft: 'clamp'}
	);

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
			<style>{`
				@keyframes text-shine {
					0% { background-position: 0% 50%; }
					100% { background-position: 200% 50%; }
				}
				@keyframes subtitle-reveal {
					0% { opacity: 0; transform: translateY(20px); }
					100% { opacity: 0.85; transform: translateY(0); }
				}
			`}</style>

			<div
				style={{
					position: 'absolute',
					width: 600,
					height: 250,
					borderRadius: '50%',
					background: `radial-gradient(circle, ${colors.accent[0]}1F 0%, transparent 70%)`,
					filter: 'blur(80px)',
					zIndex: 0,
					pointerEvents: 'none',
				}}
			/>

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
					WebkitBackgroundClip: 'text',
					WebkitTextFillColor: 'transparent',
					animation: 'text-shine 8s linear infinite',
					zIndex: 1,
				}}
			>
				{title}
			</div>
			{subtitle && (
				<div
					style={{
						fontSize: FONT_SIZE.subtitle,
						color: colors.text.secondary,
						fontWeight: 600,
						letterSpacing: 2,
						textTransform: 'uppercase',
						animation: 'subtitle-reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
						animationDelay: '0.4s',
						opacity: 0,
						zIndex: 1,
					}}
				>
					{subtitle}
				</div>
			)}
		</AbsoluteFill>
	);
};
