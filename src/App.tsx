import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  ArrowUp, Menu, X, ChevronLeft, ChevronRight
} from 'lucide-react';
import { Facebook, Instagram, Youtube } from './components/SocialIcons';
import ConstituencyVoiceWidget from './components/ConstituencyVoiceWidget';
import JoinMovementModal from './components/JoinMovementModal';
import DonateModal from './components/DonateModal';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
const AgendaPage = React.lazy(() => import('./pages/AgendaPage'));
const ConstituencyPage = React.lazy(() => import('./pages/ConstituencyPage'));
const ManifestoPage = React.lazy(() => import('./pages/ManifestoPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const GroundworkPage = React.lazy(() => import('./pages/GroundworkPage'));
const BlogDetailPage = React.lazy(() => import('./pages/BlogDetailPage'));
import logoImg from './assets/shashikarann.png';
import heroBgImg from './assets/hero-bg1.jpeg';
import heroBgImg2 from './assets/hero-bg2.jpeg';
import heroBgImg3 from './assets/hero-bg3.jpeg';
import heroBgImgtam from './assets/tamil1.jpeg';
import heroBgImgtam2 from './assets/tamil2.jpeg';
import heroBgImgtam3 from './assets/tamil3.jpeg';
import heroMobileImg1 from './assets/hero-mobile1.jpeg';
import heroMobileImg2 from './assets/hero-mobile2.jpeg';
import heroMobileImg3 from './assets/hero-mobile3.jpeg';
import heroTabImg1 from './assets/hero-tab1.jpeg';
import heroTabImg2 from './assets/hero-tab2.jpeg';
import heroTabImg3 from './assets/hero-tab3.jpeg';
// import joinHeaderImg from './assets/join-header.png';
import about1 from './assets/about1.jpeg';
import about2 from './assets/about2.jpeg';
import about3 from './assets/about3.jpeg';
import about4 from './assets/about4.jpeg';
import shashi6 from './assets/home 2008.png';
import shashi7 from './assets/home 2011.png';
import shashi8 from './assets/home 2015.png';
import shashi9 from './assets/home 2018.png';
import shashi10 from './assets/home 2019.png';
import shashi11 from './assets/home 2020.png';
import shashi2024 from './assets/2024.png';
import shashi12 from './assets/home 2026.png';

import agendaBanner from './assets/2031.png';


// ─── TRANSLATIONS ────────────────────────────────────────────────────────────
const translations = {
  en: {
    nav: ["Home", "About Me", "My Journey", "Agenda 2031", "My Manifesto's", "My Constituency", "Ground Work", "Contact"],
    navIds: ['hero', 'about', 'journey', 'agenda', 'manifesto', 'issues', 'groundwork', 'contact'],
    story: [
      {
        chapter: "01",
        title: "Leading with Culture & Dharma",
        subtitle: "ETHICS & CULTURE",
        text: "Guided by my roots at Ramakrishna School, I have a deep love for our culture and identity. As a devotee of Bhagavan Krishna, my mission is simple: to bring true 'Dharma'—honesty and duty—into the world of politics.",
        bg: about3,
        accent: "#CC0000"
      },
      {
        chapter: "02",
        title: "My Mindset: Practical & Systematic",
        subtitle: "SYSTEMATIC MINDSET",
        text: "I am a professional first, and a politician next. With my background in Mechanical Engineering, MBA, and Public Administration, I look at every public problem with a practical mind to build real, working solutions.",
        bg: about4,
        accent: "#CC0000"
      },
      {
        chapter: "03",
        title: "Fixing Finances, Uplifting People",
        subtitle: "THE FINANCIAL EXPERT",
        text: "As a Certified Financial Planner and Investment Banker, I know exactly how the financial system works. My only goal is to use this knowledge to solve the economic struggles of everyday people and make everyone financially secure.",
        bg: about2,
        accent: "#CC0000"
      },
      {
        chapter: "04",
        title: "I Choose Principles Over Power",
        subtitle: "Driven by Truth, Not Power",
        text: "Many big political parties invited me to join them, but I proudly chose to stay independent. My ideology is simple—Nation and Social Welfare first. I will never sacrifice my principles for easy political power.",
        bg: about1,
        accent: "#CC0000"
      },
    ],
    heroSlides: [
      {
        title: "The Vision",
        subtitle: "Transforming Tamil Nadu with National Pride",
        desc: "A journey of dedication that started in 2011, driven by a vision for true national development.",
        bg: heroBgImg3,
        tabBg: heroTabImg3,
        mobileBg: heroMobileImg3
      },
      {
        title: "The Mission",
        subtitle: "Politics is a Tool for Social Change",
        desc: "Implementing the principles of Nationalism and Socialism to build a self-reliant state.",
        bg: heroBgImg2,
        tabBg: heroTabImg2,
        mobileBg: heroMobileImg2
      },
      {
        title: "The Promise",
        subtitle: "Transparency Through Digital Governance",
        desc: "Eliminating corruption through technology and ensuring free education and healthcare for all.",
        bg: heroBgImg,
        tabBg: heroTabImg1,
        mobileBg: heroMobileImg1
      }
    ],
    candidateName: "Shashikiran KN",
    candidateInfo: "BE, MBA | National Socialist Party",
    candidateSubtitle: "Dedicated to National Development since 2011",
    election: "SRIRANGAM 2026",
    ctaJoin: "Join Movement",
    ctaVision: "Our Vision",
    issuesTitle: "SRIRANGAM CONSTITUENCY",
    issues: [
      { title: "Farmers Concern", desc: "Direct debt waiver & support system for every farming household.", img: "https://images.pexels.com/photos/30754757/pexels-photo-30754757.jpeg" },
      { title: "Women's Rights", desc: "Smart Street Lights & Action Teams for 100% safety.", img: "https://images.pexels.com/photos/8107545/pexels-photo-8107545.jpeg" },
      { title: "Youth Dream", desc: "IT Hub & 50,000+ localized job opportunities.", img: "https://images.pexels.com/photos/34265241/pexels-photo-34265241.jpeg" },
      { title: "Sanitation", desc: "100-Day Clean Srirangam transformational plan.", img: "https://images.pexels.com/photos/24491238/pexels-photo-24491238.jpeg" }
    ],
    groundworkTitle: "FIELD ACTION",
    groundwork: [
      { title: "Flood Relief 2024", desc: "Directly supervised the distribution of aid to 2000+ families.", img: "https://images.pexels.com/photos/14823611/pexels-photo-14823611.jpeg", date: "DEC 2024" },
      { title: "Rural Education Hub", desc: "Initiated 5 free coaching centers for village students.", img: "https://images.pexels.com/photos/37249876/pexels-photo-37249876.jpeg", date: "OCT 2024" },
      { title: "Farmers Protest Support", desc: "Stood with farmers for 48 hours until their demands were met.", img: "https://images.pexels.com/photos/12416040/pexels-photo-12416040.jpeg", date: "AUG 2024" }
    ],
    impactStats: [
      { val: "1200+", label: "Villages Visited" },
      { val: "5000+", label: "Grievances Resolved" },
      { val: "24/7", label: "Ground Support" }
    ],
    testimonials: [
      { name: "Arul Mani", role: "Farmer, Srirangam", text: "Finally someone who understands our pain. His vision for direct debt waiver is a life-saver for us." },
      { name: "Meenakshi R.", role: "Student", text: "The IT Hub plan gives us hope that we don't have to leave our homes for better opportunities." },
      { name: "Rajesh Kannan", role: "Small Business Owner", text: "He doesn't just speak; he acts. His dedication to our soil is unmatched." }
    ],
    journeyTitle: "MY JOURNEY",
    photoCourtesy: "Photo Courtesy: Campaign Archive",
    journeyTimeline: [
      { year: "2008", tag: "BOOKS & FOCUS", title: "Clear Mind, Strong Leadership", desc: "Yoga and books changed my life. They trained my mind to stay calm and helped me understand the world's problems clearly. Today, because of this focus, I have a clear blueprint to lead and serve you.", img: shashi6 },
      { year: "2011", tag: "MY LIFE'S MISSION", title: "A Decision Made at Age 17", desc: "When I was just 17 years old, I made a choice that changed my whole life. I promised myself to give up personal desires and dedicate my entire life to serving this nation and helping you.", img: shashi7 },
      { year: "2015", tag: "ACADEMIC EXCELLENCE", title: "Trained to Govern, Ready to Lead", desc: "I wanted to understand exactly how our government works, so I joined the IAS Academy. There, I deeply studied History, Politics, and Economics. Today, I have the legal knowledge to design and draft laws that will truly help the common people.", img: shashi8 },
      { year: "2017", tag: "PROFESSIONAL MASTERY", title: "How to Build and Lead", desc: "I didn't just study; I proved myself globally as a Financial Planner and Investment Banker. By founding Sarathi Groups with co-founders, I showed that I am a self-reliant leader who knows how to plan, build, and run successful organizations.", img: shashi9 },
      { year: "2019", tag: "SOCIAL WELFARE TRUST", title: "Serving You on the Ground", desc: "I believe that helping people is more important than getting political power. That is why I started the NSR Social Welfare Trust. Through this, I am already working directly on the ground to solve your day-to-day problems.", img: shashi10 },
      { year: "2020", tag: "POLITICAL LAUNCH", title: "A New Journey for the Nation", desc: "Netaji Subhash Chandra Bose's fearless vision for our country is my biggest inspiration. Following his footsteps, I am launching my political journey with a simple goal—to stand for true nationalism, serve the people, and build a better society for everyone.", img: shashi11 },
      { year: "2024", tag: "NDA ENGAGEMENT", title: "Learning National Politics", desc: "In 2024, I worked closely with the NDA (National Democratic Alliance). It was a great opportunity for me to learn real politics from top national leaders. This valuable experience helped me understand our people's ground realities and taught me how to solve local issues effectively.", img: shashi2024 },
      { year: "2026", tag: "SRIRANGAM MISSION", title: "Standing with the People of Srirangam", desc: "Srirangam is my field of action. I have stepped directly into the constituency to meet you, understand your needs, and work at the grassroots level. My only goal is to work hard and bring real, positive change to your lives.", img: shashi12 },
      { year: "2031", tag: "AGENDA 2031", title: "My Vision: Powering Progress with Technology", desc: "For me, political power is just a tool. Technology is the real force that operates it for the greater good of society. Through Agenda 2031, my vision is to combine power and technology to create a smarter, fairer, and better future for all of us.", img: agendaBanner }
    ],
    agendaTitle: "AGENDA 2031",
    agendaDesc: "A futuristic blueprint for the holistic development of Srirangam, blending heritage with high-tech infrastructure.",
    agendaItems: [
      { title: "Smarter Srirangam", desc: "100% digital governance and high-speed public connectivity.", img: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg" },
      { title: "Eco-Heritage Hub", desc: "Transforming the riverfront into a world-class eco-tourism destination.", img: "https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg" },
      { title: "Innovation Valley", desc: "Establishing a specialized AI and Robotics park to foster local talent.", img: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg" }
    ],
    manifestoTitle: "MY MANIFESTO'S",
    manifestoContent: "My commitment is based on transparency, safety, and prosperity for every citizen of Srirangam. We will ensure direct accountability and immediate grievance resolution.",
    manifestoItems: ["Water for Every Household", "Zero Unemployment Initiative", "24/7 Women Safety Command Center", "World-class Healthcare Access"],
    visionItems: [
      { title: "Digital Srirangam", desc: "Complete digitization of administrative services for transparent governance.", icon: 'Cpu' },
      { title: "Agricultural Growth", desc: "State-of-the-art cold storage and export hub for local produce.", icon: 'Sprout' },
      { title: "Women Empowerment", desc: "Interest-free loans and skill-training for 10,000+ local women entrepreneurs.", icon: 'Heart' },
      { title: "Heritage Tourism", desc: "Preserving our ancient roots while building world-class facilities for pilgrims.", icon: 'Gem' }
    ],
    footerText: "YOUR ONE VOTE – WILL CHANGE THE DESTINY OF TAMIL NADU!",
    footerAddress: "Plot No. 12, D-54, 9A Cross Road, West Thillai Nagar, Tiruchirappalli, Tamil Nadu 620018",
    footerCopyright: "© 2026 SHASHIKIRAN KN CAMPAIGN. ALL RIGHTS RESERVED.",
    footerPrivacy: "PRIVACY POLICY",
    footerTerms: "TERMS OF SERVICE",
    quickLinks: "QUICK LINKS",
    contactHeading: "CONTACT",
    joinTitle: "Join the Movement",
    joinStep1: "01 / IDENTIFY",
    joinStep1Title: "Enter Your Number",
    joinStep1Desc: "Start your journey with the movement by verifying your identity.",
    joinStep2: "02 / VERIFY",
    joinStep2Title: "Confirm Code",
    joinStep2Desc: "We've sent a 4-digit code to your mobile device.",
    joinStep3: "03 / FINALIZE",
    joinStep3Title: "Tell us About Yourself",
    joinStep3Desc: "To better serve Srirangam, we need to know where you stand and how we can reach you.",
    joinNameLabel: "Full Name",
    joinVoterLabel: "Voter ID (Optional)",
    joinAreaLabel: "Area / Ward",
    joinCta: "COMPLETE REGISTRATION",
    joinBack: "Go Back",
    formCategoryOptions: ["Infrastructure", "Sanitation", "Water Supply", "Others"],
    donate: "DONATE",
    joinMovement: "Join The Movement",
    joinShort: "Join",
    menu: "Menu",
    loading: "Loading...",
    giveMissedCall: "Give A Missed Call On",
    or: "OR",
    whatsappToNumber: "WhatsApp To This Number",
    footerNavigation: "Navigation",
    footerMore: "More",
    footerGetInTouch: "Get in Touch",
    phone: "Phone",
    email: "Email",
    address: "Address",
  },
  ta: {
    nav: ["முகப்பு", "என்னைப் பற்றி", "எனது பயணம்", "அஜெண்டா 2031", "தேர்தல் அறிக்கை", "தொகுதி", "களப்பணி", "தொடர்பு"],
    navIds: ['hero', 'about', 'journey', 'agenda', 'manifesto', 'issues', 'groundwork', 'contact'],
    story: [
      {
        chapter: "01",
        title: "பண்பாடும் தர்மமும் தலைமையில்",
        subtitle: "நெறிமுறைகள் & கலாச்சாரம்",
        text: "ராமகிருஷ்ணா பள்ளியில் வளர்ந்த என் வேர்கள் என்னை வழிநடத்துகின்றன. நமது கலாச்சாரத்திற்கும் விவசாயத்திற்கும் எனக்கு ஆழ்ந்த அன்பு உள்ளது. ஸ்ரீகிருஷ்ணப் பக்தியாளராக, அரசியலில் உண்மையான 'தர்மம்'—நேர்மையும் கடமையும்—வர வேண்டும் என்பதே என் லட்சியம்.",
        bg: about3,
        accent: "#CC0000"
      },
      {
        chapter: "02",
        title: "நடைமுறை & முறையான சிந்தனை",
        subtitle: "முறையான அணுகுமுறை",
        text: "நான் முதலில் ஒரு தொழில்முறை நிபுணர்; அரசியல்வாதி அடுத்து. மெக்கானிக்கல் பொறியியல், MBA மற்றும் பொது நிர்வாகப் பின்னணியுடன், ஒவ்வொரு பொது பிரச்சினையையும் நடைமுறை மனநிலையில் பார்த்து, உண்மையான, செயல்படும் தீர்வுகளை உருவாக்குகிறேன்.",
        bg: about4,
        accent: "#CC0000"
      },
      {
        chapter: "03",
        title: "நிதியை சரிசெய்து, மக்களை உயர்த்துதல்",
        subtitle: "நிதி நிபுணர்",
        text: "சான்றளிக்கப்பட்ட நிதி ஆலோசகர் மற்றும் முதலீட்டு வங்கியாளராக, நிதி அமைப்பு எப்படி செயல்படுகிறது என்பது எனக்குத் தெளிவாகத் தெரியும். சாமானிய மக்களின் பொருளாதாரப் பிரச்சினைகளைத் தீர்த்து, அனைவரையும் நிதி பாதுகாப்புடன் வைப்பதே என் ஒரே லட்சியம்.",
        bg: about2,
        accent: "#CC0000"
      },
      {
        chapter: "04",
        title: "அதிகாரத்துக்குப் பதில் கொள்கை",
        subtitle: "உண்மையால் இயக்கப்படுபவர்",
        text: "பல பெரிய அரசியல் கட்சிகள் என்னை அழைத்தன; ஆனால் நான் பெருமையுடன் சுயாதீனமாக நிற்கத் தேர்ந்தெடுத்தேன். என் கொள்கை எளிமையானது—தேசம் மற்றும் சமூக நலன் முதலில். எளிதான அரசியல் அதிகாரத்திற்காக என் கொள்கைகளை ஒருபோதும் தியாகம் செய்ய மாட்டேன்.",
        bg: about1,
        accent: "#CC0000"
      },
    ],
    heroSlides: [
      {
        title: "தொலைநோக்குப் பார்வை",
        subtitle: "தேசியப் பெருமையுடன் தமிழகத்தை மாற்றுதல்",
        desc: "2011 இல் தொடங்கிய அர்ப்பணிப்புப் பயணம், உண்மையான தேசிய வளர்ச்சிக்கான ஒரு தொலைநோக்குப் பார்வையால் இயக்கப்படுகிறது.",
        bg: heroBgImgtam,
        tabBg: heroTabImg1,
        mobileBg: heroMobileImg1
      },
      {
        title: "லட்சியம்",
        subtitle: "அரசியல் என்பது சமூக மாற்றத்திற்கான ஒரு கருவி",
        desc: "சுயசார்பு மாநிலத்தை உருவாக்க தேசியம் மற்றும் சோசலிசத்தின் கொள்கைகளை செயல்படுத்துதல்.",
        bg: heroBgImgtam2,
        tabBg: heroTabImg2,
        mobileBg: heroMobileImg2
      },
      {
        title: "வாக்குறுதி",
        subtitle: "டிஜிட்டல் நிர்வாகத்தின் மூலம் வெளிப்படைத்தன்மை",
        desc: "தொழில்நுட்பத்தின் மூலம் ஊழலை ஒழித்தல் மற்றும் அனைவருக்கும் இலவச கல்வி மற்றும் சுகாதாரத்தை உறுதி செய்தல்.",
        bg: heroBgImgtam3,
        tabBg: heroTabImg3,
        mobileBg: heroMobileImg3
      }
    ],
    candidateName: "சசிகிரன் KN",
    candidateInfo: "BE, MBA | நேஷனல் சோசியலிஸ்ட் பார்ட்டி",
    candidateSubtitle: "2011 முதல் தேசிய வளர்ச்சிக்காக அர்ப்பணிக்கப்பட்டது",
    election: "ஸ்ரீரங்கம் 2026",
    ctaJoin: "இயக்கத்தில் இணையுங்கள்",
    ctaVision: "எமது நோக்கம்",
    issuesTitle: "ஸ்ரீரங்கம் தொகுதி",
    issues: [
      { title: "விவசாயிகள் நலம்", desc: "நேரடி கடன் தள்ளுபடி மற்றும் விவசாய குடும்பங்களுக்கான ஆதரவு.", img: "https://images.pexels.com/photos/30754757/pexels-photo-30754757.jpeg" },
      { title: "பெண்கள் உரிமை", desc: "ஸ்மார்ட் தெருவிளக்குகள் மற்றும் 100% பாதுகாப்பு குழுக்கள்.", img: "https://images.pexels.com/photos/8107545/pexels-photo-8107545.jpeg" },
      { title: "இளைஞர் கனவு", desc: "ஐடி ஹப் மற்றும் 50,000+ உள்ளூர் வேலைவாய்ப்புகள்.", img: "https://images.pexels.com/photos/34265241/pexels-photo-34265241.jpeg" },
      { title: "தூய்மைப் பணி", desc: "100 நாள் தூய்மையான ஸ்ரீரங்கம் மாற்றத் திட்டம்.", img: "https://images.pexels.com/photos/24491238/pexels-photo-24491238.jpeg" }
    ],
    groundworkTitle: "களப்பணி",
    groundwork: [
      { title: "வெள்ள நிவாரணம் 2024", desc: "2000+ குடும்பங்களுக்கு நேரடியாக நிவாரணம் வழங்கப்பட்டது.", img: "https://images.pexels.com/photos/14823611/pexels-photo-14823611.jpeg", date: "டிச 2024" },
      { title: "கிராமப்புற கல்வி மையம்", desc: "மாணவர்களுக்காக 5 இலவச பயிற்சி மையங்கள் தொடங்கப்பட்டன.", img: "https://images.pexels.com/photos/37249876/pexels-photo-37249876.jpeg", date: "அக்டோ 2024" },
      { title: "விவசாயிகள் போராட்ட ஆதரவு", desc: "விவசாயிகளின் கோரிக்கைகள் நிறைவேறும் வரை ஆதரவாக நின்றோம்.", img: "https://images.pexels.com/photos/12416040/pexels-photo-12416040.jpeg", date: "ஆகஸ்ட் 2024" }
    ],
    impactStats: [
      { val: "1200+", label: "கிராமங்கள் பயணம்" },
      { val: "5000+", label: "குறைகள் தீர்வு" },
      { val: "24/7", label: "களப்பணி ஆதரவு" }
    ],
    testimonials: [
      { name: "அருள் மணி", role: "விவசாயி, ஸ்ரீரங்கம்", text: "நிச்சயமாக எங்கள் வலியைப் புரிந்துகொள்ளும் ஒருவர். கடன் தள்ளுபடித் திட்டம் எங்களுக்கு வரப் பிரசாதம்." },
      { name: "மீனாட்சி ஆர்.", role: "மாணவி", text: "ஐடி ஹப் திட்டம் எங்களுக்கு நம்பிக்கையைத் தருகிறது." },
      { name: "ராஜேஷ் கண்ணன்", role: "சிறு வணிகர்", text: "அவர் பேசுவது மட்டுமல்ல, செயல்படுபவர். இந்த மண்ணின் மீதான அவரது அர்ப்பணிப்பு நிகரற்றது." }
    ],
    journeyTitle: "எனது பயணம்",
    photoCourtesy: "புகைப்பட உதவி: பிரச்சாரக் காப்பகம்",
    journeyTimeline: [
      { year: "2008", tag: "புத்தகங்கள் & கவனம்", title: "தெளிவான மனம், வலுவான தலைமை", desc: "யோகாவும் புத்தகங்களும் என் வாழ்க்கையை மாற்றின. அவை என் மனதை அமைதியாக வைத்து, உலகப் பிரச்சினைகளைத் தெளிவாகப் புரிந்துகொள்ள உதவின. இன்று, இந்தக் கவனத்தால், உங்களை வழிநடத்தவும் சேவிக்கவும் எனக்குத் தெளிவான வரைபடம் உள்ளது.", img: shashi6 },
      { year: "2011", tag: "என் வாழ்க்கை லட்சியம்", title: "17 வயதில் எடுத்த முடிவு", desc: "நான் வெறும் 17 வயதாக இருந்தபோது, என் முழு வாழ்க்கையையும் மாற்றிய ஒரு தேர்வை எடுத்தேன். தனிப்பட்ட விருப்பங்களைத் துறந்து, இந்த நாட்டிற்கும் உங்களுக்கும் சேவை செய்ய என் முழு வாழ்க்கையையும் அர்ப்பணிப்பேன் என்று வாக்குறுதி அளித்தேன்.", img: shashi7 },
      { year: "2015", tag: "கல்விச் சிறப்பு", title: "ஆள்வதற்குப் பயிற்சி, தலைமைக்குத் தயார்", desc: "நமது அரசாங்கம் எப்படி செயல்படுகிறது என்பதைத் துல்லியமாகப் புரிந்துகொள்ள ஐஏஎஸ் அகாடமியில் சேர்ந்தேன். அங்கு வரலாறு, அரசியல், பொருளாதாரம் ஆகியவற்றை ஆழமாகப் படித்தேன். இன்று, சாமானிய மக்களுக்கு உண்மையில் உதவும் சட்டங்களை வடிவமைக்கவும் வரைவதற்கும் எனக்குச் சட்ட அறிவு உள்ளது.", img: shashi8 },
      { year: "2018", tag: "தொழில்முறை தேர்ச்சி", title: "எப்படி கட்டி, தலைமை தாங்குவது", desc: "நான் படித்தது மட்டுமல்ல; உலக அளவில் நிதி ஆலோசகர் மற்றும் முதலீட்டு வங்கியாளராக என்னை நிரூபித்தேன். சாரதி குரூப்ஸை நிறுவுவதன் மூலம், திட்டமிடவும், கட்டவும், வெற்றிகரமான அமைப்புகளை நடத்தவும் தெரிந்த சுயசார்பு தலைவர் என்பதைக் காட்டினேன்.", img: shashi9 },
      { year: "2019", tag: "சமூக நல அறக்கட்டளை", title: "களத்தில் உங்களுக்குச் சேவை", desc: "அரசியல் அதிகாரத்தை விட மக்களுக்கு உதவுவது முக்கியம் என்று நம்புகிறேன். அதனால்தான் என்.எஸ் சமூக நல அறக்கட்டளையைத் தொடங்கினேன். இதன் மூலம், உங்கள் அன்றாடப் பிரச்சினைகளைத் தீர்க்க நேரடியாகக் களத்தில் ஏற்கனவே பணியாற்றி வருகிறேன்.", img: shashi10 },
      { year: "2020", tag: "அரசியல் தொடக்கம்", title: "நாட்டிற்கான புதிய பயணம்", desc: "நேதாஜி சுபாஷ் சந்திர போஸின் தைரியமான தொலைநோக்குப் பார்வை எனக்கு மிகப்பெரிய ஊக்கம். அவரின் அடிச்சுவடுகளில், உண்மையான தேசியவாதத்திற்காக நிற்கவும், மக்களுக்குச் சேவை செய்யவும், அனைவருக்கும் சிறந்த சமூகத்தை உருவாக்கவும் என் அரசியல் பயணத்தைத் தொடங்குகிறேன்.", img: shashi11 },
      { year: "2024", tag: "தே.ஜ.கூ கூட்டணி", title: "தேசிய அரசியல் கற்றல்", desc: "2024 ஆம் ஆண்டில், நான் தே.ஜ.கூ (தேசிய ஜனநாயகக் கூட்டணி) உடன் நெருக்கமாகப் பணியாற்றினேன். தேசிய அளவிலான சிறந்த தலைவர்களிடமிருந்து உண்மையான அரசியலைக் கற்றுக்கொள்ள இது எனக்கு ஒரு சிறந்த வாய்ப்பாக அமைந்தது. இந்த மதிப்புமிக்க அனுபவம் நமது மக்களின் அடிமட்ட யதார்த்தங்களைப் புரிந்துகொள்ள உதவியதுடன், உள்ளூர் பிரச்சினைகளை எவ்வாறு திறம்படத் தீர்ப்பது என்பதையும் எனக்குக் கற்றுக் கொடுத்தது.", img: shashi2024 },
      { year: "2026", tag: "ஸ்ரீரங்கம் லட்சியம்", title: "ஸ்ரீரங்கம் மக்களுடன் நிற்பது", desc: "ஸ்ரீரங்கம் என் செயல்பாட்டுக் களம். தொகுதியில் நேரடியாக இறங்கி, உங்களைச் சந்தித்து, உங்கள் தேவைகளைப் புரிந்துகொண்டு, அடிமட்ட அளவில் பணியாற்றுகிறேன். கடினமாக உழைத்து, உங்கள் வாழ்க்கையில் உண்மையான, நேர்மறையான மாற்றத்தைக் கொண்டுவருவதே என் ஒரே லட்சியம்.", img: shashi12 },
      { year: "2031", tag: "அஜெண்டா 2031", title: "தொழில்நுட்பத்தால் முன்னேற்றம்: என் தொலைநோக்கு", desc: "எனக்கு அரசியல் அதிகாரம் ஒரு கருவி மட்டுமே. தொழில்நுட்பமே சமூகத்தின் நலனுக்காக அதை இயக்கும் உண்மையான சக்தி. அஜெண்டா 2031 மூலம், அதிகாரத்தையும் தொழில்நுட்பத்தையும் இணைத்து, அனைவருக்கும் புத்திசாலித்தனமான, நியாயமான, சிறந்த எதிர்காலத்தை உருவாக்குவதே எனது தொலைநோக்கு.", img: agendaBanner }
    ],
    agendaTitle: "அஜெண்டா 2031",
    agendaDesc: "ஸ்ரீரங்கத்தின் ஒட்டுமொத்த வளர்ச்சிக்கான எதிர்கால வரைபடம்.",
    agendaItems: [
      { title: "ஸ்மார்ட் ஸ்ரீரங்கம்", desc: "100% டிஜிட்டல் நிர்வாகம் மற்றும் அதிவேக இணைப்பு.", img: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg" },
      { title: "சுற்றுச்சூழல் பாரம்பரிய மையம்", desc: "ஆற்றங்கரை ஓரங்களை உலகத்தரம் வாய்ந்த சுற்றுலாத் தலமாக மாற்றுதல்.", img: "https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg" },
      { title: "கண்டுபிடிப்பு பள்ளத்தாக்கு", desc: "உள்ளூர் திறமைகளை வளர்க்க ஒரு ஏஐ மற்றும் ரோபாட்டிக்ஸ் பூங்காவை நிறுவுதல்.", img: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg" }
    ],
    manifestoTitle: "எனது தேர்தல் அறிக்கை",
    manifestoContent: "எனது அர்ப்பணிப்பு ஸ்ரீரங்கத்தின் ஒவ்வொரு குடிமகனுக்கும் வெளிப்படைத்தன்மை மற்றும் பாதுகாப்பை அடிப்படையாகக் கொண்டது.",
    manifestoItems: ["ஒவ்வொரு வீட்டிற்கும் தண்ணீர்", "வேலைவாய்ப்பின்மை ஒழிப்பு", "24/7 பெண்கள் பாதுகாப்பு மையம்", "உலகத்தரம் வாய்ந்த சுகாதாரம்"],
    visionItems: [
      { title: "டிஜிட்டல் ஸ்ரீரங்கம்", desc: "நிர்வாக சேவைகளின் முழுமையான டிஜிட்டல்மயமாக்கல்.", icon: 'Cpu' },
      { title: "விவசாய வளர்ச்சி", desc: "உள்ளூர் விளைபொருட்களுக்கான குளிர்சாதன கிடங்கு.", icon: 'Sprout' },
      { title: "பெண்கள் வலுவூட்டல்", desc: "10,000+ உள்ளூர் பெண் தொழில்முனைவோருக்கு வட்டியில்லா கடன்.", icon: 'Heart' },
      { title: "பாரம்பரிய சுற்றுலா", desc: "பண்டைய வேர்களைப் பாதுகாக்கும் அதே நேரத்தில் உலகத்தரம் வாய்ந்த வசதிகளை உருவாக்குதல்.", icon: 'Gem' }
    ],
    footerText: "உங்கள் ஒரு ஓட்டு – தமிழகத்தின் தலையெழுத்தையே மாற்றும்!",
    footerAddress: "12/4, வடக்கு சித்திரை வீதி, ஸ்ரீரங்கம், திருச்சி - 620006",
    footerCopyright: "© 2026 சசிகிரன் KN பிரச்சாரம். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
    footerPrivacy: "தனியுரிமைக் கொள்கை",
    footerTerms: "சேவை விதிமுறைகள்",
    quickLinks: "விரைவு இணைப்புகள்",
    contactHeading: "தொடர்பு",
    joinTitle: "இயக்கத்தில் இணையுங்கள்",
    joinStep1: "01 / அடையாளம்",
    joinStep1Title: "உங்கள் எண்ணை உள்ளிடவும்",
    joinStep1Desc: "உங்கள் அடையாளத்தைச் சரிபார்ப்பதன் மூலம் இயக்கத்துடன் உங்கள் பயணத்தைத் தொடங்குங்கள்.",
    joinStep2: "02 / சரிபார்",
    joinStep2Title: "குறியீட்டை உறுதிப்படுத்தவும்",
    joinStep2Desc: "உங்கள் மொபைல் சாதனத்திற்கு 4 இலக்க குறியீட்டை அனுப்பியுள்ளோம்.",
    joinStep3: "03 / இறுதி",
    joinStep3Title: "உங்களைப் பற்றி எங்களிடம் கூறுங்கள்",
    joinStep3Desc: "ஸ்ரீரங்கத்திற்கு சிறப்பாக சேவை செய்ய, உங்கள் நிலைப்பாடு மற்றும் உங்களை நாங்கள் எப்படி தொடர்பு கொள்ளலாம் என்பதை நாங்கள் தெரிந்து கொள்ள வேண்டும்.",
    joinNameLabel: "முழு பெயர்",
    joinVoterLabel: "வாக்காளர் அடையாள அட்டை (விருப்பமானது)",
    joinAreaLabel: "பகுதி / வார்டு",
    joinCta: "பதிவை முடிக்கவும்",
    joinBack: "திரும்பிச் செல்",
    formCategoryOptions: ["உள்கட்டமைப்பு", "சுகாதாரம்", "குடிநீர் வசதி", "மற்றவை"],
    donate: "நன்கொடை",
    joinMovement: "இயக்கத்தில் இணையுங்கள்",
    joinShort: "இணை",
    menu: "மெனு",
    loading: "ஏற்றப்படுகிறது...",
    giveMissedCall: "மிஸ்டு கால் கொடுக்கவும்:",
    or: "அல்லது",
    whatsappToNumber: "வாட்ஸ்அப் மூலம் தொடர்பு கொள்ள",
    footerNavigation: "வழிசெலுத்தல்",
    footerMore: "மேலும்",
    footerGetInTouch: "தொடர்புகொள்ள",
    phone: "தொலைபேசி",
    email: "மின்னஞ்சல்",
    address: "முகவரி",
  }
};

// ─── MOTION HELPERS ──────────────────────────────────────────────────────────
const FadeIn = ({ children, delay = 0, y = 40 }: { children: React.ReactNode; delay?: number; y?: number }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1], delay }}
  >
    {children}
  </motion.div>
);

// JoinMovementModal is imported from ./components/JoinMovementModal to handle voter and supporter registration step-by-step.

// ─── NAV LINK (active highlight) ─────────────────────────────────────────────
const NavLinkHighlight = ({
  active,
  children,
  className = '',
  lang,
  ...props
}: { active: boolean; children: React.ReactNode; className?: string; lang?: string } & React.ComponentProps<typeof Link>) => (
  <Link
    {...props}
    className={`relative inline-flex items-center ${
      lang === 'ta'
        ? 'px-1.5 py-1 font-black text-[0.62rem] md:text-[0.65rem] tracking-wide'
        : 'px-2.5 py-1.5 font-black text-[0.65rem] md:text-[0.7rem] tracking-wider'
    } uppercase whitespace-nowrap transition-colors duration-300 ${
      active ? 'nav-link-active-text' : 'text-white hover:text-[#FF8C00]'
    } ${className}`}
  >
    {active && (
      <motion.span
        layoutId="navActiveHighlight"
        className="absolute inset-0 rounded-lg bg-[#CC0000]/30 border border-[#FF8C00]/55 nav-link-active-pill"
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      />
    )}
    <span className="relative z-[1]">{children}</span>
  </Link>
);

// ─── NAVBAR ──────────────────────────────────────────────────────────────────
const getHomeSectionFromScroll = (): '' | 'about' | 'journey' => {
  const about = document.getElementById('about');
  const journey = document.getElementById('journey');
  if (!about || !journey) return '';

  const marker = window.innerHeight * 0.28;
  const journeyTop = journey.getBoundingClientRect().top;
  const aboutTop = about.getBoundingClientRect().top;

  if (journeyTop <= marker) return 'journey';
  if (aboutTop <= marker) return 'about';
  return '';
};

const Navbar = ({ t, lang, setLang, onJoin, onDonate }: any) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<'' | 'about' | 'journey'>('');
  const scrollLockRef = useRef(0);
  const { scrollYProgress } = useScroll();
  const location = useLocation();

  const lockNavHighlight = (section: '' | 'about' | 'journey' = '') => {
    scrollLockRef.current = Date.now() + 1400;
    setActiveSection(section);
  };

  const scrollToSection = (e: React.MouseEvent, sectionId: 'about' | 'journey') => {
    lockNavHighlight(sectionId);
    setMenuOpen(false);
    if (location.pathname === '/') {
      e.preventDefault();
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `#${sectionId}`);
    }
  };

  const goHomeTop = (e: React.MouseEvent) => {
    lockNavHighlight('');
    setMenuOpen(false);
    if (location.pathname === '/') {
      e.preventDefault();
      window.history.pushState(null, '', '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const resolveActiveNavId = (): string => {
    const path = location.pathname;
    if (path.startsWith('/constituency') || path === '/manifesto' || path.startsWith('/groundwork')) return 'issues';
    if (path === '/agenda') return 'agenda';
    if (path === '/contact') return 'contact';
    if (path !== '/') return '';

    const hash = location.hash.replace('#', '');
    const locked = Date.now() < scrollLockRef.current;

    if (locked) {
      if (activeSection) return activeSection;
      if (hash === 'about' || hash === 'journey') return hash;
      return 'hero';
    }
    if (activeSection === 'about' || activeSection === 'journey') return activeSection;
    if (hash === 'about' || hash === 'journey') return hash;
    return 'hero';
  };

  const isNavActive = (navId: string) => resolveActiveNavId() === navId;

  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection('');
      return;
    }

    const hash = location.hash.replace('#', '');
    if (hash === 'about' || hash === 'journey') {
      setActiveSection(hash);
      scrollLockRef.current = Date.now() + 1400;
    }

    const onScroll = () => {
      if (Date.now() < scrollLockRef.current) return;
      setActiveSection(getHomeSectionFromScroll());
    };

    const raf = requestAnimationFrame(onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", v => setScrolled(v > 0.02));
    return unsub;
  }, [scrollYProgress]);

  const navBgClass = scrolled
    ? 'bg-gradient-to-b from-black via-black/85 to-transparent shadow-lg py-2'
    : 'bg-gradient-to-b from-transparent via-transparent to-transparent py-4';

  const textClass = 'text-white';

  return (
    <>
      <motion.div className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[9999]" style={{ scaleX: scrollYProgress, backgroundColor: '#CC0000' }} />
      <nav className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${navBgClass}`}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex items-center justify-between">
          <Link to="/" onClick={goHomeTop} className="flex items-center gap-2.5 md:gap-3 flex-shrink-0 bg-gray-100 p-1.5 md:p-2 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 drop-shadow-md animate-fade-in">
            <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
              <img src={logoImg} alt="Logo" className="max-h-full max-w-full object-contain" />
            </div>
            <div className="pr-1.5 md:pr-2.5">
              <div className="font-black text-sm md:text-base leading-none tracking-[0px]" style={{ color: '#FF8C00' }}>Shashikiran KN</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className={`hidden xl:flex items-center ${lang === 'ta' ? 'gap-1.5' : 'gap-3'}`}>
            {t.nav.map((item: string, i: number) => {
              if (t.navIds[i] === 'manifesto' || t.navIds[i] === 'groundwork') return null;

              if (t.navIds[i] === 'issues') {
                const manifestoIdx = t.navIds.indexOf('manifesto');
                const groundworkIdx = t.navIds.indexOf('groundwork');
                return (
                  <div key={i} className="relative group">
                    <Link to="/constituency" onClick={() => { scrollLockRef.current = 0; setActiveSection(''); }} className={`relative flex items-center gap-1 ${lang === 'ta' ? 'px-1.5 py-1 text-[0.62rem] md:text-[0.65rem] tracking-wide' : 'px-2.5 py-1.5 text-[0.7rem] tracking-wider'} font-black whitespace-nowrap uppercase transition-colors ${isNavActive('issues') ? 'nav-link-active-text' : `${textClass} hover:text-[#FF8C00]`}`}>
                      {isNavActive('issues') && (
                        <motion.span layoutId="navActiveHighlight" className="absolute inset-0 rounded-lg bg-[#CC0000]/30 border border-[#FF8C00]/55 nav-link-active-pill" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
                      )}
                      <span className="relative z-[1] flex items-center gap-1">
                        {item}
                        <ChevronRight size={12} className="rotate-90 group-hover:rotate-[270deg] transition-transform" />
                      </span>
                    </Link>
                    <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                      <div className="bg-white rounded-2xl p-2 shadow-2xl min-w-[200px] border border-gray-100">
                        <Link
                           to="/manifesto"
                          className="block px-6 py-3 text-gray-800 font-black text-[0.7rem] hover:bg-orange-50 hover:text-[#CC0000] rounded-xl transition-all uppercase tracking-wider"
                        >
                          {t.nav[manifestoIdx]}
                        </Link>
                        <Link
                          to="/groundwork"
                          className="block px-6 py-3 text-gray-800 font-black text-[0.7rem] hover:bg-orange-50 hover:text-[#CC0000] rounded-xl transition-all uppercase tracking-wider"
                        >
                          {t.nav[groundworkIdx]}
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              }

              if (t.navIds[i] === 'hero') {
                return (
                  <NavLinkHighlight key={i} to="/" onClick={goHomeTop} active={isNavActive('hero')} lang={lang}>
                    {item}
                  </NavLinkHighlight>
                );
              }

              if (t.navIds[i] === 'about') {
                return (
                  <NavLinkHighlight key={i} to="/#about" onClick={(e) => scrollToSection(e, 'about')} active={isNavActive('about')} lang={lang}>
                    {item}
                  </NavLinkHighlight>
                );
              }

              if (t.navIds[i] === 'journey') {
                return (
                  <NavLinkHighlight key={i} to="/#journey" onClick={(e) => scrollToSection(e, 'journey')} active={isNavActive('journey')} lang={lang}>
                    {item}
                  </NavLinkHighlight>
                );
              }

              if (t.navIds[i] === 'agenda') {
                return (
                  <NavLinkHighlight key={i} to="/agenda" onClick={() => { scrollLockRef.current = 0; setActiveSection(''); }} active={isNavActive('agenda')} lang={lang}>
                    {item}
                  </NavLinkHighlight>
                );
              }

              if (t.navIds[i] === 'contact') {
                return (
                  <NavLinkHighlight key={i} to="/contact" onClick={() => { scrollLockRef.current = 0; setActiveSection(''); }} active={isNavActive('contact')} lang={lang}>
                    {item}
                  </NavLinkHighlight>
                );
              }

              return null;
            })}
          </div>

          {/* Right actions */}
          <div className={`flex items-center ${lang === 'ta' ? 'gap-1.5 md:gap-2.5' : 'gap-2 md:gap-4'}`}>
            {/* Language Toggle */}
            <div
              onClick={() => setLang(lang === 'en' ? 'ta' : 'en')}
              className="hidden md:flex items-center relative bg-black/40 backdrop-blur-md p-1 cursor-pointer border border-[#FF8C00]/30 overflow-hidden w-28 h-8 rounded-xl"
            >
              <motion.div
                className="absolute inset-y-1 w-[52px] bg-[#FF8C00] shadow-lg z-0 rounded-lg"
                animate={{ x: lang === 'en' ? 0 : 52 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
              <div className="relative z-10 w-full h-full grid grid-cols-2 items-center pointer-events-none text-center">
                <span className={`text-[0.6rem] font-black tracking-wider transition-all duration-300 ${lang === 'en' ? 'text-white' : 'text-white/80'}`}>EN</span>
                <span className={`text-[0.6rem] font-black tracking-wider transition-all duration-300 ${lang === 'ta' ? 'text-white' : 'text-white/80'}`}>தமிழ்</span>
              </div>
            </div>

            <button onClick={onDonate}
              className={`hidden lg:block ${
                lang === 'ta' ? 'px-3.5 py-2 text-[0.62rem] tracking-wider' : 'px-5 py-2 text-[0.65rem] tracking-widest'
              } font-black uppercase rounded-xl transition-all border border-[#CC0000] text-[#CC0000] bg-black/50 shadow-sm hover:bg-[#CC0000] hover:text-white hover:border-[#CC0000]`}>
              {t.donate}
            </button>

            <button onClick={onJoin}
              className={`text-white ${
                lang === 'ta' ? 'px-4 md:px-5 py-2 text-[0.62rem] md:text-[0.65rem] tracking-[0.02em]' : 'px-5 md:px-7 py-2 text-[0.65rem] md:text-[0.7rem] tracking-[0.05em]'
              } font-black rounded-xl border border-[#CC0000] transition-all shadow-md hover:scale-105 active:scale-95 bg-[#CC0000] whitespace-nowrap`}>
              <span className="hidden sm:inline">{t.joinMovement}</span>
              <span className="sm:hidden">{t.joinShort}</span>
            </button>

            <button className={`xl:hidden p-2 ${textClass}`} onClick={() => setMenuOpen(true)}>
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 bg-white z-[1001] flex flex-col overflow-y-auto"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <span className="font-black text-lg uppercase" style={{ color: '#FF8C00' }}>{t.menu}</span>
              <button onClick={() => setMenuOpen(false)} className="p-2"><X size={24} /></button>
            </div>
            <div className="flex flex-col px-6 py-8 gap-1">
              {(() => {
                const mobileNavActive = (navId: string) => isNavActive(navId);
                const mobileLinkClass = (navId: string) =>
                  `text-xl sm:text-2xl font-black uppercase py-3.5 px-3 rounded-xl border-b border-gray-50 transition-all ${
                    mobileNavActive(navId)
                      ? 'text-[#CC0000] bg-orange-50 shadow-[0_4px_20px_rgba(204,0,0,0.12)] border-l-4 border-l-[#CC0000] border-b-gray-100'
                      : 'text-gray-900 hover:text-[#CC0000] hover:bg-gray-50'
                  }`;
                return t.nav.map((item: string, i: number) => {
                if (t.navIds[i] === 'manifesto' || t.navIds[i] === 'groundwork') return null;

                if (t.navIds[i] === 'issues') {
                  const manifestoIdx = t.navIds.indexOf('manifesto');
                  const groundworkIdx = t.navIds.indexOf('groundwork');
                  return (
                    <div key={i} className="flex flex-col">
                      <Link to="/constituency" onClick={() => { scrollLockRef.current = 0; setActiveSection(''); setMenuOpen(false); }}
                        className={mobileLinkClass('issues')}>
                        {item}
                      </Link>
                      <Link to="/manifesto" onClick={() => setMenuOpen(false)}
                        className="text-lg font-black uppercase py-3 pl-6 border-b border-gray-50 text-gray-400 hover:text-[#CC0000] transition-colors">
                        ↳ {t.nav[manifestoIdx]}
                      </Link>
                      <Link to="/groundwork" onClick={() => setMenuOpen(false)}
                        className="text-lg font-black uppercase py-3 pl-6 border-b border-gray-50 text-gray-400 hover:text-[#CC0000] transition-colors">
                        ↳ {t.nav[groundworkIdx]}
                      </Link>
                    </div>
                  );
                }

                if (t.navIds[i] === 'about') {
                  return (
                    <Link key={i} to="/#about" onClick={(e) => scrollToSection(e, 'about')} className={mobileLinkClass('about')}>
                      {item}
                    </Link>
                  );
                }

                if (t.navIds[i] === 'journey') {
                  return (
                    <Link key={i} to="/#journey" onClick={(e) => scrollToSection(e, 'journey')} className={mobileLinkClass('journey')}>
                      {item}
                    </Link>
                  );
                }

                if (t.navIds[i] === 'hero') {
                  return (
                    <Link key={i} to="/" onClick={goHomeTop} className={mobileLinkClass('hero')}>
                      {item}
                    </Link>
                  );
                }

                if (t.navIds[i] === 'agenda') {
                  return (
                    <Link key={i} to="/agenda" onClick={() => { scrollLockRef.current = 0; setActiveSection(''); setMenuOpen(false); }} className={mobileLinkClass('agenda')}>
                      {item}
                    </Link>
                  );
                }

                if (t.navIds[i] === 'contact') {
                  return (
                    <Link key={i} to="/contact" onClick={() => { scrollLockRef.current = 0; setActiveSection(''); setMenuOpen(false); }} className={mobileLinkClass('contact')}>
                      {item}
                    </Link>
                  );
                }

                return null;
              });
              })()}
            </div>
            <div className="px-6 pb-8 mt-auto flex flex-col gap-4">
              <div className="flex gap-4">
                <button onClick={() => { setLang('en'); setMenuOpen(false); }} className={`flex-1 py-3 rounded-2xl font-black text-sm uppercase border-2 transition-colors ${lang === 'en' ? 'text-white border-2' : 'border-gray-200 text-gray-400'}`} style={lang === 'en' ? { backgroundColor: '#FF8C00', borderColor: '#FF8C00' } : {}}>English</button>
                <button onClick={() => { setLang('ta'); setMenuOpen(false); }} className={`flex-1 py-3 rounded-2xl font-black text-sm uppercase border-2 transition-colors ${lang === 'ta' ? 'text-white border-2' : 'border-gray-200 text-gray-400'}`} style={lang === 'ta' ? { backgroundColor: '#FF8C00', borderColor: '#FF8C00' } : {}}>தமிழ்</button>
              </div>
              <button onClick={() => { onJoin(); setMenuOpen(false); }} className="w-full text-white py-4 rounded-2xl font-black uppercase tracking-widest" style={{ backgroundColor: '#FF8C00' }}>{t.joinMovement}</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const HeroSection = ({ t }: any) => {
  const [current, setCurrent] = useState(0);
  const slides = t.heroSlides;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-black/30 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent z-10" />
          <picture className="w-full h-full">
            <source media="(min-width: 1024px)" srcSet={slides[current].bg} />
            <source media="(min-width: 768px)" srcSet={slides[current].tabBg} />
            <img
              src={slides[current].mobileBg}
              alt="Hero"
              className="w-full h-full object-contain md:object-cover bg-white md:bg-transparent"
            />
          </picture>
        </motion.div>
      </AnimatePresence>


      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/60 to-transparent z-10" />

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex gap-4">
        {slides.map((_: any, idx: number) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className="group relative flex items-center justify-center p-2"
          >
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${current === idx ? 'w-10' : 'bg-white/50 group-hover:bg-white/80'}`} style={current === idx ? { backgroundColor: '#FF8C00' } : {}} />
          </button>
        ))}
      </div>
    </section>
  );
};

const AboutSection = ({ t }: any) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const xTranslate = useTransform(scrollYProgress, [0, 1], ["0%", `-${(t.story.length - 1) * 100}%`]);

  return (
    <div id="about" className="scroll-mt-24">
      {/* Desktop horizontal scroll layout */}
      <section ref={containerRef} style={{ height: `${t.story.length * 200}vh` }} className="hidden lg:block relative bg-black z-0">
        <div className="sticky top-0 h-screen overflow-hidden bg-black">
          <motion.div style={{ x: xTranslate }} className="flex h-full">
            {t.story.map((item: any, i: number) => (
              <div key={i} className="relative flex-shrink-0 w-screen h-full flex items-center overflow-hidden">
                <div className="absolute inset-0">
                  <img loading="lazy" src={item.bg} alt={item.title} className="w-full h-full object-cover grayscale" />
                  <div className="absolute inset-0 bg-black/80"></div>
                  <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ backgroundColor: '#FF8C00' }}></div>
                </div>

                <div className="relative z-10 w-full h-full flex items-center px-5 sm:px-8 md:px-10 lg:px-14 xl:px-16">
                  <div className="w-full pt-20 pb-16 md:pt-0 md:pb-0 lg:w-[50%] lg:max-w-[40%] pr-2 sm:pr-6">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false, margin: "-100px" }}
                      transition={{ duration: 0.8, delay: 0.1 }}
                    >
                      <div className="flex items-center gap-3 mb-3 md:mb-5">
                        <span className="text-[#CC0000] font-black text-[0.65rem] md:text-xs tracking-[5px] uppercase">{item.chapter}</span>
                        <div className="flex-1 max-w-[100px] md:max-w-[120px] h-px bg-white/10"></div>
                      </div>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-[0.95] mb-3 md:mb-5 tracking-tight">
                        {item.title}
                      </h2>
                      <p className="font-bold text-[0.65rem] sm:text-xs md:text-sm tracking-[2px] md:tracking-[3px] uppercase mb-4 md:mb-8" style={{ color: '#FF8C00' }}>{item.subtitle}</p>
                      <p className="text-white/70 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
                        {item.text}
                      </p>
                    </motion.div>
                  </div>
                </div>

                <div className="absolute bottom-6 right-5 sm:bottom-8 sm:right-8 md:bottom-12 md:right-12 text-[4rem] sm:text-[5rem] md:text-[6rem] lg:text-[8rem] font-black text-white/5 leading-none pointer-events-none select-none">
                  {String(i + 1).padStart(2, '0')}
                </div>
              </div>
            ))}
          </motion.div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {t.story.map((_: any, i: number) => {
              const start = i / t.story.length;
              const end = (i + 1) / t.story.length;
              const scaleX = useTransform(scrollYProgress, [start, end], [0, 1]);
              const opacity = useTransform(scrollYProgress, [start, start + 0.01, end - 0.01, end], [0.3, 1, 1, 0.3]);

              return (
                <div key={i} className="relative w-12 h-1 bg-white/10 rounded-full overflow-hidden" style={{ width: '3rem' }}>
                  <motion.div
                    style={{ scaleX, opacity, backgroundColor: '#FF8C00' }}
                    className="absolute inset-0 origin-left"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mobile/Tablet vertical layout: separate container for every point story */}
      <section className="lg:hidden bg-black py-16 px-4 sm:px-6 md:px-8 space-y-8 z-0 relative">
        {t.story.map((item: any, i: number) => (
          <FadeIn key={i} delay={0.05}>
            <div className="relative bg-gradient-to-br from-[#111111] to-[#060606] border border-white/5 rounded-2xl overflow-hidden shadow-2xl p-6 sm:p-8 flex flex-col gap-6">
              {/* Decorative vertical accent bar */}
              <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ backgroundColor: '#FF8C00' }}></div>
              
              {/* Image container inside the card */}
              <div className="relative w-full h-52 sm:h-72 rounded-xl overflow-hidden group">
                <img loading="lazy" src={item.bg} alt={item.title} className="w-full h-full object-cover grayscale transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                {/* Large chapter number inside image */}
                <div className="absolute bottom-4 right-4 text-4xl sm:text-5xl font-black text-white/10 leading-none">
                  {String(i + 1).padStart(2, '0')}
                </div>
              </div>
              
              {/* Text content */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[#CC0000] font-black text-xs tracking-[4px] uppercase">{item.chapter}</span>
                  <div className="flex-1 h-px bg-white/10"></div>
                </div>
                
                <h2 className="text-xl sm:text-2xl font-black text-white leading-tight mb-2">
                  {item.title}
                </h2>
                
                <p className="font-bold text-[0.7rem] sm:text-xs tracking-[2px] uppercase mb-4" style={{ color: '#FF8C00' }}>
                  {item.subtitle}
                </p>
                
                <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                  {item.text}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </section>
    </div>
  );
};

const JourneySection = ({ t }: any) => {
  const [active, setActive] = useState(0);
  const item = t.journeyTimeline[active];
  const containerRef = useRef<HTMLDivElement>(null);

  const prevYear = () => {
    setActive((prev) => Math.max(0, prev - 1));
  };

  const nextYear = () => {
    setActive((prev) => Math.min(t.journeyTimeline.length - 1, prev + 1));
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const activeEl = container.querySelector(`[data-year-index="${active}"]`);
    if (activeEl) {
      activeEl.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [active]);

  return (
    <section id="journey" className="relative h-screen overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div key={active}
          initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img loading="lazy" src={item.img} alt={item.title} className="w-full h-full object-cover grayscale" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 h-full flex flex-col justify-center pb-28 md:pb-0 px-8 md:px-20 max-w-3xl">
        <FadeIn y={10}>
          <span className="text-[#CC0000] font-black text-xs tracking-[6px] uppercase block mb-8">{t.journeyTitle}</span>
        </FadeIn>
        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="text-[4rem] sm:text-[5rem] md:text-[8rem] lg:text-[8rem] font-black text-white/10 leading-none mb-[-0.5rem] md:mb-[-1rem]">{item.year}</div>
            <h2 className="text-3xl md:text-6xl lg:text-6xl font-black text-white leading-tight mb-4 md:mb-6 tracking-tight">
              {item.title}
            </h2>
            {item.tag && (
              <p className="font-bold text-xs md:text-sm tracking-[2px] md:tracking-[3px] uppercase mb-4" style={{ color: '#FF8C00' }}>
                {item.tag}
              </p>
            )}
            <p className="text-white/65 text-sm md:text-xl leading-relaxed max-w-xl">{item.desc}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" style={{ height: '100px' }} />
      <div className="absolute bottom-0 left-0 right-0 z-30 pb-0 pt-10">
        <div className="relative max-w-[1400px] mx-auto px-12 md:px-16 flex items-center justify-between">
          {/* Left Navigation Button */}
          <button
            onClick={prevYear}
            disabled={active === 0}
            className="absolute left-2 md:left-4 z-40 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:text-[#FF8C00] hover:border-[#FF8C00] bg-black/60 backdrop-blur-sm transition-colors duration-300 disabled:opacity-20 disabled:pointer-events-none"
            aria-label="Previous Year"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Timeline Scroll Container */}
          <div
            ref={containerRef}
            className="w-full overflow-x-auto no-scrollbar flex items-end justify-start md:justify-center relative px-6 py-2"
          >
            <div className="flex items-end justify-between w-full min-w-[600px] md:min-w-full relative z-10 h-16 pb-0">
              {t.journeyTimeline.map((it: any, i: number) => {
                const isSelected = active === i;
                return (
                  <React.Fragment key={i}>
                    {/* Year Button */}
                    <div
                      data-year-index={i}
                      onClick={() => setActive(i)}
                      className="relative flex flex-col items-center justify-end group cursor-pointer px-4 md:px-6 select-none"
                    >
                      <span className={`font-black text-sm md:text-base mb-2 transition-all duration-300 ${isSelected ? 'text-[#FF8C00] font-extrabold scale-110' : 'text-white/40 group-hover:text-white'}`}>
                        {it.year}
                      </span>
                      
                      {/* Major Vertical Tick (Graph Line) */}
                      <div className={`w-[2px] h-3.5 transition-all duration-300 ${isSelected ? 'bg-[#FF8C00] h-4.5 shadow-[0_0_8px_rgba(255,140,0,0.8)]' : 'bg-white/45 group-hover:bg-white/70'}`} />
                    </div>

                    {/* Minor Ticks between Year Nodes */}
                    {i < t.journeyTimeline.length - 1 && (
                      <div className="flex-grow flex items-end justify-between px-0.5 min-w-[20px] md:min-w-[40px] h-3">
                        <div className="w-[0.5px] h-1.5 bg-white/25" />
                        <div className="w-[0.5px] h-1.5 bg-white/25" />
                        <div className="w-[0.5px] h-1.5 bg-white/25" />
                        <div className="w-[0.5px] h-1.5 bg-white/25" />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Right Navigation Button */}
          <button
            onClick={nextYear}
            disabled={active === t.journeyTimeline.length - 1}
            className="absolute right-2 md:right-4 z-40 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:text-[#FF8C00] hover:border-[#FF8C00] bg-black/60 backdrop-blur-sm transition-colors duration-300 disabled:opacity-20 disabled:pointer-events-none"
            aria-label="Next Year"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};



// ─── FOOTER ───────────────────────────────────────────────────────────────────
const Footer = ({ t }: any) => (
  <footer className="bg-black text-white pt-20 pb-8 relative overflow-hidden border-t border-white/5">
    <div className="max-w-[1400px] mx-auto px-6 md:px-16">
      {/* Main content grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-8">
        {/* Brand section */}
        <div className="md:col-span-1">
          <FadeIn>
            <div className="flex items-center gap-2 mb-8">
              <img src={logoImg} alt="Logo" className="w-20 h-auto" />
              <div>
                <div className="font-black text-lg text-[#FF8C00] leading-none tracking-tight">Shashikiran KN</div>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed font-medium mb-8">{t.footerText}</p>

            {/* Social icons */}
            <div className="flex items-center flex-wrap gap-4">
              {[
                { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61570864402762', label: 'Facebook' },
                { icon: Instagram, href: 'https://instagram.com/shashikiran_srirangam/', label: 'Instagram' },
                { icon: Youtube, href: 'https://www.youtube.com/@shashikiransrirangam', label: 'YouTube' }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ y: -3 }}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-[#CC0000] hover:text-[#CC0000] transition-colors duration-300"
                >
                  <social.icon size={16} />
                </motion.a>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Quick Links */}
        <div>
          <FadeIn delay={0.1}>
            <h4 className="text-xs font-black tracking-[3px] mb-8 text-[#CC0000] uppercase">{t.footerNavigation}</h4>
            <div className="flex flex-col gap-3">
              {t.nav.slice(0, 4).map((link: string, i: number) => {
                const id = t.navIds[i];
                const to = id === 'hero' ? '/' : id === 'issues' ? '/constituency' : id === 'about' ? '/#about' : id === 'journey' ? '/#journey' : (['agenda', 'manifesto', 'contact'].includes(id) ? `/${id}` : id === 'groundwork' ? '/groundwork' : `/#${id}`);

                return (
                  <Link key={i} to={to} className="text-white/50 text-sm font-medium hover:text-[#CC0000] transition-colors duration-300">
                    {link}
                  </Link>
                );
              })}
            </div>
          </FadeIn>
        </div>

        {/* More Links */}
        <div>
          <FadeIn delay={0.2}>
            <h4 className="text-xs font-black tracking-[3px] mb-8 text-[#CC0000] uppercase">{t.footerMore}</h4>
            <div className="flex flex-col gap-3">
              {t.nav.slice(4).map((link: string, i: number) => {
                const id = t.navIds[i + 4];
                const to = id === 'hero' ? '/' : id === 'issues' ? '/constituency' : id === 'groundwork' ? '/groundwork' : id === 'about' ? '/#about' : id === 'journey' ? '/#journey' : (['agenda', 'manifesto', 'contact'].includes(id) ? `/${id}` : `/#${id}`);

                return (
                  <Link key={i + 4} to={to} className="text-white/50 text-sm font-medium hover:text-[#CC0000] transition-colors duration-300">
                    {link}
                  </Link>
                );
              })}
            </div>
          </FadeIn>
        </div>

        {/* Contact Info */}
        <div>
          <FadeIn delay={0.3}>
            <h4 className="text-xs font-black tracking-[3px] mb-8 text-[#CC0000] uppercase">{t.footerGetInTouch}</h4>
            <div className="flex flex-col gap-5">
              <div className="text-sm">
                <div className="text-[0.7rem] font-black text-white/30 uppercase tracking-wider mb-1">{t.phone}</div>
                <a href="tel:+919688162147" className="text-white/50 hover:text-[#CC0000] font-medium transition-colors">+91 96881 62147</a>
              </div>
              <div className="text-sm">
                <div className="text-[0.7rem] font-black text-white/30 uppercase tracking-wider mb-1">{t.email}</div>
                <a href="mailto:nsptn2031@gmail.com" className="text-white/50 hover:text-[#CC0000] font-medium transition-colors">nsptn2031@gmail.com</a>
              </div>
              <div className="text-sm">
                <div className="text-[0.7rem] font-black text-white/30 uppercase tracking-wider mb-1">{t.address}</div>
                <p className="text-white/50 font-medium text-xs leading-snug">{t.footerAddress}</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>



      {/* Bottom bar */}
      <div className="border-t border-white/5 pt-6 text-center">
        <p className="text-xs text-white/20 font-bold tracking-wider">{t.footerCopyright}</p>
      </div>
    </div>

    {/* Subtle background accent */}
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#CC0000]/5 blur-[100px] pointer-events-none rounded-full"></div>
  </footer>
);

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
const HomePage = ({ t }: { t: any }) => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const timer = setTimeout(() => {
        const id = location.hash.replace('#', '');
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
      return () => clearTimeout(timer);
    }
    if (location.pathname === '/') {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  return (
    <>
      <HeroSection t={t} />
      <AboutSection t={t} />
      <JourneySection t={t} />
    </>
  );
};

// ─── LOADING FALLBACK ────────────────────────────────────────────────────────
const LoadingFallback = ({ t }: { t: any }) => (
  <div className="w-full h-screen flex items-center justify-center bg-white">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-gray-100 border-t-[#CC0000] rounded-full animate-spin" />
      <div className="text-xs font-black tracking-[3px] text-gray-500 uppercase">{t.loading}</div>
    </div>
  </div>
);

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
const App = () => {
  const [lang, setLang] = useState<'en' | 'ta'>('en');
  const [showPopup, setShowPopup] = useState(false);
  const [showDonatePopup, setShowDonatePopup] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = translations[lang];
  const location = useLocation();

  useEffect(() => {
    document.title = lang === 'ta' ? "சசிகிரன் 2026 | ஸ்ரீரங்கத்தின் குரல்" : "Shashikiran 2026 | Voice of Srirangam";
    const onScroll = () => setScrolled(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });

    // Listen for custom popup open event
    const handleOpenPopup = () => setShowPopup(true);
    const handleOpenDonatePopup = () => setShowDonatePopup(true);
    window.addEventListener('open-join-popup', handleOpenPopup);
    window.addEventListener('open-donate-popup', handleOpenDonatePopup);

    // Only show popup automatically on homepage
    let timer: ReturnType<typeof setTimeout>;
    if (location.pathname === '/') {
      timer = setTimeout(() => setShowPopup(true), 6000);
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('open-join-popup', handleOpenPopup);
      window.removeEventListener('open-donate-popup', handleOpenDonatePopup);
      if (timer) clearTimeout(timer);
    };
  }, [lang, location.pathname]);

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <div className={`w-full bg-white text-black min-h-screen ${lang === 'ta' ? 'font-tamil' : ''}`}>
      <Navbar t={t} lang={lang} setLang={setLang} onJoin={() => setShowPopup(true)} onDonate={() => setShowDonatePopup(true)} />
      <AnimatePresence>
        {showPopup && <JoinMovementModal isOpen={showPopup} onClose={() => setShowPopup(false)} lang={lang} />}
        {showDonatePopup && <DonateModal isOpen={showDonatePopup} onClose={() => setShowDonatePopup(false)} lang={lang} />}
      </AnimatePresence>

      <React.Suspense fallback={<LoadingFallback t={t} />}>
        <Routes>
          <Route path="/" element={<HomePage t={t} />} />
          <Route path="/about" element={<Navigate to={{ pathname: '/', hash: '#about' }} replace />} />
          <Route path="/journey" element={<Navigate to={{ pathname: '/', hash: '#journey' }} replace />} />
          <Route path="/agenda" element={<AgendaPage lang={lang} />} />
          <Route path="/constituency" element={<ConstituencyPage lang={lang} />} />
          <Route path="/manifesto" element={<ManifestoPage lang={lang} />} />
          <Route path="/contact" element={<ContactPage lang={lang} />} />
          <Route path="/groundwork" element={<GroundworkPage lang={lang} />} />
          <Route path="/groundwork/:slug" element={<BlogDetailPage lang={lang} />} />
        </Routes>
      </React.Suspense>

      <Footer t={t} />

      <ConstituencyVoiceWidget lang={lang} />

      {/* Scroll to top */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-10 right-6 md:right-10 w-12 h-12 rounded-full bg-white border border-gray-200 shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-50 z-50 transition-colors"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;