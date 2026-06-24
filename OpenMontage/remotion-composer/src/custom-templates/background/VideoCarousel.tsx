import React from 'react';
import {
	AbsoluteFill,
	OffthreadVideo,
	Sequence,
	interpolate,
	random,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import manifest from '../../../public/video-background/manifest.json';

// 背景层的「视频随机轮播」模式。
//
// 设计要点：
//  - 灰度→透明：用 SVG `feColorMatrix` 把每个像素的亮度(luminance)解析为 alpha，
//    亮处不透明、暗处透明，并保留原始 RGB，所以「黑底亮色」的特效视频会作为
//    发光叠层融进下层全息蓝底。传 `invert` 可反相（亮处透明）。
//  - 随机轮播：用 Remotion 的确定性随机 `random()` 打乱顺序，导出可复现。
//  - 交叉淡入淡出：切换视频时上一段淡出、下一段淡入（重叠 fadeSec）。
//  - 帧驱动：所有时间都来自 `useCurrentFrame()`，无 rAF / CSS keyframes。
//
// 视频清单来自 `public/video-background/manifest.json`（由
// `scripts/gen_video_bg_manifest.py` 扫描目录生成）。

export interface VideoCarouselProps {
	/** 视频文件名列表（相对 public/video-background/）。默认读 manifest.json。 */
	videos?: string[];
	/** 每段视频停留时长（秒，含淡入淡出）。 */
	clipDurationSec?: number;
	/** 交叉淡入淡出时长（秒）。 */
	fadeSec?: number;
	/** 反相：亮处透明、暗处不透明。 */
	invert?: boolean;
	/** 随机种子（换一个可得到不同的轮播顺序，仍然确定性）。 */
	seed?: string;
	/** 视频铺满方式。 */
	objectFit?: 'cover' | 'contain';
}

const MANIFEST_VIDEOS: string[] = (manifest as {videos?: string[]}).videos ?? [];

// 确定性 Fisher–Yates（用 remotion 的可复现随机源播种）。
function shuffle(arr: string[], seed: string): string[] {
	const a = arr.slice();
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(random(`${seed}-${i}`) * (i + 1));
		const tmp = a[i];
		a[i] = a[j];
		a[j] = tmp;
	}
	return a;
}

// alpha = luminance(RGB)，RGB 原样保留；invert 时 alpha = 1 - luminance。
const LumaToAlphaFilter: React.FC<{id: string; invert: boolean}> = ({
	id,
	invert,
}) => (
	<svg
		width={0}
		height={0}
		aria-hidden
		style={{position: 'absolute', width: 0, height: 0}}
	>
		<defs>
			<filter id={id} colorInterpolationFilters="sRGB">
				<feColorMatrix
					type="matrix"
					values={
						invert
							? '1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  -0.2125 -0.7154 -0.0721 0 1'
							: '1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0.2125 0.7154 0.0721 0 0'
					}
				/>
			</filter>
		</defs>
	</svg>
);

const Clip: React.FC<{
	src: string;
	opacity: number;
	filterId: string;
	objectFit: 'cover' | 'contain';
}> = ({src, opacity, filterId, objectFit}) => (
	<AbsoluteFill style={{opacity}}>
		<AbsoluteFill style={{filter: `url(#${filterId})`}}>
			<OffthreadVideo
				src={src}
				muted
				style={{width: '100%', height: '100%', objectFit}}
			/>
		</AbsoluteFill>
	</AbsoluteFill>
);

export const VideoCarousel: React.FC<VideoCarouselProps> = ({
	videos,
	clipDurationSec = 6,
	fadeSec = 1,
	invert = false,
	seed = 'video-bg',
	objectFit = 'cover',
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const list = videos ?? MANIFEST_VIDEOS;
	if (list.length === 0) {
		return null;
	}

	const order = shuffle(list, seed);
	const n = order.length;
	const clipF = Math.max(1, Math.round(clipDurationSec * fps));
	const fadeF = Math.max(1, Math.min(Math.round(fadeSec * fps), Math.floor(clipF / 2)));

	const filterId = `luma-to-alpha-${seed}`;

	// 当前段 jc，及其在本段内的局部帧 local∈[0,clipF)。
	const jc = Math.floor(frame / clipF);
	const local = frame - jc * clipF;
	const inCrossfade = local >= clipF - fadeF;

	const srcOf = (j: number) => staticFile(`video-background/${order[((j % n) + n) % n]}`);

	// 当前段：进入本段前 fadeF 帧已淡入完成 → 段内保持 1，末尾 fadeF 帧淡出。
	const curOpacity = inCrossfade
		? interpolate(local, [clipF - fadeF, clipF], [1, 0], {
				extrapolateLeft: 'clamp',
				extrapolateRight: 'clamp',
		  })
		: 1;
	// 每段的 Sequence 提前 fadeF 帧开始，使其在淡入窗口里从视频 0 帧起播。
	const curFrom = jc * clipF - fadeF;

	// 下一段：仅在交叉淡入淡出窗口里渲染并淡入。
	const nextOpacity = inCrossfade
		? interpolate(local, [clipF - fadeF, clipF], [0, 1], {
				extrapolateLeft: 'clamp',
				extrapolateRight: 'clamp',
		  })
		: 0;
	const nextFrom = (jc + 1) * clipF - fadeF;

	return (
		<AbsoluteFill style={{overflow: 'hidden'}}>
			<LumaToAlphaFilter id={filterId} invert={invert} />
			<Sequence from={curFrom} durationInFrames={clipF + fadeF} layout="none">
				<Clip
					src={srcOf(jc)}
					opacity={curOpacity}
					filterId={filterId}
					objectFit={objectFit}
				/>
			</Sequence>
			{inCrossfade && n > 1 ? (
				<Sequence from={nextFrom} durationInFrames={clipF + fadeF} layout="none">
					<Clip
						src={srcOf(jc + 1)}
						opacity={nextOpacity}
						filterId={filterId}
						objectFit={objectFit}
					/>
				</Sequence>
			) : null}
		</AbsoluteFill>
	);
};
