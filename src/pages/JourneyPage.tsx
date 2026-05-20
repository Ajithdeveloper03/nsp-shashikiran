import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import heroBg from '../assets/shashi4.png';
import shashi1 from '../assets/shashi1.png';
import shashi2 from '../assets/shashi2.png';
import shashi3 from '../assets/shashi3.png';
import shashi4 from '../assets/shashi4.png';
import shashi5 from '../assets/shashi5.png';
import shashi6 from '../assets/home 2008.png';
import shashi7 from '../assets/home 2011.png';
import shashi8 from '../assets/home 2015.png';
import shashi9 from '../assets/home 2018.png';
import shashi10 from '../assets/home 2019.png';
import shashi11 from '../assets/home 2020.png';
import shashi12 from '../assets/home 2026.png';

/* ── TRANSLATIONS ─────────────────────────────────────────────── */
const content = {
  en: {
    eyebrow: "The Journey of a Visionary",
    title: "From Vow to",
    accent: "Victory",
    quote: '"A journey of a thousand miles begins with a single step — taken with a sacred promise to the soil of this nation."',
    destLabel: "Srirangam 2026",
    destDesc: "From a sacred vow at 17 to standing for Srirangam — every year of this journey has been a building block for Tamil Nadu's transformation.",
    destCta: "Join The Movement →",
    phases: [
      {
        phase: "Phase 1", title: "The Awakening", years: "2008 – 2011", color: "#CC0000",
        events: [
          { year: "2008", title: "The Spark of Discipline", img: shashi6, desc: "At 15, Shashikiran KN embraced Yoga for mental clarity and began reading world history and Indian heritage — realising India needs leaders with a global vision and a local heart." },
          { year: "2011", title: "The Vow at Seventeen", img: shashi7, desc: "While peers planned careers, he took a sacred vow — pledging to forgo personal luxury and dedicate his life to the Third Liberation of India." },
        ],
      },
      {
        phase: "Phase 2", title: "The Intellectual Arsenal", years: "2012 – 2018", color: "#FF8C00",
        events: [
          { year: "2012–2015", title: "Building the Foundation", img: shashi8, desc: "Years mastering Mechanical Engineering — learning that every complex problem has a systematic solution." },
          { year: "2016", title: "Mastery of Governance", img: shashi9, desc: "Joined Manithaneeyam IAS Academy under Saidai Duraisaisamy, spending countless hours on Indian Polity, Constitution, and Administrative Law." },
          { year: "2017–2018", title: "Financial Independence", img: shashi10, desc: "Achieved global credentials as a Certified Financial Planner (CFP) and Investment Banker, establishing Sarathi Groups — funded by hard work, not corruption." },
        ],
      },
      {
        phase: "Phase 3", title: "Service Before Power", years: "2019 – 2021", color: "#CC0000",
        events: [
          { year: "2019", title: "NS Social Welfare Trust", img: shashi11, desc: "Launched the 'Feed the Need' initiative — ensuring hunger-free nights across Trichy. Action before ambition." },
          { year: "2020", title: "The Political Blueprint", img: shashi12, desc: "Founded the National Socialist Party, inspired by Netaji Bose — drafting a manifesto on Digital Governance and Social Equality." },
        ],
      },
      {
        phase: "Phase 4", title: "The Srirangam Mission", years: "2022 – 2026", color: "#FF8C00",
        events: [
          { year: "2022–2024", title: "Grassroots Immersion", img: shashi3, desc: "Walked the streets of Srirangam, visiting farmers and meeting youth — understanding the hidden problems before election season." },
          { year: "2026", title: "The Srirangam Outreach", img: shashi4, desc: "Official launch of the Srirangam Mission — from 'Akkaravadisal' local development to Women's Safety Patrols. Srirangam became his home and mission." },
        ],
      },
      {
        phase: "Phase 5", title: "The Future Roadmap", years: "2031 – 2041", color: "#CC0000",
        events: [
          { year: "2031", title: "The Digital Milestone", img: shashi5, desc: "Tamil Nadu 100% Paperless and Corruption-free through Blockchain Governance." },
          { year: "2041", title: "The Vision Realized", img: shashi1, desc: "A Self-Reliant India where every Srirangam citizen has access to free world-class healthcare and technology-driven education." },
        ],
      },
    ],
  },
  ta: {
    eyebrow: "ஒரு தொலைநோக்காளரின் பயணம்",
    title: "சபதத்திலிருந்து",
    accent: "வெற்றிவரை",
    quote: '"ஆயிரம் மைல் பயணம் ஒரே ஒரு அடியில் தொடங்குகிறது — இந்த தேசத்தின் மண்ணுக்கு ஒரு புனித வாக்குறுதியுடன்."',
    destLabel: "ஸ்ரீரங்கம் 2026",
    destDesc: "17 வயதில் எடுத்த புனித சபதத்திலிருந்து ஸ்ரீரங்கத்திற்காக நிற்பது வரை — இந்த பயணத்தின் ஒவ்வொரு ஆண்டும் தமிழகத்தின் மாற்றத்திற்கான அடித்தளமாக அமைந்துள்ளது.",
    destCta: "இயக்கத்தில் சேருங்கள் →",
    phases: [
      {
        phase: "கட்டம் 1", title: "விழிப்புணர்வு", years: "2008 – 2011", color: "#CC0000",
        events: [
          { year: "2008", title: "ஒழுக்கத்தின் தீப்பொறி", img: shashi1, desc: "15 வயதில், சசிகிரண் யோகாவை ஏற்றுக்கொண்டார் மற்றும் உலக வரலாறு மற்றும் இந்திய பாரம்பரியத்தை ஆழமாக படிக்கத் தொடங்கினார்." },
          { year: "2011", title: "பதினேழு வயதில் சபதம்", img: shashi2, desc: "சமவயதினர் தொழில் திட்டமிட்டபோது, அவர் ஒரு புனித சபதம் எடுத்தார் — தனிப்பட்ட ஆடம்பரத்தை தியாகம் செய்து இந்தியாவின் மூன்றாவது விடுதலைக்கு தன்னை அர்ப்பணித்தார்." },
        ],
      },
      {
        phase: "கட்டம் 2", title: "அறிவுசார் ஆயுதக்கிடங்கு", years: "2012 – 2018", color: "#FF8C00",
        events: [
          { year: "2012–2015", title: "அடித்தளம் கட்டுதல்", img: shashi3, desc: "மெக்கானிக்கல் இன்ஜினியரிங் தேர்ச்சி பெற்ற ஆண்டுகள் — ஒவ்வொரு சிக்கலான பிரச்சினைக்கும் முறையான தீர்வு உள்ளது என்று கற்றார்." },
          { year: "2016", title: "நிர்வாக மேதமை", img: shashi4, desc: "சைதை துரைசாமியின் வழிகாட்டுதலில் மணிதநேயம் IAS அகாடமியில் சேர்ந்தார், இந்திய அரசியலமைப்பு மற்றும் நிர்வாக சட்டத்தை ஆழமாக படித்தார்." },
          { year: "2017–2018", title: "நிதி சுதந்திரம்", img: shashi5, desc: "CFP மற்றும் முதலீட்டு வங்கியாளராக உலகளாவிய சான்றிதழ்களை அடைந்தார், சாரதி குரூப்பை நிறுவினார் — கடின உழைப்பால் நிதியளிக்கப்பட்டது." },
        ],
      },
      {
        phase: "கட்டம் 3", title: "அதிகாரத்திற்கு முன் சேவை", years: "2019 – 2021", color: "#CC0000",
        events: [
          { year: "2019", title: "NS சமூக நல அறக்கட்டளை", img: shashi1, desc: "'தேவையுள்ளவர்களுக்கு உணவு' முன்முயற்சியைத் தொடங்கினார் — திருச்சியில் பசியற்ற இரவுகளை உறுதி செய்தார்." },
          { year: "2020", title: "அரசியல் வரைவு", img: shashi2, desc: "நேதாஜி போஸால் ஈர்க்கப்பட்ட நேஷனல் சோசியலிஸ்ட் கட்சியை நிறுவினார் — டிஜிட்டல் நிர்வாகம் மற்றும் சமத்துவத்தின் அடிப்படையில் அறிக்கையை வரைந்தார்." },
        ],
      },
      {
        phase: "கட்டம் 4", title: "ஸ்ரீரங்கம் பணி", years: "2022 – 2026", color: "#FF8C00",
        events: [
          { year: "2022–2024", title: "அடிமட்ட ஈடுபாடு", img: shashi3, desc: "ஸ்ரீரங்கத்தின் தெருக்களில் நடந்தார், விவசாயிகளை சந்தித்தார், இளைஞர்களை சந்தித்தார் — தொகுதியின் மறைந்திருக்கும் பிரச்சினைகளை புரிந்துகொண்டார்." },
          { year: "2026", title: "ஸ்ரீரங்கம் திட்டம்", img: shashi4, desc: "'அக்கரவாடிசல்' உள்ளூர் வளர்ச்சி திட்டம் முதல் பெண்கள் பாதுகாப்பு குழுக்கள் வரை — ஸ்ரீரங்கம் அவரின் இல்லமும் பணியும் ஆனது." },
        ],
      },
      {
        phase: "கட்டம் 5", title: "எதிர்கால வரைபடம்", years: "2031 – 2041", color: "#CC0000",
        events: [
          { year: "2031", title: "டிஜிட்டல் மைல்கல்", img: shashi5, desc: "தமிழகத்தை 100% காகிதமற்றதாகவும் ஊழல்மற்றதாகவும் மாற்றும் கனவு — பிளாக்செயின் நிர்வாகம் மூலம்." },
          { year: "2041", title: "நனவான கனவு", img: shashi1, desc: "சுயசார்பு இந்தியா — ஒவ்வொரு ஸ்ரீரங்கம் குடிமகனும் இலவச உலகத்தரம் வாய்ந்த சுகாதாரம் மற்றும் தொழில்நுட்ப கல்வியை பெறுவர்." },
        ],
      },
    ],
  },
};

