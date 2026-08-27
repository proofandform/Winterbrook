/**
 * Winterbrook content layer.
 *
 * All copy, media mappings, and coordinates in this file were crawled from
 * https://www.winterbrook.ie/ (July 2026). The shapes mirror what a headless
 * CMS (Sanity/Contentful) would return, so swapping this module for live CMS
 * queries later means changing only the data source, not the components.
 *
 * `kind` distinguishes CGI renders from real photography so the UI can label
 * them honestly.
 */

export type MediaKind = "photo" | "cgi";

export interface GalleryImage {
  src: string; // filename inside /public/images
  alt: string;
  kind: MediaKind;
}

export type DevelopmentStatus = "available" | "coming-soon" | "past";
export type HomeType = "house" | "apartment" | "duplex";

export interface Development {
  slug: string;
  name: string;
  location: string;
  county: string;
  status: DevelopmentStatus;
  homeTypes: HomeType[];
  typeLabel: string;
  excerpt: string;
  overview: string[];
  specs: { label: string; value: string }[];
  lat: number;
  lng: number;
  hero: GalleryImage;
  gallery: GalleryImage[];
  agent?: string;
  website?: string;
  /**
   * Approved Daft.ie listing URL for this development. Optional and unset by
   * default — populate ONLY with a client-supplied URL. When present, the
   * same value drives the card CTA, the detail-page CTA and the contact-form
   * contextual CTA; when absent, no Daft UI renders anywhere.
   */
  daftUrl?: string;
}

