import { findMonster, LICENSE } from "../data.js";

export const lookupMonsterTool = {
  name: "lookup_monster",
  description:
    "Look up a monster by name from the SRD 5.2.1 dataset. Returns the full stat block or null if not found.",
  inputSchema: {
    type: "object" as const,
    required: ["name"],
    properties: {
      name: {
        type: "string",
        description: "Monster name, e.g. 'goblin' or 'Adult Red Dragon'",
      },
    },
  },
};

export function handleLookupMonster(args: { name: string }) {
  const monster = findMonster(args.name);
  if (!monster) {
    return { _license: LICENSE, monster: null };
  }
  return { _license: LICENSE, monster };
}
