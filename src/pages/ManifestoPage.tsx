import React from 'react';
import { motion } from 'framer-motion';
import { Landmark, GraduationCap, Rocket, Droplets, Recycle, Shield, Waves, Smartphone, Wheat, Sun, Library, Truck, CheckCircle2, Target, ArrowRight } from 'lucide-react';
import heroBg from '../assets/shashi3.png';
import shashi1 from '../assets/Smart Temple.jpg';
import shashi2 from '../assets/akkaravadisal.png';
import shashi4 from '../assets/digital governance (2).jpg';
import shashi5 from '../assets/entrpranuarship.jpg';
import shashi6 from '../assets/water.jpg';
import shashi7 from '../assets/clean city.jpeg';
import shashi8 from '../assets/women safe.jpeg';
import shashi9 from '../assets/floodding.jpg';
import shashi10 from '../assets/job and skill.jpg';
import shashi11 from '../assets/heritage.jpg';
import shashi12 from '../assets/rural.jpg';

/* ── Simple Reveal Component ── */
const Reveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay }}>
    {children}
  </motion.div>
);

/* ── TRANSLATIONS ── */
const translations = {
  en: {
    hero: {
      tag: 'VISION 2041',
      title: 'MY MANIFESTO\'S',
      desc: 'A Blueprint for a Better Srirangam',
      quote: '"My promise is not just a list of words, but a commitment to action. Through Vision 2041, we are bringing a structural revolution to Srirangam using technology, tradition, and transparency."'
    },
    items: [
      { id: "01", icon: Landmark, title: "Smart Temple Term Plan", subtitle: "Divine Heritage", desc: "Srirangam is a global heritage site. We will implement a 'Smart Temple' framework using AI for crowd management, digital queue systems, and high-tech maintenance of our sacred gopurams.", img: shashi1, accent: "#CC0000" },
      { id: "02", icon: Target, title: "The Akkaravadisal Project", subtitle: "Local Economy", desc: "Taking inspiration from our heritage, we will boost the local economy by supporting small businesses, traditional artisans, and street vendors — ensuring wealth stays within Srirangam.", img: shashi2, accent: "#FF8C00" },
      { id: "03", icon: GraduationCap, title: "Job & Skill Development", subtitle: "50 Key Locations", desc: "Establishing 50 Skill Development Centers across the constituency providing hands-on training in high-demand fields like IT, logistics, and creative arts.", img: shashi10, accent: "#CC0000" },
      { id: "04", icon: Rocket, title: "Entrepreneurship Hubs", subtitle: "5 Strategic Centers", desc: "Building 5 Incubation Centers to provide mentorship, technology, and financial guidance needed to turn local ideas into successful startups.", img: shashi5, accent: "#FF8C00" },
      { id: "05", icon: Droplets, title: "Water & Drainage Overhaul", subtitle: "Modern Infrastructure", desc: "Implementing a modern, underground drainage system and fixing the drinking water pipeline network to ensure 24/7 clean water access and a hygienic environment.", img: shashi6 },
      { id: "06", icon: Recycle, title: "Clean Srirangam Campaign", subtitle: "Eco-Movement", desc: "A community-led movement to introduce systematic waste segregation, automated street cleaning, and a 'Zero-Plastic' policy near our rivers and temples.", img: shashi7, accent: "#FF8C00" },
      { id: "07", icon: Shield, title: "Women's Safety Patrol", subtitle: "CCTV & Security", desc: "Comprehensive CCTV network across all wards and a Special Women's Patrol team active after 7 PM to ensure safety in our streets.", img: shashi8, accent: "#CC0000" },
      { id: "08", icon: Waves, title: "Flood Protection Tech", subtitle: "Prevention", desc: "Deploying Flood Protection Machines and advanced sensors to monitor river levels. Modern embankment technology will protect our homes and farms.", img: shashi9, accent: "#FF8C00" },
      { id: "09", icon: Smartphone, title: "Digital Governance", subtitle: "Your MLA in Your Pocket", desc: "Dedicated Mobile App for citizens to apply for certificates, report local issues, and track progress of development projects directly from their phones.", img: shashi4, accent: "#CC0000" },
      { id: "10", icon: Wheat, title: "Agricultural Revival", subtitle: "Agri-Tech", desc: "Introducing Agri-Tech tools and direct digital marketplaces to ensure farmers get the best price for their produce without middlemen.", img: "https://images.pexels.com/photos/235925/pexels-photo-235925.jpeg", accent: "#FF8C00" }
    ],
    roadmap: {
      title: 'The Extra Mile',
      subtitle: 'Our Future Roadmap',
      points: [
        { icon: Sun, title: "Green Energy Srirangam", desc: "Transitioning public lighting and government buildings to Solar Power.", img: "https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg" },
        { icon: Library, title: "Heritage Education", desc: "Digital Library and Cultural Center to teach the next generation about the history of Srirangam.", img: shashi11 },
        { icon: Truck, title: "Health on Wheels", desc: "Mobile medical units that visit rural areas and outskirts every week for free check-ups.", img: shashi12 }
      ]
    },
    conclusion: "Srirangam gave us our roots. Now it is our duty to give Srirangam its wings.",
    cta: "Join The Movement",
    blueprintLabel: "Blueprint 2041",
    roadmapDesc: "Beyond the immediate goals, a future built on innovation."
  },
  ta: {
    hero: {
      tag: 'தொலைநோக்கு 2041',
      title: 'எனது தேர்தல் அறிக்கை',
      desc: 'ஸ்ரீரங்கத்தின் வளர்ச்சிக்கான ஒரு வரைபடம்',
      quote: '"எனது வாக்குறுதி வெறும் வார்த்தைகள் அல்ல, அது செயல்பாட்டிற்கான ஒரு அர்ப்பணிப்பு."'
    },
    items: [
      { id: "01", icon: Landmark, title: "ஸ்மார்ட் கோவில் திட்டம்", subtitle: "தெய்வீக பாரம்பரியம்", desc: "AI தொழில்நுட்பத்தைப் பயன்படுத்தி கூட்ட மேலாண்மை மற்றும் கோவில் பராமரிப்பு.", img: shashi1, accent: "#CC0000" },
      { id: "02", icon: Target, title: "அக்கரவாடிசல் திட்டம்", subtitle: "உள்ளூர் பொருளாதாரம்", desc: "பாரம்பரியக் கலைஞர்கள் மற்றும் சிறு வணிகர்களுக்கு ஆதரவு அளிப்பதன் மூலம் உள்ளூர் பொருளாதாரத்தை மேம்படுத்துதல்.", img: shashi2, accent: "#FF8C00" },
      { id: "03", icon: GraduationCap, title: "வேலைவாய்ப்பு மற்றும் பயிற்சி", subtitle: "50 முக்கிய இடங்கள்", desc: "ஐடி மற்றும் பிற துறைகளில் பயிற்சி அளிக்க 50 திறன் மேம்பாட்டு மையங்கள்.", img: shashi10, accent: "#CC0000" },
      { id: "04", icon: Rocket, title: "தொழில்முனைவோர் மையங்கள்", subtitle: "5 முக்கிய மையங்கள்", desc: "புதிய தொழில் தொடங்குவோருக்கு வழிகாட்ட 5 இன்குபேஷன் மையங்கள்.", img: shashi5, accent: "#FF8C00" },
      { id: "05", icon: Droplets, title: "நீர் மற்றும் வடிகால் சீரமைப்பு", subtitle: "நவீன உள்கட்டமைப்பு", desc: "24/7 குடிநீர் மற்றும் நவீன பாதாள சாக்கடை திட்டம்.", img: shashi6, accent: "#CC0000" },
      { id: "06", icon: Recycle, title: "தூய்மை ஸ்ரீரங்கம் இயக்கம்", subtitle: "சுற்றுச்சூழல்", desc: "தானியங்கி தெரு சுத்தம் மற்றும் பிளாஸ்டிக் இல்லா ஸ்ரீரங்கம்.", img: shashi7, accent: "#FF8C00" },
      { id: "07", icon: Shield, title: "பெண்கள் பாதுகாப்பு ரோந்து", subtitle: "CCTV மற்றும் பாதுகாப்பு", desc: "இரவு 7 மணிக்கு மேல் சிறப்பு பெண்கள் ரோந்து படை.", img: shashi8, accent: "#CC0000" },
      { id: "08", icon: Waves, title: "வெள்ளத் தடுப்பு தொழில்நுட்பம்", subtitle: "தடுப்பு நடவடிக்கை", desc: "வெள்ள அபாயத்தைக் கண்காணிக்க நவீன சென்சார்கள் மற்றும் தடுப்பு இயந்திரங்கள்.", img: shashi9, accent: "#FF8C00" },
      { id: "09", icon: Smartphone, title: "டிஜிட்டல் நிர்வாகம்", subtitle: "உங்கள் எம்.எல்.ஏ உங்கள் கையில்", desc: "மொபைல் ஆப் மூலம் அரசு சேவைகள் மற்றும் குறைகளைத் தீர்க்கும் வசதி.", img: shashi4, accent: "#CC0000" },
      { id: "10", icon: Wheat, title: "விவசாய மறுமலர்ச்சி", subtitle: "அக்ரி-டெக்", desc: "விவசாயிகளுக்கு நேரடி டிஜிட்டல் சந்தை மற்றும் தொழில்நுட்ப கருவிகள்.", img: "https://images.pexels.com/photos/235925/pexels-photo-235925.jpeg", accent: "#FF8C00" }
    ],
    roadmap: {
      title: 'கூடுதல் முயற்சிகள்',
      subtitle: 'எதிர்கால வரைபடம்',
      points: [
        { icon: Sun, title: "பசுமை ஆற்றல்", desc: "தெருவிளக்குகள் மற்றும் அரசு கட்டிடங்களில் சூரிய சக்தி பயன்பாடு.", img: "https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg" },
        { icon: Library, title: "பாரம்பரிய கல்வி", desc: "ஸ்ரீரங்கத்தின் வரலாற்றைக் கற்பிக்க டிஜிட்டல் நூலகம்.", img: shashi11 },
        { icon: Truck, title: "நடமாடும் மருத்துவம்", desc: "கிராமப்புறங்களுக்கு வாரந்தோறும் வரும் நடமாடும் மருத்துவ வாகனங்கள்.", img: shashi12 }
      ]
    },
    conclusion: "ஸ்ரீரங்கம் நமக்கு வேர்களைக் கொடுத்தது. இப்போது ஸ்ரீரங்கத்திற்கு இறக்கைகளை வழங்குவது நமது கடமை.",
    cta: "இயக்கத்தில் இணையுங்கள்",
    blueprintLabel: "வரைபடம் 2041",
    roadmapDesc: "உடனடி இலக்குகளுக்கு அப்பால், புதுமையின் அடிப்படையில் அமைந்த எதிர்காலம்."
  }
};


