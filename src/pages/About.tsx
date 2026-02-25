import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../i18n'
import {
  TextReveal,
  SplitText,
  CinematicImage,
  MagneticButton,
  NoiseTexture,
  AmbientGlow,
  ANIMATION
} from '../components/PremiumUI'

gsap.registerPlugin(ScrollTrigger)

const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=85',
  manifesto: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=1200&q=85',
  pillars: [
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=85',
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=85',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=85'
  ]
}

interface AboutProps {
  themeMode: 'dark' | 'light'
}

function About({ themeMode }: AboutProps) {
  const { copy, language } = useLanguage()
  const isArabic = language === 'ar'
  const containerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const progressLineRef = useRef<HTMLDivElement>(null)
  const isDark = themeMode === 'dark'

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // General entry animations
      gsap.from('.reveal-about', {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: ANIMATION.ease.luxury,
        scrollTrigger: {
          trigger: '.reveal-about',
          start: 'top 90%',
          once: true
        }
      })

      // Timeline line growth
      if (progressLineRef.current && timelineRef.current) {
        gsap.fromTo(progressLineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 30%',
              end: 'bottom 70%',
              scrub: 1
            }
          }
        )
      }

      // Parallax for team images
      gsap.utils.toArray('.team-card-inner').forEach((card: any) => {
        gsap.from(card.querySelector('img'), {
          yPercent: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        })
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <main
      ref={containerRef}
      className={`relative min-h-screen overflow-x-hidden transition-colors duration-700 ${isDark ? 'bg-[#050505] text-white' : 'bg-[#fafafa] text-black'}`}
    >
      <NoiseTexture />
      <AmbientGlow isDark={isDark} />

      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">

        {/* Navigation spacer */}
        <div className="h-32" />

        <section className="min-h-[70vh] flex flex-col justify-center py-20">
          <TextReveal>
            <div className="text-[11px] uppercase tracking-[0.5em] mb-10 opacity-40 font-semibold">
              {copy.about.overview.heroEyebrow}
            </div>
          </TextReveal>

          <h1 className="font-display text-[clamp(3.5rem,9vw,9rem)] leading-[0.85] font-light tracking-tighter mb-24">
            <SplitText text={copy.about.overview.heroTitleLine1} type="words" />
            <div className="overflow-hidden">
              <span className="block italic opacity-40 translate-y-2">
                <SplitText text={copy.about.overview.heroTitleLine2} type="words" />
              </span>
            </div>
          </h1>

          <div className="grid grid-cols-12 gap-12 lg:gap-24 items-start">
            <div className="col-span-12 lg:col-span-5 reveal-about">
              <div className="sticky top-40">
                <div className="rounded-2xl border border-white/10 p-10 lg:p-14 bg-white/[0.02] backdrop-blur-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-24 h-[1px] bg-gradient-to-r from-white/40 to-transparent" />
                  <div className="absolute top-0 left-0 w-[1px] h-24 bg-gradient-to-b from-white/40 to-transparent" />

                  <span className="text-[10px] uppercase tracking-[0.4em] block mb-10 opacity-30 font-bold">
                    {copy.about.overview.manifestoLabel}
                  </span>
                  <div className="space-y-10">
                    <p className="text-3xl md:text-5xl font-display font-light leading-[1.1] tracking-tight">
                      {copy.about.overview.manifestoLead}
                    </p>
                    <p className="text-base opacity-40 leading-relaxed max-w-md font-light">
                      {copy.about.overview.manifestoCopy}
                    </p>
                    <div className="pt-10 flex items-center gap-6">
                      <div className="w-12 h-px bg-white/20" />
                      <span className="text-[10px] uppercase tracking-[0.3em] opacity-30 font-bold italic">
                        {copy.about.overview.sinceLabel}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-7 reveal-about">
              <div className="rounded-2xl overflow-hidden h-[550px] md:h-[800px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] relative group">
                <CinematicImage
                  src={IMAGES.manifesto}
                  alt={copy.about.overview.heroImageAlt}
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
              </div>
            </div>
          </div>
        </section>

        {/* Operating Principles - NEW */}
        <section className={`py-40 border-t ${isDark ? 'border-white/5' : 'border-black/5'}`}>
          <div className="mb-24 reveal-about">
            <span className="text-[11px] uppercase tracking-[0.5em] mb-6 block opacity-30 font-bold">
              {copy.about.principlesTitle}
            </span>
            <h2 className="text-5xl md:text-7xl font-display font-light tracking-tight italic opacity-80">
              The Architecture of Excellence.
            </h2>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-3 gap-1px ${isDark ? 'bg-white/10 border-white/10' : 'bg-black/10 border-black/10'} border rounded-2xl overflow-hidden reveal-about`}>
            {copy.about.principles.map((principle, idx) => (
              <div key={idx} className={`${isDark ? 'bg-[#050505] hover:bg-white/[0.03]' : 'bg-[#fafafa] hover:bg-black/[0.03]'} p-12 lg:p-16 transition-colors duration-500 group`}>
                <div className="text-[10px] uppercase tracking-[0.4em] opacity-30 mb-12 font-bold group-hover:opacity-100 group-hover:translate-x-2 transition-all">
                  Principle {idx + 1}
                </div>
                <h3 className="text-3xl font-display font-light mb-8 group-hover:italic transition-all">
                  {principle.title}
                </h3>
                <p className="text-sm opacity-40 leading-relaxed font-light group-hover:opacity-60 transition-opacity">
                  {principle.copy}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Pillars Section */}
        <section className="py-40">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {copy.about.overview.pillars.map((pillar, idx) => (
              <div key={idx} className="group rounded-2xl overflow-hidden relative h-[600px] flex items-end reveal-about shadow-2xl">
                <CinematicImage
                  src={IMAGES.pillars[idx]}
                  alt={pillar.label}
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:scale-110 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                />

                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black transition-opacity duration-700" />

                <div className="relative z-10 w-full p-12">
                  <span className="text-[10px] uppercase tracking-[0.4em] block mb-6 opacity-50 font-bold">
                    {pillar.label}
                  </span>
                  <h3 className="text-4xl font-display font-light mb-6 leading-tight tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-sm opacity-40 leading-relaxed font-light group-hover:opacity-80 transition-opacity">
                    {pillar.copy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section - IMPROVED */}
        <section className={`py-40 border-t ${isDark ? 'border-white/5' : 'border-black/5'}`}>
          <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-12 reveal-about">
            <div className="max-w-2xl">
              <span className={`text-[11px] uppercase tracking-[0.5em] mb-8 block font-bold ${isDark ? 'opacity-30' : 'opacity-40'}`}>
                {copy.about.teamTitle}
              </span>
              <h2 className="text-6xl md:text-8xl font-display font-light tracking-tighter uppercase leading-[0.9]">
                {copy.about.teamSubtitle}
              </h2>
            </div>
            <div className={`flex flex-wrap gap-4 max-w-sm justify-end text-right ${isDark ? 'opacity-40' : 'opacity-50'}`}>
              {copy.about.teamStack.map((item, idx) => (
                <span key={idx} className={`text-[9px] uppercase tracking-[0.3em] font-bold border px-4 py-2 rounded-full whitespace-nowrap ${isDark ? 'border-white/20' : 'border-black/20'}`}>
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-20">
            {copy.about.overview.team.map((member, idx) => (
              <div key={idx} className={`reveal-about ${member.offset}`}>
                <div className="team-card-inner group cursor-crosshair">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-xl mb-10 bg-white/5 border border-white/10">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-2xl font-display font-light group-hover:italic transition-all">
                      {member.name}
                    </h4>
                    <p className="text-[11px] uppercase tracking-[0.3em] opacity-30 font-bold group-hover:opacity-60 transition-opacity">
                      {member.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Journey/Timeline - UPGRADED */}
        <section className={`py-40 border-t ${isDark ? 'border-white/5' : 'border-black/5'} overflow-visible`}>
          <div className="text-center mb-40 reveal-about">
            <span className="text-[11px] uppercase tracking-[0.5em] mb-8 block opacity-30 font-bold">
              {copy.about.overview.journeyEyebrow}
            </span>
            <h2 className="text-7xl md:text-[10rem] font-display font-light tracking-tighter uppercase leading-none italic opacity-80">
              {copy.about.overview.journeyTitle}
            </h2>
          </div>

          <div ref={timelineRef} className="relative max-w-6xl mx-auto px-4 md:px-0">
            {/* Animated vertical line */}
            <div className={`absolute left-1/2 -translate-x-1/2 h-full w-[1px] ${isDark ? 'bg-white/10' : 'bg-black/10'} hidden md:block`}>
              <div ref={progressLineRef} className={`w-full h-full bg-gradient-to-b ${isDark ? 'from-white via-white/40' : 'from-black via-black/40'} to-transparent origin-top scale-y-0`} />
            </div>

            <div className="space-y-40 lg:space-y-64">
              {copy.about.overview.milestones.map((milestone, idx) => (
                <div
                  key={idx}
                  className={`relative flex flex-col md:flex-row items-center gap-12 md:gap-0 reveal-about ${isArabic ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Left Side */}
                  <div className={`md:w-1/2 ${milestone.align === 'left' ? 'md:pr-24 md:text-right' : 'md:opacity-0 pointer-events-none hidden md:block'}`}>
                    <div className="group">
                      <span className="text-[11px] uppercase tracking-[0.4em] opacity-30 block mb-6 font-bold">{milestone.date}</span>
                      <h4 className="text-4xl md:text-6xl font-display font-light mb-8 group-hover:italic transition-all leading-tight">{milestone.title}</h4>
                      <p className="text-base opacity-40 leading-relaxed font-light max-w-sm ml-auto">{milestone.copy}</p>
                    </div>
                  </div>

                  {/* Center Dot */}
                  <div className={`z-10 w-4 h-4 rounded-full ${isDark ? 'bg-white shadow-[0_0_30px_rgba(255,255,255,0.6)] border-[#050505]' : 'bg-black shadow-[0_0_30px_rgba(0,0,0,0.2)] border-[#fafafa]'} border-4 scale-150 absolute left-1/2 -translate-x-1/2 top-0 md:top-auto hidden md:block`} />

                  {/* Right Side */}
                  <div className={`md:w-1/2 ${milestone.align === 'right' ? 'md:pl-24 text-left' : 'md:opacity-0 pointer-events-none hidden md:block'}`}>
                    <div className="group">
                      <span className="text-[11px] uppercase tracking-[0.4em] opacity-30 block mb-6 font-bold">{milestone.date}</span>
                      <h4 className="text-4xl md:text-6xl font-display font-light mb-8 group-hover:italic transition-all leading-tight">{milestone.title}</h4>
                      <p className="text-base opacity-40 leading-relaxed font-light max-w-sm">{milestone.copy}</p>
                    </div>
                  </div>

                  {/* Mobile Version of invisible side */}
                  <div className="md:hidden text-center">
                    <span className="text-[11px] uppercase tracking-[0.4em] opacity-30 block mb-4 font-bold">{milestone.date}</span>
                    <h4 className="text-4xl font-display font-light mb-6">{milestone.title}</h4>
                    <p className="text-sm opacity-40 leading-relaxed font-light">{milestone.copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={`py-40 border-t ${isDark ? 'border-white/5' : 'border-black/5'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="reveal-about">
              <span className="text-[11px] uppercase tracking-[0.5em] mb-8 block opacity-30 font-bold">
                {copy.about.overview.ctaEyebrow}
              </span>
              <h2 className="text-7xl md:text-9xl font-display font-light tracking-tighter uppercase mb-12 leading-[0.85]">
                {copy.about.overview.ctaTitle}
              </h2>
              <p className="text-xl opacity-40 max-w-md font-light leading-relaxed">
                {copy.about.overview.ctaCopy}
              </p>
            </div>

            <div className="reveal-about flex justify-center lg:justify-end">
              <div className={`rounded-3xl border ${isDark ? 'border-white/10 bg-white/[0.02]' : 'border-black/10 bg-black/[0.02]'} p-12 md:p-20 text-center backdrop-blur-3xl max-w-lg w-full relative overflow-hidden group shadow-2xl`}>
                <div className={`absolute top-0 right-0 w-32 h-[1px] bg-gradient-to-l ${isDark ? 'from-white/40' : 'from-black/40'} to-transparent`} />
                <div className={`absolute bottom-0 left-0 w-[1px] h-32 bg-gradient-to-t ${isDark ? 'from-white/40' : 'from-black/40'} to-transparent`} />

                <span className="text-[11px] uppercase tracking-[0.4em] opacity-30 block mb-8 font-bold">
                  {copy.about.overview.ctaMetaLabel}
                </span>
                <div className="text-4xl font-display font-light mb-16 italic opacity-80">
                  {copy.about.overview.ctaMetaValue}
                </div>

                <MagneticButton
                  href="/contact"
                  isDark={isDark}
                  className="w-full py-7 rounded-full text-[11px] font-bold uppercase tracking-[0.3em]"
                >
                  {copy.about.overview.ctaButton}
                </MagneticButton>
              </div>
            </div>
          </div>
        </section>

        {/* Background watermark */}
        <div className="absolute bottom-0 left-0 right-0 h-[8vw] overflow-hidden pointer-events-none flex items-start justify-center">
          <div className="text-[18vw] font-display font-bold leading-none text-center whitespace-nowrap text-white/[0.015] tracking-widest">
            ABOUT LIGHTLAB
          </div>
        </div>
      </div>
    </main>
  )
}

export default About
