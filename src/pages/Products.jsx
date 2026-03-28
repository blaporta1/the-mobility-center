import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Phone, MapPin, Clock, ArrowRight, ChevronRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const C = {
  obsidian: '#0D0D12',
  champagne: '#C9A84C',
  ivory:     '#FAF8F5',
  slate:     '#2A2A35',
}

const CATEGORIES = [
  {
    id: 'wheelchairs',
    label: 'Wheelchairs',
    tag: 'Most Popular',
    desc: 'Manual and power wheelchairs precisely fitted to your body, lifestyle, and environment.',
    items: ['Manual Wheelchairs', 'Power Wheelchairs', 'Transport Chairs', 'Pediatric Wheelchairs', 'Bariatric Models'],
    img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'scooters',
    label: 'Power Scooters',
    tag: null,
    desc: 'Indoor and outdoor mobility scooters that expand your range and restore your independence.',
    items: ['3-Wheel Scooters', '4-Wheel Scooters', 'Travel / Folding Scooters', 'Heavy-Duty Scooters'],
    img: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'lift-chairs',
    label: 'Lift Chairs',
    tag: null,
    desc: 'Power lift recliners that help you sit and stand safely — in the comfort of your own home.',
    items: ['2-Position Lift Chairs', '3-Position Lift Chairs', 'Infinite-Position Chairs', 'Petite & Tall Sizes'],
    img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'walkers',
    label: 'Walkers & Rollators',
    tag: null,
    desc: 'Lightweight walkers and rolling rollators for stable, confident movement at every pace.',
    items: ['Standard Walkers', 'Rollators (2-Wheel)', 'Rollators (4-Wheel)', 'Knee Walkers', 'Upright Walkers'],
    img: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'bath-safety',
    label: 'Bath Safety',
    tag: null,
    desc: 'Grab bars, shower chairs, and tub transfer benches that make your bathroom safer every day.',
    items: ['Grab Bars', 'Shower Chairs', 'Tub Transfer Benches', 'Raised Toilet Seats', 'Bath Lifts'],
    img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'daily-living',
    label: 'Daily Living Aids',
    tag: null,
    desc: 'Adaptive tools and home care equipment that make everyday tasks easier and safer.',
    items: ['Reaching & Grabbing Tools', 'Dressing Aids', 'Bed Rails & Handles', 'Canes & Crutches', 'Patient Lifts'],
    img: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80',
  },
]

const ALL_FILTER = 'All'
const FILTERS = [ALL_FILTER, 'Wheelchairs', 'Scooters', 'Seating', 'Walking Aids', 'Home Safety']