const ManifestoPage = ({ lang = 'en' }: { lang?: string }) => {
  const t = translations[lang as keyof typeof translations] || translations.en;

  return (
    <div className={`bg-white min-h-screen text-slate-900 font-sans selection:bg-[#CC0000] ${lang === 'ta' ? 'font-tamil' : ''}`}>
      
      {/* ── HERO WITH BLACK OVERLAY ── */}
      <section className="relative h-[70vh] flex items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroBg} className="w-full h-full object-cover object-top" />
          {/* Strengthened Black Overlay for better text separation */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
        </div>
        
        <div className="relative z-10 max-w-4xl">
          <Reveal>
            <span className="text-[#FF8C00] text-[0.6rem] md:text-[0.7rem] font-black tracking-[10px] uppercase block mb-6 drop-shadow-md">
              {t.hero.tag}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black leading-[0.95] tracking-tight mb-8 text-white drop-shadow-2xl">
              {t.hero.title}
            </h1>
            <p className="text-white/60 text-sm md:text-lg font-black tracking-widest max-w-md mx-auto drop-shadow-lg mb-8">
              {t.hero.desc}
            </p>
            {/* <p className="text-white/40 text-[0.65rem] md:text-xs font-medium max-w-2xl mx-auto leading-relaxed border-t border-white/10 pt-8">
              {t.hero.quote}
            </p> */}
          </Reveal>
        </div>
      </section>

      {/* ── IMAGE-FIRST MANIFESTO GRID ── */}
      <section className="py-16 px-4 md:px-10 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {t.items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Reveal key={idx} delay={idx * 0.05}>
                <div className="group relative aspect-[3/4] rounded-[2.5rem] overflow-hidden bg-slate-900 shadow-xl cursor-default">
                  {/* Full Background Image */}
                  <img loading="lazy" src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  
                  {/* Initial Bottom Gradient & Title */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-0" />
                  
                  <div className="absolute bottom-10 left-10 right-10 transition-transform duration-500 group-hover:translate-y-10 group-hover:opacity-0">
                    <span className="text-white/40 text-4xl font-black block mb-4">{item.id}</span>
                    <h3 className="text-2xl md:text-3xl font-black text-white leading-tight tracking-tight">
                      {item.title}
                    </h3>
                  </div>

                  {/* Hover Overlay Content */}
                  <div className="absolute inset-0 bg-black/90 p-10 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-8">
                      <Icon size={32} className="text-[#FF8C00]" />
                    </div>
                    <span className="text-[#FF8C00] text-[0.6rem] font-black tracking-[6px] uppercase block mb-4">{item.subtitle}</span>
                    <h3 className="text-2xl font-black text-white mb-6 leading-tight tracking-tight">{item.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed font-medium mb-10 max-w-xs">
                      {item.desc}
                    </p>
                    <div className="flex items-center gap-2 pt-6 border-t border-white/10 w-full justify-center">
                       <CheckCircle2 size={16} className="text-[#CC0000]" />
                       <span className="text-[0.6rem] font-black uppercase tracking-widest text-white/40">{t.blueprintLabel}</span>
                    </div>
                  </div>

                  {/* ID Tag */}
                  <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center">
                     <span className="text-white/20 text-xs font-black">{item.id}</span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ── ROADMAP SECTION ── */}
      <section className="bg-[#0A0A0A] py-20 px-6 md:px-16 rounded-t-[4rem] text-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 text-center md:text-left gap-8">
            <Reveal>
              <span className="text-[#FF8C00] text-[0.65rem] font-black tracking-[8px] uppercase block mb-4">{t.roadmap.title}</span>
              <h2 className="text-4xl md:text-6xl font-black leading-none tracking-tight">{t.roadmap.subtitle}</h2>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="hidden md:block w-px h-24 bg-white/10 mx-12" />
            </Reveal>
            <Reveal delay={0.3}>
               <p className="text-white/40 text-sm max-w-xs uppercase font-black tracking-widest leading-relaxed">
                 {t.roadmapDesc}
               </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.roadmap.points.map((point, idx) => {
              const Icon = point.icon;
              return (
                <Reveal key={idx} delay={idx * 0.1}>
                  <div className="group relative h-[400px] rounded-[3rem] overflow-hidden bg-white/5 border border-white/10">
                    <img loading="lazy" src={point.img} className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    <div className="absolute inset-0 p-10 flex flex-col justify-end items-start">
                       <Icon className="text-[#FF8C00] mb-6" size={32} />
                       <h4 className="text-2xl font-black text-white mb-3 tracking-tight">{point.title}</h4>
                       <p className="text-white/50 text-xs font-medium leading-relaxed">{point.desc}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Reveal delay={0.3}>
              <motion.button onClick={() => window.dispatchEvent(new CustomEvent('open-join-popup'))} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                className="bg-[#CC0000] text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-sm shadow-xl hover:bg-red-700 transition-all flex items-center justify-center whitespace-nowrap gap-3 mx-auto">
                {t.cta}
                <ArrowRight size={18} />
              </motion.button>
              {/* <div className="mt-20 flex flex-col items-center gap-4">
                 <div className="w-px h-16 bg-white/10" />
                 <p className="text-white/30 text-lg md:text-2xl font-black tracking-widest max-w-2xl mx-auto leading-relaxed">
                   {t.conclusion}
                 </p>
                 <p className="text-white/10 text-xl md:text-4xl font-black tracking-widest mt-8">Shashikiran K.N</p>
              </div> */}
            </Reveal>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ManifestoPage;
