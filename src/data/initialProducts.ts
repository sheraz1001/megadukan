import { Product, ProductReview } from '../types/store';

export const INITIAL_PRODUCTS: Product[] = [
  // 1. SPEAKERS
  {
    id: 'md-spk-01',
    sku: 'MD-SPK-360',
    name: 'SonicBeam 360 Studio Acoustic Speaker',
    category: 'speakers',
    categoryLabel: 'Speakers & Audio',
    tagline: 'Room-filling 360° spatial acoustics with dual neodymium passive radiators',
    description: 'Designed for audiophiles and modern living spaces. The SonicBeam 360 features precision-tuned DSP, 85W peak acoustic output, multi-room sync via Wi-Fi 6, and Bluetooth 5.4 with lossless LDAC codec support.',
    price: 52500,
    originalPrice: 69000,
    rating: 4.9,
    reviewCount: 142,
    stock: 18,
    minThreshold: 6,
    reorderQuantity: 25,
    autoReorderEnabled: true,
    costPrice: 26000,
    supplier: 'AcoustiQ Labs Germany',
    totalSold: 388,
    iconType: 'speaker',
    featured: true,
    badge: 'Editor Choice',
    warranty: '2 Year Worldwide Replacement',
    features: [
      '360-degree cylindrical sound projection',
      'Dual active drivers + 2 passive bass radiators',
      'Lossless LDAC & aptX HD wireless streaming',
      'IPX7 water-resistant brushed anodized chassis',
      '24-hour continuous battery on a single charge'
    ],
    specs: [
      { label: 'Frequency Response', value: '38Hz – 24,000Hz' },
      { label: 'Output Power', value: '85W Peak / 60W RMS' },
      { label: 'Connectivity', value: 'Wi-Fi 6, BT 5.4, 3.5mm Aux' },
      { label: 'Battery Capacity', value: '9,600 mAh (24h playback)' },
      { label: 'Weight', value: '1.42 kg' }
    ],
    colorOptions: [
      { name: 'Space Charcoal', hex: '#1c1917' },
      { name: 'Brushed Titanium', hex: '#525252' },
      { name: 'Desert Amber', hex: '#b45309' }
    ]
  },
  {
    id: 'md-spk-02',
    sku: 'MD-SPK-SNDBR',
    name: 'AuraSound Cinema 5.1 Wireless Soundbar System',
    category: 'speakers',
    categoryLabel: 'Speakers & Audio',
    tagline: 'Dolby Atmos home theater soundbar with dedicated wireless down-firing subwoofer',
    description: 'Transform your entertainment setup with genuine Dolby Atmos overhead spatial sound. Features 9 high-output precision drivers, eARC HDMI pass-through, and dedicated dialogue clarity tuning.',
    price: 97000,
    originalPrice: 119000,
    rating: 4.8,
    reviewCount: 96,
    stock: 8,
    minThreshold: 4,
    reorderQuantity: 15,
    autoReorderEnabled: true,
    costPrice: 52000,
    supplier: 'AcoustiQ Labs Germany',
    totalSold: 174,
    iconType: 'soundbar',
    featured: false,
    badge: 'Home Theater',
    warranty: '3 Year Manufacturer Warranty',
    features: [
      'True Dolby Atmos & DTS:X 3D spatial decode',
      'Wireless 8-inch down-firing subwoofer included',
      'VoiceClear dialogue enhancement algorithm',
      'HDMI 2.1 eARC with 4K HDR10+ pass-through',
      'AirPlay 2, Spotify Connect & Chromecast built-in'
    ],
    specs: [
      { label: 'Total Output', value: '420W Peak' },
      { label: 'Channels', value: '5.1 Channel True Surround' },
      { label: 'Inputs', value: 'HDMI eARC, Optical, USB, BT 5.3' },
      { label: 'Soundbar Length', value: '98 cm' },
      { label: 'Subwoofer Weight', value: '6.8 kg' }
    ]
  },

  // 2. AIRPODS & HEADPHONES
  {
    id: 'md-jlab-lux-01',
    sku: 'MD-JLAB-LUX-SGE',
    name: 'JLab JBuds Lux ANC Wireless Over-Ear Headphones - Sage',
    category: 'earbuds',
    categoryLabel: 'Headphones & Earbuds',
    tagline: 'Smart Hybrid ANC, 70+ hour playtime, Spatial Audio, and plush Cloud Foam™ earcups',
    description: 'Elevate your everyday listening experience with the JLab JBuds Lux ANC Over-Ear Headphones in the iconic Sage colorway. Powered by 40mm custom-tuned dynamic drivers, Hybrid Active Noise Canceling up to -25dB, and Be Aware ambient passthrough. Enjoy over 70 hours of playtime (40+ hours with ANC enabled), Google Fast Pair, Bluetooth 5.3 Multipoint connectivity, and customizable EQ via the JLab App.',
    price: 22499,
    originalPrice: 27900,
    rating: 4.9,
    reviewCount: 188,
    stock: 16,
    minThreshold: 5,
    reorderQuantity: 25,
    autoReorderEnabled: true,
    costPrice: 13000,
    supplier: 'JLab Audio North America / Active Fitness Global',
    totalSold: 412,
    iconType: 'headphones',
    imageUrl: 'https://images.activefitnessstore.com/product-large/HBJLUXANCRSGE62/HBJLUXANCRSGE62-A.jpg',
    featured: true,
    badge: 'Trending Audio',
    warranty: '2 Year Official Manufacturer Warranty',
    galleryAngles: [
      { 
        label: '3/4 Studio View', 
        view: 'hero', 
        imageUrl: 'https://images.activefitnessstore.com/product-large/HBJLUXANCRSGE62/HBJLUXANCRSGE62-A.jpg' 
      },
      { 
        label: 'Side Profile & Controls', 
        view: 'side', 
        imageUrl: 'https://images.activefitnessstore.com/product-large/HBJLUXANCRSGE62/HBJLUXANCRSGE62-B.jpg' 
      },
      { 
        label: 'Compact Folded Form', 
        view: 'folded', 
        imageUrl: 'https://images.activefitnessstore.com/product-large/HBJLUXANCRSGE62/HBJLUXANCRSGE62-C.jpg' 
      },
      { 
        label: 'Cloud Foam™ Ear Cushion', 
        view: 'cushion', 
        imageUrl: 'https://images.activefitnessstore.com/product-large/HBJLUXANCRSGE62/HBJLUXANCRSGE62-D.jpg' 
      }
    ],
    features: [
      'Smart Hybrid ANC up to -25dB with Be Aware audio passthrough mode',
      'Massive 70+ hours wireless playtime (40+ hours with ANC turned on)',
      'Immersive Spatial Audio compatibility (Dolby Atmos, Tempest 3D)',
      'Ultra-comfortable Cloud Foam™ ear cushions and Form-Fit™ headband',
      'Bluetooth 5.3 with Multipoint (connect phone and laptop simultaneously)',
      'Google Fast Pair & Find My Device network integration',
      'JLab App support: Customize sound profiles, button functions & Safe Hearing',
      'Quick Charge: 10 minutes of USB-C fast charge delivers 4 hours playback'
    ],
    specs: [
      { label: 'Model Number', value: 'HBJLUXANCRSGE62 (JBuds Lux ANC)' },
      { label: 'Driver Size', value: '40mm Neodymium Dynamic Driver' },
      { label: 'Noise Cancellation', value: 'Smart Hybrid ANC (-25dB) + Be Aware Mode' },
      { label: 'Playtime', value: '70+ Hours (BT) / 40+ Hours (ANC)' },
      { label: 'Microphones', value: 'MEMS Clear Voice Call Mic Array' },
      { label: 'Connectivity', value: 'Bluetooth 5.3 Multipoint (30+ ft range)' },
      { label: 'Audio Codecs', value: 'SBC, AAC, Spatial Audio (Dolby Atmos)' },
      { label: 'Charging Input', value: 'USB Type-C Fast Charge (10 min = 4 hrs)' },
      { label: 'Weight', value: '235 grams (Ergonomic Lightweight Design)' }
    ],
    colorOptions: [
      { name: 'Sage Green', hex: '#7e998c' },
      { name: 'Graphite Black', hex: '#262626' },
      { name: 'Cloud White', hex: '#f1f5f9' },
      { name: 'Mauve Slate', hex: '#9d8189' }
    ]
  },
  {
    id: 'md-ear-01',
    sku: 'MD-EAR-PRO',
    name: 'AeroPods Pro Ultra ANC Earbuds',
    category: 'earbuds',
    categoryLabel: 'AirPods & Earbuds',
    tagline: 'Hybrid -48dB Active Noise Cancellation with titanium bio-diaphragm drivers',
    description: 'Engineered for seamless everyday listening, travel, and clear voice conferencing. Equipped with 6 beamforming microphones with AI wind-noise suppression, spatial head-tracking, and rapid Qi wireless charging.',
    price: 38500,
    originalPrice: 55000,
    rating: 4.9,
    reviewCount: 284,
    stock: 4,
    minThreshold: 8,
    reorderQuantity: 40,
    autoReorderEnabled: true,
    costPrice: 17000,
    supplier: 'NanoSilicon Audio Shenzhen',
    totalSold: 812,
    iconType: 'earbuds',
    featured: true,
    badge: 'Best Seller',
    warranty: '18 Months No-Hassle Replacement',
    features: [
      'Adaptive Hybrid ANC up to -48dB depth',
      'Dynamic head-tracking 3D spatial audio',
      '6 AI beamforming microphones for studio call clarity',
      '42 hours combined battery with fast USB-C & Qi charge',
      'Ultra-low 38ms gaming latency mode'
    ],
    specs: [
      { label: 'Driver Size', value: '11mm Liquid Silicone / Titanium' },
      { label: 'ANC Depth', value: '-48 dB Adaptive' },
      { label: 'Battery Life', value: '9h buds / 42h with case' },
      { label: 'Water Rating', value: 'IP55 Sweat & Dust Proof' },
      { label: 'Bluetooth', value: 'v5.4 with Multipoint 2-device' }
    ],
    colorOptions: [
      { name: 'Matte Onyx', hex: '#18181b' },
      { name: 'Glacier White', hex: '#e4e4e7' },
      { name: 'Cobalt Navy', hex: '#1e3a8a' }
    ]
  },
  {
    id: 'md-ear-02',
    sku: 'MD-EAR-SPT',
    name: 'TrueFit Carbon Sport Earbuds',
    category: 'earbuds',
    categoryLabel: 'AirPods & Earbuds',
    tagline: 'Secure-lock ear fins, IP68 fully waterproof with deep bass punch for workouts',
    description: 'Designed specifically for high-intensity training, marathon runs, and outdoor sports. Features ergonomic silicone wingtips that lock comfortably, ambient awareness pass-through mode, and sweat-sealed acoustic chambers.',
    price: 24900,
    originalPrice: 33000,
    rating: 4.7,
    reviewCount: 167,
    stock: 22,
    minThreshold: 5,
    reorderQuantity: 30,
    autoReorderEnabled: true,
    costPrice: 10500,
    supplier: 'NanoSilicon Audio Shenzhen',
    totalSold: 420,
    iconType: 'earbuds',
    featured: false,
    warranty: '1 Year Full Replacement',
    features: [
      'IP68 submersible waterproof rating',
      'Ergonomic wingtips with 4 customized fit sizes',
      'BassBoost DSP engineered for workout cadence',
      'Physical tactile button controls (no sweat misfires)',
      '32 hours playtime with rugged aluminum carabiner case'
    ],
    specs: [
      { label: 'Water Resistance', value: 'IP68 (Up to 1.5m submerged)' },
      { label: 'Playtime', value: '8 hours single / 32 hours total' },
      { label: 'Weight', value: '4.8g per earbud' },
      { label: 'Charging', value: '10 min quick charge = 2 hours' }
    ]
  },

  // 3. ELECTRONIC ITEMS & GADGETS
  {
    id: 'md-gdt-01',
    sku: 'MD-GDT-WATCH',
    name: 'ApexFit Pro Titanium Smartwatch',
    category: 'gadgets',
    categoryLabel: 'Smart Gadgets',
    tagline: '1.43-inch Sapphire AMOLED display with dual-band GPS and ECG heart health monitor',
    description: 'Aerospace-grade grade-5 titanium bezel with sapphire crystal glass. Features continuous ECG, blood oxygen SpO2 monitoring, 120+ workout modes, offline mapping, and a 14-day ultra battery endurance.',
    price: 61000,
    originalPrice: 80000,
    rating: 4.8,
    reviewCount: 204,
    stock: 14,
    minThreshold: 5,
    reorderQuantity: 20,
    autoReorderEnabled: true,
    costPrice: 32000,
    supplier: 'Apex MicroTech Seoul',
    totalSold: 540,
    iconType: 'gadget',
    featured: true,
    badge: 'Popular',
    warranty: '2 Year Comprehensive Warranty',
    features: [
      '1.43" AMOLED 1000-nit high-brightness display',
      'Aerospace Titanium Grade-5 case + Sapphire glass',
      'Medical-grade ECG and AFib detection algorithm',
      'Dual-frequency L1/L5 GPS for pinpoint tracking',
      '5 ATM waterproof (50 meters swimming proof)'
    ],
    specs: [
      { label: 'Display', value: '1.43" AMOLED, 466x466 (326 PPI)' },
      { label: 'Battery Life', value: '14 Days Typical / 36h GPS' },
      { label: 'Sensors', value: 'Optical PPG, ECG, Barometer, Compass' },
      { label: 'Compatibility', value: 'iOS 14+ & Android 8.0+' }
    ]
  },

  // 4. CCTV & SECURITY CAMERAS
  {
    id: 'md-cam-01',
    sku: 'MD-CAM-4K',
    name: 'Sentinel 4K Solar PTZ Outdoor Security Camera',
    category: 'cctv-cameras',
    categoryLabel: 'CCTV & Security',
    tagline: '360° pan-tilt coverage with continuous solar charging and starlight color night vision',
    description: 'Never worry about climbing ladders to recharge batteries. The Sentinel 4K is powered by an integrated high-efficiency monocrystalline solar panel, full 360° horizontal rotation, human/vehicle AI motion tracking, and instant push sirens.',
    price: 44000,
    originalPrice: 60000,
    rating: 4.9,
    reviewCount: 310,
    stock: 11,
    minThreshold: 5,
    reorderQuantity: 25,
    autoReorderEnabled: true,
    costPrice: 21500,
    supplier: 'OptiVision Security Systems',
    totalSold: 672,
    iconType: 'cctv',
    featured: true,
    badge: 'Top Security',
    warranty: '2 Year Direct Replacement',
    features: [
      'Crystal 4K Ultra HD (3840 x 2160) recording',
      '360° Pan and 110° Tilt robotic motor',
      'Infinite solar power via 6W high-gain panel',
      'Full Color Night Vision with dual floodlights',
      'Local MicroSD (up to 256GB) + encrypted zero-fee storage'
    ],
    specs: [
      { label: 'Resolution', value: '4K UHD (8 Megapixels)' },
      { label: 'Field of View', value: '135° diagonal, 360° mechanical' },
      { label: 'Connectivity', value: '2.4GHz Wi-Fi with dual antennas' },
      { label: 'Weatherproof', value: 'IP66 Extreme Weather Rated' },
      { label: 'Night Vision', value: 'Starlight Color up to 30 meters' }
    ]
  },
  {
    id: 'md-cam-02',
    sku: 'MD-CAM-DOME',
    name: 'NightEye Dual-Lens 360 Smart Dome Cam',
    category: 'cctv-cameras',
    categoryLabel: 'CCTV & Security',
    tagline: 'Dual lenses for simultaneously wide panoramic view and 8x optical telephoto detail',
    description: 'The smart dome camera that eliminates all blind spots. One fixed ultra-wide lens monitors the perimeter while the second auto-tracking telephoto lens zooms in on faces and license plates automatically.',
    price: 33000,
    originalPrice: 44000,
    rating: 4.8,
    reviewCount: 112,
    stock: 3,
    minThreshold: 5,
    reorderQuantity: 20,
    autoReorderEnabled: true,
    costPrice: 16000,
    supplier: 'OptiVision Security Systems',
    totalSold: 295,
    iconType: 'cctv',
    featured: false,
    warranty: '2 Year Warranty',
    features: [
      'Dual optical lenses with 8x hybrid zoom',
      'Two-way real-time audio intercom with noise reduction',
      'Smart perimeter boundary tripwire alarm',
      'H.265 high-efficiency video compression',
      'Works with Google Home and Alexa screens'
    ],
    specs: [
      { label: 'Resolution', value: '2K QHD Dual Sensor' },
      { label: 'Audio', value: 'Full Duplex Mic & 90dB Siren' },
      { label: 'Power Source', value: '12V DC Adapter or PoE' },
      { label: 'Storage', value: 'MicroSD / NAS RTSP Stream' }
    ]
  },

  // 5. MOBILE ACCESSORIES
  {
    id: 'md-acc-01',
    sku: 'MD-ACC-GAN65',
    name: 'VoltSpeed 65W GaN Dual-Port Fast Charger',
    category: 'mobile-accessories',
    categoryLabel: 'Mobile Accessories',
    tagline: 'Next-gen Gallium Nitride tech delivers 65W laptop + phone charging in palm size',
    description: 'Charge your MacBook Pro, iPhone, Samsung Galaxy, and accessories simultaneously at peak speeds. 50% smaller than standard bricks with 10-point active thermal protection to keep devices cool.',
    price: 10900,
    originalPrice: 15000,
    rating: 4.9,
    reviewCount: 420,
    stock: 45,
    minThreshold: 10,
    reorderQuantity: 50,
    autoReorderEnabled: true,
    costPrice: 3900,
    supplier: 'VoltMax Power Labs',
    totalSold: 1240,
    iconType: 'cable-charger',
    featured: true,
    badge: 'Must Have',
    warranty: '2 Year Replacement Guarantee',
    features: [
      'Gallium Nitride III architecture for cooler operation',
      'Dual USB-C Power Delivery 3.0 + QC 4.0 ports',
      'Powers laptops, tablets, and phones simultaneously',
      'Foldable travel prongs with international voltage (100-240V)',
      'Intelligent dynamic power allocation chips'
    ],
    specs: [
      { label: 'Max Output', value: '65W Max Single Port' },
      { label: 'Ports', value: '2x USB-C (PD), 1x USB-A (QC)' },
      { label: 'Dimensions', value: '52 x 48 x 31 mm' },
      { label: 'Certifications', value: 'CE, FCC, RoHS, UL Tested' }
    ]
  },
  {
    id: 'md-acc-02',
    sku: 'MD-ACC-MAGBNK',
    name: 'MagCore 10,000mAh Magnetic Wireless Power Bank',
    category: 'mobile-accessories',
    categoryLabel: 'Mobile Accessories',
    tagline: 'Snap-on MagSafe wireless charging with zinc alloy kickstand and 20W PD output',
    description: 'Engineered with ultra-strong N52 neodymium magnets that click securely to iPhone 12/13/14/15/16 models and magnetic cases. Features a fold-out metal kickstand for hands-free video watching while charging.',
    price: 13500,
    originalPrice: 19000,
    rating: 4.8,
    reviewCount: 185,
    stock: 19,
    minThreshold: 8,
    reorderQuantity: 30,
    autoReorderEnabled: true,
    costPrice: 5800,
    supplier: 'VoltMax Power Labs',
    totalSold: 580,
    iconType: 'cable-charger',
    featured: false,
    warranty: '18 Month Warranty',
    features: [
      '15W Fast Wireless MagSafe-compatible charging',
      '20W USB-C bidirectional fast charge/discharge',
      'Integrated aerospace zinc alloy viewing kickstand',
      'Slim 14.8mm profile that doesn’t block camera lenses',
      'Smart LED power capacity indicator'
    ],
    specs: [
      { label: 'Battery Capacity', value: '10,000 mAh (38.5 Wh)' },
      { label: 'Magnetic Strength', value: '12N Ultra-Strong Lock' },
      { label: 'Dimensions', value: '105 x 68 x 15 mm' },
      { label: 'Weight', value: '198 grams' }
    ]
  },

  // 6. COMPUTER ACCESSORIES
  {
    id: 'md-pc-01',
    sku: 'MD-PC-KB87',
    name: 'Tactix-87 Mechanical Hot-Swap Wireless Keyboard',
    category: 'computer-accessories',
    categoryLabel: 'Computer Accessories',
    tagline: 'CNC aluminum body, pre-lubed Gateron Yellow switches, and gasket-mounted acoustic foam',
    description: 'The definitive mechanical typing experience. Built with a solid CNC anodized aluminum chassis, 5-layer sound-dampening foam, custom PBT dye-sub keycaps, and tri-mode connectivity (2.4GHz wireless, Bluetooth 5.2, and USB-C).',
    price: 35900,
    originalPrice: 49900,
    rating: 4.9,
    reviewCount: 230,
    stock: 12,
    minThreshold: 6,
    reorderQuantity: 20,
    autoReorderEnabled: true,
    costPrice: 18000,
    supplier: 'Tactix Input Works Tokyo',
    totalSold: 610,
    iconType: 'keyboard',
    featured: true,
    badge: 'Pro Tier',
    warranty: '2 Year Warranty',
    features: [
      'Gasket mount structure with poron foam layers',
      'Hot-swappable PCB supports 3-pin and 5-pin switches',
      'South-facing per-key RGB with custom lighting profiles',
      'CNC machined 6063 aluminum housing',
      '4,000 mAh battery for up to 200 hours wireless typing'
    ],
    specs: [
      { label: 'Layout', value: 'Tenkeyless (87 Keys) ANSI' },
      { label: 'Switches', value: 'Gateron Pro Yellow Linear' },
      { label: 'Keycaps', value: 'Cherry Profile PBT Dye-Sub' },
      { label: 'Weight', value: '1,350g (Solid Deck)' },
      { label: 'Polling Rate', value: '1,000 Hz Wired / 2.4G' }
    ]
  },
  {
    id: 'md-pc-02',
    sku: 'MD-PC-MOUSE',
    name: 'PrecisionPro Ergonomic Wireless Optical Mouse',
    category: 'computer-accessories',
    categoryLabel: 'Computer Accessories',
    tagline: '57° natural handshake vertical ergonomic angle with PixArt 26K DPI optical sensor',
    description: 'Eliminate wrist fatigue during extended workday hours. Designed in consultation with ergonomic specialists, featuring silent clicks, machined knurled metal scroll wheel, thumb gesture button, and instant multi-device flow switching.',
    price: 19200,
    originalPrice: 24900,
    rating: 4.8,
    reviewCount: 154,
    stock: 25,
    minThreshold: 8,
    reorderQuantity: 35,
    autoReorderEnabled: true,
    costPrice: 7800,
    supplier: 'Tactix Input Works Tokyo',
    totalSold: 490,
    iconType: 'mouse',
    featured: false,
    warranty: '2 Year Warranty',
    features: [
      '57° scientific vertical angle promotes neutral wrist posture',
      'Whisper-quiet acoustic dampening clicks (90% noise reduction)',
      'PixArt 26,000 DPI adjustable optical tracking sensor',
      'Pairs with up to 3 devices simultaneously with 1-tap switch',
      'Rechargeable USB-C with 90-day battery life per charge'
    ],
    specs: [
      { label: 'Sensor', value: 'PixArt 26K Optical Engine' },
      { label: 'Connectivity', value: '2.4GHz RF + Bluetooth 5.3 + Type-C' },
      { label: 'Buttons', value: '6 Programmable Controls' },
      { label: 'Battery', value: '500 mAh Li-ion (90 days)' }
    ]
  }
];

