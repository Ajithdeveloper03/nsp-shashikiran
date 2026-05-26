import React from 'react';
import { motion } from 'framer-motion';
import { Landmark, GraduationCap, Wallet, Shield, type LucideIcon } from 'lucide-react';
import shashi1 from '../assets/A Foundation of Discipline.png';
import shashi2 from '../assets/the character.png';
import shashi3 from '../assets/Academic Mastery1.png';
import shashi4 from '../assets/shashi4.png';
import shashi6 from '../assets/shashi6.png';
import shashi7 from '../assets/shashi7.png';

type CardIcon = 'culture' | 'mindset' | 'finance' | 'principles';

const ICONS: Record<CardIcon, LucideIcon> = {
  culture: Landmark,
  mindset: GraduationCap,
  finance: Wallet,
  principles: Shield,
};

const content = {
  en: {
    title1: 'About',
    title2: 'Me',
    cards: [
      { icon: 'culture' as CardIcon, heading: 'ETHICS & CULTURE', text: "Guided by my roots at Ramakrishna School, I have a deep love for our culture and farming. As a devotee of Lord Krishna, my mission is simple: to bring true 'Dharma'—honesty and duty—into the world of politics.", img: shashi2, accent: '#CC0000' },
      { icon: 'mindset' as CardIcon, heading: 'SYSTEMATIC MINDSET', text: 'I am a professional first, and a politician next. With my background in Mechanical Engineering, MBA, and Public Administration, I look at every public problem with a practical mind to build real, working solutions.', img: shashi3, accent: '#FF8C00' },
      { icon: 'finance' as CardIcon, heading: 'THE FINANCIAL EXPERT', text: 'As a Certified Financial Planner and Investment Banker, I know exactly how the financial system works. My only goal is to use this knowledge to solve the economic struggles of everyday people and make everyone financially secure.', img: shashi4, accent: '#FF8C00' },
      { icon: 'principles' as CardIcon, heading: 'PRINCIPLES OVER POWER', text: 'Many big political parties invited me to join them, but I proudly chose to stay independent. My ideology is simple—Nation and Social Welfare first. I will never sacrifice my principles for easy political power.', img: shashi1, accent: '#CC0000' },
    ],
    ctaTag: 'The Rare Leader',
    ctaQuote: '"Passion without knowledge is dangerous."',
    ctaDesc: 'Shashikiran KN brings both — in equal measure. The kind of leader Srirangam truly deserves.',
    ctaJoin: 'Join The Movement',
  },
  ta: {
    title1: 'என்னைப்',
    title2: 'பற்றி',
    cards: [
      { icon: 'culture' as CardIcon, heading: 'நெறிமுறை & கலாச்சாரம்', text: "ராமகிருஷ்ணா பள்ளியில் வளர்ந்த வேர்களால் வழிநடத்தப்படும் எனக்கு, நமது கலாச்சாரம் மற்றும் விவசாயத்தின் மீது ஆழ்ந்த அன்பு உள்ளது. ஸ்ரீகிருஷ்ணப் பக்தியாளராக, அரசியலில் உண்மையான 'தர்மம்'—நேர்மையும் கடமையும்—என்பதைக் கொண்டு வருவதே எனது லட்சியம்.", img: shashi2, accent: '#CC0000' },
      { icon: 'mindset' as CardIcon, heading: 'முறையான அணுகுமுறை', text: 'நான் முதலில் ஒரு தொழில்முறை நிபுணர்; அதன்பின் அரசியல்வாதி. மெக்கானிக்கல் பொறியியல், MBA மற்றும் பொது நிர்வாகப் பின்னணியுடன், ஒவ்வொரு பொது பிரச்சினையையும் நடைமுறை மனநிலையுடன் அணுகி, உண்மையான, செயல்படும் தீர்வுகளை உருவாக்குகிறேன்.', img: shashi3, accent: '#FF8C00' },
      { icon: 'finance' as CardIcon, heading: 'நிதி நிபுணர்', text: 'சான்றளிக்கப்பட்ட நிதி ஆலோசகர் மற்றும் முதலீட்டு வங்கியாளராக, நிதி அமைப்பு எவ்வாறு இயங்குகிறது என்பது எனக்குத் தெளிவாகத் தெரியும். சாமானிய மக்களின் பொருளாதார நெருக்கடிகளைத் தீர்ப்பதே எனது ஒரே லட்சியம்.', img: shashi4, accent: '#FF8C00' },
      { icon: 'principles' as CardIcon, heading: 'அதிகாரத்திற்கு முன் கொள்கை', text: 'பல பெரிய அரசியல் கட்சிகள் என்னை தங்களோடு இணைய அழைத்தன; ஆனால் நான் சுயாதீனமாக நிற்கத் தேர்வு செய்தேன். தேசம் மற்றும் சமூக நலன் முதலில் — எளிதான அரசியல் அதிகாரத்திற்காக எனது கொள்கையைத் தியாகம் செய்ய மாட்டேன்.', img: shashi1, accent: '#CC0000' },
    ],
    ctaTag: 'அபூர்வமான தலைவர்',
    ctaQuote: '"அறிவில்லாத ஆர்வம் ஆபத்தானது."',
    ctaDesc: 'சசிகிரன் KN இரண்டையும் சம அளவில் கொண்டு வருகிறார் — ஸ்ரீரங்கம் தகுதியுடைய தலைவர்.',
    ctaJoin: 'இயக்கத்தில் சேருங்கள்',
  },
};

