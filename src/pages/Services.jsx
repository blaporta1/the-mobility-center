import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Phone, MapPin, Clock, ArrowRight, ClipboardCheck, Wrench, Truck, HeartHandshake, ShieldCheck, Calendar } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const C = {
  obsidian: '#0D0D12',
  champagne: '#2EBFA5',
  ivory:     '#FAF8F5',
  slate:     '#2A2A35',
}

const SERVICES = [
  {
    icon: ClipboardCheck,
    title: 'Free Consultations',
    tag: 'Start Here',
    desc: 'Every client journey begins with a no-obligation consultation. A certified specialist will assess your mobility needs, environment, and goals before recommending anything.',
    bullets: [
      'In-store or home visit options',
      'No appointment required for walk-ins',
      'Typically 45–60 minutes',
      'Bring your prescription or referral if you have one',
    ],
  },
  {
    icon: ShieldCheck,
    title: 'Expert Fittings',
    tag: null,
    desc: 'The right equipment improperly fitted is the wrong equipment. Our specialists measure, adjust, and fine-tune every device to your exact body and lifestyle requirements.',
    bullets: [
      'Certified Assistive Technology Professional (ATP) on staff',
      'Seat depth, height, and armrest calibration',
      'Postural support assessment',
      'Trial period available on select products',
    ],
  },
  {
    icon: HeartHandshake,
    title: 'Insurance Billing',
    tag: null,
    desc: 'We work directly with Medicare, Medicaid, and most major private insurers. Our billing team handles the paperwork from pre-authorization to claim resolution.',
    bullets: [
      'Medicare Part B supplier',
      'Medicaid-approved provider',
      'Pre-authorization support',
      'Explanation of benefits review',
    ],
  },
  {
    icon: Wrench,
    title: 'Repairs & Maintenance',
    tag: null,
    desc: 'Fast, reliable repair service for all makes and models — not just equipment purchased with us. Most repairs are completed within 48 hours.',
    bullets: [
      'In-store service center',
      'Loaner equipment available during repair',
      'Warranty work authorized',
      'Preventive maintenance plans',
    ],
  },
  {
    icon: Truck,
    title: 'Home Delivery & Setup',
    tag: null,
    desc: 'White-glove delivery to your home, including full assembly, environment assessment, and a hands-on training session so you feel confident from day one.',
    bullets: [
      'Same-city delivery available',
      'In-home environment walkthrough',
      'Equipment assembly & calibration',
      'Caregiver training included',
    ],
  },
  {
    icon: Calendar,
    title: 'Ongoing Support',
    tag: null,
    desc: 'Your needs change — your equipment should too. We offer scheduled check-ins, adjustments, and re-evaluations as your condition or lifestyle evolves.',
    bullets: [
      'Annual re-evaluation appointments',
      'Free adjustments for the first year',
      'Equipment upgrade pathways',
      'Caregiver resources & support',
    ],
  },
]

