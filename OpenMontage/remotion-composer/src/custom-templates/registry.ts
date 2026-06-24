import type React from 'react';
import {z} from 'zod';
import {IntroScene, introSchema} from './scenes/IntroScene';
import {OutroScene, outroSchema} from './scenes/OutroScene';
import {ConceptScene, conceptSchema} from './scenes/ConceptScene';
import {TimelineScene, timelineSchema} from './scenes/TimelineScene';
import {TableScene, tableSchema} from './scenes/TableScene';
import {ComparisonScene, comparisonSchema} from './scenes/ComparisonScene';
import {CodeScene, codeSchema} from './scenes/CodeScene';
import sceneTypesManifest from './scene-types.json';

// 模板库的单一注册表：每个场景把「类型名 → 组件 + co-located zod schema」登记在此。
// 新增模板只改这一处 + 对应 scene 文件。Explainer 从这里取组件分发，
// pipeline_lint / SCENE_TYPES.md 从 scene-types.json 取同一份事实。
export interface SceneDefinition {
	type: string;
	schema: z.ZodObject<z.ZodRawShape>;
	// props 已由各自 schema 约束，这里用宽松组件类型避免在注册表里枚举每种 props。
	component: React.FC<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export const TEMPLATE_SCENES: Record<string, SceneDefinition> = {
	intro_scene: {type: 'intro_scene', schema: introSchema, component: IntroScene},
	outro_scene: {type: 'outro_scene', schema: outroSchema, component: OutroScene},
	concept_scene: {type: 'concept_scene', schema: conceptSchema, component: ConceptScene},
	timeline_scene: {type: 'timeline_scene', schema: timelineSchema, component: TimelineScene},
	table_scene: {type: 'table_scene', schema: tableSchema, component: TableScene},
	comparison_scene: {type: 'comparison_scene', schema: comparisonSchema, component: ComparisonScene},
	code_scene: {type: 'code_scene', schema: codeSchema, component: CodeScene},
};

export const TEMPLATE_SCENE_TYPES: string[] = Object.keys(TEMPLATE_SCENES);

interface ManifestScene {
	type: string;
	template: string;
	description: string;
	required: string[];
	optional: string[];
}

// 启动期一致性守卫：scene-types.json（跨语言 SSOT）必须与 zod schema 的字段完全吻合，
// 否则文档 / lint 会与真实组件漂移。任一不一致直接抛错，本地与 CI 都能立刻发现。
function assertManifestMatchesSchemas(): void {
	const manifest = sceneTypesManifest as {scenes: ManifestScene[]};
	const manifestTypes = manifest.scenes.map((s) => s.type).sort();
	const registryTypes = [...TEMPLATE_SCENE_TYPES].sort();
	if (JSON.stringify(manifestTypes) !== JSON.stringify(registryTypes)) {
		throw new Error(
			`[registry] scene-types.json types ${JSON.stringify(manifestTypes)} != registry types ${JSON.stringify(registryTypes)}`
		);
	}
	for (const entry of manifest.scenes) {
		const def = TEMPLATE_SCENES[entry.type];
		const shape = def.schema.shape as unknown as Record<
			string,
			{safeParse: (v: unknown) => {success: boolean}}
		>;
		const shapeKeys = Object.keys(shape).sort();
		const declared = [...entry.required, ...entry.optional].sort();
		if (JSON.stringify(shapeKeys) !== JSON.stringify(declared)) {
			throw new Error(
				`[registry] '${entry.type}' fields drift: schema ${JSON.stringify(shapeKeys)} != manifest ${JSON.stringify(declared)}`
			);
		}
		for (const key of entry.required) {
			if (shape[key].safeParse(undefined).success) {
				throw new Error(`[registry] '${entry.type}.${key}' is declared required but schema accepts undefined`);
			}
		}
		for (const key of entry.optional) {
			if (!shape[key].safeParse(undefined).success) {
				throw new Error(`[registry] '${entry.type}.${key}' is declared optional but schema rejects undefined`);
			}
		}
	}
}

assertManifestMatchesSchemas();
