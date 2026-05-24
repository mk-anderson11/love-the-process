/**
 * DOCX → MDX content porter for Crude Academy.
 *
 * Reads every `.docx` under ../Content/<folder>/ and emits a matching
 * `content/articles/<slug>.mdx` file with frontmatter.
 *
 * ARTICLE_META is the source of truth. It maps each Content folder name
 * to the display title + module + submodule + type we want to use. It was
 * populated from the existing library.html structure.
 *
 *   Run:  npm run port-content
 *
 *   Flags:
 *     --frontmatter-only   Only rewrite frontmatter on existing .mdx files;
 *                          leaves the body untouched. Use this after editing
 *                          ARTICLE_META to avoid clobbering hand-edited bodies.
 */
import fs from "node:fs/promises";
import path from "node:path";
import mammoth from "mammoth";

const CONTENT_SRC = path.resolve(process.cwd(), "..", "Content");
const CONTENT_DST = path.resolve(process.cwd(), "content", "articles");

const FRONTMATTER_ONLY = process.argv.includes("--frontmatter-only");

type ModuleId = "chemistry" | "processes" | "equipment";
type SubmoduleId =
  | "chem-basics"
  | "chem-products"
  | "proc-fundamentals"
  | "proc-hydrogen"
  | "proc-conversion"
  | "proc-auxiliary"
  | "equip-rotating"
  | "equip-electrical"
  | "equip-valves"
  | "equip-inspection"
  | "equip-operations";
type ArticleType = "article" | "video";

/**
 * Canonical metadata for every article in ../Content/.
 * Titles come from the existing library.html (the display title visitors see),
 * not from the folder names (which are just working labels).
 *
 * Submodule assignments follow the 1.1 / 1.2 / 2.x / 3.x hierarchy from
 * library.html. Order numbers were already grouped by submodule
 * (100s=1.1, 200s=1.2, 300s=2.1, 400s=2.2, 500s=2.3, 600s=2.4,
 *  700s=3.1, 800s=3.2, 900s=3.3, 1000s=3.4, 1100s=3.5).
 */
const ARTICLE_META: Record<
  string,
  {
    title: string;
    module: ModuleId;
    submodule: SubmoduleId;
    type: ArticleType;
    youtube?: string;
    order: number;
  }
