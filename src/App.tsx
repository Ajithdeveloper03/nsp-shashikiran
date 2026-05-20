import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  Phone, Camera, MessageCircle, Share2,
  Globe,
  ArrowUp, Menu, X, ChevronRight
} from 'lucide-react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
const AboutMePage = React.lazy(() => import('./pages/AboutMePage'));
const JourneyPage = React.lazy(() => import('./pages/JourneyPage'));
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
import joinHeaderImg from './assets/join-header.png';
import shashi1 from './assets/shashi1.png';
import shashi2 from './assets/shashi2.png';
import shashi3 from './assets/shashi3.png';
import shashi4 from './assets/shashi4.png';
import about1 from './assets/about1.jpeg';
import about2 from './assets/about2.jpeg';
import about3 from './assets/about3.jpeg';
import about4 from './assets/about4.jpeg';
// import shashi5 from './assets/shashi5.png';
import shashi6 from './assets/home 2008.png';
import shashi7 from './assets/home 2011.png';
import shashi8 from './assets/home 2015.png';
import shashi9 from './assets/home 2018.png';
import shashi10 from './assets/home 2019.png';
import shashi11 from './assets/home 2020.png';
import shashi12 from './assets/home 2026.png';


// ─── TRANSLATIONS ────────────────────────────────────────────────────────────
const translations = {
  en: {
    nav: ["Home", "About Me", "My Journey", "Agenda 2031", "My Manifestos", "My Constituency", "Ground Work", "Contact"],
    navIds: ['hero', 'about', 'journey', 'agenda', 'manifesto', 'issues', 'groundwork', 'contact'],
    story: [
      {
        chapter: "01",
        year: "Student",
        title: "A Student of History & Spirituality",
        subtitle: "Ethics & Culture",
        text: "Having studied at Ramakrishna School, he holds a deep love for Indian culture and agriculture. As a devotee of Lord Krishna, he is passionate about bringing 'Dharma' (ethics and duty) into the world of politics.",
        bg: about3,
        accent: "#CC0000"
      },
      {
        chapter: "02",
        year: "Expert",
        title: "A Professional Architect of Policy",
        subtitle: "Systematic Mindset",
        text: "He is not just a politician but a highly qualified professional. With degrees in Mechanical Engineering, MBA, and Public Administration, he approaches every social problem with a practical and systematic mindset.",
        bg: about4,
        accent: "#CC0000"
      },
      {
        chapter: "03",
        year: "Finance",
        title: "The Financial Expert",
        subtitle: "Mechanics of Money",
        text: "As a Certified Financial Planner and Investment Banker, he understands the 'mechanics of money.' His primary focus is on solving the economic struggles of the common people and improving their financial well-being.",
        bg: about2,
        accent: "#CC0000"
      },
      {
        chapter: "04",
        year: "Integrity",
        title: "The Man of Integrity",
        subtitle: "Principles Over Power",
        text: "Despite receiving many offers to join major political parties, he chose to stay independent. He stands firm in his 'National Socialist' ideology, prioritizing his principles over easy political power.",
        bg: about1,
        accent: "#CC0000"
      },
    ],
    heroSlides: [
      {
        title: "The Vision",
        subtitle: "Transforming Tamil Nadu with National Pride",
        desc: "A journey of dedication that started in 2011, driven by a vision for true national development.",
        bg: heroBgImg3
      },
      {
        title: "The Mission",
        subtitle: "Politics is a Tool for Social Change",
        desc: "Implementing the principles of Nationalism and Socialism to build a self-reliant state.",
        bg: heroBgImg2
      },
      {
        title: "The Promise",
        subtitle: "Transparency Through Digital Governance",
        desc: "Eliminating corruption through technology and ensuring free education and healthcare for all.",
        bg: heroBgImg
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
    journeyTitle: "MY JOURNEY — THE TIMELINE OF ACTION",
    journeyTimeline: [
      { year: "2008", title: "The Spark", desc: "Discovered Yoga and a passion for reading, which helped him understand himself and the world more clearly.", img: shashi6 },
      { year: "2011", title: "The Commitment", desc: "At the young age of 17, he made a life-altering decision to dedicate his entire life to the service of the nation.", img: shashi7 },
      { year: "2015", title: "Academic Excellence", desc: "To understand the depth of Indian administration, he joined the IAS Academy. He mastered the core pillars: History, Polity, and Economics, gaining legal knowledge to draft better policies.", img: shashi8 },
      { year: "2018", title: "Professional Mastery", desc: "Achieved global standards as a CFP and Investment Banker. Founded Sarathi Groups, proving his capability as a strategic entrepreneur and a self-reliant leader.", img: shashi9 },
      { year: "2019", title: "Social Welfare Trust", desc: "Registered the NS Social Welfare Trust, launching impactful grassroots initiatives with the belief that 'service comes before power.'", img: shashi10 },
      { year: "2020", title: "Political Launch", desc: "Inspired by the revolutionary vision of Netaji Subhash Chandra Bose, he founded the National Socialist Party.", img: shashi11 },
      { year: "2026", title: "Srirangam Mission", desc: "Stepped directly into the Srirangam Constituency to work with the people at the grassroots level and bring real change to their lives.", img: shashi12 }
    ],
    agendaTitle: "AGENDA 2031",
    agendaDesc: "A futuristic blueprint for the holistic development of Srirangam, blending heritage with high-tech infrastructure.",
    agendaItems: [
      { title: "Smarter Srirangam", desc: "100% digital governance and high-speed public connectivity.", img: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg" },
      { title: "Eco-Heritage Hub", desc: "Transforming the riverfront into a world-class eco-tourism destination.", img: "https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg" },
      { title: "Innovation Valley", desc: "Establishing a specialized AI and Robotics park to foster local talent.", img: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg" }
    ],
    manifestoTitle: "MY MANIFESTOS",
    manifestoContent: "My commitment is based on transparency, safety, and prosperity for every citizen of Srirangam. We will ensure direct accountability and immediate grievance resolution.",
    manifestoItems: ["Water for Every Household", "Zero Unemployment Initiative", "24/7 Women Safety Command Center", "World-class Healthcare Access"],
    visionItems: [
      { title: "Digital Srirangam", desc: "Complete digitization of administrative services for transparent governance.", icon: 'Cpu' },
      { title: "Agricultural Growth", desc: "State-of-the-art cold storage and export hub for local produce.", icon: 'Sprout' },
      { title: "Women Empowerment", desc: "Interest-free loans and skill-training for 10,000+ local women entrepreneurs.", icon: 'Heart' },
      { title: "Heritage Tourism", desc: "Preserving our ancient roots while building world-class facilities for pilgrims.", icon: 'Gem' }
    ],
    footerText: "YOUR ONE VOTE – WILL CHANGE THE DESTINY OF TAMIL NADU!",
    footerAddress: "12/4, North Chitra Street, Srirangam, Trichy - 620006",
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
  },
  ta: {
    nav: ["முகப்பு", "என்னை பற்றி", "எனது பயணம்", "அஜெண்டா 2031", "தேர்தல் அறிக்கை", "தொகுதி", "களப்பணி", "தொடர்பு"],
    navIds: ['hero', 'about', 'journey', 'agenda', 'manifesto', 'issues', 'groundwork', 'contact'],
    story: [
      {
        chapter: "01",
        year: "மாணவர்",
        title: "வரலாறு மற்றும் ஆன்மீக மாணவர்",
        subtitle: "நெறிமுறைகள் மற்றும் கலாச்சாரம்",
        text: "ராமகிருஷ்ணா பள்ளியில் பயின்ற இவர், இந்திய கலாச்சாரம் மற்றும் விவசாயத்தின் மீது ஆழ்ந்த அன்பு கொண்டவர். ஸ்ரீ கிருஷ்ணர் மீது பக்தி கொண்ட இவர், அரசியலில் 'தர்மத்தை' கொண்டு வருவதில் ஆர்வம் கொண்டவர்.",
        bg: shashi1,
        accent: "#CC0000"
      },
      {
        chapter: "02",
        year: "நிபுணர்",
        title: "கொள்கைகளின் தொழில்முறை வடிவமைப்பாளர்",
        subtitle: "முறையான மனநிலை",
        text: "இவர் ஒரு அரசியல்வாதி மட்டுமல்ல, உயர்தகுதி பெற்ற ஒரு தொழில்முறை வல்லுநர். மெக்கானிக்கல் இன்ஜினியரிங், எம்பிஏ மற்றும் பொது நிர்வாகத்தில் பட்டங்கள் பெற்றுள்ள இவர், ஒவ்வொரு சமூகப் பிரச்சனையையும் ஒரு முறையான மனநிலையுடன் அணுகுகிறார்.",
        bg: shashi2,
        accent: "#CC0000"
      },
      {
        chapter: "03",
        year: "நிதி",
        title: "நிதி நிபுணர்",
        subtitle: "பணத்தின் இயக்கவியல்",
        text: "சான்றளிக்கப்பட்ட நிதித் திட்டமிடுபவர் மற்றும் முதலீட்டு வங்கியாளராக, இவர் 'பணத்தின் இயக்கவியலை' புரிந்துகொள்கிறார். இவருடைய முதன்மையான கவனம் சாமானிய மக்களின் பொருளாதாரப் போராட்டங்களைத் தீர்ப்பதாகும்.",
        bg: shashi3,
        accent: "#CC0000"
      },
      {
        chapter: "04",
        year: "நேர்மை",
        title: "நேர்மையாளர்",
        subtitle: "அதிகாரத்தை விட கொள்கையே முக்கியம்",
        text: "முக்கிய அரசியல் கட்சிகளில் சேர பல வாய்ப்புகள் வந்தபோதிலும், இவர் சுயாதீனமாக இருக்கத் தேர்ந்தெடுத்தார். தனது 'தேசிய சோசலிச' சித்தாந்தத்தில் உறுதியாக நின்று, தனது கொள்கைகளுக்கு முன்னுரிமை அளிக்கிறார்.",
        bg: shashi4,
        accent: "#CC0000"
      },
    ],
    heroSlides: [
      {
        title: "தொலைநோக்குப்பார்வை",
        subtitle: "தேசியப் பெருமையுடன் தமிழகத்தை மாற்றுதல்",
        desc: "2011 இல் தொடங்கிய அர்ப்பணிப்புப் பயணம், உண்மையான தேசிய வளர்ச்சிக்கான ஒரு தொலைநோக்குப் பார்வையால் இயக்கப்படுகிறது.",
        bg: heroBgImg
      },
      {
        title: "லட்சியம்",
        subtitle: "அரசியல் என்பது சமூக மாற்றத்திற்கான ஒரு கருவி",
        desc: "சுயசார்பு மாநிலத்தை உருவாக்க தேசியம் மற்றும் சோசலிசத்தின் கொள்கைகளை செயல்படுத்துதல்.",
        bg: heroBgImg2
      },
      {
        title: "வாக்குறுதி",
        subtitle: "டிஜிட்டல் நிர்வாகத்தின் மூலம் வெளிப்படைத்தன்மை",
        desc: "தொழில்நுட்பத்தின் மூலம் ஊழலை ஒழித்தல் மற்றும் அனைவருக்கும் இலவச கல்வி மற்றும் சுகாதாரத்தை உறுதி செய்தல்.",
        bg: heroBgImg3
      }
    ],
    candidateName: "சசிகிரண் கே.என்",
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
      { name: "அருள் மணி", role: "விவசாயி, ஸ்ரீரங்கம்", text: "நிச்சயமாக எங்கள் வலியைப் புரிந்துகொள்ளும் ஒருவர். கடன் தள்ளுபடி திட்டம் எங்களுக்கு வரப்பிரசாதம்." },
      { name: "மீனாட்சி ஆர்.", role: "மாணவி", text: "ஐடி ஹப் திட்டம் எங்களுக்கு நம்பிக்கையைத் தருகிறது." },
      { name: "ராஜேஷ் கண்ணன்", role: "சிறு வணிகர்", text: "அவர் பேசுவது மட்டுமல்ல, செயல்படுபவர். இந்த மண்ணின் மீதான அவரது அர்ப்பணிப்பு நிகரற்றது." }
    ],
    journeyTitle: "எனது பயணம் — செயல்பாடுகளின் காலவரிசை",
    journeyTimeline: [
      { year: "2008", title: "பொறி", desc: "யோகா மற்றும் வாசிப்பு மீதான ஆர்வத்தைக் கண்டறிந்தார், இது தன்னையும் உலகத்தையும் இன்னும் தெளிவாகப் புரிந்துகொள்ள உதவியது.", img: shashi6 },
      { year: "2011", title: "அர்ப்பணிப்பு", desc: "17 வயதில், தனது முழு வாழ்க்கையையும் தேசத் தொண்டுக்காக அர்ப்பணிக்க ஒரு முக்கியமான முடிவை எடுத்தார்.", img: shashi4 },
      { year: "2015", title: "கல்வித் தகுதி", desc: "இந்திய நிர்வாகத்தின் ஆழத்தைப் புரிந்துகொள்வதற்காக, ஐஏஎஸ் அகாடமியில் சேர்ந்தார். வரலாறு, அரசியல் மற்றும் பொருளாதாரம் ஆகியவற்றில் தேர்ச்சி பெற்றார்.", img: shashi3 },
      { year: "2018", title: "தொழில்முறை மேதமை", desc: "CFP மற்றும் முதலீட்டு வங்கியாளராக உலகளாவிய தரங்களை அடைந்தார். 'சாரதி குரூப்ஸ்' நிறுவனத்தை நிறுவி, தனது தொழில்முனைவோர் திறனை நிரூபித்தார்.", img: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg" },
      { year: "2019", title: "சமூக நல அறக்கட்டளை", desc: "என்.எஸ் சமூக நல அறக்கட்டளையைப் பதிவு செய்தார். 'அதிகாரத்திற்கு முன் சேவை' என்ற கொள்கையுடன் பல திட்டங்களைத் தொடங்கினார்.", img: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg" },
      { year: "2020", title: "அரசியல் தொடக்கம்", desc: "நேதாஜி சுபாஷ் சந்திர போஸின் தொலைநோக்குப் பார்வையால் ஈர்க்கப்பட்டு, நேஷனல் சோசியலிஸ்ட் கட்சியைத் தொடங்கினார்.", img: "https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg" },
      { year: "2026", title: "ஸ்ரீரங்கம் லட்சியம்", desc: "ஸ்ரீரங்கம் தொகுதியில் நேரடியாகக் களமிறங்கி, மக்களின் வாழ்க்கையில் உண்மையான மாற்றத்தைக் கொண்டுவர அடிமட்ட அளவில் பணியாற்றினார்.", img: "https://images.pexels.com/photos/4064826/pexels-photo-4064826.jpeg" }
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
    footerText: "உங்கள் ஒரு ஓட்டு – தமிழகத்தின் தலையெழுத்தையே மாத்தும்!",
    footerAddress: "12/4, வடக்கு சித்திரை வீதி, ஸ்ரீரங்கம், திருச்சி - 620006",
    footerCopyright: "© 2026 சசிகிரண் கே.என் பிரச்சாரம். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
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

// ─── FULL SCREEN JOIN VIEW ──────────────────────────────────────────────────
const FullScreenJoin = ({ isOpen, onClose, t }: { isOpen: boolean; onClose: () => void; t: any }) => {
  const resetJoin = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
      onClick={resetJoin}
    >
      {/* Blurred backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

      {/* Modal card */}
      <motion.div
        className="relative z-10 w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl"
        initial={{ scale: 0.88, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 26, stiffness: 260 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header image strip */}
        <div className="relative h-28 w-full">
          <img src={joinHeaderImg} alt="Movement" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" />
          {/* Close button */}
          <button
            onClick={resetJoin}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors"
          >
            <X size={16} />
          </button>
          {/* Logo badge */}
          <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 w-14 h-14 bg-white rounded-full shadow-lg border-2 border-white flex items-center justify-center z-10">
            <img src={logoImg} alt="Logo" className="w-full h-auto" />
          </div>
        </div>

        {/* Body */}
        <div className="px-6 pt-10 pb-6 flex flex-col items-center gap-4">
          <h2 className="text-xl font-black text-gray-800 text-center tracking-tight">{t.joinTitle}</h2>

          {/* Missed Call */}
          <div className="w-full flex flex-col items-center gap-2">
            <p className="text-[0.7rem] font-black text-[#FF8C00] uppercase tracking-widest">Give A Missed Call On</p>
            <div className="w-full bg-orange-50 border border-dashed border-[#FF8C00]/40 rounded-2xl py-4 px-5 text-center">
              <div className="flex items-center justify-center gap-2 text-base font-black text-gray-800">
                <Phone size={16} className="text-[#FF8C00]" fill="currentColor" />
                88 00 00 2024
              </div>
            </div>
          </div>

          {/* OR divider */}
          <div className="flex items-center gap-3 w-full">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-[0.6rem] font-black text-gray-400 uppercase tracking-widest">OR</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {/* WhatsApp */}
          <div className="w-full flex flex-col items-center gap-2">
            <p className="text-[0.7rem] font-black text-green-600 uppercase tracking-widest">WhatsApp To This Number</p>
            <a
              href="https://wa.me/918800002024"
              className="w-full bg-green-50 border border-dashed border-green-500/40 rounded-2xl py-4 px-5 text-center flex items-center justify-center gap-2 hover:bg-green-100 transition-colors"
            >
              <MessageCircle size={16} className="text-green-500" fill="currentColor" />
              <span className="text-base font-black text-gray-800">88 00 00 2024</span>
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── NAVBAR ──────────────────────────────────────────────────────────────────
const Navbar = ({ t, lang, setLang, onJoin, onDonate }: any) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const location = useLocation();

  useEffect(() => {
    const unsub = scrollYProgress.on("change", v => setScrolled(v > 0.02));
    return unsub;
  }, [scrollYProgress]);

  const navBgClass = scrolled
    ? 'bg-black/90 shadow-lg py-2'
    : 'bg-transparent py-4';

  const textClass = 'text-white';
  const logoTextClass = 'text-white';

  return (
    <>
      <motion.div className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[9999]" style={{ scaleX: scrollYProgress, backgroundColor: '#CC0000' }} />
      <nav className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 backdrop-blur-md ${navBgClass}`}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 flex-shrink-0 drop-shadow-md">
            <img src={logoImg} alt="Logo" className="w-12 md:w-16 h-auto" />
            <div>
              <div className={`font-black text-sm md:text-base leading-none tracking-tight ${logoTextClass}`} style={{ color: '#FF8C00' }}>Shashikiran KN</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden xl:flex items-center gap-6">
            {t.nav.map((item: string, i: number) => {
              // Skip "My Manifestos" as it will be a submenu of "My Constituency"
              if (t.navIds[i] === 'manifesto') return null;

              if (t.navIds[i] === 'issues') {
                const manifestoIdx = t.navIds.indexOf('manifesto');
                return (
                  <div key={i} className="relative group">
                    <Link to="/constituency" className={`flex items-center gap-1 ${textClass} font-black text-[0.7rem] hover:text-[#CC0000] transition-colors whitespace-nowrap uppercase tracking-wider ${location.pathname === '/constituency' ? 'text-[#CC0000]' : ''}`}>
                      {item}
                      <ChevronRight size={12} className="rotate-90 group-hover:rotate-[270deg] transition-transform" />
                    </Link>
                    {/* Dropdown */}
                    <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                      <div className="bg-white rounded-2xl p-2 shadow-2xl min-w-[200px] border border-gray-100">
                        <Link
                          to="/manifesto"
                          className="block px-6 py-3 text-gray-800 font-black text-[0.7rem] hover:bg-orange-50 hover:text-[#CC0000] rounded-xl transition-all uppercase tracking-wider"
                        >
                          {t.nav[manifestoIdx]}
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              }

              const isLinkActive = (path: string) => location.pathname === path;

              if (t.navIds[i] === 'about') {
                return (
                  <Link key={i} to="/about"
                    className={`${textClass} font-black text-[0.7rem] hover:text-[#CC0000] transition-colors whitespace-nowrap uppercase tracking-wider ${isLinkActive('/about') ? 'text-[#CC0000]' : ''}`}>
                    {item}
                  </Link>
                );
              }

              if (t.navIds[i] === 'journey') {
                return (
                  <Link key={i} to="/journey"
                    className={`${textClass} font-black text-[0.7rem] hover:text-[#CC0000] transition-colors whitespace-nowrap uppercase tracking-wider ${isLinkActive('/journey') ? 'text-[#CC0000]' : ''}`}>
                    {item}
                  </Link>
                );
              }

              if (t.navIds[i] === 'agenda') {
                return (
                  <Link key={i} to="/agenda"
                    className={`${textClass} font-black text-[0.7rem] hover:text-[#CC0000] transition-colors whitespace-nowrap uppercase tracking-wider ${isLinkActive('/agenda') ? 'text-[#CC0000]' : ''}`}>
                    {item}
                  </Link>
                );
              }

              if (t.navIds[i] === 'contact') {
                return (
                  <Link key={i} to="/contact"
                    className={`${textClass} font-black text-[0.7rem] hover:text-[#CC0000] transition-colors whitespace-nowrap uppercase tracking-wider ${isLinkActive('/contact') ? 'text-[#CC0000]' : ''}`}>
                    {item}
                  </Link>
                );
              }

              if (t.navIds[i] === 'groundwork') {
                return (
                  <Link key={i} to="/groundwork"
                    className={`${textClass} font-black text-[0.7rem] hover:text-[#CC0000] transition-colors whitespace-nowrap uppercase tracking-wider ${isLinkActive('/groundwork') ? 'text-[#CC0000]' : ''}`}>
                    {item}
                  </Link>
                );
              }

              return (
                <Link key={i} to={t.navIds[i] === 'hero' ? '/' : `/#${t.navIds[i]}`}
                  className={`${textClass} font-black text-[0.7rem] hover:text-[#CC0000] transition-colors whitespace-nowrap uppercase tracking-wider`}>
                  {item}
                </Link>
              );
            })}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Language Toggle */}
            <div
              onClick={() => setLang(lang === 'en' ? 'ta' : 'en')}
              className="hidden md:flex items-center relative bg-black/40 backdrop-blur-md p-1 cursor-pointer border border-[#FF8C00]/30 overflow-hidden w-20 h-8"
            >
              <motion.div
                className="absolute inset-y-1 w-[36px] bg-[#FF8C00] shadow-lg z-0"
                animate={{ x: lang === 'en' ? 0 : 38 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
              <div className="relative z-10 w-full flex justify-between items-center px-3 pointer-events-none">
                <span className={`text-[0.55rem] font-black tracking-widest transition-all duration-300 ${lang === 'en' ? 'text-white' : 'text-white/80'}`}>EN</span>
                <span className={`text-[0.55rem] font-black tracking-widest transition-all duration-300 ${lang === 'ta' ? 'text-white' : 'text-white/80'}`}>த</span>
              </div>
            </div>

            <button onClick={onDonate}
              className="hidden lg:block px-5 py-2 font-black text-[0.65rem] tracking-widest uppercase transition-all border-2 border-[#CC0000] text-[#CC0000] bg-black/30 shadow-sm hover:bg-[#CC0000] hover:text-white hover:border-[#CC0000]">
              DONATE
            </button>

            <button onClick={onJoin}
              className="text-white px-4 md:px-6 py-2 font-black text-[0.65rem] md:text-[0.7rem] tracking-[0.05em] transition-all shadow-md hover:scale-105 active:scale-95 bg-[#CC0000] whitespace-nowrap">
              <span className="hidden sm:inline">Join The Movement</span>
              <span className="sm:hidden">Join</span>
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
              <span className="font-black text-lg uppercase" style={{ color: '#FF8C00' }}>Menu</span>
              <button onClick={() => setMenuOpen(false)} className="p-2"><X size={24} /></button>
            </div>
            <div className="flex flex-col px-6 py-8 gap-1">
              {t.nav.map((item: string, i: number) => {
                if (t.navIds[i] === 'manifesto') return null;

                if (t.navIds[i] === 'issues') {
                  const manifestoIdx = t.navIds.indexOf('manifesto');
                  return (
                    <div key={i} className="flex flex-col">
                      <Link to="/constituency" onClick={() => setMenuOpen(false)}
                        className="text-2xl font-black uppercase py-3 border-b border-gray-50 hover:text-[#CC0000] transition-colors">
                        {item}
                      </Link>
                      <Link to="/manifesto" onClick={() => setMenuOpen(false)}
                        className="text-lg font-black uppercase py-3 pl-6 border-b border-gray-50 text-gray-400 hover:text-[#CC0000] transition-colors">
                        ↳ {t.nav[manifestoIdx]}
                      </Link>
                    </div>
                  );
                }

                if (t.navIds[i] === 'about') {
                  return (
                    <Link key={i} to="/about" onClick={() => setMenuOpen(false)}
                      className="text-2xl font-black uppercase py-3 border-b border-gray-50 hover:text-[#CC0000] transition-colors">
                      {item}
                    </Link>
                  );
                }

                if (t.navIds[i] === 'journey') {
                  return (
                    <Link key={i} to="/journey" onClick={() => setMenuOpen(false)}
                      className="text-2xl font-black uppercase py-3 border-b border-gray-50 hover:text-[#CC0000] transition-colors">
                      {item}
                    </Link>
                  );
                }

                if (t.navIds[i] === 'agenda') {
                  return (
                    <Link key={i} to="/agenda" onClick={() => setMenuOpen(false)}
                      className="text-2xl font-black uppercase py-3 border-b border-gray-50 hover:text-[#CC0000] transition-colors">
                      {item}
                    </Link>
                  );
                }

                if (t.navIds[i] === 'groundwork') {
                  return (
                    <Link key={i} to="/groundwork" onClick={() => setMenuOpen(false)}
                      className="text-2xl font-black uppercase py-3 border-b border-gray-50 hover:text-[#CC0000] transition-colors">
                      {item}
                    </Link>
                  );
                }

                if (t.navIds[i] === 'contact') {
                  return (
                    <Link key={i} to="/contact" onClick={() => setMenuOpen(false)}
                      className="text-2xl font-black uppercase py-3 border-b border-gray-50 hover:text-[#CC0000] transition-colors">
                      {item}
                    </Link>
                  );
                }

                return (
                  <Link key={i} to={t.navIds[i] === 'hero' ? '/' : `/#${t.navIds[i]}`} onClick={() => setMenuOpen(false)}
                    className="text-2xl font-black uppercase py-3 border-b border-gray-50 hover:text-[#CC0000] transition-colors">
                    {item}
                  </Link>
                );
              })}
            </div>
            <div className="px-6 pb-8 mt-auto flex flex-col gap-4">
              <div className="flex gap-4">
                <button onClick={() => { setLang('en'); setMenuOpen(false); }} className={`flex-1 py-3 rounded-2xl font-black text-sm uppercase border-2 transition-colors ${lang === 'en' ? 'text-white border-2' : 'border-gray-200 text-gray-400'}`} style={lang === 'en' ? { backgroundColor: '#FF8C00', borderColor: '#FF8C00' } : {}}>English</button>
                <button onClick={() => { setLang('ta'); setMenuOpen(false); }} className={`flex-1 py-3 rounded-2xl font-black text-sm uppercase border-2 transition-colors ${lang === 'ta' ? 'text-white border-2' : 'border-gray-200 text-gray-400'}`} style={lang === 'ta' ? { backgroundColor: '#FF8C00', borderColor: '#FF8C00' } : {}}>தமிழ்</button>
              </div>
              <button onClick={() => { onJoin(); setMenuOpen(false); }} className="w-full text-white py-4 rounded-2xl font-black uppercase tracking-widest" style={{ backgroundColor: '#FF8C00' }}>JOIN THE MOVEMENT</button>
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
          <img
            src={slides[current].bg}
            alt="Hero"
            className="w-full h-full object-cover"
          />
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
    <section id="about" ref={containerRef} style={{ height: `${t.story.length * 200}vh` }} className="relative bg-black z-0">
      <div className="sticky top-0 h-screen overflow-hidden bg-black">
        <motion.div style={{ x: xTranslate }} className="flex h-full">
          {t.story.map((item: any, i: number) => (
            <div key={i} className="relative flex-shrink-0 w-screen h-full flex items-center overflow-hidden">
              <div className="absolute inset-0">
                <img loading="lazy" src={item.bg} alt={item.title} className="w-full h-full object-cover grayscale" />
                <div className="absolute inset-0 bg-black/80"></div>
                <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ backgroundColor: '#FF8C00' }}></div>
              </div>

              <div className="relative z-10 max-w-full mx-auto px-6 md:px-10 lg:px-16 w-full grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 md:gap-10 items-center">
                <div className="pt-20 md:pt-0">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                  >
                    <div className="flex items-center gap-3 mb-4 md:mb-6">
                      <span className="text-[#CC0000] font-black text-[0.65rem] md:text-xs tracking-[5px] uppercase">{item.chapter}</span>
                      <div className="flex-1 h-px bg-white/10"></div>
                      <span className="text-white/30 font-black text-[0.65rem] md:text-xs tracking-[3px]">{item.year}</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-[0.9] mb-4 md:mb-6 tracking-tight">
                      {item.title}
                    </h2>
                    <p className="font-bold text-xs md:text-sm tracking-[3px] uppercase mb-6 md:mb-10" style={{ color: '#FF8C00' }}>{item.subtitle}</p>
                    <p className="text-white/70 text-base md:text-xl leading-relaxed max-w-3xl">
                      {item.text}
                    </p>
                  </motion.div>
                </div>

                <div className="hidden lg:flex items-center justify-end">
                  <div className="text-[10rem] xl:text-[13rem] font-black text-white/5 leading-none select-none pointer-events-none uppercase whitespace-nowrap">
                    {item.year}
                  </div>
                </div>
              </div>

              <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 text-[5rem] md:text-[8rem] font-black text-white/5 leading-none pointer-events-none select-none">
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
  );
};

const JourneySection = ({ t }: any) => {
  const [active, setActive] = useState(0);
  const item = t.journeyTimeline[active];

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

      <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-20 max-w-3xl">
        <FadeIn y={10}>
          <span className="text-[#CC0000] font-black text-xs tracking-[6px] uppercase block mb-8">{t.journeyTitle}</span>
        </FadeIn>
        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="text-[4rem] sm:text-[5rem] md:text-[8rem] lg:text-[8rem] font-black text-white/10 leading-none mb-[-0.5rem] md:mb-[-1rem]">{item.year}</div>
            <h2 className="text-3xl md:text-6xl lg:text-6xl font-black text-white leading-none mb-6 tracking-tight">
              {item.title}
            </h2>
            <p className="text-white/65 text-sm md:text-xl leading-relaxed max-w-xl">{item.desc}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" style={{ height: '100px' }} />
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <div className="max-w-[1400px] mx-auto px-6 overflow-x-auto no-scrollbar pb-6 pt-10">
          <div className="flex items-end justify-start md:justify-center min-w-max h-28">
            {t.journeyTimeline.map((it: any, i: number) => (
              <div key={i} className="flex items-end">
                {/* Year Marker */}
                <div className="relative flex flex-col items-center justify-end group px-2 md:px-4 h-full cursor-pointer" onClick={() => setActive(i)}>
                  <span className={`font-black text-lg md:text-lg mb-4 transition-colors ${active === i ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>
                    {it.year}
                  </span>

                  {active === i && (
                    <motion.div layoutId="activeYearLine" className="absolute bottom-0 w-12 h-[3px] bg-[#FF8C00] shadow-[0_0_15px_rgba(255,140,0,0.8)] rounded-full" />
                  )}

                  {active !== i && (
                    <div className="w-[2px] h-4 bg-white/60 mt-auto rounded-full" />
                  )}
                </div>

                {/* Intermediate Ticks */}
                {i !== t.journeyTimeline.length - 1 && (
                  <div className="flex items-end pb-0 h-4 gap-4 md:gap-6 px-4 md:px-6">
                    <div className="w-[2px] h-2 bg-white/40 rounded-full" />
                    <div className="w-[2px] h-3 bg-white/50 rounded-full" />
                    <div className="w-[2px] h-2 bg-white/40 rounded-full" />
                    <div className="w-[2px] h-3 bg-white/50 rounded-full" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};



// Unused components removed


// // ─── GROUNDWORK ───────────────────────────────────────────────────────────────
// const GroundWork = ({ t }: any) => (
//   <section id="groundwork" className="bg-black text-white py-24 md:py-36 relative overflow-hidden">
//     <div className="max-w-[1400px] mx-auto px-6 md:px-16">
//       <FadeIn>
//         <div className="mb-20">
//           <span className="text-[#CC0000] font-black text-xs tracking-[5px] uppercase mb-6 block">IN THE FIELD</span>
//           <h2 className="text-6xl md:text-8xl font-black uppercase leading-[0.9] mb-4">{t.groundworkTitle}</h2>
//           <div className="w-20 h-1.5 bg-gradient-to-r from-[#CC0000] to-transparent"></div>
//         </div>
//       </FadeIn>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         {t.groundwork.map((item: any, i: number) => (
//           <FadeIn key={i} delay={i * 0.12}>
//             <div className="group relative h-[420px] rounded-3xl overflow-hidden bg-gray-900 cursor-pointer hover:shadow-2xl transition-all duration-500">
//               {/* Background image */}
//               <img 
//                 src={item.img} 
//                 alt={item.title} 
//                 className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
//               />

//               {/* Overlay */}
//               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>

//               {/* Content */}
//               <div className="absolute inset-0 flex flex-col justify-between p-8">
//                 {/* Date badge top-right */}
//                 <div className="flex justify-between items-start">
//                   <div></div>
//                   <span className="bg-[#CC0000] text-white px-4 py-2 rounded-full text-xs font-black tracking-wider">
//                     {item.date}
//                   </span>
//                 </div>

//                 {/* Bottom content */}
//                 <div className="relative z-10">
//                   <h3 className="text-2xl font-black text-white mb-3 leading-tight group-hover:text-[#CC0000] transition-colors">
//                     {item.title}
//                   </h3>
//                   <p className="text-gray-300 text-sm leading-relaxed opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500">
//                     {item.desc}
//                   </p>

//                   {/* Bottom accent */}
//                   <div className="mt-4 h-1 bg-gradient-to-r from-[#CC0000] to-transparent transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
//                 </div>
//               </div>
//             </div>
//           </FadeIn>
//         ))}
//       </div>
//     </div>

//     {/* Background accents */}
//     <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#CC0000]/10 blur-[100px] pointer-events-none rounded-full"></div>
//     <div className="absolute bottom-0 left-20 w-72 h-72 bg-[#CC0000]/15 blur-[80px] pointer-events-none rounded-full"></div>
//   </section>
// );

// ─── CONTACT ──────────────────────────────────────────────────────────────────
/*
const ContactSection = ({ t }: any) => {
  const [submitted, setSubmitted] = useState(false);
  return (
    <section id="contact" className="bg-white py-24 md:py-36">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <span className="text-[#CC0000] font-black text-xs tracking-[5px] uppercase mb-6 block">REACH OUT</span>
            <h2 className="text-5xl md:text-7xl font-black mb-6 leading-none uppercase">
              Get in <span className="text-[#CC0000]">Touch</span>
            </h2>
            <p className="text-gray-500 mb-12 leading-relaxed text-lg">Whether you have a grievance or want to join our volunteer army, we are here to listen.</p>
            <div className="flex flex-col gap-6">
              {[
                { icon: Phone, label: "Call Us", val: "+91 98765 43210" },
                { icon: Globe, label: "Website", val: "www.sashikiran.in" },
                { icon: MapPin, label: "Office", val: t.footerAddress }
              ].map(({ icon: Icon, label, val }, i) => (
                <div key={i} className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-[#CC0000]/5 rounded-2xl flex items-center justify-center flex-shrink-0">
to                     <Icon className="text-[#CC0000]" size={20} />
                  </div>
                  <div>
                    <div className="text-[0.65rem] font-black tracking-widest text-gray-400 uppercase">{label}</div>
                    <div className="font-bold text-base">{val}</div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            {submitted ? (
              <div className="bg-gray-50 p-12 rounded-3xl text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <ShieldCheck size={32} />
                  </div>
                </div>
                <h3 className="text-2xl font-black uppercase mb-3">Message Sent</h3>
                <p className="text-gray-500">We'll respond within 24 hours.</p>
              </div>
            ) : (
              <div className="bg-gray-50 p-8 md:p-12 rounded-3xl border border-gray-100">
                <div className="grid grid-cols-2 gap-5 mb-5">
                  <input type="text" placeholder="Your Name" className="col-span-2 sm:col-span-1 w-full px-6 py-4 bg-white rounded-2xl outline-none font-bold border-2 border-transparent focus:border-red-500 transition-colors" />
                  <input type="email" placeholder="Your Email" className="col-span-2 sm:col-span-1 w-full px-6 py-4 bg-white rounded-2xl outline-none font-bold border-2 border-transparent focus:border-red-500 transition-colors" />
                </div>
                <select className="w-full px-6 py-4 bg-white rounded-2xl outline-none font-bold border-2 border-transparent focus:border-red-500 transition-colors mb-5 text-gray-600">
                  <option value="">Select Category</option>
                  {t.formCategoryOptions.map((opt: string, i: number) => <option key={i}>{opt}</option>)}
                </select>
                <textarea placeholder="Your Message or Grievance" rows={4} className="w-full px-6 py-4 bg-white rounded-2xl outline-none font-bold border-2 border-transparent focus:border-red-500 transition-colors mb-6 resize-none"></textarea>
                <button onClick={() => setSubmitted(true)} className="w-full bg-[#CC0000] hover:bg-red-700 text-white py-5 rounded-2xl font-black uppercase tracking-widest transition-all shadow-lg shadow-red-100">
                  Submit Message
                </button>
              </div>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
*/

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
              <img src={logoImg} alt="Logo" className="w-24 h-auto" />
              <div>
                <div className="font-black text-xl text-[#FF8C00] leading-none tracking-tight">Shashikiran KN</div>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed font-medium mb-8">{t.footerText}</p>

            {/* Social icons */}
            <div className="flex items-center flex-wrap gap-4">
              {[Share2, Camera, MessageCircle, Globe].map((Icon, i) => (
                <motion.button
                  key={i}
                  whileHover={{ y: -3 }}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-[#CC0000] hover:text-[#CC0000] transition-colors duration-300"
                >
                  <Icon size={16} />
                </motion.button>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Quick Links */}
        <div>
          <FadeIn delay={0.1}>
            <h4 className="text-xs font-black tracking-[3px] mb-8 text-[#CC0000] uppercase">Navigation</h4>
            <div className="flex flex-col gap-3">
              {t.nav.slice(0, 4).map((link: string, i: number) => {
                const id = t.navIds[i];
                const to = id === 'hero' ? '/' : (['about', 'journey', 'agenda', 'constituency', 'manifesto', 'contact'].includes(id) ? `/${id}` : `/#${id}`);

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
            <h4 className="text-xs font-black tracking-[3px] mb-8 text-[#CC0000] uppercase">More</h4>
            <div className="flex flex-col gap-3">
              {t.nav.slice(4).map((link: string, i: number) => {
                const id = t.navIds[i + 4];
                const to = id === 'hero' ? '/' : (id === 'groundwork' ? '/groundwork' : (['about', 'journey', 'agenda', 'constituency', 'manifesto', 'contact'].includes(id) ? `/${id}` : `/#${id}`));

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
            <h4 className="text-xs font-black tracking-[3px] mb-8 text-[#CC0000] uppercase">Get in Touch</h4>
            <div className="flex flex-col gap-5">
              <div className="text-sm">
                <div className="text-[0.7rem] font-black text-white/30 uppercase tracking-wider mb-1">Phone</div>
                <a href="tel:+919876543210" className="text-white/50 hover:text-[#CC0000] font-medium transition-colors">+91 98765 43210</a>
              </div>
              <div className="text-sm">
                <div className="text-[0.7rem] font-black text-white/30 uppercase tracking-wider mb-1">Email</div>
                <a href="mailto:contact@sashikiran.in" className="text-white/50 hover:text-[#CC0000] font-medium transition-colors">contact@sashikiran.in</a>
              </div>
              <div className="text-sm">
                <div className="text-[0.7rem] font-black text-white/30 uppercase tracking-wider mb-1">Address</div>
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
const HomePage = ({ t }: any) => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <>
      <HeroSection t={t} />
      <AboutSection t={t} />
      <JourneySection t={t} />
    </>
  );
};

// ─── LOADING FALLBACK ────────────────────────────────────────────────────────
const LoadingFallback = () => (
  <div className="w-full h-screen flex items-center justify-center bg-white">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-gray-100 border-t-[#CC0000] rounded-full animate-spin" />
      <div className="text-xs font-black tracking-[3px] text-gray-500 uppercase">Loading...</div>
    </div>
  </div>
);

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
const App = () => {
  const [lang, setLang] = useState<'en' | 'ta'>('en');
  const [showPopup, setShowPopup] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = translations[lang];
  const location = useLocation();

  useEffect(() => {
    document.title = lang === 'ta' ? "சசிகிரண் 2026 | ஸ்ரீரங்கத்தின் குரல்" : "Sashikiran 2026 | Voice of Srirangam";
    const onScroll = () => setScrolled(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });

    // Listen for custom popup open event
    const handleOpenPopup = () => setShowPopup(true);
    window.addEventListener('open-join-popup', handleOpenPopup);

    // Only show popup automatically on homepage
    let timer: ReturnType<typeof setTimeout>;
    if (location.pathname === '/') {
      timer = setTimeout(() => setShowPopup(true), 6000);
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('open-join-popup', handleOpenPopup);
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
      <Navbar t={t} lang={lang} setLang={setLang} onJoin={() => setShowPopup(true)} onDonate={() => setShowPopup(true)} />
      <AnimatePresence>
        {showPopup && <FullScreenJoin isOpen={showPopup} onClose={() => setShowPopup(false)} t={t} />}
      </AnimatePresence>

      <React.Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<HomePage t={t} />} />
          <Route path="/about" element={<AboutMePage lang={lang} />} />
          <Route path="/journey" element={<JourneyPage lang={lang} />} />
          <Route path="/agenda" element={<AgendaPage lang={lang} />} />
          <Route path="/constituency" element={<ConstituencyPage lang={lang} />} />
          <Route path="/manifesto" element={<ManifestoPage lang={lang} />} />
          <Route path="/contact" element={<ContactPage lang={lang} />} />
          <Route path="/groundwork" element={<GroundworkPage lang={lang} />} />
          <Route path="/groundwork/:slug" element={<BlogDetailPage lang={lang} />} />
        </Routes>
      </React.Suspense>

      <Footer t={t} />

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