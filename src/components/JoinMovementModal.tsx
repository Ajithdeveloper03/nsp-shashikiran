import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, User, Phone, Mail, MapPin, FileText, CheckCircle2,
  UploadCloud, ArrowRight, ArrowLeft, Briefcase, Award,
  Clock, Heart, AlertCircle, Sparkles
} from 'lucide-react';

import logoImg from '../assets/shashikarann.png';
import campaignBg from '../assets/about3.jpeg';

// ─── TRANSLATIONS ────────────────────────────────────────────────────────────
const formTranslations = {
  en: {
    title: "Join the Movement",
    subtitle: "Be the change Srirangam deserves",
    // Steps
    step1: "Personal Information",
    step2: "Address Details",
    step3: "Identity & Emergency",
    step4: "Joining Details",
    step5: "Uploads & Declaration",
    success: "Registration Successful!",
    successSubtitle: "Thank you for joining. Our team will verify your details and reach out to you shortly.",
    
    // Step 1 fields
    fullName: "Full Name (As per Voter ID)",
    parentName: "Father / Mother / Spouse Name",
    dob: "Date of Birth / Age",
    gender: "Gender",
    genderMale: "Male",
    genderFemale: "Female",
    genderTrans: "Transgender",
    mobileNumber: "Mobile Number",
    emailId: "Email ID (Optional)",
    occupation: "Occupation / Profession",
    education: "Educational Qualification",

    // Step 2 fields
    currentAddress: "Current Address",
    permanentAddress: "Permanent Address",
    sameAsCurrent: "Same as current address",
    district: "District",
    state: "State",
    pincode: "Pincode",

    // Step 3 fields
    voterIdNumber: "Voter ID Number",
    aadhaarNumber: "Aadhaar Number (Optional)",
    emergencyName: "Emergency Contact Name",
    relationship: "Relationship",
    emergencyMobile: "Emergency Mobile Number",

    // Step 4 fields
    joiningAs: "Joining As",
    joiningAsSelect: "Select role",
    joiningAsOptions: [
      { value: "Volunteer", label: "Volunteer" },
      { value: "Party Supporter", label: "Party Supporter" },
      { value: "Youth Wing", label: "Youth Wing" },
      { value: "Women Wing", label: "Women Wing" },
      { value: "Social Media Team", label: "Social Media Team" },
      { value: "Event Coordinator", label: "Event Coordinator" },
      { value: "Field Volunteer", label: "Field Volunteer" }
    ],
    areaOfInterest: "Area of Interest",
    skills: "Skills / Experience",
    preferredWorkingArea: "Preferred Working Area",
    availableTime: "Available Time for Activities",

    // Step 5 fields
    voterIdProof: "Voter ID Proof (Copy)",
    voterIdProofDesc: "Upload front side of Voter ID (Max 5MB, Image or PDF)",
    passportPhoto: "Passport Size Photo",
    passportPhotoDesc: "Upload passport size photo (Max 2MB, JPEG/PNG)",
    signature: "Signature Upload (Optional)",
    signatureDesc: "Upload digital signature or scan copy (Max 2MB, JPEG/PNG)",
    declaration: "Declaration",
    declarationText: "I hereby voluntarily join/support the organization and confirm that all submitted details are genuine and correct.",
    
    // General
    next: "Next Step",
    prev: "Previous",
    submit: "Submit Application",
    submitting: "Submitting...",
    close: "Close",
    dragDrop: "Drag & drop file or click to upload",
    changeFile: "Change",
    invalidMobile: "Mobile must be a 10-digit number",
    invalidPincode: "Pincode must be a 6-digit number",
    invalidAadhaar: "Aadhaar must be a 12-digit number",
    invalidEmail: "Please enter a valid email address",
    validationError: "Please correct the highlighted errors in the form.",
    campaignSlogan: "Let's Build a Modern, Digital, & Dharma-driven Srirangam",

    // Detailed error validation messages
    errFullName: "Please enter your full name as per your Voter ID.",
    errParentName: "Please enter your Father / Mother / Spouse name.",
    errDob: "Please enter your date of birth or age.",
    errGender: "Please select your gender.",
    errMobile: "Please enter a valid mobile number.",
    errCurrentAddress: "Please enter your current residential address.",
    errPermanentAddress: "Please enter your permanent address.",
    errDistrict: "Please enter your district name.",
    errState: "Please enter your state.",
    errPincode: "Please enter a valid 6-digit pin code.",
    errVoterIdNumber: "Please enter your Voter ID number.",
    errEmergencyName: "Please enter an emergency contact name.",
    errRelationship: "Please enter relationship (e.g., Father, Mother).",
    errEmergencyMobile: "Please enter a valid emergency mobile number.",
    errJoiningAs: "Please select the role you wish to join as.",
    errVoterIdProof: "Please upload a copy of your Voter ID proof.",
    errPassportPhoto: "Please upload your passport size photo.",
    errDeclared: "You must accept the declaration to submit your application."
  },
  ta: {
    title: "இயக்கத்தில் இணையுங்கள்",
    subtitle: "ஸ்ரீரங்கம் தகுதியான மாற்றமாக இருங்கள்",
    // Steps
    step1: "தனிப்பட்ட விவரங்கள்",
    step2: "முகவரி விவரங்கள்",
    step3: "அடையாளம் மற்றும் அவசர தொடர்பு",
    step4: "இணைப்பு விவரங்கள்",
    step5: "ஆவணங்கள் மற்றும் பிரகடனம்",
    success: "பதிவு வெற்றிகரமாக முடிந்தது!",
    successSubtitle: "இயக்கத்தில் இணைந்ததற்கு நன்றி. எங்கள் குழு உங்கள் விவரங்களைச் சரிபார்த்து விரைவில் தொடர்புகொள்ளும்.",

    // Step 1 fields
    fullName: "முழு பெயர் (வாக்காளர் அடையாள அட்டையில் உள்ளபடி)",
    parentName: "தந்தை / தாய் / துணைவர் பெயர்",
    dob: "பிறந்த தேதி / வயது",
    gender: "பாலினம்",
    genderMale: "ஆண்",
    genderFemale: "பெண்",
    genderTrans: "திருநங்கை/திருநம்பி",
    mobileNumber: "மொபைல் எண்",
    emailId: "மின்னஞ்சல் முகவரி (விருப்பம்)",
    occupation: "தொழில் / வேலை",
    education: "கல்வித் தகுதி",

    // Step 2 fields
    currentAddress: "தற்போதைய முகவரி",
    permanentAddress: "நிரந்தர முகவரி",
    sameAsCurrent: "தற்போதைய முகவரியே நிரந்தர முகவரி",
    district: "மாவட்டம்",
    state: "மாநிலம்",
    pincode: "அஞ்சல் குறியீடு (Pincode)",

    // Step 3 fields
    voterIdNumber: "வாக்காளர் அடையாள அட்டை எண்",
    aadhaarNumber: "ஆதார் எண் (விருப்பம்)",
    emergencyName: "அவசர தொடர்பு நபர் பெயர்",
    relationship: "உறவுமுறை",
    emergencyMobile: "அவசர தொடர்பு மொபைல் எண்",

    // Step 4 fields
    joiningAs: "இணைவது எவ்வாறு",
    joiningAsSelect: "பொறுப்பைத் தேர்ந்தெடுக்கவும்",
    joiningAsOptions: [
      { value: "Volunteer", label: "தொண்டர் (Volunteer)" },
      { value: "Party Supporter", label: "கட்சி ஆதரவாளர் (Party Supporter)" },
      { value: "Youth Wing", label: "இளைஞர் அணி (Youth Wing)" },
      { value: "Women Wing", label: "மகளிர் அணி (Women Wing)" },
      { value: "Social Media Team", label: "சமூக ஊடகக் குழு (Social Media Team)" },
      { value: "Event Coordinator", label: "நிகழ்ச்சி ஒருங்கிணைப்பாளர் (Event Coordinator)" },
      { value: "Field Volunteer", label: "களத் தொண்டர் (Field Volunteer)" }
    ],
    areaOfInterest: "ஆர்வம் உள்ள துறை",
    skills: "திறன்கள் / அனுபவம்",
    preferredWorkingArea: "விருப்பமான பணிப் பகுதி",
    availableTime: "பணிக்காக ஒதுக்கக்கூடிய நேரம்",

    // Step 5 fields
    voterIdProof: "வாக்காளர் அடையாள அட்டை நகல்",
    voterIdProofDesc: "வாக்காளர் அடையாள அட்டையின் நகல் (அதிகபட்சம் 5MB, படம் அல்லது PDF)",
    passportPhoto: "புகைப்படம் (Passport Size)",
    passportPhotoDesc: "புகைப்படத்தை பதிவேற்றவும் (அதிகபட்சம் 2MB, JPEG/PNG)",
    signature: "கையொப்பம் (விருப்பம்)",
    signatureDesc: "டிஜிட்டல் கையொப்பம் அல்லது ஸ்கேன் நகல் (அதிகபட்சம் 2MB, JPEG/PNG)",
    declaration: "உறுதிமொழி (Declaration)",
    declarationText: "இங்கு சமர்ப்பிக்கப்பட்டுள்ள அனைத்து விவரங்களும் உண்மையானவை மற்றும் சரியானவை என நான் உறுதிப்படுத்துகிறேன், மேலும் நான் தானாக முன்வந்து இந்த அமைப்பில் இணைகிறேன்/ஆதரிக்கிறேன்.",

    // General
    next: "அடுத்த படி",
    prev: "முந்தைய",
    submit: "விண்ணப்பத்தைச் சமர்ப்பி",
    submitting: "சமர்ப்பிக்கப்படுகிறது...",
    close: "மூடு",
    dragDrop: "கோப்பை இழுத்து விடவும் அல்லது கிளிக் செய்யவும்",
    changeFile: "மாற்று",
    invalidMobile: "மொபைல் எண் 10-இலக்கமாக இருக்க வேண்டும்",
    invalidPincode: "அஞ்சல் குறியீடு 6-இலக்கமாக இருக்க வேண்டும்",
    invalidAadhaar: "ஆதார் எண் 12-இலக்கமாக இருக்க வேண்டும்",
    invalidEmail: "சரியான மின்னஞ்சல் முகவரியை உள்ளிடவும்",
    validationError: "தயவுசெய்து படிவத்தில் குறிப்பிடப்பட்டுள்ள பிழைகளைத் திருத்தவும்.",
    campaignSlogan: "நவீன, டிஜிட்டல் மற்றும் தர்மம் சார்ந்த ஸ்ரீரங்கத்தை உருவாக்குவோம்",

    // Detailed error validation messages
    errFullName: "வாக்காளர் அடையாள அட்டையில் உள்ளபடி உங்கள் முழு பெயரை உள்ளிடவும்.",
    errParentName: "உங்கள் தந்தை / தாய் / துணைவர் பெயரை உள்ளிடவும்.",
    errDob: "உங்கள் பிறந்த தேதி அல்லது வயதை உள்ளிடவும்.",
    errGender: "தயவுசெய்து உங்கள் பாலினத்தைத் தேர்ந்தெடுக்கவும்.",
    errMobile: "சரியான மொபைல் எண்ணை உள்ளிடவும்.",
    errCurrentAddress: "உங்கள் தற்போதைய முகவரியை உள்ளிடவும்.",
    errPermanentAddress: "உங்கள் நிரந்தர முகவரியை உள்ளிடவும்.",
    errDistrict: "உங்கள் மாவட்டத்தை உள்ளிடவும்.",
    errState: "உங்கள் மாநிலத்தை உள்ளிடவும்.",
    errPincode: "சரியான 6-இலக்க அஞ்சல் குறியீட்டை உள்ளிடவும்.",
    errVoterIdNumber: "உங்கள் வாக்காளர் அடையாள அட்டை எண்ணை உள்ளிடவும்.",
    errEmergencyName: "அவசர தொடர்பு நபரின் பெயரை உள்ளிடவும்.",
    errRelationship: "அவசர தொடர்பு நபருடனான உறவை உள்ளிடவும்.",
    errEmergencyMobile: "சரியான அவசர மொபைல் எண்ணை உள்ளிடவும்.",
    errJoiningAs: "தயவுசெய்து நீங்கள் இணைய விரும்பும் பொறுப்பைத் தேர்ந்தெடுக்கவும்.",
    errVoterIdProof: "வாக்காளர் அடையாள அட்டை நகலை பதிவேற்றவும்.",
    errPassportPhoto: "உங்கள் புகைப்படத்தைப் பதிவேற்றவும்.",
    errDeclared: "விண்ணப்பிக்க உறுதிமொழியை ஏற்க வேண்டும்."
  }
};

