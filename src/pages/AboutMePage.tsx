import { useRef } from 'react';
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import shashi1 from '../assets/A Foundation of Discipline.png';
import shashi2 from '../assets/the character.png';
import shashi3 from '../assets/Academic Mastery1.png';
import shashi4 from '../assets/shashi4.png';
import shashi6 from '../assets/shashi6.png';
import shashi7 from '../assets/shashi7.png';
import heroBg from '../assets/about page banner.jpg';

const content = {
  en: {
    eyebrow: "The Visionary Behind the Mission",
    name1: "Shashikiran KN",
    tagline: "Engineer. Economist. Nationalist. Shaped by discipline, driven by Dharma — dedicated to Srirangam.",
    cta1: "My Journey →", cta2: "Learn More",
    s1Tag: "Roots & Early Life", s1Title: "A Foundation of", s1Accent: "Discipline",
    s1p1: "Born 1993, Shashikiran KN grew up in a family where commerce met integrity. He learned the value of a rupee and the weight of a promise from a very young age.",
    s1p2: "Every policy made in an office affects the kitchen budget of a common family. This rare \"Ground-Zero\" understanding shapes every decision he makes.",
    s2Tag: "Ethics & Spirituality", s2Title: "The", s2Accent: "Character",
    s2p: "Forged in Ramakrishna School under Swami Vivekananda's teachings. He learned that \"Service to Man is Service to God.\"",
    s2sub1Title: "Cultural Grounding", s2sub1: "Shaped by the Ramayana & Mahabharata — leadership is the courage to stand for Dharma, not grasp for power.",
    s2sub2Title: "Path of Dharma", s2sub2: "Politics is not a career — it is a spiritual duty. Replacing the politics of convenience with the politics of conscience.",
    s3Tag: "The Intellectual Architect", s3Title: "Academic", s3Accent: "Mastery",
    ctaTag: "The Rare Leader", ctaQuote: '"Passion without knowledge is dangerous."',
    ctaDesc: "Shashikiran KN brings both — in equal measure. The kind of leader Srirangam truly deserves.",
    ctaJoin: "Join The Movement", ctaJourney: "See My Journey →",
    creds: [
      { n: "01", title: "Engineering Logic", desc: "Views social problems like a machine — identifying the broken part and fixing it with precision.", color: "#CC0000" },
      { n: "02", title: "Strategic Management", desc: "MBA background allows large-scale public project management with corporate efficiency.", color: "#FF8C00" },
      { n: "03", title: "Public Policy & Admin", desc: "Post Graduate Diploma gives insider knowledge of how government machinery works.", color: "#CC0000" },
      { n: "04", title: "IAS Foundation", desc: "Rigorous IAS Academy training — mastery in Indian History, Polity, and Economics.", color: "#FF8C00" },
    ],
  },
  ta: {
    eyebrow: "லட்சியத்தின் பின்னணியில் உள்ள தொலைநோக்காளர்",
    name1: "சசிகிரண் கே.என்",
    tagline: "பொறியாளர். பொருளாதார நிபுணர். தேசியவாதி. ஒழுக்கத்தால் உருவாக்கப்பட்டவர், தர்மத்தால் இயக்கப்படுபவர்.",
    cta1: "என் பயணம் →", cta2: "மேலும் அறிக",
    s1Tag: "வேர்கள் மற்றும் ஆரம்ப வாழ்க்கை", s1Title: "ஒழுக்கத்தின்", s1Accent: "அடித்தளம்",
    s1p1: "1993-ல் பிறந்த சசிகிரண் கே.என், வணிகமும் நேர்மையும் சந்திக்கும் குடும்பத்தில் வளர்ந்தார். சின்ன வயதிலேயே ஒரு ரூபாயின் மதிப்பையும் வாக்குறுதியின் எடையையும் கற்றார்.",
    s1p2: "அலுவலகத்தில் எடுக்கும் ஒவ்வொரு கொள்கையும் சாமானிய குடும்பத்தின் சமையல் பட்ஜெட்டை பாதிக்கிறது — இந்த அரிய புரிதல் அவரின் ஒவ்வொரு முடிவையும் வடிவமைக்கிறது.",
    s2Tag: "நெறிமுறைகள் மற்றும் ஆன்மீகம்", s2Title: "குணநலனின்", s2Accent: "அடித்தளம்",
    s2p: "ராமகிருஷ்ணா பள்ளியில் சுவாமி விவேகானந்தரின் போதனைகளின் கீழ் உருவானார். பாடங்கள் மட்டுமல்ல — \"மனிதனுக்கு சேவை செய்வதே கடவுளுக்கு சேவை\" என்ற தத்துவம் கற்றார்.",
    s2sub1Title: "கலாச்சார வேர்கள்", s2sub1: "ராமாயணம் மற்றும் மகாபாரதத்தால் வடிவமைக்கப்பட்டவர் — தலைமை என்பது தர்மத்திற்காக நிற்கும் தைரியம்.",
    s2sub2Title: "தர்மத்தின் பாதை", s2sub2: "அரசியல் தொழில் அல்ல — ஆன்மீக கடமை. வசதிக்கான அரசியலை மனசாட்சியின் அரசியலாக மாற்றுதல்.",
    s3Tag: "அறிவுசார் வல்லுநர்", s3Title: "கல்வி", s3Accent: "சிறப்பு",
    ctaTag: "அபூர்வமான தலைவர்", ctaQuote: '"அறிவில்லாத ஆர்வம் ஆபத்தானது."',
    ctaDesc: "சசிகிரண் கே.என் இரண்டையும் சம அளவில் கொண்டு வருகிறார் — ஸ்ரீரங்கம் தகுதியுடைய தலைவர்.",
    ctaJoin: "இயக்கத்தில் சேருங்கள்", ctaJourney: "என் பயணம் →",
    creds: [
      { n: "01", title: "பொறியியல் அறிவு", desc: "சமூக பிரச்சினைகளை இயந்திரமாக பார்க்கிறார் — தற்காலிக திட்டுகளுக்குப் பதிலாக துல்லியத்துடன் சரிசெய்கிறார்.", color: "#CC0000" },
      { n: "02", title: "மூலோபாய மேலாண்மை", desc: "MBA பின்னணி பெரிய திட்டங்களை நிறுவன திறனுடன் நிர்வகிக்க உதவுகிறது.", color: "#FF8C00" },
      { n: "03", title: "பொது கொள்கை", desc: "அரசு இயந்திரம் எவ்வாறு இயங்குகிறது, கோப்புகள் எவ்வாறு நகர்கின்றன என்ற உள் அறிவை வழங்குகிறது.", color: "#CC0000" },
      { n: "04", title: "IAS அடித்தளம்", desc: "கடுமையான IAS அகாடமி பயிற்சி — வரலாறு, அரசியலமைப்பு மற்றும் பொருளாதாரத்தில் தேர்ச்சி.", color: "#FF8C00" },
    ],
  },
};

