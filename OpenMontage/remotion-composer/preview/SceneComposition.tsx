import React from 'react';
import {AbsoluteFill} from 'remotion';
import {
	TemplateThemeProvider,
	buildTemplateTheme,
} from '../src/custom-templates/theme/ThemeContext';
import {resolvePalette} from '../src/custom-templates/theme/palettes';
import {
	Background,
	type BackgroundVariant,
} from '../src/custom-templates/background';

export interface SceneCompositionProps {
	// 由 registry 提供的场景组件与其 props（在内存中传递，不经过序列化）。
	SceneComponent: React.ComponentType<Record<string, unknown>>;
	sceneProps: Record<string, unknown>;
	themeName: string;
	background: BackgroundVariant;
}

// 与 Explainer 完全一致的外层包裹：主题 Provider → 主题渐变底 + 动效背景 → 场景组件。
// 因此 useCurrentFrame/spring/interpolate 的动效会被 <Player> 逐帧完整播放。
export const SceneComposition: React.FC<SceneCompositionProps> = ({
	SceneComponent,
	sceneProps,
	themeName,
	background,
}) => {
	const theme = buildTemplateTheme(themeName);
	const palette = resolvePalette(themeName);
	return (
		<TemplateThemeProvider theme={theme}>
			<AbsoluteFill
				style={{
					background: `linear-gradient(160deg, ${palette.bg.from}, ${palette.bg.to})`,
					fontFamily: theme.fonts.family,
				}}
			>
				<Background variant={background} />
				<SceneComponent {...sceneProps} />
			</AbsoluteFill>
		</TemplateThemeProvider>
	);
};
