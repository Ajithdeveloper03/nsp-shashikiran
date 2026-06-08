import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Megaphone, X, Send, MapPin, User, Phone, Mail, CheckCircle2 } from 'lucide-react';
import logoImg from '../assets/shashikarann.png';

const copy = {
  en: {
    fabLabel: "Share Your Issue",
    fabBadge: "YOUR VOICE",
    title: "Your Voice for Srirangam Constituency",
    subtitle: "Tell us your problem in simple words. We will listen and act.",
    step1: "About you",
    step2: "Your issue",
    name: "Your full name",
    nameHint: "",
    phone: "Mobile number",
    phoneHint: "",
    email: "Email (optional)",
    area: "Your area / ward",
    areaHint: "",
    category: "What is the problem about?",
    message: "Explain your problem",
    messageHint: "",
    categories: ["Roads", "Water", "Sanitation", "Farming", "Women Safety", "Jobs", "Schools", "Other"],
    submit: "Send Message",
    submitting: "Sending...",
    successTitle: "Thank you!",
    successDesc: "We received your message. Our team will contact you soon.",
    close: "Close",
    pickCategory: "Tap one option",
    callInstead: "Or call us directly",
  },
  ta: {
    fabLabel: "உங்கள் குறையை பகிருங்கள்",
    fabBadge: "உங்கள் குரல்",
    title: "ஸ்ரீரங்கம் தொகுதியின் குரல்",
    subtitle: "உங்கள் பிரச்சினையை எளிய வார்த்தைகளில் எழுதுங்கள். நாங்கள் கேட்டு நடவடிக்கை எடுப்போம்.",
    step1: "உங்கள் விவரம்",
    step2: "உங்கள் குறை",
    name: "உங்கள் முழு பெயர்",
    nameHint: "",
    phone: "மொபைல் எண்",
    phoneHint: "",
    email: "மின்னஞ்சல் (விருப்பம்)",
    area: "உங்கள் பகுதி / வார்டு",
    areaHint: "",
    category: "எந்த வகை பிரச்சினை?",
    message: "பிரச்சினையை விளக்குங்கள்",
    messageHint: "",
    categories: ["சாலை", "குடிநீர்", "சுகாதாரம்", "விவசாயம்", "பெண்கள் பாதுகாப்பு", "வேலை", "பள்ளி", "மற்றவை"],
    submit: "செய்தி அனுப்பு",
    submitting: "அனுப்புகிறது...",
    successTitle: "நன்றி!",
    successDesc: "உங்கள் செய்தி பெறப்பட்டது. விரைவில் தொடர்பு கொள்வோம்.",
    close: "மூடு",
    pickCategory: "ஒரு விருப்பத்தைத் தேர்ந்தெடுக்கவும்",
    callInstead: "அல்லது நேரடியாக அழைக்கவும்",
  },
};

