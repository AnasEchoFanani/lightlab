import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
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

const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=85',
  manifesto: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=1200&q=85',
  pillars: [
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=85',
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=85',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=85'
  ]
}

function About() {
  const { copy, language } = useLanguage()
  const isArabic = language === 'ar'
  const containerRef = useRef<HTMLDivElement>(null)
  const isDark = true // About page is dark-first like others

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.reveal-about', {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: ANIMATION.ease.luxury,
        scrollTrigger: {
          trigger: '.reveal-about',
          start: 'top 85%',
          once: true
        }
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <main
      ref={containerRef}
      className={`relative min-h-screen overflow-x-hidden transition-colors duration-700 bg-[#050505] text-white`}
    >
      <NoiseTexture />
      <AmbientGlow isDark={isDark} />

      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">

        {/* Navigation spacer */}
        <div className="h-32" />

        <section className="min-h-[80vh] flex flex-col justify-center py-20">
          <TextReveal>
            <div className="text-[11px] uppercase tracking-[0.4em] mb-10 opacity-40 font-medium">
              {copy.about.overview.heroEyebrow}
            </div>
          </TextReveal>

          <h1 className="font-display text-[clamp(3.5rem,10vw,10rem)] leading-[0.85] font-light tracking-tight mb-24">
            <SplitText text={copy.about.overview.heroTitleLine1} type="words" />
            <div className="overflow-hidden">
              <span className="block italic opacity-50">{copy.about.overview.heroTitleLine2}</span>
            </div>
          </h1>

          <div className="grid grid-cols-12 gap-12 lg:gap-24">
            <div className="col-span-12 lg:col-span-5 reveal-about">
              <div className="sticky top-32">
                <div className="rounded-lg border border-white/10 p-10 lg:p-14 bg-white/[0.02] backdrop-blur-md relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-12 h-px bg-gradient-to-r from-white/30" />
                  <div className="absolute top-0 left-0 w-px h-12 bg-gradient-to-b from-white/30" />

                  <span className="text-[10px] uppercase tracking-[0.3em] block mb-10 opacity-30 font-bold">
                    {copy.about.overview.manifestoLabel}
                  </span>
                  <div className="space-y-10">
                    <p className="text-3xl md:text-4xl font-display font-light leading-tight">
                      {copy.about.overview.manifestoLead}
                    </p>
                    <p className="text-sm opacity-40 leading-relaxed max-w-md font-light">
                      {copy.about.overview.manifestoCopy}
                    </p>
                    <div className="pt-8 flex items-center gap-6">
                      <div className="w-16 h-px bg-white/10" />
                      <span className="text-[10px] uppercase tracking-[0.2em] opacity-30 font-semibold">
                        {copy.about.overview.sinceLabel}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-7 reveal-about">
              <div className="rounded-lg overflow-hidden h-[500px] md:h-[700px] shadow-2xl relative group">
                <CinematicImage
                  src={IMAGES.manifesto}
                  alt={copy.about.overview.heroImageAlt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* Pillars Section */}
        <section className="py-40 border-t border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {copy.about.overview.pillars.map((pillar, idx) => (
              <div key={pillar.label} className="group rounded-lg overflow-hidden relative h-[500px] flex items-end reveal-about">
                <CinematicImage
                  src={IMAGES.pillars[idx]}
                  alt={pillar.label}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />

                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80 transition-opacity duration-700" />

                <div className="relative z-10 w-full p-10">
                  <span className="text-[10px] uppercase tracking-[0.3em] block mb-4 opacity-50 font-medium">{pillar.label}</span>
                  <h3 className="text-3xl font-display font-light mb-4 leading-tight">{pillar.title}</h3>
                  <p className="text-[13px] opacity-40 leading-relaxed font-light">{pillar.copy}</p>
                </div>

                {/* Border animation on hover */}
                <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 transition-colors duration-500 pointer-events-none" />
              </div>
            ))}
          </div>
        </section>

        {/* Journey/Timeline */}
        <section className="py-40">
          <div className="text-center mb-32 reveal-about">
            <span className="text-[11px] uppercase tracking-[0.4em] mb-8 block opacity-30">{copy.about.overview.journeyEyebrow}</span>
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-display font-light tracking-tighter uppercase">{copy.about.overview.journeyTitle}</h2>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="absolute left-1/2 -translate-x-1/2 h-full w-px bg-gradient-to-b from-white/20 via-white/5 to-transparent hidden md:block" />

            <div className="space-y-32 lg:space-y-48">
              {copy.about.overview.milestones.map((milestone) => (
                <div key={milestone.title} className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-0 reveal-about ${isArabic ? 'md:flex-row-reverse' : ''}`}>
                  <div className={`md:w-1/2 ${milestone.align === 'left' ? 'md:pr-20 md:text-right' : 'md:pl-20'}`}>
                    {milestone.align === 'left' ? (
                      <div className="group">
                        <span className="text-[10px] uppercase tracking-[0.3em] opacity-30 block mb-4">{milestone.date}</span>
                        <h4 className="text-3xl md:text-4xl font-display font-light mb-6 group-hover:italic transition-all duration-500">{milestone.title}</h4>
                        <p className="text-sm opacity-40 leading-relaxed font-light max-w-sm ml-auto">{milestone.copy}</p>
                      </div>
                    ) : (
                      <div className="md:hidden">
                         <span className="text-[10px] uppercase tracking-[0.3em] opacity-30 block mb-4">{milestone.date}</span>
                         <h4 className="text-3xl md:text-4xl font-display font-light mb-6">{milestone.title}</h4>
                         <p className="text-sm opacity-40 leading-relaxed font-light">{milestone.copy}</p>
                      </div>
                    )}
                  </div>

                  <div className="z-10 w-2 h-2 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)] border-4 border-[#050505] scale-125" />

                  <div className={`md:w-1/2 ${milestone.align === 'right' ? 'md:pl-20 text-left' : 'md:pr-20'}`}>
                    {milestone.align === 'right' ? (
                      <div className="group">
                        <span className="text-[10px] uppercase tracking-[0.3em] opacity-30 block mb-4">{milestone.date}</span>
                        <h4 className="text-3xl md:text-4xl font-display font-light mb-6 group-hover:italic transition-all duration-500">{milestone.title}</h4>
                        <p className="text-sm opacity-40 leading-relaxed font-light max-w-sm">{milestone.copy}</p>
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-40 border-t border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="reveal-about">
              <span className="text-[11px] uppercase tracking-[0.4em] mb-8 block opacity-30 font-medium">{copy.about.overview.ctaEyebrow}</span>
              <h2 className="text-6xl md:text-8xl font-display font-light tracking-tight uppercase mb-10">{copy.about.overview.ctaTitle}</h2>
              <p className="text-lg opacity-40 max-w-md font-light leading-relaxed">{copy.about.overview.ctaCopy}</p>
            </div>

            <div className="reveal-about flex justify-center lg:justify-end">
              <div className="rounded-lg border border-white/10 p-12 md:p-16 text-center bg-white/[0.02] backdrop-blur-md max-w-md w-full relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-12 h-px bg-gradient-to-l from-white/30" />
                <div className="absolute bottom-0 left-0 w-px h-12 bg-gradient-to-t from-white/30" />

                <span className="text-[10px] uppercase tracking-[0.3em] opacity-30 block mb-6 font-bold">{copy.about.overview.ctaMetaLabel}</span>
                <div className="text-3xl font-display font-light mb-12 italic">{copy.about.overview.ctaMetaValue}</div>

                <MagneticButton
                  href="/contact"
                  isDark={isDark}
                  className="px-12 py-5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em]"
                >
                  {copy.about.overview.ctaButton}
                </MagneticButton>
              </div>
            </div>
          </div>
        </section>

        {/* Background watermark */}
        <div className="absolute bottom-0 left-0 right-0 h-[8vw] overflow-hidden pointer-events-none flex items-start justify-center">
          <div className={`text-[18vw] font-display font-bold leading-none text-center whitespace-nowrap text-white/[0.02]`}>
            ABOUT US
          </div>
        </div>
      </div>
    </main>
  )
}

export default About
