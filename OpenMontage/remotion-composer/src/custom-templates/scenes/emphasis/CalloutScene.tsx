import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {z} from 'zod';
import {AutoFit} from '../../primitives';
import {useTheme} from '../../theme/ThemeContext';
import {withAlpha} from '../../theme/util';
import {Animated} from '../../animation';
import {osc01} from '../../animation/presence';
import {TRANSITION_IDS, type TransitionId} from '../../animation/types';

export const CALLOUT_TYPES = ['info', 'warning', 'tip', 'quote'] as const;
export type CalloutKind = (typeof CALLOUT_TYPES)[number];

export const calloutSchema = z.object({
	text: z.string(),
	callout_type: z.enum(CALLOUT_TYPES).optional(),
	title: z.string().optional(),
	items: z.array(z.string()).optional(),
	enter: z.enum(TRANSITION_IDS).optional(),
});
export type CalloutProps = z.infer<typeof calloutSchema>;

// 每种提示语义的图标 + 取主题的第几个 accent 着色（不硬编码具体色值）。
const KIND_META: Record<CalloutKind, {icon: string; accent: number}> = {
	info: {icon: 'ℹ️', accent: 2},
	warning: {icon: '⚠️', accent: 0},
	tip: {icon: '💡', accent: 2},
	quote: {icon: '“', accent: 3},
};

export const CalloutScene: React.FC<CalloutProps> = ({
	text,
	callout_type = 'info',
	title,
	items,
	enter = 'slide-right',
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const {colors, fonts, FONT_SIZE, SPACING, RADIUS} = useTheme();

	const meta = KIND_META[callout_type];
	const color = colors.accent[meta.accent] ?? colors.accent[0];
	const isQuote = callout_type === 'quote';

	// frame 驱动的常驻辉光（替代 CSS infinite 动画）。
	const glow = osc01(frame, fps, 6);
	const cardBg = withAlpha(colors.bg.to, 0.5);
	const cardShadow = `0 20px 50px -15px rgba(0,0,0,${0.5 + 0.15 * glow}), 0 0 ${24 * glow}px ${withAlpha(color, 0.12 * glow)}`;

	return (
		<AutoFit paddingX={SPACING.gutter} paddingY={SPACING.xl} maxScale={1.3}>
			<Animated enter={enter} delay={6} distance={70}>
				<div
					style={{
						position: 'relative',
						fontFamily: fonts.family,
						display: 'flex',
						alignItems: 'flex-start',
						gap: SPACING.lg,
						width: 1320,
						background: cardBg,
						border: `1.5px solid ${withAlpha(color, 0.4)}`,
						borderRadius: RADIUS.lg,
						padding: `${SPACING.xl}px ${SPACING.xl}px`,
						backdropFilter: 'blur(16px)',
						boxShadow: cardShadow,
						overflow: 'hidden',
					}}
				>
					<div
						style={{
							position: 'absolute',
							left: 0,
							top: 0,
							bottom: 0,
							width: 8,
							background: `linear-gradient(180deg, ${color}, ${withAlpha(color, 0.4)})`,
						}}
					/>
					<div
						style={{
							fontSize: isQuote ? 96 : 64,
							lineHeight: 1,
							flexShrink: 0,
							color: isQuote ? color : undefined,
							fontFamily: isQuote ? 'Georgia, serif' : undefined,
							fontWeight: isQuote ? 700 : undefined,
							marginTop: isQuote ? -16 : 0,
						}}
					>
						{meta.icon}
					</div>
					<div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: SPACING.sm}}>
						{title && (
							<div
								style={{
									fontSize: FONT_SIZE.subtitle,
									fontWeight: 800,
									color,
									lineHeight: 1.3,
									letterSpacing: -0.5,
								}}
							>
								{title}
							</div>
						)}
						<div
							style={{
								fontSize: FONT_SIZE.bodyLg,
								fontWeight: isQuote ? 500 : 400,
								fontStyle: isQuote ? 'italic' : 'normal',
								color: colors.text.primary,
								lineHeight: 1.6,
							}}
						>
							{text}
						</div>
						{items && items.length > 0 && (
							<div style={{display: 'flex', flexDirection: 'column', gap: SPACING.xs, marginTop: SPACING.xs}}>
								{items.map((it, i) => (
									<Animated key={it} enter="rise" delay={16 + i * 6} distance={24}>
										<div
											style={{
												display: 'flex',
												alignItems: 'flex-start',
												gap: SPACING.sm,
												fontSize: FONT_SIZE.body,
												color: colors.text.secondary,
												lineHeight: 1.6,
											}}
										>
											<span style={{color, fontWeight: 900, flexShrink: 0}}>›</span>
											<span>{it}</span>
										</div>
									</Animated>
								))}
							</div>
						)}
					</div>
				</div>
			</Animated>
		</AutoFit>
	);
};
