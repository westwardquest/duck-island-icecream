/**
 * Full “regular” range — names, descriptions, and dietary tags (static snapshot; not scraped at runtime).
 * Legacy public URL omitted from new-site and demo copy.
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
    name: "Coffee Chocolate Rubble",
    description:
      "We've teamed up with coffee legends Supreme for the best coffee and chocolate matchup ever. Rich coffee ice cream is swirled with fudgy chocolate and finished with dark chocolate cookie crumbles. Perfect for when the craving hits — morning, noon or night.",
  },
  {
    name: "Peanut Butter Cookie Dough",
    tags: ["VEGAN", "GF"],
    description:
      "We've skipped the oven completely and packed our brown sugar coconut ice cream base with peanut butter chocolate chip cookie dough chunks and dark chocolate ganache swirls. No one has to know you started making cookies at all.",
  },
  {
    name: "Pistachio Honey",
    tags: ["GF"],
    description:
      "Honeyed pistachio ganache and pralined pistachios folded through our sweet cream ice cream.",
  },
  {
    name: "Apple Pie & Custard",
    description:
      "Velvety custard ice cream, brown butter pie crust crumbs and a tart apple compote.",
  },
  {
    name: "Vanilla Bean",
    tags: ["GF"],
    description:
      "Creamy vanilla ice cream bursting with flavour and real vanilla seeds.",
  },
  {
    name: "Boysenberry Cheesecake",
    description:
      "What's that? There's a boysenberry cheesecake shaped ice cream hole in your life? Well, consider it filled with our lemon scented cheesecake ice cream containing only the best New Zealand cream cheese, swirled with tart boysenberry jam and finished with buttery biscuit crumbs.",
  },
  {
    name: "Salted Chocolate Brownie",
    tags: ["VEGAN", "GF"],
    description:
      "Here's our dairy free twist on the much loved classic, cookies and cream. You've got creamy chocolate coconut ice cream studded with melt-in-your mouth flecks of dark chocolate and oodles of gluten free, salted chocolate buckwheat brownie bits. No, you stop it.",
  },
  {
    name: "Coconut Caramel Sesame Chocolate Peanuts",
    tags: ["VEGAN", "GF"],
    description:
      "What to do when you want dairy free and caramel, plus chocolate and peanuts, but also sesame? No worries we've got you — a lightly salted caramel ice cream, made with coconut milk and packed full of tasty, textural goodness. It's loaded with shards of Whittaker's dark chocolate, roasted peanuts and toasted sesame praline.",
  },
  {
    name: "Milk Chocolate Fudge",
    tags: ["GF"],
    description:
      "The milkiest chocolate ice cream. The gooeyist chocolate fudge sauce. The most melt-in-your-mouth chocolate chips! It's fudged up and you're welcome.",
  },
  {
    name: "White Chocolate Pomegranate Macadamia",
    tags: ["GF"],
    description:
      "It starts with a creamy white chocolate ice cream base, then for a bit of romance we've swirled in tart pomegranate jam, and for those who desire some drama we've chucked in roasted pieces of white chocolate and macadamia.",
  },
  {
    name: "Mango Passionfruit Sorbet",
    tags: ["VEGAN", "GF"],
    description:
      "A bright and tangy sorbet made with real Passionfruit and mango, a favourite for all the family.",
  },
  {
    name: "Cookies & Cream",
    description:
      "Our take on the classic, house made bitter black cocoa cookies are smashed through creamy vanilla ice cream.",
  },
  {
    name: "Coconut Chocolate",
    tags: ["VEGAN", "GF"],
    description:
      "A chocolate lover's ice cream. This intensely rich, dark chocolate ice cream made with coconut milk and New Zealand's Whittaker's Dark Ghana chocolate has been a crowd favourite in our scoop shops since opening day.",
  },
  {
    name: "Ambrosia",
    tags: ["GF"],
    description:
      "We've churned Mum's classic into a flavour-packed ice cream. Tart raspberry yoghurt ice cream, teensy marshmallows, milk chocolate shards and sour cherry swirls.",
  },
  {
    name: "Peppermint Slice",
    description:
      "If Peppermint Patty and Charlie Brown fell in love it would result in this ice cream — a creamy peppermint slice-spiked delight, swirled with decadent chocolate fudge sauce.",
  },
  {
    name: "Salted Caramel Cacao Crumb",
    tags: ["GF"],
    description:
      "Our salted caramel ice cream is hand made in small batches to ensure the perfect depth of golden caramel colour. Milk, cream, sea salt and a scattering of crunchy chocolate cacao crumbs make this ice cream the perfect balance of sweet and salty indulgence. Bliss.",
  },
  {
    name: "Chocolate Chip Cookie Dough",
    tags: ["VEGAN", "GF"],
    description:
      "Vanilla ice cream, milk chocolate flecks and chunks of house made chocolate chip cookie dough.",
  },
  {
    name: "Strawberry Coconut Lime Leaf",
    tags: ["VEGAN", "GF"],
    description:
      "In this delightful dairy free, vegan ice cream we combine sweet, sun-ripened New Zealand strawberries with creamy coconut milk and fragrant makrut lime leaves to bring an exotic twist to a summertime kiwi favourite. Our take on a classic.",
  },
  {
    name: "Toasted Marshmallow",
    description:
      "To settle the debate of just how toasted a marshmallow should be, the Duck Island chefs spent hours around the campfire, toasting marshmallows to perfection, to bring you this smoky, smooth ice cream that'll take you back to the campgrounds of your childhood.",
  },
  {
    name: "Blueberry Buttermilk Gooey Butter Cake",
    description:
      "Tart buttermilk ice cream swirled with fragrant blueberry jam and moreish pieces of lemony gooey butter cake. Yum!",
  },
  {
    name: "Fairy Bread",
    description:
      "Our Fairy Bread ice cream is smooth and creamy with a hint of buttery toasted brioche and is strewn with hundreds and thousands… it's legit fairy magic and it's not just for little kids.",
  },
];