const imgSet = [shashi3, shashi4, shashi1, shashi2];

const FadeUp = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }} 
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }} 
    transition={{ duration: 0.75, ease: [0.23, 1, 0.32, 1], delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const AboutMePage = ({ lang = 'en' }: { lang?: string }) => {
  const c = content[lang as 'en' | 'ta'] ?? content.en;
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <div className={`bg-slate-50 min-h-screen text-slate-900 font-sans ${lang === 'ta' ? 'font-tamil' : ''}`}>

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0 z-0" style={{ y: imgY }}>
          <img src={heroBg} alt="" className="w-full h-[115%] object-cover" />
        </motion.div>
        {/* Cinematic Overlay for visibility - Enhanced for maximum clarity */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90 z-10" />
        
        <div className="relative z-20 w-full px-6 md:px-16 pb-24 md:pb-32 flex flex-col justify-end items-start h-full">
          <div className="max-w-4xl flex flex-col items-start gap-2 md:gap-3">
            <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-[#000000] text-sm md:text-sm font-black tracking-[3px] md:tracking-[5px] uppercase drop-shadow-2xl">{c.eyebrow}</motion.span>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.23, 1, 0.32, 1] }}
              className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-[1] drop-shadow-2xl tracking-tight">
              {c.name1}
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
              className="text-white/80 text-sm md:text-base leading-relaxed max-w-xl drop-shadow-md font-medium">{c.tagline}</motion.p>
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
              className="flex gap-3 mt-4">
              <motion.a href="/journey" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                className="bg-[#CC0000] text-white text-sm md:text-sm font-black uppercase tracking-[2px] px-6 md:px-10 py-3 md:py-4 rounded-full shadow-2xl hover:bg-[#a80000] transition-all">{c.cta1}</motion.a>
              <motion.a href="/#about" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm md:text-sm font-black uppercase tracking-[2px] px-6 md:px-10 py-3 md:py-4 rounded-full hover:bg-white/20 transition-all">{c.cta2}</motion.a>
            </motion.div>
          </div>
        </div>

        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 1.5 }}>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
            className="w-0.5 h-8 bg-gradient-to-b from-white to-transparent rounded-full" />
        </motion.div>
      </section>

      {/* ── SECTION 1: ROOTS (No Box) ── */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-white">
        <div className="max-w-[1200px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center px-6 md:px-12 py-10 md:py-12">
          <FadeUp>
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl">
              <img loading="lazy" src={shashi1} alt="Roots" className="w-full aspect-[5/5] object-cover" />
            </div>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-0.5 bg-[#CC0000]" />
                <span className="text-[#CC0000] text-sm font-black tracking-[5px] uppercase">{c.s1Tag}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black leading-[1.1] text-gray-900 tracking-tight">
                {c.s1Title} <span className="text-[#CC0000]">{c.s1Accent}</span>
              </h2>
              <p className="text-base text-gray-600 leading-relaxed">{c.s1p1}</p>
              <p className="text-base text-gray-600 leading-relaxed font-medium text-gray-800">{c.s1p2}</p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── SECTION 2: CHARACTER (Matching Section 1, Swapped) ── */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-slate-50">
        <div className="max-w-[1200px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center px-6 md:px-12 py-10 md:py-12">
          <FadeUp className="order-2 lg:order-1">
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-0.5 bg-[#FF8C00]" />
                <span className="text-[#FF8C00] text-sm font-black tracking-[5px] uppercase">{c.s2Tag}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black leading-[1.1] text-gray-900 tracking-tight">
                {c.s2Title} <span className="text-[#FF8C00]">{c.s2Accent}</span>
              </h2>
              <p className="text-base text-gray-600 leading-relaxed border-l-4 border-[#FF8C00] pl-6">{c.s2p}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-black uppercase text-gray-900 tracking-wide">{c.s2sub1Title}</h3>
                  <p className="text-sm text-gray-500 text-start leading-relaxed">{c.s2sub1}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-black uppercase text-gray-900 tracking-wide">{c.s2sub2Title}</h3>
                  <p className="text-sm text-gray-500 text-start leading-relaxed">{c.s2sub2}</p>
                </div>
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={0.2} className="order-1 lg:order-2">
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl">
              <img loading="lazy" src={shashi2} alt="Character" className="w-full aspect-[5/5] object-cover" />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── SECTION 3: ACADEMIC MASTERY (Previous Card Design) ── */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <FadeUp>
            <div className="text-center mb-12">
              <span className="text-[#FF8C00] font-black text-sm tracking-[5px] uppercase mb-3 block">{c.s3Tag}</span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                {c.s3Title} <span className="text-[#CC0000]">{c.s3Accent}</span>
              </h2>
              <div className="w-12 h-1 bg-gradient-to-r from-[#CC0000] to-[#FF8C00] mx-auto mt-6 rounded-full" />
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {c.creds.map((item, idx) => (
              <FadeUp key={idx} delay={idx * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="group relative bg-slate-50 border border-gray-100 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col sm:flex-row h-auto min-h-[12rem]"
                >
                  <div className="w-full sm:w-36 h-48 sm:h-auto flex-shrink-0 relative overflow-hidden">
                    <img loading="lazy" src={imgSet[idx]} alt={item.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100" />
                    <div className="absolute inset-0 bg-gradient-to-b sm:bg-gradient-to-r from-transparent to-slate-50" />
                  </div>
                  <div className="flex-1 p-6 sm:p-8 relative z-10 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-0.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm font-black tracking-[3px] uppercase" style={{ color: item.color }}>{item.n}</span>
                    </div>
                    <h3 className="text-sm font-black uppercase text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="relative overflow-hidden group min-h-[60vh] flex items-center">
        <div className="absolute inset-0 z-0 flex">
          <img src={shashi6} alt="" className="w-1/2 h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-35 transition-all duration-1000" />
          <img src={shashi7} alt="" className="w-1/2 h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-35 transition-all duration-1000 object-top" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/88 via-white/75 to-white/88 backdrop-blur-[3px] z-10" />
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#CC0000] to-[#FF8C00] z-20" />

        <div className="relative z-20 w-full py-16 px-6 text-center max-w-3xl mx-auto">
          <FadeUp>
            <span className="text-[#CC0000] font-black text-sm tracking-[6px] uppercase mb-4 block">{c.ctaTag}</span>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-[1.15] mb-4 tracking-tight">{c.ctaQuote}</h2>
            <p className="text-lg text-black mb-10 max-w-lg mx-auto text-center leading-relaxed">{c.ctaDesc}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button onClick={() => window.dispatchEvent(new CustomEvent('open-join-popup'))} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                className="bg-gradient-to-r from-[#CC0000] to-[#FF8C00] text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-sm shadow-xl hover:shadow-[0_0_40px_rgba(204,0,0,0.2)] transition-all whitespace-nowrap inline-flex items-center justify-center">
                {c.ctaJoin}
              </motion.button>
              <motion.a href="/journey" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                className="bg-white border-2 border-gray-200 text-gray-800 px-8 py-4 rounded-full font-black uppercase tracking-widest text-sm hover:border-[#CC0000] hover:text-[#CC0000] transition-all">
                {c.ctaJourney}
              </motion.a>
            </div>
          </FadeUp>
        </div>
      </section>

    </div>
  );
};

export default AboutMePage;
