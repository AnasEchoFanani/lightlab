import { useRef, useLayoutEffect, useState } from 'react'
import { FiArrowRight, FiCheck } from 'react-icons/fi'
import { gsap } from 'gsap'
import { useLanguage } from '../i18n'
import {
  SplitText,
  CinematicImage,
  MagneticButton,
  NoiseTexture,
  AmbientGlow,
  ANIMATION
} from '../components/PremiumUI'

const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=85',
  side: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=85'
}

function Contact() {
  const { copy } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const isDark = true

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.reveal-contact', {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: ANIMATION.ease.luxury,
        scrollTrigger: {
          trigger: '.reveal-contact',
          start: 'top 85%',
          once: true
        }
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
  }

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

        <section className="pt-20 pb-32">
          <div className="rounded-lg overflow-hidden h-[400px] md:h-[550px] shadow-2xl relative group reveal-contact">
            <CinematicImage
              src={IMAGES.hero}
              alt={copy.contact.heroImageAlt}
              className="w-full h-full object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        </section>

        <section className="grid grid-cols-12 gap-12 lg:gap-24 pb-40">
          <div className="col-span-12 lg:col-span-7">
            <header className="mb-20 reveal-contact">
              <span className="text-[11px] uppercase tracking-[0.4em] mb-8 block opacity-40 font-medium">
                {copy.contact.heroEyebrow}
              </span>
              <h1 className="font-display text-[clamp(3rem,8vw,8rem)] leading-[0.9] font-light tracking-tight uppercase">
                <SplitText text={copy.contact.heroTitleLine1} type="words" />
                <div className="overflow-hidden">
                  <span className="block italic opacity-50">{copy.contact.heroTitleLine2}</span>
                </div>
              </h1>
            </header>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-20 reveal-contact">
                <div className="space-y-10">
                  <p className="text-[11px] uppercase tracking-[0.3em] mb-8 opacity-40 font-bold">
                    {copy.contact.serviceQuestion}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {copy.contact.projectTypes.map((type) => {
                      const id = `service-${type.replace(/\s+/g, '-').toLowerCase()}`
                      return (
                        <div className="relative group" key={type}>
                          <input className="hidden service-toggle" id={id} name="service" type="checkbox" value={type} />
                          <label
                            className="px-8 py-4 rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] cursor-pointer transition-all hover:bg-white/5 peer-checked:bg-white peer-checked:text-black peer-checked:border-white inline-block"
                            htmlFor={id}
                          >
                            {type}
                          </label>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                  <div className="relative group">
                    <label className="text-[10px] uppercase tracking-[0.3em] mb-4 block opacity-30 font-bold group-focus-within:opacity-100 transition-opacity">
                      {copy.contact.nameLabel}
                    </label>
                    <input
                      required
                      className="w-full bg-transparent border-b border-white/10 py-4 text-2xl font-display font-light outline-none focus:border-white transition-colors placeholder:opacity-20"
                      placeholder={copy.contact.namePlaceholder}
                      type="text"
                    />
                  </div>
                  <div className="relative group">
                    <label className="text-[10px] uppercase tracking-[0.3em] mb-4 block opacity-30 font-bold group-focus-within:opacity-100 transition-opacity">
                      {copy.contact.emailLabel}
                    </label>
                    <input
                      required
                      className="w-full bg-transparent border-b border-white/10 py-4 text-2xl font-display font-light outline-none focus:border-white transition-colors placeholder:opacity-20"
                      placeholder={copy.contact.emailPlaceholder}
                      type="email"
                    />
                  </div>
                  <div className="col-span-full relative group">
                    <label className="text-[10px] uppercase tracking-[0.3em] mb-4 block opacity-30 font-bold group-focus-within:opacity-100 transition-opacity">
                      {copy.contact.detailsLabel}
                    </label>
                    <textarea
                      required
                      className="w-full bg-transparent border-b border-white/10 py-4 text-2xl font-display font-light outline-none focus:border-white transition-colors placeholder:opacity-20 resize-none"
                      placeholder={copy.contact.detailsPlaceholder}
                      rows={3}
                    />
                  </div>
                </div>

                <div className="pt-10">
                  <MagneticButton
                    type="submit"
                    isDark={isDark}
                    className="group flex items-center gap-6 px-14 py-6 rounded-full text-[11px] font-bold uppercase tracking-[0.25em]"
                  >
                    <span>{copy.contact.sendLabel}</span>
                    <FiArrowRight className="text-lg group-hover:translate-x-2 transition-transform" />
                  </MagneticButton>
                </div>
              </form>
            ) : (
              <div className="py-20 text-center reveal-contact">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-10 border border-white/10">
                  <FiCheck className="text-4xl text-white" />
                </div>
                <h3 className="text-4xl font-display font-light mb-6 uppercase tracking-tight">Message Sent</h3>
                <p className="opacity-40 font-light max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out. Our team will review your project details and get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-12 text-[10px] uppercase tracking-[0.3em] opacity-40 hover:opacity-100 transition-opacity underline underline-offset-8"
                >
                  Send another message
                </button>
              </div>
            )}
          </div>

          <aside className="col-span-12 lg:col-span-5 reveal-contact">
            <div className="border border-white/10 overflow-hidden rounded-lg bg-white/[0.02] backdrop-blur-md sticky top-32">
              <div className="relative h-[300px] overflow-hidden group">
                <CinematicImage
                  src={IMAGES.side}
                  alt="Contact details"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute top-6 left-6 flex items-center gap-3">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/90">
                    {copy.contact.statusLabel}
                  </span>
                </div>
              </div>

              <div className="p-10 lg:p-14">
                <div className="space-y-12">
                  <section>
                    <span className="text-[10px] uppercase tracking-[0.3em] block mb-6 opacity-30 font-bold">{copy.contact.studioLabel}</span>
                    <a className="text-3xl font-display font-light hover:italic transition-all block mb-4" href={`mailto:${copy.footer.email}`}>
                      {copy.footer.email}
                    </a>
                    <p className="text-[13px] opacity-40 leading-relaxed max-w-[240px] font-light">{copy.footer.location}</p>
                  </section>

                  <section>
                    <span className="text-[10px] uppercase tracking-[0.3em] block mb-8 opacity-30 font-bold">{copy.contact.followLabel}</span>
                    <div className="flex flex-col gap-4">
                      {copy.contact.socials.map((label) => (
                        <a key={label} className="flex items-center justify-between group py-3 border-b border-white/5 hover:border-white/20 transition-colors" href="#">
                          <span className="text-[11px] font-bold uppercase tracking-[0.2em]">{label}</span>
                          <FiArrowRight className="text-sm opacity-20 -rotate-45 group-hover:rotate-0 group-hover:opacity-100 transition-all" />
                        </a>
                      ))}
                    </div>
                  </section>

                  <div>
                    <div className="p-6 rounded-lg bg-white/[0.03] border border-white/5 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-8 h-px bg-white/10 group-hover:w-full transition-all duration-700" />
                      <span className="text-[10px] uppercase tracking-[0.3em] block mb-4 opacity-30 font-bold">{copy.contact.processLabel}</span>
                      <p className="text-[12px] opacity-40 font-light leading-relaxed">{copy.contact.processCopy}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </section>

        {/* Background watermark */}
        <div className="absolute bottom-0 left-0 right-0 h-[8vw] overflow-hidden pointer-events-none flex items-start justify-center">
          <div className={`text-[18vw] font-display font-bold leading-none text-center whitespace-nowrap text-white/[0.02]`}>
            CONTACT
          </div>
        </div>
      </div>
    </main>
  )
}

export default Contact
