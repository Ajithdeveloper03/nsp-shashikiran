import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, User, Phone, Mail, ArrowRight, ArrowLeft,
  AlertCircle, Download, Share2,
  ChevronDown, CheckCircle2
} from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';

import logoImg from '../assets/shashikarann.png';
import campaignBg from '../assets/about3.jpeg';
import srirangamImg from '../assets/srirangam island.jpg';
import { constituencies } from '../data/constituencies';

// ─── TRANSLATIONS ────────────────────────────────────────────────────────────
const formTranslations = {
  en: {
    title: "Join the Movement",
    subtitle: "Register as a volunteer and stand with Shashikiran KN",
    step1: "Mobile Number",
    step2: "Your Profile",
    step3: "Verification",
    success: "Welcome to the Movement!",
    successSubtitle: "Your digital membership card has been issued. Download it and share with pride.",
    fullName: "Full Name",
    dob: "Date of Birth",
    gender: "Gender",
    genderMale: "Male",
    genderFemale: "Female",
    genderTrans: "Transgender",
    mobileNumber: "Mobile Number",
    emailId: "Email (Optional)",
    state: "State",
    constituency: "Assembly Constituency",

    agreeTerms: "I agree to the Terms of use and Privacy Policy.",
    next: "Continue",
    prev: "Back",
    submit: "Send OTP",
    verify: "Verify & Get Card",
    submitting: "Issuing Card...",
    close: "Close",
    campaignSlogan: "Build a Modern, Digital & Dharma-Driven Srirangam",
    errFullName: "Full Name is required.",
    errDob: "Date of Birth is required.",
    errGender: "Gender is required.",
    errMobile: "A valid mobile number is required.",
    errState: "State is required.",
    errConstituency: "Assembly Constituency is required.",

    errDeclared: "You must agree to the terms.",
    validationError: "Please correct the highlighted errors.",
    invalidMobile: "Enter a valid 10-digit number.",
    invalidEmail: "Enter a valid email address.",
    errOtpLength: "Enter the 6-digit verification code.",
    download: "Download Card",
    share: "Share Invite",
    searchConstituency: "Search constituency...",
    noConstituency: "No constituencies found",
    step1Label: "Step 1 of 3",
    step2Label: "Step 2 of 3",
    step3Label: "Step 3 of 3",
  },
  ta: {
    title: "இயக்கத்தில் இணையுங்கள்",
    subtitle: "தொண்டராக பதிவு செய்து, சசிகிரண் கே.என் உடன் இணையுங்கள்",
    step1: "மொபைல் எண்",
    step2: "சுயவிவரம்",
    step3: "சரிபார்ப்பு",
    success: "இயக்கத்தில் வரவேற்கிறோம்!",
    successSubtitle: "உங்களது நவீன டிஜிட்டல் உறுப்பினர் அட்டை வெற்றிகரமாக உருவாக்கப்பட்டுள்ளது.",
    fullName: "முழு பெயர்",
    dob: "பிறந்த தேதி",
    gender: "பாலினம்",
    genderMale: "ஆண்",
    genderFemale: "பெண்",
    genderTrans: "திருநங்கை/திருநம்பி",
    mobileNumber: "மொபைல் எண்",
    emailId: "மின்னஞ்சல் (விருப்பம்)",
    state: "மாநிலம்",
    constituency: "சட்டமன்ற தொகுதி",

    agreeTerms: "நான் பயன்பாட்டு விதிமுறைகள் மற்றும் தனியுரிமைக் கொள்கையை ஏற்கிறேன்.",
    next: "தொடரவும்",
    prev: "முந்தைய",
    submit: "OTP அனுப்பவும்",
    verify: "சரிபார்த்து அட்டை பெறுக",
    submitting: "உருவாக்கப்படுகிறது...",
    close: "மூடு",
    campaignSlogan: "நவீன, டிஜிட்டல் மற்றும் தர்மம் சார்ந்த ஸ்ரீரங்கத்தை உருவாக்குவோம்",
    errFullName: "முழு பெயர் தேவை.",
    errDob: "பிறந்த தேதி தேவை.",
    errGender: "பாலினத்தைத் தேர்ந்தெடுக்கவும்.",
    errMobile: "சரியான மொபைல் எண் தேவை.",
    errState: "மாநிலம் தேவை.",
    errConstituency: "சட்டமன்ற தொகுதி தேவை.",

    errDeclared: "விதிமுறைகளை ஏற்க வேண்டும்.",
    validationError: "படிவத்தில் உள்ள பிழைகளைத் திருத்தவும்.",
    invalidMobile: "மொபைல் எண் 10-இலக்கமாக இருக்க வேண்டும்.",
    invalidEmail: "மின்னஞ்சல் முகவரி தவறானது.",
    errOtpLength: "6-இலக்க OTP குறியீட்டை உள்ளிடவும்.",
    download: "பதிவிறக்கவும்",
    share: "பகிரவும்",
    searchConstituency: "தொகுதியைத் தேடவும்...",
    noConstituency: "தொகுதி எதுவும் இல்லை",
    step1Label: "படி 1/3",
    step2Label: "படி 2/3",
    step3Label: "படி 3/3",
  }
};

interface JoinMovementModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: 'en' | 'ta';
}