export const developments: Development[] = [
  {
    slug: "the-poplars-shankill-co-dublin",
    name: "The Poplars",
    location: "Shankill, Co. Dublin",
    county: "Dublin",
    status: "available",
    homeTypes: ["house", "duplex", "apartment"],
    typeLabel: "Houses, apartments & duplexes",
    excerpt:
      "A stylish A-rated development beside Shankill Village on Quinn’s Road, comprising houses, duplexes, and 1- and 2-bedroom apartments.",
    overview: [
      "A beautiful collection of contemporary, A-rated new homes set beside Shankill Village on Quinn’s Road. The scheme offers a variety of 3-bedroom houses and duplexes, along with 1- and 2-bedroom apartments to suit a range of lifestyles.",
      "Thoughtfully designed and carefully planned, The Poplars will offer contemporary homes that combine architectural excellence, sustainability, and long-term liveability. Ideally situated within easy reach of Shankill village, residents will also benefit from excellent transport links to Dublin city centre and beyond.",
    ],
    specs: [
      { label: "Homes", value: "25 new homes" },
      { label: "Mix", value: "3-bed houses & duplexes, 1 & 2-bed apartments" },
      { label: "Energy", value: "A-rated (BER)" },
      { label: "Setting", value: "Beside Shankill Village, Quinn’s Road" },
      { label: "Launch", value: "Summer 2026" },
    ],
    lat: 53.2298168,
    lng: -6.1222667,
    hero: {
      src: "26027_thepoplars_cgi-1_reve_lowres.jpg",
      alt: "CGI of contemporary houses at The Poplars, Shankill",
      kind: "cgi",
    },
    gallery: [
      { src: "26027_thepoplars_cgi-1_reve_lowres.jpg", alt: "CGI street view of new homes at The Poplars", kind: "cgi" },
      { src: "26027_thepoplars_aerial-1_proposed_revb.jpg", alt: "Proposed aerial CGI of The Poplars beside Shankill Village", kind: "cgi" },
    ],
    agent: "Hooke & MacDonald",
    website: "https://www.thepoplars.ie",
    daftUrl: "https://www.daft.ie/new-home-for-sale/the-poplars-shankill-dublin-18-dub/6571564",
  },
  {
    slug: "pinehurst-enniskerry-co-wicklow",
    name: "Pinehurst",
    location: "Enniskerry, Co. Wicklow",
    county: "Wicklow",
    status: "available",
    homeTypes: ["house"],
    typeLabel: "Large detached houses",
    excerpt:
      "Discover an exclusive selection of luxury detached homes, where spacious design meets timeless elegance and modern comfort — all set within a beautiful, scenic location.",
    overview: [
      "An exclusive development of luxurious detached homes in the heart of Enniskerry, famously known as the “Garden of Ireland.” These exceptional properties are designed with meticulous attention to detail and features premium finishes for modern living.",
      "A scheme of just four five-bedroom detached houses set in a mature, leafy setting on Monastery Road — superb light-filled, spacious homes in a small, quiet development. These are statement five-bedroom houses that exude style and streamlined elegance.",
    ],
    specs: [
      { label: "Homes", value: "4 exclusive detached houses" },
      { label: "Bedrooms", value: "5 bedrooms" },
      { label: "Setting", value: "Monastery Road, Enniskerry — the Garden of Ireland" },
      { label: "Finish", value: "Premium finishes throughout" },
      { label: "Viewings", value: "By appointment with Hooke & MacDonald" },
    ],
    lat: 53.2021286,
    lng: -6.1767227,
    hero: {
      src: "4059_077d.jpg",
      alt: "Detached five-bedroom house at Pinehurst, Enniskerry",
      kind: "photo",
    },
    gallery: [
      { src: "4059_077d.jpg", alt: "Front elevation of a detached house at Pinehurst", kind: "photo" },
      { src: "4059_032d.jpg", alt: "Vaulted living room with bespoke joinery at Pinehurst", kind: "photo" },
      { src: "4059_013d_small.jpg", alt: "Main bedroom at Pinehurst", kind: "photo" },
      { src: "4059_018d_small.jpg", alt: "Bathroom with walk-in shower at Pinehurst", kind: "photo" },
      { src: "4059_033d_small.jpg", alt: "Light-filled living room beneath the vaulted ceiling at Pinehurst", kind: "photo" },
      { src: "4059_053d_small.jpg", alt: "Kitchen with central island at Pinehurst", kind: "photo" },
      { src: "4059_063d_small.jpg", alt: "Entrance hall and staircase at Pinehurst", kind: "photo" },
      { src: "4059_066d_small.jpg", alt: "Children’s bedroom at Pinehurst", kind: "photo" },
      { src: "4059_088d_small.jpg", alt: "Rear elevation and garden at Pinehurst", kind: "photo" },
    ],
    agent: "Hooke & MacDonald",
    daftUrl: "https://www.daft.ie/new-home-for-sale/pinehurst-enniskerry-co-wicklow/6213008",
  },
  {
    slug: "mount-saint-marys-dundrum-d14",
    name: "Emmet Gardens",
    location: "Dundrum, D14",
    county: "Dublin",
    status: "coming-soon",
    homeTypes: ["apartment", "duplex"],
    typeLabel: "Apartments and duplexes",
    excerpt:
      "Discover a vibrant new community on Dundrum Road, created with family living at its heart. These light-filled, spacious homes combine modern comfort with secure surroundings, all within easy reach of schools, shops, and local parks.",
    overview: [
      "Emmet Gardens is a new residential community of 129 social and affordable homes, delivered in partnership with Dún Laoghaire–Rathdown County Council on Council-owned land in Dundrum. Arranged across three blocks ranging from two to six storeys, the scheme comprises 72 one-bedroom and 57 two-bedroom homes designed to meet the needs of a diverse range of households.",
      "The development will also deliver a new public park, communal open spaces, play areas and supporting facilities. Located on Dundrum Road, the site is superbly connected — several bus routes nearby and the Green Line Luas within walking distance.",
    ],
    specs: [
      { label: "Homes", value: "129 social & affordable homes" },
      { label: "Mix", value: "72 one-bed & 57 two-bed across three blocks" },
      { label: "Partner", value: "Dún Laoghaire–Rathdown County Council" },
      { label: "Amenity", value: "New public park & communal open spaces" },
      { label: "Completion", value: "Expected mid-2028" },
    ],
    lat: 53.308058,
    lng: -6.2453099,
    hero: {
      src: "24336_dundrum_cgi-1_revb.jpg",
      alt: "CGI of apartment blocks around a landscaped park at Emmet Gardens, Dundrum",
      kind: "cgi",
    },
    gallery: [
      { src: "24336_dundrum_cgi-1_revb.jpg", alt: "CGI of Emmet Gardens from the public park", kind: "cgi" },
      { src: "24336_dundrum_cgi-2_revb.jpg", alt: "CGI of residential blocks at Emmet Gardens", kind: "cgi" },
      { src: "24336_dundrum_cgi-3_revb.jpg", alt: "CGI of the landscaped courtyard at Emmet Gardens", kind: "cgi" },
      { src: "24336_dundrum_cgi-4_revb.jpg", alt: "CGI street view of Emmet Gardens on Dundrum Road", kind: "cgi" },
    ],
  },
  {
    slug: "highpoint-park-leopardstown-d18",
    name: "Highpoint Park",
    location: "Leopardstown, D18",
    county: "Dublin",
    status: "coming-soon",
    homeTypes: ["apartment", "duplex"],
    typeLabel: "Apartments and duplexes",
    excerpt:
      "A new community on Leopardstown Road, designed to bring comfort, convenience, and connection together.",
    overview: [
      "A thoughtfully designed 80-unit scheme at Leopardstown Road, where modern living meets everyday convenience. These bright and spacious homes are designed with families in mind, offering safe surroundings, easy access to local amenities, and the opportunity to own your home through an affordable purchase tenure.",
      "Winterbrook is developing Highpoint Park in partnership with Dún Laoghaire–Rathdown County Council — 80 modern homes across two blocks, comprising one-, two- and three-bedroom units, forming a sustainable, well-connected community between Leopardstown Road and the M50.",
    ],
    specs: [
      { label: "Homes", value: "80 affordable homes across two blocks" },
      { label: "Mix", value: "1, 2 & 3-bedroom units" },
      { label: "Tenure", value: "Affordable purchase with DLR County Council" },
      { label: "Setting", value: "Leopardstown Road, Dublin 18" },
      { label: "Completion", value: "Expected mid-2028" },
    ],
    lat: 53.2699408,
    lng: -6.2176675,
    hero: {
      src: "24337_wildrock_cgi-2_revd.jpg",
      alt: "CGI of apartment blocks at Highpoint Park, Leopardstown",
      kind: "cgi",
    },
    gallery: [
      { src: "24337_wildrock_cgi-2_revd.jpg", alt: "CGI of Highpoint Park from Leopardstown Road", kind: "cgi" },
      { src: "24337_wildrock_cgi-1_revd.jpg", alt: "CGI of residential blocks at Highpoint Park", kind: "cgi" },
      { src: "24337_wildrock_cgi-3_revd.jpg", alt: "CGI of landscaped space at Highpoint Park", kind: "cgi" },
    ],
  },
  {
    slug: "somerville-howth-d13",
    name: "Somerville",
    location: "Howth, D13",
    county: "Dublin",
    status: "coming-soon",
    homeTypes: ["house", "apartment"],
    typeLabel: "Houses & apartments",
    excerpt:
      "A new residential scheme on Thormanby Road, positioned along the eastern edge of the Howth Peninsula — 17 three- and four-bedroom houses alongside 10 one- and two-bedroom apartments, designed by Metropolitan Workshop.",
    overview: [
      "Positioned along the eastern edge of the Howth Peninsula, Somerville fronts onto Thormanby Road just south of Howth Village. Designed by the innovative architecture firm Metropolitan Workshop, the proposed development responds sensitively to its surroundings — respecting both the existing built context and the natural landscape, while delivering homes of exceptional quality.",
      "True to Winterbrook's ethos, the scheme integrates strong architectural design with advanced construction techniques and contemporary features, resulting in a distinctive and thoughtfully designed residential offering in one of Dublin's most sought-after coastal settings.",
    ],
    specs: [
      { label: "Homes", value: "27 new homes" },
      { label: "Mix", value: "17 three & four-bed houses, 10 one & two-bed apartments" },
      { label: "Architect", value: "Metropolitan Workshop" },
      { label: "Setting", value: "Thormanby Road, Howth Peninsula" },
      { label: "Status", value: "Planning lodged with Fingal County Council" },
    ],
    lat: 53.3791543,
    lng: -6.0563343,
    hero: {
      src: "somerville_approach.jpg",
      alt: "CGI of the approach to Somerville, Howth, at dusk",
      kind: "cgi",
    },
    gallery: [
      { src: "somerville_approach.jpg", alt: "CGI of the approach to Somerville at dusk", kind: "cgi" },
      { src: "somerville_main-street.jpg", alt: "CGI of the main street through Somerville, Howth", kind: "cgi" },
      { src: "somerville_rear.jpg", alt: "CGI of the landscaped gardens to the rear of Somerville", kind: "cgi" },
      { src: "somerville_elevation.jpg", alt: "CGI elevation of the houses at Somerville at dusk", kind: "cgi" },
    ],
  },
];