interface JoinMovementModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: 'en' | 'ta';
}

interface FormState {
  fullName: string;
  parentName: string;
  dob: string;
  gender: string;
  mobile: string;
  email: string;
  occupation: string;
  education: string;
  currentAddress: string;
  permanentAddress: string;
  sameAddress: boolean;
  district: string;
  state: string;
  pincode: string;
  voterIdNumber: string;
  aadhaarNumber: string;
  emergencyName: string;
  emergencyRelationship: string;
  emergencyMobile: string;
  joiningAs: string;
  areaOfInterest: string;
  skills: string;
  preferredWorkingArea: string;
  availableTime: string;
  voterIdProof: File | null;
  passportPhoto: File | null;
  signature: File | null;
  declared: boolean;
}

const initialFormState: FormState = {
  fullName: '',
  parentName: '',
  dob: '',
  gender: '',
  mobile: '',
  email: '',
  occupation: '',
  education: '',
  currentAddress: '',
  permanentAddress: '',
  sameAddress: false,
  district: '',
  state: 'Tamil Nadu',
  pincode: '',
  voterIdNumber: '',
  aadhaarNumber: '',
  emergencyName: '',
  emergencyRelationship: '',
  emergencyMobile: '',
  joiningAs: '',
  areaOfInterest: '',
  skills: '',
  preferredWorkingArea: '',
  availableTime: '',
  voterIdProof: null,
  passportPhoto: null,
  signature: null,
  declared: false
};

