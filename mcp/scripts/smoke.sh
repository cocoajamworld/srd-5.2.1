#!/usr/bin/env bash
# Smoke-tests the MCP server by sending JSON-RPC messages over stdio and checking responses.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DIST="$SCRIPT_DIR/../dist/index.js"

if [[ ! -f "$DIST" ]]; then
  echo "dist/index.js not found — run npm run build first" >&2
  exit 1
fi

run_tool() {
  local tool="$1"
  local args="$2"
  local payload
  payload=$(printf '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"%s","arguments":%s}}\n' "$tool" "$args")
  echo "$payload" | node "$DIST" | head -1
}

echo "=== lookup_monster: goblin ==="
RESULT=$(run_tool "lookup_monster" '{"name":"goblin"}')
echo "$RESULT" | jq '.'
echo "$RESULT" | jq -e '.result.content[0].text' | jq -r '.' | jq -e '._license' > /dev/null
echo "PASS: goblin has _license"

echo ""
echo "=== lookup_condition: charmed ==="
RESULT=$(run_tool "lookup_condition" '{"name":"charmed"}')
echo "$RESULT" | jq '.'
echo "$RESULT" | jq -e '.result.content[0].text' | jq -r '.' | jq -e '._license' > /dev/null
echo "PASS: charmed has _license"

echo ""
echo "=== search_monsters: cr=1/4, type=humanoid ==="
RESULT=$(run_tool "search_monsters" '{"cr":"1/4","type":"humanoid"}')
echo "$RESULT" | jq '.'
echo "$RESULT" | jq -e '.result.content[0].text' | jq -r '.' | jq -e '._license' > /dev/null
echo "PASS: search has _license"

echo ""
echo "=== license ==="
RESULT=$(run_tool "license" '{}')
echo "$RESULT" | jq '.'
echo "$RESULT" | jq -e '.result.content[0].text' | jq -r '.' | jq -e '._license' > /dev/null
echo "PASS: license has _license"

echo ""
echo "All smoke tests passed."
