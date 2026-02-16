import {
  Factory,
  Zap,
  Settings,
  Flame,
  Hammer,
  Gem,
  Thermometer,
  Instagram,
  Facebook,
  Store,
} from "lucide-react";

export interface Product {
  id: string;
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  specifications: Record<string, string>;
  applications: string[];
  images: string[]; // URLs
}

export interface Founder {
  name: string;
  role: string;
  image: string;
  quote: string;
  bio: string;
}

export interface Testimonial {
  id: number | string;
  name: string;
  company: string;
  content: string;
  rating: number;
}

export interface FAQ {
  question: string;
  answer: string;
}

export const products: Product[] = [
  {
    id: "p1",
    slug: "induction-melting-furnace",
    title: "Induction Melting Furnace",
    category: "Melting",
    shortDescription:
      "High-efficiency melting for steel, iron, copper, and precious metals.",
    fullDescription:
      "Our signature Induction Melting Furnaces are engineered for maximum efficiency and reliability. Designed to handle a wide range of metals including steel, stainless steel, iron, copper, brass, silver, and gold. Featuring advanced IGBT technology, these furnaces ensure rapid melting with minimal energy consumption.",
    features: [
      "High Energy Efficiency (>97%)",
      "Advanced IGBT Technology",
      "Rapid Melting Cycle",
      "Compact & Robust Design",
      "Low Maintenance Cost",
      "User-friendly Interface",
    ],
    specifications: {
      Capacity: "5kg to 5000kg",
      "Power Range": "15kW to 2000kW",
      Frequency: "500Hz to 10kHz",
      "Cooling System": "Water Cooled",
      Voltage: "380V / 415V / 440V",
    },
    applications: [
      "Foundries",
      "Metal Casting",
      "Precious Metal Refining",
      "Automotive Parts Manufacturing",
    ],
    images: ["/placeholder/melting-1.jpg", "/placeholder/melting-2.jpg"],
  },
  {
    id: "p2",
    slug: "steel-frame-melting-furnace",
    title: "Steel Frame Melting Furnace",
    category: "Melting",
    shortDescription:
      "Robust steel frame construction for heavy-duty industrial melting.",
    fullDescription:
      "Built for the toughest industrial environments, the Steel Frame Melting Furnace offers superior structural integrity and magnetic shielding. The hydraulic tilting mechanism ensures smooth and precise pouring, making it ideal for large-scale foundry operations.",
    features: [
      "Heavy Duty Steel Structure",
      "Hydraulic Tilting Mechanism",
      "Magnetic Flux Guides for Efficiency",
      "Enhanced Safety Features",
      "Long Service Life",
    ],
    specifications: {
      Capacity: "500kg to 10,000kg",
      "Power Range": "250kW to 4000kW",
      "Tilt Angle": "95 Degrees",
      "Control System": "PLC with HMI",
    },
    applications: ["Steel Plants", "Heavy Engineering", "Large Rolling Mills"],
    images: ["/placeholder/steel-frame-1.jpg"],
  },
  {
    id: "p3",
    slug: "induction-hardening-machine",
    title: "Induction Hardening Machine",
    category: "Hardening",
    shortDescription:
      "Precision surface hardening for shafts, gears, and automotive components.",
    fullDescription:
      "Amar Induction's Vertical and Horizontal Hardening Scanners provide precise control over hardening depth and pattern. Ideal for localized heat treatment of shafts, gears, spindles, and axles, improving wear resistance and fatigue life.",
    features: [
      "Precise Hardness Depth Control",
      "Servo-Driven Scanning",
      "Integrated Quenching System",
      "Recipe Management System",
      "Distortion Control",
    ],
    specifications: {
      "Scanning Length": "Up to 1500mm",
      "Job Diameter": "Up to 300mm",
      Power: "30kW to 200kW",
      Frequency: "10kHz to 100kHz",
    },
    applications: [
      "Automotive Gears",
      "Shafts & Axles",
      "Hand Tools",
      "Machine Tools",
    ],
    images: ["/placeholder/hardening-1.jpg"],
  },
  {
    id: "p4",
    slug: "induction-forging-machine",
    title: "Induction Billet Heater",
    category: "Forging",
    shortDescription: "Continuous billet heating for hot forging applications.",
    fullDescription:
      "Designed for the forging industry, our continuous billet heaters ensure uniform heating of billets before forging. The system includes an automatic feeding mechanism and temperature monitoring to ensure high-quality forged parts.",
    features: [
      "Uniform Heating Profile",
      "Automatic Billet Feeder",
      "Pyrometer Temperature Control",
      "Quick Coil Change System",
      "Energy Efficient",
    ],
    specifications: {
      "Billet Size": "20mm to 150mm",
      Throughput: "Up to 2 Tons/Hour",
      Material: "Steel, Brass, Aluminum",
      "Temperature accuracy": "+/- 10°C",
    },
    applications: [
      "Nut & Bolt Making",
      "Automotive Forging",
      "Hand Tool Manufacturing",
    ],
    images: ["/placeholder/forging-1.jpg"],
  },
  {
    id: "p5",
    slug: "gold-melting-machine",
    title: "Gold Melting Machine",
    category: "Jewellery",
    shortDescription:
      "Compact and fast melting for gold, silver, and precious metals.",
    fullDescription:
      "A specialized machine for jewellers and refiners. It offers fast melting times to minimize metal loss and ensure high purity. Compact enough for small workshops but powerful enough for continuous operation.",
    features: [
      "Rapid Melting (4-5 mins)",
      "Digital Temperature Control",
      "Compact Tabletop Design",
      "Easy Pouring Mechanism",
      "Gold Loss Minimization",
    ],
    specifications: {
      Capacity: "1kg, 2kg, 5kg",
      "Max Temperature": "1200°C",
      Power: "3kW to 8kW",
    },
    applications: ["Jewellery Manufacturing", "Gold Refineries", "Dental Labs"],
    images: ["/placeholder/gold-melting-1.jpg"],
  },
  {
    id: "p6",
    slug: "induction-brazing-machine",
    title: "Induction Brazing Machine",
    category: "Brazing",
    shortDescription:
      "Clean and localized heating for high-quality brazing joints.",
    fullDescription:
      "Replaces conventional gas torch brazing with consistent, flameless induction heating. Perfect for carbide tip brazing, copper tube joining, and rotor brazing.",
    features: [
      "Flameless Heating",
      "Consistent Joint Quality",
      "Reduced Oxidation",
      "Portable Handheld Transformers available",
      "Safer Work Environment",
    ],
    specifications: {
      Power: "5kW to 50kW",
      Frequency: "30kHz to 100kHz",
      Cooling: "Water/Air Cooled",
    },
    applications: ["Tool Tipping", "HVAC Pipe Joining", "Motor Rotor Brazing"],
    images: ["/placeholder/brazing-1.jpg"],
  },
];

