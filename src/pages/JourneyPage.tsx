import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AboutCtaBanner } from './AboutMePage';
import shashi6 from '../assets/home 2008.png';
import shashi7 from '../assets/home 2011.png';
import shashi8 from '../assets/home 2015.png';
import shashi9 from '../assets/home 2018.png';
import shashi10 from '../assets/home 2019.png';
import shashi11 from '../assets/home 2020.png';
import shashi12 from '../assets/home 2026.png';

const content = {
  en: {
    events: [
      { year: "2008", title: "Clear Mind, Strong Leadership", img: shashi6, desc: "Yoga and books changed my life. They trained my mind to stay calm and helped me understand the world's problems clearly. Today, because of this focus, I have a clear blueprint to lead and serve you.", color: "#CC0000" },
      { year: "2011", title: "A Decision Made at Age 17", img: shashi7, desc: "When I was just 17 years old, I made a choice that changed my whole life. I promised myself to give up personal desires and dedicate my entire life to serving this nation and helping you.", color: "#CC0000" },
      { year: "2015", title: "Trained to Govern, Ready to Lead", img: shashi8, desc: "I wanted to understand exactly how our government works, so I joined the IAS Academy. There, I deeply studied History, Politics, and Economics. Today, I have the legal knowledge to design and draft laws that will truly help the common people.", color: "#FF8C00" },
      { year: "2018", title: "How to Build and Lead", img: shashi9, desc: "I didn't just study; I proved myself globally as a Financial Planner and Investment Banker. By founding Sarathi Groups, I showed that I am a self-reliant leader who knows how to plan, build, and run successful organizations.", color: "#FF8C00" },
      { year: "2019", title: "Serving You on the Ground", img: shashi10, desc: "I believe that helping people is more important than getting political power. That is why I started the NS Social Welfare Trust. Through this, I am already working directly on the ground to solve your day-to-day problems.", color: "#CC0000" },
      { year: "2020", title: "A New Journey for the Nation", img: shashi11, desc: "Netaji Subhash Chandra Bose's fearless vision for our country is my biggest inspiration. Following his footsteps, I am launching my political journey with a simple goal—to stand for true nationalism, serve the people, and build a better society for everyone.", color: "#CC0000" },
      { year: "2026", title: "Standing with the People of Srirangam", img: shashi12, desc: "Srirangam is my field of action. I have stepped directly into the constituency to meet you, understand your needs, and work at the grassroots level. My only goal is to work hard and bring real, positive change to your lives.", color: "#FF8C00" },
    ],
  },
  ta: {
    events: [
      { year: "2008", title: "தெளிவான மனம், வலுவான தலைமை", img: shashi6, desc: "யோகாவும் புத்தகங்களும் என் வாழ்க்கையை மாற்றின. அவை என் மனதை அமைதியாக வைத்து, உலகின் பிரச்சினைகளைத் தெளிவாகப் புரிந்துகொள்ள உதவின. இன்று, இந்தக் கவனத்தால், உங்களுக்கு வழிநடத்தவும் சேவை செய்யவும் தெளிவான வரைபடம் எனக்குள்ளது.", color: "#CC0000" },
      { year: "2011", title: "17 வயதில் எடுத்த முடிவு", img: shashi7, desc: "நான் வெறும் 17 வயதில், என் முழு வாழ்க்கையையும் மாற்றிய ஒரு தீர்மானம் எடுத்தேன். தனிப்பட்ட விருப்பங்களைத் தியாகம் செய்து, இந்த நாட்டிற்கும் உங்களுக்கும் சேவை செய்வதற்கு என் வாழ்க்கையை அர்ப்பணிப்பதாக வாக்குறுதி அளித்தேன்.", color: "#CC0000" },
      { year: "2015", title: "ஆள்வதற்குப் பயிற்சி, தலைமையேறத் தயார்", img: shashi8, desc: "நமது அரசு எவ்வாறு இயங்குகிறது என்பதைப் புரிந்துகொள்ள ஐஏஎஸ் அகாடமியில் சேர்ந்தேன். அங்கு வரலாறு, அரசியல் மற்றும் பொருளாதாரம் ஆகியவற்றை ஆழமாகப் படித்தேன். இன்று, சாமானிய மக்களுக்கு உண்மையாக உதவும் சட்டங்களை வடிவமைக்கும் சட்ட அறிவு எனக்குள்ளது.", color: "#FF8C00" },
      { year: "2018", title: "எவ்வாறு கட்டி, தலைமையேறுவது", img: shashi9, desc: "படித்தது மட்டுமல்ல; உலகளாவிய நிதி ஆலோசகர் மற்றும் முதலீட்டு வங்கியாளராக என்னை நிரூபித்தேன். சாரதி குரூப்ஸை நிறுவி, திட்டமிடவும் கட்டவும் வெற்றிகரமான அமைப்புகளை இயக்கவும் தெரிந்த சுயசார்புத் தலைவர் என்பதைக் காட்டினேன்.", color: "#FF8C00" },
      { year: "2019", title: "களத்தில் உங்களுக்கு சேவை", img: shashi10, desc: "மக்களுக்கு உதவுவது அரசியல் அதிகாரத்தைப் பெறுவதை விட முக்கியம் என்று நம்புகிறேன். அதனால்தான் என்.எஸ் சமூக நல அறக்கட்டளையைத் தொடங்கினேன். இதன் மூலம், உங்கள் அன்றாடப் பிரச்சினைகளைத் தீர்க்க நேரடியாகக் களத்தில் பணியாற்றி வருகிறேன்.", color: "#CC0000" },
      { year: "2020", title: "நாட்டிற்கான புதிய பயணம்", img: shashi11, desc: "நேதாஜி சுபாஷ் சந்திர போஸின் தைரியமான தொலைநோக்குப் பார்வை எனக்கு மிகப்பெரிய ஊக்கம். அவரது அடிச்சுவடுகளில், உண்மையான தேசியவாதத்திற்காக நிற்பது, மக்களுக்கு சேவை செய்வது, அனைவருக்கும் சிறந்த சமூகத்தை உருவாக்குவது என்ற எளிய லட்சியத்துடன் அரசியல் பயணத்தைத் தொடங்குகிறேன்.", color: "#CC0000" },
      { year: "2026", title: "ஸ்ரீரங்கம் மக்களுடன் நிற்பது", img: shashi12, desc: "ஸ்ரீரங்கம் எனது செயல்பாட்டுக் களம். தொகுதியில் நேரடியாகக் களமிறங்கி, உங்களைச் சந்தித்து, உங்கள் தேவைகளைப் புரிந்துகொண்டு, அடிமட்ட அளவில் பணியாற்றுகிறேன். உங்கள் வாழ்க்கையில் உண்மையான, நேர்மறையான மாற்றத்தைக் கொண்டுவருவதே எனது ஒரே லட்சியம்.", color: "#FF8C00" },
    ],
  },
};

