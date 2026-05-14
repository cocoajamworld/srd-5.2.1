# Changelog

## v1.0.0 — 2026-05-14

Initial publication of SRD 5.2.1 monsters and conditions as structured JSON + stdio MCP server.

**Data:**
- 322 monsters with full stat blocks (`data/monsters.json`)
- 14 conditions with markdown-formatted rules text (`data/conditions.json`)
- JSON Schema (draft 2020-12) for both datasets

**Source lineage:** Data fetched from the Open5e API (`document__slug=wotc-srd`), which
re-publishes the WotC SRD 5.2.1 under CC BY 4.0. Cross-referenced against Open5e raw to
catch transformation regressions. Known discrepancies documented in `data/expected-mismatches.md`.

**MCP server:**
- `@cocoajamworld/srd-5.2.1-mcp` v1.0.0
- Tools: `lookup_monster`, `lookup_condition`, `search_monsters`, `license`
- Installable via `npx @cocoajamworld/srd-5.2.1-mcp`
