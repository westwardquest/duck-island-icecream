import type { OfficialFlavour } from "./officialFlavours";

/**
 * Scoop store special flavours from
 * https://www.duckislandicecream.co.nz/scoop-store-special-flavours
 * (static snapshot; availability varies by store and season).
 */
export const specialFlavours: OfficialFlavour[] = [
  {
    name: "Mint Chip",
    tags: ["VEGAN", "GF"],
    description:
      "Made from a blend of cashew, coconut and Bonsoy soy milk. This is a cool, minty ice cream packed with snappy dark chocolate shards. Fresh, nostalgic and so delish you won't be missing the dairy in this one.",
  },
  {
    name: "Blueberry Cornmeal Pie",
    description:
      "Golden cornmeal pie crust crumbs and jammy blueberries swirled through sweet tart blueberry ice cream.",
  },
  {
    name: "Matcha Strawberry Milk Crumb",
    description:
      "Silky, full bodied premium Matcha powder is blended into our sweet cream base, studded with strawberry milk crumb for a crunchy pop of sweetness.",
  },
];
