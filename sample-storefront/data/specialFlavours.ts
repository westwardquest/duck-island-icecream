import type { OfficialFlavour } from "./officialFlavours";

/**
 * Scoop store special flavours from
 * https://www.duckislandicecream.co.nz/scoop-store-special-flavours
 * (static snapshot; availability varies by store and season).
 */
export const specialFlavours: OfficialFlavour[] = [
  {
    name: "Straight Lime Was A Lie",
    tags: ["VEGAN", "GF"],
    description:
      "A two-tone lime and vanilla milk ice cream swirled with crunchy vanilla milk crumb.",
  },
  {
    name: "Mint Chip",
    tags: ["VEGAN"],
    description:
      "Made from a blend of cashew, coconut and Bonsoy soy milk. This is a cool, minty ice cream packed with snappy dark chocolate shards. Fresh, nostalgic and so delish you won't be missing the dairy in this one.",
  },
  {
    name: "Blueberry Cornmeal Pie",
    tags: ["VEGAN", "GF"],
    description:
      "Golden cornmeal pie crust crumbs and jammy blueberries swirled through sweet tart blueberry ice cream.",
  },
  {
    name: "Raspberry Lychee Sorbet",
    description:
      "Tart raspberries and sweet lychees join forces for the perfect summer sorbet.",
  },
  {
    name: "Matcha Strawberry Milk Crumb",
    tags: ["GF"],
    description:
      "Silky, full bodied premium Matcha powder is blended into our sweet cream base, studded with strawberry milk crumb for a crunchy pop of sweetness.",
  },
  {
    name: "Orange Blossom Chocolate Chip",
    description:
      "Our take on a classic. Orange blossom and orange zest scented sweet cream with dark chocolate stracciatella throughout.",
  },
];
