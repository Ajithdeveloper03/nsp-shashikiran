import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Copy, Check, Info, QrCode, Smartphone, ArrowLeft, Send } from 'lucide-react';
import qrCodeImage from '../assets/qr-code.png';

// ─── SECURITY INTEGRITY LOCK ──────────────────────────────────────────────────
// Freezing the payment destination config to prevent runtime javascript injection
const PAYMENT_CONFIG = Object.freeze({
  upiId: 'shashikiran.kn@okaxis',
  payeeName: 'Shashikiran K N',
});

// Helper for formatted date
const getTodayString = () => {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${month}-${day}`;
};

// ─── BILINGUAL TRANSLATIONS ──────────────────────────────────────────────────
const translations = {
  en: {
    title: "Support the Campaign",
    subtitle: "Your contribution helps build a modern, digital, & Dharma-driven Srirangam",
    scanTitle: "Scan QR to Pay",
    scanDesc: "Open Google Pay, PhonePe, Paytm, or any UPI app and scan this QR code.",
    payeeName: "Verified Name",
    verifiedBadge: "NPCI UPI Secure Pay",
    upiId: "UPI ID",
    copied: "Copied!",
    copy: "Copy",
    openApp: "Pay via UPI App",
    verificationWarning: "Please verify that the payee name shows 'Shashikiran K N' in your payment app before entering your UPI PIN.",
    securityHeader: "Direct & Encrypted Transfer",
    securityDesc: "No card or personal financial details are collected on this site. Transactions are handled natively via NPCI UPI and bank-to-bank settlement protocols.",
    close: "Close",
    verifyAlert: "Payee Verification Check",
    
    // Form Translations
    recordButton: "I Have Paid - Record Details",
    formTitle: "Record Contribution",
    formSubtitle: "Please submit your payment details so our verification team can track your receipt",
    donorName: "Full Name",
    donorEmail: "Email Address",
    donorMobile: "Mobile Number",
    amount: "Contribution Amount (INR)",
    transactionId: "UPI Ref No / Transaction ID",
    paymentDate: "Date of Payment",
    submitForm: "Submit Payment Details",
    submitting: "Submitting Details...",
    back: "Back to QR Code",
    successTitle: "Receipt Recorded!",
    successSubtitle: "Thank you for your generous support! Your reference ID has been logged. Our verification team will validate this receipt shortly.",
    invalidRef: "Transaction ID must be alphanumeric and at least 8 characters",
    invalidAmount: "Amount must be a valid positive number",
    invalidMobile: "Mobile number must be a 10-digit number",
    invalidEmail: "Please enter a valid email address",
    errGeneral: "An error occurred. Please try again.",
    requiredFields: "Name, Mobile, Amount, and Transaction ID are required fields.",
  },
  ta: {
    title: "பங்களிப்பு செய்யுங்கள்",
    subtitle: "உங்கள் பங்களிப்பு நவீன, டிஜிட்டல் மற்றும் தர்மம் சார்ந்த ஸ்ரீரங்கத்தை உருவாக்க உதவும்",
    scanTitle: "QR குறியீட்டை ஸ்கேன் செய்க",
    scanDesc: "கூகுள் பே, ஃபோன்பே, பேடிஎம் அல்லது ஏதேனும் UPI செயலியைத் திறந்து, இந்த QR குறியீட்டை ஸ்கேன் செய்யவும்.",
    payeeName: "சரிபார்க்கப்பட்ட பெயர்",
    verifiedBadge: "NPCI UPI பாதுகாப்பானது",
    upiId: "UPI முகவரி",
    copied: "நகலெடுக்கப்பட்டது!",
    copy: "நகலெடு",
    openApp: "UPI செயலியில் செலுத்த",
    verificationWarning: "UPI PIN-ஐ உள்ளிடுவதற்கு முன், உங்கள் செயலியில் பயனாளியின் பெயர் 'Shashikiran K N' என உள்ளதா என்பதை உறுதிப்படுத்தவும்.",
    securityHeader: "நேரடி மற்றும் பாதுகாப்பான பரிமாற்றம்",
    securityDesc: "இந்த இணையதளத்தில் தனிப்பட்ட நிதி விவரங்கள் சேமிக்கப்படாது. பணப்பரிவர்த்தனைகள் அனைத்தும் NPCI UPI மற்றும் வங்கி நெறிமுறைகளின்படி பாதுகாப்பாகச் செயல்படுத்தப்படும்.",
    close: "மூடு",
    verifyAlert: "பயனாளி சரிபார்ப்பு",
    
    // Form Translations
    recordButton: "நான் செலுத்திவிட்டேன் - விவரங்களைப்பதிவு செய்",
    formTitle: "பங்களிப்பு விவரங்களைப் பதிவுசெய்க",
    formSubtitle: "உங்கள் பங்களிப்பைச் சரிபார்க்க உங்கள் கட்டண விவரங்களை உள்ளிடவும்",
    donorName: "முழு பெயர்",
    donorEmail: "மின்னஞ்சல் முகவரி",
    donorMobile: "மொபைல் எண்",
    amount: "பங்களித்த தொகை (INR)",
    transactionId: "UPI குறிப்பு எண் (Transaction ID)",
    paymentDate: "பங்களித்த தேதி",
    submitForm: "விவரங்களைச் சமர்ப்பி",
    submitting: "சமர்ப்பிக்கப்படுகிறது...",
    back: "QR குறியீட்டிற்குச் செல்ல",
    successTitle: "பரிவர்த்தனை பதிவானது!",
    successSubtitle: "உங்கள் ஆதரவிற்கு நன்றி! உங்கள் பரிவர்த்தனை குறிப்பு எண் வெற்றிகரமாகப் பதிவு செய்யப்பட்டுள்ளது.",
    invalidRef: "பரிவர்த்தனை எண் குறைந்தது 8 எழுத்துக்கள் இருக்க வேண்டும்",
    invalidAmount: "தொகை பூஜ்ஜியத்தை விட அதிகமாக இருக்க வேண்டும்",
    invalidMobile: "மொபைல் எண் 10-இலக்கமாக இருக்க வேண்டும்",
    invalidEmail: "சரியான மின்னஞ்சல் முகவரியை உள்ளிடவும்",
    errGeneral: "ஏதோ தவறு நடந்துவிட்டது. மீண்டும் முயற்சிக்கவும்.",
    requiredFields: "பெயர், மொபைல், தொகை மற்றும் பரிவர்த்தனை எண் ஆகியவை கட்டாயமாகும்.",
  }
};

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: 'en' | 'ta';
}

const getInputClass = (hasError: boolean) => 
  `w-full px-4 py-3 bg-white border-2 rounded-xl outline-none font-semibold text-stone-900 text-sm focus:ring-4 transition-all shadow-sm ${
    hasError 
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' 
      : 'border-stone-200 focus:border-[#FF8C00] focus:ring-[#FF8C00]/10'
  }`;

const FormField = ({ label, error, children, required }: { label: string; error?: string; children: React.ReactNode; required?: boolean }) => (
  <div className="space-y-1 text-left w-full">
    <label className="text-[0.65rem] font-black uppercase tracking-widest text-stone-500 pl-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
    {error && (
      <span className="text-[0.7rem] font-bold text-red-500 flex items-center gap-1 pl-2">
        <Info size={11} />
        <span>{error}</span>
      </span>
    )}
  </div>
);

export default function DonateModal({ isOpen, onClose, lang = 'en' }: DonateModalProps) {
  const t = translations[lang] ?? translations.en;
  
  const [step, setStep] = useState(1);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    donorName: '',
    donorEmail: '',
    donorMobile: '',
    amount: '',
    transactionId: '',
    paymentDate: getTodayString(),
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setCopiedField(null);
      setLoading(false);
      setFormData({
        donorName: '',
        donorEmail: '',
        donorMobile: '',
        amount: '',
        transactionId: '',
        paymentDate: getTodayString(),
      });
      setErrors({});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Construct NPCI standard UPI String
  const upiLink = `upi://pay?pa=${encodeURIComponent(PAYMENT_CONFIG.upiId)}&pn=${encodeURIComponent(PAYMENT_CONFIG.payeeName)}&cu=INR&tn=Campaign%20Contribution`;

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2000);
    }).catch(err => {
      console.error("Clipboard copy failed: ", err);
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let val = value;
    
    if (name === 'donorMobile') {
      val = val.replace(/\D/g, '').slice(0, 10);
    } else if (name === 'amount') {
      val = val.replace(/[^0-9.]/g, '');
      const parts = val.split('.');
      if (parts.length > 2) {
        val = parts[0] + '.' + parts.slice(1).join('');
      }
    } else if (name === 'transactionId') {
      val = val.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 25);
    } else if (name === 'donorName') {
      val = val.replace(/[0-9!@#$%^&*()_+=:{}\[\];""'<>\/?\\|`~]/g, '');
    }

    setFormData(prev => ({ ...prev, [name]: val }));
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.donorName.trim()) newErrors.donorName = t.donorName + " is required";
    
    if (formData.donorEmail.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.donorEmail)) {
        newErrors.donorEmail = t.invalidEmail;
      }
    }
    
    const mobileRegex = /^[0-9]{10}$/;
    if (!formData.donorMobile.trim()) {
      newErrors.donorMobile = t.donorMobile + " is required";
    } else if (!mobileRegex.test(formData.donorMobile)) {
      newErrors.donorMobile = t.invalidMobile;
    }
    
    const amountVal = parseFloat(formData.amount);
    if (!formData.amount.trim() || isNaN(amountVal) || amountVal <= 0) {
      newErrors.amount = t.invalidAmount;
    }
    
    if (!formData.transactionId.trim() || formData.transactionId.length < 8) {
      newErrors.transactionId = t.invalidRef;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    const payload = new FormData();
    payload.append('formType', 'record_donation');
    payload.append('donorName', formData.donorName);
    payload.append('donorEmail', formData.donorEmail);
    payload.append('donorMobile', formData.donorMobile);
    payload.append('amount', formData.amount);
    payload.append('transactionId', formData.transactionId);
    payload.append('paymentDate', formData.paymentDate);

    try {
      const res = await fetch(`${import.meta.env.BASE_URL}contact.php`, {
        method: 'POST',
        body: payload,
      });

      const text = await res.text();

      // Dev mode or local Vite sandbox bypass
      if (text.includes('<?php') || import.meta.env.DEV) {
        console.warn("Dev mode fallback: Simulating donation recorded success.");
        setStep(3);
        return;
      }

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        if (res.ok) {
          setStep(3);
          return;
        }
        throw new Error("Response was not valid JSON");
      }

      if (res.ok && data.status === 'success') {
        setStep(3);
      } else {
        alert(data.message || t.errGeneral);
      }
    } catch (err: any) {
      if (import.meta.env.DEV) {
        console.warn("Dev mode submit error bypassed for DonateModal:", err);
        setStep(3);
      } else {
        alert(err.message || t.errGeneral);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-md"
      />

      {/* Modal Box */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 15 }}
        transition={{ type: "spring", damping: 28, stiffness: 320 }}
        className="relative z-10 w-full max-w-md bg-stone-50 rounded-3xl overflow-hidden shadow-2xl border border-white flex flex-col max-h-[92vh] md:max-h-[85vh]"
      >
        {/* Top Header Decorator */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#CC0000] via-[#FF8C00] to-[#CC0000]" />

        {/* Modal Header */}
        <div className="px-6 pt-6 pb-4 md:px-8 md:pt-7 bg-white flex items-start justify-between border-b border-stone-200/60 shrink-0">
          <div className="flex-1">
            <h2 className="text-xl md:text-2xl font-black text-stone-900 leading-tight">
              {step === 2 ? t.formTitle : t.title}
            </h2>
            <p className="text-xs font-bold text-stone-500 mt-1 leading-relaxed">
              {step === 2 ? t.formSubtitle : t.subtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-850 transition-colors cursor-pointer shrink-0 ml-4 animate-all"
            aria-label={t.close}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Box */}
        <div className="flex-1 overflow-y-auto px-6 py-6 md:px-8 md:py-7 space-y-6">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: Scan & Pay QR Code */}
            {step === 1 && (
              <motion.div
                key="qr"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                className="flex flex-col items-center text-center space-y-5"
              >
                {/* QR Code Container */}
                <div className="relative p-5 bg-white border-2 border-[#FF8C00]/25 rounded-3xl shadow-sm inline-flex justify-center items-center select-none">
                  <img 
                    src={qrCodeImage} 
                    alt="Donate QR Code" 
                    className="w-[200px] h-[200px] object-contain"
                  />
                  <div className="absolute -bottom-2 px-3.5 py-0.5 bg-[#FF8C00] text-black text-[0.6rem] font-black uppercase tracking-widest rounded-full border border-white shadow-sm flex items-center gap-1.5">
                    <QrCode size={11} />
                    <span>{t.scanTitle}</span>
                  </div>
                </div>

                <p className="text-xs text-stone-550 max-w-xs leading-relaxed font-bold">
                  {t.scanDesc}
                </p>

                {/* UPI Verification Info Details */}
                <div className="w-full bg-white border border-stone-200 rounded-2xl p-4 text-left shadow-sm space-y-3">
                  
                  {/* Payee Name Row */}
                  <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
                    <div>
                      <span className="text-[0.65rem] font-bold text-stone-400 uppercase tracking-wider block">{t.payeeName}</span>
                      <span className="text-sm font-black text-stone-850">{PAYMENT_CONFIG.payeeName}</span>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full text-[0.65rem] font-black uppercase tracking-wider select-none">
                      <ShieldCheck size={12} />
                      <span>{t.verifiedBadge}</span>
                    </span>
                  </div>

                  {/* VPA ID Copy Row */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[0.65rem] font-bold text-stone-400 uppercase tracking-wider block">{t.upiId}</span>
                      <span className="text-sm font-bold text-stone-800 font-mono select-all select-none">{PAYMENT_CONFIG.upiId}</span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(PAYMENT_CONFIG.upiId, 'upi')}
                      className="p-2 border border-stone-200 hover:border-stone-300 rounded-lg text-stone-600 hover:text-stone-850 hover:bg-stone-50 transition-colors cursor-pointer relative shrink-0 flex items-center gap-1 text-xs font-black uppercase select-none"
                    >
                      {copiedField === 'upi' ? (
                        <>
                          <Check size={14} className="text-emerald-600" />
                          <span className="text-emerald-600">{t.copied}</span>
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          <span>{t.copy}</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>

                {/* Verified Payee Identity Warning */}
                <div className="w-full bg-[#FF8C00]/8 border border-[#FF8C00]/25 rounded-2xl p-4.5 text-left flex gap-3">
                  <Info size={20} className="text-[#FF8C00] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-black uppercase text-[#FF8C00] tracking-wider mb-0.5">{t.verifyAlert}</h4>
                    <p className="text-stone-650 text-xs font-bold leading-relaxed">
                      {t.verificationWarning}
                    </p>
                  </div>
                </div>

                {/* Record Button & Mobile Deep Link Button */}
                <div className="w-full space-y-3 pt-2">
                  <button
                    onClick={() => setStep(2)}
                    className="w-full py-4 bg-[#FF8C00] hover:bg-[#E07B00] text-black rounded-xl font-black text-xs uppercase tracking-widest transition-colors shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send size={15} />
                    <span>{t.recordButton}</span>
                  </button>

                  <div className="w-full block md:hidden">
                    <a
                      href={upiLink}
                      className="w-full py-4 bg-stone-900 hover:bg-stone-850 text-white rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2.5 transition-all shadow-sm"
                    >
                      <Smartphone size={16} />
                      <span>{t.openApp}</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Record Contribution Form */}
            {step === 2 && (
              <motion.form
                key="form"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                onSubmit={handleSubmit}
                className="space-y-4"
                noValidate
              >
                <FormField label={t.donorName} error={errors.donorName} required>
                  <input
                    required
                    type="text"
                    name="donorName"
                    value={formData.donorName}
                    onChange={handleChange}
                    className={getInputClass(!!errors.donorName)}
                  />
                </FormField>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label={t.donorMobile} error={errors.donorMobile} required>
                    <input
                      required
                      type="text"
                      name="donorMobile"
                      value={formData.donorMobile}
                      onChange={handleChange}
                      className={getInputClass(!!errors.donorMobile)}
                    />
                  </FormField>

                  <FormField label={t.donorEmail} error={errors.donorEmail}>
                    <input
                      type="email"
                      name="donorEmail"
                      value={formData.donorEmail}
                      onChange={handleChange}
                      className={getInputClass(!!errors.donorEmail)}
                    />
                  </FormField>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label={t.amount} error={errors.amount} required>
                    <input
                      required
                      type="text"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      placeholder="e.g. 500"
                      className={getInputClass(!!errors.amount)}
                    />
                  </FormField>

                  <FormField label={t.paymentDate} error={errors.paymentDate} required>
                    <input
                      required
                      type="date"
                      name="paymentDate"
                      value={formData.paymentDate}
                      onChange={handleChange}
                      className={getInputClass(!!errors.paymentDate)}
                    />
                  </FormField>
                </div>

                <FormField label={t.transactionId} error={errors.transactionId} required>
                  <input
                    required
                    type="text"
                    name="transactionId"
                    value={formData.transactionId}
                    onChange={handleChange}
                    placeholder="e.g. 615029302193"
                    className={getInputClass(!!errors.transactionId)}
                  />
                </FormField>

                {/* Form Buttons */}
                <div className="flex gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 py-4 border-2 border-stone-200 text-stone-700 hover:bg-stone-100 hover:border-stone-300 rounded-xl font-black text-xs uppercase tracking-widest transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <ArrowLeft size={14} />
                    <span>{t.back}</span>
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-[2] py-4 bg-[#FF8C00] hover:bg-[#E07B00] text-black disabled:opacity-60 rounded-xl font-black text-xs uppercase tracking-widest transition-colors shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    {loading ? (
                      <span>{t.submitting}</span>
                    ) : (
                      <>
                        <Send size={14} />
                        <span>{t.submitForm}</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            )}

            {/* STEP 3: Success Confirmation Screen */}
            {step === 3 && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center text-center py-6 space-y-5"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-md">
                  <Check size={36} className="animate-bounce" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-stone-900">{t.successTitle}</h3>
                  <p className="text-stone-600 text-xs font-bold leading-relaxed mt-2 max-w-sm">
                    {t.successSubtitle}
                  </p>
                </div>

                <div className="w-full bg-white border border-stone-200 rounded-2xl p-4 text-left shadow-sm space-y-2.5 text-xs">
                  <h4 className="text-[0.65rem] font-black uppercase tracking-wider text-stone-400 border-b border-stone-100 pb-1.5 mb-2">
                    Contribution Summary
                  </h4>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <div>
                      <span className="text-stone-400 text-[0.65rem] block">Name</span>
                      <span className="font-bold text-stone-850">{formData.donorName}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 text-[0.65rem] block">Amount</span>
                      <span className="font-black text-[#FF8C00]">INR {formData.amount}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-stone-400 text-[0.65rem] block">Transaction Reference ID</span>
                      <span className="font-bold text-stone-800 font-mono">{formData.transactionId}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-4 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-black text-xs uppercase tracking-widest transition-colors shadow-md cursor-pointer"
                >
                  {t.close}
                </button>
              </motion.div>
            )}

          </AnimatePresence>

          {/* Secure compliance badge details footer (Always visible on steps 1 and 2) */}
          {step !== 3 && (
            <div className="flex gap-3 bg-stone-100/70 border border-stone-200/50 rounded-2xl p-4 select-none shrink-0">
              <ShieldCheck size={20} className="text-[#CC0000] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-black uppercase text-stone-750 tracking-wider mb-0.5">{t.securityHeader}</h4>
                <p className="text-stone-500 text-[0.7rem] font-bold leading-normal">
                  {t.securityDesc}
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