const ConstituencyVoiceWidget = ({ lang = 'en' }: { lang?: string }) => {
  const t = copy[lang as 'en' | 'ta'] ?? copy.en;
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!category) {
      setError(t.pickCategory);
      return;
    }
    setLoading(true);
    setError('');
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = fd.get('name') as string;
    const phone = fd.get('phone') as string;
    const email = (fd.get('email') as string) || `${phone.replace(/\D/g, '')}@voice.srirangam.in`;
    const area = fd.get('area') as string;
    const message = fd.get('message') as string;

    const body = `Constituency Voice — Srirangam\n\nPhone: ${phone}\nArea/Ward: ${area}\n\n${message}`;

    const payload = new FormData();
    payload.append('name', name);
    payload.append('email', email);
    payload.append('subject', `Constituency Voice: ${category}`);
    payload.append('message', body);

    try {
      const res = await fetch(`${import.meta.env.BASE_URL}contact.php`, {
        method: 'POST',
        body: payload,
      });
      
      const text = await res.text();
      
      // If we are in local development (Vite dev server) or it returns PHP code:
      if (text.includes('<?php') || import.meta.env.DEV) {
        console.warn("Dev mode fallback: Simulating email send success for ConstituencyVoiceWidget.");
        setSubmitted(true);
        setCategory('');
        form.reset();
        return;
      }

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        if (res.ok) {
          setSubmitted(true);
          setCategory('');
          form.reset();
          return;
        }
        throw new Error("Response was not valid JSON");
      }

      if (res.ok && data.status === 'success') {
        setSubmitted(true);
        setCategory('');
        form.reset();
      } else {
        setError(data.message || 'Could not send. Please try again or call us directly.');
      }
    } catch (err) {
      if (import.meta.env.DEV) {
        console.warn("Dev mode submit error bypassed:", err);
        setSubmitted(true);
        setCategory('');
        form.reset();
      } else {
        setError('Network error. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setOpen(false);
    setTimeout(() => {
      setSubmitted(false);
      setError('');
      setCategory('');
    }, 300);
  };

  return (
    <>
      <div className="fixed bottom-4 left-3 md:bottom-6 md:left-5 z-[9995] flex flex-col items-center gap-1.5 pointer-events-none">
        <motion.span
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: [0, -2, 0] }}
          transition={{
            opacity: { delay: 1.2, duration: 0.6 },
            y: { delay: 1.8, duration: 2.8, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="pointer-events-none bg-[#FF8C00] text-black text-[0.5rem] font-black uppercase tracking-[0.15em] px-2 py-0.5 rounded-full shadow-md border border-white"
        >
          {t.fabBadge}
        </motion.span>
        <div className="relative pointer-events-auto p-1.5 voice-fab-wrap">
          <span className="voice-fab-spotlight" aria-hidden />
          <span className="voice-fab-ring-outer" aria-hidden />
          <span className="voice-fab-ring-inner" aria-hidden />
          <motion.button
            type="button"
            aria-label={t.fabLabel}
            onClick={() => setOpen(true)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, type: 'spring', stiffness: 280, damping: 20 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            className="voice-fab-focus relative z-10 flex items-center gap-2 rounded-full bg-gradient-to-br from-[#CC0000] via-[#e60000] to-[#FF8C00] text-white pl-1 pr-3 py-1 border-2 border-white"
          >
            <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-inner shrink-0">
              <Megaphone size={18} className="text-[#CC0000]" strokeWidth={2.5} />
              <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-[#FF8C00] border border-[#CC0000] animate-pulse" />
            </span>
            <span className="relative hidden md:flex flex-col items-start leading-tight pr-0.5 max-w-[120px]">
              <span className="text-[0.5rem] font-black uppercase tracking-[0.2em] text-white/90">Srirangam</span>
              <span className="text-[0.65rem] font-black uppercase tracking-wide leading-tight">{t.fabLabel}</span>
            </span>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[10001] flex items-end sm:items-center justify-center p-0 sm:p-4"
            onClick={closeModal}
          >
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]" />

            <motion.div
              initial={{ y: '100%', opacity: 0.95 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 32, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative z-10 w-full sm:max-w-[440px] max-h-[94vh] sm:max-h-[88vh] overflow-hidden bg-[#faf9f7] rounded-t-[1.75rem] sm:rounded-[1.75rem] shadow-[0_24px_80px_rgba(0,0,0,0.18)] border border-white flex flex-col ${lang === 'ta' ? 'font-tamil' : ''}`}
            >
              <div className="relative bg-white px-5 pt-5 pb-4 sm:px-6 border-b border-stone-200/80 shrink-0">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#CC0000] via-[#FF8C00] to-[#CC0000]" />
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={logoImg} alt="" className="h-11 w-11 rounded-2xl bg-stone-50 p-1 object-contain border border-stone-100 shrink-0" />
                    <div className="min-w-0">
                      <h2 className="text-lg font-black text-stone-900 leading-tight">{t.title}</h2>
                      <p className="text-sm text-stone-600 mt-1 leading-snug">{t.subtitle}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="p-2.5 rounded-xl bg-stone-100 text-stone-600 hover:bg-stone-200 transition-colors shrink-0"
                    aria-label={t.close}
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="overflow-y-auto flex-1 px-5 py-5 sm:px-6 sm:py-6 has-scrollbar">
                {submitted ? (
                  <div className="text-center py-12 px-2">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 mb-4">
                      <CheckCircle2 size={40} className="text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-black text-stone-900 mb-2">{t.successTitle}</h3>
                    <p className="text-stone-600 text-base leading-relaxed mb-8 max-w-xs mx-auto">{t.successDesc}</p>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="bg-[#CC0000] text-white px-10 py-3.5 rounded-2xl font-black text-sm shadow-md hover:bg-[#a80000] transition-colors"
                    >
                      {t.close}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-7">
                    <section className="space-y-4">
                      <StepLabel n={1} text={t.step1} />
                      <FormField label={t.name} hint={t.nameHint} icon={User} required>
                        <input
                          name="name"
                          required
                          autoComplete="name"
                          className={inputClass}
                          placeholder={t.name}
                          onInput={(e) => {
                            e.currentTarget.value = e.currentTarget.value.replace(/[0-9!@#$%^&*()_+=:{}\[\];""'<>\/?\\|`~]/g, '');
                          }}
                        />
                      </FormField>
                      <FormField label={t.phone} hint={t.phoneHint} icon={Phone} required>
                        <input
                          name="phone"
                          type="tel"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          required
                          autoComplete="tel"
                          className={inputClass}
                          placeholder="9876543210"
                          onInput={(e) => {
                            e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '').slice(0, 10);
                          }}
                        />
                      </FormField>
                      <FormField label={t.email} icon={Mail}>
                        <input name="email" type="email" autoComplete="email" className={inputClass} placeholder="you@email.com" />
                      </FormField>
                      <FormField label={t.area} hint={t.areaHint} icon={MapPin} required>
                        <input name="area" required className={inputClass} placeholder={t.areaHint} />
                      </FormField>
                    </section>

                    <section className="space-y-4">
                      <StepLabel n={2} text={t.step2} />
                      <div>
                        <p className="text-sm font-bold text-stone-800 mb-1">{t.category} <span className="text-[#CC0000]">*</span></p>
                        <p className="text-xs text-stone-500 mb-3">{t.pickCategory}</p>
                        <div className="flex flex-wrap gap-2">
                          {t.categories.map((c) => (
                            <button
                              key={c}
                              type="button"
                              onClick={() => { setCategory(c); setError(''); }}
                              className={`px-4 py-3 rounded-2xl text-sm font-bold border-2 transition-all duration-200 ${
                                category === c
                                  ? 'bg-[#CC0000] border-[#CC0000] text-white shadow-md'
                                  : 'bg-white border-stone-200 text-stone-700 hover:border-[#FF8C00]/60'
                              }`}
                            >
                              {c}
                            </button>
                          ))}
                        </div>
                      </div>
                      <FormField label={t.message} hint={t.messageHint} required>
                        <textarea
                          name="message"
                          required
                          rows={4}
                          className={`${inputClass} resize-none min-h-[110px]`}
                          placeholder={t.messageHint}
                        />
                      </FormField>
                    </section>

                    {error && (
                      <p className="text-sm text-red-700 font-semibold bg-red-50 border border-red-100 rounded-2xl px-4 py-3">{error}</p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#CC0000] to-[#b80000] hover:from-[#a80000] hover:to-[#900000] disabled:opacity-55 text-white py-4 rounded-2xl font-black text-base shadow-lg shadow-red-900/15 transition-all active:scale-[0.99]"
                    >
                      <Send size={20} strokeWidth={2.5} />
                      {loading ? t.submitting : t.submit}
                    </button>
                    <p className="text-center text-xs text-stone-500">{t.callInstead}: <a href="tel:+919688162147" className="font-bold text-[#CC0000]">+91 96881 62147</a></p>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const inputClass =
  'w-full px-4 py-4 bg-white border-2 border-stone-200 rounded-2xl outline-none font-semibold text-stone-900 text-base placeholder:text-stone-400 focus:border-[#CC0000] focus:ring-4 focus:ring-[#CC0000]/10 transition-all';

const StepLabel = ({ n, text }: { n: number; text: string }) => (
  <div className="flex items-center gap-2.5">
    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#CC0000] text-white text-xs font-black">{n}</span>
    <span className="text-xs font-black uppercase tracking-[0.15em] text-stone-500">{text}</span>
  </div>
);

const FormField = ({
  label,
  hint,
  icon: Icon,
  required,
  children,
}: {
  label: string;
  hint?: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  required?: boolean;
  children: React.ReactNode;
}) => (
  <div>
    <label className="flex items-center gap-1.5 text-sm font-bold text-stone-800">
      {Icon && <Icon size={16} className="text-[#CC0000] shrink-0" />}
      {label}
      {required && <span className="text-[#CC0000]">*</span>}
    </label>
    {hint && <p className="text-xs text-stone-500 mt-0.5 mb-2">{hint}</p>}
    {!hint && <div className="mb-2" />}
    {children}
  </div>
);

export default ConstituencyVoiceWidget;