const ease = [0.22, 1, 0.36, 1] as const;
type Card = (typeof content.en.cards)[0];

const FadeUp = ({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.65, ease, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const IconBadge = ({ icon: Icon, accent }: { icon: LucideIcon; accent: string }) => (
  <div
    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white border shadow-sm"
    style={{ borderColor: `${accent}30`, color: accent }}
  >
    <Icon size={22} strokeWidth={2.25} />
  </div>
);

const AboutPhoto = ({ card }: { card: Card }) => (
  <div className="relative overflow-hidden rounded-xl md:rounded-2xl bg-stone-100 shadow-[0_8px_30px_rgba(15,23,42,0.08)] ring-1 ring-stone-200/80">
    <motion.img
      loading="lazy"
      src={card.img}
      alt=""
      initial={{ opacity: 0, scale: 1.03 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease }}
      className="about-premium-photo w-full aspect-[4/3] sm:aspect-[5/4] object-cover object-center"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/25 via-transparent to-transparent pointer-events-none" />
    <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ backgroundColor: card.accent }} />
  </div>
);

const AboutBlock = ({ card, index, lang }: { card: Card; index: number; lang: string }) => {
  const imageRight = index % 2 === 0;
  const Icon = ICONS[card.icon];

  return (
    <article className={`py-12 md:py-16 ${index % 2 === 1 ? 'bg-stone-50/80' : 'bg-white'}`}>
      <div className="max-w-[1080px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: imageRight ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className={`${imageRight ? 'lg:order-1' : 'lg:order-2'} ${lang === 'ta' ? 'font-tamil' : ''}`}
          >
            <div className="flex items-start gap-4 mb-5">
              <IconBadge icon={Icon} accent={card.accent} />
              <div className="min-w-0 pt-0.5">
                <span className="block w-8 h-0.5 mb-3 rounded-full" style={{ backgroundColor: card.accent }} />
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-stone-900 uppercase tracking-tight leading-tight text-left">
                  {card.heading}
                </h3>
              </div>
            </div>
            <p className="text-stone-600 text-base md:text-[1.05rem] leading-[1.8] text-left max-w-xl">
              {card.text}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: imageRight ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease, delay: 0.06 }}
            className={imageRight ? 'lg:order-2' : 'lg:order-1'}
          >
            <AboutPhoto card={card} />
          </motion.div>
        </div>
      </div>
      {index < 3 && <div className="max-w-[1080px] mx-auto px-5 sm:px-8 mt-12 md:mt-16 h-px bg-stone-200" />}
    </article>
  );
};

export const AboutCtaBanner = ({ lang = 'en' }: { lang?: string }) => {
  const c = content[lang as 'en' | 'ta'] ?? content.en;
  return (
    <section className="relative overflow-hidden group min-h-[60vh] flex items-center">
      <div className="absolute inset-0 z-0 flex">
        <img src={shashi6} alt="" className="w-1/2 h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-35 transition-all duration-1000" />
        <img src={shashi7} alt="" className="w-1/2 h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-35 transition-all duration-1000 object-top" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/88 via-white/75 to-white/88 backdrop-blur-[3px] z-10" />
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#CC0000] to-[#FF8C00] z-20" />
      <div className="relative z-20 w-full py-16 px-6 text-center max-w-3xl mx-auto">
        <FadeUp>
          <span className="text-[#CC0000] font-black text-sm tracking-[6px] uppercase mb-4 block text-center">{c.ctaTag}</span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-[1.15] mb-4 tracking-tight text-center">{c.ctaQuote}</h2>
          <p className="text-lg text-black mb-10 max-w-lg mx-auto leading-relaxed text-center">{c.ctaDesc}</p>
          <motion.button
            onClick={() => window.dispatchEvent(new CustomEvent('open-join-popup'))}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="bg-gradient-to-r from-[#CC0000] to-[#FF8C00] text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-sm shadow-xl transition-all whitespace-nowrap inline-flex items-center justify-center"
          >
            {c.ctaJoin}
          </motion.button>
        </FadeUp>
      </div>
    </section>
  );
};

export const AboutHomeContent = ({ lang = 'en' }: { lang?: string }) => {
  const c = content[lang as 'en' | 'ta'] ?? content.en;

  return (
    <section id="about-me" className={`relative scroll-mt-28 bg-white ${lang === 'ta' ? 'font-tamil' : ''}`}>
      <div className="border-b border-stone-200 bg-white">
        <div className="max-w-[1080px] mx-auto px-5 sm:px-8 py-12 md:py-16">
          <FadeUp>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none text-left">
              <span className="text-stone-900">{c.title1}</span>{' '}
              <span className="text-[#CC0000]">{c.title2}</span>
            </h2>
            <div className="mt-5 flex items-center gap-3">
              <span className="w-16 h-1 rounded-full bg-[#CC0000]" />
              <span className="w-8 h-1 rounded-full bg-[#FF8C00]" />
            </div>
          </FadeUp>
        </div>
      </div>

      <div>
        {c.cards.map((card, i) => (
          <AboutBlock key={card.icon} card={card} index={i} lang={lang} />
        ))}
      </div>
    </section>
  );
};

export default AboutHomeContent;
