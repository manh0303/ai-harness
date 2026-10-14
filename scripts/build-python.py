#!/usr/bin/env python3
"""Build wheel + sdist without network, npm or third-party build dependencies."""
import pathlib
import sys

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[1] / "python"))
import build_backend

out = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else "dist")
print(build_backend.build_wheel(str(out)))
print(build_backend.build_sdist(str(out)))
