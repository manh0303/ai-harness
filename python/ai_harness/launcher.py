"""Run the shared JavaScript CLI with an existing Node.js 22+ executable."""
import os
import pathlib
import shutil
import subprocess
import sys


def main():
    requested = os.environ.get("AIH_NODE", "node")
    node = shutil.which(requested)
    if not node:
        print("aih requires Node.js 22+. Install Node offline or set AIH_NODE to its executable; npm is not required.", file=sys.stderr)
        return 2
    try:
        version = subprocess.run([node, "--version"], check=True, capture_output=True, text=True, timeout=10).stdout.strip()
        if not version.startswith("v") or int(version[1:].split(".")[0]) < 22:
            raise ValueError("unsupported version")
        cli = pathlib.Path(__file__).parent / "_bundle" / "bin" / "aih.js"
        return subprocess.call([node, str(cli), *sys.argv[1:]], shell=False)
    except (OSError, ValueError, subprocess.SubprocessError):
        print("aih could not run Node.js 22+. Check AIH_NODE and your Node installation.", file=sys.stderr)
        return 2


if __name__ == "__main__":
    sys.exit(main())
