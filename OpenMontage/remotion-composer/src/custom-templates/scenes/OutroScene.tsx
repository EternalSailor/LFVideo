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

export const outroSchema = z.object({
	headline: z.string(),
	cta: z.string().optional(),
});
export type OutroProps = z.infer<typeof outroSchema>;

export const OutroScene: React.FC<OutroProps> = ({
	headline,
	cta = '关注 · 一起验证 AI IDE 的真实能力',
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const {colors, fonts, FONT_SIZE, SPACING, RADIUS} = useTheme();
	const enter = spring({fps, frame, config: {damping: 20, stiffness: 90}});
	const opacity = interpolate(enter, [0, 1], [0, 1]);
	const translateY = interpolate(enter, [0, 1], [30, 0]);

	return (
		<AbsoluteFill
			style={{
				fontFamily: fonts.family,
				justifyContent: 'center',
				alignItems: 'center',
				textAlign: 'center',
				opacity,
				transform: `translateY(${translateY}px)`,
			}}
		>
			<style>{`
				@keyframes button-pulse {
					0% { box-shadow: 0 8px 30px -4px ${colors.accent[0]}66; transform: scale(1); }
					50% { box-shadow: 0 8px 35px 4px ${colors.accent[1]}99; transform: scale(1.03); }
					100% { box-shadow: 0 8px 30px -4px ${colors.accent[0]}66; transform: scale(1); }
				}
			`}</style>

			<div
				style={{
					position: 'absolute',
					width: 500,
					height: 200,
					borderRadius: '50%',
					background: `radial-gradient(circle, ${colors.accent[3] ?? colors.accent[1]}14 0%, transparent 70%)`,
					filter: 'blur(70px)',
					zIndex: 0,
					pointerEvents: 'none',
				}}
			/>

			<div
				style={{
					fontSize: FONT_SIZE.title + 4,
					fontWeight: 900,
					color: colors.text.primary,
					marginBottom: SPACING.xl,
					maxWidth: 1400,
					lineHeight: 1.25,
					letterSpacing: -0.5,
					zIndex: 1,
				}}
			>
				{headline}
			</div>
			<div
				style={{
					fontSize: FONT_SIZE.subtitle,
					fontWeight: 700,
					color: colors.text.primary,
					padding: `${SPACING.sm + 4}px ${SPACING.xl}px`,
					borderRadius: RADIUS.pill,
					background: `linear-gradient(135deg, ${colors.accent[0]} 0%, ${colors.accent[1]} 100%)`,
					animation: 'button-pulse 3.5s infinite ease-in-out',
					letterSpacing: 1.5,
					zIndex: 1,
					border: '1px solid rgba(255,255,255,0.1)',
				}}
			>
				{cta}
			</div>
		</AbsoluteFill>
	);
};