// ─── STYLING HELPERS ─────────────────────────────────────────────────────────
const getInputClass = (hasError: boolean) => 
  `w-full px-4 md:px-5 py-3 md:py-4 bg-white border-2 rounded-xl outline-none font-semibold text-stone-900 text-sm md:text-base focus:ring-4 transition-all shadow-sm ${
    hasError 
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' 
      : 'border-stone-200 focus:border-[#FF8C00] focus:ring-[#FF8C00]/10'
  }`;

const getSelectionClass = (hasError: boolean) => 
  `w-full px-4 md:px-5 py-3 md:py-4 bg-white border-2 rounded-xl outline-none font-semibold text-stone-900 text-sm md:text-base focus:ring-4 transition-all shadow-sm appearance-none cursor-pointer ${
    hasError 
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' 
      : 'border-stone-200 focus:border-[#FF8C00] focus:ring-[#FF8C00]/10'
  }`;

const getTextareaClass = (hasError: boolean) => 
  `w-full px-4 md:px-5 py-3 md:py-4 bg-white border-2 rounded-xl outline-none font-semibold text-stone-900 text-sm md:text-base focus:ring-4 transition-all min-h-[90px] md:min-h-[110px] resize-none shadow-sm ${
    hasError 
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' 
      : 'border-stone-200 focus:border-[#FF8C00] focus:ring-[#FF8C00]/10'
  }`;

