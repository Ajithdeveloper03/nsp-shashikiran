import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Camera, Share2, MessageCircle, Globe, Send, CheckCircle2 } from 'lucide-react';
import heroBg from '../assets/contact.png';

/* ── Animation Components ── */
const Reveal = ({ children, delay = 0, y = 20 }: { children: React.ReactNode; delay?: number; y?: number }) => (
  <motion.div initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay }}>
    {children}
  </motion.div>
);

/* ── TRANSLATIONS ── */
const translations = {
  en: {
    hero: {
      tag: 'GET IN TOUCH',
      title: 'CONTACT US',
      desc: 'Whether you have a grievance, a suggestion, or want to join our movement, we are here to listen.'
    },
    form: {
      title: 'Send a Message',
      name: 'Full Name',
      email: 'Email Address',
      subject: 'Subject',
      message: 'Your Message',
      submit: 'Send Message',
      success: 'Message Sent Successfully!',
      successDesc: 'We will get back to you within 24-48 hours.'
    },
    info: {
      title: 'Contact Details',
      address: 'No. 12, Main Road, Srirangam, Trichy - 620006',
      phone: '+91 98765 43210',
      email: 'contact@shashikiran.in',
      hours: 'Mon - Sat: 9:00 AM - 7:00 PM',
      social: 'Follow Us'
    }
  },
  ta: {
    hero: {
      tag: 'தொடர்பு கொள்ள',
      title: 'எங்களைத் தொடர்பு கொள்ளுங்கள்',
      desc: 'உங்களுக்கு ஏதேனும் குறைகள், ஆலோசனைகள் இருந்தால் அல்லது எமது இயக்கத்தில் சேர விரும்பினால், நாங்கள் செவிசாய்க்கத் தயாராக உள்ளோம்.'
    },
    form: {
      title: 'செய்தி அனுப்புங்கள்',
      name: 'முழு பெயர்',
      email: 'மின்னஞ்சல் முகவரி',
      subject: 'பொருள்',
      message: 'உங்கள் செய்தி',
      submit: 'செய்தி அனுப்பு',
      success: 'செய்தி வெற்றிகரமாக அனுப்பப்பட்டது!',
      successDesc: '24-48 மணிநேரத்திற்குள் நாங்கள் உங்களைத் தொடர்பு கொள்வோம்.'
    },
    info: {
      title: 'தொடர்பு விவரங்கள்',
      address: 'எண். 12, பிரதான சாலை, ஸ்ரீரங்கம், திருச்சி - 620006',
      phone: '+91 98765 43210',
      email: 'contact@shashikiran.in',
      hours: 'திங்கள் - சனி: காலை 9:00 - இரவு 7:00',
      social: 'எங்களைப் பின்தொடரவும்'
    }
  }
};

