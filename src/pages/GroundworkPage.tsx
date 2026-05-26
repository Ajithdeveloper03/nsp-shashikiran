import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogs';
import heroBg from '../assets/ground work.png';
import heroBgTab from '../assets/ground work tab.png';
import heroBgMobile from '../assets/ground work mobile.png';

const GroundworkPage = ({ lang = 'en' }: { lang?: string }) => {
  const t = {
    en: {
      eyebrow: "Field Action",
      title: "GROUNDWORK",
      subtitle: "Our constant presence on the ground to solve real problems.",
      readMore: "Read Story",
      datePrefix: "Published on"
    },
    ta: {
      eyebrow: "களப்பணி",
      title: "களப்பணி",
      subtitle: "உண்மையான பிரச்சனைகளைத் தீர்க்க களத்தில் எங்களது தொடர்ச்சியான இருப்பு.",
      readMore: "மேலும் வாசிக்க",
      datePrefix: "வெளியிடப்பட்டது"
    }
  }[lang as 'en' | 'ta'] || {
    eyebrow: "Field Action",
    title: "GROUNDWORK",
    subtitle: "Our constant presence on the ground to solve real problems.",
    readMore: "Read Story",
    datePrefix: "Published on"
  };

  return (
    <div className={`bg-white min-h-screen text-slate-900 font-sans ${lang === 'ta' ? 'font-tamil' : ''}`}>
      {/* ── HERO ── */}
      <section className="relative h-[70vh] w-full flex flex-col items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <picture className="w-full h-full opacity-60">
            <source media="(max-width: 767px)" srcSet={heroBgMobile} />
            <source media="(max-width: 1023px)" srcSet={heroBgTab} />
            <img src={heroBg} alt="" className="w-full h-full object-cover object-top" />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90" />
        </div>

        <div className="relative z-10 w-full px-6 md:px-16 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-[#FF8C00] text-sm md:text-sm font-black tracking-[10px] uppercase block mb-4"
          >
            {t.eyebrow}
          </motion.span>
          <h1 className="text-3xl sm:text-4xl md:text-7xl font-black text-white leading-none mb-6 tracking-tight">
            {t.title}
          </h1>
          <p className="text-white/70 text-sm md:text-lg max-w-2xl mx-auto text-center font-medium tracking-wide">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* ── BLOG GRID ── */}
      <section className="py-16 px-6 md:px-16 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogPosts.map((post, idx) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group flex flex-col bg-white rounded-[2.5rem] overflow-hidden border border-gray-300 shadow-md hover:shadow-2xl transition-all duration-500"
            >
              <Link to={`/groundwork/${post.slug}`} className="block relative h-64 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute top-6 right-6">
                  <span className="bg-[#CC0000] text-white px-4 py-1.5 rounded-full text-sm font-black uppercase tracking-widest">
                    {post.category}
                  </span>
                </div>
              </Link>

              <div className="p-8 flex flex-col flex-1">
                <div className="text-sm font-black text-gray-400 uppercase tracking-widest mb-3">
                  {t.datePrefix} {post.date}
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-4 leading-tight group-hover:text-[#CC0000] transition-colors">
                  <Link to={`/groundwork/${post.slug}`}>
                    {lang === 'ta' && post.slug === 'smarter-future-srirangam' ? "ஸ்ரீரங்கத்திற்கு ஒரு புத்திசாலித்தனமான எதிர்காலம்" : post.title}
                  </Link>
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-1">
                  {lang === 'ta' ? post.content.ta.substring(0, 150) + "..." : post.excerpt}
                </p>
                <Link 
                  to={`/groundwork/${post.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[2px] text-[#CC0000] group-hover:gap-4 transition-all"
                >
                  {t.readMore}
                  <div className="w-8 h-px bg-[#CC0000]/30 group-hover:w-12 group-hover:bg-[#CC0000] transition-all" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default GroundworkPage;
