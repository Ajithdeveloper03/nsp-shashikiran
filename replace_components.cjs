const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'App.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const storySectionStart = content.indexOf('const StorySection = ({ t }: { t: any }) => {');
const storySectionEnd = content.indexOf('};', storySectionStart) + 2;

const newStorySection = `const StorySection = ({ t }: { t: any }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", \`-\${(t.story.length - 1) * 100}%\`]);

  return (
    <section id="about" ref={sectionRef} className="relative h-[400vh] bg-white">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div style={{ x }} className="flex h-full w-full">
          {t.story.map((item: any, i: number) => (
            <div key={i} className="relative h-full w-screen flex-shrink-0 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] z-10"></div>
                <img src={item.bg} alt={item.title} className="w-full h-full object-cover grayscale" />
              </div>
              
              <div className="container max-w-[1400px] mx-auto px-6 md:px-16 relative z-20">
                <div className="max-w-3xl">
                  <span className="text-primary font-black text-xs tracking-[5px] uppercase mb-6 block">CHAPTER 0{i + 1}</span>
                  <h2 className="text-6xl md:text-8xl font-black mb-8 leading-none uppercase text-black">{item.title}</h2>
                  <p className="text-2xl md:text-4xl text-gray-800 leading-relaxed font-medium opacity-90 italic">
                    "\${item.text}"
                  </p>
                </div>
              </div>
              <div className="absolute bottom-20 right-20 text-[10rem] font-black text-black/5 select-none pointer-events-none">0{i+1}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};`;

content = content.substring(0, storySectionStart) + newStorySection + content.substring(storySectionEnd);

const journeySectionStart = content.indexOf('const OurJourney = ({ t }: { t: TranslationSchema }) => {');
const journeySectionEnd = content.indexOf('};', journeySectionStart) + 2;

const newJourneySection = `const OurJourney = ({ t }: { t: TranslationSchema }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? t.journeyTimeline.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === t.journeyTimeline.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="h-screen relative overflow-hidden bg-[#0A0A0A] text-white" id="journey">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10"></div>
          <img 
            src={t.journeyTimeline[activeIndex].img} 
            alt={t.journeyTimeline[activeIndex].title} 
            className="w-full h-full object-cover grayscale opacity-40"
          />
        </motion.div>
      </AnimatePresence>

      <div className="container max-w-[1400px] mx-auto px-6 md:px-16 h-full relative z-20 flex flex-col justify-center">
        <div className="max-w-3xl mb-24">
          <FadeIn y={0}>
            <h2 className="text-primary font-black text-xl tracking-[8px] mb-12 block uppercase">OUR JOURNEY</h2>
          </FadeIn>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="text-[6rem] md:text-[8rem] font-light leading-none mb-6 opacity-90">\${t.journeyTimeline[activeIndex].year}</div>
              <h3 className="text-3xl font-bold text-white mb-6 uppercase tracking-tight">\${t.journeyTimeline[activeIndex].title}</h3>
              <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl font-light">
                \${t.journeyTimeline[activeIndex].desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* BJP Style Timeline */}
        <div className="absolute bottom-0 left-0 right-0 h-[120px] bg-black/40 backdrop-blur-md border-t border-white/10 z-30">
          <div className="container max-w-[1400px] mx-auto px-6 md:px-16 h-full flex items-center justify-between">
            <div className="flex-1 flex items-end h-full pb-8 overflow-x-auto no-scrollbar gap-0">
              {t.journeyTimeline.map((item, i) => (
                <div 
                  key={i} 
                  onClick={() => setActiveIndex(i)}
                  className="flex flex-col items-center cursor-pointer group min-w-[100px]"
                >
                  <div className={\`text-sm font-bold mb-4 transition-all duration-300 \${activeIndex === i ? "text-white scale-110" : "text-gray-500 group-hover:text-gray-300"}\`}>
                    \${item.year}
                  </div>
                  <div className="relative w-full flex flex-col items-center">
                    <div className="w-full h-[1px] bg-white/20"></div>
                    <div className="flex justify-between w-full px-2 mt-1">
                      {[...Array(5)].map((_, j) => (
                        <div key={j} className={\`w-[1px] h-2 bg-white/10 \${activeIndex === i ? "bg-white/30" : ""}\`}></div>
                      ))}
                    </div>
                    {activeIndex === i && (
                      <motion.div 
                        layoutId="activeTimeline"
                        className="absolute -top-[1px] left-0 right-0 h-[2px] bg-primary shadow-[0_0_10px_rgba(204,0,0,0.5)]" 
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 ml-12">
              <button 
                onClick={handlePrev}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-white/40 transition-all"
              >
                <ArrowRight size={20} className="rotate-180" />
              </button>
              <button 
                onClick={handleNext}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-white/40 transition-all"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};\`;

content = content.substring(0, journeySectionStart) + newJourneySection + content.substring(journeySectionEnd);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated App.tsx');