export type ProjectCategory = "residential" | "commercial" | "international";

export interface PastProject {
  slug: string;
  name: string;
  years: string;
  description: string;
  gallery: GalleryImage[];
  international?: boolean;
  /** Signature projects shown with full editorial treatment on the archive page */
  featured?: boolean;
  category: ProjectCategory;
}

export const pastProjects: PastProject[] = [
  {
    slug: "pinehurst",
    category: "residential",
    featured: true,
    name: "Pinehurst, Enniskerry, Co. Wicklow",
    years: "2025",
    description:
      "Winterbrook’s most recently completed scheme: four statement five-bedroom detached houses in a mature, leafy setting on Monastery Road, Enniskerry — light-filled, spacious homes finished to an exacting standard, in the heart of the Garden of Ireland.",
    gallery: [
      { src: "4059_077d.jpg", alt: "Front elevation of a completed detached house at Pinehurst, Enniskerry", kind: "photo" },
      { src: "4059_032d.jpg", alt: "Vaulted living room with bespoke joinery at Pinehurst", kind: "photo" },
      { src: "4059_053d_small.jpg", alt: "Kitchen with central island at Pinehurst", kind: "photo" },
      { src: "4059_088d_small.jpg", alt: "Rear elevation and garden at Pinehurst", kind: "photo" },
    ],
  },
  {
    slug: "clock-lane-house",
    category: "residential",
    featured: true,
    name: "Clock Lane House, Dun Laoghaire",
    years: "2024",
    description:
      "Clock Lane House was a beautifully designed apartment complex on Sussex Street in Dun Laoghaire, Co. Dublin. Formerly a Credit Union building, it was expertly converted and expanded by Winterbrook, including the addition of an extra floor. This renovation created eleven spacious one- and two-bedroom apartments. Located in the heart of Dun Laoghaire, the apartments offered residents easy access to shops, amenities, and excellent connectivity, being less than a five-minute walk from the DART.",
    gallery: [
      { src: "3906_004d_small.jpg", alt: "Exterior of Clock Lane House, Dun Laoghaire", kind: "photo" },
      { src: "3906_005d_small.jpg", alt: "Facade detail of Clock Lane House", kind: "photo" },
      { src: "3906_047d_small.jpg", alt: "Apartment interior at Clock Lane House", kind: "photo" },
      { src: "3906_040d_small.jpg", alt: "Living space at Clock Lane House", kind: "photo" },
    ],
  },
  {
    slug: "the-lookout",
    category: "residential",
    featured: true,
    name: "‘The Lookout’, Harbour Road, Dalkey",
    years: "2023–2024",
    description:
      "Set on the picturesque and exclusive Harbour Road in the South Dublin village of Dalkey, ‘The Lookout’ was a luxurious development of apartments designed by award-winning architects Henry J Lyons. Sold to Irish Life Plc., these bright and spacious one- and two-bedroom apartments were designed to make the most of their coastal location, surrounded by beautifully landscaped courtyards and open spaces.",
    gallery: [
      { src: "the-lookout-high-res-2.jpg", alt: "The Lookout apartments overlooking Dalkey harbour", kind: "photo" },
      { src: "the-lookout-high-res-6.jpg", alt: "Coastal elevation of The Lookout, Harbour Road", kind: "photo" },
      { src: "the-lookout-high-res-3.jpg", alt: "Landscaped courtyard at The Lookout", kind: "photo" },
      { src: "the-lookout-high-res-5.jpg", alt: "Exterior detail at The Lookout, Dalkey", kind: "photo" },
      { src: "the-lookout-high-res-11.jpg", alt: "The Lookout apartments seen from the coast", kind: "photo" },
      { src: "the-lookout-high-res-15.jpg", alt: "Balconies with sea views at The Lookout", kind: "photo" },
      { src: "the-lookout-high-res-16.jpg", alt: "Evening view of The Lookout, Harbour Road", kind: "photo" },
      { src: "the-lookout-high-res-4.jpg", alt: "The Lookout and its landscaped grounds", kind: "photo" },
      { src: "the-lookout-high-res-8.jpg", alt: "Aerial view of The Lookout beside Dalkey harbour", kind: "photo" },
    ],
  },
  {
    slug: "sika-woods",
    category: "residential",
    featured: true,
    name: "Sika Woods, Enniskerry, Co. Wicklow",
    years: "2020–2022",
    description:
      "Sika Woods is a unique development of 47 houses set in the Garden of Ireland in Enniskerry, Co. Wicklow. Designed by Aughey O’Flaherty Architects, the site was designed around country living with a contemporary look and feel. Primarily three and four bedroom houses, key features included Georgian height living spaces, double height void and light filled spaces, unique dash and brick finish and ample landscaped areas. Each house type was designed with the end-customer in mind with great attention put to the interior architecture and layout of house types.",
    gallery: [
      { src: "3329_012d_donalmurphyphoto.jpg", alt: "Contemporary houses at Sika Woods, Enniskerry", kind: "photo" },
      { src: "3329_003d_donalmurphyphoto.jpg", alt: "Street scene at Sika Woods", kind: "photo" },
      { src: "3329_031d_donalmurphyphoto.jpg", alt: "Brick and dash finishes at Sika Woods", kind: "photo" },
      { src: "3329_036d_donalmurphyphoto.jpg", alt: "Family homes at Sika Woods", kind: "photo" },
      { src: "3329_047d_donalmurphyphoto.jpg", alt: "Landscaped areas at Sika Woods", kind: "photo" },
      { src: "3329_060d_donalmurphyphoto.jpg", alt: "Double-height light-filled interior at Sika Woods", kind: "photo" },
      { src: "3329_062d_donalmurphyphoto.jpg", alt: "Living space at Sika Woods", kind: "photo" },
      { src: "3329_069d_donalmurphyphoto.jpg", alt: "Kitchen interior at Sika Woods", kind: "photo" },
      { src: "3329_072d_donalmurphyphoto.jpg", alt: "Georgian-height living room at Sika Woods", kind: "photo" },
      { src: "3329_077d_donalmurphyphoto.jpg", alt: "House exterior at Sika Woods", kind: "photo" },
      { src: "3332_020d_small_donalmurphyphoto.jpg", alt: "Show home interior at Sika Woods", kind: "photo" },
      { src: "3332_004d_small_donalmurphyphoto.jpg", alt: "Dining space at Sika Woods", kind: "photo" },
      { src: "3332_018d_small_donalmurphyphoto.jpg", alt: "Bedroom at Sika Woods", kind: "photo" },
      { src: "3329_080d_donalmurphyphoto.jpg", alt: "Show-home bedroom at Sika Woods, Enniskerry", kind: "photo" },
    ],
  },
  {
    slug: "westminster-wood",
    category: "residential",
    featured: true,
    name: "Westminster Wood, Foxrock, D18",
    years: "2018–2020",
    description:
      "Set in the heart of beautiful Foxrock, one of the finest addresses in South County Dublin, Westminster Wood is an exciting development of just 23 spacious homes set within a stunning landscaped space. The scheme, which comprises a mixture of four-bedroom houses, three-bedroom duplexes and two-bedroom apartments, is designed by Ferreira Architects to an incredibly high standard, showcasing architectural flair and the best of modern design.",
    gallery: [
      { src: "springfieldpark_5_o64c5030.jpg", alt: "Homes at Westminster Wood, Foxrock", kind: "photo" },
      { src: "springfieldpark_3_o64c5749.jpg", alt: "Landscaped grounds at Westminster Wood", kind: "photo" },
      { src: "think-contemporary-foxrock-26.jpg", alt: "Contemporary interior at Westminster Wood", kind: "photo" },
      { src: "think-contemporary-foxrock-3.jpg", alt: "Living space at Westminster Wood", kind: "photo" },
      { src: "think-contemporary-foxrock-8.jpg", alt: "Kitchen at Westminster Wood, Foxrock", kind: "photo" },
    ],
  },
  {
    slug: "abbots-grove",
    category: "residential",
    name: "Abbots Grove, Knocklyon, Dublin 16",
    years: "2018",
    description:
      "Conveniently located on Stocking Avenue in Knocklyon, at the foot of the Dublin Mountains, Abbots Grove is a development of modern and spacious three- and four-bed family homes with an emphasis on quality and great design. Ideal for first-time buyers and growing families, the development comprises 88 A-rated homes in a variety of layouts.",
    gallery: [
      { src: "abbots_grove_10.jpg", alt: "Family homes at Abbots Grove, Knocklyon", kind: "photo" },
      { src: "abbots-grove-entrance.jpg", alt: "Entrance to Abbots Grove", kind: "photo" },
      { src: "abbots_grove_17.jpg", alt: "Street of A-rated homes at Abbots Grove", kind: "photo" },
      { src: "abbots-grove-at-night.jpg", alt: "Abbots Grove homes at dusk", kind: "photo" },
    ],
  },
  {
    slug: "dalriada",
    category: "residential",
    name: "Dalriada, Knocklyon, Dublin 16",
    years: "2016",
    description:
      "A beautiful collection of duplexes and three- and four-bed houses, Dalriada fuses together modern family living needs with contemporary style and sophisticated design, all in a well-connected and established residential area. Ideal for families of all ages and sizes.",
    gallery: [
      { src: "dalriada-duplexes-2.jpg", alt: "Duplexes at Dalriada, Knocklyon", kind: "photo" },
      { src: "dalriada_entrance.jpg", alt: "Entrance to Dalriada", kind: "photo" },
      { src: "dalriada_2.jpg", alt: "Family houses at Dalriada", kind: "photo" },
    ],
  },
  {
    slug: "trinity-street",
    category: "commercial",
    name: "Trinity Street Redevelopment, Dublin 2",
    years: "2014–2016",
    description:
      "This standout project involved a complete re-development of the high-profile retail and commercial property space adjacent to Dublin’s premier shopping district, Grafton Street, and in the heart of Dublin’s business district.",
    gallery: [
      { src: "trinity-st.exterior.jpg", alt: "Trinity Street redevelopment, Dublin 2", kind: "photo" },
    ],
  },
  {
    slug: "johns-mews",
    category: "international",
    international: true,
    name: "Johns Mews, London",
    years: "2013",
    description:
      "Located in exclusive Bloomsbury, Johns Mews is an intricately designed two-storey house that includes a stunning 1,218 sq ft first floor reception room and a contemporary floating tread staircase that leads through an electrically operated sliding roof light to a private roof terrace.",
    gallery: [
      { src: "johns-mews-exterior.jpg", alt: "Exterior of Johns Mews, Bloomsbury", kind: "photo" },
      { src: "johns-mews-interior-1.jpg", alt: "Reception room at Johns Mews", kind: "photo" },
      { src: "johns-mews-interior-2.jpg", alt: "Floating tread staircase at Johns Mews", kind: "photo" },
      { src: "johns-mews-master-bathroom.jpg", alt: "Master bathroom at Johns Mews", kind: "photo" },
    ],
  },
  {
    slug: "hanover-quay",
    category: "commercial",
    featured: true,
    name: "Hanover Quay & Hanover Reach, Dublin 2",
    years: "2006–2008",
    description:
      "A standout mixed-use project, Hanover Quay is a seven-storey over-basement building designed to the highest standards by Burke-Kennedy Doyle Architects. After completion, Hanover Reach became the European headquarters for Facebook, while The Waterfront at Hanover Quay comprised a collection of 68 spacious apartments.",
    gallery: [
      { src: "hanover_quay_1.jpg", alt: "Hanover Quay building on Dublin’s docklands", kind: "photo" },
      { src: "hanover_quay_3.jpg", alt: "Hanover Reach, Dublin 2", kind: "photo" },
      { src: "hanover_quay.jpg", alt: "The Waterfront at Hanover Quay", kind: "photo" },
    ],
  },
  {
    slug: "hunterswood",
    category: "residential",
    name: "Hunterswood, Knocklyon",
    years: "2004–2005",
    description:
      "Located on the Ballycullen Road, Hunterswood is an imaginative development of spacious and modern houses, duplexes and apartments designed by O’Mahony Pike Architects. Varying heights and sizes and the use of natural building materials gives this beautiful development a distinctively stylish appearance.",
    gallery: [
      { src: "hunterswood.jpg", alt: "Hunterswood development, Ballycullen Road", kind: "photo" },
      { src: "hunterswood_.jpg", alt: "Houses and apartments at Hunterswood", kind: "photo" },
    ],
  },
  {
    slug: "woodstown",
    category: "residential",
    name: "Woodstown, Knocklyon, Dublin 16",
    years: "1999–2004",
    description:
      "The award-winning Woodstown Village at Knocklyon comprises 600 houses in a choice of seven different styles, and is notable for its landscape planning that created an elegant tree-lined avenue that branched out into intimate landscaped cul-de-sacs.",
    gallery: [
      { src: "woodstown-village.jpg", alt: "Tree-lined avenue at Woodstown Village", kind: "photo" },
    ],
  },
  {
    slug: "woodstown-shopping-centre",
    category: "commercial",
    name: "Woodstown Shopping Centre, Knocklyon",
    years: "2000–2001",
    description:
      "Designed to complement the houses at Woodstown Village, Woodstown Shopping Centre is notable for its canopy-type roof over the ground floor properties, which reflects the style of the residential development. The centre now houses a wide range of retail outlets, along with a medical centre and a crèche.",
    gallery: [
      { src: "woodstownshoppingcentre.jpg", alt: "Woodstown Shopping Centre, Knocklyon", kind: "photo" },
    ],
  },
  {
    slug: "knocklyon-gate",
    category: "residential",
    name: "Knocklyon Gate, Knocklyon",
    years: "2000–2001",
    description:
      "Knocklyon Gate at Woodstown Village is a development of 62 spacious and modern one-, two- and three-bedroom apartments designed to appeal to a younger clientele and offer high-quality accommodation within easy reach of Dublin City Centre. Features include the innovative use of materials such as timber, glazing and brickwork.",
    gallery: [
      { src: "knocklyon-gate-27.jpg", alt: "Apartments at Knocklyon Gate", kind: "photo" },
    ],
  },
  {
    slug: "corr-castle",
    category: "residential",
    name: "Corr Castle, Howth, Co. Dublin",
    years: "1998",
    description:
      "Considered one of the most outstanding residential developments in Dublin in recent years, Corr Castle in Howth brings together design flair and quality workmanship with imaginative landscaping and the restoration of the centerpiece 16th-century castle. The development comprises 85 apartments and eight houses.",
    gallery: [
      { src: "corr-castle-apartments.jpg", alt: "Corr Castle apartments, Howth", kind: "photo" },
    ],
  },
  {
    slug: "grays-inn-road",
    category: "international",
    international: true,
    name: "Grays Inn Road, London",
    years: "2010",
    description:
      "Located in one of London’s leading business districts, this seven-storey building contains prime office space completed to a high standard of finish. All offices are fully fitted and wired to meet the demands of modern business.",
    gallery: [
      { src: "grays_in_rd-284x282.jpg", alt: "Grays Inn Road office building, London", kind: "photo" },
    ],
  },
  {
    slug: "chelmsford",
    category: "international",
    international: true,
    name: "Chelmsford, Essex",
    years: "2007",
    description:
      "This high-profile project in the bustling market town of Chelmsford in Essex comprises seven retail and restaurant units that were originally part of a former brewery yard complex. The building now includes tenants such as Nando’s, McDonalds, and Milano’s.",
    gallery: [
      { src: "chelmsford.jpg", alt: "Retail and restaurant units at Chelmsford, Essex", kind: "photo" },
    ],
  },
  {
    slug: "castlemarket",
    category: "commercial",
    name: "Castlemarket, Dublin 2",
    years: "2006",
    description:
      "Located just minutes from Grafton Street, one of the world’s premier retail districts, this high-profile portfolio of eight retail shops is situated at the corner of a pedestrianised retail and restaurant street that links Grafton Street and South Great Georges Street.",
    gallery: [
      { src: "castlemarket_1.jpg", alt: "Castlemarket retail street, Dublin 2", kind: "photo" },
      { src: "castlemarket2.jpg", alt: "Retail units at Castlemarket", kind: "photo" },
    ],
  },
  {
    slug: "stuttgart",
    category: "international",
    international: true,
    name: "Stuttgart, Germany",
    years: "2006–2007",
    description:
      "A high quality, modern mixed-use property located on the prime pedestrianised retail street in Stuttgart. Change of use planning permission was achieved, a refurbishment and new tenancies put in place.",
    gallery: [
      { src: "koenigstrasse-stuttgart-germany.jpg", alt: "Königstrasse mixed-use property, Stuttgart", kind: "photo" },
    ],
  },
  {
    slug: "nuerwall-hamburg",
    category: "international",
    international: true,
    name: "Neuer Wall, Hamburg, Germany",
    years: "2006",
    description:
      "A mixed use retail and office property located on Hamburg’s most exclusive shopping street which was acquired in 2006 and sold in 2011.",
    gallery: [
      { src: "neuer-wall-hambug-germany.jpg", alt: "Neuer Wall retail and office property, Hamburg", kind: "photo" },
    ],
  },
];