> = {
  // ── Module 1: Chemistry ─────────────────────────────────────────────
  // 1.1 Hydrocarbon Chemistry
  "Video Basic Chemistry": {
    title: "Basic Chemistry for Understanding Oil Refineries",
    module: "chemistry",
    submodule: "chem-basics",
    type: "video",
    youtube: "i7ZA6op8Xs0",
    order: 110,
  },
  "Video Simplified Chemistry": {
    title: "Crude Oil, Gasoline, and Diesel: A Simplified Chemistry Primer",
    module: "chemistry",
    submodule: "chem-basics",
    type: "video",
    youtube: "Afy6BkGSmQM",
    order: 120,
  },
  "Paraffin Basics": {
    title: "Paraffin: A Refinery Vocab Essential",
    module: "chemistry",
    submodule: "chem-basics",
    type: "article",
    order: 130,
  },
  Paraffins: {
    title:
      "Straight Chains and Branches: A Look at Paraffin Types in Refining",
    module: "chemistry",
    submodule: "chem-basics",
    type: "article",
    order: 140,
  },
  "Boiling Points At A Glance": {
    title: "Propane, Butane, Pentane: A Refinery Operator's Quick Reference",
    module: "chemistry",
    submodule: "chem-basics",
    type: "article",
    order: 150,
  },

  // 1.2 Refinery Products
  "Hydrogen Content": {
    title: "Hydrogen Content: Gasoline vs. Middle Distillates",
    module: "chemistry",
    submodule: "chem-products",
    type: "article",
    order: 210,
  },
  "Blendstock and Gasoline": {
    title: "Ethanol, Blendstock, and the Last Mile of Gasoline",
    module: "chemistry",
    submodule: "chem-products",
    type: "article",
    order: 220,
  },
  "Video Renewable Diesel": {
    title: "Renewable Diesel Is Not a Synonym for Biodiesel",
    module: "chemistry",
    submodule: "chem-products",
    type: "video",
    youtube: "2LuXeuvhS1E",
    order: 230,
  },

  // ── Module 2: Processes ─────────────────────────────────────────────
  // 2.1 Refinery Fundamentals
  "Cut Points": {
    title: "Cut Points: Gasoline, Jet Fuel, and Diesel",
    module: "processes",
    submodule: "proc-fundamentals",
    type: "article",
    order: 310,
  },
  "Sloppy Cuts": {
    title: "Sloppy Cuts: When Separation Isn't Perfect",
    module: "processes",
    submodule: "proc-fundamentals",
    type: "article",
    order: 320,
  },
  "Refinery Process Units": {
    title: "The Anatomy of a Refinery Process Unit",
    module: "processes",
    submodule: "proc-fundamentals",
    type: "article",
    order: 330,
  },
  "Desalter Operation": {
    title: "The Desalter: Crude Oil's First Stop",
    module: "processes",
    submodule: "proc-fundamentals",
    type: "article",
    order: 340,
  },
  "Wastewater Process Water": {
    title: "Process Water: Four Sources of Refinery Wastewater",
    module: "processes",
    submodule: "proc-fundamentals",
    type: "article",
    order: 350,
  },

  // 2.2 Hydrogen & Gas Treatment
  "Amine Regen": {
    title: "How Refineries Remove H2S from Fuel Gas",
    module: "processes",
    submodule: "proc-hydrogen",
    type: "article",
    order: 410,
  },
  "Caustic Scrubbing": {
    title: "Caustic Scrubbing in Refinery Fuel Gas Treatment",
    module: "processes",
    submodule: "proc-hydrogen",
    type: "article",
    order: 420,
  },
  "Steam Methane Reforming": {
    title: "From Methane to Hydrogen: SMR Explained",
    module: "processes",
    submodule: "proc-hydrogen",
    type: "article",
    order: 430,
  },
  "Hydrogen PSA": {
    title: "Why SMR Hydrogen Needs Purification",
    module: "processes",
    submodule: "proc-hydrogen",
    type: "article",
    order: 440,
  },
  "Hydrogen Consumption": {
    title: "Hydrogen Consumption in Oil Refineries",
    module: "processes",
    submodule: "proc-hydrogen",
    type: "article",
    order: 450,
  },

  // 2.3 Conversion Processes
  Hydrotreating: {
    title: "Hydrotreating: Removing Sulfur with Hydrogen",
    module: "processes",
    submodule: "proc-conversion",
    type: "article",
    order: 510,
  },
  "FCC Yields": {
    title: "FCC Yields and Hydrotreated Feed",
    module: "processes",
    submodule: "proc-conversion",
    type: "article",
    order: 520,
  },
  "Recovering Waste Energy": {
    title: "Turning FCC Flue Gas into Power",
    module: "processes",
    submodule: "proc-conversion",
    type: "article",
    order: 530,
  },
  "Delayed Coking": {
    title: "What Is Delayed Coking?",
    module: "processes",
    submodule: "proc-conversion",
    type: "article",
    order: 540,
  },
  Hydrocracking: {
    title: "Hydrocracking: Converting Heavy Oil into Diesel and Jet Fuel",
    module: "processes",
    submodule: "proc-conversion",
    type: "article",
    order: 550,
  },

  // 2.4 Auxiliary Operations
  Reforming: {
    title: "How Reforming Raises Naphtha Octane",
    module: "processes",
    submodule: "proc-auxiliary",
    type: "article",
    order: 610,
  },
  "Upgrading Naphtha": {
    title: "Reforming and Isomerization: Upgrading Naphtha",
    module: "processes",
    submodule: "proc-auxiliary",
    type: "article",
    order: 620,
  },
  "Bleach Cycle": {
    title: "The Bleach Cycle: Salt, Chlorine, Water",
    module: "processes",
    submodule: "proc-auxiliary",
    type: "article",
    order: 630,
  },

  // ── Module 3: Equipment ─────────────────────────────────────────────
  // 3.1 Rotating Equipment
  "Video Centrifugal Compressor": {
    title: "Centrifugal Compressor Basics",
    module: "equipment",
    submodule: "equip-rotating",
    type: "video",
    youtube: "e0GrlF8jcGw",
    order: 710,
  },
  "Compress Diff Pressure": {
    title: "Centrifugal Compressor dP: Two Independent Factors",
    module: "equipment",
    submodule: "equip-rotating",
    type: "article",
    order: 720,
  },
  "Video Motor Troubleshooting": {
    title:
      "Motor Troubleshooting for Refinery Operators: Where to Start When the Pump Won't Run",
    module: "equipment",
    submodule: "equip-rotating",
    type: "video",
    youtube: "jC7lTUmtYlU",
    order: 730,
  },
  "Pump Spillback": {
    title: "Pump Spillback Lines and Operating Curves",
    module: "equipment",
    submodule: "equip-rotating",
    type: "article",
    order: 740,
  },
  "Rider Bands": {
    title: "Rider Bands in Reciprocating Compressors",
    module: "equipment",
    submodule: "equip-rotating",
    type: "article",
    order: 750,
  },
  "Pump Direct and Indirect Drive": {
    title: "How Pumps Are Coupled to Motors",
    module: "equipment",
    submodule: "equip-rotating",
    type: "article",
    order: 760,
  },
  "Inboard Outboard": {
    title: "Inboard vs. Outboard: Pump Bearing Basics",
    module: "equipment",
    submodule: "equip-rotating",
    type: "article",
    order: 770,
  },

  // 3.2 Electrical & Control
  "Circuit Breakers": {
    title: "Fuses, Circuit Breakers, and Fault Protection",
    module: "equipment",
    submodule: "equip-electrical",
    type: "article",
    order: 810,
  },
  "Soft Starters": {
    title: "How Soft Starters Protect Electric Motors",
    module: "equipment",
    submodule: "equip-electrical",
    type: "article",
    order: 820,
  },
  "PLC vs DCS": {
    title: "PLC vs. DCS: Control System Basics",
    module: "equipment",
    submodule: "equip-electrical",
    type: "article",
    order: 830,
  },
  Solenoids: {
    title: "Solenoid Valves in Oil Refineries",
    module: "equipment",
    submodule: "equip-electrical",
    type: "article",
    order: 840,
  },
  "Switches and Relays": {
    title: "How Relays Protect High-Voltage Circuits",
    module: "equipment",
    submodule: "equip-electrical",
    type: "article",
    order: 850,
  },
  "Megger The Motor": {
    title: "Megger the Motor: Insulation Resistance Testing",
    module: "equipment",
    submodule: "equip-electrical",
    type: "article",
    order: 860,
  },

  // 3.3 Valves & Instrumentation
  "Instrumentation Manifolds": {
    title: "Instrument Manifolds and dP Measurement",
    module: "equipment",
    submodule: "equip-valves",
    type: "article",
    order: 910,
  },
  "Gate Valve": {
    title: "Gate Valves: Stem Nuts and Lubrication",
    module: "equipment",
    submodule: "equip-valves",
    type: "article",
    order: 920,
  },
  "Video PSV": {
    title: "Conventional vs. Bellows PSV: What's the Difference?",
    module: "equipment",
    submodule: "equip-valves",
    type: "video",
    youtube: "gjN4IHzmqtw",
    order: 930,
  },

  // 3.4 Inspection & Integrity
  "Video Corrosion": {
    title: "Five Types of Corrosion Every Refinery Engineer Should Know",
    module: "equipment",
    submodule: "equip-inspection",
    type: "video",
    youtube: "Os-a6Js4NCU",
    order: 1010,
  },
  Radiography: {
    title: "Radiography: Conventional and Digital Methods",
    module: "equipment",
    submodule: "equip-inspection",
    type: "article",
    order: 1020,
  },
  "Video Cooling Water Hardness": {
    title:
      "Cooling Water Hardness and Conductivity: What Refinery Operators Need to Know",
    module: "equipment",
    submodule: "equip-inspection",
    type: "video",
    youtube: "sf29P0k5wcU",
    order: 1030,
  },
  "Ammonium Salts": {
    title: "How Ammonium Salts Form in Refineries",
    module: "equipment",
    submodule: "equip-inspection",
    type: "article",
    order: 1040,
  },

  // 3.5 Plant Operations & Support
  "Refinery Work Process": {
    title: "Who Does What in a Refinery",
    module: "equipment",
    submodule: "equip-operations",
    type: "article",
    order: 1110,
  },
  "Video Dearator Basics": {
    title: "What Is a Deaerator, and Why Does It Matter?",
    module: "equipment",
    submodule: "equip-operations",
    type: "video",
    youtube: "WEVtYGoR_zM",
    order: 1120,
  },
  "Dry Drains": {
    title: "Oily Water Sewers and Liquid Seals",
    module: "equipment",
    submodule: "equip-operations",
    type: "article",
    order: 1130,
  },
  "Steam Tracing": {
    title: "Steam Tracing: Keeping Lines Hot",
    module: "equipment",
    submodule: "equip-operations",
    type: "article",
    order: 1140,
  },
  "Tank Mixing": {
    title: "Stratification and Mixing in Refinery Tanks",
    module: "equipment",
    submodule: "equip-operations",
    type: "article",
    order: 1150,
  },
};

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Clean up the markdown mammoth emits from docx:
 * - strip backslash escapes from punctuation that doesn't need escaping in MDX
 * - drop a leading "Title: ..." line (the docx-internal title, we use our own)
 * - collapse stray multi-blank-line gaps
 */
