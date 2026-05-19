import { useRef } from 'react';
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import heroBg from '../assets/shashi3.png';
import shashi1 from '../assets/shashi1.png';
import shashi2 from '../assets/shashi2.png';
import shashi3 from '../assets/shashi3.png';
import shashi4 from '../assets/shashi4.png';
import shashi5 from '../assets/shashi5.png';
import shashi6 from '../assets/shashi6.png';

const content = {
  en: {
    eyebrow: "Vision 2031",
    title1: "AGENDA", title2: "2031",
    subtitle: "The Digital Transformation of Tamil Nadu",
    quote: "Political power is a tool; technology is the force that operates it for the greater good.",
    intro: "Shashikiran KN aims to transform Tamil Nadu into a fully digitized, transparent, and self-reliant state.",
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
    footerDesc: "By 2031, Tamil Nadu will be a model of digital democracy, transparent governance, and inclusive prosperity."
  },
  ta: {
    eyebrow: "தொலைநோக்கு 2031",
    title1: "திட்ட அறிக்கை", title2: "2031",
    subtitle: "தமிழகத்தின் டிஜிட்டல் மாற்றம்",
    quote: "அரசியல் அதிகாரம் என்பது ஒரு கருவி; தொழில்நுட்பம் என்பது அதை பொது நலனுக்காக இயக்கும் சக்தி.",
    intro: "2031-க்குள் தமிழகத்தை முழுமையாக டிஜிட்டல் மயமாக்கப்பட்ட, வெளிப்படையான மற்றும் சுயசார்பு மாநிலமாக மாற்ற சசிகிரண் கே.என் இலக்கு கொண்டுள்ளார்.",
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
    footerDesc: "2031-க்குள், தமிழ்நாடு டிஜிட்டல் ஜனநாயகம் மற்றும் அனைவருக்குமான செழிப்பின் மாதிரியாக விளங்கும்."
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
          <img src={heroBg} alt="" className="w-full h-[115%] object-cover" />
        </motion.div>
        {/* Cinematic Overlay for visibility - Matched with About Page for maximum clarity */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90 z-10" />

        <div className="relative z-20 w-full px-6 md:px-16 pb-24 md:pb-32 flex flex-col justify-end items-start h-full">
          <div className="max-w-4xl flex flex-col items-start gap-2 md:gap-3">
            <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-[#FF8C00] text-sm md:text-sm font-black tracking-[6px] md:tracking-[10px] uppercase drop-shadow-lg">{c.eyebrow}</motion.span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-[1] drop-shadow-2xl tracking-tight">
              {c.title1} <br /><span className="text-[#CC0000]">{c.title2}</span>
            </h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
              className="text-white/80 text-sm md:text-base leading-relaxed max-w-xl drop-shadow-md font-medium">"{c.quote}"</motion.p>
          </div>
        </div>

        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 1.5 }}>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
            className="w-0.5 h-8 bg-gradient-to-b from-white to-transparent rounded-full" />
        </motion.div>
      </section>

      {/* ── INTRO ── */}
      <section className="py-16 px-6 bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <FadeUp>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-6 tracking-tight">{c.subtitle}</h2>
            <p className="text-lg text-gray-500 leading-relaxed font-medium">
              {c.intro}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── PILLARS (Alternating Split Sections like About Page) ── */}
      {c.points.map((point, idx) => (
        <section key={idx} className={`relative min-h-[70vh] flex items-center overflow-hidden ${idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}>
          <div className="max-w-[1200px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center px-6 md:px-12 py-20">
            
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
                     <span className="text-sm font-black uppercase tracking-widest text-gray-400 group-hover:text-gray-900 transition-colors">Target 2031 Milestone</span>
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

      {/* ── FOOTER BANNER (Redesigned) ── */}
      <section className="relative overflow-hidden group min-h-[50vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-20 transition-all duration-1000" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white z-10" />
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#CC0000] to-[#FF8C00] z-20" />

        <div className="relative z-20 w-full py-16 px-6 text-center max-w-4xl mx-auto">
          <FadeUp>
            <div className="w-12 h-1 bg-gradient-to-r from-[#CC0000] to-[#FF8C00] mx-auto mb-10 rounded-full" />
            <span className="text-[#CC0000] font-black text-sm tracking-[6px] uppercase mb-4 block">{c.footerTitle}</span>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-[1.15] mb-8 tracking-tight">
              {c.footerDesc}
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a href="/" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                className="bg-gradient-to-r from-[#CC0000] to-[#FF8C00] text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-sm shadow-xl transition-all">
                Join The Movement
              </motion.a>
              <motion.a href="/journey" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                className="bg-white border-2 border-gray-100 text-gray-800 px-10 py-4 rounded-full font-black uppercase tracking-widest text-sm hover:border-[#CC0000] hover:text-[#CC0000] transition-all">
                See Full Roadmap
              </motion.a>
            </div>
          </FadeUp>
        </div>
      </section>

    </div>
  );
};

export default AgendaPage;
