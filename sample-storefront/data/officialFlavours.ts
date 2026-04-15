/**
 * Subset of flavours published on https://www.duckislandicecream.co.nz/flavours
 * (names, descriptions, and dietary tags as on the live site at time of import).
 */
export type OfficialFlavour = {
  name: string;
  description: string;
  /** Dietary labels from the public menu (e.g. GF, VEGAN). */
  tags?: string[];
};

export const officialFlavours: OfficialFlavour[] = [
  {
    name: "Pecan Butterscotch",
    tags: ["GF"],
    description:
      "This maple brown sugar ice cream, folded with ribbons of butterscotch sauce and bespeckled with salty butter-roasted pecans, can only be described as ducking delightful!",
  },
  {
    name: "Vanilla Bean",
    tags: ["GF"],
    description:
      "Creamy vanilla ice cream bursting with flavour and real vanilla seeds.",
  },
  {
    name: "Coffee Chocolate Rubble",
    description:
      "We've teamed up with coffee legends Supreme for the best coffee and chocolate matchup ever. Rich coffee ice cream is swirled with fudgy chocolate and finished with dark chocolate cookie crumbles. Perfect for when the craving hits — morning, noon or night.",
  },
  {
    name: "Strawberry Coconut Lime Leaf",
    tags: ["VEGAN", "GF"],
    description:
      "In this delightful dairy free, vegan ice cream we combine sweet, sun-ripened New Zealand strawberries with creamy coconut milk and fragrant makrut lime leaves to bring an exotic twist to a summertime kiwi favourite. Our take on a classic.",
  },
  {
    name: "Salted Caramel Cacao Crumb",
    tags: ["GF"],
    description:
      "Our salted caramel ice cream is hand made in small batches to ensure the perfect depth of golden caramel colour. Milk, cream, sea salt and a scattering of crunchy chocolate cacao crumbs make this ice cream the perfect balance of sweet and salty indulgence. Bliss.",
  },
  {
    name: "Toasted Marshmallow",
    description:
      "To settle the debate of just how toasted a marshmallow should be, the Duck Island chefs spent hours around the campfire, toasting marshmallows to perfection, to bring you this smoky, smooth ice cream that'll take you back to the campgrounds of your childhood.",
  },
];