export interface NewsArticle {
  slug: string;
  title: string;
  date: string; // ISO
  dateLabel: string;
  image: GalleryImage;
  excerpt: string;
  body: string[];
  /** Optional editorial photo set shown after the article body */
  gallery?: GalleryImage[];
}

export const newsArticles: NewsArticle[] = [
  {
    slug: "contracts-signed-for-129-new-social-and-affordable-homes-at-emmet-gardens-dundrum",
    title: "Contracts Signed for 129 New Social and Affordable Homes at Emmet Gardens, Dundrum",
    date: "2026-07-22",
    dateLabel: "July 2026",
    image: { src: "24336_dundrum_cgi-1_revb.jpg", alt: "CGI of Emmet Gardens, Dundrum, from the new public park", kind: "cgi" },
    excerpt:
      "Dún Laoghaire–Rathdown County Council has confirmed the signing of contracts with Winterbrook for the delivery of 129 new social and affordable homes on Council-owned land in Dundrum — the second agreement between the Council and Winterbrook.",
    body: [
      "Dún Laoghaire–Rathdown County Council has confirmed the signing of contracts with Winterbrook Ltd. for the delivery of 129 new social and affordable homes on Council-owned land in Dundrum. The project represents a significant milestone in the Council's housing delivery programme and is one of many schemes being advanced through the EU Competitive Dialogue process, which enables the Council to deliver high-quality housing on its own land in partnership with key providers.",
      "Approved by the Elected Members through the Part 8 process in 2025, Emmet Gardens will deliver 129 social and affordable homes with a strong emphasis on affordable housing, arranged across three blocks ranging from two to six storeys. The scheme comprises 72 one-bedroom and 57 two-bedroom homes, combining practical layouts with contemporary design to support a sustainable and welcoming community.",
      "The project will also deliver a new public park, along with communal open spaces, play areas and supporting facilities. Located on Dundrum Road, the site is well served by public transport, with several bus routes nearby and the Green Line Luas within walking distance.",
      "Emmet Gardens is funded by the Department of Housing, Local Government and Heritage, including the Social Housing Capital Investment Programme. The site was acquired through the Land Acquisition Fund provided by the Housing Agency, and the Affordable Housing Fund is contributing to the delivery of affordable homes for purchase within the scheme.",
      "This contract represents the second agreement between the Council and Winterbrook. Following the signing of an earlier contract in late 2025, construction on that development — Highpoint Park in Leopardstown — is now underway, demonstrating the continued and productive partnership between the Council and Winterbrook in delivering much-needed new homes across the county.",
      "Conor Rhatigan, Managing Director of Winterbrook Ltd., said: “Winterbrook is delighted to be progressing Emmet Gardens, a new residential community of 129 homes in partnership with Dún Laoghaire–Rathdown County Council, helping to meet the ongoing need for new housing in the area. We are particularly appreciative of the confidence placed in Winterbrook by dlr and are proud to be trusted with the delivery of Emmet Gardens.”",
      "Construction is scheduled to commence shortly, with completion expected by mid-2028.",
    ],
    gallery: [
      {
        src: "emmet-gardens-signing-2.jpg",
        alt: "Contracts being signed for Emmet Gardens, Dundrum: Conor Rhatigan, Managing Director of Winterbrook, and Frank Curran, Chief Executive of Dún Laoghaire–Rathdown County Council, at the table, with Gerard O'Sullivan, Director of Housing, and Cathaoirleach Jim Gildea standing",
        kind: "photo",
      },
      {
        src: "emmet-gardens-signing.jpg",
        alt: "The Winterbrook and Dún Laoghaire–Rathdown County Council teams at the Emmet Gardens contract signing, with the scheme shown on screen",
        kind: "photo",
      },
    ],
  },
  {
    slug: "the-poplars-shankill-launching-this-summer",
    title: "The Poplars, Shankill – Launching This Summer",
    date: "2026-05-06",
    dateLabel: "May 6th, 2026",
    image: { src: "26027_thepoplars_cgi-1_reve_lowres.jpg", alt: "CGI of The Poplars, Shankill", kind: "cgi" },
    excerpt:
      "The team is currently progressing works on their latest residential development, The Poplars, located on Quinn’s Road, Shankill, Co. Dublin — an exclusive collection of 25 high-quality new homes.",
    body: [
      "The team is currently progressing works on their latest residential development, The Poplars, located on Quinn’s Road, Shankill, Co. Dublin — an exclusive collection of 25 high-quality new homes.",
      "Thoughtfully designed and carefully planned, The Poplars will offer contemporary homes that combine architectural excellence, sustainability, and long-term liveability. Ideally situated within easy reach of Shankill village, residents will also benefit from excellent transport links to Dublin city centre and beyond.",
      "Launching Summer 2026, this limited development represents a rare opportunity to secure a new home in one of South Dublin’s most established and sought-after locations.",
      "Hooke & MacDonald are the appointed selling agents and are on hand to assist with any enquiries.",
    ],
  },
  {
    slug: "planning-application-lodged-at-thormanby-road-howth",
    title: "Planning Application Lodged at Thormanby Road, Howth",
    date: "2026-01-12",
    dateLabel: "January 12th, 2026",
    image: { src: "somerville_elevation.jpg", alt: "Elevation drawing of the proposed Somerville scheme, Howth", kind: "cgi" },
    excerpt:
      "Winterbrook has submitted a planning application to Fingal County Council for a new residential scheme, Somerville, located on Thormanby Road, Howth, D13.",
    body: [
      "Winterbrook has submitted a planning application to Fingal County Council for a new residential scheme, Somerville, located on Thormanby Road, Howth, D13.",
      "Positioned along the eastern edge of the Howth Peninsula, the site fronts onto Thormanby Road, just south of Howth Village. Designed by the innovative architecture firm Metropolitan Workshop, the proposed development has been carefully designed to respond sensitively to its surroundings, respecting both the existing built context and the natural landscape, while delivering homes of exceptional quality.",
      "True to Winterbrook’s ethos, the scheme integrates strong architectural design with advanced construction techniques and contemporary features, resulting in a distinctive and thoughtfully designed residential offering.",
      "The planning application comprises 17 three- and four-bedroom houses alongside 10 one- and two-bedroom apartments, providing a balanced mix of high-quality homes in a highly sought-after coastal location.",
    ],
  },
  {
    slug: "contracts-signed-to-deliver-80-new-affordable-homes-at-highpoint-park-leopardstown",
    title: "Contracts Signed to Deliver 80 New Affordable Homes at Highpoint Park, Leopardstown",
    date: "2026-01-08",
    dateLabel: "January 8th, 2026",
    image: {
      src: "image-2-highpoint-park.jpg",
      alt: "Contract signing for the delivery of 80 affordable homes at Highpoint Park with Dún Laoghaire–Rathdown County Council",
      kind: "photo",
    },
    excerpt:
      "Winterbrook is developing 80 new affordable homes at Highpoint Park, Leopardstown, in partnership with Dún Laoghaire–Rathdown County Council.",
    body: [
      "Winterbrook is developing 80 new affordable homes at Highpoint Park, Leopardstown, in partnership with Dún Laoghaire–Rathdown County Council — a significant milestone for the development.",
      "The project, approved earlier this year through the Part 8 planning process, will deliver 80 modern homes across two blocks, comprising one-, two- and three-bedroom units. Designed to support a diverse range of households, the development will form a sustainable, well-connected community located between Leopardstown Road and the M50, with strong public transport links.",
      "Highpoint Park is being progressed through the Council’s EU Competitive Dialogue procurement process and is supported by funding from the Department of Housing, Local Government and Heritage under the Affordable Housing Fund. The scheme reflects a strong commitment to delivering high-quality, energy-efficient homes on public land.",
      "Commenting on the contract signing, Conor Rhatigan, Managing Director of Winterbrook Ltd., said: “Winterbrook is pleased to partner with Dún Laoghaire–Rathdown County Council on the delivery of 80 affordable homes at Highpoint Park. This project is the result of a highly collaborative process, and we value the confidence placed in us to deliver high-quality homes that will make a real difference for local families.”",
      "Construction is scheduled to commence shortly, with completion expected by mid-2028.",
    ],
  },
  {
    slug: "pinehurst-enniskerry-launch",
    title: "Pinehurst, Enniskerry — Launch",
    date: "2025-11-03",
    dateLabel: "November 3rd, 2025",
    image: { src: "pinehurst-front.jpg", alt: "CGI front elevation of a detached house at Pinehurst, Enniskerry", kind: "cgi" },
    excerpt:
      "A stunning new development of just four unique homes are launching for sale in mid-November — spacious, statement five bedroom detached houses that exude style and streamlined elegance.",
    body: [
      "A stunning new development of just four unique homes are launching for sale in mid-November. These are spacious, statement five bedroom detached houses that exude style and streamlined elegance. Viewings are by appointment with Hooke & MacDonald.",
    ],
  },
  {
    slug: "luxurious-5-bed-houses-enniskerry-co-wicklow",
    title: "Luxurious 5 Bed Houses, Enniskerry, Co. Wicklow",
    date: "2025-08-18",
    dateLabel: "August 18th, 2025",
    image: { src: "4059_033d_small.jpg", alt: "Interior of a five-bedroom house at Pinehurst", kind: "photo" },
    excerpt:
      "A scheme of just four five-bedroom detached houses set in a mature, leafy setting, ‘Pinehurst’ is gearing up for launch to the market for early this Autumn.",
    body: [
      "A scheme of just four five-bedroom detached houses set in a mature, leafy setting, ‘Pinehurst’ is gearing up for launch to the market for early this Autumn. Located on Monastery Road in Enniskerry, these are superb light filled, spacious homes in a small, quiet development.",
    ],
  },
  {
    slug: "clock-lane-house-ready-for-occupiers",
    title: "Clock Lane House, Ready For Occupiers",
    date: "2024-08-01",
    dateLabel: "August 1st, 2024",
    image: { src: "3906_040d_small.jpg", alt: "Completed Clock Lane House, Dun Laoghaire", kind: "photo" },
    excerpt:
      "Clock Lane House, a development of 11 apartments located on Sussex Street in the heart of Dun Laoghaire, has been completed and is ready for occupation.",
    body: [
      "Clock Lane House, a development of 11 apartments located on Sussex Street in the heart of Dun Laoghaire, has been completed and is ready for occupation by its new tenants, Sophia Housing. The project, situated in a former credit union building, underwent a comprehensive refurbishment by Winterbrook. This renovation included the addition of an extra floor, resulting in the transformation of the old structure into eleven stunning one and two-bedroom apartments.",
    ],
  },
];