/* ── ROADMAP NODE ─────────────────────────────────────────────── */
const RoadmapEvent = ({
  event, side, color, isLast,
}: {
  event: { year: string; title: string; img: string; desc: string };
  side: 'left' | 'right';
  color: string;
  isLast: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "start 0.35"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const x = useTransform(scrollYProgress, [0, 1], [side === 'left' ? -40 : 40, 0]);

  return (
    <div ref={ref} className="relative flex md:items-start items-stretch gap-0 min-h-[150px] md:min-h-[220px]">
      {/* Left slot - Desktop Only */}
      <div className="hidden md:flex w-[calc(50%-2.5rem)] justify-end pr-10 pt-4">
        {side === 'left' && (
          <motion.div style={{ opacity, x }} className="w-full max-w-xl">
            <EventCard event={event} color={color} />
          </motion.div>
        )}
      </div>

      {/* Center spine */}
      <div className="flex flex-col items-center w-10 md:w-16 flex-shrink-0">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.1 }}
          className="w-4 h-4 md:w-5 md:h-5 rounded-full border-[3px] md:border-4 border-white shadow-lg z-10 flex-shrink-0"
          style={{ backgroundColor: color }}
        />
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="w-0.5 flex-1 origin-top mt-1"
            style={{ backgroundColor: `${color}35`, minHeight: "5rem" }}
          />
        )}
      </div>

      {/* Right slot - Mobile (All) + Desktop (side==='right') */}
      <div className="flex-1 md:w-[calc(50%-2.5rem)] flex justify-start pl-6 md:pl-10 pt-2 md:pt-4">
        {/* Mobile View: Always show */}
        <div className="md:hidden w-full pb-8">
           <motion.div style={{ opacity, x: 0 }} className="w-full">
             <EventCard event={event} color={color} />
           </motion.div>
        </div>
        {/* Desktop View: Only show if side is right */}
        <div className="hidden md:block w-full max-w-xl">
          {side === 'right' && (
            <motion.div style={{ opacity, x }}>
              <EventCard event={event} color={color} />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

const EventCard = ({
  event, color,
}: {
  event: { year: string; title: string; img: string; desc: string };
  color: string;
}) => (
  <motion.div
    whileHover={{ y: -6 }}
    className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-xl transition-all duration-300 group"
  >
    <div className="relative h-48 md:h-56 overflow-hidden">
      <img loading="lazy" src={event.img} alt={event.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-3 left-4">
        <span className="bg-white/90 backdrop-blur-sm text-sm font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full" style={{ color }}>
          {event.year}
        </span>
      </div>
    </div>
    <div className="p-6 md:p-8">
      <div className="w-8 h-1 rounded-full mb-3" style={{ backgroundColor: color }} />
      <h3 className="text-sm md:text-xl font-black text-gray-900 mb-2 leading-tight tracking-tight">{event.title}</h3>
      <p className="text-sm md:text-[0.95rem] text-gray-500 leading-relaxed font-medium">{event.desc}</p>
    </div>
  </motion.div>
);

/* ── PAGE ─────────────────────────────────────────────────────── */
const JourneyPage = ({ lang = 'en' }: { lang?: string }) => {
  const c = content[lang as 'en' | 'ta'] ?? content.en;
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(heroScroll, [0, 1], ["0%", "20%"]);

  return (
    <div className={`bg-slate-50 min-h-screen font-sans ${lang === 'ta' ? 'font-tamil' : ''}`}>

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0 z-0" style={{ y: imgY }}>
          <img src={heroBg} alt="" className="w-full h-[115%] object-cover" />
        </motion.div>
        {/* Cinematic Overlay for visibility - Matched with About Page for maximum clarity */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90 z-10" />

        <div className="relative z-20 w-full px-6 md:px-16 pb-24 md:pb-32 flex flex-col justify-end items-start h-full">
          <div className="max-w-4xl flex flex-col items-start gap-2 md:gap-3">
            <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#ff0000] text-sm md:text-sm font-black tracking-[6px] md:tracking-[10px] uppercase drop-shadow-lg">
              {c.eyebrow}
            </motion.span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-[1] tracking-tight drop-shadow-2xl">
              {c.title} <br /><span className="text-[#FF8C00]">{c.accent}</span>
            </h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.7 }}
              className="text-white/80 text-sm md:text-base leading-relaxed max-w-xl drop-shadow-md font-medium">
              {c.quote}
            </motion.p>
          </div>
        </div>


      </section>

      {/* ── ROADMAP ── */}
      <section className="py-16 md:py-24 px-4 relative">
        {/* Spine */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent -translate-x-1/2" />

        <div className="max-w-5xl mx-auto">
          {c.phases.map((phase, phaseIdx) => {
            let globalCount = c.phases.slice(0, phaseIdx).reduce((acc, p) => acc + p.events.length, 0);
            return (
              <div key={phaseIdx} className="mb-4">
                {/* Phase pill */}
                <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }} transition={{ duration: 0.6 }}
                  className="flex justify-center mb-8 mt-12">
                  <div className="bg-white border border-gray-200 rounded-full px-4 py-3 shadow-md flex items-center gap-3 z-10">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: phase.color }} />
                    <span className="text-xs md:text-sm font-black uppercase tracking-[3px] text-gray-900 whitespace-nowrap">{phase.phase}</span>
                    <span className="text-xs md:text-sm text-gray-400 font-bold tracking-wide">· {phase.title} · {phase.years}</span>
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: phase.color }} />
                  </div>
                </motion.div>

                <div className="space-y-8">
                  {phase.events.map((event, eIdx) => {
                    const side = (globalCount + eIdx) % 2 === 0 ? 'left' : 'right';
                    const isLast = phaseIdx === c.phases.length - 1 && eIdx === phase.events.length - 1;
                    return (
                      <RoadmapEvent key={eIdx} event={event} side={side as 'left' | 'right'} color={phase.color} isLast={isLast} />
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Destination */}
          <div className="flex flex-col items-center mt-12 gap-5">
            <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-[#CC0000] to-[#FF8C00] flex items-center justify-center shadow-2xl z-10 border-4 border-white">
              <span className="text-white text-lg">★</span>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center bg-white border border-gray-100 rounded-2xl px-10 py-8 shadow-xl max-w-md">
              <p className="text-lg text-center font-black uppercase tracking-wide text-gray-900 mb-2">{c.destLabel}</p>
              <p className="text-sm text-gray-500 leading-relaxed mb-5">{c.destDesc}</p>
              <motion.button onClick={() => window.dispatchEvent(new CustomEvent('open-join-popup'))} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center whitespace-nowrap bg-[#CC0000] text-white font-black text-sm  tracking-[1px] px-8 py-4 rounded-full shadow-2xl hover:bg-red-700 transition-colors">
                {c.destCta}
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JourneyPage;
