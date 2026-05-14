import { findCondition, LICENSE } from "../data.js";

export const lookupConditionTool = {
  name: "lookup_condition",
  description:
    "Look up a condition by name from the SRD 5.2.1 dataset. Returns the condition rules or null if not found.",
  inputSchema: {
    type: "object" as const,
    required: ["name"],
    properties: {
      name: {
        type: "string",
        description: "Condition name, e.g. 'charmed' or 'Blinded'",
      },
    },
  },
};

export function handleLookupCondition(args: { name: string }) {
  const condition = findCondition(args.name);
  if (!condition) {
    return { _license: LICENSE, condition: null };
  }
  return { _license: LICENSE, condition };
}
