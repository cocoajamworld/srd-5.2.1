import { test } from "node:test";
import assert from "node:assert/strict";

import { handleLookupMonster } from "../tools/lookup_monster.js";
import { handleLookupCondition } from "../tools/lookup_condition.js";
import { handleSearchMonsters } from "../tools/search_monsters.js";
import { handleLicense } from "../tools/license.js";

test("lookup_monster returns goblin", () => {
  const result = handleLookupMonster({ name: "goblin" });
  assert.ok(result._license, "has _license field");
  assert.ok(result.monster !== null, "goblin found");
  assert.equal(result.monster!.name, "Goblin");
  assert.equal(result.monster!.type, "humanoid");
  assert.equal(result.monster!.cr, "1/4");
});

test("lookup_monster is case-insensitive", () => {
  const lower = handleLookupMonster({ name: "adult red dragon" });
  const mixed = handleLookupMonster({ name: "Adult Red Dragon" });
  assert.deepEqual(lower.monster?.name, mixed.monster?.name);
});

test("lookup_monster returns null for unknown", () => {
  const result = handleLookupMonster({ name: "not-a-real-monster-xyz" });
  assert.ok(result._license, "has _license field even on miss");
  assert.equal(result.monster, null);
});

test("lookup_condition returns charmed", () => {
  const result = handleLookupCondition({ name: "charmed" });
  assert.ok(result._license, "has _license field");
  assert.ok(result.condition !== null, "charmed found");
  assert.equal(result.condition!.name, "Charmed");
});

test("lookup_condition returns null for unknown", () => {
  const result = handleLookupCondition({ name: "not-a-condition-xyz" });
  assert.equal(result.condition, null);
});

test("search_monsters filters by cr and type", () => {
  const result = handleSearchMonsters({ cr: "1/4", type: "humanoid" });
  assert.ok(result._license, "has _license field");
  assert.ok(result.count > 0, "found at least one CR 1/4 humanoid");
  for (const m of result.monsters) {
    assert.equal(m.cr, "1/4");
    assert.equal(m.type, "humanoid");
    assert.ok(!("stat_block_json" in m), "summaries have no stat_block_json");
  }
});

test("search_monsters with no filters returns all monsters", () => {
  const result = handleSearchMonsters({});
  assert.equal(result.count, 322);
});

test("license tool returns attribution", () => {
  const result = handleLicense();
  assert.ok(result._license, "has _license field");
  assert.ok(result.attribution.includes("Wizards of the Coast"), "WotC credited");
  assert.ok(result.attribution.includes("Open5e"), "Open5e credited");
});
