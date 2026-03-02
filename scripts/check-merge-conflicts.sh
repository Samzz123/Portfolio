#!/usr/bin/env bash
set -euo pipefail

if rg -n "^(<<<<<<<|=======|>>>>>>>)" -- . >/dev/null 2>&1; then
  echo "❌ Merge conflict markers found. Resolve them before committing."
  rg -n "^(<<<<<<<|=======|>>>>>>>)" -- . || true
  exit 1
fi

echo "✅ No merge conflict markers found."
