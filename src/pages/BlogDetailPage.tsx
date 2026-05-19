import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPosts, type BlogPost } from '../data/blogs';
import { Clock, User, ArrowLeft, Share2, MessageCircle, Camera, Globe } from 'lucide-react';

const BlogDetailPage = ({ lang = 'en' }: { lang?: string }) => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const foundPost = blogPosts.find(p => p.slug === slug);
    if (foundPost) {
      setPost(foundPost);
    }
  }, [slug]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-100px 0px -40% 0px' }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [post]);

  if (!post) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  const t = {
    en: {
      back: "Back to Groundwork",
      toc: "Table of Contents",
      share: "Share Story",
      faq: "Frequently Asked Questions",
      author: "Shashikiran KN",
      readTime: "8 min read"
    },
    ta: {
      back: "களப்பணிக்குத் திரும்பு",
      toc: "பொருளடக்கம்",
      share: "பகிர்",
      faq: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
      author: "சசிகிரண் கே.என்",
      readTime: "8 நிமிட வாசிப்பு"
    }
  }[lang as 'en' | 'ta'] || {
    back: "Back to Groundwork",
    toc: "Table of Contents",
    share: "Share Story",
    faq: "Frequently Asked Questions",
    author: "Shashikiran KN",
    readTime: "8 min read"
  };

  return (
    <div className={`min-h-screen pb-24 font-sans ${lang === 'ta' ? 'font-tamil' : ''}`}>
      
      {/* ── HEADER / HERO ── */}
      <header className="relative w-full mb-10 md:mb-16 overflow-hidden min-h-[60vh] md:min-h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img src={post.heroImage} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80" />
        </div>
        
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-16 w-full pt-28 md:pt-40 pb-10 md:pb-20">
          {/* Breadcrumb inside hero */}
          <div className="mb-12">
            <Link to="/groundwork" className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[3px] text-white/60 hover:text-white transition-colors">
              <ArrowLeft size={16} />
              {t.back}
            </Link>
          </div>

          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-8">
              <span className="bg-[#CC0000] text-white px-5 py-2 rounded-full text-sm font-black uppercase tracking-[3px]">
                {post.category}
              </span>
              <div className="flex items-center gap-2 text-white/60 text-sm font-bold uppercase tracking-[2px]">
                <Clock size={14} />
                {t.readTime}
              </div>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-white leading-[1.05] mb-6 md:mb-10 tracking-tight">
              {lang === 'ta' && post.slug === 'smarter-future-srirangam' ? "ஸ்ரீரங்கத்திற்கு ஒரு புத்திசாலித்தனமான எதிர்காலம்: மக்கள் நலன் சார்ந்த வளர்ச்சிக்கான எனது தொலைநோக்கு பார்வை" : post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-y-6 gap-x-8 md:gap-x-12 border-t border-white/10 pt-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white border border-white/10">
                  <User size={20} />
                </div>
                <div>
                  <div className="text-sm font-black text-white/40 uppercase tracking-widest leading-none mb-1.5">Author</div>
                  <div className="text-sm font-black text-white uppercase tracking-wider">{t.author}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/40 border border-white/10">
                  <Clock size={20} />
                </div>
                <div>
                  <div className="text-sm font-black text-white/40 uppercase tracking-widest leading-none mb-1.5">Published</div>
                  <div className="text-sm font-black text-white uppercase tracking-wider">{post.date}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT LAYOUT ── */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-16 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 lg:gap-12">
        
        {/* ── LEFT SIDE: CONTENT ── */}
        <article className="max-w-none">
          <div className="relative rounded-[2.5rem] overflow-hidden mb-12 md:mb-20 shadow-2xl group">
            <img src={post.image} alt={post.title} className="w-full h-auto transform transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-[2.5rem]" />
          </div>

          <div className="text-sm md:text-base text-gray-700 leading-relaxed mb-8 md:mb-12 border-l-4 border-[#CC0000] pl-5 md:pl-8 py-2">
            {post.content[lang as 'en' | 'ta']}
          </div>

          {post.sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-32 mb-12 md:mb-20">
              <div className="mb-10 md:mb-14">
                <div className="text-[#CC0000] text-sm font-black uppercase tracking-[5px] mb-4 flex items-center gap-4">
                  <div className="w-12 h-px bg-[#CC0000]/30" />
                  Section Detail
                </div>
                <h2 className="text-2xl md:text-4xl font-black text-gray-900 leading-tight tracking-tight">
                  {section.title[lang as 'en' | 'ta']}
                </h2>
              </div>

              {section.image && (
                <div className="relative rounded-[2.5rem] overflow-hidden mb-10 md:mb-12 shadow-2xl border border-gray-100">
                  <img src={section.image} alt={section.title[lang as 'en' | 'ta']} className="w-full aspect-[16/9] object-cover" />
                </div>
              )}

              <div className="text-gray-600 text-sm md:text-base leading-relaxed whitespace-pre-line space-y-4 max-w-3xl">
                {section.content[lang as 'en' | 'ta'].split('\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </section>
          ))}

          {/* FAQ Section */}
          {post.faq && post.faq.length > 0 && (
            <section id="faq" className="scroll-mt-32 pt-12 md:pt-20 border-t border-gray-100 mb-12 md:mb-20">
              <div className="text-center mb-16">
                <span className="text-[#CC0000] text-sm font-black uppercase tracking-[5px] block mb-4">RESOURCES</span>
                <h2 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tight">{t.faq}</h2>
              </div>
              <div className="grid gap-6">
                {post.faq.map((item, i) => (
                  <div key={i} className="bg-gray-50 p-5 md:p-8 rounded-2xl md:rounded-[2.5rem] border border-gray-100 transition-all hover:bg-white hover:shadow-2xl hover:border-transparent group">
                    <h3 className="text-base md:text-xl font-black text-gray-900 mb-4 flex gap-4 leading-tight">
                      <span className="text-[#CC0000]">Q.</span>
                      {item.question[lang as 'en' | 'ta']}
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed pl-8">
                      {item.answer[lang as 'en' | 'ta']}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </article>

        {/* ── RIGHT SIDE: TABLE OF CONTENTS (STUCK) ── */}
        <aside className="hidden lg:block">
          <div className="sticky top-32 space-y-12">
            
            {/* Table of Contents */}
            <div className="bg-gray-60 shadow-2xl rounded-[2.5rem] p-10 border border-gray-100">
              <h4 className="text-sm font-bpld text-[#CC0000] uppercase tracking-[2px] mb-8 flex items-center gap-3">
                <div className="w-6 h-px bg-[#CC0000]/30" />
                {t.toc}
              </h4>
              <nav className="flex flex-col gap-5">
                {post.sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`text-sm  tracking-wider transition-all hover:text-[#CC0000] flex items-center gap-3 group ${activeSection === section.id ? 'text-[#CC0000] translate-x-2' : 'text-gray-500'}`}
                  >
                    <div className={`w-2 h-2 rounded-full transition-all border-2 border-current ${activeSection === section.id ? 'bg-[#CC0000] scale-100' : 'bg-transparent scale-50 group-hover:scale-100'}`} />
                    {section.title[lang as 'en' | 'ta']}
                  </a>
                ))}
                {post.faq && post.faq.length > 0 && (
                   <a
                    href="#faq"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`text-sm font-black uppercase tracking-wider transition-all hover:text-[#CC0000] flex items-center gap-3 group ${activeSection === 'faq' ? 'text-[#CC0000] translate-x-2' : 'text-gray-400'}`}
                  >
                    <div className={`w-2 h-2 rounded-full transition-all border-2 border-current ${activeSection === 'faq' ? 'bg-[#CC0000] scale-100' : 'bg-transparent scale-50 group-hover:scale-100'}`} />
                    {t.faq}
                  </a>
                )}
              </nav>
            </div>

            {/* Share Section */}
            <div className="px-10">
              <h4 className="text-sm font-black text-gray-400 uppercase tracking-[4px] mb-8">{t.share}</h4>
              <div className="flex gap-4">
                {[
                  { icon: Camera, color: 'hover:bg-[#E1306C]' },
                  { icon: Globe, color: 'hover:bg-[#0077B5]' },
                  { icon: MessageCircle, color: 'hover:bg-[#25D366]' },
                  { icon: Share2, color: 'hover:bg-[#CC0000]' }
                ].map((item, i) => (
                  <button
                    key={i}
                    className={`w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 transition-all hover:text-white hover:border-transparent ${item.color}`}
                  >
                    <item.icon size={18} />
                  </button>
                ))}
              </div>
            </div>

            {/* Candidate CTA */}
            <div className="p-10 bg-black rounded-[2.5rem] text-white overflow-hidden relative group">
              <div className="relative z-10">
                <h4 className="text-2xl font-black mb-4 leading-tight tracking-tight">Join the movement for a Smarter Srirangam</h4>
                <p className="text-white/60 text-sm mb-8 leading-relaxed">Be part of the change you want to see in our constituency. Your voice matters in building a better future.</p>
                <Link to="/contact" className="inline-block bg-[#CC0000] text-white px-10 py-4 rounded-full text-sm font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-xl">
                  Join Now
                </Link>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#CC0000]/20 blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-500/10 blur-2xl translate-y-1/2 -translate-x-1/2" />
            </div>

          </div>
        </aside>

      </div>
    </div>
  );
};

export default BlogDetailPage;
