import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { Facebook, Instagram, Youtube } from '../components/SocialIcons';
import heroBg from '../assets/contact.jpg';
import logoImg from '../assets/shashikarann.png';
import formBg from '../assets/about3.jpeg';

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
      successDesc: 'We will get back to you within 24-48 hours.',
      sendAnother: 'Send Another Message',
      sending: 'Sending...',
      errorTryAgain: 'Something went wrong. Please try again.',
      errorSubmit: 'Error submitting form.',
      sloganTitle: "Let's Build Srirangam Together",
      sloganDesc: "Your voice matters. Share your feedback, grievances, or innovative ideas to help us shape a modern, digital, and dharma-driven constituency."
    },
    info: {
      title: 'Contact Details',
      address: 'Plot No. 12, D-54, 9A Cross Road, West Thillai Nagar, Tiruchirappalli, Tamil Nadu 620018',
      phone: '+91 96881 62147',
      email: 'nsptn2031@gmail.com',
      hours: 'Mon - Sat: 9:00 AM - 7:00 PM',
      social: 'Follow Us',
      addressLabel: 'Office Address',
      phoneLabel: 'Phone Number',
      emailLabel: 'Email Support'
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
      successDesc: '24-48 மணிநேரத்திற்குள் நாங்கள் உங்களைத் தொடர்பு கொள்வோம்.',
      sendAnother: 'மற்றொரு செய்தியை அனுப்பவும்',
      sending: 'அனுப்பப்படுகிறது...',
      errorTryAgain: 'ஏதோ தவறு நடந்துவிட்டது. மீண்டும் முயற்சிக்கவும்.',
      errorSubmit: 'படிவத்தை சமர்ப்பிப்பதில் பிழை ஏற்பட்டது.',
      sloganTitle: 'ஸ்ரீரங்கத்தை இணைந்து உருவாக்குவோம்',
      sloganDesc: 'உங்கள் குரல் முக்கியமானது. நவீன, டிஜிட்டல் மற்றும் தர்மம் சார்ந்த தொகுதியை உருவாக்க உங்கள் கருத்துக்கள், குறைகள் அல்லது ஆலோசனைகளைப் பகிர்ந்து கொள்ளுங்கள்.'
    },
    info: {
      title: 'தொடர்பு விவரங்கள்',
      address: 'மனை எண் 12, D-54, 9ஏ குறுக்குச் சாலை, மேற்கு தில்லை நகர், திருச்சிராப்பள்ளி, தமிழ்நாடு 620018',
      phone: '+91 96881 62147',
      email: 'nsptn2031@gmail.com',
      hours: 'திங்கள் - சனி: காலை 9:00 - இரவு 7:00',
      social: 'எங்களைப் பின்தொடரவும்',
      addressLabel: 'அலுவலக முகவரி',
      phoneLabel: 'தொலைபேசி எண்',
      emailLabel: 'மின்னஞ்சல் முகவரி'
    }
  }
};

