import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const MotionLink = motion(Link);
import { Landmark, TreePine, Flower2, Building2, Waves, TrafficCone, Droplets, Wheat, Briefcase, AlertTriangle, MapPin } from 'lucide-react';
import heroBg from '../assets/my cons.png';
import heroBgTab from '../assets/my cons tab.png';
import heroBgMobile from '../assets/my cons-mobile.png';
import shashi1 from '../assets/The Temple Town.jpg';
import shashi2 from '../assets/srirangam island.jpg';
import shashi5 from '../assets/butter fly park.jpg';
import shashi3 from '../assets/Mada Veedhis.jpg';
import shashi4 from '../assets/riverfront.jpg';
import shashi7 from '../assets/Traffic & Parking.jpg';
import sshashi8 from '../assets/Agriculture Crisis.jpg';
import shashi9 from '../assets/youth-migration.jpg';

/* ── Scroll Reveal ── */
const Reveal = ({ children, delay = 0, y = 50, className = '' }: { children: React.ReactNode; delay?: number; y?: number; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} className={className} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}>
      {children}
    </motion.div>
  );
};

/* ── TRANSLATIONS ── */
const translations = {
  en: {
    hero: {
      tag: 'MY CONSTITUENCY',
      title1: 'SRI',
      title2: 'RANGAM',
      desc: 'The Land of Tradition, Facing Modern Challenges — a sacred River Island where divinity meets daily life.',
    },
    mission: {
      tag: 'The Mission',
      title: 'Preserve its ancient beauty. Solve its modern struggles.'
    },
    heritageHeader: {
      tag: 'Section 01',
      title: 'Our Heritage, Our Pride.'
    },
    realityHeader: {
      tag: 'Section 02',
      title: 'The Reality',
      desc: 'Despite its grandeur, Srirangam carries wounds that demand urgent attention.'
    },
    cta: {
      tag: 'The Commitment',
      title: 'Srirangam deserves a representative who understands its soul.',
      author: '— Shashikiran KN',
      agenda: 'See Agenda 2031',
      join: 'Join the Movement'
    },
    heritage: [
      { icon: Landmark, tag: 'Spiritual Epicenter', title: 'The Temple Town', desc: 'Home to Sri Ranganathaswamy Temple — the largest functioning Hindu temple in the world with 21 Gopurams and 7 concentric enclosures.', img: shashi1, accent: '#CC0000', stat: '21', statLabel: 'Gopurams' },
      { icon: TreePine, tag: 'Gift of Nature', title: 'The Green Island', desc: 'Nestled between the Kaveri and Kollidam — lush coconut groves, fertile paddy fields, ancient mango orchards, and a river breeze like nowhere else.', img: shashi2, accent: '#FF8C00', stat: '2', statLabel: 'Sacred Rivers' },
      { icon: Flower2, tag: "Melur's Jewel", title: 'Butterfly Park', desc: "One of Asia's largest tropical butterfly parks — 25 acres of conservatory, lily ponds, and skywalk. A vital green lung for our city.", img: shashi5, accent: '#CC0000', stat: '25', statLabel: 'Acres' },
      { icon: Building2, tag: 'Living History', title: 'Mada Veedhis', desc: 'Chithirai and Uthira Veedhis — where spirituality and community life blend. Colourful houses, jasmine fragrance, and morning chants.', img: shashi3, accent: '#FF8C00', stat: '1000+', statLabel: 'Years' },
      { icon: Waves, tag: 'Lifelines', title: 'Riverfront Serenity', desc: 'Amma Mandapam Ghat and the riverfront — places of gathering, ritual, and peace with breathtaking sunset views.', img: shashi4, accent: '#CC0000', stat: '∞', statLabel: 'Spirit' },
    ],
    problems: [
      { icon: TrafficCone, tag: 'Srirangam Town', title: 'Traffic & Parking', issue: 'Narrow streets and zero parking create massive jams during festivals.', impact: 'Emergency vehicles get stuck. Pilgrims and residents struggle daily.', accent: '#CC0000', img: shashi7, labelIssue: 'The Issue', labelImpact: 'Impact' },
      { icon: Droplets, tag: 'Thiruvanaikoil', title: 'Drainage & Waste', issue: 'Outdated drainage causes severe waterlogging every monsoon.', impact: 'Garbage near heritage sites pollutes our sacred rivers.', accent: '#FF8C00', img: 'https://images.pexels.com/photos/2480807/pexels-photo-2480807.jpeg?auto=compress&cs=tinysrgb&w=800', labelIssue: 'The Issue', labelImpact: 'Impact' },
      { icon: Wheat, tag: 'Rural Areas', title: 'Agriculture Crisis', issue: 'Clogged canals leave tail-end farmers without water for crops.', impact: 'No markets or cold storage — harvest lost to middlemen.', accent: '#CC0000', img: sshashi8, labelIssue: 'The Issue', labelImpact: 'Impact' },
      { icon: Briefcase, tag: 'Constituency-wide', title: 'Youth Migration', issue: 'No IT parks or skill centres. Zero local opportunities.', impact: 'Our best talent leaves — draining the future of this land.', accent: '#FF8C00', img: shashi9, labelIssue: 'The Issue', labelImpact: 'Impact' },
    ]
  },
  ta: {
    hero: {
      tag: 'எனது தொகுதி',
      title1: 'ஸ்ரீ',
      title2: 'ரங்கம்',
      desc: 'பாரம்பரியத்தின் நிலம், நவீன சவால்களை எதிர்கொள்கிறது — தெய்வீகமும் அன்றாட வாழ்க்கையும் சங்கமிக்கும் புனிதமான நதித் தீவு.',
    },
    mission: {
      tag: 'நோக்கம்',
      title: 'அதன் பழமையான அழகைப் பாதுகாப்போம். அதன் நவீனப் போராட்டங்களுக்குத் தீர்வுகாண்போம்.'
    },
    heritageHeader: {
      tag: 'பிரிவு 01',
      title: 'நமது பாரம்பரியம், நமது பெருமை.'
    },
    realityHeader: {
      tag: 'பிரிவு 02',
      title: 'யதார்த்தம்',
      desc: 'அதன் பிரம்மாண்டத்தையும் தாண்டி, ஸ்ரீரங்கம் அவசர கவனம் தேவைப்படும் காயங்களைத் தாங்கி நிற்கிறது.'
    },
    cta: {
      tag: 'உறுதிமொழி',
      title: 'ஸ்ரீரங்கத்தின் ஆன்மாவைப் புரிந்துகொள்ளும் ஒரு பிரதிநிதி அதற்குத் தேவை.',
      author: '— சசிகிரன் KN',
      agenda: 'அஜெண்டா 2031-ஐக் காண்க',
      join: 'இயக்கத்தில் இணையுங்கள்'
    },
    heritage: [
      { icon: Landmark, tag: 'ஆன்மீக மையம்', title: 'கோவில் நகரம்', desc: 'உலகின் மிகப்பெரிய செயல்படும் இந்துக் கோவிலான ஸ்ரீ ரங்கநாதசுவாமி கோவிலின் இருப்பிடம் — 21 கோபுரங்கள் மற்றும் 7 சுற்றுச் சுவர்களைக் கொண்டது.', img: shashi1, accent: '#CC0000', stat: '21', statLabel: 'கோபுரங்கள்' },
      { icon: TreePine, tag: 'இயற்கையின் கொடை', title: 'பசுமைத் தீவு', desc: 'காவிரி மற்றும் கொள்ளிடத்திற்கு இடையில் அமைந்துள்ளது — பசுமையான தென்னந்தோப்புகள், வளமான நெல் வயல்கள், பழமையான மாந்தோப்புகள் மற்றும் வேறெங்கும் இல்லாத ஆற்றுத் தென்றல்.', img: shashi2, accent: '#FF8C00', stat: '2', statLabel: 'புனித நதிகள்' },
      { icon: Flower2, tag: "மேலூர் ரத்தினம்", title: 'வண்ணத்துப்பூச்சி பூங்கா', desc: "ஆசியாவின் மிகப்பெரிய வெப்பமண்டல பட்டாம்பூச்சி பூங்காக்களில் ஒன்று — 25 ஏக்கர் பரப்பளவில் பாதுகாப்பகம், அல்லிக் குளங்கள் மற்றும் ஸ்கைவாக் ஆகியவற்றைக் கொண்டது. நமது நகரத்திற்கு ஒரு முக்கியமான பசுமை நுரையீரல்.", img: shashi5, accent: '#CC0000', stat: '25', statLabel: 'ஏக்கர்கள்' },
      { icon: Building2, tag: 'வாழும் வரலாறு', title: 'மாட வீதிகள்', desc: 'சித்திரை மற்றும் உத்திர வீதிகள் — ஆன்மீகமும் சமூக வாழ்க்கையும் சங்கமிக்கும் இடம். வண்ணமயமான வீடுகள், மல்லிகை நறுமணம் மற்றும் காலை நேர மந்திரங்கள்.', img: shashi3, accent: '#FF8C00', stat: '1000+', statLabel: 'ஆண்டுகள்' },
      { icon: Waves, tag: 'வாழ்வாதாரங்கள்', title: 'ஆற்றங்கரை அமைதி', desc: 'அம்மா மண்டபம் படித்துறை மற்றும் ஆற்றங்கரை — மக்கள் கூடும் இடங்கள், சடங்குகள் மற்றும் அமைதியான இடங்கள், பிரமிக்க வைக்கும் சூரிய அஸ்தமனக் காட்சிகள்.', img: shashi4, accent: '#CC0000', stat: '∞', statLabel: 'ஆன்மீகம்' },
    ],
    problems: [
      { icon: TrafficCone, tag: 'ஸ்ரீரங்கம் நகரம்', title: 'போக்குவரத்து & நிறுத்தம்', issue: 'குறுகலான தெருக்கள் மற்றும் வாகன நிறுத்த வசதி இல்லாதது திருவிழாக்காலங்களில் பெரும் நெரிசலை உருவாக்குகிறது.', impact: 'அவசரக்கால வாகனங்கள் சிக்கிக் கொள்கின்றன. யாத்ரீகர்களும் குடியிருப்பாளர்களும் தினமும் அவதிப்படுகிறார்கள்.', accent: '#CC0000', img: shashi7, labelIssue: 'பிரச்சனை', labelImpact: 'விளைவு' },
      { icon: Droplets, tag: 'திருவானைக்கோவில்', title: 'வடிகால் & கழிவு', issue: 'பழைய வடிகால் அமைப்பு ஒவ்வொரு பருவமழையின் போதும் கடுமையான வெள்ளத்தை ஏற்படுத்துகிறது.', impact: 'பாரம்பரிய சின்னங்களுக்கு அருகில் உள்ள குப்பைகள் நமது புனித நதிகளை மாசுபடுத்துகின்றன.', accent: '#FF8C00', img: 'https://images.pexels.com/photos/2480807/pexels-photo-2480807.jpeg?auto=compress&cs=tinysrgb&w=800', labelIssue: 'பிரச்சனை', labelImpact: 'விளைவு' },
      { icon: Wheat, tag: 'கிராமப்புறங்கள்', title: 'விவசாய நெருக்கடி', issue: 'தூர்வாரப்படாத கால்வாய்கள் கடைமடை விவசாயிகளுக்குப் பயிர்களுக்குத் தண்ணீர் கிடைக்காமல் செய்கின்றன.', impact: 'சந்தைகள் அல்லது குளிர்பதனக் கிடங்குகள் இல்லை — அறுவடை இடைத்தரகர்களிடம் இழக்கப்படுகிறது.', accent: '#CC0000', img: sshashi8, labelIssue: 'பிரச்சனை', labelImpact: 'விளைவு' },
      { icon: Briefcase, tag: 'தொகுதி முழுவதும்', title: 'இளைஞர்கள் வெளியேற்றம்', issue: 'ஐடி பூங்காக்கள் அல்லது திறன் மையங்கள் இல்லை. உள்ளூர் வாய்ப்புகள் முற்றிலும் இல்லை.', impact: 'நமது சிறந்த திறமையாளர்கள் வெளியேறுகிறார்கள் — இந்த நிலத்தின் எதிர்காலத்தை இழக்கிறோம்.', accent: '#FF8C00', img: shashi9, labelIssue: 'பிரச்சனை', labelImpact: 'விளைவு' },
    ]
  }
};

