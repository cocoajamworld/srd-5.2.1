# Expected Mismatches

Mismatches between our parsed output and the Open5e API that are intentional.
Format: `- \`slug.field\` — reason`

The parser reads this file and suppresses listed mismatches from the cross-reference exit-nonzero check.
Add a bullet here (with a reason) whenever a mismatch is intentional rather than a parser bug.

<!-- Example:
- `goblin.armor_class` — SRD PDF says 15 (leather + shield), Open5e has 15, values agree; no entry needed.
-->
