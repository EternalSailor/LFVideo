import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {z} from 'zod';
import {AutoFit} from '../../primitives';
import {useTheme} from '../../theme/ThemeContext';
import {withAlpha} from '../../theme/util';
import {Animated} from '../../animation';
import {osc01} from '../../animation/presence';
import {TRANSITION_IDS, type TransitionId} from '../../animation/types';

export const flowStepSchema = z.object({
	label: z.string(),
	desc: z.string(),
	icon: z.string(),
});
export type FlowStep = z.infer<typeof flowStepSchema>;

export const flowSchema = z.object({
	eyebrow: z.string().optional(),
	title: z.string().optional(),
	steps: z.array(flowStepSchema),
	orientation: z.enum(['horizontal', 'vertical']).optional(),
	enter: z.enum(TRANSITION_IDS).optional(),
});
export type FlowProps = z.infer<typeof flowSchema>;

const Connector: React.FC<{vertical: boolean; color: string; delay: number}> = ({
	vertical,
	color,
	delay,
}) => (
	<Animated enter="pop" delay={delay} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
		<div
			style={{
				fontSize: 44,
				fontWeight: 900,
				color,
				transform: vertical ? 'rotate(90deg)' : 'none',
				lineHeight: 1,
				textShadow: `0 0 16px ${withAlpha(color, 0.5)}`,
			}}
		>
			→
		</div>
	</Animated>
);

const StepCard: React.FC<{
	step: FlowStep;
	index: number;
	color: string;
	delay: number;
	enter: TransitionId;
	vertical: boolean;
	tier: 0 | 1 | 2;
}> = ({step, index, color, delay, enter, vertical, tier}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const {colors, FONT_SIZE, SPACING, RADIUS} = useTheme();

	const ICON = [76, 68, 60][tier];
	const ICON_FONT = [38, 34, 30][tier];
	const TITLE = [FONT_SIZE.subtitle, FONT_SIZE.bodyLg, FONT_SIZE.body][tier];
	const DESC = [FONT_SIZE.body, FONT_SIZE.body - 2, FONT_SIZE.min][tier];
	const PAD = [SPACING.lg, SPACING.md + 4, SPACING.md][tier];

	const glow = osc01(frame, fps, 5, index * 0.4);
	const cardBg = withAlpha(colors.bg.to, 0.45);
	const cardShadow = `0 10px 30px -12px rgba(0,0,0,0.6), 0 0 ${20 * glow}px ${withAlpha(color, 0.12 * glow)}`;

	return (
		<Animated enter={enter} delay={delay} distance={50} style={{flex: 1, display: 'flex'}}>
			<div
				style={{
					flex: 1,
					minWidth: vertical ? 560 : 220,
					minHeight: vertical ? 0 : 320,
					background: cardBg,
					border: `1.5px solid ${withAlpha(color, 0.33)}`,
					borderRadius: RADIUS.lg,
					padding: `${PAD}px`,
					backdropFilter: 'blur(12px)',
					boxShadow: cardShadow,
					display: 'flex',
					flexDirection: vertical ? 'row' : 'column',
					alignItems: vertical ? 'center' : 'flex-start',
					gap: SPACING.md,
					textAlign: vertical ? 'left' : 'left',
					position: 'relative',
					overflow: 'hidden',
				}}
			>
				<div
					style={{
						position: 'absolute',
						top: -8,
						right: SPACING.md,
						fontSize: 72,
						fontWeight: 900,
						color: withAlpha(color, 0.18),
						lineHeight: 1,
					}}
				>
					{index + 1}
				</div>
				<div
					style={{
						width: ICON,
						height: ICON,
						flexShrink: 0,
						borderRadius: RADIUS.md,
						background: `${color}18`,
						border: `1.5px solid ${color}44`,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						fontSize: ICON_FONT,
						boxShadow: `0 4px 18px -2px ${color}22`,
					}}
				>
					{step.icon}
				</div>
				<div style={{flex: 1, zIndex: 1}}>
					<div
						style={{
							fontSize: TITLE,
							fontWeight: 800,
							color: colors.text.primary,
							marginBottom: SPACING.xs,
							lineHeight: 1.2,
							letterSpacing: -0.5,
						}}
					>
						{step.label}
					</div>
					<div style={{fontSize: DESC, color: colors.text.secondary, lineHeight: 1.6}}>
						{step.desc}
					</div>
				</div>
			</div>
		</Animated>
	);
};

export const FlowScene: React.FC<FlowProps> = ({
	steps,
	orientation = 'horizontal',
	enter = 'rise-pop',
}) => {
	const {colors, fonts, SPACING} = useTheme();

	const vertical = orientation === 'vertical';
	const tier: 0 | 1 | 2 = steps.length <= 3 ? 0 : steps.length <= 4 ? 1 : 2;
	const startFrame = 18;
	const stagger = 18;

	return (
		<AutoFit
			paddingX={SPACING.gutter}
			paddingY={SPACING.xl}
			maxScale={vertical ? 1.2 : 1.5}
			widthMode={vertical ? 'fill' : 'content'}
		>
			<div
				style={{
					fontFamily: fonts.family,
					display: 'flex',
					flexDirection: vertical ? 'column' : 'row',
					alignItems: vertical ? 'stretch' : 'stretch',
					justifyContent: 'center',
					gap: SPACING.sm,
				}}
			>
				{steps.map((step, i) => (
					<React.Fragment key={step.label}>
						<StepCard
							step={step}
							index={i}
							color={colors.accent[i % colors.accent.length]}
							delay={startFrame + i * stagger}
							enter={enter}
							vertical={vertical}
							tier={tier}
						/>
						{i < steps.length - 1 && (
							<Connector
								vertical={vertical}
								color={colors.accent[(i + 1) % colors.accent.length]}
								delay={startFrame + i * stagger + stagger / 2}
							/>
						)}
					</React.Fragment>
				))}
			</div>
		</AutoFit>
	);
};