/* ── Heritage: Sticky full-screen panels ── */
const HeritagePanels = ({ data }: { data: any[] }) => {
  return (
    <>
      {data.map((item, idx) => {
        const Icon = item.icon;
        return <HeritagePanel key={idx} item={item} idx={idx} Icon={Icon} />;
      })}
    </>
  );
};

const HeritagePanel = ({ item, idx, Icon }: { item: any; idx: number; Icon: any }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1.3, 1, 1, 1.1]);
  const textX = useTransform(scrollYProgress, [0, 0.3], [idx % 2 === 0 ? -80 : 80, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden bg-black">
      {/* Full BG image with scroll-driven scale */}
      <motion.div className="absolute inset-0 z-0" style={{ scale: imgScale }}>
        <img loading="lazy" src={item.img} alt={item.title} className="w-full h-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30 z-10" />
      {idx % 2 !== 0 && <div className="absolute inset-0 bg-gradient-to-l from-black/90 via-black/60 to-black/30 z-10" />}

      {/* Content */}
      <motion.div style={{ x: textX, opacity: textOpacity }}
        className={`relative z-20 w-full max-w-[1200px] mx-auto px-6 md:px-16 py-16 ${idx % 2 !== 0 ? 'flex flex-col items-start md:items-end text-left md:text-right' : ''}`}>
        <div className="max-w-xl">
          <div className={`flex items-center gap-3 mb-5 ${idx % 2 !== 0 ? 'md:justify-end' : ''}`}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${item.accent}30` }}>
              <Icon size={20} style={{ color: item.accent }} />
            </div>
            <span className="text-sm font-black tracking-[4px] uppercase" style={{ color: item.accent }}>{item.tag}</span>
          </div>

          <div className="relative mb-4">
            <span className={`absolute -top-8 ${idx % 2 !== 0 ? '-right-4' : '-left-4'} text-[8rem] font-black text-white/[0.04] leading-none select-none pointer-events-none`}>
              {String(idx + 1).padStart(2, '0')}
            </span>
            <h3 className="relative z-10 text-4xl md:text-6xl font-black text-white leading-[0.9] tracking-tight">{item.title}</h3>
          </div>

          <p className="text-white/60 text-sm md:text-lg leading-relaxed mb-6">{item.desc}</p>

          {/* Stat */}
          <div className="inline-flex items-center gap-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-6 py-3">
            <span className="text-3xl font-black text-white">{item.stat}</span>
            <span className="text-sm font-black tracking-[3px] uppercase text-white/50">{item.statLabel}</span>
          </div>
        </div>
      </motion.div>

      {/* Side accent */}
      <div className={`absolute ${idx % 2 === 0 ? 'left-0' : 'right-0'} top-0 bottom-0 w-1 z-30`} style={{ backgroundColor: item.accent }} />
    </section>
  );
};

/* ── Problem: Slide-in split sections ── */
const ProblemPanel = ({ item, idx, Icon }: { item: any; idx: number; Icon: any }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgClip = useTransform(scrollYProgress, [0, 0.35], [100, 0]);
  const contentY = useTransform(scrollYProgress, [0.1, 0.4], [60, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);

  const isEven = idx % 2 === 0;

  return (
    <section ref={ref} className={`relative min-h-[80vh] flex items-center overflow-hidden ${isEven ? 'bg-[#0A0A0A]' : 'bg-[#080808]'}`}>
      <div className="max-w-[1200px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center">

        {/* Image with clip-path reveal */}
        <motion.div className={`relative h-[50vh] lg:h-[80vh] overflow-hidden ${isEven ? 'order-1' : 'order-1 lg:order-2'}`}
          style={{ clipPath: useTransform(imgClip, v => isEven ? `inset(0 ${v}% 0 0)` : `inset(0 0 0 ${v}%)`) }}>
          <img loading="lazy" src={item.img} alt={item.title} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className={`absolute top-0 bottom-0 w-1 ${isEven ? 'right-0' : 'left-0'}`} style={{ backgroundColor: item.accent }} />
        </motion.div>

        {/* Content with slide-up */}
        <motion.div className={`px-8 md:px-14 py-16 lg:py-0 ${isEven ? 'order-2' : 'order-2 lg:order-1'}`}
          style={{ y: contentY, opacity: contentOpacity }}>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl border flex items-center justify-center"
              style={{ borderColor: `${item.accent}40`, backgroundColor: `${item.accent}10` }}>
              <Icon size={22} style={{ color: item.accent }} />
            </div>
            <span className="text-sm font-black tracking-[4px] uppercase block" style={{ color: item.accent }}>{item.tag}</span>
          </div>

          <div className="relative mb-8">
            <span className="absolute -top-6 -left-2 text-[7rem] font-black leading-none select-none pointer-events-none" style={{ color: `${item.accent}08` }}>
              {String(idx + 1).padStart(2, '0')}
            </span>
            <h3 className="relative z-10 text-3xl md:text-5xl font-black text-white leading-[1] tracking-tight">{item.title}</h3>
          </div>

          <div className="mb-5 rounded-2xl bg-white/[0.03] border border-white/5 p-6">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle size={14} className="text-yellow-500/70" />
              <p className="text-sm font-black tracking-widest uppercase text-white/30">{item.labelIssue}</p>
            </div>
            <p className="text-white/60 text-sm md:text-base leading-relaxed font-medium">{item.issue}</p>
          </div>

          <div className="rounded-2xl p-6 border" style={{ backgroundColor: `${item.accent}08`, borderColor: `${item.accent}15` }}>
            <div className="flex items-center gap-2 mb-3">
              <MapPin size={14} style={{ color: item.accent }} />
              <p className="text-sm font-black tracking-widest uppercase" style={{ color: item.accent }}>{item.labelImpact}</p>
            </div>
            <p className="text-white/60 text-sm md:text-base leading-relaxed font-medium">{item.impact}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ═══ PAGE ═══ */
const ConstituencyPage = ({ lang = 'en' }: { lang?: string }) => {
  const t = translations[lang as keyof typeof translations] || translations.en;
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroP } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const imgY = useTransform(heroP, [0, 1], ['0%', '25%']);
  const textY = useTransform(heroP, [0, 1], ['0%', '40%']);
  const heroOp = useTransform(heroP, [0, 0.6], [1, 0]);

  return (
    <div className={`bg-white min-h-screen text-slate-900 font-sans ${lang === 'ta' ? 'font-tamil' : ''}`}>

      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
        <motion.div className="absolute inset-0 z-0" style={{ y: imgY }}>
          <picture className="w-full h-[120%]">
            <source media="(max-width: 767px)" srcSet={heroBgMobile} />
            <source media="(max-width: 1023px)" srcSet={heroBgTab} />
            <img src={heroBg} alt="" className="w-full h-full object-cover" />
          </picture>
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black z-10" />

        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div key={i} className="absolute h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
              style={{ top: `${20 + i * 15}%`, left: 0, right: 0 }}
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'linear', delay: i * 0.5 }} />
          ))}
        </div>

        <motion.div style={{ y: textY, opacity: heroOp }}
          className="relative z-20 h-full flex flex-col justify-end px-6 md:px-16 pb-24 md:pb-32">
          <motion.div initial={{ width: 0 }} animate={{ width: 80 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="h-1 bg-[#FF8C00] rounded-full mb-6" />
          <motion.span initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
            className="text-[#000000] text-sm md:text-sm font-black tracking-[5px] uppercase block mb-4">
            {t.hero.tag}
          </motion.span>
          <div className="overflow-hidden">
            <motion.h1 initial={{ y: '100%' }} animate={{ y: 0 }}
              transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-5xl lg:text-8xl font-black text-white leading-[0.85] tracking-tight">
              {t.hero.title1}
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1 initial={{ y: '100%' }} animate={{ y: 0 }}
              transition={{ duration: 1.1, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-5xl lg:text-8xl font-black leading-[0.85] tracking-tight" style={{ color: '#CC0000' }}>
              {t.hero.title2}
            </motion.h1>
          </div>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}
            className="text-white/50 text-sm md:text-lg max-w-lg font-medium leading-relaxed mt-6">
            {t.hero.desc}
          </motion.p>
        </motion.div>


      </section>

      {/* ═══ HERITAGE HEADER ═══ */}
      <section className="bg-black py-20 px-6 md:px-16 border-t border-white/5">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <p className="text-[#CC0000] font-black text-sm tracking-[6px] uppercase mb-3">{t.heritageHeader.tag}</p>
            <h2 className="text-3xl md:text-7xl font-black text-white leading-[0.9] tracking-tight">
              {t.heritageHeader.title}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#CC0000] to-transparent rounded-full mt-6" />
          </Reveal>
        </div>
      </section>

      {/* ═══ HERITAGE PANELS — Full-screen parallax with scroll-driven scale ═══ */}
      <HeritagePanels data={t.heritage} />

      {/* ═══ PROBLEMS DIVIDER ═══ */}
      <section className="relative bg-black overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#CC0000] via-[#FF8C00] to-[#CC0000]" />
        <div className="py-12 px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <p className="text-[#CC0000] text-sm text-center font-black  tracking-[8px] uppercase mb-3">{t.realityHeader.tag}</p>
              <h2 className="text-3xl md:text-7xl font-black text-white leading-[0.9] mb-6 tracking-tight">
                {t.realityHeader.title}
              </h2>
              <p className="text-white/30 text-sm md:text-base text-center font-medium max-w-xl mx-auto">
                {t.realityHeader.desc}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ PROBLEM PANELS — Clip-path image reveal + slide-up content ═══ */}
      {t.problems.map((item, idx) => {
        const Icon = item.icon;
        return <ProblemPanel key={idx} item={item} idx={idx} Icon={Icon} />;
      })}

      {/* ═══ CTA ═══ */}
      <section className="relative bg-white overflow-hidden py-20 px-6">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#CC0000] to-[#FF8C00]" />
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <div className="w-12 h-1 bg-gradient-to-r from-[#CC0000] to-[#FF8C00] mx-auto mb-4 rounded-full" />
            <p className="text-[#CC0000] text-center font-black text-sm tracking-[6px] uppercase mb-5">{t.cta.tag}</p>
            <h2 className="text-3xl md:text-4xl lg:text-4xl font-black text-gray-900 leading-[1.1] mb-4 tracking-tight">
              {t.cta.title}
            </h2>
            <p className="text-gray-400 text-center font-bold text-lg mb-8">{t.cta.author}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MotionLink to="/agenda" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                className="bg-gradient-to-r from-[#CC0000] to-[#FF8C00] text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-sm shadow-xl text-center">
                {t.cta.agenda}
              </MotionLink>
              <motion.button onClick={() => window.dispatchEvent(new CustomEvent('open-join-popup'))} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                className="bg-[#CC0000] text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-sm shadow-xl hover:shadow-[0_0_40px_rgba(204,0,0,0.3)] transition-all whitespace-nowrap inline-flex items-center justify-center">
                {t.cta.join}
              </motion.button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default ConstituencyPage;
