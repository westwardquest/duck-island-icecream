import type { OfficialFlavour } from "./officialFlavours";

/**
 * Sample “specials” for the demo storefront — rotating / limited flavours
 * (not a live scrape; names are plausible stand-ins for a specials board).
 */
export const specialFlavours: OfficialFlavour[] = [
  {
    name: "Feijoa Swirl",
    tags: ["GF"],
    description:
      "When feijoas land, this pot goes fast — tart feijoa curd folded through vanilla bean ice cream.",
  },
  {
    name: "Hokey Pokey Crunch (batch run)",
    description:
      "Extra honeycomb rubble, extra crunch — a scoop-shop batch with more golden shards than our regular range.",
  },
  {
    name: "Black Doris Plum & Almond",
    tags: ["GF"],
    description:
      "Ripened Black Doris plums, roasted almond praline, and a ripple of plum caramel. Here until the fruit runs out.",
  },
  {
    name: "Lemon Meringue Pie",
    description:
      "Zesty lemon custard ice cream, pockets of torched meringue, and a shortbread crumble for that bakery finish.",
  },
];
