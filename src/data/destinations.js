// Destination data — passed from App down through DestinationGrid to
// DestinationCard (props drilling on purpose, per the assignment brief).
const destinations = [
  {
    id: 'faroe',
    name: 'Faroe Islands',
    country: 'Denmark',
    coords: '62.0°N, 6.8°W',
    blurb: 'Turf-roofed villages strung along sea cliffs, reachable only by single-lane tunnels and short ferry hops.',
    days: 8,
    price: 2140,
    image: 'https://images.unsplash.com/photo-1601439678777-b2b3c56fa71b?q=80&w=1200&auto=format&fit=crop',
    overview:
      "The Faroes route stays close to the water the entire way — cliff-top paths between eighteen islands, none of them more than an hour's ferry from the next. Weather changes fast here, so days are built with slack in them rather than a fixed schedule.",
    highlights: [
      'Sea-cliff traverse above the bird colonies at Vestmanna',
      'Overnight in a family-run guesthouse on Kalsoy',
      'A rest day built around the tunnel-and-ferry hop to Mykines',
    ],
  },
  {
    id: 'ladakh',
    name: 'Ladakh',
    country: 'India',
    coords: '34.2°N, 77.6°E',
    blurb: 'High-desert monasteries and switchback passes above 5,000m, walked over eleven slow acclimatizing days.',
    days: 11,
    price: 1890,
    image: 'https://images.unsplash.com/photo-1626621341517-bbc3ba634e83?q=80&w=1200&auto=format&fit=crop',
    overview:
      "Eleven days is a deliberate choice, not a padded itinerary — Ladakh sits above 3,500m almost everywhere, and altitude sets the pace, not ambition. Expect long views over short distances, and monasteries older than most European cathedrals.",
    highlights: [
      'Two full acclimatization days before any pass above 5,000m',
      'A night at a working monastery in the Nubra valley',
      'The Khardung La crossing, weather permitting',
    ],
  },
  {
    id: 'atacama',
    name: 'Atacama Desert',
    country: 'Chile',
    coords: '23.6°S, 68.3°W',
    blurb: 'Salt flats, geysers, and the driest air on earth — routes built around the region\'s dark, unpolluted skies.',
    days: 6,
    price: 1650,
    image: 'https://images.unsplash.com/photo-1531065208531-4036c0dba3ca?q=80&w=1200&auto=format&fit=crop',
    overview:
      "The shortest route we run, and the one built entirely around timing — geyser fields at sunrise, salt flats at midday, and the clearest night skies on the continent once the sun drops. Nights are cold; days are not.",
    highlights: [
      'Sunrise at the El Tatio geyser field, before the crowds',
      'A guided night-sky session with a local astronomer',
      'Salt-flat flamingo lagoons at Laguna Chaxa',
    ],
  },
  {
    id: 'svaneti',
    name: 'Svaneti',
    country: 'Georgia',
    coords: '43.0°N, 42.7°E',
    blurb: 'Medieval stone towers in the high Caucasus, connected by shepherd trails still used for summer grazing.',
    days: 9,
    price: 1780,
    image: 'https://images.unsplash.com/photo-1601918774946-25832a4be0d6?q=80&w=1200&auto=format&fit=crop',
    overview:
      "Svaneti's defensive towers are still standing because families still use them — this route threads working villages, not a museum reconstruction. Trails follow the same lines shepherds have walked between summer pastures for centuries.",
    highlights: [
      'A homestay in Ushguli, one of the highest inhabited villages in Europe',
      'The Chalaadi glacier approach on a clear-weather day',
      "A shepherd's-trail crossing between Mestia and Ushguli",
    ],
  },
  {
    id: 'kii',
    name: 'Kii Peninsula',
    country: 'Japan',
    coords: '33.7°N, 135.9°E',
    blurb: 'A 1,000-year-old pilgrimage route through cedar forest, hot-spring villages, and moss-covered shrines.',
    days: 7,
    price: 1990,
    image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=1200&auto=format&fit=crop',
    overview:
      "The Kumano Kodo has been walked as a pilgrimage since the 10th century, and the route still passes through the same shrine gates. Days end in onsen towns, which makes this one of the gentler routes we run despite its age and history.",
    highlights: [
      'The Kumano Hongu Taisha shrine approach through old-growth cedar',
      'A night soaking in the Yunomine onsen, one of Japan’s oldest hot springs',
      'A moss-covered stone stairway section, mostly untouched since it was laid',
    ],
  },
  {
    id: 'wrangel',
    name: 'Wrangell–St. Elias',
    country: 'Alaska, USA',
    coords: '61.7°N, 142.9°W',
    blurb: 'North America\'s largest national park — glacier valleys and abandoned copper-mining towns, off-grid.',
    days: 10,
    price: 2380,
    image: 'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?q=80&w=1200&auto=format&fit=crop',
    overview:
      "Wrangell–St. Elias is bigger than Switzerland and has almost no road access, so this route relies on a bush-plane drop-in and a walk-out. Expect real off-grid days — no cell signal, no resupply — through glacier valleys and the rusted-out remains of the Kennecott copper mine.",
    highlights: [
      'A bush-plane drop-in to the Goat Trail access point',
      'A full day exploring the abandoned Kennecott copper mill',
      'Glacier-valley camping with zero cell signal for four straight days',
    ],
  },
]

export default destinations