// ─── PAGE HERO ────────────────────────────────────────────────────────────────
function PageHero() {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.sh-line', {
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
      {/* Grid bg */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(${C.ivory} 1px, transparent 1px), linear-gradient(90deg, ${C.ivory} 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />
      {/* Glow */}
      <div
        className="pointer-events-none absolute -right-40 top-0 h-[500px] w-[500px] rounded-full opacity-10"
        style={{ background: `radial-gradient(circle, ${C.champagne}, transparent 65%)` }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="sh-line mb-5 flex items-center gap-3">
          <div className="h-px w-6" style={{ background: C.champagne }} />
          <span
            className="text-xs uppercase tracking-[0.2em]"
            style={{ color: C.champagne, fontFamily: 'Open Sans' }}
          >
            Services
          </span>
        </div>

        <h1
          className="sh-line font-bold leading-[0.93] tracking-[-0.03em]"
          style={{
            color: C.ivory,
            fontFamily: 'Montserrat',
            fontSize: 'clamp(3rem, 7vw, 6rem)',
            maxWidth: 800,
          }}
        >
          More than equipment —{' '}
          <span
            className="italic"
            style={{ color: C.champagne, fontFamily: 'Montserrat' }}
          >
            a full service.
          </span>
        </h1>

        <p
          className="sh-line mt-6 max-w-[540px] text-lg leading-relaxed"
          style={{ color: `${C.ivory}60`, fontFamily: 'Montserrat' }}
        >
          From the first consultation to decades of ongoing support, we're with you at every stage — not just at the point of sale.
        </p>

        <div className="sh-line mt-10 flex flex-wrap gap-4">
          <button
            className="rounded-full px-8 py-4 text-sm font-semibold transition-transform duration-200 hover:scale-[1.03]"
            style={{
              background: C.champagne,
              color: C.obsidian,
              fontFamily: 'Montserrat',
              boxShadow: `0 8px 28px rgba(46,191,165,0.35)`,
            }}
          >
            Schedule a Free Consultation
          </button>
          <Link
            to="/products"
            className="flex items-center gap-2 rounded-full px-7 py-4 text-sm font-medium transition-transform duration-200 hover:scale-[1.02]"
            style={{
              background: 'transparent',
              border: `1px solid rgba(250,248,245,0.15)`,
              color: C.ivory,
              fontFamily: 'Montserrat',
              textDecoration: 'none',
            }}
          >
            Browse Products <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─── SERVICE CARD ─────────────────────────────────────────────────────────────
function ServiceCard({ svc, index }) {
  const [hovered, setHovered] = useState(false)
  const Icon = svc.icon

  return (
    <div
      className="service-card relative overflow-hidden rounded-[1.75rem] p-8"
      style={{
        background: index % 2 === 0 ? C.slate : `${C.obsidian}CC`,
        border: `1px solid rgba(46,191,165,${hovered ? '0.22' : '0.1'})`,
        boxShadow: hovered ? '0 24px 60px rgba(0,0,0,0.4)' : '0 8px 30px rgba(0,0,0,0.15)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.3s cubic-bezier(0.25,0.46,0.45,0.94)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Glow on hover */}
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle, ${C.champagne}20, transparent 65%)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      <div className="relative z-10">
        {/* Icon + tag */}
        <div className="mb-6 flex items-start justify-between">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl"
            style={{
              background: `${C.champagne}18`,
              border: `1px solid ${C.champagne}30`,
            }}
          >
            <Icon size={22} style={{ color: C.champagne }} />
          </div>
          {svc.tag && (
            <div
              className="rounded-full px-3 py-1 text-xs font-semibold"
              style={{ background: C.champagne, color: C.obsidian, fontFamily: 'Open Sans' }}
            >
              {svc.tag}
            </div>
          )}
        </div>

        {/* Step num */}
        <div
          className="mb-2 text-xs uppercase tracking-[0.15em]"
          style={{ color: `${C.champagne}70`, fontFamily: 'Open Sans' }}
        >
          {String(index + 1).padStart(2, '0')}
        </div>

        <h3
          className="mb-3 text-xl font-bold"
          style={{ color: C.ivory, fontFamily: 'Montserrat' }}
        >
          {svc.title}
        </h3>
        <p
          className="mb-6 text-sm leading-relaxed"
          style={{ color: `${C.ivory}55`, fontFamily: 'Montserrat' }}
        >
          {svc.desc}
        </p>

        {/* Bullets */}
        <ul className="space-y-2">
          {svc.bullets.map((b) => (
            <li
              key={b}
              className="flex items-start gap-2.5 text-xs leading-relaxed"
              style={{ color: `${C.ivory}50`, fontFamily: 'Montserrat' }}
            >
              <div
                className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                style={{ background: C.champagne }}
              />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// ─── SERVICES GRID ────────────────────────────────────────────────────────────
function ServicesGrid() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.service-card', {
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
        <div
          className="mb-10 text-xs uppercase tracking-[0.2em]"
          style={{ color: `${C.ivory}35`, fontFamily: 'Open Sans' }}
        >
          {SERVICES.length} Core Services · All included at no extra charge
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((svc, i) => (
            <ServiceCard key={svc.title} svc={svc} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── PROCESS TIMELINE ─────────────────────────────────────────────────────────
function ProcessTimeline() {
  const sectionRef = useRef(null)

  const steps = [
    { num: '01', label: 'Call or Walk In',     detail: "No appointment needed for a first visit. We'll make time for you." },
    { num: '02', label: 'Needs Assessment',    detail: 'A specialist spends time understanding your life, not just your diagnosis.' },
    { num: '03', label: 'Insurance Verification', detail: 'We check your coverage upfront so there are no surprises later.' },
    { num: '04', label: 'Product Selection',   detail: 'We narrow the options to what genuinely fits you, then let you try them.' },
    { num: '05', label: 'Custom Fitting',      detail: 'Every adjustment is made before you leave the store.' },
      { num: '06', label: 'Delivery & Follow-Up', detail: "We deliver, set up, and check in — because the relationship doesn't end at purchase." },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.timeline-item', {
        x: -30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="px-6 py-24"
      style={{ background: C.slate }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex items-center gap-3">
          <div className="h-px w-6" style={{ background: C.champagne }} />
          <span
            className="text-xs uppercase tracking-[0.2em]"
            style={{ color: C.champagne, fontFamily: 'Open Sans' }}
          >
            How It Works
          </span>
        </div>

        <h2
          className="mb-14 font-bold leading-[0.95] tracking-[-0.025em]"
          style={{
            color: C.ivory,
            fontFamily: 'Montserrat',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            maxWidth: 560,
          }}
        >
          From first contact to long-term care.
        </h2>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.num}
              className="timeline-item rounded-[1.5rem] p-6"
              style={{
                background: C.obsidian,
                border: '1px solid rgba(46,191,165,0.1)',
              }}
            >
              <div
                className="mb-4 text-3xl font-bold tracking-[-0.04em]"
                style={{ color: `${C.champagne}50`, fontFamily: 'Montserrat' }}
              >
                {step.num}
              </div>
              <div
                className="mb-2 font-semibold"
                style={{ color: C.ivory, fontFamily: 'Montserrat', fontSize: '1.05rem' }}
              >
                {step.label}
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: `${C.ivory}50`, fontFamily: 'Montserrat' }}
              >
                {step.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── TESTIMONIAL ──────────────────────────────────────────────────────────────
function Testimonials() {
  const sectionRef = useRef(null)

  const quotes = [
    { text: "They spent two hours with my father before suggesting a single product. That's not how most places operate.", name: 'Margaret T.', detail: 'Daughter of client' },
    { text: "The fitting made all the difference. I'd tried three other chairs and none of them felt right. This one does.", name: 'Robert K.', detail: 'Power wheelchair user' },
    { text: "They handled every insurance form and called me with updates. I didn't have to chase anyone once.", name: 'Linda S.', detail: 'Medicare recipient' },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.testimonial-card', {
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="px-6 py-24"
      style={{ background: C.obsidian }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex items-center gap-3">
          <div className="h-px w-6" style={{ background: C.champagne }} />
          <span
            className="text-xs uppercase tracking-[0.2em]"
            style={{ color: C.champagne, fontFamily: 'Open Sans' }}
          >
            Client Voices
          </span>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {quotes.map((q, i) => (
            <div
              key={i}
              className="testimonial-card rounded-[1.75rem] p-8"
              style={{
                background: C.slate,
                border: '1px solid rgba(46,191,165,0.1)',
              }}
            >
              <div className="mb-6 flex gap-1">
                {Array.from({ length: 5 }).map((_, s) => (
                  <div
                    key={s}
                    className="text-xs"
                    style={{ color: C.champagne }}
                  >
                    ★
                  </div>
                ))}
              </div>
              <p
                className="mb-6 text-base leading-relaxed"
                style={{
                  color: `${C.ivory}80`,
                  fontFamily: 'Montserrat',
                  fontStyle: 'italic',
                }}
              >
                "{q.text}"
              </p>
              <div>
                <div
                  className="font-semibold"
                  style={{ color: C.ivory, fontFamily: 'Montserrat', fontSize: '0.9rem' }}
                >
                  {q.name}
                </div>
                <div
                  className="text-xs"
                  style={{ color: `${C.ivory}45`, fontFamily: 'Open Sans' }}
                >
                  {q.detail}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function CTA() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.svc-cta-el', {
        y: 30, opacity: 0, stagger: 0.1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 70%', once: true },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="px-6 py-32" style={{ background: C.slate }}>
      <div className="mx-auto max-w-4xl text-center">
        <div className="svc-cta-el mb-5 flex items-center justify-center gap-3">
          <div className="h-px w-8" style={{ background: `${C.champagne}60` }} />
          <span className="text-xs uppercase tracking-[0.2em]" style={{ color: `${C.champagne}80`, fontFamily: 'Open Sans' }}>
            Ready to Begin
          </span>
          <div className="h-px w-8" style={{ background: `${C.champagne}60` }} />
        </div>

        <h2
          className="svc-cta-el font-bold leading-[0.92] tracking-[-0.03em]"
          style={{
            color: C.ivory,
            fontFamily: 'Montserrat',
            fontSize: 'clamp(3rem, 7vw, 5.5rem)',
          }}
        >
          Let's find what{' '}
          <span className="italic" style={{ color: C.champagne, fontFamily: 'Montserrat' }}>
            works for you.
          </span>
        </h2>

        <p
          className="svc-cta-el mx-auto mt-7 max-w-[460px] text-lg leading-relaxed"
          style={{ color: `${C.ivory}60`, fontFamily: 'Montserrat' }}
        >
          A free consultation takes about an hour. It could change how you live for years.
        </p>

        <div className="svc-cta-el mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            className="rounded-full px-12 py-5 text-base font-semibold transition-transform duration-200 hover:scale-[1.04]"
            style={{
              background: C.champagne,
              color: C.obsidian,
              fontFamily: 'Montserrat',
              boxShadow: `0 12px 40px rgba(46,191,165,0.4)`,
            }}
          >
            Schedule a Free Consultation
          </button>
          <button
            className="flex items-center gap-2 rounded-full px-8 py-5 text-base font-medium transition-transform duration-200 hover:scale-[1.02]"
            style={{
              background: 'transparent',
              border: `1px solid rgba(250,248,245,0.18)`,
              color: C.ivory,
              fontFamily: 'Montserrat',
            }}
          >
            <Phone size={17} />
            Call Us Today
          </button>
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
        borderTop: `1px solid rgba(46,191,165,0.1)`,
        borderRadius: '3rem 3rem 0 0',
      }}
    >
      <div className="mx-auto max-w-6xl">
        <div
          className="grid gap-10 pb-12 md:grid-cols-4"
          style={{ borderBottom: '1px solid rgba(250,248,245,0.07)' }}
        >
          <div className="md:col-span-2">
            <Link to="/" className="mb-3 block text-2xl font-bold tracking-[-0.02em]" style={{ color: C.ivory, fontFamily: 'Montserrat', textDecoration: 'none' }}>
              The Mobility Center
            </Link>
            <p className="max-w-[280px] text-sm leading-relaxed" style={{ color: `${C.ivory}45`, fontFamily: 'Montserrat' }}>
              Restore Independence. Live Fully. DME Company · Serving our community since 1985.
            </p>
          </div>
          <div>
            <div className="mb-5 text-xs uppercase tracking-[0.16em]" style={{ color: `${C.champagne}70`, fontFamily: 'Open Sans' }}>Navigation</div>
            <ul className="space-y-3">
              {[['Products', '/products'], ['Services', '/services'], ['Insurance', '#'], ['About Us', '#'], ['Contact', '#']].map(([label, to]) => (
                <li key={label}>
                  <Link to={to} className="inline-block text-sm transition-all duration-150 hover:-translate-y-px" style={{ color: `${C.ivory}55`, fontFamily: 'Montserrat', textDecoration: 'none' }}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mb-5 text-xs uppercase tracking-[0.16em]" style={{ color: `${C.champagne}70`, fontFamily: 'Open Sans' }}>Contact</div>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm" style={{ color: `${C.ivory}55`, fontFamily: 'Montserrat' }}><Phone size={13} style={{ color: C.champagne }} />(555) 000-0000</li>
              <li className="flex items-center gap-2 text-sm" style={{ color: `${C.ivory}55`, fontFamily: 'Montserrat' }}><MapPin size={13} style={{ color: C.champagne }} />Your City, ST 00000</li>
              <li className="flex items-center gap-2 text-sm" style={{ color: `${C.ivory}55`, fontFamily: 'Montserrat' }}><Clock size={13} style={{ color: C.champagne }} />Mon–Sat · 9am–6pm</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-5 pt-8 md:flex-row">
          <div className="text-xs" style={{ color: `${C.ivory}28`, fontFamily: 'Open Sans' }}>© 2025 The Mobility Center. All rights reserved.</div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            <span className="text-xs tracking-[0.12em] uppercase" style={{ color: `${C.ivory}35`, fontFamily: 'Open Sans' }}>System Operational</span>
          </div>
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Accessibility'].map((item) => (
              <a key={item} href="#" className="inline-block text-xs transition-all duration-150 hover:-translate-y-px" style={{ color: `${C.ivory}30`, fontFamily: 'Montserrat' }}>{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function Services() {
  return (
    <div style={{ background: C.obsidian }}>
      <PageHero />
      <ServicesGrid />
      <ProcessTimeline />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  )
}
