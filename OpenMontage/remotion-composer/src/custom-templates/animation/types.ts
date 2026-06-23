// 薄动画层 —— 类型定义
//
// 借鉴「动效原子 × 布局」解耦思想（参考 RemotionMG），但规模受控：
//   - 一个小而有界的「过渡注册表」（见 transitions.ts，约 10 个），不是 100 个原子。
//   - 每个过渡是 presence ∈ [0,1] 的纯函数，确定性、可单测、frame 驱动。
//   - 场景内部用 <Animated> 包住自己已有的子块（标题/卡片/行/步骤），
//     即可获得可配置的入场/出场 + 错峰，无需把元素摊进 JSON。

/** 动效阶段：入场 or 出场。 */
export type Phase = 'in' | 'out';

/** 受支持的过渡类型（入场/出场共用同一组函数）。单一事实来源，供类型与 zod 共享。 */
export const TRANSITION_IDS = [
	'none',
	'fade',
	'rise',
	'fall',
	'slide-left',
	'slide-right',
	'pop',
	'rise-pop',
	'blur',
	'wipe-up',
	'flip',
] as const;

export type TransitionId = (typeof TRANSITION_IDS)[number];

/**
 * 归一化的动画状态。每个过渡在 presence=0（完全缺席）时给出「偏移态」，
 * 在 presence=1（完全到位）时回到下面的稳定默认值。
 * 入场态与出场态各算一份，再按 compose() 合成，因而同一元素可同时配进/出。
 */
export interface AnimState {
	opacity: number;
	/** 像素位移 */
	tx: number;
	ty: number;
	/** 缩放（乘性） */
	scale: number;
	/** 3D 旋转（度，加性） */
	rotateX: number;
	rotateY: number;
	/** 高斯模糊（px，加性） */
	blur: number;
	/** 裁切百分比（0=完全可见，100=完全裁掉），取两端最大值 */
	clip: number;
}

/** 稳定态（完全到位时的中性值）。 */
export const SETTLED: AnimState = {
	opacity: 1,
	tx: 0,
	ty: 0,
	scale: 1,
	rotateX: 0,
	rotateY: 0,
	blur: 0,
	clip: 0,
};

/** 过渡函数：给定在场度 presence ∈ [0,1]，返回该端的动画状态。 */
export type Transition = (presence: number, opts?: TransitionOpts) => AnimState;

/** 过渡可调参数（不传走各过渡的默认值）。 */
export interface TransitionOpts {
	/** 位移类过渡的距离（px）。 */
	distance?: number;
}
