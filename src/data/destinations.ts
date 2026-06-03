export interface Excursion {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
  image: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  accommodation: string;
  meals: string;
}

export interface Destination {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  shortDescription: string;
  longDescription: string;
  region: 'Europe' | 'Asia' | 'Americas' | 'Polar' | 'Africa';
  style: 'Adventure' | 'Wellness' | 'Heritage' | 'Luxury Cruise' | 'Island Retreat';
  basePrice: number;
  durationDays: number;
  rating: number;
  reviewCount: number;
  featuredImage: string;
  galleryImages: string[];
  coordinates: {
    lat: number;
    lng: number;
    label: string;
  };
  itinerary: ItineraryDay[];
  excursions: Excursion[];
}

export const destinationsData: Destination[] = [
  {
    id: "dest-1",
    slug: "maldives-water-villas",
    title: "Amilla Fushi Maldives Overwater Retreat",
    tagline: "Ultra-Luxury Island Sanctuary & Private Coral Lagoon",
    shortDescription: "Immerse yourself in a floating glass-walled villa over the turquoise Maldivian waters, featuring private reef dives, personal butler service, and sunset yachting.",
    longDescription: "Escape to Amilla Fushi in the Baa Atoll UNESCO Biosphere Reserve. This curated experience offers the pinnacle of tropical seclusion. Stay in architectural overwater villas with private infinity pools, access deep marine reefs directly from your deck, and savor bespoke fine dining created by Michelin-starred chefs under the canopy of stars.",
    region: "Asia",
    style: "Island Retreat",
    basePrice: 8400,
    durationDays: 7,
    rating: 4.95,
    reviewCount: 148,
    featuredImage: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&q=80&w=1200",
    galleryImages: [
      "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800"
    ],
    coordinates: {
      lat: 5.25,
      lng: 73.15,
      label: "Baa Atoll, Maldives"
    },
    itinerary: [
      {
        day: 1,
        title: "Sea Arrival & Sunset Canopy Dinner",
        description: "Arrive via a scenic private seaplane charter over the coral rings. Settle into your overwater villa and meet your dedicated butler. Conclude the evening with an open-air canopy dinner.",
        accommodation: "Ocean Lagoon Pool Villa",
        meals: "Dinner"
      },
      {
        day: 2,
        title: "Private Reef Safari & Coral Planting",
        description: "Embark on a guided marine biological tour of the house reef. Swim alongside manta rays and green turtles, and take part in Amilla's signature coral propagation program.",
        accommodation: "Ocean Lagoon Pool Villa",
        meals: "Breakfast, Lunch, Dinner"
      },
      {
        day: 3,
        title: "Dolphin Yachting & Sandbank Picnic",
        description: "Board a custom 60-foot luxury yacht for a dolphin-watching safari. Drop anchor at a completely secluded private sandbank for a premium seafood champagne barbecue prepared on-site.",
        accommodation: "Ocean Lagoon Pool Villa",
        meals: "Breakfast, Lunch"
      },
      {
        day: 4,
        title: "Holistic Wellness Day & Sound Bath",
        description: "Indulge in a 90-minute personalized Ayurvedic massage at the Javvu Spa. In the evening, join a sunset guided Tibetan singing bowl sound meditation on the yoga jetty.",
        accommodation: "Ocean Lagoon Pool Villa",
        meals: "Breakfast, Dinner"
      },
      {
        day: 5,
        title: "Overwater Cinema & Gastronomy Pairing",
        description: "Learn traditional Maldivian fishing methods or join a private sushi masterclass. As night falls, watch an editorial cinematic showing on a private screen floating above the lagoon.",
        accommodation: "Ocean Lagoon Pool Villa",
        meals: "Breakfast, Lunch, Dinner"
      },
      {
        day: 6,
        title: "Hanifaru Bay Deep Exploration",
        description: "Take a speed-boat to Hanifaru Bay (seasonal) for a world-renowned snorkeling adventure with dozens of whale sharks and giant manta rays feeding in the plankton-rich waters.",
        accommodation: "Ocean Lagoon Pool Villa",
        meals: "Breakfast, Lunch, Dinner"
      },
      {
        day: 7,
        title: "Farewell Seaplane Departure",
        description: "Enjoy a final sunrise yoga session and breakfast over the water. Bid farewell to your island hosts before boarding the private seaplane transfer to Malé.",
        accommodation: "N/A",
        meals: "Breakfast"
      }
    ],
    excursions: [
      {
        id: "ex-1-1",
        name: "Private Yacht Sunset Cruise",
        price: 1800,
        duration: "3 Hours",
        description: "Champagne, private sommelier, and fresh caviar onboard our signature yacht.",
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=600"
      },
      {
        id: "ex-1-2",
        name: "Hanifaru Bay Manta Dive",
        price: 650,
        duration: "4 Hours",
        description: "PADI guided diving session with giant mantas in a world-famous reserve.",
        image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=600"
      },
      {
        id: "ex-1-3",
        name: "Bespoke Sandbank Dining",
        price: 1200,
        duration: "4 Hours",
        description: "Entirely private sandbank setup with a personal chef and live acoustic music.",
        image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&q=80&w=600"
      }
    ]
  },
  {
    id: "dest-2",
    slug: "swiss-alps-chalet",
    title: "The Zermatt Alpine Peak Chalet",
    tagline: "Exclusive Mountain Peak Lodge with Matterhorn Vistas",
    shortDescription: "A private ski-in, ski-out timber chalet in Zermatt, showcasing high-altitude infinity pools, private glacier heli-tours, and fireside wine tastings.",
    longDescription: "Nestled at the base of the majestic Matterhorn, this luxury chalet is the epitome of high-alpine sophistication. Features include floor-to-ceiling glass panoramic windows, a dedicated mountain guide, spa wellness pods with outdoor cedar saunas, and direct ski-in/ski-out privileges to legendary pistes.",
    region: "Europe",
    style: "Adventure",
    basePrice: 9800,
    durationDays: 6,
    rating: 4.98,
    reviewCount: 92,
    featuredImage: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&q=80&w=1200",
    galleryImages: [
      "https://images.unsplash.com/photo-1482862549707-f63cb32c5fd9?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800"
    ],
    coordinates: {
      lat: 46.02,
      lng: 7.75,
      label: "Zermatt, Switzerland"
    },
    itinerary: [
      {
        day: 1,
        title: "Alpine Arrival & Fireside Welcome",
        description: "Ascend via first-class Glacier Express lounge or private heli-transfer. Settle into the chalet with champagne, canapés, and a personal mountain host briefing.",
        accommodation: "Matterhorn Peak Royal Suite",
        meals: "Dinner"
      },
      {
        day: 2,
        title: "First Piste Skiing & Gourmet Lunch",
        description: "Gear up with premium ski fittings. Enjoy early morning lift access with your private guide. Break for a mountainside gourmet lunch at a Michelin-rated alpine hut.",
        accommodation: "Matterhorn Peak Royal Suite",
        meals: "Breakfast, Lunch, Dinner"
      },
      {
        day: 3,
        title: "Heli-Skiing Glacier Charter",
        description: "Board a private helicopter to the pristine Monte Rosa glacier. Experience breathtaking backcountry skiing on untouched powder tracks, guided by Piste Security experts.",
        accommodation: "Matterhorn Peak Royal Suite",
        meals: "Breakfast, Lunch"
      },
      {
        day: 4,
        title: "Wellness Peak & Geothermal Spas",
        description: "Rest your muscles with a full day of wellness. Access our outdoor heated thermal pools, steam vaults, and cold plunges facing the direct face of the Matterhorn.",
        accommodation: "Matterhorn Peak Royal Suite",
        meals: "Breakfast, Dinner"
      },
      {
        day: 5,
        title: "Valais Wine Cellar Masterclass",
        description: "Discover Swiss oenology with our resident sommelier in the private cellar. Taste rare vintages alongside hand-crafted artisanal local cheeses and charcuterie.",
        accommodation: "Matterhorn Peak Royal Suite",
        meals: "Breakfast, Lunch, Dinner"
      },
      {
        day: 6,
        title: "Farewell Peak Descent",
        description: "Take a final run down the iconic Sunnegga run. Transfer back via executive shuttle, carrying memories of high alpine peaks and fireside luxury.",
        accommodation: "N/A",
        meals: "Breakfast"
      }
    ],
    excursions: [
      {
        id: "ex-2-1",
        name: "Private Heli-Glacier Skiing",
        price: 2400,
        duration: "5 Hours",
        description: "Helicopter drop-off at Monte Rosa with premium backcountry guidance and videography.",
        image: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&q=80&w=600"
      },
      {
        id: "ex-2-2",
        name: "Matterhorn Summit Flyover",
        price: 850,
        duration: "1.5 Hours",
        description: "Private scenic helicopter tour orbiting the majestic peak of the Matterhorn.",
        image: "https://images.unsplash.com/photo-1482862549707-f63cb32c5fd9?auto=format&fit=crop&q=80&w=600"
      },
      {
        id: "ex-2-3",
        name: "Vintage Valais Cellar Private Dinner",
        price: 950,
        duration: "3 Hours",
        description: "A 7-course pairing menu prepared by our private chalet chef in a stone cellar.",
        image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=600"
      }
    ]
  },
  {
    id: "dest-3",
    slug: "patagonia-glacier-domes",
    title: "Torres del Paine Glacier Domes",
    tagline: "Eco-Architectural Sanctuary in Torres del Paine",
    shortDescription: "Witness the rugged wild of Patagonia from the comfort of geodesic glass-dome suites, featuring private trekking, glacier navigation, and stellar views.",
    longDescription: "Set in the pristine landscapes of Chilean Patagonia, our Eco-Luxe Domes combine sustainability with supreme luxury. Look out over turquoise lakes and monolithic granite peaks, go on personalized treks along the French Valley, and view stellar, unpolluted night skies through transparent double-glazed dome ceilings.",
    region: "Americas",
    style: "Adventure",
    basePrice: 7200,
    durationDays: 5,
    rating: 4.92,
    reviewCount: 78,
    featuredImage: "https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&q=80&w=1200",
    galleryImages: [
      "https://images.unsplash.com/photo-1473163928189-364b2c4e1135?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800"
    ],
    coordinates: {
      lat: -51.0,
      lng: -73.0,
      label: "Torres del Paine, Chile"
    },
    itinerary: [
      {
        day: 1,
        title: "Wild Arrival & Dome Unveiling",
        description: "Arrive via first-class transfer from Puerto Natales. Check in to your geodesic glass-ceiling dome. Gather in the central lodge for custom craft cocktails and a traditional Magellanic feast.",
        accommodation: "Master Geodesic Dome Suite",
        meals: "Dinner"
      },
      {
        day: 2,
        title: "Glacier Grey Yacht Navigation",
        description: "Board a private catamaran to navigate Lake Grey. Approach the blue walls of Glacier Grey, witnessing icebergs calving into the lake. Enjoy a whisky chilled with ancient glacier ice.",
        accommodation: "Master Geodesic Dome Suite",
        meals: "Breakfast, Lunch, Dinner"
      },
      {
        day: 3,
        title: "French Valley Expedition",
        description: "Embark on a private, guided trek into the heart of the Paine massif. Traverse ancient beech forests and suspension bridges, culminating in breathtaking vistas of hanging glaciers.",
        accommodation: "Master Geodesic Dome Suite",
        meals: "Breakfast, Lunch, Dinner"
      },
      {
        day: 4,
        title: "Estancia Ranch & Patagonia Horseback",
        description: "Visit a historic, working Patagonian estancia. Ride premium Criollo horses alongside authentic baqueanos (local cowboys) through golden pampa grasslands.",
        accommodation: "Master Geodesic Dome Suite",
        meals: "Breakfast, Lunch, Dinner"
      },
      {
        day: 5,
        title: "Sunrise Peaks & Departure",
        description: "Witness the iconic horns of Torres del Paine glow pink in the first morning light. Enjoy an organic breakfast before your departure shuttle to Punta Arenas.",
        accommodation: "N/A",
        meals: "Breakfast"
      }
    ],
    excursions: [
      {
        id: "ex-3-1",
        name: "Private Grey Glacier Ice Hike",
        price: 750,
        duration: "6 Hours",
        description: "Equip crampons and follow expert mountaineers to trek directly on the crevasses of Grey Glacier.",
        image: "https://images.unsplash.com/photo-1473163928189-364b2c4e1135?auto=format&fit=crop&q=80&w=600"
      },
      {
        id: "ex-3-2",
        name: "French Valley Heli-Charter",
        price: 1950,
        duration: "2 Hours",
        description: "Soar above the jagged granite needles of the Paine Massif on an exclusive helicopter tour.",
        image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=600"
      },
      {
        id: "ex-3-3",
        name: "Premium Chilean Wine & Roast Feast",
        price: 450,
        duration: "3 Hours",
        description: "Traditional spit-roasted lamb paired with ultra-premium Chilean Cabernet and Carmenere.",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600"
      }
    ]
  },
  {
    id: "dest-4",
    slug: "kyoto-heritage-ryokan",
    title: "Kyoto Heritage Sanctuary & Gardens",
    tagline: "Exclusive Imperial Villa & Zen Forest Hideaway",
    shortDescription: "Step back in time at a boutique historic ryokan. Indulge in private tea ceremonies, bamboo forest forest bathing, and kaiseki multi-course masterpieces.",
    longDescription: "Located deep in the maple-wood hills of Arashiyama, this heritage villa provides a window into ancient Japanese refinement. Stay in restored traditional suites featuring cypress onsen baths, private zen moss gardens, and dedicated tatami lounge dining where ancient heritage is brought to life.",
    region: "Asia",
    style: "Heritage",
    basePrice: 6800,
    durationDays: 5,
    rating: 4.97,
    reviewCount: 112,
    featuredImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=1200",
    galleryImages: [
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format&fit=crop&q=80&w=800"
    ],
    coordinates: {
      lat: 35.01,
      lng: 135.67,
      label: "Kyoto, Japan"
    },
    itinerary: [
      {
        day: 1,
        title: "Imperial Welcome & Cypress Bathing",
        description: "Arrive via executive transport from Osaka Kansai Airport. Settle into your sliding-screen garden suite. Soak in a private hinoki (cypress) wood tub filled with natural hot-spring water.",
        accommodation: "Zen Moss Garden Villa",
        meals: "Dinner"
      },
      {
        day: 2,
        title: "Exclusive Bamboo Forest Bathing",
        description: "Access the Arashiyama bamboo groves before general admission. Participate in a guided forest bathing and breathing session, and receive private access to Tenryu-ji temple.",
        accommodation: "Zen Moss Garden Villa",
        meals: "Breakfast, Lunch, Dinner"
      },
      {
        day: 3,
        title: "Private Tea Masterclass & Calligraphy",
        description: "Join a 15th-generation Zen master for a tea ceremony in an 400-year-old teahouse. In the afternoon, practice ink wash calligraphy with a certified classical artist.",
        accommodation: "Zen Moss Garden Villa",
        meals: "Breakfast, Lunch"
      },
      {
        day: 4,
        title: "9-Course Imperial Kaiseki Banquet",
        description: "Spend the day visiting hidden mountain shrines. Return to savor an exquisite, seasonally curated 9-course Kaiseki banquet served by your personal nakai (dedicated attendant).",
        accommodation: "Zen Moss Garden Villa",
        meals: "Breakfast, Dinner"
      },
      {
        day: 5,
        title: "Morning Gamelan & Departure",
        description: "Listen to the morning temple bells and join a private zen meditation. Enjoy a fresh, seasonal breakfast before transfer to the Kyoto Shinkansen bullet train station.",
        accommodation: "N/A",
        meals: "Breakfast"
      }
    ],
    excursions: [
      {
        id: "ex-4-1",
        name: "Private Geisha Kaiseki & Dance",
        price: 1500,
        duration: "4 Hours",
        description: "An exclusive evening of historic dining and authentic geisha dance in a Gion tea house.",
        image: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format&fit=crop&q=80&w=600"
      },
      {
        id: "ex-4-2",
        name: "Hidden Shrines Helicopter Flight",
        price: 1100,
        duration: "1 Hour",
        description: "Scenic helicopter tour of the mountains surrounding Kyoto and ancient temple complex.",
        image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=600"
      },
      {
        id: "ex-4-3",
        name: "Bespoke Kimono Studio & Portraiture",
        price: 600,
        duration: "3 Hours",
        description: "Silk kimono dressing by a master artisan, followed by a private photo shoot in a moss garden.",
        image: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80&w=600"
      }
    ]
  }
];