const RoadmapEvent = ({
  event, side, color, isLast,
}: {
  event: { year: string; title: string; img: string; desc: string };
  side: 'left' | 'right';
  color: string;
  isLast: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'start 0.35'] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const x = useTransform(scrollYProgress, [0, 1], [side === 'left' ? -40 : 40, 0]);

  return (
    <div ref={ref} className="relative flex md:items-start items-stretch gap-0 min-h-[150px] md:min-h-[220px]">
      <div className="hidden md:flex w-[calc(50%-2.5rem)] justify-end pr-10 pt-4">
        {side === 'left' && (
          <motion.div style={{ opacity, x }} className="w-full max-w-xl">
            <EventCard event={event} color={color} />
          </motion.div>
        )}
      </div>
      <div className="flex flex-col items-center w-10 md:w-16 flex-shrink-0">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.1 }}
          className="w-4 h-4 md:w-5 md:h-5 rounded-full border-[3px] md:border-4 border-white shadow-lg z-10 flex-shrink-0"
          style={{ backgroundColor: color }}
        />
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            className="w-0.5 flex-1 origin-top mt-1"
            style={{ backgroundColor: `${color}35`, minHeight: '5rem' }}
          />
        )}
      </div>
      <div className="flex-1 md:w-[calc(50%-2.5rem)] flex justify-start pl-6 md:pl-10 pt-2 md:pt-4">
        <div className="md:hidden w-full pb-8">
          <motion.div style={{ opacity, x: 0 }} className="w-full">
            <EventCard event={event} color={color} />
          </motion.div>
        </div>
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
      <h3 className="text-lg md:text-xl font-black text-gray-900 mb-3 leading-tight tracking-tight">{event.title}</h3>
      <p className="text-sm md:text-base text-gray-600 leading-relaxed font-medium">{event.desc}</p>
    </div>
  </motion.div>
);

export const JourneyHomeContent = ({ lang = 'en' }: { lang?: string }) => {
  const c = content[lang as 'en' | 'ta'] ?? content.en;

  return (
    <div id="journey-roadmap" className={`bg-slate-50 font-sans scroll-mt-28 ${lang === 'ta' ? 'font-tamil' : ''}`}>
      <section className="py-16 md:py-24 px-4 relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent -translate-x-1/2" />
        <div className="max-w-5xl mx-auto">
          <div className="space-y-8">
            {c.events.map((event, i) => {
              const side = i % 2 === 0 ? 'left' : 'right';
              const isLast = i === c.events.length - 1;
              return (
                <RoadmapEvent key={i} event={event} side={side as 'left' | 'right'} color={event.color} isLast={isLast} />
              );
            })}
          </div>
        </div>
      </section>
      <AboutCtaBanner lang={lang} />
    </div>
  );
};

export default JourneyHomeContent;
