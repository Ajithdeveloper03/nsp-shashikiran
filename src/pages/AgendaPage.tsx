import { useRef } from 'react';
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import heroBg from '../assets/agenda-banner.png';
import heroBgTab from '../assets/agenda tab.png';
import heroBgMobile from '../assets/agenda mobile.png';

import shashi1 from '../assets/FUTURE EDUCATION.jpg';
import shashi2 from '../assets/DIGITAL HEALTH.jpg';
import shashi3 from '../assets/SMART AGRICULTURE.jpg';
import shashi4 from '../assets/DIGITAL GOVERNANCE.jpg';
import shashi5 from '../assets/SKILLED BHARAT.jpg';
import shashi6 from '../assets/smart-city.jpg';

const content = {
  en: {
    visionTitle: "My Vision: Powering Progress with Technology",
    agendaBadge: "AGENDA 2031",
    visionDesc: "For me, political power is just a tool. Technology is the real force that operates it for the greater good of society. Through Agenda 2031, my vision is to combine power and technology to create a smarter, fairer, and better future for all of us.",
    points: [
      {
        id: "01",
        tag: "Governance",
        title: "100% Digital Governance",
        desc: "To eliminate human bias and increase transparency, the administration will be overhauled using Blockchain for tenders, land records, and welfare distribution.",
        accent: "#CC0000",
        img: shashi4
      },
      {
        id: "02",
        tag: "Agriculture",
        title: "AI-Driven Smart Agriculture",
        desc: "Revolutionizing farmers' lives through Precision Farming using AI and IoT sensors to monitor soil health and a 'Unified Digital Marketplace' to eliminate middlemen.",
        accent: "#FF8C00",
        img: shashi3
      },
      {
        id: "03",
        tag: "Education",
        title: "Future-Ready Education",
        desc: "Integrating Coding, Robotics, and Data Science from an early age. Bridging the urban-rural gap through Virtual Reality classrooms and high-speed internet.",
        accent: "#CC0000",
        img: shashi1
      },
      {
        id: "04",
        tag: "Healthcare",
        title: "Digital Health Ecosystem",
        desc: "Creating a secure 'Health Cloud' for state-wide digital records and enhancing Tele-Medicine for instant rural access to urban medical experts.",
        accent: "#FF8C00",
        img: shashi2
      },
      {
        id: "05",
        tag: "Economy",
        title: "Skilled Bharat 2.0",
        desc: "Training 1 million youth in AI, Blockchain, and Quantum Computing. Transforming job-seekers into job-creators through tech-entrepreneurship support.",
        accent: "#CC0000",
        img: shashi5
      },
      {
        id: "06",
        tag: "Infrastructure",
        title: "Smart Cities & Green Tech",
        desc: "Utilizing IoT for automated traffic and water systems, alongside advanced solar and wind energy for sustainable and affordable power for all.",
        accent: "#FF8C00",
        img: shashi6
      }
    ],
    footerTitle: "A Model for India",
    footerDesc: "By 2031, Tamil Nadu will be a model of digital democracy, transparent governance, and inclusive prosperity.",
    milestone: "Target 2031 Milestone"
  },
  ta: {
    visionTitle: "எனது தொலைநோக்கு: தொழில்நுட்பத்துடன் முன்னேற்றம்",
    agendaBadge: "அஜெண்டா 2031",
    visionDesc: "எனக்கு அரசியல் அதிகாரம் ஒரு கருவி மட்டுமே. தொழில்நுட்பமே சமூகத்தின் நலனுக்காக அதை இயக்கும் உண்மையான சக்தி. அஜெண்டா 2031 மூலம், அதிகாரத்தையும் தொழில்நுட்பத்தையும் இணைத்து, அனைவருக்கும் புத்திசாலித்தனமான, நியாயமான, சிறந்த எதிர்காலத்தை உருவாக்குவதே எனது தொலைநோக்கு.",
    points: [
      {
        id: "01",
        tag: "நிர்வாகம்",
        title: "100% டிஜிட்டல் நிர்வாகம்",
        desc: "நிர்வாகத்தில் வெளிப்படைத்தன்மையை அதிகரிக்க டெண்டர்கள், நிலப் பதிவுகள் ஆகியவற்றிற்கு பிளாக்செயினைப் பயன்படுத்தி ஊழலற்ற முறையை உருவாக்குதல்.",
        accent: "#CC0000",
        img: shashi4
      },
      {
        id: "02",
        tag: "விவசாயம்",
        title: "AI திறன்மிகு விவசாயம்",
        desc: "செயற்கை நுண்ணறிவு மற்றும் IoT சென்சார்கள் மூலம் மண் வளத்தைக் கண்காணித்து, இடைத்தரகர்கள் இன்றி நேரடியாக விற்க டிஜிட்டல் சந்தையை உருவாக்குதல்.",
        accent: "#FF8C00",
        img: shashi3
      },
      {
        id: "03",
        tag: "கல்வி",
        title: "எதிர்காலத்திற்கான கல்வி",
        desc: "கோடிங் மற்றும் ரோபாட்டிக்ஸை பள்ளிகளிலேயே அறிமுகப்படுத்துதல். மெய்நிகர் வகுப்பறைகள் மூலம் கிராமப்புற கல்வித் தரத்தை உயர்த்துதல்.",
        accent: "#CC0000",
        img: shashi1
      },
      {
        id: "04",
        tag: "சுகாதாரம்",
        title: "டிஜிட்டல் சுகாதார அமைப்பு",
        desc: "மாநில அளவிலான 'Health Cloud' மூலம் நோயாளி வரலாற்றைப் பாதுகாத்தல் மற்றும் டெலி-மெடிசின் மூலம் கிராமங்களுக்கு உடனடி சிகிச்சை அளித்தல்.",
        accent: "#FF8C00",
        img: shashi2
      },
      {
        id: "05",
        tag: "பொருளாதாரம்",
        title: "திறன்மிகு பாரதம் 2.0",
        desc: "1 மில்லியன் இளைஞர்களுக்கு AI மற்றும் பிளாக்செயினில் பயிற்சி. இளைஞர்களை வேலை உருவாக்குபவர்களாக மாற்ற ஸ்டார்ட்அப் ஆதரவு.",
        accent: "#CC0000",
        img: shashi5
      },
      {
        id: "06",
        tag: "உள்கட்டமைப்பு",
        title: "ஸ்மார்ட் நகரங்கள் & பசுமை ஆற்றல்",
        desc: "போக்குவரத்து மற்றும் நீர் விநியோகத்தை தானியக்கமாக்க IoT-ஐப் பயன்படுத்துதல் மற்றும் பசுமை எரிசக்தி மூலம் மலிவான மின்சாரத்தை உறுதி செய்தல்.",
        accent: "#FF8C00",
        img: shashi6
      }
    ],
    footerTitle: "இந்தியாவிற்கான ஒரு மாதிரி",
    footerDesc: "2031-க்குள், தமிழ்நாடு டிஜிட்டல் ஜனநாயகம் மற்றும் அனைவருக்குமான செழிப்பின் மாதிரியாக விளங்கும்.",
    milestone: "2031 இலக்கு மைல்கல்"
  }
};

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

