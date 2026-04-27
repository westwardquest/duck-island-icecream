import type { OfficialFlavour } from "./officialFlavours";

type Translation = {
  name: string;
  description: string;
};

const esByEnglishName: Record<string, Translation> = {
  "Pecan Butterscotch": {
    name: "Nuez pecana y butterscotch",
    description:
      "Helado de azucar morena con maple, con cintas de salsa butterscotch y trozos de nuez pecana tostada con mantequilla y sal.",
  },
  "Coffee Chocolate Rubble": {
    name: "Cafe con escombros de chocolate",
    description:
      "Helado intenso de cafe con remolinos de chocolate cremoso y migas de galleta de chocolate amargo.",
  },
  "Peanut Butter Cookie Dough": {
    name: "Masa de galleta con mantequilla de mani",
    description:
      "Base vegana de coco y azucar morena con trozos de masa de galleta con mantequilla de mani y remolinos de ganache de chocolate.",
  },
  "Pistachio Honey": {
    name: "Pistacho con miel",
    description:
      "Helado de crema dulce con ganache de pistacho con miel y pistachos pralinados.",
  },
  "Apple Pie & Custard": {
    name: "Tarta de manzana y crema",
    description:
      "Helado de crema pastelera aterciopelada con migas de base de tarta de mantequilla tostada y compota de manzana acida.",
  },
  "Vanilla Bean": {
    name: "Vainilla natural",
    description: "Helado cremoso de vainilla con semillas reales de vainilla.",
  },
  "Boysenberry Cheesecake": {
    name: "Cheesecake de boysenberry",
    description:
      "Helado de cheesecake con aroma de limon, remolinos de mermelada de boysenberry y migas de galleta de mantequilla.",
  },
  "Salted Chocolate Brownie": {
    name: "Brownie salado de chocolate",
    description:
      "Version vegana de chocolate con coco, chispas de chocolate amargo y trozos de brownie salado sin gluten.",
  },
  "Coconut Caramel Sesame Chocolate Peanuts": {
    name: "Coco caramelo sesamo chocolate y mani",
    description:
      "Helado de caramelo con leche de coco, trozos de chocolate negro, mani tostado y praline de sesamo.",
  },
  "Milk Chocolate Fudge": {
    name: "Fudge de chocolate con leche",
    description:
      "Helado de chocolate con leche super cremoso con salsa fudge y chispas de chocolate que se derriten en la boca.",
  },
  "White Chocolate Pomegranate Macadamia": {
    name: "Chocolate blanco, granada y macadamia",
    description:
      "Base de chocolate blanco con remolinos de mermelada de granada y trozos tostados de chocolate blanco y macadamia.",
  },
  "Mango Passionfruit Sorbet": {
    name: "Sorbete de mango y maracuya",
    description: "Sorbete vivo y citrico elaborado con mango y maracuya reales.",
  },
  "Cookies & Cream": {
    name: "Galletas con crema",
    description:
      "Nuestra version clasica: galletas de cacao negro hechas en casa mezcladas en helado cremoso de vainilla.",
  },
  "Coconut Chocolate": {
    name: "Chocolate con coco",
    description:
      "Helado vegano de chocolate negro intenso con leche de coco y chocolate Dark Ghana de Whittaker's.",
  },
  Ambrosia: {
    name: "Ambrosia",
    description:
      "Helado de yogur de frambuesa acida con mini malvaviscos, laminas de chocolate con leche y remolinos de cereza acida.",
  },
  "Peppermint Slice": {
    name: "Slice de menta",
    description:
      "Helado cremoso sabor menta con remolinos de salsa fudge de chocolate.",
  },
  "Salted Caramel Cacao Crumb": {
    name: "Caramelo salado con migas de cacao",
    description:
      "Helado de caramelo salado hecho en lotes pequenos con leche, crema, sal marina y crujientes migas de cacao.",
  },
  "Chocolate Chip Cookie Dough": {
    name: "Masa de galleta con chips de chocolate",
    description:
      "Helado de vainilla con motas de chocolate con leche y trozos de masa de galleta con chips hecha en casa.",
  },
  "Strawberry Coconut Lime Leaf": {
    name: "Fresa, coco y hoja de lima",
    description:
      "Helado vegano sin lacteos con fresas de Nueva Zelanda, leche de coco y hojas aromaticas de lima makrut.",
  },
  "Toasted Marshmallow": {
    name: "Malvavisco tostado",
    description:
      "Helado suave y ahumado inspirado en malvaviscos tostados al fuego de campamento.",
  },
  "Blueberry Buttermilk Gooey Butter Cake": {
    name: "Arandano, suero y butter cake",
    description:
      "Helado de suero acido con remolinos de mermelada de arandano y trozos de pastel mantecoso de limon.",
  },
  "Fairy Bread": {
    name: "Pan de hadas",
    description:
      "Helado cremoso con toque de brioche tostado y granas de colores por todas partes.",
  },
  "Mint Chip": {
    name: "Menta con chips",
    description:
      "Helado fresco de menta con base de anacardo, coco y leche de soya, cargado con trozos crujientes de chocolate amargo.",
  },
  "Blueberry Cornmeal Pie": {
    name: "Tarta de arandano y harina de maiz",
    description:
      "Migas doradas de base de tarta de harina de maiz y arandanos confitados en helado acido dulce de arandano.",
  },
  "Matcha Strawberry Milk Crumb": {
    name: "Matcha con migas de leche de fresa",
    description:
      "Base de crema dulce con matcha premium y migas crocantes de leche de fresa.",
  },
};

export function localizeFlavoursEs(flavours: OfficialFlavour[]): OfficialFlavour[] {
  return flavours.map((flavour) => {
    const translated = esByEnglishName[flavour.name];
    if (!translated) {
      return flavour;
    }
    return {
      ...flavour,
      name: translated.name,
      description: translated.description,
    };
  });
}