export interface TeamMember {
  name: string;
  role: string;
  portrait: string;
}

export const team: TeamMember[] = [
  { name: "Conor Rhatigan", role: "Managing Director", portrait: "winterbrook-portraits_066-conor.jpg" },
  { name: "Anne-Marie Drohan", role: "Operations Director", portrait: "winterbrook-portraits_139-anne-marie.jpg" },
  { name: "Kate Rhatigan", role: "Innovation & Design Director", portrait: "winterbrook-portraits_322-kate.jpg" },
  { name: "Michael Kissane", role: "Finance Director", portrait: "winterbrook-portraits_222.jpg" },
  { name: "Paul Farrell", role: "Construction Manager", portrait: "winterbrook-portraits_184-paul.jpg" },
  { name: "Ivor McNamara", role: "Head of Investment", portrait: "winterbrook-portraits_022-ivor.jpg" },
  { name: "Francis Rhatigan", role: "Director & Company Founder", portrait: "winterbrook-portraits_350-francis.jpg" },
  { name: "Tommy Breen", role: "Chairman", portrait: "winterbrook-portraits__613-tommy.jpg" },
];

export const company = {
  name: "Winterbrook",
  tagline: "Homebuilding for over 40 years",
  address: ["Winterbrook", "Ashgrove Works, Kill Avenue", "Dun Laoghaire, Co. Dublin", "A96 V8C2"],
  phone: "+353 (0)1 690 9590",
  phoneHref: "tel:+35316909590",
  email: "info@winterbrook.ie",
  instagram: "https://www.instagram.com/winterbrookhomes/",
  instagramHandle: "@winterbrookhomes",
  overview: [
    "We don’t just build homes — we design communities that last.",
    "With decades of reputation behind us, we design and deliver homes of a standard immediately recognisable as Winterbrook — considered architecture, disciplined build quality, and a finish that holds up over time.",
    "We focus on mid to upper-market homes across Dublin, Wicklow and Kildare, working each site from first design sketch through to handover with the same attention to detail throughout.",
    "At Winterbrook, design and delivery go hand in hand — and every commitment we make, to landowners, buyers and partners, is one we keep.",
  ],
  motto: "Family owned. Expertly delivered. Built to endure.",
  about: [
    "Winterbrook is a family-owned Irish property company with more than four decades of experience delivering considered homes and enduring communities. Led by Conor Rhatigan, Anne-Marie Drohan and Kate Rhatigan, the business combines long-term perspective with professional governance, disciplined delivery and a strong commitment to thoughtful design.",
    "Every scheme begins with its setting. We pair considered architecture with sustainable construction and generous landscaping to create homes that enhance their surroundings, and communities designed to hold their character, and their value, for decades.",
  ],
};

