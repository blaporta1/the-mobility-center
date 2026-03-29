import { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronRight, Phone, MapPin, Clock, ArrowRight } from 'lucide-react'
import Products from './pages/Products.jsx'
import Services from './pages/Services.jsx'

gsap.registerPlugin(ScrollTrigger)

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
    ScrollTrigger.refresh()
  }, [pathname])
  return null
}

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const C = {
  obsidian: '#0D0D12',
  teal:     '#2EBFA5',   // primary accent
  navy:     '#1A4FBB',   // secondary accent
  champagne: '#2EBFA5',  // alias kept for legacy references
  ivory:    '#FAF8F5',
  slate:    '#2A2A35',
  cream:    '#F4F7F9',
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className="fixed top-5 left-1/2 z-50 -translate-x-1/2 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(13,13,18,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        border: scrolled ? '1px solid rgba(46,191,165,0.18)' : '1px solid transparent',
        borderRadius: '9999px',
        padding: '12px 28px',
        boxShadow: scrolled ? '0 8px 40px rgba(0,0,0,0.4)' : 'none',
      }}
    >
      <div className="flex items-center gap-8">
        <Link
          to="/"
          className="text-sm font-bold tracking-[0.12em] uppercase whitespace-nowrap"
          style={{ color: C.ivory, fontFamily: 'Montserrat', textDecoration: 'none' }}
        >
          The Mobility Center
          <span className="ml-2 text-[0.6em] font-normal tracking-[0.18em] opacity-50">DME</span>
        </Link>
        <div className="hidden md:flex items-center gap-7">
          {[
            { label: 'Products',  to: '/products' },
            { label: 'Services',  to: '/services' },
            { label: 'Insurance', to: '#' },
            { label: 'About',     to: '#' },
          ].map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              className="text-sm tracking-wide transition-all duration-200 hover:-translate-y-px"
              style={{ color: `${C.ivory}80`, fontFamily: 'Montserrat', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.color = C.ivory)}
              onMouseLeave={e => (e.currentTarget.style.color = `${C.ivory}80`)}
            >
              {label}
            </Link>
          ))}
        </div>
        <button
          className="relative overflow-hidden rounded-full px-5 py-2.5 text-sm font-semibold transition-transform duration-200 hover:scale-[1.03]"
          style={{
            background: C.champagne,
            color: C.obsidian,
            fontFamily: 'Montserrat',
            boxShadow: `0 4px 20px rgba(46,191,165,0.3)`,
          }}
        >
          Book Free Consult
        </button>
      </div>
    </nav>
  )
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const heroRef = useRef(null)
  const linesRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(linesRef.current, {
        y: 0,
        opacity: 1,
        stagger: 0.13,
        duration: 1.3,
        ease: 'power3.out',
        delay: 0.2,
      })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  const addLine = (el) => {
    if (el && !linesRef.current.includes(el)) linesRef.current.push(el)
  }

  return (
    <section
      ref={heroRef}
      className="relative w-full overflow-hidden"
      style={{ height: '100dvh' }}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1920&q=80"
          alt=""
          className="h-full w-full object-cover"
          style={{ filter: 'brightness(0.35) saturate(0.8)' }}
        />
        {/* Gradient layers */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${C.obsidian} 0%, ${C.obsidian}99 20%, transparent 55%)`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(105deg, ${C.obsidian}E6 0%, ${C.obsidian}66 50%, transparent 80%)`,
          }}
        />
      </div>

      {/* Content — bottom-left */}
      <div className="absolute bottom-[10%] left-[6%] max-w-[760px]">
        <div
          ref={addLine}
          className="hero-line mb-7 flex items-center gap-3"
          style={{ transform: 'translateY(30px)' }}
        >
          <div className="h-px w-8" style={{ background: C.champagne }} />
          <span
            className="text-xs tracking-[0.22em] uppercase"
            style={{ color: C.teal, fontFamily: 'Open Sans' }}
          >
            DME Company · Est. 1985
          </span>
        </div>

        <h1 className="leading-none mb-6">
          <div
            ref={addLine}
            className="hero-line font-bold tracking-[-0.02em]"
            style={{
              color: C.ivory,
              fontFamily: 'Montserrat',
              fontSize: 'clamp(3.2rem, 8vw, 7rem)',
              lineHeight: 0.95,
              transform: 'translateY(40px)',
            }}
          >
            Restore Independence.
          </div>
          <div
            ref={addLine}
            className="hero-line font-bold"
            style={{
              color: C.teal,
              fontFamily: 'Montserrat',
              fontSize: 'clamp(3.2rem, 8vw, 7rem)',
              lineHeight: 0.95,
              transform: 'translateY(40px)',
            }}
          >
            Live Fully.
          </div>
        </h1>

        <p
          ref={addLine}
          className="hero-line text-lg leading-relaxed mb-10 max-w-[500px]"
          style={{
            color: `${C.ivory}70`,
            fontFamily: 'Open Sans',
            transform: 'translateY(30px)',
          }}
        >
          Empathetic experts. Reliable service. The right equipment, fitted
          precisely to your life — so you can move freely and live fully.
        </p>

        <div
          ref={addLine}
          className="hero-line flex flex-wrap gap-4 items-center"
          style={{ transform: 'translateY(30px)' }}
        >
          <button
            className="group relative overflow-hidden rounded-full font-semibold transition-transform duration-300 hover:scale-[1.04]"
            style={{
              background: C.champagne,
              color: C.obsidian,
              fontFamily: 'Montserrat',
              padding: '16px 36px',
              fontSize: '1rem',
              boxShadow: `0 8px 32px rgba(46,191,165,0.35)`,
            }}
          >
            Schedule a Free Consultation
          </button>
          <a
            href="#"
            className="flex items-center gap-2 text-sm transition-all duration-200 hover:-translate-y-px"
            style={{ color: `${C.ivory}70`, fontFamily: 'Montserrat' }}
          >
            View All Products <ChevronRight size={15} />
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="absolute bottom-8 right-8 flex flex-col items-center gap-2 opacity-30"
        style={{ color: C.ivory }}
      >
        <div
          className="h-10 w-px"
          style={{ background: `linear-gradient(to bottom, transparent, ${C.ivory})` }}
        />
        <span
          className="text-[9px] tracking-[0.25em] uppercase"
          style={{ fontFamily: 'Open Sans' }}
        >
          Scroll
        </span>
      </div>
    </section>
  )
}