export const founder: Founder = {
  name: "Mr. Nikunj Asodariya",
  role: "Founder & CEO",
  image: "/placeholder/founder.jpg",
  quote:
    "At Amar Induction, we don't just build machines; we engineer reliability. Our mission is to empower industries with technology that stands the test of time.",
  bio: "Founded in 2023, Amar Induction is the brainchild of Mr. Nikunj Asodariya. With a vision to bring world-class heating solutions to the global market, he has rapidly established the company as a leader in induction technology, focusing on innovation, efficiency, and customer satisfaction.",
};

export const stats = [
  {label: "Years of Experience", value: 3, suffix: "+"},
  {label: "Machines Installed", value: 350, suffix: "+"}, // Adjusted realistic number for 2023 start
  {label: "Countries Served", value: 5, suffix: "+"},
  {label: "Happy Clients", value: 120, suffix: "+"},
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Rajesh Kumar",
    company: "Apex Castings Ltd.",
    content:
      "The efficiency of Amar Induction's melting furnace is unmatched. We reduced our power consumption by 15% within the first month of installation.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Williams",
    company: "Global Tech Forging",
    content:
      "Their hardening scanners are incredibly precise. We've achieved zero rejection rates on our automotive shaft lines since switching to Amar.",
    rating: 5,
  },
  {
    id: 3,
    name: "Vikram Singh",
    company: "Gold Star Refinery",
    content:
      "Best in class service. The team at Amar Induction is always available for support, and their gold melting machines are very reliable.",
    rating: 4,
  },
];

export const faqs: FAQ[] = [
  {
    question: "What types of metals can your furnaces melt?",
    answer:
      "Our furnaces are versatile and can melt ferrous metals like steel and iron, as well as non-ferrous metals like copper, aluminum, brass, gold, and silver.",
  },
  {
    question: "Do you provide installation and training?",
    answer:
      "Yes, we provide complete on-site installation and operator training to ensure your team is proficient in using and maintaining the equipment.",
  },
  {
    question: "What is the warranty period for your machines?",
    answer:
      "We offer a standard 12-month warranty on all our machines, covering manufacturing defects. Extended warranty packages are also available.",
  },
  {
    question: "Can you customize a machine for my specific needs?",
    answer:
      "Absolutely. A significant part of our business is custom-engineered solutions. Our design team will work with you to build a machine that fits your specific process and layout.",
  },
];

export const categories = [
  {name: "Melting", icon: Factory, slug: "melting"},
  {name: "Hardening", icon: Zap, slug: "hardening"},
  {name: "Forging", icon: Hammer, slug: "forging"},
  {name: "Brazing", icon: Flame, slug: "brazing"},
  {name: "Jewellery", icon: Gem, slug: "jewellery"},
  {name: "Heating", icon: Thermometer, slug: "heating"},
];

export const socialLinks = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/amar_induction/",
    icon: Instagram,
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/profile.php?id=61579929251538",
    icon: Facebook,
  },
  {
    name: "Indiamart",
    url: "https://www.indiamart.com/amar-induction/",
    icon: Store,
  },
];