const AgendaPage = ({ lang = 'en' }: { lang?: string }) => {
  const c = content[lang as 'en' | 'ta'] ?? content.en;
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div className={`bg-slate-50 min-h-screen text-slate-900 font-sans ${lang === 'ta' ? 'font-tamil' : ''}`}>
      
      {/* ── HERO (Consistent with About/Journey) ── */}
      <section ref={heroRef} className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0 z-0" style={{ y: imgY }}>
          <picture className="w-full h-[115%]">
            <source media="(max-width: 767px)" srcSet={heroBgMobile} />
            <source media="(max-width: 1023px)" srcSet={heroBgTab} />
            <img src={heroBg} alt="" className="w-full h-full object-cover" />
          </picture>
        </motion.div>
        {/* Cinematic Overlay for visibility - Matched with About Page for maximum clarity */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90 z-10" />

        <div className="relative z-20 w-full px-6 md:px-16 pb-24 md:pb-32 flex flex-col justify-end items-start h-full">
          <div className="max-w-4xl flex flex-col items-start gap-3 md:gap-4">
            <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="inline-block bg-[#FF8C00] text-black text-xs md:text-sm font-black tracking-[0.25em] md:tracking-[0.35em] uppercase px-4 py-1.5 rounded-full shadow-lg">
              {c.agendaBadge}
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.8 }}
              className="text-3xl md:text-4xl lg:text-6xl font-black text-white leading-[1.1] drop-shadow-2xl tracking-tight">
              {c.visionTitle}
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65, duration: 0.9 }}
              className="text-white/90 text-sm md:text-lg leading-relaxed max-w-2xl drop-shadow-md font-medium">
              {c.visionDesc}
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── INTRO ── */}
      {/* <section className="py-16 px-6 bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <FadeUp>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-6 tracking-tight">{c.subtitle}</h2>
            <p className="text-lg text-gray-500 leading-relaxed font-medium">
              {c.intro}
            </p>
          </FadeUp>
        </div>
      </section> */}

      {/* ── PILLARS (Alternating Split Sections like About Page) ── */}
      {c.points.map((point, idx) => (
        <section key={idx} className={`relative min-h-[70vh] flex items-center overflow-hidden ${idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}>
          <div className="max-w-[1200px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center px-6 md:px-12 py-12 md:py-16">
            
            <FadeUp className={idx % 2 === 0 ? "order-2 lg:order-1" : "order-2 lg:order-2"}>
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-0.5" style={{ backgroundColor: point.accent }} />
                  <span className="text-sm font-black tracking-[5px] uppercase" style={{ color: point.accent }}>{point.tag}</span>
                </div>
                <div className="relative">
                  <span className="absolute -top-10 -left-6 text-7xl font-black text-gray-200/50 select-none">{point.id}</span>
                  <h3 className="relative z-10 text-3xl md:text-4xl font-black leading-tight text-gray-900 tracking-tight">
                    {point.title}
                  </h3>
                </div>
                <p className="text-base text-gray-600 leading-relaxed">
                  {point.desc}
                </p>
                <div className="pt-4">
                  <motion.div whileHover={{ x: 5 }} className="flex items-center gap-2 cursor-default group">
                     <div className="w-6 h-6 rounded-full flex items-center justify-center border-2 border-gray-100 group-hover:border-[#CC0000] transition-colors">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#CC0000]" />
                     </div>
                     <span className="text-sm font-black uppercase tracking-widest text-gray-400 group-hover:text-gray-900 transition-colors">{c.milestone}</span>
                  </motion.div>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.2} className={idx % 2 === 0 ? "order-1 lg:order-2" : "order-1 lg:order-1"}>
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl group">
                <img src={point.img} alt={point.title} className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </FadeUp>

          </div>
        </section>
      ))}

    </div>
  );
};

export default AgendaPage;
