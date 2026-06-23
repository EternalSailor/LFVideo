// 薄动画层 —— 过渡注册表。
//
// 每个过渡是 presence ∈ [0,1] 的纯函数：presence=1 时回到稳定态（SETTLED），
// presence=0 时给出「偏移/缺席态」。入场用 presence 0→1，出场用 1→0，同一函数复用。
import type React from 'react';
import {AnimState, SETTLED, Transition, TransitionId, TransitionOpts, TRANSITION_IDS} from './types';

const DEFAULT_DISTANCE = 60;

const make = (partial: Partial<AnimState>): AnimState => ({...SETTLED, ...partial});

export const TRANSITIONS: Record<TransitionId, Transition> = {
	none: () => SETTLED,
	fade: (p) => make({opacity: p}),
	rise: (p, o?: TransitionOpts) =>
		make({opacity: p, ty: (1 - p) * (o?.distance ?? DEFAULT_DISTANCE)}),
	fall: (p, o?: TransitionOpts) =>
		make({opacity: p, ty: -(1 - p) * (o?.distance ?? DEFAULT_DISTANCE)}),
	'slide-left': (p, o?: TransitionOpts) =>
		make({opacity: p, tx: (1 - p) * (o?.distance ?? DEFAULT_DISTANCE)}),
	'slide-right': (p, o?: TransitionOpts) =>
		make({opacity: p, tx: -(1 - p) * (o?.distance ?? DEFAULT_DISTANCE)}),
	pop: (p) => make({opacity: p, scale: 0.9 + 0.1 * p}),
	'rise-pop': (p, o?: TransitionOpts) =>
		make({
			opacity: p,
			ty: (1 - p) * (o?.distance ?? DEFAULT_DISTANCE),
			scale: 0.94 + 0.06 * p,
		}),
	blur: (p) => make({opacity: p, blur: (1 - p) * 12}),
	'wipe-up': (p) => make({clip: (1 - p) * 100}),
	flip: (p) => make({opacity: p, rotateX: (1 - p) * -90}),
};

export const isTransitionId = (v: unknown): v is TransitionId =>
	typeof v === 'string' && (TRANSITION_IDS as readonly string[]).includes(v);

/** 合成入场态与出场态：位移/旋转/模糊相加，缩放/透明度相乘，裁切取最大。 */
export function compose(a: AnimState, b: AnimState): AnimState {
	return {
		opacity: a.opacity * b.opacity,
		tx: a.tx + b.tx,
		ty: a.ty + b.ty,
		scale: a.scale * b.scale,
		rotateX: a.rotateX + b.rotateX,
		rotateY: a.rotateY + b.rotateY,
		blur: a.blur + b.blur,
		clip: Math.max(a.clip, b.clip),
	};
}

/** 把动画状态落成可直接套用的 CSS。 */
export function toStyle(s: AnimState): React.CSSProperties {
	const transforms: string[] = [];
	if (s.rotateX !== 0 || s.rotateY !== 0) transforms.push('perspective(1200px)');
	if (s.tx !== 0 || s.ty !== 0) transforms.push(`translate3d(${s.tx}px, ${s.ty}px, 0)`);
	if (s.scale !== 1) transforms.push(`scale(${s.scale})`);
	if (s.rotateX !== 0) transforms.push(`rotateX(${s.rotateX}deg)`);
	if (s.rotateY !== 0) transforms.push(`rotateY(${s.rotateY}deg)`);

	const style: React.CSSProperties = {opacity: s.opacity};
	if (transforms.length > 0) style.transform = transforms.join(' ');
	if (s.blur > 0.01) style.filter = `blur(${s.blur}px)`;
	if (s.clip > 0.01) style.clipPath = `inset(0 0 ${s.clip}% 0)`;
	return style;
}
