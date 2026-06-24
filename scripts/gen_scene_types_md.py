#!/usr/bin/env python3
"""Regenerate the template-library scene table in ``SCENE_TYPES.md``.

The template scenes are the single-source-of-truth registry in
``OpenMontage/remotion-composer/src/custom-templates/scene-types.json`` (kept in
lockstep with the co-located zod schemas by ``registry.ts``). This script
renders that manifest into the managed block delimited by::

    <!-- BEGIN AUTO-GENERATED: template-scenes -->
    <!-- END AUTO-GENERATED: template-scenes -->

so the docs can never silently drift from the code. Everything outside the
markers (overlays, avatar presets, the how-to) is hand-authored and untouched.

Usage::

    python scripts/gen_scene_types_md.py            # rewrite in place
    python scripts/gen_scene_types_md.py --check     # fail if out of date (CI)
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
COMPOSER_DIR = REPO_ROOT / "OpenMontage" / "remotion-composer"
SCENE_TYPES_JSON = COMPOSER_DIR / "src" / "custom-templates" / "scene-types.json"
SCENE_TYPES_MD = COMPOSER_DIR / "SCENE_TYPES.md"

BEGIN = "<!-- BEGIN AUTO-GENERATED: template-scenes -->"
END = "<!-- END AUTO-GENERATED: template-scenes -->"


def render_block() -> str:
    manifest = json.loads(SCENE_TYPES_JSON.read_text(encoding="utf-8"))
    lines = [
        BEGIN,
        "",
        "## Template-library scenes (`custom-templates`)",
        "",
        "Auto-generated from "
        "`src/custom-templates/scene-types.json` by `scripts/gen_scene_types_md.py` — "
        "**do not edit by hand**. These scenes render fully transparent over the single "
        "independent `Background` layer and read colors/fonts from `useTheme()`.",
        "",
        "| `type` | Template | Required fields | Optional fields | Purpose |",
        "|---|---|---|---|---|",
    ]
    for s in manifest["scenes"]:
        req = ", ".join(f"`{f}`" for f in s["required"]) or "—"
        opt = ", ".join(f"`{f}`" for f in s["optional"]) or "—"
        lines.append(
            f"| `{s['type']}` | `{s['template']}` | {req} | {opt} | {s['description']} |"
        )
    lines += ["", END]
    return "\n".join(lines)


def apply(text: str, block: str) -> str:
    if BEGIN not in text or END not in text:
        raise SystemExit(
            f"markers not found in {SCENE_TYPES_MD}; add\n{BEGIN}\n{END}\nwhere the "
            "generated table should live"
        )
    pre = text[: text.index(BEGIN)]
    post = text[text.index(END) + len(END):]
    return pre + block + post


def main(argv: list[str]) -> int:
    check = "--check" in argv[1:]
    block = render_block()
    current = SCENE_TYPES_MD.read_text(encoding="utf-8")
    updated = apply(current, block)
    if check:
        if current != updated:
            print(
                "SCENE_TYPES.md is out of date; run "
                "`python scripts/gen_scene_types_md.py`",
                file=sys.stderr,
            )
            return 1
        print("SCENE_TYPES.md is up to date")
        return 0
    if current != updated:
        SCENE_TYPES_MD.write_text(updated, encoding="utf-8")
        print(f"Updated {SCENE_TYPES_MD.relative_to(REPO_ROOT)}")
    else:
        print("SCENE_TYPES.md already current")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