export const stats = [
  { value: 40, suffix: "+", label: "Years of homebuilding" },
  { value: 239, suffix: "", label: "Homes under construction today" },
  { value: 420, suffix: "+", label: "Homes in our secured pipeline" },
  { value: 209, suffix: "", label: "Affordable homes with DLR County Council" },
];

export function getDevelopment(slug: string) {
  return developments.find((d) => d.slug === slug);
}

/* ------------------------------------------------------------------ */
/* Land & Partnerships                                                 */
/* ------------------------------------------------------------------ */

export const positioning = "Family owned. Expertly delivered. Built to endure.";

export const landCriteria = [
  "Sites across Dublin, Wicklow and Kildare",
  "With or without planning permission",
  "Greenfield, brownfield and existing residential",
  "Sites suited to schemes of 20 to 300+ homes",
  "Off-market opportunities particularly welcome",
  "All deal structures considered",
];

export interface StructureStep {
  title: string;
  body: string;
}

export interface PartnershipStructure {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  stepsHeading: string;
  steps: StructureStep[];
}

export const partnershipStructures: PartnershipStructure[] = [
  {
    slug: "option-agreement",
    name: "Option Agreement",
    tagline: "We take the planning risk. You keep ownership until the site is ready.",
    summary:
      "An option agreement gives Winterbrook the right to buy your land only if planning permission is secured. You keep ownership throughout the process while we fund and manage the planning application entirely at our own risk and expense.",
    stepsHeading: "How it works",
    steps: [
      { title: "We agree the terms", body: "Together we agree the option period, purchase price or pricing formula." },
      { title: "We prepare the planning application", body: "We appoint and fund architects, consultants, surveys and all planning costs, assembling a leading professional team to maximise the site’s potential." },
      { title: "We manage the process", body: "We work closely with the local authority and key stakeholders while keeping you informed throughout." },
      { title: "If planning is approved", body: "We purchase the land on the agreed terms." },
      { title: "If planning isn’t achieved", body: "The option simply expires. You retain full ownership of your land while benefiting from all planning work completed entirely at our expense." },
    ],
  },
  {
    slug: "joint-venture",
    name: "Joint Venture",
    tagline: "You contribute the land. We contribute the expertise, funding and delivery. Together we share in the success.",
    summary:
      "A joint venture allows you to contribute your land as equity while Winterbrook provides the expertise, funding and delivery required to unlock the site’s full potential.",
    stepsHeading: "How it works",
    steps: [
      { title: "We agree the partnership", body: "Commercial structure, responsibilities and value sharing." },
      { title: "We invest in the project", body: "Winterbrook funds the consultants, professional team and delivery." },
      { title: "We deliver the scheme", body: "Planning through construction and sales." },
      { title: "We share the success", body: "Returns are distributed according to the agreed partnership." },
    ],
  },
  {
    slug: "outright-purchase",
    name: "Outright Purchase",
    tagline: "A straightforward sale tailored to your circumstances.",
    summary:
      "Whether you prefer an immediate sale or a more flexible transaction, we can structure an acquisition around your objectives, timing and tax considerations.",
    stepsHeading: "How it works",
    steps: [
      { title: "We assess your site", body: "Clear appraisal and no-obligation offer." },
      { title: "We agree the terms", body: "Transaction structured around your priorities." },
      { title: "We complete the process", body: "Efficient legal and commercial management." },
      { title: "We complete the purchase", body: "A smooth transaction with certainty." },
    ],
  },
  {
    slug: "public-partnership",
    name: "Public-Sector Partnership",
    tagline: "Delivering homes in partnership with the public sector.",
    summary:
      "Winterbrook partners with local authorities, state agencies and institutional organisations to deliver high-quality housing that creates lasting communities.",
    stepsHeading: "Principles",
    steps: [
      { title: "Collaborative from the outset", body: "Practical, deliverable solutions." },
      { title: "Trusted delivery", body: "Expertise, funding and capability." },
      { title: "Proven performance", body: "Quality, governance and accountability." },
    ],
  },
];

