export interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    image: string;
    description?: string;
    features?: string[];
    specifications?: Record<string, string>;
    idealFor?: string[];
}

export const products: Product[] = [
    {
        id: 1,
        name: "Foldable Aluminium Walking Stick | Lightweight Adjustable Cane for Men, Women & Seniors",
        price: 999,
        category: "Walking Sticks",
        image: "/images/products/folding-stick.jpg",
        description: "A premium, lightweight aluminium walking stick designed for maximum stability and portable convenience. Perfect for daily use and travel.",
        features: [
            "Lightweight Aluminium Frame",
            "Height Adjustable (10 levels)",
            "Foldable for easy storage",
            "Ergonomic T-shape handle"
        ],
        specifications: {
            "Material": "Anodized Aluminium",
            "Weight": "450g",
            "Weight Capacity": "100kg",
            "Height Range": "75cm - 98cm",
            "Color": "Black / Silver"
        },
        idealFor: ["Elderly People", "Post-surgery recovery", "Daily walk assistance"]
    },
    {
        id: 2,
        name: "Foldable Round Commode Chair with Pot Bucket & Handrest | Portable & Durable, Universal Size",
        price: 3499,
        category: "Commode Chairs",
        image: "/images/products/foldable-round-commode-chair.jpg",
        description: "Designed for comfort and hygiene, this foldable commode chair is a reliable solution for those with mobility challenges. Features a secure bucket and comfortable handrests.",
        features: [
            "Heavy-duty MS Powder coated frame",
            "Removable pot with lid",
            "Foldable for space-saving",
            "Anti-slip rubber tips"
        ],
        specifications: {
            "Material": "Mild Steel (MS)",
            "Bucket Capacity": "5 Liters",
            "Weight Capacity": "120kg",
            "Seat Height": "Adjustable",
            "Width": "55cm"
        },
        idealFor: ["Patients with limited mobility", "Maternity care", "Bedridden patients"]
    },
    {
        id: 3,
        name: "Premium Aluminium Walker For Adults Foldable Light Weight Height Adjustable Comfortable Grip",
        price: 2860,
        category: "Walkers",
        image: "/images/products/adjustable-walker.jpg",
        description: "A robust yet lightweight walker that provides excellent balance. The foldable design makes it perfect for moving around the house or taking in a car.",
        features: [
            "Single-button folding mechanism",
            "Extra-wide base for stability",
            "Comfortable PVC hand grips",
            "Rust-resistant finish"
        ],
        specifications: {
            "Material": "Premium Aluminium",
            "Weight": "2.8kg",
            "Weight Capacity": "130kg",
            "Folding Mechanism": "One-button",
            "Height Adjustment": "8-levels"
        },
        idealFor: ["Late-stage rehabilitation", "Chronic balance issues", "Independent mobility"]
    },
    {
        id: 4,
        name: "Mild Steel Folding Shower Commode Stool - Mobile Toilet Seat for Elderly, Disabled, Pregnant Women",
        price: 2499,
        category: "Commode Chairs",
        image: "/images/products/commode-stool.jpg",
        description: "Versatile 2-in-1 stool that functions as both a shower chair and a commode. Lightweight enough to be moved easily but sturdy enough for safety.",
        features: [
            "Water-resistant coating",
            "Wide comfortable seat",
            "Compact folding design",
            "Stable 4-point support"
        ],
        specifications: {
            "Material": "Mild Steel",
            "Coating": "Powder Coated",
            "Type": "Stool Mode",
            "Weight": "4kg"
        },
        idealFor: ["Shower safety", "Bedside use", "Pregnancy support"]
    },
    {
        id: 5,
        name: "Walking Stick with Seat (Non-height adjustable) | Ultra-Light U-Shaped Handle",
        price: 2899,
        category: "Walking Sticks",
        image: "/images/products/non-height-adjustable-walking-stick.jpg",
        description: "The ultimate 2-in-1 tool for those who need periodic rest while walking. A sturdy stick that opens into a comfortable stool in seconds.",
        features: [
            "Integrated tripod seat",
            "Lightweight body",
            "U-shaped handle for grip",
            "Anti-skid bush"
        ],
        specifications: {
            "Material": "Aluminium",
            "Seat Height": "50cm",
            "Stick Height": "85cm",
            "Seat Capacity": "85kg"
        },
        idealFor: ["Long walks", "Queuing at hospitals/temples", "Travel"]
    },
    {
        id: 6,
        name: "Walking Stick with Seat (Height adjustable) | Lightweight Aluminum & Comfortable Grip",
        price: 2999,
        category: "Walking Sticks",
        image: "/images/products/height-adjustable-walking-stick.jpg",
        description: "Everything you love about our seat-stick, now with adjustable height to ensure the perfect fit for your posture.",
        features: [
            "Height adjustable leg",
            "High-strength aluminium",
            "Comfortable ergonomic handle",
            "Folds flat in seconds"
        ],
        specifications: {
            "Material": "Grade-A Aluminium",
            "Weight Capacity": "90kg",
            "Adjustable Height": "Yes",
            "Mechanism": "Push-button lock"
        },
        idealFor: ["Variable height users", "Elderly caregivers", "Senior citizens"]
    },
    {
        id: 7,
        name: "1 Legged Walking Stick Height Adjustable Lightweight Mobility Aid for Adults and Seniors",
        price: 1599,
        category: "Walking Sticks",
        image: "/images/products/1-legged-walking-stick.jpg",
        description: "Simple, reliable, and strong. This classic walking stick is the workhorse of mobility aids.",
        features: [
            "Durable rubber ferrule",
            "T-shaped easy grip",
            "Telescopic height adjustment",
            "Scratch-resistant finish"
        ],
        specifications: {
            "Material": "Aluminium",
            "Color": "Bronze/Silver",
            "Weight": "350g",
            "Min Height": "70cm",
            "Max Height": "95cm"
        },
        idealFor: ["Basic balance support", "Daily exercise", "General aging needs"]
    },
    {
        id: 8,
        name: "Premium 4 Leg Walking Stick Light Weight Height Adjustable for Old People",
        price: 1599,
        category: "Walking Sticks",
        image: "/images/products/4-legged-walking-stick.jpg",
        description: "A Quadripod walking stick that provides four times the stability of a standard cane. Designed specifically for those with significant balance concerns.",
        features: [
            "Wide base quadripod",
            "Offset handle for better weight distribution",
            "Self-standing design",
            "Interchangeable for left/right hand"
        ],
        specifications: {
            "Material": "Hardened Metal",
            "Base Type": "Quad-Base",
            "Height Adjustable": "Yes",
            "Stability Level": "Maximum"
        },
        idealFor: ["Stroke recovery", "Severe vertigo", "Extreme instability"]
    },
    {
        id: 9,
        name: "Unisex Urine Pot 2-in-1 for Men and Women | Portable 1000 ML Medical-Grade Plastic with Cap & Lid",
        price: 499,
        category: "Urination Pot",
        image: "/images/products/urine-pot.jpg",
        description: "A hygienic and portable solution for health-care needs. Made from high-quality medical grade plastic with a leak-proof design.",
        features: [
            "1000ml Large capacity",
            "Leak-proof screw cap",
            "Universal design with adapter",
            "Graduation marks for volume"
        ],
        specifications: {
            "Material": "Medical Grade Plastic",
            "Capacity": "1000ml",
            "Type": "Unisex",
            "Washable": "Yes"
        },
        idealFor: ["Bedridden patients", "Travel emergencies", "Post-operative care"]
    }
];