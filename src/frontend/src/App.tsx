import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Battery,
  ChevronRight,
  Facebook,
  Headphones,
  Instagram,
  Minus,
  Plus,
  Search,
  Send,
  ShoppingCart,
  Star,
  Twitter,
  User,
  Volume2,
  X,
  Youtube,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const PRODUCTS = [
  {
    id: 1,
    name: "Aura Nova",
    category: "Over-Ear",
    price: 299,
    description:
      "Premium noise-cancelling over-ear headphones with 40hr battery.",
    image: "/assets/generated/headphone-overear.dim_600x600.png",
    featured: true,
  },
  {
    id: 2,
    name: "Aura Flux",
    category: "On-Ear",
    price: 199,
    description:
      "Lightweight foldable on-ear headphones, perfect for daily commute.",
    image: "/assets/generated/headphone-onear.dim_600x600.png",
    featured: false,
  },
  {
    id: 3,
    name: "Aura Buds Pro",
    category: "In-Ear",
    price: 149,
    description:
      "True wireless earbuds with active noise cancellation and 8hr playtime.",
    image: "/assets/generated/headphone-inear.dim_600x600.png",
    featured: false,
  },
  {
    id: 4,
    name: "Aura Studio X",
    category: "Studio",
    price: 449,
    description:
      "Professional studio monitor headphones for audiophiles and producers.",
    image: "/assets/generated/headphone-studio.dim_600x600.png",
    featured: false,
  },
  {
    id: 5,
    name: "Aura Strike",
    category: "Gaming",
    price: 249,
    description:
      "Immersive gaming headset with 7.1 surround sound and RGB lighting.",
    image: "/assets/generated/headphone-gaming.dim_600x600.png",
    featured: false,
  },
  {
    id: 6,
    name: "Aura Run",
    category: "Sport",
    price: 129,
    description:
      "Sweat-proof wireless sport headphones built for high-intensity workouts.",
    image: "/assets/generated/headphone-sport.dim_600x600.png",
    featured: false,
  },
];

const TESTIMONIALS = [
  {
    name: "Shubham Yagi",
    role: "Music Producer",
    text: "Aura Studio X completely transformed my mixing sessions. The precision and clarity are unmatched. Worth every cent.",
    rating: 5,
    avatar: "SY",
  },
  {
    name: "Monish Bhoi",
    role: "Daily Commuter",
    text: "I wear Aura Flux every single day. The noise cancellation on the subway is a game-changer. Lightweight and stylish!",
    rating: 5,
    avatar: "MB",
  },
  {
    name: "Shudanshu Dakait",
    role: "Fitness Enthusiast",
    text: "Aura Run stays in place through the most intense workouts. Sweat-proof and the sound pumps you up. Love it.",
    rating: 5,
    avatar: "SD",
  },
];

const FEATURES = [
  {
    key: "anc",
    icon: <Volume2 size={28} />,
    title: "Active Noise Cancelling",
    desc: "Industry-leading ANC blocks out up to 98% of ambient noise for pure, uninterrupted listening.",
  },
  {
    key: "sound",
    icon: <Zap size={28} />,
    title: "Personalized Sound",
    desc: "Adaptive EQ learns your preferences and calibrates audio for your unique hearing profile.",
  },
  {
    key: "battery",
    icon: <Battery size={28} />,
    title: "30+ Hour Battery",
    desc: "Flagship models deliver over 30 hours of playback on a single charge, with fast-charge support.",
  },
];

const SOCIAL_ICONS = [
  { key: "instagram", Icon: Instagram },
  { key: "twitter", Icon: Twitter },
  { key: "youtube", Icon: Youtube },
  { key: "facebook", Icon: Facebook },
];

const FOOTER_PRODUCTS = [
  "Over-Ear",
  "On-Ear",
  "In-Ear / Buds",
  "Studio",
  "Gaming",
  "Sport",
];
const FOOTER_COMPANY = [
  "About Aura",
  "Careers",
  "Press",
  "Sustainability",
  "Investors",
];
const FOOTER_LEGAL = ["Privacy Policy", "Terms of Service", "Cookie Policy"];
const STATS = [
  { val: "40+", label: "Hours Battery" },
  { val: "98%", label: "Noise Block" },
  { val: "50K+", label: "Happy Customers" },
];