export const valueChain = [
  {
    stage: "Create",
    title: "Prospecting & Acquisition",
    description: "Site identification, underwriting, funding and acquisition — securing the right land, on the right terms, ahead of the market.",
    owner: "Conor Rhatigan",
    role: "Managing Director",
  },
  {
    stage: "Shape",
    title: "Planning & Design",
    description: "Feasibility, design team leadership and local-authority engagement through to grant of permission.",
    owner: "Kate Rhatigan",
    role: "Innovation & Design Director",
  },
  {
    stage: "Prepare",
    title: "Detailed Design",
    description: "Technical design, cost control and procurement — schemes engineered to be buildable before a sod is turned.",
    owner: "Anne-Marie Drohan",
    role: "Operations Director",
  },
  {
    stage: "Deliver",
    title: "Construction",
    description: "Programme, cost and quality management with in-house oversight from groundworks to handover.",
    owner: "Anne-Marie Drohan",
    role: "Operations Director",
  },
  {
    stage: "Complete",
    title: "Sales, Handover & Aftercare",
    description: "Launch, sales and handover, with a customer-first approach to snagging and aftercare — we finish well.",
    owner: "Winterbrook Sales Team",
    role: "With appointed agents",
  },
];

export interface LandCaseStudy {
  title: string;
  structure: string;
  image: GalleryImage;
  body: string;
  href: string;
}

