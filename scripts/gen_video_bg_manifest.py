#!/usr/bin/env python3
"""Scan ``public/video-background`` and (re)write its ``manifest.json``.

The background video carousel (``<Background variant="video" />`` /
``VideoCarousel.tsx``) can't list a directory at runtime in the browser, so the
set of available clips is captured in ``manifest.json``. Drop video files into
the folder, then run this script to register them.

Usage::

    python scripts/gen_video_bg_manifest.py            # rewrite in place
    python scripts/gen_video_bg_manifest.py --check     # fail if out of date (CI)
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
VIDEO_DIR = (
    REPO_ROOT
    / "OpenMontage"
    / "remotion-composer"
    / "public"
    / "video-background"
)
MANIFEST = VIDEO_DIR / "manifest.json"

VIDEO_EXTS = {".mp4", ".webm", ".mov", ".m4v"}


def discover() -> list[str]:
    if not VIDEO_DIR.is_dir():
        return []
    names = [
        p.name
        for p in VIDEO_DIR.iterdir()
        if p.is_file() and p.suffix.lower() in VIDEO_EXTS
    ]
    return sorted(names)


def render(videos: list[str]) -> str:
    return json.dumps({"videos": videos}, ensure_ascii=False, indent=2) + "\n"


def main() -> int:
    check = "--check" in sys.argv[1:]
    videos = discover()
    new_text = render(videos)
    old_text = MANIFEST.read_text(encoding="utf-8") if MANIFEST.exists() else ""

    if check:
        if new_text != old_text:
            print(
                "manifest.json is out of date; run "
                "`python scripts/gen_video_bg_manifest.py`",
                file=sys.stderr,
            )
            return 1
        print("manifest.json up to date.")
        return 0

    VIDEO_DIR.mkdir(parents=True, exist_ok=True)
    MANIFEST.write_text(new_text, encoding="utf-8")
    print(f"Wrote {MANIFEST.relative_to(REPO_ROOT)} with {len(videos)} video(s):")
    for v in videos:
        print(f"  - {v}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