const ContactPage = ({ lang = 'en' }: { lang?: string }) => {
  const t = translations[lang as keyof typeof translations] || translations.en;
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    try {
      const response = await fetch(`${import.meta.env.BASE_URL}contact.php`, {
        method: 'POST',
        body: formData,
      });
      
      const text = await response.text();
      
      // If we are in local development (Vite dev server) or it returns PHP code:
      if (text.includes('<?php') || import.meta.env.DEV) {
        console.warn("Dev mode fallback: Simulating email send success for ContactPage.");
        setSubmitted(true);
        return;
      }

      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        // Response was not JSON
      }

      if (response.ok && data?.status === 'success') {
        setSubmitted(true);
      } else {
        const errorDetail = data?.message || text || `HTTP Status ${response.status}`;
        alert(`${t.form.errorTryAgain}\n\nDetails: ${errorDetail}`);
      }
    } catch (error: any) {
      if (import.meta.env.DEV) {
        console.warn("Dev mode submit error bypassed for ContactPage:", error);
        setSubmitted(true);
      } else {
        alert(`${t.form.errorSubmit}\n\nError details: ${error?.message || error}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`bg-[#FDFCF7]/50 min-h-screen text-slate-900 font-sans selection:bg-[#CC0000] ${lang === 'ta' ? 'font-tamil' : ''}`}>
      
      {/* ── HERO WITH BANNER IMAGE & BLACK OVERLAY ── */}
      <section className="relative h-[60vh] flex items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroBg} className="w-full h-full object-cover" alt="Banner" />
          {/* Strengthened Black Overlay for contrast */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-[0px]" />
        </div>
        
        <div className="relative z-10 max-w-4xl">
          <Reveal>
            <span className="text-[#FF8C00] text-[0.7rem] font-black tracking-[10px] uppercase block mb-3 drop-shadow-md">
              {t.hero.tag}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black leading-[0.95] tracking-tight mb-6 text-white drop-shadow-2xl">
              {t.hero.title}
            </h1>
            <p className="text-white/60 text-sm md:text-xl text-center font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
              {t.hero.desc}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── CONTACT DETAILS GRID (3 Cards) ── */}
      <section className="pt-16 px-6 md:px-16 max-w-[1400px] mx-auto">
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-6">
            {/* Address Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row md:flex-col lg:flex-row gap-5 items-start"
            >
              <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center flex-shrink-0 border border-red-100">
                <MapPin className="text-[#CC0000]" size={24} />
              </div>
              <div className="space-y-1">
                <span className="text-[0.65rem] font-black uppercase tracking-widest text-[#FF8C00] block">{t.info.addressLabel}</span>
                <p className="text-base font-bold text-slate-800 leading-snug">{t.info.address}</p>
              </div>
            </motion.div>

            {/* Phone Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row md:flex-col lg:flex-row gap-5 items-start"
            >
              <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center flex-shrink-0 border border-red-100">
                <Phone className="text-[#CC0000]" size={24} />
              </div>
              <div className="space-y-1">
                <span className="text-[0.65rem] font-black uppercase tracking-widest text-[#FF8C00] block">{t.info.phoneLabel}</span>
                <a href={`tel:${t.info.phone.replace(/\s+/g, '')}`} className="text-lg font-black text-slate-800 tracking-tight hover:text-[#CC0000] transition-colors block">{t.info.phone}</a>
              </div>
            </motion.div>

            {/* Email Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row md:flex-col lg:flex-row gap-5 items-start"
            >
              <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center flex-shrink-0 border border-red-100">
                <Mail className="text-[#CC0000]" size={24} />
              </div>
              <div className="space-y-1">
                <span className="text-[0.65rem] font-black uppercase tracking-widest text-[#FF8C00] block">{t.info.emailLabel}</span>
                <a href={`mailto:${t.info.email}`} className="text-base font-bold text-slate-800 hover:text-[#CC0000] transition-colors block break-all">{t.info.email}</a>
              </div>
            </motion.div>
          </div>
        </Reveal>
      </section>

      {/* ── SOCIAL LINKS ROW ── */}
      <section className="px-6 md:px-16 max-w-[1400px] mx-auto text-center mb-12">
        <Reveal delay={0.1}>
          <div className="flex flex-col items-center justify-center bg-white border border-slate-100/80 rounded-3xl py-6 px-8 max-w-md mx-auto shadow-sm">
            <span className="text-[0.65rem] font-black uppercase tracking-widest text-slate-400 block mb-3">{t.info.social}</span>
            <div className="flex gap-4">
              {[
                { icon: Facebook, color: '#1877F2', href: 'https://www.facebook.com/profile.php?id=61570864402762', label: 'Facebook' },
                { icon: Instagram, color: '#E1306C', href: 'https://instagram.com/shashikiran_srirangam/', label: 'Instagram' },
                { icon: Youtube, color: '#FF0000', href: 'https://www.youtube.com/@shashikiransrirangam', label: 'YouTube' }
              ].map((social, i) => (
                <motion.a key={i} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} whileHover={{ y: -5, scale: 1.1 }}
                  className="w-12 h-12 bg-slate-50 hover:bg-slate-100 rounded-xl flex items-center justify-center border border-slate-100 hover:shadow-md transition-all">
                  <social.icon size={20} style={{ color: social.color }} />
                </motion.a>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── SPLIT FORM & BRANDING IMAGE CARD ── */}
      <section className="pb-16 px-6 md:px-16 max-w-[1400px] mx-auto">
        <Reveal delay={0.15}>
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
            
            {/* Left Column: Stunning Image overlay with slogan */}
            <div className="lg:col-span-5 relative min-h-[350px] lg:min-h-full overflow-hidden flex flex-col justify-between p-8 md:p-12 text-white">
              <div className="absolute inset-0 z-0">
                <img src={formBg} className="w-full h-full object-cover" alt="Campaign Banner" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#CC0000]/95 via-[#CC0000]/90 to-[#FF8C00]/85" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_35%,rgba(255,255,255,0.15),transparent_60%)]" />
              </div>

              {/* Branding Header */}
              <div className="relative z-10 flex items-center gap-3">
                <img src={logoImg} alt="Campaign Logo" className="w-10 h-10 bg-white rounded-xl p-1 border border-white/20 shadow-md object-contain shrink-0" />
                <div>
                  <h3 className="font-black text-xs uppercase tracking-[0.2em] leading-none">SHASHIKIRAN KN</h3>
                  <p className="text-[0.5rem] text-orange-200 font-black uppercase tracking-[0.25em] leading-none mt-1">TAMIL NADU 2026</p>
                </div>
              </div>

              {/* Slogan Message */}
              <div className="relative z-10 space-y-4 my-auto pt-12 lg:pt-0">
                <h4 className="text-2xl md:text-3xl font-black leading-tight tracking-tight text-white drop-shadow-sm">
                  {t.form.sloganTitle}
                </h4>
                <p className="text-white/80 font-medium text-sm md:text-base leading-relaxed">
                  {t.form.sloganDesc}
                </p>
              </div>

              {/* Footer Indicator */}
              <div className="relative z-10 pt-6 border-t border-white/10 text-white/60 text-xs font-bold uppercase tracking-widest">
                Srirangam Assembly Constituency
              </div>
            </div>

            {/* Right Column: Modern Contact Form */}
            <div className="lg:col-span-7 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-slate-50/20">
              <h2 className="text-2xl md:text-3xl font-black mb-8 tracking-tight text-slate-900">{t.form.title}</h2>
              
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-100 p-8 md:p-10 rounded-[2rem] text-center my-auto">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-lg shadow-green-100">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-2xl font-black text-green-900 mb-2">{t.form.success}</h3>
                  <p className="text-green-700 font-medium text-sm md:text-base">{t.form.successDesc}</p>
                  <button onClick={() => setSubmitted(false)} className="mt-8 text-green-700 hover:text-green-900 font-black text-xs uppercase tracking-widest border-b-2 border-green-200 hover:border-green-400 transition-colors pb-0.5">{t.form.sendAnother}</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[0.65rem] font-black uppercase tracking-widest text-slate-400 pl-4">{t.form.name}</label>
                      <input
                        required
                        type="text"
                        name="name"
                        onInput={(e) => {
                          e.currentTarget.value = e.currentTarget.value.replace(/[0-9!@#$%^&*()_+=:{}\[\];""'<>\/?\\|`~]/g, '');
                        }}
                        className="w-full px-6 py-4 bg-white border border-slate-200 focus:border-[#CC0000] focus:ring-4 focus:ring-[#CC0000]/5 rounded-2xl outline-none transition-all font-bold text-slate-800 shadow-sm"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[0.65rem] font-black uppercase tracking-widest text-slate-400 pl-4">{t.form.email}</label>
                      <input required type="email" name="email" className="w-full px-6 py-4 bg-white border border-slate-200 focus:border-[#CC0000] focus:ring-4 focus:ring-[#CC0000]/5 rounded-2xl outline-none transition-all font-bold text-slate-800 shadow-sm" placeholder="john@example.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[0.65rem] font-black uppercase tracking-widest text-slate-400 pl-4">{t.form.subject}</label>
                    <input required type="text" name="subject" className="w-full px-6 py-4 bg-white border border-slate-200 focus:border-[#CC0000] focus:ring-4 focus:ring-[#CC0000]/5 rounded-2xl outline-none transition-all font-bold text-slate-800 shadow-sm" placeholder="Grievance / Suggestion" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[0.65rem] font-black uppercase tracking-widest text-slate-400 pl-4">{t.form.message}</label>
                    <textarea required name="message" rows={5} className="w-full px-6 py-4 bg-white border border-slate-200 focus:border-[#CC0000] focus:ring-4 focus:ring-[#CC0000]/5 rounded-2xl outline-none transition-all font-bold text-slate-800 shadow-sm resize-none" placeholder="Write your message here..."></textarea>
                  </div>
                  <motion.button disabled={loading} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                    className="w-full bg-gradient-to-r from-[#CC0000] via-[#e60000] to-[#FF8C00] text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-xl shadow-red-200/50 hover:shadow-red-200 disabled:opacity-70 transition-all cursor-pointer">
                    <Send size={16} />
                    {loading ? t.form.sending : t.form.submit}
                  </motion.button>
                </form>
              )}
            </div>

          </div>
        </Reveal>
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