type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  qty: number;
};

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [form, setForm] = useState({ name: "", email: "", address: "" });
  const [emailInput, setEmailInput] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);
  const cartTotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);

  const addToCart = (product: (typeof PRODUCTS)[0]) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing)
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i,
        );
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          qty: 1,
        },
      ];
    });
  };

  const updateQty = (id: number, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0),
    );
  };

  const handleCheckout = () => {
    setOrderSuccess(true);
    setCartItems([]);
    setForm({ name: "", email: "", address: "" });
  };

  const filteredProducts =
    activeCategory === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  const categories = [
    "All",
    ...Array.from(new Set(PRODUCTS.map((p) => p.category))),
  ];

  return (
    <div style={{ backgroundColor: "#0B0B0B", minHeight: "100vh" }}>
      {/* Navbar */}
      <header
        data-ocid="nav.panel"
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled
            ? "rgba(11,11,11,0.95)"
            : "rgba(11,11,11,0.7)",
          backdropFilter: "blur(12px)",
          borderBottom: scrolled
            ? "1px solid #2F2F2F"
            : "1px solid transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" data-ocid="nav.link" className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: "#B8FF1A",
                boxShadow: "0 0 15px #B8FF1A80",
              }}
            >
              <Headphones size={16} color="#0B0B0B" strokeWidth={2.5} />
            </div>
            <span
              className="text-xl font-black tracking-widest"
              style={{ color: "#B8FF1A", textShadow: "0 0 10px #B8FF1A80" }}
            >
              AURA
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {["Home", "Products", "Tech", "Support", "Story"].map((link) => (
              <a
                key={link}
                data-ocid="nav.link"
                href={link === "Products" ? "#products" : "/"}
                className="text-sm font-medium tracking-wide transition-colors duration-200 hover:text-neon"
                style={{ color: link === "Home" ? "#B8FF1A" : "#B8B8B8" }}
              >
                {link.toUpperCase()}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              type="button"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Search size={20} />
            </button>
            <button
              type="button"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <User size={20} />
            </button>
            <button
              type="button"
              data-ocid="cart.button"
              className="relative text-gray-400 hover:text-white transition-colors"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center"
                  style={{ backgroundColor: "#B8FF1A", color: "#0B0B0B" }}
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/assets/generated/hero-model.dim_1200x800.jpg')",
          }}
        />
        <div className="absolute inset-0 hero-gradient" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, transparent 60%, #0B0B0B 100%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 flex items-center w-full">
          <motion.div
            className="max-w-xl"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p
              className="text-sm font-semibold tracking-[0.3em] mb-4"
              style={{ color: "#B8FF1A" }}
            >
              AURA PREMIUM AUDIO
            </p>
            <h1 className="text-5xl md:text-7xl font-black uppercase leading-none text-white mb-6">
              SOUNDS THAT
              <br />
              <span
                style={{ color: "#B8FF1A", textShadow: "0 0 30px #B8FF1A60" }}
              >
                FITS YOUR
              </span>
              <br />
              LIFE.
            </h1>
            <p className="text-base mb-8" style={{ color: "#B8B8B8" }}>
              Experience audio the way it was meant to be heard.
              Precision-engineered for those who demand perfection.
            </p>
            <div className="flex gap-4 flex-wrap">
              <a
                href="#products"
                data-ocid="hero.primary_button"
                className="neon-btn px-8 py-4 rounded-full font-bold text-sm tracking-widest uppercase inline-flex items-center gap-2"
              >
                SHOP NOW <ChevronRight size={16} />
              </a>
              <button
                type="button"
                className="px-8 py-4 rounded-full font-bold text-sm tracking-widest uppercase border text-white transition-colors hover:border-neon hover:text-neon"
                style={{ borderColor: "#2F2F2F" }}
              >
                LEARN MORE
              </button>
            </div>

            <div className="flex gap-8 mt-12">
              {STATS.map((s) => (
                <div key={s.label}>
                  <div
                    className="text-2xl font-black"
                    style={{ color: "#B8FF1A" }}
                  >
                    {s.val}
                  </div>
                  <div className="text-xs" style={{ color: "#9A9A9A" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
        >
          <div className="text-xs tracking-widest" style={{ color: "#9A9A9A" }}>
            SCROLL
          </div>
          <div
            className="w-px h-8"
            style={{
              background: "linear-gradient(to bottom, #B8FF1A, transparent)",
            }}
          />
        </motion.div>
      </section>

      {/* Products */}
      <section
        id="products"
        style={{ backgroundColor: "#0B0B0B" }}
        className="py-24 px-6"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="text-sm font-semibold tracking-[0.3em] mb-3"
              style={{ color: "#B8FF1A" }}
            >
              COLLECTION
            </p>
            <h2 className="text-4xl md:text-5xl font-black uppercase text-white">
              OUR HEADPHONE FAMILY
            </h2>
            <div
              className="w-24 h-px mx-auto mt-4"
              style={{
                background:
                  "linear-gradient(to right, transparent, #B8FF1A, transparent)",
              }}
            />
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                data-ocid="products.tab"
                onClick={() => setActiveCategory(cat)}
                className="px-5 py-2 rounded-full text-sm font-semibold tracking-wide uppercase transition-all duration-200"
                style={{
                  backgroundColor:
                    activeCategory === cat ? "#B8FF1A" : "#1A1A1A",
                  color: activeCategory === cat ? "#0B0B0B" : "#9A9A9A",
                  boxShadow:
                    activeCategory === cat ? "0 0 15px #B8FF1A60" : "none",
                  border: activeCategory === cat ? "none" : "1px solid #2F2F2F",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div
            data-ocid="products.list"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  data-ocid={`products.item.${i + 1}`}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="group rounded-2xl p-6 cursor-pointer transition-all duration-300 card-hover"
                  style={{
                    backgroundColor: "#1A1A1A",
                    border: "1px solid #2F2F2F",
                  }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <span
                      className="text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
                      style={{ backgroundColor: "#242424", color: "#B8FF1A" }}
                    >
                      {product.category}
                    </span>
                    {product.featured && (
                      <span
                        className="text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
                        style={{
                          backgroundColor: "#B8FF1A20",
                          color: "#B8FF1A",
                          border: "1px solid #B8FF1A40",
                        }}
                      >
                        FEATURED
                      </span>
                    )}
                  </div>

                  <div
                    className="relative h-52 flex items-center justify-center mb-6 rounded-xl overflow-hidden"
                    style={{ backgroundColor: "#111111" }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-44 w-auto object-contain transition-transform duration-500 group-hover:scale-110"
                      style={{ filter: "drop-shadow(0 0 20px #B8FF1A40)" }}
                    />
                  </div>

                  <h3 className="text-lg font-black text-white mb-1 tracking-wide">
                    {product.name}
                  </h3>
                  <p className="text-sm mb-4" style={{ color: "#9A9A9A" }}>
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-white">
                      ${product.price}
                    </span>
                    <button
                      type="button"
                      data-ocid={`products.primary_button.${i + 1}`}
                      onClick={() => addToCart(product)}
                      className="neon-btn px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      ADD TO CART
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* The Aura Difference */}
      <section
        style={{
          backgroundColor: "#111111",
          borderTop: "1px solid #B8FF1A30",
          borderBottom: "1px solid #B8FF1A30",
        }}
        className="py-24 px-6"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="text-sm font-semibold tracking-[0.3em] mb-3"
              style={{ color: "#B8FF1A" }}
            >
              WHY AURA
            </p>
            <h2 className="text-4xl md:text-5xl font-black uppercase text-white">
              THE AURA DIFFERENCE
            </h2>
            <div
              className="w-24 h-px mx-auto mt-4"
              style={{
                background:
                  "linear-gradient(to right, transparent, #B8FF1A, transparent)",
              }}
            />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="text-center p-8 rounded-2xl"
                style={{
                  backgroundColor: "#1A1A1A",
                  border: "1px solid #2F2F2F",
                }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                  style={{
                    backgroundColor: "#B8FF1A15",
                    color: "#B8FF1A",
                    boxShadow: "0 0 20px #B8FF1A20",
                  }}
                >
                  {f.icon}
                </div>
                <h3 className="text-lg font-black text-white mb-3 uppercase tracking-wide">
                  {f.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#9A9A9A" }}
                >
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ backgroundColor: "#0B0B0B" }} className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="text-sm font-semibold tracking-[0.3em] mb-3"
              style={{ color: "#B8FF1A" }}
            >
              REVIEWS
            </p>
            <h2 className="text-4xl md:text-5xl font-black uppercase text-white">
              WHAT PEOPLE SAY
            </h2>
            <div
              className="w-24 h-px mx-auto mt-4"
              style={{
                background:
                  "linear-gradient(to right, transparent, #B8FF1A, transparent)",
              }}
            />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="p-8 rounded-2xl relative"
                style={{
                  backgroundColor: "#1A1A1A",
                  border: "1px solid #2F2F2F",
                }}
              >
                <div className="flex mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: star rating array
                    <Star key={j} size={14} fill="#B8FF1A" stroke="none" />
                  ))}
                </div>
                <p
                  className="text-base leading-relaxed mb-6 italic"
                  style={{ color: "#B8B8B8" }}
                >
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-black"
                    style={{ backgroundColor: "#B8FF1A", color: "#0B0B0B" }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{t.name}</div>
                    <div className="text-xs" style={{ color: "#9A9A9A" }}>
                      {t.role}
                    </div>
                  </div>
                </div>
                <div
                  className="absolute top-6 right-6 text-5xl font-black leading-none"
                  style={{ color: "#B8FF1A15" }}
                >
                  &ldquo;
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{ backgroundColor: "#080808", borderTop: "1px solid #B8FF1A30" }}
        className="pt-16 pb-8 px-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: "#B8FF1A",
                    boxShadow: "0 0 15px #B8FF1A80",
                  }}
                >
                  <Headphones size={16} color="#0B0B0B" strokeWidth={2.5} />
                </div>
                <span
                  className="text-xl font-black tracking-widest"
                  style={{ color: "#B8FF1A", textShadow: "0 0 10px #B8FF1A80" }}
                >
                  AURA
                </span>
              </div>
              <p
                className="text-sm leading-relaxed mb-6"
                style={{ color: "#9A9A9A" }}
              >
                Sounds that fits your life. Premium audio engineered for the
                modern world.
              </p>
              <div className="flex gap-3">
                {SOCIAL_ICONS.map(({ key, Icon }) => (
                  <button
                    key={key}
                    type="button"
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                    style={{
                      backgroundColor: "#1A1A1A",
                      color: "#9A9A9A",
                      border: "1px solid #2F2F2F",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#B8FF1A";
                      e.currentTarget.style.color = "#B8FF1A";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#2F2F2F";
                      e.currentTarget.style.color = "#9A9A9A";
                    }}
                  >
                    <Icon size={15} />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-black tracking-widest uppercase mb-4 text-white">
                Products
              </h4>
              <ul className="space-y-2">
                {FOOTER_PRODUCTS.map((l) => (
                  <li key={l}>
                    <a
                      href="#products"
                      className="text-sm transition-colors hover:text-neon"
                      style={{ color: "#9A9A9A" }}
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-black tracking-widest uppercase mb-4 text-white">
                Company
              </h4>
              <ul className="space-y-2">
                {FOOTER_COMPANY.map((l) => (
                  <li key={l}>
                    <a
                      href="/"
                      className="text-sm transition-colors hover:text-neon"
                      style={{ color: "#9A9A9A" }}
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-black tracking-widest uppercase mb-4 text-white">
                Stay in the Loop
              </h4>
              <p className="text-sm mb-4" style={{ color: "#9A9A9A" }}>
                Get the latest drops, tech previews, and exclusive offers.
              </p>
              {emailSent ? (
                <p
                  className="text-sm font-semibold"
                  style={{ color: "#B8FF1A" }}
                >
                  ✓ You&apos;re on the list!
                </p>
              ) : (
                <div className="flex gap-2">
                  <Input
                    data-ocid="newsletter.input"
                    type="email"
                    placeholder="your@email.com"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="flex-1 text-sm rounded-full border-0 text-white placeholder-gray-600"
                    style={{
                      backgroundColor: "#1A1A1A",
                      border: "1px solid #2F2F2F",
                    }}
                  />
                  <button
                    type="button"
                    data-ocid="newsletter.submit_button"
                    onClick={() => emailInput && setEmailSent(true)}
                    className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center neon-btn"
                  >
                    <Send size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div
            style={{ borderTop: "1px solid #1A1A1A" }}
            className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <p className="text-xs" style={{ color: "#4A4A4A" }}>
              &copy; {new Date().getFullYear()} Aura Audio. Built with love
              using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-neon transition-colors"
                style={{ color: "#6A6A6A" }}
              >
                caffeine.ai
              </a>
            </p>
            <div className="flex gap-6">
              {FOOTER_LEGAL.map((l) => (
                <a
                  key={l}
                  href="/"
                  className="text-xs transition-colors hover:text-neon"
                  style={{ color: "#4A4A4A" }}
                >
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50"
              style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
              onClick={() => setCartOpen(false)}
            />
            <motion.div
              data-ocid="cart.panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md z-50 flex flex-col"
              style={{
                backgroundColor: "#111111",
                borderLeft: "1px solid #2F2F2F",
              }}
            >
              <div
                className="flex items-center justify-between p-6"
                style={{ borderBottom: "1px solid #2F2F2F" }}
              >
                <h2 className="text-lg font-black tracking-widest text-white uppercase">
                  Your Cart
                </h2>
                <button
                  type="button"
                  data-ocid="cart.close_button"
                  onClick={() => setCartOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {cartItems.length === 0 ? (
                  <div
                    data-ocid="cart.empty_state"
                    className="text-center py-16"
                  >
                    <ShoppingCart
                      size={40}
                      className="mx-auto mb-4"
                      style={{ color: "#2F2F2F" }}
                    />
                    <p style={{ color: "#9A9A9A" }}>Your cart is empty</p>
                    <button
                      type="button"
                      onClick={() => setCartOpen(false)}
                      className="text-sm font-semibold mt-2 inline-block"
                      style={{ color: "#B8FF1A" }}
                    >
                      Browse Products
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item, i) => (
                      <div
                        key={item.id}
                        data-ocid={`cart.item.${i + 1}`}
                        className="flex gap-4 p-4 rounded-xl"
                        style={{
                          backgroundColor: "#1A1A1A",
                          border: "1px solid #2F2F2F",
                        }}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-contain rounded-lg"
                          style={{ backgroundColor: "#111111" }}
                        />
                        <div className="flex-1">
                          <p className="font-bold text-white text-sm">
                            {item.name}
                          </p>
                          <p
                            className="text-sm font-black"
                            style={{ color: "#B8FF1A" }}
                          >
                            ${item.price}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              type="button"
                              data-ocid={`cart.secondary_button.${i + 1}`}
                              onClick={() => updateQty(item.id, -1)}
                              className="w-6 h-6 rounded-full flex items-center justify-center text-white transition-colors"
                              style={{ backgroundColor: "#2F2F2F" }}
                            >
                              <Minus size={10} />
                            </button>
                            <span className="text-sm font-bold text-white w-4 text-center">
                              {item.qty}
                            </span>
                            <button
                              type="button"
                              data-ocid={`cart.primary_button.${i + 1}`}
                              onClick={() => updateQty(item.id, 1)}
                              className="w-6 h-6 rounded-full flex items-center justify-center text-black"
                              style={{ backgroundColor: "#B8FF1A" }}
                            >
                              <Plus size={10} />
                            </button>
                          </div>
                        </div>
                        <button
                          type="button"
                          data-ocid={`cart.delete_button.${i + 1}`}
                          onClick={() => updateQty(item.id, -item.qty)}
                          className="text-gray-600 hover:text-red-400 transition-colors self-start"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="p-6" style={{ borderTop: "1px solid #2F2F2F" }}>
                  <div className="flex justify-between items-center mb-4">
                    <span
                      className="text-sm font-semibold"
                      style={{ color: "#9A9A9A" }}
                    >
                      TOTAL
                    </span>
                    <span className="text-2xl font-black text-white">
                      ${cartTotal}
                    </span>
                  </div>
                  <button
                    type="button"
                    data-ocid="cart.submit_button"
                    onClick={() => {
                      setCartOpen(false);
                      setCheckoutOpen(true);
                    }}
                    className="w-full neon-btn py-4 rounded-full font-black tracking-widest uppercase text-sm"
                  >
                    CHECKOUT
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      <Dialog
        open={checkoutOpen}
        onOpenChange={(o) => {
          setCheckoutOpen(o);
          if (!o) setOrderSuccess(false);
        }}
      >
        <DialogContent
          data-ocid="checkout.dialog"
          className="max-w-md"
          style={{
            backgroundColor: "#111111",
            border: "1px solid #2F2F2F",
            color: "white",
          }}
        >
          <DialogHeader>
            <DialogTitle className="text-xl font-black tracking-widest uppercase text-white">
              {orderSuccess ? "Order Placed! 🎉" : "Complete Your Order"}
            </DialogTitle>
          </DialogHeader>
          {orderSuccess ? (
            <div
              data-ocid="checkout.success_state"
              className="text-center py-8"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{
                  backgroundColor: "#B8FF1A20",
                  border: "1px solid #B8FF1A",
                }}
              >
                <span className="text-2xl">✓</span>
              </div>
              <p className="font-semibold text-lg text-white mb-2">
                Order placed!
              </p>
              <p style={{ color: "#9A9A9A" }}>
                We&apos;ll be in touch soon with your order confirmation.
              </p>
              <button
                type="button"
                data-ocid="checkout.close_button"
                onClick={() => setCheckoutOpen(false)}
                className="mt-6 neon-btn px-8 py-3 rounded-full font-bold tracking-widest uppercase text-sm"
              >
                CONTINUE SHOPPING
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <Label
                  className="text-xs font-semibold tracking-widest uppercase mb-1"
                  style={{ color: "#9A9A9A" }}
                >
                  Full Name
                </Label>
                <Input
                  data-ocid="checkout.input"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  placeholder="John Doe"
                  className="text-white"
                  style={{
                    backgroundColor: "#1A1A1A",
                    border: "1px solid #2F2F2F",
                  }}
                />
              </div>
              <div>
                <Label
                  className="text-xs font-semibold tracking-widest uppercase mb-1"
                  style={{ color: "#9A9A9A" }}
                >
                  Email
                </Label>
                <Input
                  data-ocid="checkout.input"
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                  placeholder="you@email.com"
                  className="text-white"
                  style={{
                    backgroundColor: "#1A1A1A",
                    border: "1px solid #2F2F2F",
                  }}
                />
              </div>
              <div>
                <Label
                  className="text-xs font-semibold tracking-widest uppercase mb-1"
                  style={{ color: "#9A9A9A" }}
                >
                  Shipping Address
                </Label>
                <Textarea
                  data-ocid="checkout.textarea"
                  value={form.address}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, address: e.target.value }))
                  }
                  placeholder="123 Main St, City, Country"
                  rows={3}
                  className="text-white resize-none"
                  style={{
                    backgroundColor: "#1A1A1A",
                    border: "1px solid #2F2F2F",
                  }}
                />
              </div>
              <div
                className="flex justify-between items-center py-3"
                style={{ borderTop: "1px solid #2F2F2F" }}
              >
                <span
                  className="text-sm font-semibold"
                  style={{ color: "#9A9A9A" }}
                >
                  Order Total
                </span>
                <span className="text-xl font-black text-white">
                  ${cartTotal}
                </span>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  data-ocid="checkout.cancel_button"
                  onClick={() => setCheckoutOpen(false)}
                  className="flex-1 py-3 rounded-full font-bold tracking-widest uppercase text-sm border transition-colors hover:border-neon"
                  style={{ borderColor: "#2F2F2F", color: "#9A9A9A" }}
                >
                  CANCEL
                </button>
                <button
                  type="button"
                  data-ocid="checkout.confirm_button"
                  onClick={handleCheckout}
                  disabled={!form.name || !form.email || !form.address}
                  className="flex-1 neon-btn py-3 rounded-full font-bold tracking-widest uppercase text-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  PLACE ORDER
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
