#!/usr/bin/env bash
# start-dev-server.sh — launch the Astro dev server for the ICJIA Community
# Engagement Hub from anywhere in the repo.
#
# What it does:
#   1. Frees the dev port (kills any process listening on it).
#   2. Clears stale caches (.astro Vite cache + node_modules/.vite) — the
#      usual culprits behind "why is dev showing yesterday's content?".
#   3. Starts `pnpm dev` on the port.
#
# Port 8080 (this project's canonical dev port — 4321 is left free for other
# local Astro projects). Override with: PORT=3000 ./start-dev-server.sh
set -euo pipefail

PORT="${PORT:-8080}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ASTRO_DIR="$SCRIPT_DIR/astro"

echo "▸ Freeing port $PORT …"
if lsof -ti "tcp:$PORT" >/dev/null 2>&1; then
  lsof -ti "tcp:$PORT" | xargs kill -9 2>/dev/null || true
  echo "  killed the process holding $PORT"
else
  echo "  $PORT already free"
fi

echo "▸ Clearing stale caches …"
rm -rf "$ASTRO_DIR/.astro" "$ASTRO_DIR/node_modules/.vite"

echo "▸ Starting Astro dev server on http://localhost:$PORT/ …"
cd "$ASTRO_DIR"
exec pnpm dev --port "$PORT"