function cleanMarkdown(md: string): string {
  let out = md;

  // Drop leading "Title: ..." line (case-insensitive), optionally preceded by blanks
  out = out.replace(/^\s*title\s*:\s*[^\n]*\n+/i, "");

  // Unescape common mammoth escapes: \. \- \! \? \( \) \[ \] \/ \, \; \: \' \"
  out = out.replace(/\\([.\-!?()[\]/,;:'"])/g, "$1");

  // Trim trailing whitespace on each line (mammoth sprinkles double-spaces)
  out = out
    .split("\n")
    .map((line) => line.replace(/[ \t]+$/g, ""))
    .join("\n");

  // Collapse 3+ blank lines to a single blank line
  out = out.replace(/\n{3,}/g, "\n\n");

  return out.trim();
}

function frontmatter(fm: Record<string, string | number>): string {
  const lines = Object.entries(fm)
    .filter(([, v]) => v !== undefined && v !== "")
    .map(([k, v]) => {
      if (typeof v === "number") return `${k}: ${v}`;
      const s = String(v).replace(/"/g, '\\"');
      return `${k}: "${s}"`;
    });
  return `---\n${lines.join("\n")}\n---\n`;
}

/**
 * Split an existing .mdx file into (frontmatterBlock, body).
 * Returns body="" if no frontmatter found.
 */
function splitFrontmatter(raw: string): { body: string } {
  const m = raw.match(/^---\n[\s\S]*?\n---\n?/);
  if (!m) return { body: raw };
  return { body: raw.slice(m[0].length).replace(/^\n+/, "") };
}

async function main() {
  await fs.mkdir(CONTENT_DST, { recursive: true });

  if (FRONTMATTER_ONLY) {
    // Rewrite frontmatter on files that already exist; leave bodies alone.
    let updated = 0;
    let missing = 0;
    for (const [folder, meta] of Object.entries(ARTICLE_META)) {
      const slug = slugify(folder);
      const dst = path.join(CONTENT_DST, `${slug}.mdx`);
      let existing: string;
      try {
        existing = await fs.readFile(dst, "utf8");
      } catch {
        missing += 1;
        console.log(`  missing (skipped): ${slug}.mdx`);
        continue;
      }
      const { body } = splitFrontmatter(existing);
      const fm = frontmatter({
        title: meta.title,
        slug,
        module: meta.module,
        submodule: meta.submodule,
        type: meta.type,
        ...(meta.youtube ? { youtube: meta.youtube } : {}),
        order: meta.order,
      });
      await fs.writeFile(dst, `${fm}\n${body}\n`);
      updated += 1;
    }
    console.log(
      `\n--frontmatter-only: updated ${updated} file(s), ${missing} missing`,
    );
    return;
  }

  const folders = (await fs.readdir(CONTENT_SRC, { withFileTypes: true }))
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const unmapped: string[] = [];
  let written = 0;

  for (const folder of folders) {
    const meta = ARTICLE_META[folder];
    if (!meta) {
      unmapped.push(folder);
      continue;
    }

    const folderPath = path.join(CONTENT_SRC, folder);
    const entries = await fs.readdir(folderPath);
    const docx = entries.find((f) => f.toLowerCase().endsWith(".docx"));
    if (!docx) continue;

    const slug = slugify(folder);

    const { value: markdown } = await mammoth.convertToMarkdown({
      path: path.join(folderPath, docx),
    });

    const body = cleanMarkdown(markdown);

    const fm = frontmatter({
      title: meta.title,
      slug,
      module: meta.module,
      submodule: meta.submodule,
      type: meta.type,
      order: meta.order,
    });

    await fs.writeFile(
      path.join(CONTENT_DST, `${slug}.mdx`),
      `${fm}\n${body}\n`,
    );
    written += 1;
  }

  console.log(`Wrote ${written} MDX file(s) to ${CONTENT_DST}`);
  if (unmapped.length) {
    console.log(
      `\nNo metadata for these folders. Add them to ARTICLE_META in scripts/docx-to-mdx.ts:`,
    );
    unmapped.forEach((f) => console.log(`  - ${f}`));
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
