import { useRef, useLayoutEffect, useState } from 'react'
import { FiArrowRight, FiCheck, FiPlus, FiMinus } from 'react-icons/fi'
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

interface ContactProps {
  themeMode: 'dark' | 'light'
}

function Contact({ themeMode }: ContactProps) {
  const { copy } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const isDark = themeMode === 'dark'

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.reveal-contact', {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: ANIMATION.ease.luxury,
        scrollTrigger: {
          trigger: '.reveal-contact',
          start: 'top 90%',
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
      className={`relative min-h-screen overflow-x-hidden transition-colors duration-700 ${isDark ? 'bg-[#050505] text-white' : 'bg-[#fafafa] text-black'}`}
    >
      <NoiseTexture />
      <AmbientGlow isDark={isDark} />

      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">

        {/* Navigation spacer */}
        <div className="h-32" />

        {/* Hero Section */}
        <section className="pt-20 pb-32">
          <div className="rounded-2xl overflow-hidden h-[450px] md:h-[650px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] relative group reveal-contact">
            <CinematicImage
              src={IMAGES.hero}
              alt={copy.contact.heroImageAlt}
              className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

            <div className="absolute bottom-12 left-12 right-12 flex flex-col md:flex-row justify-between items-end gap-8">
               <div className="max-w-xl">
                 <span className="text-[10px] uppercase tracking-[0.5em] mb-6 block opacity-60 font-bold">
                   {copy.contact.heroEyebrow}
                 </span>
                 <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.9] font-light tracking-tighter uppercase">
                   <SplitText text={copy.contact.heroTitleLine1} type="words" />
                   <div className="overflow-hidden">
                     <span className="block italic opacity-60 translate-y-2">
                       {copy.contact.heroTitleLine2}
                     </span>
                   </div>
                 </h1>
               </div>
               <div className="hidden md:block">
                 <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] font-bold opacity-40">
                    <span className="w-12 h-px bg-white/40" />
                    Available for Q4 2024
                 </div>
               </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-12 gap-12 lg:gap-24 pb-40 items-start">
          {/* Form Side */}
          <div className="col-span-12 lg:col-span-7">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-24 reveal-contact">
                {/* Track Selection */}
                <div className="space-y-12">
                  <p className="text-[11px] uppercase tracking-[0.4em] opacity-40 font-bold">
                    {copy.contact.serviceQuestion}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {copy.contact.projectTypes.map((type) => {
                      const id = `service-${type.replace(/\s+/g, '-').toLowerCase()}`
                      return (
                        <div className="relative group" key={type}>
                          <input className="hidden service-toggle" id={id} name="service" type="checkbox" value={type} />
                          <label
                            className={`px-8 py-5 rounded-full border ${isDark ? 'border-white/10 hover:bg-white/5 peer-checked:bg-white peer-checked:text-black peer-checked:border-white' : 'border-black/10 hover:bg-black/5 peer-checked:bg-black peer-checked:text-white peer-checked:border-black'} text-[10px] font-bold uppercase tracking-[0.3em] cursor-pointer transition-all inline-block shadow-lg`}
                            htmlFor={id}
                          >
                            {type}
                          </label>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Main Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20">
                  <div className="relative group">
                    <label className={`text-[10px] uppercase tracking-[0.4em] mb-4 block font-bold group-focus-within:opacity-100 transition-opacity ${isDark ? 'opacity-30' : 'opacity-40'}`}>
                      {copy.contact.nameLabel}
                    </label>
                    <input
                      required
                      className={`w-full bg-transparent border-b ${isDark ? 'border-white/10 focus:border-white' : 'border-black/10 focus:border-black'} py-5 text-3xl font-display font-light outline-none transition-colors placeholder:opacity-10`}
                      placeholder={copy.contact.namePlaceholder}
                      type="text"
                    />
                  </div>
                  <div className="relative group">
                    <label className={`text-[10px] uppercase tracking-[0.4em] mb-4 block font-bold group-focus-within:opacity-100 transition-opacity ${isDark ? 'opacity-30' : 'opacity-40'}`}>
                      {copy.contact.emailLabel}
                    </label>
                    <input
                      required
                      className={`w-full bg-transparent border-b ${isDark ? 'border-white/10 focus:border-white' : 'border-black/10 focus:border-black'} py-5 text-3xl font-display font-light outline-none transition-colors placeholder:opacity-10`}
                      placeholder={copy.contact.emailPlaceholder}
                      type="email"
                    />
                  </div>
                  <div className="col-span-full relative group">
                    <label className={`text-[10px] uppercase tracking-[0.4em] mb-4 block font-bold group-focus-within:opacity-100 transition-opacity ${isDark ? 'opacity-30' : 'opacity-40'}`}>
                      {copy.contact.detailsLabel}
                    </label>
                    <textarea
                      required
                      className={`w-full bg-transparent border-b ${isDark ? 'border-white/10 focus:border-white' : 'border-black/10 focus:border-black'} py-5 text-3xl font-display font-light outline-none transition-colors placeholder:opacity-10 resize-none min-h-[150px]`}
                      placeholder={copy.contact.detailsPlaceholder}
                      rows={4}
                    />
                  </div>
                </div>

                <div className="pt-10">
                  <MagneticButton
                    type="submit"
                    isDark={isDark}
                    className="group flex items-center justify-between w-full md:w-auto md:min-w-[300px] px-16 py-7 rounded-full text-[11px] font-bold uppercase tracking-[0.3em] shadow-2xl"
                  >
                    <span>{copy.contact.sendLabel}</span>
                    <FiArrowRight className="text-xl group-hover:translate-x-3 transition-transform" />
                  </MagneticButton>
                </div>
              </form>
            ) : (
              <div className="py-32 text-center reveal-contact bg-white/[0.02] border border-white/10 rounded-3xl backdrop-blur-3xl shadow-2xl">
                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-12 border border-white/10 shadow-lg">
                  <FiCheck className="text-5xl text-white" />
                </div>
                <h3 className="text-5xl md:text-6xl font-display font-light mb-8 uppercase tracking-tighter italic">Message Sent</h3>
                <p className="text-lg opacity-40 font-light max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out. Our team will review your project details and get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-16 text-[10px] uppercase tracking-[0.4em] opacity-40 hover:opacity-100 transition-opacity underline underline-offset-[12px] font-bold"
                >
                  Send another message
                </button>
              </div>
            )}

            {/* FAQ Section - NEW */}
            <div className="mt-48 reveal-contact">
              <div className="mb-20">
                <span className={`text-[11px] uppercase tracking-[0.5em] mb-6 block font-bold ${isDark ? 'opacity-30' : 'opacity-40'}`}>
                  {copy.contact.faqTitle}
                </span>
                <h2 className="text-5xl font-display font-light tracking-tight italic">
                  {copy.contact.faqSubtitle}
                </h2>
              </div>

              <div className="space-y-4">
                {copy.contact.faqs.map((faq, idx) => (
                  <div key={idx} className={`border-b ${isDark ? 'border-white/10' : 'border-black/10'} overflow-hidden`}>
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full py-10 flex items-center justify-between text-left group"
                    >
                      <h4 className={`text-2xl font-display font-light group-hover:opacity-100 transition-opacity ${isDark ? 'opacity-60' : 'opacity-70'}`}>
                        {faq.q}
                      </h4>
                      <div className={`w-10 h-10 rounded-full border ${isDark ? 'border-white/10' : 'border-black/10'} flex items-center justify-center opacity-40 group-hover:opacity-100 group-hover:rotate-90 transition-all`}>
                        {openFaq === idx ? <FiMinus /> : <FiPlus />}
                      </div>
                    </button>
                    <div className={`transition-all duration-500 ease-in-out ${openFaq === idx ? 'max-h-96 pb-12 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                      <p className="text-base opacity-40 font-light leading-relaxed max-w-2xl">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Info Side */}
          <aside className="col-span-12 lg:col-span-5 reveal-contact">
            <div className={`border ${isDark ? 'border-white/10 bg-white/[0.02]' : 'border-black/10 bg-black/[0.02]'} overflow-hidden rounded-3xl backdrop-blur-3xl sticky top-40 shadow-2xl`}>
              <div className="relative h-[350px] overflow-hidden group">
                <CinematicImage
                  src={IMAGES.side}
                  alt="Contact details"
                  className="w-full h-full object-cover grayscale opacity-70 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className={`absolute top-8 left-8 flex items-center gap-4 ${isDark ? 'bg-black/40' : 'bg-white/40'} backdrop-blur-md px-4 py-2 rounded-full border ${isDark ? 'border-white/10' : 'border-black/10'}`}>
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                  </span>
                  <span className={`text-[10px] uppercase tracking-[0.3em] font-bold ${isDark ? 'text-white/90' : 'text-black/90'}`}>
                    {copy.contact.statusLabel}
                  </span>
                </div>
              </div>

              <div className="p-12 lg:p-16">
                <div className="space-y-16">
                  <section>
                    <span className={`text-[10px] uppercase tracking-[0.4em] block mb-8 font-bold ${isDark ? 'opacity-30' : 'opacity-40'}`}>
                      {copy.contact.studioLabel}
                    </span>
                    <a className={`text-4xl font-display font-light hover:italic transition-all block mb-6 tracking-tighter underline underline-offset-8 ${isDark ? 'decoration-white/10 hover:decoration-white' : 'decoration-black/10 hover:decoration-black'}`} href={`mailto:${copy.footer.email}`}>
                      {copy.footer.email}
                    </a>
                    <p className="text-[14px] opacity-40 leading-relaxed max-w-[280px] font-light">
                      {copy.footer.location}
                    </p>
                  </section>

                  <section>
                    <span className={`text-[10px] uppercase tracking-[0.4em] block mb-10 font-bold ${isDark ? 'opacity-30' : 'opacity-40'}`}>
                      {copy.contact.followLabel}
                    </span>
                    <div className="grid grid-cols-1 gap-2">
                      {copy.contact.socials.map((label) => (
                        <a key={label} className={`flex items-center justify-between group py-4 px-6 -mx-6 border-b border-white/0 ${isDark ? 'hover:border-white/10 hover:bg-white/[0.02]' : 'hover:border-black/10 hover:bg-black/[0.02]'} transition-all`} href="#">
                          <span className="text-[11px] font-bold uppercase tracking-[0.3em]">{label}</span>
                          <FiArrowRight className="text-base opacity-20 -rotate-45 group-hover:rotate-0 group-hover:opacity-100 transition-all" />
                        </a>
                      ))}
                    </div>
                  </section>

                  {/* Velocity Card - NEW */}
                  <div className={`p-10 rounded-2xl ${isDark ? 'bg-white/[0.04] border-white/5' : 'bg-black/[0.04] border-black/5'} border relative overflow-hidden group shadow-inner`}>
                    <div className={`absolute top-0 right-0 w-32 h-[1px] bg-gradient-to-l ${isDark ? 'from-white/30' : 'from-black/30'} to-transparent group-hover:w-full transition-all duration-1000`} />
                    <span className={`text-[10px] uppercase tracking-[0.4em] block mb-6 font-bold ${isDark ? 'opacity-30' : 'opacity-40'}`}>
                      {copy.contact.processLabel}
                    </span>
                    <p className="text-[14px] opacity-50 font-light leading-relaxed italic">
                      "{copy.contact.processCopy}"
                    </p>
                    <div className="mt-8 flex items-center gap-4">
                      <div className="flex -space-x-2">
                        {[1,2,3].map(i => (
                          <div key={i} className={`w-6 h-6 rounded-full border-2 ${isDark ? 'border-[#050505]' : 'border-[#fafafa]'} bg-white/10 overflow-hidden`}>
                            <img src={`https://i.pravatar.cc/100?u=${i+10}`} alt="team" className="w-full h-full object-cover grayscale" />
                          </div>
                        ))}
                      </div>
                      <span className="text-[9px] uppercase tracking-[0.2em] opacity-30 font-bold">Fast-track Discovery</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </section>

        {/* Background watermark */}
        <div className="absolute bottom-0 left-0 right-0 h-[8vw] overflow-hidden pointer-events-none flex items-start justify-center">
          <div className="text-[18vw] font-display font-bold leading-none text-center whitespace-nowrap text-white/[0.015] tracking-widest">
            GET IN TOUCH
          </div>
        </div>
      </div>
    </main>
  )
}

export default Contact