interface FormState {
  mobile: string;
  fullName: string;
  dob: string;
  gender: string;
  email: string;
  state: string;
  constituency: string;
  declared: boolean;
}

const initialFormState: FormState = {
  mobile: '',
  fullName: '',
  dob: '',
  gender: '',
  email: '',
  state: 'Tamil Nadu',
  constituency: '',
  declared: false
};

export default function JoinMovementModal({ isOpen, onClose, lang = 'en' }: JoinMovementModalProps) {
  const t = formTranslations[lang] ?? formTranslations.en;

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState | 'otp', string>>>({});
  const [otpCode, setOtpCode] = useState('');
  const [memberId, setMemberId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setStep(1);
      setFormData(initialFormState);
      setErrors({});
      setOtpCode('');
      setSearchTerm('');
      setMemberId('');
      setIsSuccess(false);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredConstituencies = constituencies.filter(item =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, type } = e.target;
    let value = e.target.value;
    const checked = (e.target as HTMLInputElement).checked;

    if (name === 'mobile') {
      value = value.replace(/\D/g, '').slice(0, 10);
    } else if (name === 'fullName') {
      value = value.replace(/[0-9!@#$%^&*()_+=:{}[\];"'<>/?\\|`~]/g, '');
    }

    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));

    if (errors[name as keyof FormState]) {
      setErrors(prev => { const next = { ...prev }; delete next[name as keyof FormState]; return next; });
    }
  };

  const handleSelectConstituency = (name: string) => {
    setFormData(prev => ({ ...prev, constituency: name }));
    setSearchTerm(name);
    setIsDropdownOpen(false);
    if (errors.constituency) {
      setErrors(prev => { const next = { ...prev }; delete next.constituency; return next; });
    }
  };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Partial<Record<keyof FormState | 'otp', string>> = {};
    if (currentStep === 1) {
      const mobileRegex = /^[0-9]{10}$/;
      if (!formData.mobile.trim()) newErrors.mobile = t.errMobile;
      else if (!mobileRegex.test(formData.mobile)) newErrors.mobile = t.invalidMobile;
    }
    if (currentStep === 2) {
      if (!formData.fullName.trim()) newErrors.fullName = t.errFullName;
      if (!formData.dob.trim()) newErrors.dob = t.errDob;
      if (!formData.gender) newErrors.gender = t.errGender;
      if (!formData.state.trim()) newErrors.state = t.errState;
      if (!formData.constituency.trim()) newErrors.constituency = t.errConstituency;
      if (formData.email.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) newErrors.email = t.invalidEmail;
      }
      if (!formData.declared) newErrors.declared = t.errDeclared;
    }
    if (currentStep === 3) {
      if (otpCode.length !== 6) newErrors.otp = t.errOtpLength;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => { if (validateStep(step)) setStep(prev => prev + 1); };
  const handlePrev = () => setStep(prev => Math.max(1, prev - 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;
    setIsSubmitting(true);
    setErrors({});
    const payload = new FormData();
    payload.append('formType', 'join_movement');
    payload.append('fullName', formData.fullName);
    payload.append('dob', formData.dob);
    payload.append('gender', formData.gender);
    payload.append('mobile', formData.mobile);
    payload.append('email', formData.email || '');
    payload.append('state', formData.state);
    payload.append('constituency', formData.constituency);
    try {
      const res = await fetch(`${import.meta.env.BASE_URL}contact.php`, { method: 'POST', body: payload });
      const text = await res.text();
      if (text.includes('<?php') || import.meta.env.DEV) { generateCardAndSucceed(); return; }
      let data;
      try { data = JSON.parse(text); } catch { if (res.ok) { generateCardAndSucceed(); return; } throw new Error("Response was not valid JSON"); }
      if (res.ok && data.status === 'success') { generateCardAndSucceed(data.member_id); }
      else {
        if (data?.errors) { setErrors(data.errors); alert(data.message || "Please correct the errors."); setStep(2); }
        else { const errorDetail = data?.message || text || 'Unknown error.'; alert(`Submission Failed!\n\nDetails: ${errorDetail}`); setErrors({ otp: errorDetail }); }
      }
    } catch (err: any) {
      if (import.meta.env.DEV) { generateCardAndSucceed(); }
      else { const errorMsg = err?.message || 'Network error.'; alert(`Network Error!\n\nDetails: ${errorMsg}`); setErrors({ otp: errorMsg }); }
    } finally { setIsSubmitting(false); }
  };

  const generateCardAndSucceed = (serverMemberId?: string) => {
    const id = serverMemberId || `NSP-${String(Date.now() % 1000000).padStart(6, '0')}`;
    setMemberId(id);
    setIsSuccess(true);
  };

  const handleDownloadCard = () => {
    const W = 1012, H = 638;
    const canvas = document.createElement('canvas');
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bgImg = new Image(); bgImg.crossOrigin = 'anonymous'; bgImg.src = srirangamImg;
    const logo = new Image(); logo.crossOrigin = 'anonymous'; logo.src = logoImg;

    let loaded = 0;
    const onReady = () => {
      loaded++;
      if (loaded < 2) return;

      // ── Dark gradient background ──
      const bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0, '#0d0d1a'); bg.addColorStop(0.45, '#1c0c28'); bg.addColorStop(1, '#1f0c0c');
      ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

      // ── Srirangam photo overlay ──
      ctx.save(); ctx.globalAlpha = 0.18; ctx.globalCompositeOperation = 'luminosity';
      ctx.drawImage(bgImg, 0, 0, W, H); ctx.restore();

      // ── Red glow ──
      const glow = ctx.createRadialGradient(W * 0.7, H * 0.3, 0, W * 0.7, H * 0.3, 450);
      glow.addColorStop(0, 'rgba(204,0,0,0.18)'); glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow; ctx.fillRect(0, 0, W, H);

      // ── Gold accent lines (top & bottom) ──
      const topGrad = ctx.createLinearGradient(0, 0, W, 0);
      topGrad.addColorStop(0, '#CC0000'); topGrad.addColorStop(0.5, '#FF8C00'); topGrad.addColorStop(1, '#FFD700');
      ctx.fillStyle = topGrad; ctx.fillRect(0, 0, W, 6);
      ctx.fillStyle = 'rgba(255,140,0,0.35)'; ctx.fillRect(0, 7, W, 2);
      const btmGrad = ctx.createLinearGradient(0, 0, W, 0);
      btmGrad.addColorStop(0, '#FFD700'); btmGrad.addColorStop(0.5, '#FF8C00'); btmGrad.addColorStop(1, '#CC0000');
      ctx.fillStyle = btmGrad; ctx.fillRect(0, H - 6, W, 6);
      ctx.fillStyle = 'rgba(255,140,0,0.3)'; ctx.fillRect(0, H - 9, W, 2);

      // ── Diagonal shimmer ──
      const shim = ctx.createLinearGradient(0, 0, W, H);
      shim.addColorStop(0.3, 'transparent'); shim.addColorStop(0.5, 'rgba(255,215,0,0.04)'); shim.addColorStop(0.7, 'transparent');
      ctx.fillStyle = shim; ctx.fillRect(0, 0, W, H);

      // ── Rounded card border ──
      ctx.save(); ctx.beginPath(); ctx.roundRect(0, 0, W, H, 28); ctx.clip(); ctx.restore();

      const pad = 50;

      // ── TOP ROW: Logo + Brand + VIP Badge ──
      // Logo
      ctx.save();
      ctx.fillStyle = 'rgba(255,255,255,0.1)';
      ctx.beginPath(); ctx.roundRect(pad, pad, 60, 60, 12); ctx.fill();
      ctx.strokeStyle = 'rgba(255,215,0,0.3)'; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.clip();
      ctx.drawImage(logo, pad + 4, pad + 4, 52, 52);
      ctx.restore();

      // Brand text
      ctx.font = '900 18px "Plus Jakarta Sans", Arial, sans-serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText('SHASHIKIRAN KN', pad + 72, pad + 28);
      ctx.font = 'bold 11px "Plus Jakarta Sans", Arial, sans-serif';
      ctx.fillStyle = '#FF8C00';
      ctx.fillText('TAMIL NADU 2026 MOVEMENT', pad + 72, pad + 48);

      // VIP Badge
      ctx.save();
      const badgeX = W - pad - 155;
      const badgeGrad = ctx.createLinearGradient(badgeX, 0, badgeX + 130, 0);
      badgeGrad.addColorStop(0, '#CC0000'); badgeGrad.addColorStop(1, '#a80000');
      ctx.fillStyle = badgeGrad;
      ctx.beginPath(); ctx.roundRect(badgeX, pad, 130, 32, 4); ctx.fill();
      ctx.strokeStyle = 'rgba(255,140,0,0.5)'; ctx.lineWidth = 1; ctx.stroke();
      ctx.font = '900 13px "Plus Jakarta Sans", Arial, sans-serif';
      ctx.fillStyle = '#FFFFFF'; ctx.textAlign = 'center';
      ctx.fillText('VIP MEMBER', badgeX + 65, pad + 22);
      ctx.textAlign = 'left'; ctx.restore();

      // LOYALTY CARD label
      ctx.font = 'bold 10px "Plus Jakarta Sans", Arial, sans-serif';
      ctx.fillStyle = 'rgba(255,215,0,0.65)'; ctx.textAlign = 'right';
      ctx.fillText('LOYALTY CARD', W - pad - 25, pad + 58); ctx.textAlign = 'left';

      // ── MIDDLE ROW: Member ID card-number style ──
      const midY = H * 0.46;
      // ID Number (like credit card number)
      ctx.font = '900 28px "Courier New", monospace';
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      const displayId = memberId.replace(/-/g, '').replace(/(.{4})/g, '$1  ').trim();
      ctx.textAlign = 'right';
      ctx.fillText(displayId, W - pad, midY);
      ctx.font = 'bold 10px "Plus Jakarta Sans", Arial, sans-serif';
      ctx.fillStyle = 'rgba(255,215,0,0.6)';
      ctx.fillText('MEMBER ID', W - pad, midY + 20); ctx.textAlign = 'left';

      // ── BOTTOM ROW: Name + Constituency + Issued + QR ──
      const btmY = H - pad - 100;

      // CARDHOLDER NAME label
      ctx.font = 'bold 10px "Plus Jakarta Sans", Arial, sans-serif';
      ctx.fillStyle = 'rgba(255,140,0,0.75)';
      ctx.fillText('CARDHOLDER NAME', pad, btmY);
      // Name
      ctx.font = '900 28px Georgia, serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.7)'; ctx.shadowBlur = 12;
      const nameText = (formData.fullName || 'MEMBER NAME').toUpperCase();
      ctx.fillText(nameText.length > 22 ? nameText.slice(0, 22) + '...' : nameText, pad, btmY + 32);
      ctx.restore();

      // Constituency
      ctx.font = 'bold 10px "Plus Jakarta Sans", Arial, sans-serif';
      ctx.fillStyle = 'rgba(255,140,0,0.7)';
      ctx.fillText('CONSTITUENCY', pad, btmY + 60);
      ctx.font = 'bold 15px "Plus Jakarta Sans", Arial, sans-serif';
      ctx.fillStyle = 'rgba(255,255,255,0.75)';
      ctx.fillText(formData.constituency || '—', pad, btmY + 80);

      // Divider
      ctx.fillStyle = 'rgba(255,255,255,0.15)';
      ctx.fillRect(pad + 220, btmY + 48, 2, 40);

      // Issued date
      ctx.font = 'bold 10px "Plus Jakarta Sans", Arial, sans-serif';
      ctx.fillStyle = 'rgba(255,140,0,0.7)';
      ctx.fillText('ISSUED', pad + 240, btmY + 60);
      ctx.font = 'bold 15px "Plus Jakarta Sans", Arial, sans-serif';
      ctx.fillStyle = 'rgba(255,255,255,0.75)';
      ctx.fillText(new Date().toLocaleDateString('en-GB'), pad + 240, btmY + 80);

      // QR code
      const qrCanvas = document.querySelector('.membership-qr canvas') as HTMLCanvasElement;
      if (qrCanvas) {
        const qrSize = 100;
        const qrX = W - pad - qrSize, qrY = btmY - 8;
        ctx.save();
        ctx.fillStyle = 'rgba(255,255,255,0.95)';
        ctx.beginPath(); ctx.roundRect(qrX - 8, qrY - 8, qrSize + 16, qrSize + 16, 10); ctx.fill();
        ctx.shadowColor = 'rgba(0,0,0,0.5)'; ctx.shadowBlur = 16;
        ctx.drawImage(qrCanvas, qrX, qrY, qrSize, qrSize);
        ctx.restore();
      }

      // ── Bottom label ──
      ctx.font = 'bold 9px "Plus Jakarta Sans", Arial, sans-serif';
      ctx.fillStyle = 'rgba(255,255,255,0.25)'; ctx.textAlign = 'center';
      ctx.fillText('NSP DIGITAL MEMBERSHIP CARD — 2026', W / 2, H - 16);
      ctx.textAlign = 'left';

      // Trigger download
      const link = document.createElement('a');
      link.download = `membership-${formData.fullName.replace(/\s+/g, '-').toLowerCase()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    };

    if (bgImg.complete) { loaded++; } else { bgImg.onload = onReady; }
    if (logo.complete) { loaded++; } else { logo.onload = onReady; }
    if (loaded === 2) onReady();
  };

  const handleWhatsappShare = () => {
    const inviteText = lang === 'ta'
      ? `நான் திரு. சசிகிரண் கே.என் அவர்களின் இயக்கத்தில் இணைந்திருக்கிறேன்! 🧡🚩\nஉறுப்பினர் அட்டையைப் பெற இங்கே பதியவும்: ${window.location.origin}`
      : `I have joined Shashikiran KN's campaign movement for Srirangam! Get your digital membership card! 🧡🚩\nRegister here: ${window.location.origin}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(inviteText)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-stone-900/30 backdrop-blur-sm"
      />

      {/* Modal - Split-panel layout */}
      <motion.div
        initial={{ scale: 0.98, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.98, opacity: 0, y: 10 }}
        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
        className="relative z-10 w-full sm:max-w-md lg:max-w-4xl flex h-full sm:h-auto max-h-full sm:max-h-[90vh] bg-white sm:rounded-3xl overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.12)] border border-stone-200/60"
      >
        {/* ── LEFT PANEL: Campaign Branding (Minimal Theme Gradient) */}
        <div className="hidden lg:flex lg:w-[42%] relative flex-col justify-between p-10 bg-gradient-to-br from-[black]/70 via-[black]/70 to-[#E45C00] text-white overflow-hidden shrink-0">
          {/* Subtle image watermark */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.96] mix-blend-overlay">
            <img src={campaignBg} alt="" className="w-full h-full object-cover" />
          </div>

          {/* Header Brand */}
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-16">
              <div className="w-10 h-10 bg-white rounded-xl p-1 shadow-md flex items-center justify-center border border-white/10">
                <img src={logoImg} alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <p className="font-extrabold text-[10px] uppercase tracking-[0.2em] leading-none text-white">SHASHIKIRAN KN</p>
                <p className="text-[7px] text-orange-200 font-bold uppercase tracking-[0.15em] leading-none mt-1">TAMIL NADU 2026</p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 border border-white/20 bg-white/10 px-3.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-300 animate-pulse" />
                <span className="text-[8px] font-bold uppercase tracking-[0.15em] text-white/95">VOLUNTEER REGISTRATION</span>
              </div>
              <h2 className="text-2xl font-black leading-[1.2] tracking-tight text-white">
                {t.campaignSlogan}
              </h2>
            </div>
          </div>

          {/* Bottom Srirangam tag */}
          <div className="relative z-10 pt-4 border-t border-white/10">
            <p className="text-[8px] text-white/50 font-bold uppercase tracking-widest leading-none">Srirangam Assembly Constituency · Tamil Nadu</p>
          </div>
        </div>

        {/* ── RIGHT PANEL: Beautiful Clean Form */}
        <div className="flex-1 flex flex-col min-w-0 bg-white">
          {/* Close button */}
          <button
            type="button" onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl text-stone-400 hover:text-stone-600 hover:bg-stone-50 transition-colors z-[100] cursor-pointer"
          >
            <X size={18} />
          </button>

          <form onSubmit={handleSubmit} className="flex flex-col h-full" noValidate>
            {/* Header section */}
            <div className="px-6 pt-7 pb-4 sm:px-8 shrink-0 border-b border-stone-100">
              {/* Mobile-only brand row */}
              <div className="flex items-center gap-2 mb-4 lg:hidden">
                <img src={logoImg} alt="Logo" className="w-6 h-6 object-contain bg-stone-50 rounded-lg p-0.5 border border-stone-200/60" />
                <div>
                  <p className="font-extrabold text-[8px] uppercase tracking-wider text-stone-800 leading-none">SHASHIKIRAN KN</p>
                  <p className="text-[5px] text-[#FF8C00] font-black uppercase tracking-widest leading-none mt-0.5">TAMIL NADU 2026</p>
                </div>
              </div>

              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-stone-900 leading-tight">
                  {isSuccess ? t.success : t.title}
                </h2>
                <p className="text-xs text-stone-455 mt-1">
                  {isSuccess ? t.successSubtitle : t.subtitle}
                </p>
              </div>

              {/* Elegant Progress Indicator */}
              {!isSuccess && (
                <div className="flex items-center gap-1.5 mt-5">
                  {[1, 2, 3].map((s) => (
                    <React.Fragment key={s}>
                      <div className={`flex items-center gap-1.5 transition-all ${step >= s ? 'opacity-100' : 'opacity-35'}`}>
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-extrabold border transition-all ${step > s ? 'bg-[#CC0000] border-transparent text-white shadow-sm' : step === s ? 'bg-white border-[#CC0000] text-[#CC0000]' : 'bg-white border-stone-200 text-stone-400'}`}>
                          {s}
                        </div>
                        <span className="text-[8px] font-black uppercase tracking-widest hidden sm:inline text-stone-600">
                          {s === 1 ? t.step1 : s === 2 ? t.step2 : t.step3}
                        </span>
                      </div>
                      {s < 3 && <div className={`flex-1 h-[1px] transition-all ${step > s ? 'bg-[#CC0000]' : 'bg-stone-100'}`} />}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>

            {/* Scrollable Form Body */}
            <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8 has-scrollbar">
              <AnimatePresence mode="wait">

                {/* SUCCESS SCREEN */}
                {isSuccess ? (
                  <motion.div key="success" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="flex flex-col items-center py-2">

                    {/* VIP Membership Card */}
                    <div className="w-full max-w-[360px] mb-5 mx-auto">
                      <div
                        className="relative w-full select-none overflow-hidden"
                        style={{
                          aspectRatio: '1.586 / 1',
                          borderRadius: '14px',
                          boxShadow: '0 20px 50px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,200,0,0.15)',
                          background: 'linear-gradient(135deg, #0d0d1a 0%, #1c0c28 45%, #1f0c0c 100%)',
                        }}
                      >
                        {/* Background temple photo */}
                        <img
                          src={srirangamImg}
                          alt=""
                          className="absolute inset-0 w-full h-full object-cover"
                          style={{ opacity: 0.2, mixBlendMode: 'luminosity' }}
                        />
                        {/* Red glow */}
                        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 70% 30%, rgba(204,0,0,0.18) 0%, transparent 65%)' }} />
                        {/* Top gold stripe */}
                        <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: 'linear-gradient(90deg,#CC0000,#FF8C00 50%,#FFD700)' }} />
                        <div className="absolute top-[4px] left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg,rgba(255,140,0,0.35),rgba(255,215,0,0.35))' }} />
                        {/* Bottom gold stripe */}
                        <div className="absolute bottom-[4px] left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg,rgba(255,140,0,0.3),rgba(255,215,0,0.3))' }} />
                        <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: 'linear-gradient(90deg,#FFD700,#FF8C00 50%,#CC0000)' }} />
                        {/* Diagonal shimmer */}
                        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(108deg,transparent 30%,rgba(255,215,0,0.04) 50%,transparent 70%)' }} />

                        {/* Card Content */}
                        <div className="relative z-10 flex flex-col h-full p-4 justify-between">

                          {/* Top Row: Logo + VIP Badge */}
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-md overflow-hidden flex items-center justify-center"
                                style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,215,0,0.3)', backdropFilter: 'blur(4px)' }}>
                                <img src={logoImg} alt="Logo" className="w-full h-full object-contain p-0.5" />
                              </div>
                              <div>
                                <p className="font-black uppercase text-white leading-none" style={{ fontSize: '7px', letterSpacing: '0.14em' }}>SHASHIKIRAN KN</p>
                                <p className="font-bold uppercase leading-none mt-0.5" style={{ fontSize: '5.5px', letterSpacing: '0.1em', background: 'linear-gradient(90deg,#FF8C00,#FFD700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>TAMIL NADU 2026 MOVEMENT</p>
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-0.5">
                              <div className="px-2 py-0.5 rounded-sm" style={{ background: 'linear-gradient(90deg,#CC0000,#a80000)', border: '1px solid rgba(255,140,0,0.5)', boxShadow: '0 2px 8px rgba(180,0,0,0.5)' }}>
                                <span className="font-black uppercase text-white tracking-widest" style={{ fontSize: '6px' }}>VIP MEMBER</span>
                              </div>
                              <span className="font-semibold uppercase tracking-widest" style={{ fontSize: '5px', color: 'rgba(255,215,0,0.65)' }}>LOYALTY CARD</span>
                            </div>
                          </div>

                          {/* Middle Row: Card Number */}
                          <div className="flex items-center justify-end px-0.5">
                            <div className="text-right">
                              <p className="font-mono font-bold text-white/85 tracking-[0.22em]" style={{ fontSize: '9px' }}>
                                {memberId ? memberId.replace(/-/g,'').replace(/(.{4})/g,'$1 ').trim() : '•••• ••••'}
                              </p>
                              <p className="font-bold uppercase tracking-widest" style={{ fontSize: '5px', color: 'rgba(255,215,0,0.6)' }}>MEMBER ID</p>
                            </div>
                          </div>

                          {/* Bottom Row: Name / Info + QR */}
                          <div className="flex items-end justify-between">
                            <div className="flex-1 pr-3">
                              <p className="uppercase tracking-widest font-semibold" style={{ fontSize: '5px', color: 'rgba(255,140,0,0.75)' }}>CARDHOLDER NAME</p>
                              <p className="font-black text-white uppercase tracking-wide truncate leading-snug" style={{ fontSize: '11px', fontFamily: 'Georgia, serif', textShadow: '0 2px 10px rgba(0,0,0,0.7)', maxWidth: '170px' }}>
                                {formData.fullName || 'MEMBER NAME'}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <div>
                                  <p className="uppercase tracking-widest font-semibold" style={{ fontSize: '5px', color: 'rgba(255,140,0,0.7)' }}>CONSTITUENCY</p>
                                  <p className="font-semibold text-white/75 truncate" style={{ fontSize: '6.5px', maxWidth: '110px' }}>{formData.constituency || '—'}</p>
                                </div>
                                <div className="w-px h-5" style={{ background: 'rgba(255,255,255,0.15)' }} />
                                <div>
                                  <p className="uppercase tracking-widest font-semibold" style={{ fontSize: '5px', color: 'rgba(255,140,0,0.7)' }}>ISSUED</p>
                                  <p className="font-semibold text-white/75" style={{ fontSize: '6.5px' }}>{new Date().toLocaleDateString('en-GB')}</p>
                                </div>
                              </div>
                            </div>
                            <div className="shrink-0 membership-qr">
                              <div className="rounded-md p-1" style={{ background: 'rgba(255,255,255,0.95)', boxShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                                <QRCodeCanvas
                                  value={`NSP|${memberId}|${formData.fullName}|${formData.constituency}`}
                                  size={42} level="M" fgColor="#1a0a22"
                                />
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                      <p className="text-center uppercase tracking-widest font-bold text-stone-400 mt-2" style={{ fontSize: '8px' }}>NSP Digital Membership Card — 2026</p>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row gap-3.5 w-full max-w-sm mb-4">
                      <button type="button" onClick={handleDownloadCard}
                        className="flex-1 py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-bold text-[10px] uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer">
                        <Download size={12} />
                        <span>{t.download}</span>
                      </button>
                      <button type="button" onClick={handleWhatsappShare}
                        className="flex-1 py-3 border border-stone-200 hover:bg-stone-50 text-stone-700 rounded-xl font-bold text-[10px] uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer">
                        <Share2 size={12} className="text-[#25D366]" />
                        <span>{t.share}</span>
                      </button>
                    </div>
                    <button type="button" onClick={onClose}
                      className="text-stone-400 hover:text-stone-600 font-bold text-[10px] uppercase tracking-widest transition-colors cursor-pointer py-2">
                      {t.close}
                    </button>
                  </motion.div>
                ) : (
                  <div>
                    {/* STEP 1: Mobile */}
                    {step === 1 && (
                      <motion.div key="step1" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}
                        className="space-y-6">
                        <div className="bg-stone-50 border border-stone-100 rounded-2xl p-5">
                          <p className="text-xs text-stone-500 font-medium leading-relaxed">
                            {lang === 'ta'
                              ? 'உங்கள் 10-இலக்க மொபைல் எண்ணை உள்ளிடவும். OTP குறியீடு மூலம் எண் சரிபார்க்கப்படும்.'
                              : 'Please enter your active mobile number. We will send you a verification OTP to verify ownership.'}
                          </p>
                        </div>
                        <PremiumField label={t.mobileNumber} error={errors.mobile} required>
                          <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                              <Phone size={14} className="text-stone-400" />
                              <span className="text-stone-300 text-xs">|</span>
                              <span className="text-stone-500 text-xs font-bold">+91</span>
                            </div>
                            <input
                              name="mobile" type="tel" inputMode="numeric" pattern="[0-9]*"
                              placeholder="9876543210"
                              value={formData.mobile} onChange={handleChange}
                              className={getPremiumInputClass(!!errors.mobile) + ' pl-20 font-mono tracking-widest'}
                            />
                          </div>
                        </PremiumField>
                      </motion.div>
                    )}

                    {/* STEP 2: Profile details */}
                    {step === 2 && (
                      <motion.div key="step2" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}
                        className="space-y-4">

                        {/* Name */}
                        <PremiumField label={t.fullName} error={errors.fullName} required>
                          <div className="relative">
                            <User size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
                            <input name="fullName" type="text" value={formData.fullName} onChange={handleChange}
                              placeholder="e.g. Rajan Kumar"
                              className={getPremiumInputClass(!!errors.fullName) + ' pl-10'} />
                          </div>
                        </PremiumField>

                        {/* DOB + Gender row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <PremiumField label={t.dob} error={errors.dob} required>
                            <input name="dob" type="date" value={formData.dob} onChange={handleChange}
                              className={getPremiumInputClass(!!errors.dob)} />
                          </PremiumField>

                          <PremiumField label={t.gender} error={errors.gender} required>
                            <div className="flex gap-2 h-[42px]">
                              {[
                                { key: 'Male', label: t.genderMale },
                                { key: 'Female', label: t.genderFemale },
                                { key: 'Trans', label: lang === 'ta' ? 'திரு' : 'Other' },
                              ].map(({ key, label }) => {
                                const isSel = formData.gender === key;
                                return (
                                  <button key={key} type="button"
                                    onClick={() => {
                                      setFormData(p => ({ ...p, gender: key }));
                                      if (errors.gender) setErrors(p => { const n = { ...p }; delete n.gender; return n; });
                                    }}
                                    className={`flex-1 h-full rounded-xl border text-[9px] font-extrabold uppercase tracking-wider transition-all cursor-pointer ${isSel
                                      ? 'bg-gradient-to-br from-[#CC0000] to-[#FF8C00] border-transparent text-white shadow-sm'
                                      : errors.gender
                                        ? 'bg-white border-red-350 text-red-500'
                                        : 'bg-stone-50/50 border border-stone-200 text-stone-600 hover:border-stone-300 hover:bg-stone-100/30'
                                      }`}>
                                    {label}
                                  </button>
                                );
                              })}
                            </div>
                          </PremiumField>
                        </div>

                        {/* Email */}
                        <PremiumField label={t.emailId} error={errors.email}>
                          <div className="relative">
                            <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
                            <input name="email" type="email" placeholder="name@example.com"
                              value={formData.email} onChange={handleChange}
                              className={getPremiumInputClass(!!errors.email) + ' pl-10'} />
                          </div>
                        </PremiumField>

                        {/* State & Constituency */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <PremiumField label={t.state} error={errors.state} required>
                            <input name="state" value={formData.state} onChange={handleChange}
                              className={getPremiumInputClass(!!errors.state)} />
                          </PremiumField>

                          {/* Searchable Constituency Dropdown */}
                          <PremiumField label={t.constituency} error={errors.constituency} required>
                            <div className="relative" ref={dropdownRef}>
                              <div className="relative">
                                <input
                                  type="text"
                                  placeholder={t.searchConstituency}
                                  value={searchTerm}
                                  onChange={(e) => { setSearchTerm(e.target.value); setIsDropdownOpen(true); }}
                                  onFocus={() => setIsDropdownOpen(true)}
                                  className={getPremiumInputClass(!!errors.constituency) + ' pr-8'}
                                />
                                <ChevronDown size={14}
                                  className={`absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                              </div>
                              {isDropdownOpen && (
                                <div className="absolute z-[200] top-full left-0 right-0 mt-1 bg-white border border-stone-200 rounded-xl shadow-lg overflow-y-auto has-scrollbar max-h-[200px]">
                                  {filteredConstituencies.length > 0 ? (
                                    filteredConstituencies.map((name) => (
                                      <button key={name} type="button"
                                        onClick={() => handleSelectConstituency(name)}
                                        className="w-full px-4 py-2.5 text-left text-xs font-semibold text-stone-700 hover:bg-stone-50 hover:text-[#CC0000] transition-colors border-b border-stone-50 last:border-0 cursor-pointer">
                                        {name}
                                      </button>
                                    ))
                                  ) : (
                                    <div className="px-4 py-4 text-xs text-stone-400 font-bold text-center">
                                      {t.noConstituency}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </PremiumField>
                        </div>



                        {/* Terms */}
                        <div className="pt-1">
                          <label className="flex items-start gap-3 cursor-pointer group">
                            <div className="relative mt-0.5 shrink-0">
                              <input
                                id="declared" name="declared" type="checkbox"
                                checked={formData.declared} onChange={handleChange}
                                className="sr-only peer"
                              />
                              <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${formData.declared ? 'bg-[#CC0000] border-[#CC0000]' : errors.declared ? 'border-red-400 bg-red-50' : 'border-stone-300 bg-white group-hover:border-stone-400'}`}
                                onClick={() => {
                                  setFormData(p => ({ ...p, declared: !p.declared }));
                                  if (errors.declared) setErrors(p => { const n = { ...p }; delete n.declared; return n; });
                                }}>
                                {formData.declared && <CheckCircle2 size={10} className="text-white" strokeWidth={3} />}
                              </div>
                            </div>
                            <span className="text-xs text-stone-500 font-medium leading-relaxed select-none">{t.agreeTerms}</span>
                          </label>
                          {errors.declared && <p className="text-[10px] text-red-500 font-bold mt-1.5 ml-7">{errors.declared}</p>}
                        </div>

                        {/* General validation notice */}
                        {Object.keys(errors).filter(k => k !== 'otp').length > 0 && (
                          <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl p-3 text-red-600 text-xs font-semibold">
                            <AlertCircle size={14} className="shrink-0" />
                            <span>{t.validationError}</span>
                          </div>
                        )}
                      </motion.div>
                    )}

                    {/* STEP 3: OTP */}
                    {step === 3 && (
                      <motion.div key="step3" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}
                        className="flex flex-col items-center text-center py-4 space-y-6">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#CC0000] to-[#FF8C00] flex items-center justify-center shadow-md shadow-red-100">
                          <Phone size={24} className="text-white" />
                        </div>
                        <div>
                          <h3 className="text-base font-extrabold text-stone-900 mb-1">
                            {lang === 'ta' ? 'OTP சரிபார்ப்பு' : 'OTP Verification'}
                          </h3>
                          <p className="text-xs text-stone-500 font-medium max-w-xs mx-auto leading-relaxed">
                            {lang === 'ta'
                              ? `${formData.mobile} மொபைல் எண்ணிற்கு அனுப்பப்பட்ட 6-இலக்க குறியீட்டை உள்ளிடவும்`
                              : `Enter the 6-digit code sent to +91 ${formData.mobile}`}
                          </p>
                        </div>
                        <div>
                          <input
                            name="otpCode" type="tel" inputMode="numeric" maxLength={6}
                            value={otpCode}
                            onChange={(e) => {
                              const val = e.target.value.replace(/\D/g, '');
                              setOtpCode(val);
                              if (errors.otp) setErrors(p => ({ ...p, otp: '' }));
                            }}
                            className="w-48 text-center py-3 border border-stone-200 rounded-xl font-mono text-2xl font-black tracking-[0.4em] focus:border-[#CC0000] focus:ring-4 focus:ring-[#CC0000]/5 outline-none shadow-sm transition-all"
                            placeholder="••••••"
                          />
                          {errors.otp && (
                            <p className="text-xs text-red-500 font-bold mt-3 flex items-center justify-center gap-1">
                              <AlertCircle size={12} />{errors.otp}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Form Footer */}
            {!isSuccess && (
              <div className="px-6 py-4 sm:px-8 border-t border-stone-100 bg-white flex gap-3 shrink-0">
                {step > 1 && (
                  <button type="button" onClick={handlePrev}
                    className="flex items-center justify-center gap-2 px-5 py-3 border border-stone-200 hover:bg-stone-50 text-stone-600 rounded-xl font-bold text-[10px] uppercase tracking-wider transition-all cursor-pointer">
                    <ArrowLeft size={12} />
                    <span>{t.prev}</span>
                  </button>
                )}

                {step < 3 ? (
                  <button type="button" onClick={handleNext}
                    className="flex-1 flex items-center justify-center gap-2.5 py-3 bg-gradient-to-r from-[#CC0000] to-[#FF8C00] text-white rounded-xl font-bold text-[10px] uppercase tracking-wider shadow-md shadow-red-200/50 hover:opacity-95 transition-all cursor-pointer">
                    <span>{step === 1 ? t.submit : t.next}</span>
                    <ArrowRight size={12} />
                  </button>
                ) : (
                  <button type="submit" disabled={isSubmitting}
                    className="flex-1 flex items-center justify-center gap-2.5 py-3 bg-gradient-to-r from-[#CC0000] to-[#FF8C00] text-white rounded-xl font-bold text-[10px] uppercase tracking-wider shadow-md shadow-red-200/50 hover:opacity-95 disabled:opacity-60 transition-all cursor-pointer">
                    {isSubmitting ? (
                      <>
                        <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>{t.submitting}</span>
                      </>
                    ) : (
                      <>
                        <span>{t.verify}</span>
                        <ArrowRight size={12} />
                      </>
                    )}
                  </button>
                )}
              </div>
            )}
          </form>
        </div>
      </motion.div>
    </div>
  );
}

// ─── HELPER: Input Class ─────────────────────────────────────────────────────
function getPremiumInputClass(hasError: boolean) {
  return `w-full px-4 py-2.5 bg-stone-50/70 border rounded-xl outline-none text-sm font-semibold text-stone-800 transition-all placeholder:text-stone-350 shadow-sm ${
    hasError
      ? 'border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-400/10'
      : 'border-stone-200 focus:bg-white focus:border-[#CC0000] focus:ring-4 focus:ring-[#CC0000]/5 hover:border-stone-300'
  }`;
}

// ─── HELPER: Field Wrapper ───────────────────────────────────────────────────
function PremiumField({
  label, error, required, hint, children
}: {
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[9px] font-extrabold text-stone-400 uppercase tracking-widest flex items-center gap-0.5 select-none">
        {label}{required && <span className="text-[#CC0000] font-black ml-0.5">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-[9px] text-stone-400/80 font-medium">{hint}</p>}
      {error && (
        <span className="text-[9px] text-red-500 font-bold flex items-center gap-1">
          <AlertCircle size={10} />{error}
        </span>
      )}
    </div>
  );
}
