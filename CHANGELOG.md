# Changelog

## v1.1.0 — 2026-05-15

Dataset cleanup pass: smaller payload, less internal-schema leakage.

**Data:**
- Dropped the internal-only `user_id` field (always `null` for SRD records) from every monster record.
- Empty arrays, empty strings, and `null` values are now omitted entirely rather than serialized. `monsters.json` shrunk ~7% (899KB → 835KB).
- JSON Schema relaxed: `StatBlock` arrays like `damage_immunities`, `condition_immunities`, `languages`, `traits`, `actions`, `reactions`, `senses`, `saving_throws`, `skills` are now optional (they're absent rather than `[]` / `{}` when empty).

**Compatibility note:** Consumers that iterated fields like `monster.stat_block_json.languages` should now defensively check for absence (treat missing as empty). The MCP server itself returns records as-is — no API surface change to tool names, arguments, or response envelopes.

**MCP server:**
- `@cocoajamworld/fifth-edition-srd-mcp` v1.1.0 — same tools, smaller payloads.

## v1.0.0 — 2026-05-14

Initial publication of SRD 5.2.1 monsters and conditions as structured JSON + stdio MCP server.

**Data:**
- 322 monsters with full stat blocks (`data/monsters.json`)
- 14 conditions with markdown-formatted rules text (`data/conditions.json`)
- JSON Schema (draft-07) for both datasets

**Source lineage:** Data fetched from the Open5e API (`document__slug=wotc-srd`), which
re-publishes the WotC SRD 5.2.1 under CC BY 4.0. Cross-referenced against Open5e raw to
catch transformation regressions. Known discrepancies documented in `data/expected-mismatches.md`.

**MCP server:**
- `@cocoajamworld/fifth-edition-srd-mcp` v1.0.0
- Tools: `lookup_monster`, `lookup_condition`, `search_monsters`, `license`
- Installable via `npx @cocoajamworld/fifth-edition-srd-mcp`
