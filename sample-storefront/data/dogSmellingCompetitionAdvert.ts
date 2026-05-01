/**
 * Primary introductory copy for the Dog Smelling Competition event page (ticket #15).
 * Safe to lift into a CMS or marketing email; keep anchor IDs on `/events` in sync if `ctaHref` changes.
 */
export const dogSmellingCompetitionAdvert = {
  /** Display title — matches the event page H1. */
  title: "Dog Smelling Competition",
  /** Short intro paragraphs for the hero / advert block. */
  paragraphs: [
    "Think wine tasting, but fluffier. Duck Island invites you to Wellington’s friendliest nose‑first showdown: real dogs, mystery scents, and humans trying to guess who’s who without peeking.",
    "Whether you’re in it for the silliness, the scoops, or just cheering from the sidelines, it’s a weekend of laughs—and yes, there will be ice cream.",
  ],
  callToAction: {
    label: "See dates & how to take part",
    /** In-page anchor on `/events` — update if section IDs move. */
    href: "#event-dates-heading",
  },
} as const;