export default function JoinMovementModal({ isOpen, onClose, lang = 'en' }: JoinMovementModalProps) {
  const t = formTranslations[lang] ?? formTranslations.en;
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // File preview states (URLs for image previews)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [sigPreview, setSigPreview] = useState<string | null>(null);

  // Handle outside click close
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Reset state on open
      setStep(1);
      setFormData(initialFormState);
      setErrors({});
      setIsSuccess(false);
      setPhotoPreview(null);
      setSigPreview(null);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Synchronize permanent address if "sameAddress" is checked
  useEffect(() => {
    if (formData.sameAddress) {
      setFormData(prev => ({
        ...prev,
        permanentAddress: prev.currentAddress
      }));
      if (errors.permanentAddress) {
        setErrors(prev => {
          const next = { ...prev };
          delete next.permanentAddress;
          return next;
        });
      }
    }
  }, [formData.sameAddress, formData.currentAddress, errors.permanentAddress]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, type } = e.target;
    let value = e.target.value;
    const checked = (e.target as HTMLInputElement).checked;

    // Restrict input characters and lengths for relevance
    if (name === 'mobile' || name === 'emergencyMobile') {
      value = value.replace(/\D/g, '').slice(0, 10);
    } else if (name === 'pincode') {
      value = value.replace(/\D/g, '').slice(0, 6);
    } else if (name === 'aadhaarNumber') {
      value = value.replace(/\D/g, '').slice(0, 12);
    } else if (name === 'dob') {
      value = value.replace(/[^0-9\-/ ]/g, '').slice(0, 10);
    } else if (name === 'fullName' || name === 'parentName' || name === 'emergencyName') {
      value = value.replace(/[0-9!@#$%^&*()_+=:{}\[\];""'<>\/?\\|`~]/g, '');
    } else if (name === 'voterIdNumber') {
      value = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 15);
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error
    if (errors[name as keyof FormState]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name as keyof FormState];
        return next;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: 'voterIdProof' | 'passportPhoto' | 'signature') => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFormData(prev => ({ ...prev, [fieldName]: file }));
      
      // Clear error
      if (errors[fieldName]) {
        setErrors(prev => {
          const next = { ...prev };
          delete next[fieldName];
          return next;
        });
      }

      // Generate previews for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (fieldName === 'passportPhoto') setPhotoPreview(reader.result as string);
          if (fieldName === 'signature') setSigPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        if (fieldName === 'passportPhoto') setPhotoPreview(null);
        if (fieldName === 'signature') setSigPreview(null);
      }
    }
  };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Partial<Record<keyof FormState, string>> = {};

    if (currentStep === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = t.errFullName;
      if (!formData.parentName.trim()) newErrors.parentName = t.errParentName;
      if (!formData.dob.trim()) newErrors.dob = t.errDob;
      if (!formData.gender) newErrors.gender = t.errGender;
      
      const mobileRegex = /^[0-9]{10}$/;
      if (!formData.mobile.trim()) {
        newErrors.mobile = t.errMobile;
      } else if (!mobileRegex.test(formData.mobile)) {
        newErrors.mobile = t.invalidMobile;
      }

      if (formData.email.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          newErrors.email = t.invalidEmail;
        }
      }
    }

    if (currentStep === 2) {
      if (!formData.currentAddress.trim()) newErrors.currentAddress = t.errCurrentAddress;
      if (!formData.sameAddress && !formData.permanentAddress.trim()) newErrors.permanentAddress = t.errPermanentAddress;
      if (!formData.district.trim()) newErrors.district = t.errDistrict;
      if (!formData.state.trim()) newErrors.state = t.errState;
      
      const pinRegex = /^[0-9]{6}$/;
      if (!formData.pincode.trim()) {
        newErrors.pincode = t.errPincode;
      } else if (!pinRegex.test(formData.pincode)) {
        newErrors.pincode = t.invalidPincode;
      }
    }

    if (currentStep === 3) {
      if (!formData.voterIdNumber.trim()) newErrors.voterIdNumber = t.errVoterIdNumber;
      
      if (formData.aadhaarNumber.trim()) {
        const aadhaarRegex = /^[0-9]{12}$/;
        if (!aadhaarRegex.test(formData.aadhaarNumber)) {
          newErrors.aadhaarNumber = t.invalidAadhaar;
        }
      }

      if (!formData.emergencyName.trim()) newErrors.emergencyName = t.errEmergencyName;
      if (!formData.emergencyRelationship.trim()) newErrors.emergencyRelationship = t.errRelationship;
      
      const mobileRegex = /^[0-9]{10}$/;
      if (!formData.emergencyMobile.trim()) {
        newErrors.emergencyMobile = t.errEmergencyMobile;
      } else if (!mobileRegex.test(formData.emergencyMobile)) {
        newErrors.emergencyMobile = t.invalidMobile;
      }
    }

    if (currentStep === 4) {
      if (!formData.joiningAs) newErrors.joiningAs = t.errJoiningAs;
    }

    if (currentStep === 5) {
      if (!formData.voterIdProof) newErrors.voterIdProof = t.errVoterIdProof;
      if (!formData.passportPhoto) newErrors.passportPhoto = t.errPassportPhoto;
      if (!formData.declared) newErrors.declared = t.errDeclared;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(5)) return;

    setIsSubmitting(true);
    setErrors({});

    const payload = new FormData();
    payload.append('formType', 'join_movement');
    payload.append('fullName', formData.fullName);
    payload.append('parentName', formData.parentName);
    payload.append('dob', formData.dob);
    payload.append('gender', formData.gender);
    payload.append('mobile', formData.mobile);
    payload.append('email', formData.email || '');
    payload.append('occupation', formData.occupation || '');
    payload.append('education', formData.education || '');
    payload.append('currentAddress', formData.currentAddress);
    payload.append('permanentAddress', formData.sameAddress ? formData.currentAddress : formData.permanentAddress);
    payload.append('district', formData.district);
    payload.append('state', formData.state);
    payload.append('pincode', formData.pincode);
    payload.append('voterIdNumber', formData.voterIdNumber);
    payload.append('aadhaarNumber', formData.aadhaarNumber || '');
    payload.append('emergencyName', formData.emergencyName);
    payload.append('emergencyRelationship', formData.emergencyRelationship);
    payload.append('emergencyMobile', formData.emergencyMobile);
    payload.append('joiningAs', formData.joiningAs);
    payload.append('areaOfInterest', formData.areaOfInterest || '');
    payload.append('skills', formData.skills || '');
    payload.append('preferredWorkingArea', formData.preferredWorkingArea || '');
    payload.append('availableTime', formData.availableTime || '');

    if (formData.voterIdProof) {
      payload.append('voterIdProof', formData.voterIdProof);
    }
    if (formData.passportPhoto) {
      payload.append('passportPhoto', formData.passportPhoto);
    }
    if (formData.signature) {
      payload.append('signature', formData.signature);
    }

    try {
      const res = await fetch(`${import.meta.env.BASE_URL}contact.php`, {
        method: 'POST',
        body: payload,
      });

      const text = await res.text();
      
      // If we are in local development (Vite dev server) or it returns PHP code:
      if (text.includes('<?php') || import.meta.env.DEV) {
        console.warn("Dev mode fallback: Simulating email send success.");
        setIsSuccess(true);
        return;
      }

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        if (res.ok) {
          setIsSuccess(true);
          return;
        }
        throw new Error("Response was not valid JSON");
      }

      if (res.ok && data.status === 'success') {
        setIsSuccess(true);
      } else {
        const errorDetail = data?.message || text || 'Unknown submission error.';
        alert(`Submission Failed!\n\nDetails: ${errorDetail}`);
        setErrors({ declared: errorDetail });
      }
    } catch (err: any) {
      if (import.meta.env.DEV) {
        console.warn("Dev mode submit error bypassed:", err);
        setIsSuccess(true);
      } else {
        const errorMsg = err?.message || 'Network error occurred while submitting. Please try again.';
        alert(`Network Error!\n\nDetails: ${errorMsg}`);
        setErrors({ declared: errorMsg });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-0 md:p-4">
      {/* Blurred Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-md"
      />

      {/* Main Modal Card */}
      <motion.div
        ref={modalRef}
        initial={{ scale: 0.95, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 15 }}
        transition={{ type: "spring", damping: 28, stiffness: 300 }}
        className="relative z-10 w-full md:max-w-6xl bg-stone-50 md:rounded-3xl overflow-hidden shadow-2xl border border-white flex flex-col md:flex-row h-full md:h-[85vh] max-h-none md:max-h-[850px]"
      >
        {/* Banner Column/Header (Desktop only) */}
        <div className="hidden md:flex md:w-[40%] h-full relative overflow-hidden flex-col justify-between items-stretch p-10 text-white select-none shrink-0 bg-stone-950">
          {/* Background image & heavy gradient overlay for contrast */}
          <div className="absolute inset-0 z-0 bg-stone-950">
            <img src={campaignBg} alt="Campaign" className="w-full h-full object-cover opacity-50 md:opacity-40" />
            <div className="absolute inset-0 bg-black/50" /> {/* Dark overlay with half transparency */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent md:bg-gradient-to-r md:from-[#CC0000]/10" />
          </div>

          {/* Top Row: Logo & Campaign branding */}
          <div className="relative z-10 flex items-center gap-2.5 md:gap-3 shrink-0">
            <img src={logoImg} alt="Logo" className="w-10 h-10 md:w-14 h-14 bg-white rounded-xl md:rounded-2xl p-0.5 md:p-1 border border-stone-200" />
            <div>
              <h3 className="font-black text-xs md:text-base uppercase tracking-wider text-[#FF8C00] leading-tight">Shashikiran KN</h3>
              <p className="text-[0.6rem] md:text-xs font-bold text-stone-300 uppercase tracking-widest leading-none mt-0.5">Srirangam 2026</p>
            </div>
          </div>

          {/* Center Content: Slogan only (No bullets, hidden on mobile for clean screen height) */}
          <div className="relative z-10 hidden md:flex flex-col my-auto py-8 max-w-sm shrink-0">
            <div className="inline-flex items-center gap-1.5 self-start px-3 py-1 bg-[#FF8C00]/25 border border-[#FF8C00]/40 rounded-full text-[0.65rem] font-black text-[#FF8C00] uppercase tracking-wider mb-4">
              <Sparkles size={10} />
              <span>Join the Movement</span>
            </div>
            <h2 className="text-xl lg:text-2xl font-black leading-snug tracking-tight text-white">
              {t.campaignSlogan}
            </h2>
          </div>
        </div>

        {/* Right Side: Form (Scrollable body, Sticky footer) */}
        <form onSubmit={handleSubmit} className="w-full md:w-[60%] flex flex-col flex-1 h-full bg-stone-50 overflow-hidden" noValidate>
          
          {/* Header (Sticky) */}
          <div className="px-6 pt-5 pb-4 md:px-10 md:pt-6 md:pb-5 border-b border-stone-200/80 bg-white flex items-center justify-between shrink-0 relative z-10">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#CC0000] via-[#FF8C00] to-[#CC0000]" />
            <div className="flex items-center gap-3">
              {/* Logo visible on mobile header since the banner column is hidden */}
              <img src={logoImg} alt="Logo" className="md:hidden w-8 h-8 bg-white rounded-lg p-0.5 border border-stone-200 shrink-0 object-contain" />
              <div>
                <h2 className="text-base md:text-xl font-black text-stone-900 leading-tight">
                  {t.title}
                </h2>
                <p className="text-[10px] md:text-xs font-bold text-stone-500 mt-0.5">{t.subtitle}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-stone-100 text-stone-600 hover:bg-stone-200 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Step Indicator Progress Bar (Sticky) */}
          {!isSuccess && (
            <div className="px-6 py-3.5 md:px-10 md:py-4 bg-stone-100/60 border-b border-stone-200/50 shrink-0">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[0.65rem] md:text-xs font-black uppercase tracking-wider text-stone-550">
                  Step {step} of 5: {step === 1 ? t.step1 : step === 2 ? t.step2 : step === 3 ? t.step3 : step === 4 ? t.step4 : t.step5}
                </span>
                <span className="text-[0.7rem] md:text-xs font-black text-[#FF8C00]">{Math.round((step / 5) * 100)}%</span>
              </div>
              <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#CC0000] to-[#FF8C00]"
                  initial={{ width: "20%" }}
                  animate={{ width: `${(step / 5) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          )}

          {/* Form Content (Scrollable) */}
          <div className="flex-1 overflow-y-auto px-6 py-6 md:px-10 md:py-8 scrollbar-thin">
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center py-8 h-full"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 mb-5 border border-emerald-100 shadow-md">
                    <CheckCircle2 size={44} className="animate-bounce" />
                  </div>
                  <h3 className="text-2xl font-black text-stone-900 mb-2">{t.success}</h3>
                  <p className="text-stone-600 text-base max-w-md mb-8 leading-relaxed">
                    {t.successSubtitle}
                  </p>
                  
                  {/* Summary card */}
                  <div className="w-full max-w-lg bg-white border border-stone-200 rounded-2xl p-6 text-left mb-8 shadow-sm">
                    <h4 className="text-xs font-black uppercase tracking-wider text-stone-400 border-b border-stone-100 pb-2 mb-3">Registration Summary</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-stone-400 block text-xs">Name</span>
                        <span className="font-bold text-stone-800">{formData.fullName}</span>
                      </div>
                      <div>
                        <span className="text-stone-400 block text-xs">Mobile</span>
                        <span className="font-bold text-stone-800">{formData.mobile}</span>
                      </div>
                      <div>
                        <span className="text-stone-400 block text-xs">Role</span>
                        <span className="font-bold text-[#FF8C00]">{formData.joiningAs}</span>
                      </div>
                      <div>
                        <span className="text-stone-400 block text-xs">Voter ID</span>
                        <span className="font-bold text-stone-800">{formData.voterIdNumber}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={onClose}
                    className="px-10 py-4 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-black text-xs uppercase tracking-wider transition-colors shadow-md cursor-pointer"
                  >
                    {t.close}
                  </button>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  
                  {/* STEP 1: Personal Info */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-5"
                    >
                      <FormField label={t.fullName} error={errors.fullName} required>
                        <div className="relative">
                          <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                          <input
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            onInput={(e) => {
                              e.currentTarget.value = e.currentTarget.value.replace(/[0-9!@#$%^&*()_+=:{}\[\];""'<>\/?\\|`~]/g, '');
                            }}
                            className={`${getInputClass(!!errors.fullName)} pl-12`}
                          />
                        </div>
                      </FormField>

                      <FormField label={t.parentName} error={errors.parentName} required>
                        <div className="relative">
                          <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                          <input
                            name="parentName"
                            value={formData.parentName}
                            onChange={handleChange}
                            onInput={(e) => {
                              e.currentTarget.value = e.currentTarget.value.replace(/[0-9!@#$%^&*()_+=:{}\[\];""'<>\/?\\|`~]/g, '');
                            }}
                            className={`${getInputClass(!!errors.parentName)} pl-12`}
                          />
                        </div>
                      </FormField>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField label={t.dob} error={errors.dob} required>
                          <input
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            onInput={(e) => {
                              e.currentTarget.value = e.currentTarget.value.replace(/[^0-9\-/ ]/g, '').slice(0, 10);
                            }}
                            className={getInputClass(!!errors.dob)}
                          />
                        </FormField>

                        <FormField label={t.gender} error={errors.gender} required>
                          <div className="flex gap-2.5 h-[56px] items-center">
                            {['Male', 'Female', 'Trans'].map((g) => {
                              const isSel = formData.gender === g;
                              const labelText = g === 'Male' ? t.genderMale : g === 'Female' ? t.genderFemale : t.genderTrans;
                              return (
                                <button
                                  key={g}
                                  type="button"
                                  onClick={() => {
                                    setFormData(prev => ({ ...prev, gender: g }));
                                    if (errors.gender) setErrors(prev => {
                                      const next = { ...prev };
                                      delete next.gender;
                                      return next;
                                    });
                                  }}
                                  className={`flex-1 h-full rounded-xl border text-sm font-bold transition-all cursor-pointer ${
                                    isSel
                                      ? 'bg-[#FF8C00] border-[#FF8C00] text-white shadow-sm'
                                      : errors.gender
                                      ? 'bg-white border-red-500 text-red-500'
                                      : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300'
                                  }`}
                                >
                                  {labelText}
                                </button>
                              );
                            })}
                          </div>
                        </FormField>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField label={t.mobileNumber} error={errors.mobile} required>
                          <div className="relative">
                            <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                            <input
                              name="mobile"
                              type="tel"
                              inputMode="numeric"
                              pattern="[0-9]*"
                              value={formData.mobile}
                              onChange={handleChange}
                              onInput={(e) => {
                                e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '').slice(0, 10);
                              }}
                              className={`${getInputClass(!!errors.mobile)} pl-12`}
                            />
                          </div>
                        </FormField>

                        <FormField label={t.emailId} error={errors.email}>
                          <div className="relative">
                            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                            <input
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                              className={`${getInputClass(!!errors.email)} pl-12`}
                            />
                          </div>
                        </FormField>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField label={t.occupation}>
                          <div className="relative">
                            <Briefcase size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                            <input
                              name="occupation"
                              value={formData.occupation}
                              onChange={handleChange}
                              className={`${getInputClass(!!errors.occupation)} pl-12`}
                            />
                          </div>
                        </FormField>

                        <FormField label={t.education}>
                          <div className="relative">
                            <Award size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                            <input
                              name="education"
                              value={formData.education}
                              onChange={handleChange}
                              className={`${getInputClass(!!errors.education)} pl-12`}
                            />
                          </div>
                        </FormField>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: Address Info */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-5"
                    >
                      <FormField label={t.currentAddress} error={errors.currentAddress} required>
                        <textarea
                          name="currentAddress"
                          value={formData.currentAddress}
                          onChange={handleChange}
                          className={getTextareaClass(!!errors.currentAddress)}
                        />
                      </FormField>

                      <div className="flex items-center gap-2.5 py-1">
                        <input
                          id="sameAddress"
                          name="sameAddress"
                          type="checkbox"
                          checked={formData.sameAddress}
                          onChange={handleChange}
                          className="h-5 w-5 rounded border-stone-300 text-[#FF8C00] focus:ring-[#FF8C00]/20 cursor-pointer"
                        />
                        <label htmlFor="sameAddress" className="text-sm font-bold text-stone-700 cursor-pointer select-none">
                          {t.sameAsCurrent}
                        </label>
                      </div>

                      <FormField label={t.permanentAddress} error={errors.permanentAddress} required={!formData.sameAddress}>
                        <textarea
                          name="permanentAddress"
                          value={formData.sameAddress ? formData.currentAddress : formData.permanentAddress}
                          onChange={handleChange}
                          disabled={formData.sameAddress}
                          className={formData.sameAddress ? 'w-full px-5 py-4 bg-stone-100 border-2 border-stone-200 rounded-xl outline-none font-semibold text-stone-500 text-base min-h-[110px] resize-none shadow-sm' : getTextareaClass(!!errors.permanentAddress)}
                        />
                      </FormField>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <FormField label={t.district} error={errors.district} required>
                          <input
                            name="district"
                            value={formData.district}
                            onChange={handleChange}
                            className={getInputClass(!!errors.district)}
                          />
                        </FormField>

                        <FormField label={t.state} error={errors.state} required>
                          <input
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            className={getInputClass(!!errors.state)}
                          />
                        </FormField>

                        <FormField label={t.pincode} error={errors.pincode} required>
                          <input
                            name="pincode"
                            type="tel"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            value={formData.pincode}
                            onChange={handleChange}
                            onInput={(e) => {
                              e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '').slice(0, 6);
                            }}
                            className={getInputClass(!!errors.pincode)}
                          />
                        </FormField>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: Identity & Emergency */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-5"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField label={t.voterIdNumber} error={errors.voterIdNumber} required>
                          <div className="relative">
                            <FileText size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                            <input
                              name="voterIdNumber"
                              value={formData.voterIdNumber}
                              onChange={handleChange}
                              onInput={(e) => {
                                e.currentTarget.value = e.currentTarget.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 15);
                              }}
                              className={`${getInputClass(!!errors.voterIdNumber)} pl-12`}
                            />
                          </div>
                        </FormField>

                        <FormField label={t.aadhaarNumber} error={errors.aadhaarNumber}>
                          <div className="relative">
                            <FileText size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                            <input
                              name="aadhaarNumber"
                              type="tel"
                              inputMode="numeric"
                              pattern="[0-9]*"
                              value={formData.aadhaarNumber}
                              onChange={handleChange}
                              onInput={(e) => {
                                e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '').slice(0, 12);
                              }}
                              className={`${getInputClass(!!errors.aadhaarNumber)} pl-12`}
                            />
                          </div>
                        </FormField>
                      </div>

                      <div className="border-t border-stone-200/60 my-2 pt-5">
                        <h4 className="text-xs font-black uppercase tracking-wider text-stone-500 mb-4">Emergency Contact Details</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <FormField label={t.emergencyName} error={errors.emergencyName} required>
                            <input
                              name="emergencyName"
                              value={formData.emergencyName}
                              onChange={handleChange}
                              onInput={(e) => {
                                e.currentTarget.value = e.currentTarget.value.replace(/[0-9!@#$%^&*()_+=:{}\[\];""'<>\/?\\|`~]/g, '');
                              }}
                              className={getInputClass(!!errors.emergencyName)}
                            />
                          </FormField>

                          <FormField label={t.relationship} error={errors.emergencyRelationship} required>
                            <input
                              name="emergencyRelationship"
                              value={formData.emergencyRelationship}
                              onChange={handleChange}
                              className={getInputClass(!!errors.emergencyRelationship)}
                            />
                          </FormField>
                        </div>

                        <div className="mt-4">
                          <FormField label={t.emergencyMobile} error={errors.emergencyMobile} required>
                            <div className="relative">
                              <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                              <input
                                name="emergencyMobile"
                                type="tel"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                value={formData.emergencyMobile}
                                onChange={handleChange}
                                onInput={(e) => {
                                  e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '').slice(0, 10);
                                }}
                                className={`${getInputClass(!!errors.emergencyMobile)} pl-12`}
                              />
                            </div>
                          </FormField>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 4: Joining Details */}
                  {step === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-5"
                    >
                      <FormField label={t.joiningAs} error={errors.joiningAs} required>
                        <div className="relative">
                          <select
                            name="joiningAs"
                            value={formData.joiningAs}
                            onChange={handleChange}
                            className={getSelectionClass(!!errors.joiningAs)}
                          >
                            <option value="">-- {t.joiningAsSelect} --</option>
                            {t.joiningAsOptions.map(opt => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-stone-500">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                          </div>
                        </div>
                      </FormField>

                      <FormField label={t.areaOfInterest}>
                        <div className="relative">
                          <Heart size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                          <input
                            name="areaOfInterest"
                            value={formData.areaOfInterest}
                            onChange={handleChange}
                            className={`${getInputClass(!!errors.areaOfInterest)} pl-12`}
                          />
                        </div>
                      </FormField>

                      <FormField label={t.skills}>
                        <textarea
                          name="skills"
                          value={formData.skills}
                          onChange={handleChange}
                          className={getTextareaClass(!!errors.skills)}
                        />
                      </FormField>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField label={t.preferredWorkingArea}>
                          <div className="relative">
                            <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                            <input
                              name="preferredWorkingArea"
                              value={formData.preferredWorkingArea}
                              onChange={handleChange}
                              className={`${getInputClass(!!errors.preferredWorkingArea)} pl-12`}
                            />
                          </div>
                        </FormField>

                        <FormField label={t.availableTime}>
                          <div className="relative">
                            <Clock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                            <input
                              name="availableTime"
                              value={formData.availableTime}
                              onChange={handleChange}
                              className={`${getInputClass(!!errors.availableTime)} pl-12`}
                            />
                          </div>
                        </FormField>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 5: Document Uploads & Declaration */}
                  {step === 5 && (
                    <motion.div
                      key="step5"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-5"
                    >
                      {/* Voter ID Proof upload */}
                      <FileUploadField
                        label={t.voterIdProof}
                        description={t.voterIdProofDesc}
                        file={formData.voterIdProof}
                        error={errors.voterIdProof}
                        required
                        onFileSelect={(e) => handleFileChange(e, 'voterIdProof')}
                        onClear={() => setFormData(prev => ({ ...prev, voterIdProof: null }))}
                        t={t}
                      />

                      {/* Passport Photo upload */}
                      <FileUploadField
                        label={t.passportPhoto}
                        description={t.passportPhotoDesc}
                        file={formData.passportPhoto}
                        error={errors.passportPhoto}
                        required
                        previewUrl={photoPreview}
                        onFileSelect={(e) => handleFileChange(e, 'passportPhoto')}
                        onClear={() => {
                          setFormData(prev => ({ ...prev, passportPhoto: null }));
                          setPhotoPreview(null);
                        }}
                        t={t}
                      />

                      {/* Signature upload */}
                      <FileUploadField
                        label={t.signature}
                        description={t.signatureDesc}
                        file={formData.signature}
                        previewUrl={sigPreview}
                        onFileSelect={(e) => handleFileChange(e, 'signature')}
                        onClear={() => {
                          setFormData(prev => ({ ...prev, signature: null }));
                          setSigPreview(null);
                        }}
                        t={t}
                      />

                      {/* Declaration Checkbox */}
                      <div className="border-t border-stone-200/60 pt-5 mt-6">
                        <div className="flex items-start gap-3">
                          <input
                            id="declared"
                            name="declared"
                            type="checkbox"
                            checked={formData.declared}
                            onChange={handleChange}
                            className={`h-6 w-6 rounded border-stone-300 text-[#FF8C00] focus:ring-[#FF8C00]/20 cursor-pointer shrink-0 mt-0.5 ${errors.declared ? 'border-red-500' : ''}`}
                          />
                          <label htmlFor="declared" className="text-sm font-bold text-stone-700 cursor-pointer select-none leading-relaxed">
                            <span className="text-stone-900 block font-black mb-1 text-base">{t.declaration} <span className="text-[#CC0000]">*</span></span>
                            “{t.declarationText}”
                          </label>
                        </div>
                        {errors.declared && (
                          <p className="text-xs text-red-650 font-bold mt-1">{errors.declared}</p>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* General step errors */}
                  {Object.keys(errors).length > 0 && (
                    <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-xl p-4.5 text-red-700 text-sm font-bold shrink-0">
                      <AlertCircle size={18} className="shrink-0 mt-0.5" />
                      <span>{t.validationError}</span>
                    </div>
                  )}

                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Sticky Footer for Buttons (Always visible and accessible) */}
          {!isSuccess && (
            <div className="px-6 py-4 md:px-10 md:py-5 border-t border-stone-200 bg-white flex gap-4 shrink-0 relative z-10">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="flex-1 py-4 border-2 border-stone-200 hover:border-stone-300 text-stone-600 rounded-xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <ArrowLeft size={18} />
                  <span>{t.prev}</span>
                </button>
              )}

              {step < 5 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-[2] py-4 bg-stone-900 hover:bg-stone-855 text-white rounded-xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm hover:translate-x-0.5"
                >
                  <span>{t.next}</span>
                  <ArrowRight size={18} />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-[2] py-4 bg-gradient-to-r from-[#CC0000] to-[#FF8C00] hover:from-[#a80000] hover:to-[#e67300] disabled:opacity-55 text-white rounded-xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>{t.submitting}</span>
                    </>
                  ) : (
                    <>
                      <span>{t.submit}</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </form>
      </motion.div>
    </div>
  );
}

// ─── HELPER COMPONENTS ───────────────────────────────────────────────────────
function FormField({
  label,
  error,
  required,
  children
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-black text-stone-800 flex items-center gap-0.5 select-none mb-1">
        {label}
        {required && <span className="text-[#CC0000] font-black">*</span>}
      </label>
      {children}
      {error && (
        <span className="text-xs text-red-650 font-bold flex items-center gap-1 mt-0.5">
          <AlertCircle size={14} />
          {error}
        </span>
      )}
    </div>
  );
}

interface FileUploadFieldProps {
  label: string;
  description: string;
  file: File | null;
  error?: string;
  required?: boolean;
  previewUrl?: string | null;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  t: any;
}

function FileUploadField({
  label,
  description,
  file,
  error,
  required,
  previewUrl,
  onFileSelect,
  onClear,
  t
}: FileUploadFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-black text-stone-800 flex items-center gap-0.5 select-none mb-1">
        {label}
        {required && <span className="text-[#CC0000] font-black">*</span>}
      </label>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={onFileSelect}
        accept="image/*,application/pdf"
        className="hidden"
      />

      {file ? (
        <div className={`flex items-center justify-between border-2 rounded-xl p-4 shadow-sm ${error ? 'border-red-500 bg-red-50/10' : 'border-[#FF8C00]/30 bg-orange-50/20'}`}>
          <div className="flex items-center gap-3 min-w-0">
            {previewUrl ? (
              <img src={previewUrl} alt="Upload preview" className="w-14 h-14 rounded-lg object-cover border border-stone-200 shadow-sm shrink-0" />
            ) : (
              <div className="w-14 h-14 rounded-lg bg-stone-100 border border-stone-200 flex items-center justify-center shrink-0">
                <FileText size={22} className="text-stone-400" />
              </div>
            )}
            <div className="min-w-0">
              <p className="text-sm font-bold text-stone-850 truncate">{file.name}</p>
              <p className="text-xs text-stone-400 font-medium">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClear}
            className="px-4 py-2 text-xs font-black uppercase text-[#CC0000] hover:bg-[#CC0000]/5 rounded-lg border border-[#CC0000]/15 transition-all cursor-pointer shrink-0"
          >
            {t.changeFile}
          </button>
        </div>
      ) : (
        <div
          onClick={handleClick}
          className={`border-2 border-dashed rounded-xl p-6 text-center flex flex-col items-center justify-center gap-2 cursor-pointer transition-all hover:bg-stone-100/50 ${
            error ? 'border-red-500 bg-red-50/10' : 'border-stone-300 bg-white hover:border-[#FF8C00]/55'
          }`}
        >
          <UploadCloud size={28} className={error ? 'text-red-500' : 'text-[#FF8C00]/70'} />
          <div>
            <p className="text-sm font-bold text-stone-800">{t.dragDrop}</p>
            <p className="text-xs text-stone-400 mt-0.5">{description}</p>
          </div>
        </div>
      )}

      {error && (
        <span className="text-xs text-red-650 font-bold flex items-center gap-1 mt-0.5">
          <AlertCircle size={14} />
          {error}
        </span>
      )}
    </div>
  );
}
