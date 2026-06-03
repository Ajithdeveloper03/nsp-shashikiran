import { useRef } from 'react';
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import heroBg from '../assets/agenda-banner.png';
import heroBgTab from '../assets/agenda tab.png';
import heroBgMobile from '../assets/agenda mobile.png';

import shashi1 from '../assets/empowerment.png';
import shashi3 from '../assets/employment.png';
import shashi4 from '../assets/culture.png';
import shashi5 from '../assets/basic rights.png';
import shashi6 from '../assets/local growth.png';
import shashi7 from '../assets/food security.png';

const content = {
  en: {
    visionTitle: "Agenda 2031: Our Vision, Our Promise",
    agendaBadge: "AGENDA 2031",
    visionDesc: "Our complete roadmap for building a hunger-free, skilled, safe, and prosperous Srirangam, preserving our cultural values while providing free education and healthcare for all.",
    points: [
      {
        id: "01",
        tag: "Food Security",
        title: "Food Insufficiency",
        quote: "No one should go to sleep hungry. My goal is to build a hunger-free society by supporting our farmers and sharing food with every family.",
        bullets: [
          "Ensure zero hunger in our region.",
          "Provide modern technology to local farmers.",
          "Set up community kitchens and food banks."
        ],
        accent: "#CC0000",
        img: shashi7
      },
      {
        id: "02",
        tag: "Employment",
        title: "Skill Bharat",
        quote: "Degrees alone cannot secure a future; practical skills do. My focus is to make our youth 100% ready for great jobs and successful businesses.",
        bullets: [
          "Free computer and technical skills training for youth.",
          "Direct job placements through company partnerships.",
          "Financial support for young startups and entrepreneurs."
        ],
        accent: "#FF8C00",
        img: shashi3
      },
      {
        id: "03",
        tag: "Empowerment",
        title: "Women Safety & Empowerment",
        quote: "A society is truly developed only when its women are safe and independent. I am committed to protecting and empowering every woman.",
        bullets: [
          "Build 24/7 safe zones with better street lights and helplines.",
          "Give business loans and training for women self-help groups.",
          "Provide free self-defense training in schools and colleges."
        ],
        accent: "#CC0000",
        img: shashi1
      },
      {
        id: "04",
        tag: "Local Growth",
        title: "Economy & Local Growth",
        quote: "To build a stronger nation, we must first build a strong local economy. I will support our small shopkeepers and traders to create more jobs.",
        bullets: [
          "Create more local jobs so our youth don't have to move away.",
          "Give easy resources and support to local small businesses (MSMEs).",
          "Upgrade local markets to boost everyday business and trade."
        ],
        accent: "#FF8C00",
        img: shashi6
      },
      {
        id: "05",
        tag: "Culture",
        title: "The Soul of Bharat",
        quote: "While we grow towards the future, we must never lose our roots. I will work dedicatedly to protect our rich culture and traditional values.",
        bullets: [
          "Protect and renovate our local heritage sites and temples.",
          "Support local artists, traditional weavers, and craftsmen.",
          "Teach moral values to kids and celebrate our cultural festivals."
        ],
        accent: "#CC0000",
        img: shashi4
      },
      {
        id: "06",
        tag: "Basic Rights",
        title: "Free Education & Medicine",
        quote: "Quality education and healthcare are basic human rights, not a luxury. I will ensure they are completely free for everyone.",
        bullets: [
          "Upgrade local schools with modern smart-classroom facilities.",
          "Provide free digital learning books and materials for students.",
          "Open free check-up centers and give zero-cost emergency healthcare."
        ],
        accent: "#FF8C00",
        img: shashi5
      }
    ],
    divineGift: {
      title: "The Divine Gift Project",
      desc: "Srirangam is a land of rich heritage and divine blessings. I strongly believe that every resident here deserves a happy, safe, and secure life. Through 'The Divine Gift Project,' we are fully committed to uplifting our community."
    },
    milestone: ""
  },
  ta: {
    visionTitle: "அஜெண்டா 2031: எங்கள் தொலைநோக்கு, எங்கள் வாக்குறுதி",
    agendaBadge: "அஜெண்டா 2031",
    visionDesc: "பசியற்ற, தகுதியான, பாதுகாப்பான மற்றும் செழிப்பான ஸ்ரீரங்கத்தை உருவாக்குவதற்கும், நமது கலாச்சார விழுமியங்களைப் பாதுகாப்பதற்கும், அனைவருக்கும் இலவச கல்வி மற்றும் சுகாதாரத்தை வழங்குவதற்குமான எங்களது முழுமையான வரைபடம்.",
    points: [
      {
        id: "01",
        tag: "உணவுப் பாதுகாப்பு",
        title: "உணவுப் பற்றாக்குறை ஒழிப்பு",
        quote: "யாரும் பசியோடு உறங்கச் செல்லக்கூடாது. நமது விவசாயிகளுக்கு ஆதரவளிப்பதன் மூலமும், ஒவ்வொரு குடும்பத்திற்கும் உணவைப் பகிர்ந்து கொள்வதன் மூலமும் பசியற்ற சமூகத்தை உருவாக்குவதே எனது லட்சியம்.",
        bullets: [
          "நமது பகுதியில் பசி இல்லா நிலையை உறுதி செய்தல்.",
          "உள்ளூர் விவசாயிகளுக்கு நவீன தொழில்நுட்பங்களை வழங்குதல்.",
          "சமூகக் கூடங்கள் மற்றும் உணவு வங்கிகளை அமைத்தல்."
        ],
        accent: "#CC0000",
        img: shashi3
      },
      {
        id: "02",
        tag: "வேலைவாய்ப்பு",
        title: "திறன்மிகு பாரதம்",
        quote: "பட்டங்கள் மட்டுமே எதிர்காலத்தைப் பாதுகாக்க முடியாது; நடைமுறைத் திறன்களே பாதுகாக்கும். நமது இளைஞர்களைச் சிறந்த வேலைகளுக்கும் வெற்றிகரமான தொழில்களுக்கும் 100% தயார்படுத்துவதே எனது நோக்கம்.",
        bullets: [
          "இலவச கணினி மற்றும் தொழில்நுட்ப திறன் பயிற்சிகள்.",
          "நிறுவன கூட்டணிகள் மூலம் நேரடி வேலை வாய்ப்புகள்.",
          "இளம் ஸ்டார்ட்அப்கள் மற்றும் தொழில்முனைவோருக்கு நிதி ஆதரவு."
        ],
        accent: "#FF8C00",
        img: shashi5
      },
      {
        id: "03",
        tag: "மகளிர் பாதுகாப்பு",
        title: "பெண்கள் பாதுகாப்பு & அதிகாரமளித்தல்",
        quote: "பெண்கள் பாதுகாப்பாகவும் சுதந்திரமாகவும் இருக்கும்போதுதான் ஒரு சமமூக வளர்ச்சி அடைகிறது. ஒவ்வொரு பெண்ணையும் பாதுகாக்கவும் அவர்களுக்கு அதிகாரம் அளிக்கவும் நான் கடமைப்பட்டுள்ளேன்.",
        bullets: [
          "சிறந்த தெருவிளக்குகள் மற்றும் உதவி எண்களுடன் 24/7 பாதுகாப்பான மண்டலங்களை உருவாக்குதல்.",
          "மகளிர் சுயஉதவிக் குழுக்களுக்கு தொழில் கடன்கள் மற்றும் பயிற்சிகள் வழங்குதல்.",
          "பள்ளிகள் மற்றும் கல்லூரிகளில் இலவச தற்காப்புப் பயிற்சி அளித்தல்."
        ],
        accent: "#CC0000",
        img: shashi7
      },
      {
        id: "04",
        tag: "உள்ளூர் வளர்ச்சி",
        title: "பொருளாதாரம் & உள்ளூர் வளர்ச்சி",
        quote: "வலுவான தேசத்தை உருவாக்க, முதலில் வலுவான உள்ளூர் பொருளாதாரத்தை உருவாக்க வேண்டும். அதிக வேலைகளை உருவாக்க உள்ளூர் சிறு கடைக்காரர்கள் மற்றும் வியாபாரிகளுக்கு நான் ஆதரவளிப்பேன்.",
        bullets: [
          "நமது இளைஞர்கள் வெளியேறாமல் இருக்க அதிக உள்ளூர் வேலைகளை உருவாக்குதல்.",
          "உள்ளூர் சிறு தொழில்களுக்கு (MSME) எளிய ஆதாரங்களையும் ஆதரவையும் வழங்குதல்.",
          "அன்றாட வணிகம் மற்றும் வர்த்தகத்தை மேம்படுத்த உள்ளூர் சந்தைகளை தரம் உயர்த்துதல்."
        ],
        accent: "#FF8C00",
        img: shashi4
      },
      {
        id: "05",
        tag: "கலாச்சாரம்",
        title: "பாரதத்தின் ஆன்மா",
        quote: "எதிர்காலத்தை நோக்கி நாம் வளரும்போது, நமது வேர்களை நாம் ஒருபோதும் இழக்கக்கூடாது. நமது வளமான கலாச்சாரம் மற்றும் பாரம்பரிய விழுமியங்களைப் பாதுகாக்க நான் அர்ப்பணிப்புடன் பணியாற்றுவேன்.",
        bullets: [
          "நமது உள்ளூர் பாரம்பரிய தளங்கள் மற்றும் கோயில்களைப் பாதுகாத்து புதுப்பித்தல்.",
          "உள்ளூர் கலைஞர்கள், பாரம்பரிய நெசவாளர்கள் மற்றும் கைவினைஞர்களுக்கு ஆதரவளித்தல்.",
          "குழந்தைகளுக்கு ஒழுக்க விழுமியங்களைக் கற்றுக்கொடுத்து, நமது கலாச்சார விழாக்களிக் கொண்டாடுதல்."
        ],
        accent: "#CC0000",
        img: shashi6
      },
      {
        id: "06",
        tag: "அடிப்படை உரிமைகள்",
        title: "இலவச கல்வி & மருத்துவம்",
        quote: "தரமான கல்வியும் சுகாதாரமும் அடிப்படை மனித உரிமைகள், ஆடம்பரம் அல்ல. அவை அனைவருக்கும் முற்றிலும் இலவசமாக கிடைப்பதை நான் உறுதி செய்வேன்.",
        bullets: [
          "நவீன ஸ்மார்ட் வகுப்பறை வசதிகளுடன் உள்ளூர் பள்ளிகளைத் தரம் உயர்த்துதல்.",
          "மாணவர்களுக்கு இலவச டிஜிட்டல் கற்றல் புத்தகங்கள் மற்றும் பொருட்களை வழங்குதல்.",
          "இலவச பரிசோதனை மையங்களைத் திறந்து, பூஜ்ஜிய செலவில் அவசர சுகாதார சேவைகளை வழங்குதல்."
        ],
        accent: "#FF8C00",
        img: shashi1
      }
    ],
    divineGift: {
      title: "தெய்வீகக் கொடைத் திட்டம்",
      desc: "ஸ்ரீரங்கம் செழுமையான பாரம்பரியமும் தெய்வீக அருளும் நிறைந்த ஒரு புனித பூமி. இங்கு வாழும் ஒவ்வொரு குடிமகனும் மகிழ்ச்சியான, பாதுகாப்பான மற்றும் நிம்மதியான வாழ்க்கைக்கு தகுதியானவர்கள் என்று நான் உறுதியாக நம்புகிறேன். 'தெய்வீகக் கொடைத் திட்டம்' (The Divine Gift Project) மூலம், நமது சமூகத்தை மேம்படுத்துவதில் நாங்கள் முழுமையாக அர்ப்பணிப்புடன் செயல்படுகிறோம்."
    },
    milestone: ""
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
      <section ref={heroRef} className="relative h-[60vh] md:h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0 z-0" style={{ y: imgY }}>
          <picture className="w-full h-[115%]">
            <source media="(max-width: 767px)" srcSet={heroBgMobile} />
            <source media="(max-width: 1023px)" srcSet={heroBgTab} />
            <img src={heroBg} alt="" className="w-full h-full object-cover" />
          </picture>
        </motion.div>
        {/* Cinematic Overlay for visibility - Matched with About Page for maximum clarity */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90 z-10" />

        <div className="relative z-20 w-full px-6 md:px-16 pb-12 md:pb-32 flex flex-col justify-end items-start h-full">
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
                <p className="text-base text-slate-700 leading-relaxed font-semibold italic border-l-4 border-orange-500 pl-4 bg-orange-50/50 py-2.5 pr-2 rounded-r-xl">
                  "{point.quote}"
                </p>
                {point.bullets && (
                  <ul className="space-y-3 mt-4">
                    {point.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-3 text-slate-700 text-sm md:text-base leading-relaxed font-semibold">
                        <div className="w-2 h-2 rounded-full bg-[#FF8C00] mt-2 shrink-0 shadow-[0_0_8px_#FF8C00]" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {/* <div className="pt-4">
                  <motion.div whileHover={{ x: 5 }} className="flex items-center gap-2 cursor-default group">
                     <div className="w-6 h-6 rounded-full flex items-center justify-center border-2 border-gray-100 group-hover:border-[#CC0000] transition-colors">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#CC0000]" />
                     </div>
                     <span className="text-sm font-black uppercase tracking-widest text-gray-400 group-hover:text-gray-900 transition-colors">{c.milestone}</span>
                  </motion.div>
                </div> */}
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
