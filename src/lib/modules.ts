/**
 * The three course modules. Keep in sync with the current library.html
 * grouping. `id` is used as a frontmatter value in content MDX files.
 */
export const MODULES = [
  {
    id: "chemistry",
    number: 1,
    title: "Hydrocarbon Chemistry, Feedstocks & Products",
    description:
      "Start here. The molecular vocabulary of the refinery and the products it makes.",
  },
  {
    id: "processes",
    number: 2,
    title: "Refinery Processes & Units",
    description:
      "How crude becomes fuel, unit by unit, from the crude tower to finishing.",
  },
  {
    id: "equipment",
    number: 3,
    title: "Equipment, Inspection & Maintenance",
    description:
      "Pumps, valves, instrumentation, electrical. The hardware that keeps the plant running.",
  },
] as const;

export type ModuleId = (typeof MODULES)[number]["id"];

/**
 * Submodules: the second-level grouping under each module. Matches the
 * 1.1 / 1.2 / 2.1 ... structure on the original library.html page.
 *
 * `id` is used as a frontmatter value in content MDX files.
 * `label` is what displays in the small mono-font eyebrow above the heading.
 */
export const SUBMODULES = [
  // Module 1: Chemistry
  {
    id: "chem-basics",
    module: "chemistry",
    label: "1.1 Hydrocarbon Chemistry",
    title: "Hydrocarbon Chemistry",
  },
  {
    id: "chem-products",
    module: "chemistry",
    label: "1.2 Refinery Products",
    title: "Refinery Products",
  },

  // Module 2: Processes
  {
    id: "proc-fundamentals",
    module: "processes",
    label: "2.1 Refinery Fundamentals",
    title: "Refinery Fundamentals",
  },
  {
    id: "proc-hydrogen",
    module: "processes",
    label: "2.2 Hydrogen & Gas Treatment",
    title: "Hydrogen & Gas Treatment",
  },
  {
    id: "proc-conversion",
    module: "processes",
    label: "2.3 Conversion Processes",
    title: "Conversion Processes",
  },
  {
    id: "proc-auxiliary",
    module: "processes",
    label: "2.4 Auxiliary Operations",
    title: "Auxiliary Operations",
  },

  // Module 3: Equipment
  {
    id: "equip-rotating",
    module: "equipment",
    label: "3.1 Rotating Equipment",
    title: "Rotating Equipment",
  },
  {
    id: "equip-electrical",
    module: "equipment",
    label: "3.2 Electrical & Control",
    title: "Electrical & Control",
  },
  {
    id: "equip-valves",
    module: "equipment",
    label: "3.3 Valves & Instrumentation",
    title: "Valves & Instrumentation",
  },
  {
    id: "equip-inspection",
    module: "equipment",
    label: "3.4 Inspection & Integrity",
    title: "Inspection & Integrity",
  },
  {
    id: "equip-operations",
    module: "equipment",
    label: "3.5 Plant Operations & Support",
    title: "Plant Operations & Support",
  },
] as const satisfies readonly {
  id: string;
  module: ModuleId;
  label: string;
  title: string;
}[];

export type SubmoduleId = (typeof SUBMODULES)[number]["id"];

export function submodulesForModule(moduleId: ModuleId) {
  return SUBMODULES.filter((s) => s.module === moduleId);
}
