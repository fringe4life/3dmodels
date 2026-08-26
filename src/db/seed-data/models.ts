import slugify from "slugify";
import type { Category } from "@/db/categories";
import type { Model } from "@/db/schema/models";
import { MODEL_SLUGIFY_OPTIONS } from "@/lib/slugify";
import type { Prettify } from "@/types";

type SeedModel = Prettify<
  Omit<Model, "userId" | "likes" | "categorySlug"> & {
    categorySlug: Category["slug"];
  }
>;

/**
 * Descriptions intentionally vary in length for card layout stress tests:
 * - baseline (~current): lineClamp rarely truncates
 * - medium (~2×): often hits 2-line clamp
 * - long (~3×): reliably overflows clamp + exercises subgrid row height
 */
export const modelsData: SeedModel[] = [
  {
    categorySlug: "toys-games",
    dateAdded: new Date("2023-03-15T14:30:00Z"),
    description: "A detailed dragon model with movable joints and wings",
    image: "/img/models/1.avif",
    name: "Articulated Dragon",
    slug: slugify("Articulated Dragon", MODEL_SLUGIFY_OPTIONS),
  },
  {
    categorySlug: "household",
    dateAdded: new Date("2023-06-22T09:15:00Z"),
    description:
      "Geometric planter perfect for small succulents, with drainage channels and optional saucer snap-fit.",
    image: "/img/models/2.avif",
    name: "Succulent Planter",
    slug: slugify("Succulent Planter", MODEL_SLUGIFY_OPTIONS),
  },
  {
    categorySlug: "props-cosplay",
    dateAdded: new Date("2023-09-05T16:45:00Z"),
    description:
      "Sci-fi inspired helmet for costume making, sized for adult heads with foam padding guides, visor clearance, and print-in-place hinge bosses.",
    image: "/img/models/3.avif",
    name: "Cosplay Helmet",
    slug: slugify("Cosplay Helmet", MODEL_SLUGIFY_OPTIONS),
  },
  {
    categorySlug: "education",
    dateAdded: new Date("2023-11-30T11:20:00Z"),
    description: "Scale model of the solar system for classroom use",
    image: "/img/models/4.avif",
    name: "Educational Solar System",
    slug: slugify("Educational Solar System", MODEL_SLUGIFY_OPTIONS),
  },
  {
    categorySlug: "art",
    dateAdded: new Date("2024-01-18T13:40:00Z"),
    description:
      "Modern art piece with flowing curves that catch light from multiple angles on a shelf or pedestal.",
    image: "/img/models/5.avif",
    name: "Abstract Sculpture",
    slug: slugify("Abstract Sculpture", MODEL_SLUGIFY_OPTIONS),
  },
  {
    categorySlug: "tools",
    dateAdded: new Date("2024-03-07T10:25:00Z"),
    description:
      "Customizable holder for workshop tools with slotted pegboard mounts, labeled bays for drivers and pliers, and a removable tray for kit growth.",
    image: "/img/models/6.avif",
    name: "Tool Holder",
    slug: slugify("Tool Holder", MODEL_SLUGIFY_OPTIONS),
  },
  {
    categorySlug: "miniatures",
    dateAdded: new Date("2024-05-12T15:50:00Z"),
    description: "Detailed warrior miniature for tabletop gaming",
    image: "/img/models/7.avif",
    name: "Fantasy Miniature",
    slug: slugify("Fantasy Miniature", MODEL_SLUGIFY_OPTIONS),
  },
  {
    categorySlug: "fashion",
    dateAdded: new Date("2024-07-25T08:35:00Z"),
    description:
      "Tool for creating custom jewelry blanks, including mandrel guides and optional texture stamps for clay or resin.",
    image: "/img/models/8.avif",
    name: "Bracelet Maker",
    slug: slugify("Bracelet Maker", MODEL_SLUGIFY_OPTIONS),
  },
  {
    categorySlug: "3d-printer",
    dateAdded: new Date("2024-09-14T12:15:00Z"),
    description:
      "Enhancement parts for 3D printer performance: stiffer frame braces, quieter fan ducts, and cable clips that cut vibration artifacts on DIY machines.",
    image: "/img/models/9.avif",
    name: "Printer Upgrade Kit",
    slug: slugify("Printer Upgrade Kit", MODEL_SLUGIFY_OPTIONS),
  },
  {
    categorySlug: "hobby-diy",
    dateAdded: new Date("2024-11-03T17:40:00Z"),
    description: "Collection of tools for gardening enthusiasts",
    image: "/img/models/10.avif",
    name: "Garden Tool Set",
    slug: slugify("Garden Tool Set", MODEL_SLUGIFY_OPTIONS),
  },
  {
    categorySlug: "toys-games",
    dateAdded: new Date("2023-02-28T14:20:00Z"),
    description:
      "Modern interpretation of classic chess pieces with weighted bases and a compact travel board sleeve.",
    image: "/img/models/11.avif",
    name: "Chess Set",
    slug: slugify("Chess Set", MODEL_SLUGIFY_OPTIONS),
  },
  {
    categorySlug: "household",
    dateAdded: new Date("2023-05-17T11:30:00Z"),
    description:
      "Modular system for wall storage that tiles horizontally or vertically, with optional hook, bin, and shelf modules for a tidy entryway grid.",
    image: "/img/models/12.avif",
    name: "Wall Organizer",
    slug: slugify("Wall Organizer", MODEL_SLUGIFY_OPTIONS),
  },
  {
    categorySlug: "props-cosplay",
    dateAdded: new Date("2023-08-09T16:05:00Z"),
    description: "Fantasy sword for costume play",
    image: "/img/models/13.avif",
    name: "Prop Sword",
    slug: slugify("Prop Sword", MODEL_SLUGIFY_OPTIONS),
  },
  {
    categorySlug: "education",
    dateAdded: new Date("2023-10-22T09:45:00Z"),
    description:
      "Educational model of molecular structures with color-coded atoms and snap connectors for classroom demos.",
    image: "/img/models/14.avif",
    name: "Molecular Model",
    slug: slugify("Molecular Model", MODEL_SLUGIFY_OPTIONS),
  },
  {
    categorySlug: "art",
    dateAdded: new Date("2024-01-05T15:25:00Z"),
    description:
      "Decorative wall panels with geometric patterns designed to tile seamlessly; print contrasting filament sets for a gallery wall or a single accent panel.",
    image: "/img/models/15.avif",
    name: "Geometric Wall Art",
    slug: slugify("Geometric Wall Art", MODEL_SLUGIFY_OPTIONS),
  },
  {
    categorySlug: "tools",
    dateAdded: new Date("2024-02-19T10:50:00Z"),
    description: "Custom handles for precision screwdrivers",
    image: "/img/models/16.avif",
    name: "Screwdriver Set",
    slug: slugify("Screwdriver Set", MODEL_SLUGIFY_OPTIONS),
  },
  {
    categorySlug: "miniatures",
    dateAdded: new Date("2024-04-30T13:15:00Z"),
    description:
      "Detailed dragon for tabletop gaming, with separate wings for easier painting and a scenic base stub.",
    image: "/img/models/17.avif",
    name: "Dragon Miniature",
    slug: slugify("Dragon Miniature", MODEL_SLUGIFY_OPTIONS),
  },
  {
    categorySlug: "fashion",
    dateAdded: new Date("2024-06-14T08:40:00Z"),
    description:
      "Set of geometric earring designs from lightweight studs to statement drops, with print notes so edges stay crisp and post holes land true.",
    image: "/img/models/18.avif",
    name: "Earring Collection",
    slug: slugify("Earring Collection", MODEL_SLUGIFY_OPTIONS),
  },
  {
    categorySlug: "3d-printer",
    dateAdded: new Date("2024-08-27T12:55:00Z"),
    description: "Enhanced cooling solution for 3D printers",
    image: "/img/models/19.avif",
    name: "Cooling System",
    slug: slugify("Cooling System", MODEL_SLUGIFY_OPTIONS),
  },
  {
    categorySlug: "hobby-diy",
    dateAdded: new Date("2024-10-11T17:20:00Z"),
    description:
      "DIY birdhouse with modern design, drainage, and a clean-out panel that swings open for seasonal nesting checks.",
    image: "/img/models/20.avif",
    name: "Birdhouse Kit",
    slug: slugify("Birdhouse Kit", MODEL_SLUGIFY_OPTIONS),
  },
  {
    categorySlug: "toys-games",
    dateAdded: new Date("2023-01-25T14:10:00Z"),
    description:
      "Articulated robot with moving parts at the shoulders, elbows, and hips; includes pin sizes and a print order so first builds finish poseable.",
    image: "/img/models/21.avif",
    name: "Robot Toy",
    slug: slugify("Robot Toy", MODEL_SLUGIFY_OPTIONS),
  },
  {
    categorySlug: "household",
    dateAdded: new Date("2023-04-08T11:35:00Z"),
    description: "Customizable drawer organization system",
    image: "/img/models/22.avif",
    name: "Kitchen Organizer",
    slug: slugify("Kitchen Organizer", MODEL_SLUGIFY_OPTIONS),
  },
  {
    categorySlug: "props-cosplay",
    dateAdded: new Date("2023-07-21T16:00:00Z"),
    description:
      "Base template for custom costume masks with eye cutouts, strap anchors, and a smooth face for paint or foam overlays.",
    image: "/img/models/23.avif",
    name: "Mask Template",
    slug: slugify("Mask Template", MODEL_SLUGIFY_OPTIONS),
  },
  {
    categorySlug: "education",
    dateAdded: new Date("2023-09-30T09:25:00Z"),
    description:
      "Educational DNA double helix model that unscrews into base pairs for hands-on lessons, with an optional stand for stable bench display.",
    image: "/img/models/24.avif",
    name: "DNA Model",
    slug: slugify("DNA Model", MODEL_SLUGIFY_OPTIONS),
  },
  {
    categorySlug: "art",
    dateAdded: new Date("2023-12-13T15:50:00Z"),
    description: "Contemporary vase with unique patterns",
    image: "/img/models/25.avif",
    name: "Modern Vase",
    slug: slugify("Modern Vase", MODEL_SLUGIFY_OPTIONS),
  },
  {
    categorySlug: "tools",
    dateAdded: new Date("2024-02-26T10:15:00Z"),
    description:
      "Custom sized wrench collection covering common fastener heads, stacked in a labeled nest for a toolbox drawer.",
    image: "/img/models/26.avif",
    name: "Wrench Set",
    slug: slugify("Wrench Set", MODEL_SLUGIFY_OPTIONS),
  },
  {
    categorySlug: "miniatures",
    dateAdded: new Date("2024-04-09T13:40:00Z"),
    description:
      "Detailed medieval castle for gaming with modular walls, a keep, and ruin scatter for sieges, skirmishes, or diorama shots across campaigns.",
    image: "/img/models/27.avif",
    name: "Castle Miniature",
    slug: slugify("Castle Miniature", MODEL_SLUGIFY_OPTIONS),
  },
  {
    categorySlug: "fashion",
    dateAdded: new Date("2024-06-22T08:05:00Z"),
    description: "Customizable pendant template",
    image: "/img/models/28.avif",
    name: "Pendant Design",
    slug: slugify("Pendant Design", MODEL_SLUGIFY_OPTIONS),
  },
  {
    categorySlug: "3d-printer",
    dateAdded: new Date("2024-08-05T12:30:00Z"),
    description:
      "Enhanced extruder mechanism with a stiffer lever and clearer filament path for fewer mid-print jams.",
    image: "/img/models/29.avif",
    name: "Extruder Upgrade",
    slug: slugify("Extruder Upgrade", MODEL_SLUGIFY_OPTIONS),
  },
  {
    categorySlug: "hobby-diy",
    dateAdded: new Date("2024-10-18T17:55:00Z"),
    description:
      "Modern stand for indoor plants that elevates pots for airflow, with adjustable shelf heights and a drip-friendly tray for watering day.",
    image: "/img/models/30.avif",
    name: "Plant Stand",
    slug: slugify("Plant Stand", MODEL_SLUGIFY_OPTIONS),
  },
  {
    categorySlug: "toys-games",
    dateAdded: new Date("2023-01-12T14:00:00Z"),
    description: "Complex mechanical puzzle toy",
    image: "/img/models/31.avif",
    name: "Puzzle Cube",
    slug: slugify("Puzzle Cube", MODEL_SLUGIFY_OPTIONS),
  },
  {
    categorySlug: "household",
    dateAdded: new Date("2023-03-25T11:25:00Z"),
    description:
      "Shower organization solution with drain-friendly feet and room for bottles, razors, and a loofah hook.",
    image: "/img/models/32.avif",
    name: "Bathroom Caddy",
    slug: slugify("Bathroom Caddy", MODEL_SLUGIFY_OPTIONS),
  },
  {
    categorySlug: "props-cosplay",
    dateAdded: new Date("2023-06-08T16:50:00Z"),
    description:
      "Detailed costume armor segment with recessed rivets and strap channels for hidden foam webbing; a repeating plate that scales shoulder to torso.",
    image: "/img/models/33.avif",
    name: "Armor Piece",
    slug: slugify("Armor Piece", MODEL_SLUGIFY_OPTIONS),
  },
  {
    categorySlug: "education",
    dateAdded: new Date("2023-08-21T09:15:00Z"),
    description: "Interactive atomic structure model",
    image: "/img/models/34.avif",
    name: "Atom Model",
    slug: slugify("Atom Model", MODEL_SLUGIFY_OPTIONS),
  },
  {
    categorySlug: "art",
    dateAdded: new Date("2023-11-04T15:40:00Z"),
    description:
      "Abstract wall mounted artwork with layered silhouettes that cast shifting shadows as daylight moves.",
    image: "/img/models/35.avif",
    name: "Wall Sculpture",
    slug: slugify("Wall Sculpture", MODEL_SLUGIFY_OPTIONS),
  },
  {
    categorySlug: "tools",
    dateAdded: new Date("2024-01-17T10:05:00Z"),
    description:
      "Precise measurement device with marked increments, a sliding stop, and a belt-clip case for consistent shop and print-tolerance checks.",
    image: "/img/models/36.avif",
    name: "Measuring Tool",
    slug: slugify("Measuring Tool", MODEL_SLUGIFY_OPTIONS),
  },
  {
    categorySlug: "miniatures",
    dateAdded: new Date("2024-03-30T13:30:00Z"),
    description: "Detailed tree for miniature landscapes",
    image: "/img/models/37.avif",
    name: "Fantasy Tree",
    slug: slugify("Fantasy Tree", MODEL_SLUGIFY_OPTIONS),
  },
  {
    categorySlug: "fashion",
    dateAdded: new Date("2024-06-12T08:55:00Z"),
    description:
      "Customizable ring designs in several band widths, with optional gem seats for resin or cabochon inserts.",
    image: "/img/models/38.avif",
    name: "Ring Collection",
    slug: slugify("Ring Collection", MODEL_SLUGIFY_OPTIONS),
  },
  {
    categorySlug: "3d-printer",
    dateAdded: new Date("2024-08-25T12:20:00Z"),
    description:
      "Optimized cooling fan design for quieter airflow over heat breaks, with adapters for common 40 mm and 5015 mounts without reprinting the duct.",
    image: "/img/models/39.avif",
    name: "Print Fan",
    slug: slugify("Print Fan", MODEL_SLUGIFY_OPTIONS),
  },
  {
    categorySlug: "hobby-diy",
    dateAdded: new Date("2024-11-08T17:45:00Z"),
    description: "Wall-mounted tool organization system",
    image: "/img/models/40.avif",
    name: "Tool Rack",
    slug: slugify("Tool Rack", MODEL_SLUGIFY_OPTIONS),
  },
  {
    categorySlug: "toys-games",
    dateAdded: new Date("2023-02-01T14:35:00Z"),
    description:
      "Poseable character figure with ball joints at major limbs and a sturdy stand peg for display between play sessions.",
    image: "/img/models/41.avif",
    name: "Action Figure",
    slug: slugify("Action Figure", MODEL_SLUGIFY_OPTIONS),
  },
  {
    categorySlug: "household",
    dateAdded: new Date("2023-04-14T11:00:00Z"),
    description:
      "Desk cable organization solution that routes power and USB under the surface, with magnetic latches and labeled channels for tidy growth.",
    image: "/img/models/42.avif",
    name: "Cable Manager",
    slug: slugify("Cable Manager", MODEL_SLUGIFY_OPTIONS),
  },
  {
    categorySlug: "props-cosplay",
    dateAdded: new Date("2023-07-27T16:25:00Z"),
    description: "Fantasy shield for costumes",
    image: "/img/models/43.avif",
    name: "Prop Shield",
    slug: slugify("Prop Shield", MODEL_SLUGIFY_OPTIONS),
  },
  {
    categorySlug: "education",
    dateAdded: new Date("2023-10-10T09:50:00Z"),
    description:
      "Detailed biological cell model with removable organelles labeled for quiz-style classroom activities.",
    image: "/img/models/44.avif",
    name: "Cell Model",
    slug: slugify("Cell Model", MODEL_SLUGIFY_OPTIONS),
  },
  {
    categorySlug: "art",
    dateAdded: new Date("2023-12-23T15:15:00Z"),
    description:
      "Decorative lamp with a translucent shade that softens LED glare, a weighted base, and cable pass-throughs for a finished nightstand look.",
    image: "/img/models/45.avif",
    name: "Art Lamp",
    slug: slugify("Art Lamp", MODEL_SLUGIFY_OPTIONS),
  },
  {
    categorySlug: "tools",
    dateAdded: new Date("2024-03-07T10:40:00Z"),
    description: "Fine detail work tool",
    image: "/img/models/46.avif",
    name: "Precision Tool",
    slug: slugify("Precision Tool", MODEL_SLUGIFY_OPTIONS),
  },
  {
    categorySlug: "miniatures",
    dateAdded: new Date("2024-05-20T14:05:00Z"),
    description:
      "Detailed landscape for gaming with cliffs, a stream bed, and flat areas sized for standard miniature bases.",
    image: "/img/models/47.avif",
    name: "Terrain Piece",
    slug: slugify("Terrain Piece", MODEL_SLUGIFY_OPTIONS),
  },
  {
    categorySlug: "fashion",
    dateAdded: new Date("2024-07-03T08:30:00Z"),
    description:
      "Modern accessory design that works as a clip, brooch, or bag charm; print-friendly face with reinforced bosses so daily wear does not crack thin walls.",
    image: "/img/models/48.avif",
    name: "Fashion Accessory",
    slug: slugify("Fashion Accessory", MODEL_SLUGIFY_OPTIONS),
  },
  {
    categorySlug: "3d-printer",
    dateAdded: new Date("2024-09-16T12:55:00Z"),
    description: "Stabilizing platform for 3D printers",
    image: "/img/models/49.avif",
    name: "Printer Stand",
    slug: slugify("Printer Stand", MODEL_SLUGIFY_OPTIONS),
  },
  {
    categorySlug: "hobby-diy",
    dateAdded: new Date("2024-11-29T17:20:00Z"),
    description:
      "Modular garden planter system with interlocking corners and optional trellis posts for climbing herbs.",
    image: "/img/models/50.avif",
    name: "Planter Box",
    slug: slugify("Planter Box", MODEL_SLUGIFY_OPTIONS),
  },
  {
    categorySlug: "toys-games",
    dateAdded: new Date("2023-01-15T14:45:00Z"),
    description:
      "Compatible construction toy set with studs that mate to common brick systems, plus hinge and wheel plates for mixing with existing bins.",
    image: "/img/models/51.avif",
    name: "Building Blocks",
    slug: slugify("Building Blocks", MODEL_SLUGIFY_OPTIONS),
  },
  {
    categorySlug: "household",
    dateAdded: new Date("2023-03-28T11:10:00Z"),
    description: "Customizable shelving solution",
    image: "/img/models/52.avif",
    name: "Shelf System",
    slug: slugify("Shelf System", MODEL_SLUGIFY_OPTIONS),
  },
];