export const landCaseStudies: LandCaseStudy[] = [
  {
    title: "Highpoint Park, Leopardstown",
    structure: "Public-sector partnership",
    image: { src: "24337_wildrock_cgi-2_revd.jpg", alt: "CGI of the apartment blocks at Highpoint Park, Leopardstown", kind: "cgi" },
    body: "80 affordable homes on public land — developed in partnership with Dún Laoghaire–Rathdown County Council through EU Competitive Dialogue, now under construction.",
    href: "/homes/highpoint-park-leopardstown-d18",
  },
  {
    title: "Emmet Gardens, Dundrum",
    structure: "Public-sector partnership",
    image: { src: "24336_dundrum_cgi-2_revb.jpg", alt: "CGI of the residential blocks and public park at Emmet Gardens, Dundrum", kind: "cgi" },
    body: "129 social and affordable homes on Council-owned land — the second agreement between Winterbrook and the Council, signed in 2026.",
    href: "/homes/mount-saint-marys-dundrum-d14",
  },
  {
    title: "The Lookout, Harbour Road, Dalkey",
    structure: "Institutional exit",
    image: { src: "the-lookout-high-res-8.jpg", alt: "Aerial photograph of The Lookout beside Dalkey harbour at dusk", kind: "photo" },
    body: "A luxury coastal scheme delivered to a standard that secured a sale to Irish Life — proof we meet the bar of Ireland's largest institutions.",
    href: "/past-developments#the-lookout",
  },
];

export const governance = {
  headline: "Family owned. Expertly delivered.",
  intro:
    "Winterbrook pairs the long-term thinking of a family business with the governance and discipline institutional partners expect. Every project is run through a defined operating structure with clear ownership at each stage of the development lifecycle.",
  points: [
    {
      title: "Board & leadership",
      body: "An active board chaired by Tommy Breen (ex DCC Energy plc CEO), with founder Francis Rhatigan (ex Ellier Developments co-CEO and Irish property industry veteran) and a professional leadership team led by Managing Director Conor Rhatigan. Formal investment criteria govern every acquisition.",
    },
    {
      title: "Defined operating structure",
      body: "Each of the five stages of our development lifecycle — from land acquisition through to aftercare — has a named director as owner, with delegated authority and clear accountability.",
    },
    {
      title: "Institutional-grade discipline",
      body: "Rigorous financial underwriting, downside modelling and contingency built into every appraisal. A perfect track record with capital partners, and reporting standards that give lenders, agencies and JV partners confidence.",
    },
    {
      title: "Built to endure",
      body: "Decision-making grounded in long-term thinking, not short-term pressure — a strong balance sheet, a trusted repeat supply chain, and a culture of honouring every commitment.",
    },
  ],
};
