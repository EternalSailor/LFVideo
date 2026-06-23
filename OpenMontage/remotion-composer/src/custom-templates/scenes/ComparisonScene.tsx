import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {z} from 'zod';
import {SplitLayout, TitleFrame} from '../primitives';
import {useTheme} from '../theme/ThemeContext';
import {withAlpha} from '../theme/util';

// 模板库版对比场景：基于 SplitLayout，主题驱动配色，左右两张玻璃卡。
// 与旧 components/ComparisonCard 不同，value 走正文字号并自适应长句，
// 适合「整句对比」而非「单个大数字」。取代回落到浅色 ComparisonCard。
export const comparisonSchema = z.object({
	title: z.string().optional(),
	leftLabel: z.string(),
	leftValue: z.string(),
	rightLabel: z.string(),
	rightValue: z.string(),
});
export type ComparisonProps = z.infer<typeof comparisonSchema>;

const Card: React.FC<{
	label: string;
	value: string;
	color: string;
	startFrame: number;
}> = ({label, value, color, startFrame}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const {colors, FONT_SIZE, SPACING, RADIUS, SPRING} = useTheme();

	const progress = spring({fps, frame: frame - startFrame, config: SPRING.snappy});
	const opacity = interpolate(progress, [0, 1], [0, 1]);
	const translateY = interpolate(progress, [0, 1], [50, 0]);
	const scale = interpolate(progress, [0, 1], [0.94, 1]);

	// 长句用正文字号、短句用副标题字号，避免长句溢出。
	const valueFontSize = value.length > 36 ? FONT_SIZE.bodyLg : FONT_SIZE.subtitle;
	const cardBg = withAlpha(colors.bg.to, 0.5);

	return (
		<div
			style={{
				opacity,
				transform: `translateY(${translateY}px) scale(${scale})`,
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				gap: SPACING.lg,
				background: cardBg,
				border: `1.5px solid ${color}44`,
				borderRadius: RADIUS.lg,
				padding: `${SPACING.xl}px ${SPACING.lg}px`,
				backdropFilter: 'blur(16px)',
				boxShadow: `0 20px 50px -15px rgba(0,0,0,0.6), 0 0 30px -10px ${color}22`,
				position: 'relative',
				overflow: 'hidden',
			}}
		>
			<div
				style={{
					position: 'absolute',
					top: -60,
					left: -60,
					width: 220,
					height: 220,
					borderRadius: '50%',
					background: `radial-gradient(circle, ${color}18 0%, transparent 70%)`,
					pointerEvents: 'none',
				}}
			/>
			<div
				style={{
					display: 'inline-flex',
					alignSelf: 'flex-start',
					fontSize: FONT_SIZE.caption,
					fontWeight: 800,
					letterSpacing: 2,
					color,
					background: `${color}1A`,
					border: `1.5px solid ${color}55`,
					borderRadius: RADIUS.pill,
					padding: `6px ${SPACING.md}px`,
					zIndex: 1,
				}}
			>
				{label}
			</div>
			<div
				style={{
					fontSize: valueFontSize,
					fontWeight: 700,
					color: colors.text.primary,
					lineHeight: 1.5,
					zIndex: 1,
				}}
			>
				{value}
			</div>
		</div>
	);
};

export const ComparisonScene: React.FC<ComparisonProps> = ({
	title,
	leftLabel,
	leftValue,
	rightLabel,
	rightValue,
}) => {
	const {colors, fonts, SPACING} = useTheme();

	return (
		<AbsoluteFill
			style={{
				fontFamily: fonts.family,
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				paddingTop: title ? SPACING.xl : 0,
			}}
		>
			{title && (
				<div style={{padding: `0 ${SPACING.gutter}px`}}>
					<TitleFrame title={title} />
				</div>
			)}
			<div style={{flex: title ? 0.7 : 1, position: 'relative'}}>
				<SplitLayout
					left={<Card label={leftLabel} value={leftValue} color={colors.accent[0]} startFrame={15} />}
					right={<Card label={rightLabel} value={rightValue} color={colors.accent[2] ?? colors.accent[1]} startFrame={25} />}
				/>
			</div>
		</AbsoluteFill>
	);
};