// ─── PAGE HERO ────────────────────────────────────────────────────────────────
function PageHero() {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ph-line', {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out',
        delay: 0.1,
      })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden px-6 pb-16 pt-36"
      style={{ background: C.obsidian }}
    >
      {/* Subtle grid bg */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(${C.ivory} 1px, transparent 1px), linear-gradient(90deg, ${C.ivory} 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />
      {/* Glow */}
      <div
        className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full opacity-10"
        style={{ background: `radial-gradient(circle, ${C.champagne}, transparent 65%)` }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="ph-line mb-5 flex items-center gap-3">
          <div className="h-px w-6" style={{ background: C.champagne }} />
          <span
            className="text-xs uppercase tracking-[0.2em]"
            style={{ color: C.champagne, fontFamily: 'JetBrains Mono' }}
          >
            Products
          </span>
        </div>

        <h1
          className="ph-line font-bold leading-[0.93] tracking-[-0.03em]"
          style={{
            color: C.ivory,
            fontFamily: 'Inter',
            fontSize: 'clamp(3rem, 7vw, 6rem)',
            maxWidth: 760,
          }}
        >
          Every product,{' '}
          <span
            className="italic"
            style={{ color: C.champagne, fontFamily: 'Playfair Display' }}
          >
            expertly chosen.
          </span>
        </h1>

        <p
          className="ph-line mt-6 max-w-[520px] text-lg leading-relaxed"
          style={{ color: `${C.ivory}60`, fontFamily: 'Inter' }}
        >
          We carry over 500 products from the industry's most trusted brands — and every
          one is available for a personalized fitting before you buy.
        </p>
      </div>
    </section>
  )
}

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────
function ProductCard({ cat, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="product-card group relative overflow-hidden rounded-[1.75rem] transition-transform duration-300"
      style={{
        background: C.slate,
        border: `1px solid rgba(201,168,76,${hovered ? '0.25' : '0.1'})`,
        boxShadow: hovered ? '0 24px 60px rgba(0,0,0,0.4)' : '0 8px 30px rgba(0,0,0,0.2)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.3s cubic-bezier(0.25,0.46,0.45,0.94)',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={cat.img}
          alt={cat.label}
          className="h-full w-full object-cover transition-transform duration-700"
          style={{
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
            filter: 'brightness(0.55) saturate(0.7)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${C.slate} 0%, transparent 60%)`,
          }}
        />
        {cat.tag && (
          <div
            className="absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-semibold"
            style={{
              background: C.champagne,
              color: C.obsidian,
              fontFamily: 'JetBrains Mono',
            }}
          >
            {cat.tag}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div
          className="mb-1 text-xs uppercase tracking-[0.15em]"
          style={{ color: `${C.champagne}80`, fontFamily: 'JetBrains Mono' }}
        >
          {String(index + 1).padStart(2, '0')}
        </div>
        <h3
          className="mb-3 text-xl font-bold"
          style={{ color: C.ivory, fontFamily: 'Inter' }}
        >
          {cat.label}
        </h3>
        <p
          className="mb-5 text-sm leading-relaxed"
          style={{ color: `${C.ivory}55`, fontFamily: 'Inter' }}
        >
          {cat.desc}
        </p>

        {/* Item list */}
        <ul className="mb-6 space-y-1.5">
          {cat.items.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 text-xs"
              style={{ color: `${C.ivory}50`, fontFamily: 'Inter' }}
            >
              <div
                className="h-1 w-1 rounded-full flex-shrink-0"
                style={{ background: C.champagne }}
              />
              {item}
            </li>
          ))}
        </ul>

        <button
          className="flex items-center gap-2 text-sm font-semibold transition-all duration-200 hover:gap-3"
          style={{ color: C.champagne, fontFamily: 'Inter' }}
        >
          Request a Fitting <ArrowRight size={15} />
        </button>
      </div>
    </div>
  )
}

// ─── PRODUCTS GRID ────────────────────────────────────────────────────────────
function ProductsGrid() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.product-card', {
        y: 50,
        opacity: 0,
        stagger: 0.08,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="px-6 py-16"
      style={{ background: C.obsidian }}
    >
      <div className="mx-auto max-w-6xl">
        {/* Section label */}
        <div
          className="mb-10 flex items-center justify-between"
        >
          <div
            className="text-xs uppercase tracking-[0.2em]"
            style={{ color: `${C.ivory}40`, fontFamily: 'JetBrains Mono' }}
          >
            {CATEGORIES.length} Categories Available
          </div>
          <div
            className="text-xs uppercase tracking-[0.12em]"
            style={{ color: `${C.ivory}35`, fontFamily: 'JetBrains Mono' }}
          >
            Insurance accepted · In-store fitting
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat, i) => (
            <ProductCard key={cat.id} cat={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── BRANDS STRIP ─────────────────────────────────────────────────────────────
function BrandsStrip() {
  const brands = ['Invacare', 'Pride Mobility', 'Drive Medical', 'Sunrise Medical', 'Permobil', 'Golden Technologies', 'Medline', 'Nova Medical']

  return (
    <div
      className="overflow-hidden border-y py-5"
      style={{ borderColor: `${C.champagne}15`, background: C.slate }}
    >
      <div
        className="flex gap-14 whitespace-nowrap"
        style={{ animation: 'brandScroll 30s linear infinite' }}
      >
        {[...brands, ...brands].map((b, i) => (
          <span
            key={i}
            className="text-xs uppercase tracking-[0.18em]"
            style={{ color: `${C.ivory}35`, fontFamily: 'JetBrains Mono' }}
          >
            {b}
          </span>
        ))}
      </div>
      <style>{`@keyframes brandScroll { from{transform:translateX(0)} to{transform:translateX(-50%)} }`}</style>
    </div>
  )
}

// ─── INSURANCE BANNER ─────────────────────────────────────────────────────────
function InsuranceBanner() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ins-el', {
        y: 30, opacity: 0, stagger: 0.1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={ref}
      className="px-6 py-20"
      style={{ background: C.slate }}
    >
      <div className="mx-auto max-w-6xl">
        <div
          className="relative overflow-hidden rounded-[2rem] px-10 py-12 md:px-16"
          style={{
            background: `linear-gradient(135deg, ${C.obsidian} 0%, #1A1A26 100%)`,
            border: `1px solid rgba(201,168,76,0.2)`,
          }}
        >
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-10"
            style={{ background: `radial-gradient(circle, ${C.champagne}, transparent 65%)` }}
          />
          <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="ins-el max-w-lg">
              <div
                className="mb-3 text-xs uppercase tracking-[0.18em]"
                style={{ color: C.champagne, fontFamily: 'JetBrains Mono' }}
              >
                Insurance & Billing
              </div>
              <h3
                className="mb-3 font-bold leading-tight tracking-[-0.02em]"
                style={{ color: C.ivory, fontFamily: 'Inter', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}
              >
                We handle your insurance so you don't have to.
              </h3>
              <p
                className="text-base leading-relaxed"
                style={{ color: `${C.ivory}60`, fontFamily: 'Inter' }}
              >
                We work directly with Medicare, Medicaid, and most major private insurers.
                Bring your prescription — we'll take care of the rest.
              </p>
            </div>
            <div className="ins-el flex-shrink-0">
              <button
                className="rounded-full px-8 py-4 text-sm font-semibold transition-transform duration-200 hover:scale-[1.04]"
                style={{
                  background: C.champagne,
                  color: C.obsidian,
                  fontFamily: 'Inter',
                  boxShadow: `0 8px 28px rgba(201,168,76,0.35)`,
                }}
              >
                Check Your Coverage
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── FOOTER (shared) ─────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      className="px-6 pb-10 pt-16"
      style={{
        background: C.obsidian,
        borderTop: `1px solid rgba(201,168,76,0.1)`,
        borderRadius: '3rem 3rem 0 0',
      }}
    >
      <div className="mx-auto max-w-6xl">
        <div
          className="grid gap-10 pb-12 md:grid-cols-4"
          style={{ borderBottom: '1px solid rgba(250,248,245,0.07)' }}
        >
          <div className="md:col-span-2">
            <Link
              to="/"
              className="mb-3 block text-2xl font-bold tracking-[-0.02em]"
              style={{ color: C.ivory, fontFamily: 'Inter', textDecoration: 'none' }}
            >
              The Mobility Center
            </Link>
            <p className="max-w-[280px] text-sm leading-relaxed" style={{ color: `${C.ivory}45`, fontFamily: 'Inter' }}>
              Expert mobility solutions for independent living. Serving our community since 1985.
            </p>
          </div>
          <div>
            <div className="mb-5 text-xs uppercase tracking-[0.16em]" style={{ color: `${C.champagne}70`, fontFamily: 'JetBrains Mono' }}>
              Navigation
            </div>
            <ul className="space-y-3">
              {[['Products', '/products'], ['Services', '/services'], ['Insurance', '#'], ['About Us', '#'], ['Contact', '#']].map(([label, to]) => (
                <li key={label}>
                  <Link to={to} className="inline-block text-sm transition-all duration-150 hover:-translate-y-px" style={{ color: `${C.ivory}55`, fontFamily: 'Inter', textDecoration: 'none' }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mb-5 text-xs uppercase tracking-[0.16em]" style={{ color: `${C.champagne}70`, fontFamily: 'JetBrains Mono' }}>Contact</div>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm" style={{ color: `${C.ivory}55`, fontFamily: 'Inter' }}><Phone size={13} style={{ color: C.champagne }} />(555) 000-0000</li>
              <li className="flex items-center gap-2 text-sm" style={{ color: `${C.ivory}55`, fontFamily: 'Inter' }}><MapPin size={13} style={{ color: C.champagne }} />Your City, ST 00000</li>
              <li className="flex items-center gap-2 text-sm" style={{ color: `${C.ivory}55`, fontFamily: 'Inter' }}><Clock size={13} style={{ color: C.champagne }} />Mon–Sat · 9am–6pm</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-5 pt-8 md:flex-row">
          <div className="text-xs" style={{ color: `${C.ivory}28`, fontFamily: 'JetBrains Mono' }}>© 2025 The Mobility Center. All rights reserved.</div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            <span className="text-xs tracking-[0.12em] uppercase" style={{ color: `${C.ivory}35`, fontFamily: 'JetBrains Mono' }}>System Operational</span>
          </div>
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Accessibility'].map((item) => (
              <a key={item} href="#" className="inline-block text-xs transition-all duration-150 hover:-translate-y-px" style={{ color: `${C.ivory}30`, fontFamily: 'Inter' }}>{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function Products() {
  return (
    <div style={{ background: C.obsidian }}>
      <PageHero />
      <BrandsStrip />
      <ProductsGrid />
      <InsuranceBanner />
      <Footer />
    </div>
  )
}