export const INITIAL_REVIEWS: Record<string, ProductReview[]> = {
  'md-jlab-lux-01': [
    {
      id: 'rev-jlab-01',
      author: 'Hamza Tariq (Lahore)',
      rating: 5,
      date: 'October 27, 2026',
      title: 'The Sage finish is pure elegance. ANC blocks traffic completely.',
      comment: 'Ordered from MegaDukan and received in 24 hours. The Sage colorway has a gorgeous matte texture. The Hybrid ANC silences gym noise and traffic rumble effortlessly, and the Cloud Foam ear cushions are by far the most comfortable I have worn with spectacles.',
      verifiedPurchase: true,
      helpfulCount: 52
    },
    {
      id: 'rev-jlab-02',
      author: 'Ayesha Malik (Karachi)',
      rating: 5,
      date: 'October 25, 2026',
      title: 'Battery life is astonishing — over 70 hours is real!',
      comment: 'I travel between Karachi and Islamabad frequently. I haven\'t charged them in nearly two weeks of heavy daily use. The spatial audio with Dolby Atmos movies on Netflix makes it feel like an actual cinema. Worth every rupee.',
      verifiedPurchase: true,
      helpfulCount: 38
    },
    {
      id: 'rev-jlab-03',
      author: 'Zubair Ahmed (Islamabad)',
      rating: 5,
      date: 'October 21, 2026',
      title: 'Premium sound & multipoint switching works seamlessly',
      comment: 'Connecting to both my MacBook for Zoom meetings and phone for music works without lag. The JLab App lets you tune the EQ directly. At Rs. 22,499, this easily beats headphones costing double.',
      verifiedPurchase: true,
      helpfulCount: 26
    }
  ],
  'md-spk-01': [
    {
      id: 'rev-01',
      author: 'Marcus Vance',
      rating: 5,
      date: 'October 18, 2026',
      title: 'Mindblowing bass and clarity for its compact size',
      comment: 'Replaced a bulky wired sound system with this SonicBeam 360 in my studio apartment. The 360-degree dispersion is real—no matter where you stand in the room, highs are crisp and the bass has real physical punch.',
      verifiedPurchase: true,
      helpfulCount: 42
    },
    {
      id: 'rev-02',
      author: 'Elena Rostova',
      rating: 5,
      date: 'October 10, 2026',
      title: 'High-end industrial design, feels like luxury hardware',
      comment: 'The anodized charcoal finish and copper rim looks gorgeous on our walnut console. Battery easily lasted an entire weekend cabin trip without needing a charge.',
      verifiedPurchase: true,
      helpfulCount: 29
    },
    {
      id: 'rev-03',
      author: 'Tariq Al-Mansoor',
      rating: 4,
      date: 'September 28, 2026',
      title: 'Exceptional sound, app setup took a few minutes',
      comment: 'Audio quality is 10/10. Once paired via Wi-Fi 6, latency is nonexistent. MegaDukan delivered it in 24 hours with flawless tamper-proof packaging.',
      verifiedPurchase: true,
      helpfulCount: 15
    }
  ],
  'md-ear-01': [
    {
      id: 'rev-11',
      author: 'David Chen',
      rating: 5,
      date: 'October 24, 2026',
      title: 'Active noise cancellation rivals top tier flagships',
      comment: 'I take the metro subway twice daily; with ANC turned on at 70%, train rumble completely vanishes. Mic quality during Zoom calls in windy streets is unmatched.',
      verifiedPurchase: true,
      helpfulCount: 68
    },
    {
      id: 'rev-12',
      author: 'Sarah Jenkins',
      rating: 5,
      date: 'October 20, 2026',
      title: 'Best earbuds I have owned. Fits securely.',
      comment: 'The spatial audio mode while watching movies on my iPad is fantastic. Snug fit in the ear canal without fatigue after 4 hours continuous use.',
      verifiedPurchase: true,
      helpfulCount: 31
    }
  ],
  'md-cam-01': [
    {
      id: 'rev-21',
      author: 'Robert Sterling',
      rating: 5,
      date: 'October 15, 2026',
      title: 'Solar keeps it at 100% battery without any cables',
      comment: 'Installed this overlooking our driveway. Even on overcast autumn days, the solar panel keeps the internal battery completely charged. Color night vision at 2 AM is sharp enough to read delivery license plates clearly.',
      verifiedPurchase: true,
      helpfulCount: 54
    }
  ],
  'md-acc-01': [
    {
      id: 'rev-31',
      author: 'Priya Sharma',
      rating: 5,
      date: 'October 22, 2026',
      title: 'One charger to rule them all',
      comment: 'Throws enough power to charge my 14-inch laptop and fast charge my phone at the exact same time. Super small in my backpack.',
      verifiedPurchase: true,
      helpfulCount: 38
    }
  ],
  'md-pc-01': [
    {
      id: 'rev-41',
      author: 'Julian Thorne',
      rating: 5,
      date: 'October 12, 2026',
      title: 'The acoustic dampening on this board is incredible',
      comment: 'Heavy, immovable on the desk, satisfying creamy deep clack from the pre-lubed Gateron Yellows. Easily feels like a custom keyboard build.',
      verifiedPurchase: true,
      helpfulCount: 47
    }
  ]
};
