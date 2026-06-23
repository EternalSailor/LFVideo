import React from 'react';
import {
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {useTheme} from '../theme/ThemeContext';

interface Props {
	title: string;
	eyebrow?: string; // 上方小标注
	align?: 'center' | 'left';
	startFrame?: number;
}

export const TitleFrame: React.FC<Props> = ({
	title,
	eyebrow,
	align = 'center',
	startFrame = 0,
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const {colors, FONT_SIZE, SPACING, SPRING} = useTheme();

	const progress = spring({
		fps,
		frame: frame - startFrame,
		config: SPRING.gentle,
	});
	const opacity = interpolate(progress, [0, 1], [0, 1]);
	const translateY = interpolate(progress, [0, 1], [30, 0]);
	const lineWidth = interpolate(progress, [0, 1], [0, 80]);

	return (
		<div
			style={{
				opacity,
				transform: `translateY(${translateY}px)`,
				textAlign: align,
				marginBottom: SPACING.xl,
				display: 'flex',
				flexDirection: 'column',
				alignItems: align === 'center' ? 'center' : 'flex-start',
			}}
		>
			{eyebrow && (
				<div
					style={{
						fontSize: FONT_SIZE.caption,
						letterSpacing: 4,
						color: colors.text.muted,
						marginBottom: SPACING.sm,
						textTransform: 'uppercase',
						fontWeight: 600,
					}}
				>
					{eyebrow}
				</div>
			)}
			<div
				style={{
					fontSize: FONT_SIZE.display,
					fontWeight: 900,
					color: colors.text.primary,
					lineHeight: 1.1,
					marginBottom: SPACING.sm,
				}}
			>
				{title}
			</div>
			<div
				style={{
					width: lineWidth,
					height: 4,
					background: `linear-gradient(90deg, ${colors.accent[0]}, ${colors.accent[1]})`,
					borderRadius: 2,
				}}
			/>
		</div>
	);
};