// ─── FEATURE CARD 1: DIAGNOSTIC SHUFFLER (Independence) ───────────────────────
function ShufflerCard() {
  const items = [
    { label: 'Home Mobility', sub: 'Navigate every room with confidence' },
    { label: 'Daily Independence', sub: 'Complete daily tasks on your terms' },
    { label: 'Active Living', sub: 'Stay engaged in what you love' },
  ]
  const [stack, setStack] = useState(items)

  useEffect(() => {
    const id = setInterval(() => {
      setStack((prev) => {
        const arr = [...prev]
        arr.unshift(arr.pop())
        return arr
      })
    }, 2800)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      className="feature-card flex h-full flex-col rounded-[2rem] p-7"
      style={{
        background: C.slate,
        border: '1px solid rgba(46,191,165,0.12)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      }}
    >
      <div
        className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.16em]"
        style={{ color: C.champagne, fontFamily: 'Open Sans' }}
      >
        <div
          className="h-2 w-2 rounded-full"
          style={{ background: C.champagne }}
        />
        Independence
      </div>

      {/* Shuffling stack */}
      <div className="relative mb-6 flex-1" style={{ minHeight: 200 }}>
        {stack.map((item, i) => (
          <div
            key={item.label}
            className="absolute w-full transition-all duration-700"
            style={{
              top: `${i * 58}px`,
              zIndex: 3 - i,
              opacity: i === 0 ? 1 : i === 1 ? 0.55 : 0.25,
              transform: `scale(${i === 0 ? 1 : i === 1 ? 0.96 : 0.92})`,
              transformOrigin: 'left center',
              transitionTimingFunction: 'cubic-bezier(0.34,1.56,0.64,1)',
            }}
          >
            <div
              className="rounded-xl px-5 py-4"
              style={{
                background:
                  i === 0
                    ? `${C.champagne}1A`
                    : `${C.obsidian}BB`,
                border: `1px solid ${
                  i === 0 ? `${C.champagne}40` : 'rgba(255,255,255,0.05)'
                }`,
              }}
            >
              <div
                className="font-semibold"
                style={{
                  color: i === 0 ? C.ivory : `${C.ivory}70`,
                  fontFamily: 'Montserrat',
                  fontSize: '0.95rem',
                }}
              >
                {item.label}
              </div>
              {i === 0 && (
                <div
                  className="mt-0.5 text-sm"
                  style={{ color: `${C.ivory}55`, fontFamily: 'Montserrat' }}
                >
                  {item.sub}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto">
        <h3
          className="mb-2 text-xl font-bold"
          style={{ color: C.ivory, fontFamily: 'Montserrat' }}
        >
          Restore Independence
        </h3>
        <p
          className="text-sm leading-relaxed"
          style={{ color: `${C.ivory}55`, fontFamily: 'Montserrat' }}
        >
          Every product we carry is handpicked to give you more freedom, not more friction.
        </p>
      </div>
    </div>
  )
}

// ─── FEATURE CARD 2: TELEMETRY TYPEWRITER (Expert Fit) ────────────────────────
function TypewriterCard() {
  const messages = [
    'Initializing mobility assessment...',
    'Analyzing transfer requirements...',
    'Calibrating seat height: 18.5"',
    'Evaluating armrest clearance...',
    'Checking weight capacity specs...',
    'Verifying footrest geometry...',
    'Assessment complete.',
    'Personalized fit: ✓ Confirmed',
  ]
  const [msgIdx, setMsgIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [display, setDisplay] = useState('')
  const [history, setHistory] = useState([])

  useEffect(() => {
    const msg = messages[msgIdx]
    if (charIdx < msg.length) {
      const t = setTimeout(() => {
        setDisplay(msg.slice(0, charIdx + 1))
        setCharIdx((c) => c + 1)
      }, 35)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => {
        setHistory((h) => [...h.slice(-5), msg])
        const next = (msgIdx + 1) % messages.length
        setMsgIdx(next)
        setCharIdx(0)
        setDisplay('')
      }, 1200)
      return () => clearTimeout(t)
    }
  }, [msgIdx, charIdx])

  return (
    <div
      className="feature-card flex h-full flex-col rounded-[2rem] p-7"
      style={{
        background: C.slate,
        border: '1px solid rgba(46,191,165,0.12)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      }}
    >
      <div
        className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.16em]"
        style={{ color: C.champagne, fontFamily: 'Open Sans' }}
      >
        <div
          className="h-2 w-2 animate-pulse rounded-full"
          style={{ background: '#4ade80' }}
        />
        Live Feed — Expert Fit
      </div>

      <div
        className="mb-6 flex-1 overflow-hidden rounded-xl p-5"
        style={{
          background: C.obsidian,
          border: '1px solid rgba(255,255,255,0.06)',
          minHeight: 200,
        }}
      >
        <div className="mb-3 flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full" style={{ background: '#EF4444' }} />
          <div className="h-2.5 w-2.5 rounded-full" style={{ background: '#F59E0B' }} />
          <div className="h-2.5 w-2.5 rounded-full" style={{ background: '#22C55E' }} />
        </div>
        <div className="space-y-1.5">
          {history.map((line, i) => (
            <div
              key={i}
              className="text-xs"
              style={{ color: `${C.ivory}35`, fontFamily: 'Open Sans' }}
            >
              <span style={{ color: `${C.champagne}50` }}>{'>'} </span>
              {line}
            </div>
          ))}
        </div>
        <div
          className="mt-2 flex items-end gap-0.5 text-sm"
          style={{ color: C.champagne, fontFamily: 'Open Sans' }}
        >
          <span style={{ color: `${C.champagne}70` }}>{'>'} </span>
          {display}
          <span
            className="cursor-blink mb-px inline-block"
            style={{
              width: 2,
              height: '1em',
              background: C.champagne,
              marginLeft: 1,
            }}
          />
        </div>
      </div>

      <div>
        <h3
          className="mb-2 text-xl font-bold"
          style={{ color: C.ivory, fontFamily: 'Montserrat' }}
        >
          Expert Fitting
        </h3>
        <p
          className="text-sm leading-relaxed"
          style={{ color: `${C.ivory}55`, fontFamily: 'Montserrat' }}
        >
          Our certified specialists analyze your unique needs before recommending a single product.
        </p>
      </div>
    </div>
  )
}

// ─── FEATURE CARD 3: CURSOR PROTOCOL SCHEDULER (Local Care) ───────────────────
function SchedulerCard() {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  const [activeDay, setActiveDay] = useState(null)
  const [pressing, setPressing] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const cursorRef = useRef(null)

  useEffect(() => {
    let cancelled = false

    const run = async () => {
      while (!cancelled) {
        await wait(1000)
        if (cancelled) break

        // Move cursor to Wednesday (index 3)
        if (cursorRef.current) {
          cursorRef.current.style.transform = 'translate(152px, 30px)'
          cursorRef.current.style.opacity = '1'
        }
        await wait(600)
        if (cancelled) break

        // Click the day
        setPressing(true)
        await wait(150)
        setActiveDay(3)
        setPressing(false)
        await wait(700)
        if (cancelled) break

        // Move cursor to book button
        if (cursorRef.current) {
          cursorRef.current.style.transform = 'translate(90px, 96px)'
        }
        await wait(500)
        if (cancelled) break

        // Click confirm
        setPressing(true)
        await wait(150)
        setConfirmed(true)
        setPressing(false)
        await wait(1800)
        if (cancelled) break

        // Reset
        setActiveDay(null)
        setConfirmed(false)
        if (cursorRef.current) {
          cursorRef.current.style.opacity = '0'
          cursorRef.current.style.transform = 'translate(0px, 0px)'
        }
        await wait(600)
      }
    }

    run()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div
      className="feature-card flex h-full flex-col rounded-[2rem] p-7"
      style={{
        background: C.slate,
        border: '1px solid rgba(46,191,165,0.12)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      }}
    >
      <div
        className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.16em]"
        style={{ color: C.champagne, fontFamily: 'Open Sans' }}
      >
        <MapPin size={11} style={{ color: C.champagne }} />
        Local Care
      </div>

      <div
        className="relative mb-6 flex-1 overflow-hidden rounded-xl p-5"
        style={{
          background: C.obsidian,
          border: '1px solid rgba(255,255,255,0.06)',
          minHeight: 200,
        }}
      >
        {/* Day grid */}
        <div className="mb-4 flex gap-2">
          {days.map((d, i) => (
            <div
              key={i}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold transition-all duration-300"
              style={{
                background:
                  activeDay === i ? C.champagne : 'rgba(255,255,255,0.07)',
                color: activeDay === i ? C.obsidian : `${C.ivory}55`,
                fontFamily: 'Montserrat',
                transform:
                  activeDay === i && pressing ? 'scale(0.92)' : 'scale(1)',
              }}
            >
              {d}
            </div>
          ))}
        </div>

        {/* Time slots */}
        {['9:00 AM', '11:00 AM', '2:00 PM'].map((time, i) => (
          <div
            key={time}
            className="mb-2 flex items-center gap-3 rounded-lg px-3 py-2"
            style={{
              background:
                activeDay === 3 && i === 1
                  ? `${C.champagne}18`
                  : 'rgba(255,255,255,0.04)',
              border: `1px solid ${
                activeDay === 3 && i === 1
                  ? `${C.champagne}40`
                  : 'transparent'
              }`,
            }}
          >
            <div
              className="h-2 w-2 rounded-full"
              style={{
                background:
                  activeDay === 3 && i === 1 ? C.champagne : 'rgba(255,255,255,0.2)',
              }}
            />
            <span
              className="text-xs"
              style={{
                color:
                  activeDay === 3 && i === 1
                    ? C.champagne
                    : `${C.ivory}50`,
                fontFamily: 'Open Sans',
              }}
            >
              {time}
            </span>
          </div>
        ))}

        {/* Book button */}
        <button
          className="mt-3 w-full rounded-xl py-2.5 text-xs font-semibold transition-all duration-300"
          style={{
            background: confirmed ? C.champagne : 'rgba(255,255,255,0.08)',
            color: confirmed ? C.obsidian : `${C.ivory}60`,
            fontFamily: 'Montserrat',
            transform: confirmed && pressing ? 'scale(0.97)' : 'scale(1)',
          }}
        >
          {confirmed ? '✓ Appointment Confirmed' : 'Book Appointment'}
        </button>

        {/* Animated cursor */}
        <div
          ref={cursorRef}
          className="pointer-events-none absolute left-4 top-4 opacity-0 transition-all duration-500"
          style={{ transitionTimingFunction: 'cubic-bezier(0.25,0.46,0.45,0.94)' }}
        >
          <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
            <path
              d="M1 1L1 14.5L4.5 11L7 17L9.5 16L7 10H13L1 1Z"
              fill={C.champagne}
              stroke={C.obsidian}
              strokeWidth="0.8"
            />
          </svg>
        </div>
      </div>

      <div>
        <h3
          className="mb-2 text-xl font-bold"
          style={{ color: C.ivory, fontFamily: 'Montserrat' }}
        >
          Local Service
        </h3>
        <p
          className="text-sm leading-relaxed"
          style={{ color: `${C.ivory}55`, fontFamily: 'Montserrat' }}
        >
          We're your neighbors — here for consultations, repairs, and follow-up care.
        </p>
      </div>
    </div>
  )
}

// ─── FEATURES SECTION ─────────────────────────────────────────────────────────
function Features() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.features-heading > *', {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      })
      gsap.from('.feature-card', {
        y: 60,
        opacity: 0,
        stagger: 0.14,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.feature-card',
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
      className="px-6 py-28"
      style={{ background: C.obsidian }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="features-heading mb-16">
          <div
            className="mb-4 flex items-center gap-3"
            style={{ color: C.champagne, fontFamily: 'Open Sans' }}
          >
            <div className="h-px w-6" style={{ background: C.champagne }} />
            <span className="text-xs uppercase tracking-[0.2em]">002 / Why Us</span>
          </div>
          <h2
            className="font-bold leading-[0.95] tracking-[-0.025em]"
            style={{
              color: C.ivory,
              fontFamily: 'Montserrat',
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              maxWidth: 600,
            }}
          >
            The difference is in the details.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <ShufflerCard />
          <TypewriterCard />
          <SchedulerCard />
        </div>
      </div>
    </section>
  )
}

// ─── PHILOSOPHY ───────────────────────────────────────────────────────────────
function Philosophy() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.philosophy-item', {
        y: 50,
        opacity: 0,
        stagger: 0.18,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          once: true,
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-32"
      style={{ background: C.slate }}
    >
      {/* Bg texture */}
      <div className="absolute inset-0 opacity-[0.07]">
        <img
          src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=1400&q=80"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>

      {/* Decorative diagonal */}
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full opacity-5"
        style={{ background: `radial-gradient(circle, ${C.champagne}, transparent 70%)` }}
      />

      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="philosophy-item mb-12 flex items-center gap-3">
          <div className="h-px w-6" style={{ background: `${C.champagne}60` }} />
          <span
            className="text-xs uppercase tracking-[0.2em]"
            style={{ color: `${C.champagne}70`, fontFamily: 'Open Sans' }}
          >
            003 / Our Philosophy
          </span>
        </div>

        <div className="space-y-6">
          <p
            className="philosophy-item text-xl leading-relaxed md:text-2xl"
            style={{ color: `${C.ivory}45`, fontFamily: 'Open Sans', maxWidth: 700 }}
          >
            We're not just a DME supplier.{' '}
            <em style={{ color: `${C.ivory}60` }}>
              We're your partners in independence.
            </em>
          </p>

          <div className="philosophy-item">
            <p
              className="font-bold leading-[1] tracking-[-0.02em]"
              style={{
                color: C.ivory,
                fontFamily: 'Montserrat',
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              }}
            >
              Restore Independence.
            </p>
            <p
              className="font-bold leading-[0.95]"
              style={{
                color: C.teal,
                fontFamily: 'Montserrat',
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              }}
            >
              Live Fully.
            </p>
          </div>

          <p
            className="philosophy-item max-w-[540px] text-lg leading-relaxed"
            style={{ color: `${C.ivory}55`, fontFamily: 'Open Sans' }}
          >
            Empathetic. Expert. Reliable. Encouraging. Since 1985, these four
            words have defined how we work — because the right equipment,
            properly fitted by people who care, changes lives.
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── PROTOCOL: STICKY STACKING CARDS ──────────────────────────────────────────
function RotatingCircles() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full">
      <style>{`
        @keyframes rotCW  { to { transform: rotate(360deg);  } }
        @keyframes rotCCW { to { transform: rotate(-360deg); } }
        .rc1 { animation: rotCW 10s linear infinite; transform-origin: 100px 100px; }
        .rc2 { animation: rotCCW 15s linear infinite; transform-origin: 100px 100px; }
        .rc3 { animation: rotCW 22s linear infinite; transform-origin: 100px 100px; }
      `}</style>
      <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(46,191,165,0.15)" strokeWidth="1" />
      <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(46,191,165,0.35)" strokeWidth="1"
        strokeDasharray="18 12" className="rc1" />
      <circle cx="100" cy="100" r="58" fill="none" stroke="rgba(46,191,165,0.5)" strokeWidth="1.5"
        strokeDasharray="8 5" className="rc2" />
      <circle cx="100" cy="100" r="36" fill="none" stroke="rgba(46,191,165,0.7)" strokeWidth="1.5"
        strokeDasharray="4 3" className="rc3" />
      <circle cx="100" cy="100" r="7" fill="#2EBFA5" opacity="0.9" />
      <circle cx="100" cy="100" r="3" fill="#FAF8F5" />
    </svg>
  )
}

function ScannerGrid() {
  const lineRef = useRef(null)
  useEffect(() => {
    if (!lineRef.current) return
    gsap.fromTo(
      lineRef.current,
      { x: 0, opacity: 0 },
      {
        x: 195,
        opacity: 1,
        duration: 2.4,
        ease: 'none',
        repeat: -1,
        repeatDelay: 0.6,
        onStart: () => gsap.set(lineRef.current, { opacity: 1 }),
        onRepeat: () => gsap.set(lineRef.current, { x: 0 }),
      }
    )
  }, [])

  return (
    <svg viewBox="0 0 200 160" className="h-full w-full">
      {Array.from({ length: 6 }).map((_, row) =>
        Array.from({ length: 8 }).map((_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={12 + col * 26}
            cy={12 + row * 26}
            r="2.5"
            fill="rgba(46,191,165,0.25)"
          />
        ))
      )}
      <line
        ref={lineRef}
        x1="0" y1="0" x2="0" y2="160"
        stroke="#2EBFA5"
        strokeWidth="1.5"
        style={{ filter: 'drop-shadow(0 0 6px rgba(46,191,165,0.8))' }}
      />
    </svg>
  )
}

function EKGLine() {
  const pathRef = useRef(null)
  useEffect(() => {
    const el = pathRef.current
    if (!el) return
    const len = el.getTotalLength()
    gsap.set(el, { strokeDasharray: len, strokeDashoffset: len })
    gsap.to(el, {
      strokeDashoffset: 0,
      duration: 2.2,
      ease: 'none',
      repeat: -1,
      repeatDelay: 0.9,
      onRepeat: () => gsap.set(el, { strokeDashoffset: len }),
    })
  }, [])

  return (
    <svg viewBox="0 0 240 90" className="w-full" style={{ maxHeight: 90 }}>
      <path
        ref={pathRef}
        d="M0,45 L35,45 L45,45 L55,12 L65,78 L75,22 L85,45 L120,45 L135,45 L145,12 L155,78 L165,22 L175,45 L240,45"
        fill="none"
        stroke="#2EBFA5"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: 'drop-shadow(0 0 5px rgba(46,191,165,0.6))' }}
      />
    </svg>
  )
}

const STEPS = [
  {
    num: '01',
    title: 'Consult',
    desc: 'A dedicated specialist takes time to understand your daily life, medical needs, and goals — before recommending a single thing.',
    bg: C.obsidian,
    visual: <RotatingCircles />,
  },
  {
    num: '02',
    title: 'Fit',
    desc: 'Every device is precisely calibrated to your body measurements, weight, transfer style, and living environment.',
    bg: C.slate,
    visual: <ScannerGrid />,
  },
  {
    num: '03',
    title: 'Support',
    desc: 'Ongoing local service, fine-tuning, and repairs ensure your equipment keeps pace with your evolving needs.',
    bg: C.obsidian,
    visual: (
      <div className="flex w-full items-center justify-center">
        <div className="w-full max-w-[280px]">
          <EKGLine />
        </div>
      </div>
    ),
  },
]

function Protocol() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card')

      cards.forEach((card, i) => {
        // Animate content in
        gsap.from(card.querySelectorAll('.pc-content > *'), {
          y: 35,
          opacity: 0,
          stagger: 0.08,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 65%',
            once: true,
          },
        })

        // Scale/blur card when next one slides over it
        if (i < cards.length - 1) {
          ScrollTrigger.create({
            trigger: cards[i + 1],
            start: 'top bottom',
            end: 'top top',
            scrub: 1.2,
            onUpdate: (self) => {
              gsap.set(card, {
                scale: 1 - self.progress * 0.1,
                filter: `blur(${self.progress * 10}px)`,
                opacity: 1 - self.progress * 0.45,
              })
            },
          })
        }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef}>
      {/* Section header — normal scroll */}
      <div className="px-6 pb-4 pt-24" style={{ background: C.obsidian }}>
        <div className="mx-auto max-w-6xl">
          <div
            className="mb-4 flex items-center gap-3"
            style={{ color: C.champagne, fontFamily: 'Open Sans' }}
          >
            <div className="h-px w-6" style={{ background: C.champagne }} />
            <span className="text-xs uppercase tracking-[0.2em]">
              004 / Our Process
            </span>
          </div>
          <h2
            className="font-bold leading-[0.95] tracking-[-0.025em]"
            style={{
              color: C.ivory,
              fontFamily: 'Montserrat',
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            }}
          >
            Three steps to freedom.
          </h2>
        </div>
      </div>

      {/* Sticky stacking cards */}
      {STEPS.map((step, i) => (
        <div
          key={step.num}
          className="protocol-card flex min-h-screen w-full items-center px-6 py-20"
          style={{
            background: step.bg,
            position: i < STEPS.length - 1 ? 'sticky' : 'relative',
            top: 0,
            zIndex: i + 10,
          }}
        >
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-2">
            <div className="pc-content space-y-6">
              <div
                className="text-xs uppercase tracking-[0.18em]"
                style={{ color: `${C.champagne}80`, fontFamily: 'Open Sans' }}
              >
                Step {step.num}
              </div>
              <h3
                className="font-bold leading-[0.92] tracking-[-0.03em]"
                style={{
                  color: C.ivory,
                  fontFamily: 'Montserrat',
                  fontSize: 'clamp(3.5rem, 7vw, 6rem)',
                }}
              >
                {step.title}
              </h3>
              <p
                className="max-w-[420px] text-lg leading-relaxed"
                style={{ color: `${C.ivory}65`, fontFamily: 'Montserrat' }}
              >
                {step.desc}
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="h-px flex-1"
                  style={{
                    background: `linear-gradient(to right, ${C.champagne}50, transparent)`,
                    maxWidth: 120,
                  }}
                />
                <span
                  className="text-xs tracking-[0.15em] uppercase"
                  style={{ color: `${C.champagne}60`, fontFamily: 'Open Sans' }}
                >
                  {i === 0
                    ? 'No commitment needed'
                    : i === 1
                    ? 'Certified specialists'
                    : 'Lifetime relationship'}
                </span>
              </div>
            </div>

            <div className="flex h-[260px] items-center justify-center md:h-[320px]">
              {step.visual}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── MARQUEE ──────────────────────────────────────────────────────────────────
function Marquee() {
  const text = [
    'Wheelchairs',
    '·',
    'Power Scooters',
    '·',
    'Lift Chairs',
    '·',
    'Walkers & Rollators',
    '·',
    'Bath Safety',
    '·',
    'Home Care',
    '·',
    'Orthotics',
    '·',
  ]

  return (
    <div
      className="overflow-hidden border-y py-5"
      style={{
        borderColor: `${C.champagne}20`,
        background: C.slate,
      }}
    >
      <div
        className="flex gap-10 whitespace-nowrap"
        style={{
          animation: 'marqueeScroll 28s linear infinite',
        }}
      >
        {[...text, ...text].map((item, i) => (
          <span
            key={i}
            className="text-sm uppercase tracking-[0.14em]"
            style={{
              color: item === '·' ? C.champagne : `${C.ivory}50`,
              fontFamily: 'Open Sans',
            }}
          >
            {item}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}

// ─── STATS ────────────────────────────────────────────────────────────────────
function Stats() {
  const sectionRef = useRef(null)
  const countersRef = useRef([])

  const stats = [
    { value: 40, suffix: '+', label: 'Years in Business' },
    { value: 12000, suffix: '+', label: 'Clients Served' },
    { value: 500, suffix: '+', label: 'Products In-Store' },
    { value: 98, suffix: '%', label: 'Client Satisfaction' },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      countersRef.current.forEach((el, i) => {
        if (!el) return
        const obj = { val: 0 }
        gsap.to(obj, {
          val: stats[i].value,
          duration: 2.2,
          ease: 'power2.out',
          snap: { val: 1 },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
          onUpdate: () => {
            el.textContent =
              obj.val >= 1000
                ? Math.round(obj.val).toLocaleString()
                : Math.round(obj.val).toString()
          },
        })
      })

      gsap.from('.stat-item', {
        y: 40,
        opacity: 0,
        stagger: 0.1,
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
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 md:grid-cols-4">
        {stats.map((s, i) => (
          <div key={i} className="stat-item text-center">
            <div
              className="flex items-end justify-center font-bold leading-none tracking-[-0.04em]"
              style={{
                color: C.ivory,
                fontFamily: 'Montserrat',
                fontSize: 'clamp(2.8rem, 5vw, 4.5rem)',
              }}
            >
              <span ref={(el) => (countersRef.current[i] = el)}>0</span>
              <span style={{ color: C.champagne, fontSize: '0.6em' }}>
                {s.suffix}
              </span>
            </div>
            <div
              className="mt-2 text-sm uppercase tracking-[0.12em]"
              style={{ color: `${C.ivory}45`, fontFamily: 'Open Sans' }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function ConsultCTA() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta-el', {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1.1,
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
      className="px-6 py-36"
      style={{ background: C.slate }}
    >
      <div className="mx-auto max-w-4xl text-center">
        <div className="cta-el mb-5 flex items-center justify-center gap-3">
          <div className="h-px w-8" style={{ background: `${C.champagne}60` }} />
          <span
            className="text-xs uppercase tracking-[0.2em]"
            style={{ color: `${C.champagne}80`, fontFamily: 'Open Sans' }}
          >
            005 / Get Started
          </span>
          <div className="h-px w-8" style={{ background: `${C.champagne}60` }} />
        </div>

        <h2
          className="cta-el font-bold leading-[0.92] tracking-[-0.03em]"
          style={{
            color: C.ivory,
            fontFamily: 'Montserrat',
            fontSize: 'clamp(3rem, 7vw, 5.5rem)',
          }}
        >
          Restore Independence.
          <br />
          <span
            style={{ color: C.teal, fontFamily: 'Montserrat' }}
          >
            Live Fully.
          </span>
        </h2>

        <p
          className="cta-el mx-auto mt-8 max-w-[480px] text-xl leading-relaxed"
          style={{ color: `${C.ivory}60`, fontFamily: 'Open Sans' }}
        >
          Book a free, no-pressure consultation with one of our certified
          mobility specialists. No obligation. Just expert guidance.
        </p>

        <div className="cta-el mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
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

// ─── FOOTER ───────────────────────────────────────────────────────────────────
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
          {/* Brand */}
          <div className="md:col-span-2">
            <div
              className="mb-3 text-2xl font-bold tracking-[-0.02em]"
              style={{ color: C.ivory, fontFamily: 'Montserrat' }}
            >
              The Mobility Center
            </div>
            <p
              className="max-w-[280px] text-sm leading-relaxed"
              style={{ color: `${C.ivory}45`, fontFamily: 'Montserrat' }}
            >
              Restore Independence. Live Fully.
              DME Company · Serving our community since 1985.
            </p>
          </div>

          {/* Nav */}
          <div>
            <div
              className="mb-5 text-xs uppercase tracking-[0.16em]"
              style={{ color: `${C.champagne}70`, fontFamily: 'Open Sans' }}
            >
              Navigation
            </div>
            <ul className="space-y-3">
              {['Products', 'Services', 'Insurance', 'About Us', 'Contact'].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="inline-block text-sm transition-all duration-150 hover:-translate-y-px"
                      style={{ color: `${C.ivory}55`, fontFamily: 'Montserrat' }}
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div
              className="mb-5 text-xs uppercase tracking-[0.16em]"
              style={{ color: `${C.champagne}70`, fontFamily: 'Open Sans' }}
            >
              Contact
            </div>
            <ul className="space-y-3">
              <li
                className="flex items-center gap-2 text-sm"
                style={{ color: `${C.ivory}55`, fontFamily: 'Montserrat' }}
              >
                <Phone size={13} style={{ color: C.champagne }} />
                (555) 000-0000
              </li>
              <li
                className="flex items-center gap-2 text-sm"
                style={{ color: `${C.ivory}55`, fontFamily: 'Montserrat' }}
              >
                <MapPin size={13} style={{ color: C.champagne }} />
                Your City, ST 00000
              </li>
              <li
                className="flex items-center gap-2 text-sm"
                style={{ color: `${C.ivory}55`, fontFamily: 'Montserrat' }}
              >
                <Clock size={13} style={{ color: C.champagne }} />
                Mon–Sat · 9am–6pm
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-5 pt-8 md:flex-row">
          <div
            className="text-xs"
            style={{ color: `${C.ivory}28`, fontFamily: 'Open Sans' }}
          >
            © 2025 The Mobility Center. All rights reserved.
          </div>

          {/* Status indicator */}
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            <span
              className="text-xs tracking-[0.12em] uppercase"
              style={{ color: `${C.ivory}35`, fontFamily: 'Open Sans' }}
            >
              System Operational
            </span>
          </div>

          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Accessibility'].map((item) => (
              <a
                key={item}
                href="#"
                className="inline-block text-xs transition-all duration-150 hover:-translate-y-px"
                style={{ color: `${C.ivory}30`, fontFamily: 'Montserrat' }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage() {
  return (
    <div style={{ background: C.obsidian }}>
      <Hero />
      <Marquee />
      <Features />
      <Philosophy />
      <Protocol />
      <Stats />
      <ConsultCTA />
      <Footer />
    </div>
  )
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/services" element={<Services />} />
      </Routes>
    </BrowserRouter>
  )
}

// ─── UTIL ─────────────────────────────────────────────────────────────────────
function wait(ms) {
  return new Promise((r) => setTimeout(r, ms))
}
