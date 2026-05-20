import blogCover from '../assets/blog-cover.jpeg';
import blog1 from '../assets/blog1.jpeg';
import blog2 from '../assets/blog2.jpeg';
// import blog3 from '../assets/blog3.jpeg';
import blog4 from '../assets/blog4.jpeg';
import blog5 from '../assets/blog5.jpeg';
import blog6 from '../assets/blog6.jpeg';
// import blog7 from '../assets/blog7.jpeg';
import blog8 from '../assets/blog10.jpeg';
import blog9 from '../assets/blog11.jpeg';


import akkaravadisal from '../assets/akkaravadisal.png';
// import skill50 from '../assets/Skill 50.jpeg';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  image: string;
  heroImage: string;
  excerpt: string;
  content: {
    en: string;
    ta: string;
  };
  sections: {
    id: string;
    title: {
      en: string;
      ta: string;
    };
    content: {
      en: string;
      ta: string;
    };
    image: string;
  }[];
  faq: {
    question: {
      en: string;
      ta: string;
    };
    answer: {
      en: string;
      ta: string;
    };
  }[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "smarter-future-srirangam",
    title: "A Smarter Future for Srirangam: My Vision for People-Centered Development",
    date: "May 14, 2026",
    category: "Vision",
    image: blog1,
    heroImage: blogCover,
    excerpt: "Development is not just about building roads or announcing projects. Real development begins when people feel safer in their streets, young people find jobs close to home, and technology becomes accessible to everyone.",
    content: {
      en: "Development is not just about building roads or announcing projects. Real development begins when people feel safer in their streets, young people find jobs close to home, women feel protected, water problems are solved, and technology becomes accessible to everyone.\n\nThat is the vision that candidate Shashikiran has presented for the people of Srirangam through his “Smart Temple Term Plan” — a practical and people-focused development model designed to improve daily life while preserving the cultural identity of Srirangam.\n\nHis promises are not just political slogans. They focus on employment, women’s safety, entrepreneurship, cleanliness, infrastructure, flood prevention, and digital governance — all connected to the real needs of local residents.",
      ta: "வளர்ச்சி என்பது சாலைகள் அமைப்பது அல்லது திட்டங்களை அறிவிப்பது மட்டுமல்ல. மக்கள் தங்கள் தெருக்களில் பாதுகாப்பாக உணரும்போது, இளைஞர்கள் வீட்டிற்கு அருகிலேயே வேலை தேடும்போது, பெண்கள் பாதுகாப்பாக உணரும்போது, தண்ணீர் பிரச்சனைகள் தீர்க்கப்படும்போது மற்றும் தொழில்நுட்பம் அனைவருக்கும் அணுகக்கூடியதாக மாறும்போதுதான் உண்மையான வளர்ச்சி தொடங்குகிறது.\n\nஇதுதான் வேட்பாளர் சசிகிரண் தனது “ஸ்மார்ட் டெம்பிள் டெர்ம் பிளான்” மூலம் ஸ்ரீரங்கம் மக்களுக்காக முன்வைத்துள்ள தொலைநோக்குப் பார்வை - ஸ்ரீரங்கத்தின் கலாச்சார அடையாளத்தைப் பாதுகாக்கும் அதே வேளையில் அன்றாட வாழ்க்கையை மேம்படுத்த வடிவமைக்கப்பட்ட ஒரு நடைமுறை மற்றும் மக்கள் நலன் சார்ந்த வளர்ச்சி மாதிரியாகும்.\n\nஅவரது வாக்குறுதிகள் வெறும் அரசியல் முழக்கங்கள் அல்ல. அவை வேலைவாய்ப்பு, பெண்கள் பாதுகாப்பு, தொழில்முனைவு, தூய்மை, உள்கட்டமைப்பு, வெள்ளத் தடுப்பு மற்றும் டிஜிட்டல் நிர்வாகம் ஆகியவற்றில் கவனம் செலுத்துகின்றன - இவை அனைத்தும் உள்ளூர்வாசிகளின் உண்மையான தேவைகளுடன் இணைக்கப்பட்டுள்ளன."
    },
    sections: [
      {
        id: "economy",
        title: {
          en: "Economy Development Through “Akkaravadisal” Local Area Growth",
          ta: "“அக்காரவடிசல்” உள்ளூர் பகுதி வளர்ச்சி மூலம் பொருளாதார மேம்பாடு"
        },
        image: akkaravadisal,
        content: {
          en: "One of the key promises made by Shashikiran is strengthening the local economy through the “Akkaravadisal” development concept. The goal is to improve the surrounding residential and commercial areas while creating opportunities for small businesses, street vendors, traditional workers, and local entrepreneurs.\n\nSrirangam is not only a spiritual destination but also a living town filled with hardworking families, small shops, and local talent. According to Shashikiran’s vision, development should directly benefit the people living there instead of focusing only on external projects.\n\nHis plan includes:\n• Encouraging local business growth\n• Improving public spaces\n• Supporting traditional and small-scale workers\n• Creating more economic activity within the area\n• Building a stronger local marketplace system\n\nThis approach aims to create sustainable growth while preserving Srirangam’s heritage and identity.",
          ta: "சசிகிரண் அளித்த முக்கிய வாக்குறுதிகளில் ஒன்று “அக்காரவடிசல்” வளர்ச்சி கருத்தாக்கத்தின் மூலம் உள்ளூர் பொருளாதாரத்தை வலுப்படுத்துவதாகும். சிறு தொழில்கள், தெருவோர வியாபாரிகள், பாரம்பரிய தொழிலாளர்கள் மற்றும் உள்ளூர் தொழில்முனைவோருக்கான வாய்ப்புகளை உருவாக்கும் அதே வேளையில் சுற்றியுள்ள குடியிருப்பு மற்றும் வணிகப் பகுதிகளை மேம்படுத்துவதே இதன் நோக்கமாகும்.\n\nஸ்ரீரங்கம் ஒரு ஆன்மீகத் தலம் மட்டுமல்ல, கடின உழைப்பாளி குடும்பங்கள், சிறிய கடைகள் மற்றும் உள்ளூர் திறமைகளால் நிரப்பப்பட்ட ஒரு வாழும் நகரமாகும். சசிகிரணின் தொலைநோக்குப் பார்வையின்படி, வளர்ச்சி என்பது வெளித் திட்டங்களில் மட்டும் கவனம் செலுத்தாமல் அங்கு வாழும் மக்களுக்கு நேரடியாகப் பயனளிக்க வேண்டும்.\n\nஅவரது திட்டத்தில் பின்வருவன அடங்கும்:\n• உள்ளூர் வணிக வளர்ச்சியை ஊக்குவித்தல்\n• பொது இடங்களை மேம்படுத்துதல்\n• பாரம்பரிய மற்றும் சிறு தொழிலாளர்களுக்கு ஆதரவு அளித்தல்\n• பகுதிக்குள் அதிக பொருளாதார நடவடிக்கைகளை உருவாக்குதல்\n• வலுவான உள்ளூர் சந்தை முறையை உருவாக்குதல்\n\nஇந்த அணுகுமுறை ஸ்ரீரங்கத்தின் பாரம்பரியம் மற்றும் அடையாளத்தைப் பாதுகாக்கும் அதே வேளையில் நிலையான வளர்ச்சியை உருவாக்குவதை நோக்கமாகக் கொண்டுள்ளது."
        }
      },
      {
        id: "youth",
        title: {
          en: "Job & Skill Development for Youth",
          ta: "இளைஞர்களுக்கான வேலை மற்றும் திறன் மேம்பாடு"
        },
        image: blog2,
        content: {
          en: "Unemployment and lack of skill-based opportunities continue to affect many young people. To address this, Shashikiran has proposed the creation of 50 job and skill development centers or opportunities focused on empowering youth.\n\nThe vision is to prepare students and young professionals for modern careers through:\n• Digital skills training\n• Communication development\n• Technical learning programs\n• Freelancing guidance\n• Entrepreneurship support\n• Placement assistance\n\nThis initiative is especially important because many talented youth leave smaller towns searching for opportunities elsewhere. By bringing skill development closer to the community, the plan aims to create local employment and reduce migration pressure.\n\nShashikiran believes that youth are the backbone of Srirangam’s future, and investing in their growth is essential for long-term development.",
          ta: "வேலையில்லாத் திண்டாட்டம் மற்றும் திறன் சார்ந்த வாய்ப்புகள் இல்லாமை பல இளைஞர்களைத் தொடர்ந்து பாதிக்கிறது. இதைத் தீர்க்க, சசிகிரண் இளைஞர்களுக்கு அதிகாரம் அளிப்பதில் கவனம் செலுத்தும் 50 வேலை மற்றும் திறன் மேம்பாட்டு மையங்கள் அல்லது வாய்ப்புகளை உருவாக்க முன்மொழிந்துள்ளார்.\n\nமாணவர்கள் மற்றும் இளம் தொழில் வல்லுநர்களை நவீன தொழில்களுக்கு தயார்படுத்துவதே இதன் நோக்கமாகும்:\n• டிஜிட்டல் திறன் பயிற்சி\n• தகவல் தொடர்பு மேம்பாடு\n• தொழில்நுட்ப கற்றல் திட்டங்கள்\n• ஃப்ரீலான்சிங் வழிகாட்டுதல்\n• தொழில்முனைவோர் ஆதரவு\n• வேலை வாய்ப்பு உதவி\n\nபல திறமையான இளைஞர்கள் வாய்ப்புகளைத் தேடி சிறிய நகரங்களை விட்டு வெளியேறுவதால் இந்த முயற்சி மிகவும் முக்கியமானது. திறன் மேம்பாட்டை சமூகத்திற்கு நெருக்கமாக கொண்டு வருவதன் மூலம், உள்ளூர் வேலைவாய்ப்பை உருவாக்கவும், இடம்பெயர்வு அழுத்தத்தை குறைக்கவும் இத்திட்டம் நோக்கமாகக் கொண்டுள்ளது."
        }
      },
      {
        id: "entrepreneur",
        title: {
          en: "Entrepreneur Development Through Dedicated Skill Centers",
          ta: "பிரத்யேக திறன் மையங்கள் மூலம் தொழில்முனைவோர் மேம்பாடு"
        },
        image: blog4,
        content: {
          en: "Apart from jobs, the Smart Temple Term Plan also focuses on entrepreneurship. The proposal includes creating 5 entrepreneur skill development spaces designed to help aspiring business owners.\n\nMany people have ideas but lack guidance, mentorship, or infrastructure. These centers are expected to support:\n• Startup ideas\n• Small business training\n• Financial awareness\n• Marketing education\n• Digital business support\n• Networking opportunities\n\nBy encouraging entrepreneurship, the initiative aims to create more self-employed individuals and strengthen the local economy.\n\nInstead of depending entirely on outside companies, this vision encourages people to build businesses within Srirangam itself.",
          ta: "வேலைகள் தவிர, ஸ்மார்ட் டெம்பிள் டெர்ம் பிளான் தொழில்முனைவோர் மீதும் கவனம் செலுத்துகிறது. ஆர்வமுள்ள வணிக உரிமையாளர்களுக்கு உதவும் வகையில் வடிவமைக்கப்பட்ட 5 தொழில்முனைவோர் திறன் மேம்பாட்டு இடங்களை உருவாக்குவது இந்த முன்மொழிவில் அடங்கும்.\n\nபலவரிடம் யோசனைகள் உள்ளன, ஆனால் வழிகாட்டுதல், வழிகாட்டல் அல்லது உள்கட்டமைப்பு வசதிகள் இல்லை. இந்த மையங்கள் ஆதரவளிக்கும் என்று எதிர்பார்க்கப்படுகிறது:\n• ஸ்டார்ட்அப் யோசனைகள்\n• சிறு வணிக பயிற்சி\n• நிதி விழிப்புணர்வு\n• சந்தைப்படுத்தல் கல்வி\n• டிஜிட்டல் வணிக ஆதரவு\n• நெட்வொர்க்கிங் வாய்ப்புகள்\n\nதொழில்முனைவோரை ஊக்குவிப்பதன் மூலம், அதிக சுயதொழில் செய்பவர்களை உருவாக்கவும், உள்ளூர் பொருளாதாரத்தை வலுப்படுத்தவும் இந்த முயற்சி நோக்கமாகக் கொண்டுள்ளது."
        }
      },
      {
        id: "water",
        title: {
          en: "Water & Drainage Fix: Solving Everyday Problems",
          ta: "தண்ணீர் மற்றும் வடிகால் தீர்வு: அன்றாட பிரச்சனைகளைத் தீர்த்தல்"
        },
        image: blog5,
        content: {
          en: "Water stagnation and drainage issues are among the most common complaints in many residential areas. During rainy seasons, poor drainage creates inconvenience, health concerns, and road damage.\n\nRecognizing this issue, Shashikiran has promised focused improvements in water management and drainage systems.\n\nThe objective is to:\n• Improve underground drainage systems\n• Prevent water stagnation\n• Ensure smoother water flow during rain\n• Maintain cleaner streets\n• Reduce health risks caused by stagnant water\n\nInfrastructure development is meaningful only when it solves daily problems faced by ordinary residents. This promise reflects a practical understanding of the community’s needs.",
          ta: "பல குடியிருப்புப் பகுதிகளில் தேங்கும் தண்ணீர் மற்றும் வடிகால் பிரச்சினைகள் மிகவும் பொதுவான புகார்களில் ஒன்றாகும். மழைக்காலங்களில், மோசமான வடிகால் வசதி அசௌகரியம், சுகாதாரக் கவலைகள் மற்றும் சாலை சேதங்களை உருவாக்குகிறது.\n\nஇப்பிரச்சினையை உணர்ந்து, சசிகிரண் நீர் மேலாண்மை மற்றும் வடிகால் அமைப்புகளில் கவனம் செலுத்தி மேம்பாடுகளைச் செய்வதாக உறுதியளித்துள்ளார்.\n\nஇதன் நோக்கம்:\n• பாதாள சாக்கடை திட்டங்களை மேம்படுத்துதல்\n• தண்ணீர் தேங்குவதைத் தடுத்தல்\n• மழையின் போது சீரான நீர் ஓட்டத்தை உறுதி செய்தல்\n• தூய்மையான தெருக்களைப் பராமரித்தல்\n• தேங்கி நிற்கும் நீரால் ஏற்படும் சுகாதார அபாயங்களைக் குறைத்தல்\n\nஉள்கட்டமைப்பு மேம்பாடு என்பது சாதாரண குடிமக்கள் எதிர்கொள்ளும் அன்றாடப் பிரச்சினைகளைத் தீர்க்கும்போதுதான் அர்த்தமுள்ளதாக இருக்கும்."
        }
      },
      {
        id: "clean",
        title: {
          en: "Clean Srirangam",
          ta: "தூய்மையான ஸ்ரீரங்கம்"
        },
        image: blog6,
        content: {
          en: "Cleanliness plays a major role in public health, tourism, and civic pride. As one of the most culturally and spiritually important places in Tamil Nadu, Srirangam deserves clean surroundings and organized waste management systems.\n\nThe “Clean Srirangam Campaign” proposed by Shashikiran focuses on:\n• Cleaner streets\n• Improved garbage collection\n• Public awareness campaigns\n• Better waste disposal management\n• Encouraging community participation\n\nA cleaner environment improves both the quality of life for residents and the experience for visitors coming to Srirangam.\n\nThe campaign is expected to combine civic responsibility with modern cleanliness management practices.",
          ta: "பொது சுகாதாரம், சுற்றுலா மற்றும் குடிமைப் பெருமையில் தூய்மை முக்கிய பங்கு வகிக்கிறது. தமிழ்நாட்டின் மிக முக்கியமான கலாச்சார மற்றும் ஆன்மீக இடங்களில் ஒன்றான ஸ்ரீரங்கம், தூய்மையான சுற்றுப்புறங்கள் மற்றும் ஒழுங்கமைக்கப்பட்ட கழிவு மேலாண்மை அமைப்புகளுக்குத் தகுதியானது.\n\nசசிகிரண் முன்மொழிந்த “தூய்மையான ஸ்ரீரங்கம் பிரச்சாரம்” பின்வருவனவற்றில் கவனம் செலுத்துகிறது:\n• தூய்மையான தெருக்கள்\n• மேம்படுத்தப்பட்ட குப்பை சேகரிப்பு\n• பொது விழிப்புணர்வு பிரச்சாரங்கள்\n• சிறந்த கழிவு அகற்றல் மேலாண்மை\n• சமூகப் பங்கேற்பை ஊக்குவித்தல்"
        }
      },
      {
        id: "safety",
        title: {
          en: "CCTV Monitoring & Women Safety Patrol After 7 PM",
          ta: "இரவு 7 மணிக்கு மேல் சிசிடிவி கண்காணிப்பு மற்றும் பெண்கள் பாதுகாப்பு ரோந்து"
        },
        image: blog5,
        content: {
          en: "Women’s safety has become one of the most important concerns in urban and semi-urban areas. Addressing this issue directly, Shashikiran has proposed increased CCTV surveillance and dedicated women safety patrols after 7 PM.\n\nThis initiative aims to:\n• Improve safety in public areas\n• Increase police visibility\n• Prevent harassment and unsafe activities\n• Build confidence among women and families\n• Improve monitoring in key public zones\n\nThe introduction of additional CCTV systems can also help improve emergency response and crime prevention.\n\nA safer Srirangam creates stronger communities and encourages women to participate freely in education, work, and public life.",
          ta: "நகர்ப்புற மற்றும் அரை நகர்ப்புற பகுதிகளில் பெண்களின் பாதுகாப்பு மிக முக்கியமான கவலைகளில் ஒன்றாக மாறியுள்ளது. இந்தப் பிரச்சினைக்கு நேரடியாகத் தீர்வு காணும் வகையில், சசிகிரண் இரவு 7 மணிக்குப் பிறகு சிசிடிவி கண்காணிப்பை அதிகரிக்கவும், பெண்களுக்கான பிரத்யேக பாதுகாப்பு ரோந்துப் பணிகளை மேற்கொள்ளவும் முன்மொழிந்துள்ளார்.\n\nஇந்த முயற்சி நோக்கமாகக் கொண்டுள்ளது:\n• பொது இடங்களில் பாதுகாப்பை மேம்படுத்துதல்\n• காவல்துறை கண்காணிப்பை அதிகரித்தல்\n• துன்புறுத்தல் மற்றும் பாதுகாப்பற்ற நடவடிக்கைகளைத் தடுத்தல்\n• பெண்கள் மற்றும் குடும்பத்தினரிடையே நம்பிக்கையை உருவாக்குதல்\n• முக்கிய பொது மண்டலங்களில் கண்காணிப்பை மேம்படுத்துதல்"
        }
      },
      {
        id: "flood",
        title: {
          en: "Flood Protection Machine & Disaster Preparedness",
          ta: "வெள்ளத் தடுப்பு இயந்திரம் மற்றும் பேரிடர் தயார்நிலை"
        },
        image: blog8,
        content: {
          en: "Flooding during heavy rainfall can disrupt normal life and damage homes, roads, and businesses. To reduce such risks, the Smart Temple Term Plan includes flood protection systems and machinery support.\n\nAccording to Shashikiran, disaster preparedness should not begin after damage occurs — it should begin before problems arise.\n\nThe flood protection initiative aims to:\n• Improve emergency response\n• Remove excess water faster\n• Reduce flood impact in vulnerable areas\n• Strengthen preparedness during monsoon seasons\n\nThis proactive approach reflects a long-term vision for safer infrastructure planning.",
          ta: "கனமழையின் போது ஏற்படும் வெள்ளப்பெருக்கு இயல்பு வாழ்க்கையை பாதிப்பதோடு வீடுகள், சாலைகள் மற்றும் வணிகங்களை சேதப்படுத்தும். இத்தகைய அபாயங்களைக் குறைக்க, ஸ்மார்ட் டெம்பிள் டெர்ம் பிளான் வெள்ளத் தடுப்பு அமைப்புகள் மற்றும் இயந்திர ஆதரவை உள்ளடக்கியது.\n\nசசிகிரணின் கூற்றுப்படி, பேரிடர் தயார்நிலை என்பது சேதம் ஏற்பட்ட பிறகு தொடங்கக்கூடாது - பிரச்சினைகள் எழுவதற்கு முன்பே தொடங்க வேண்டும்.\n\nவெள்ளத் தடுப்பு முயற்சி நோக்கமாகக் கொண்டுள்ளது:\n• அவசரகால பதிலை மேம்படுத்துதல்\n• உபரி நீரை வேகமாக வெளியேற்றுதல்\n• பாதிக்கப்பட்ட பகுதிகளில் வெள்ளத்தின் தாக்கத்தைக் குறைத்தல்\n• பருவமழை காலங்களில் தயார்நிலையை வலுப்படுத்துதல்"
        }
      },
      {
        id: "digital",
        title: {
          en: "Digital Governance Through Mobile Access",
          ta: "மொபைல் அணுகல் மூலம் டிஜிட்டல் நிர்வாகம்"
        },
        image: blog9,
        content: {
          en: "Technology has changed the way people access services. However, many citizens still struggle with complicated government procedures and lack of digital accessibility.\n\nTo modernize public access, Shashikiran has proposed digital governance solutions with mobile accessibility.\n\nThis vision includes:\n• Easier access to civic services\n• Mobile-based complaint systems\n• Digital communication with residents\n• Faster information sharing\n• Improved transparency\n\nDigital governance can reduce delays, simplify communication, and make administration more efficient for ordinary citizens.\n\nThe goal is to make governance more accessible, responsive, and citizen-friendly.",
          ta: "தொழில்நுட்பம் மக்கள் சேவைகளை அணுகும் முறையை மாற்றியுள்ளது. இருப்பினும், பல குடிமக்கள் இன்னும் சிக்கலான அரசாங்க நடைமுறைகள் மற்றும் டிஜிட்டல் அணுகல் இல்லாமையால் போராடுகிறார்கள்.\n\nபொது அணுகலை நவீனப்படுத்த, சசிகிரண் மொபைல் அணுகலுடன் கூடிய டிஜிட்டல் நிர்வாக தீர்வுகளை முன்மொழிந்துள்ளார்.\n\nஇந்த தொலைநோக்குப் பார்வையில் அடங்கும்:\n• குடிமைச் சேவைகளை எளிதாக அணுகுதல்\n• மொபைல் அடிப்படையிலான புகார் அமைப்புகள்\n• குடியிருப்பாளர்களுடன் டிஜிட்டல் தொடர்பு\n• வேகமான தகவல் பகிர்வு\n• மேம்பட்ட வெளிப்படைத்தன்மை"
        }
      }
    ],
    faq: [
      {
        question: {
          en: "What is the Smart Temple Term Plan?",
          ta: "ஸ்மார்ட் டெம்பிள் டெர்ம் பிளான் என்றால் என்ன?"
        },
        answer: {
          en: "The Smart Temple Term Plan is a development vision proposed by Shashikiran focusing on economy, jobs, infrastructure, women’s safety, cleanliness, flood protection, and digital governance.",
          ta: "ஸ்மார்ட் டெம்பிள் டெர்ம் பிளான் என்பது பொருளாதாரம், வேலைவாய்ப்பு, உள்கட்டமைப்பு, பெண்கள் பாதுகாப்பு, தூய்மை, வெள்ளத் தடுப்பு மற்றும் டிஜிட்டல் நிர்வாகம் ஆகியவற்றில் கவனம் செலுத்தும் சசிகிரண் முன்மொழிந்த ஒரு வளர்ச்சித் திட்டமாகும்."
        }
      },
      {
        question: {
          en: "How will the plan help local youth?",
          ta: "இந்தத் திட்டம் உள்ளூர் இளைஞர்களுக்கு எப்படி உதவும்?"
        },
        answer: {
          en: "The plan proposes 50 job and skill development opportunities that focus on training, employability, digital skills, and entrepreneurship support for young people.",
          ta: "இளைஞர்களுக்கான பயிற்சி, வேலைவாய்ப்பு, டிஜிட்டல் திறன்கள் மற்றும் தொழில்முனைவோர் ஆதரவு ஆகியவற்றில் கவனம் செலுத்தும் 50 வேலை மற்றும் திறன் மேம்பாட்டு வாய்ப்புகளை இந்தத் திட்டம் முன்மொழிகிறது."
        }
      },
      {
        question: {
          en: "What is the purpose of the entrepreneur skill centers?",
          ta: "தொழில்முனைவோர் திறன் மையங்களின் நோக்கம் என்ன?"
        },
        answer: {
          en: "The proposed 5 entrepreneur centers aim to help aspiring business owners with training, mentorship, business guidance, and startup support.",
          ta: "முன்மொழியப்பட்ட 5 தொழில்முனைவோர் மையங்கள் ஆர்வமுள்ள வணிக உரிமையாளர்களுக்கு பயிற்சி, வழிகாட்டுதல், வணிக வழிகாட்டுதல் மற்றும் ஸ்டார்ட்அப் ஆதரவுடன் உதவுவதை நோக்கமாகக் கொண்டுள்ளன."
        }
      },
      {
        question: {
          en: "How does the plan improve women’s safety?",
          ta: "பெண்கள் பாதுகாப்பை இத்திட்டம் எவ்வாறு மேம்படுத்துகிறது?"
        },
        answer: {
          en: "The initiative includes CCTV surveillance systems and women safety patrols after 7 PM to improve security in public areas.",
          ta: "பொது இடங்களில் பாதுகாப்பை மேம்படுத்த இரவு 7 மணிக்குப் பிறகு சிசிடிவி கண்காணிப்பு அமைப்புகள் மற்றும் பெண்கள் பாதுகாப்பு ரோந்துப் பணிகளை இந்த முயற்சி உள்ளடக்கியுள்ளது."
        }
      },
      {
        question: {
          en: "What is included in the Clean Srirangam Campaign?",
          ta: "தூய்மையான ஸ்ரீரங்கம் பிரச்சாரத்தில் என்ன சேர்க்கப்பட்டுள்ளது?"
        },
        answer: {
          en: "The campaign focuses on cleaner streets, better garbage management, public awareness, and improved sanitation systems.",
          ta: "இந்த பிரச்சாரம் தூய்மையான தெருக்கள், சிறந்த குப்பை மேலாண்மை, பொது விழிப்புணர்வு மற்றும் மேம்படுத்தப்பட்ட துப்புரவு அமைப்புகளில் கவனம் செலுத்துகிறது."
        }
      },
      {
        question: {
          en: "How will digital governance benefit citizens?",
          ta: "டிஜிட்டல் நிர்வாகம் குடிமக்களுக்கு எவ்வாறு பயனளிக்கும்?"
        },
        answer: {
          en: "Digital governance through mobile access can help residents access civic services, submit complaints, and receive updates more efficiently.",
          ta: "மொபைல் அணுகல் மூலம் டிஜிட்டல் நிர்வாகம் குடியிருப்பாளர்களுக்கு குடிமைச் சேவைகளை அணுகவும், புகார்களை சமர்ப்பிக்கவும் மற்றும் அறிவிப்புகளை மிகவும் திறமையாகப் பெறவும் உதவும்."
        }
      },
      {
        question: {
          en: "Why is flood protection important in this plan?",
          ta: "இந்த திட்டத்தில் வெள்ளத் தடுப்பு ஏன் முக்கியமானது?"
        },
        answer: {
          en: "Flood protection systems can reduce water damage during heavy rainfall and improve disaster preparedness for vulnerable areas.",
          ta: "வெள்ளத் தடுப்பு அமைப்புகள் கனமழையின் போது நீர் சேதத்தைக் குறைக்கலாம் மற்றும் பாதிக்கப்பட்ட பகுதிகளுக்கு பேரிடர் தயார்நிலையை மேம்படுத்தலாம்."
        }
      },
      {
        question: {
          en: "What is the main goal of Shashikiran’s vision?",
          ta: "சசிகிரணின் தொலைநோக்குப் பார்வையின் முக்கிய குறிக்கோள் என்ன?"
        },
        answer: {
          en: "The main goal is to create a smarter, cleaner, safer, and economically stronger Srirangam while improving the quality of life for local residents.",
          ta: "உள்ளூர்வாசிகளின் வாழ்க்கைத் தரத்தை மேம்படுத்தும் அதே வேளையில் ஸ்ரீரங்கத்தை புத்திசாலித்தனமான, தூய்மையான, பாதுகாப்பான மற்றும் பொருளாதார ரீதியாக வலுவான ஒன்றாக உருவாக்குவதே முக்கிய குறிக்கோள்."
        }
      }
    ]
  }
];