const ContactPage = ({ lang = 'en' }: { lang?: string }) => {
  const t = translations[lang as keyof typeof translations] || translations.en;
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className={`bg-white min-h-screen text-slate-900 font-sans selection:bg-[#CC0000] ${lang === 'ta' ? 'font-tamil' : ''}`}>
      
      {/* ── HERO WITH BANNER IMAGE & BLACK OVERLAY ── */}
      <section className="relative h-[60vh] flex items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroBg} className="w-full h-full object-cover" alt="Banner" />
          {/* Strengthened Black Overlay for contrast */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
        </div>
        
        <div className="relative z-10 max-w-4xl">
          <Reveal>
            <span className="text-[#FF8C00] text-[0.7rem] font-black tracking-[10px] uppercase block mb-6 drop-shadow-md">
              {t.hero.tag}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black leading-[0.95] tracking-tight mb-8 text-white drop-shadow-2xl">
              {t.hero.title}
            </h1>
            <p className="text-white/60 text-sm md:text-xl font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
              {t.hero.desc}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── CONTACT GRID ── */}
      <section className="py-16 px-6 md:px-16 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          
          {/* Form Column */}
          <div>
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-black mb-10 tracking-tight">{t.form.title}</h2>
              
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-100 p-10 rounded-[2.5rem] text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-2xl font-black text-green-900 mb-2">{t.form.success}</h3>
                  <p className="text-green-700 font-medium">{t.form.successDesc}</p>
                  <button onClick={() => setSubmitted(false)} className="mt-8 text-green-700 font-black text-xs uppercase tracking-widest border-b border-green-200 pb-1">Send Another Message</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[0.65rem] font-black uppercase tracking-widest text-slate-400 pl-4">{t.form.name}</label>
                      <input required type="text" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-[#CC0000] transition-colors font-bold" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[0.65rem] font-black uppercase tracking-widest text-slate-400 pl-4">{t.form.email}</label>
                      <input required type="email" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-[#CC0000] transition-colors font-bold" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[0.65rem] font-black uppercase tracking-widest text-slate-400 pl-4">{t.form.subject}</label>
                    <input required type="text" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-[#CC0000] transition-colors font-bold" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[0.65rem] font-black uppercase tracking-widest text-slate-400 pl-4">{t.form.message}</label>
                    <textarea required rows={5} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-[#CC0000] transition-colors font-bold resize-none"></textarea>
                  </div>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="w-full bg-[#CC0000] text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-xl shadow-red-100">
                    <Send size={16} />
                    {t.form.submit}
                  </motion.button>
                </form>
              )}
            </Reveal>
          </div>

          {/* Details Column */}
          <div className="lg:pt-10">
            <Reveal delay={0.2}>
              <h2 className="text-3xl font-black mb-12 tracking-tight">{t.info.title}</h2>
              
              <div className="space-y-12 mb-16">
                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center flex-shrink-0 border border-slate-100">
                    <MapPin className="text-[#CC0000]" size={24} />
                  </div>
                  <div>
                    <span className="text-[0.6rem] font-black uppercase tracking-widest text-slate-400 block mb-1">Office Address</span>
                    <p className="text-lg font-bold leading-snug">{t.info.address}</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center flex-shrink-0 border border-slate-100">
                    <Phone className="text-[#CC0000]" size={24} />
                  </div>
                  <div>
                    <span className="text-[0.6rem] font-black uppercase tracking-widest text-slate-400 block mb-1">Phone Number</span>
                    <p className="text-xl font-black tracking-tight">{t.info.phone}</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center flex-shrink-0 border border-slate-100">
                    <Mail className="text-[#CC0000]" size={24} />
                  </div>
                  <div>
                    <span className="text-[0.6rem] font-black uppercase tracking-widest text-slate-400 block mb-1">Email Support</span>
                    <p className="text-lg font-bold">{t.info.email}</p>
                  </div>
                </div>

                {/* <div className="flex gap-6">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center flex-shrink-0 border border-slate-100">
                    <Clock className="text-[#CC0000]" size={24} />
                  </div>
                  <div>
                    <span className="text-[0.6rem] font-black uppercase tracking-widest text-slate-400 block mb-1">Working Hours</span>
                    <p className="text-lg font-bold">{t.info.hours}</p>
                  </div>
                </div> */}
              </div>

              {/* Socials */}
              <div>
                <span className="text-[0.6rem] font-black uppercase tracking-widest text-slate-400 block mb-6">{t.info.social}</span>
                <div className="flex gap-4">
                  {[
                    { icon: Camera, color: '#E1306C' },
                    { icon: Share2, color: '#1DA1F2' },
                    { icon: MessageCircle, color: '#25D366' },
                    { icon: Globe, color: '#0077B5' }
                  ].map((social, i) => (
                    <motion.a key={i} href="#" whileHover={{ y: -5, scale: 1.1 }}
                      className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 hover:shadow-lg transition-all">
                      <social.icon size={20} style={{ color: social.color }} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </section>

      {/* ── GOOGLE MAP ── */}
      <section className="px-6 md:px-16 pb-24">
        <Reveal>
          <div className="w-full h-[500px] bg-slate-100 rounded-[3rem] overflow-hidden shadow-inner relative">
             <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15673.54247502444!2d78.68065405!3d10.85827365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baaf57e6e58b9f5%3A0x7d6796c9c647b59e!2sSrirangam%2C%20Tiruchirappalli%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1715569000000!5m2!1sen!2sin" 
                className="absolute inset-0 w-full h-full grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                style={{ border: 0 }}
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
             </iframe>
          </div>
        </Reveal>
      </section>

    </div>
  );
};

export default ContactPage;
