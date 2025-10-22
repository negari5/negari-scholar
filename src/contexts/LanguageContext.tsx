import React, { createContext, useContext, useState, useEffect } from 'react';

interface Language {
  code: string;
  name: string;
  flag: string;
}

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  languages: Language[];
  t: (key: string) => string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'am', name: 'አማርኛ', flag: '🇪🇹' },
  { code: 'om', name: 'Afaan Oromoo', flag: '🇪🇹' },
  { code: 'ti', name: 'ትግርኛ', flag: '🇪🇹' },
];

// Comprehensive translations for all sections
const translations: Record<string, Record<string, string>> = {
  en: {
    'start_journey': 'Start Your Journey',
    'welcome': 'Welcome',
    'scholarships': 'Scholarships',
    'mentors': 'Mentors',
    'applications': 'Applications',
    'profile': 'Profile',
    'home': 'Home',
    'explore': 'Explore',
    'journey': 'Journey',
    'messages': 'Messages',
    'info': 'Info',
    'stay_updated': 'Stay Updated. Stay Ahead.',
    'newsletter_desc': 'Get the latest scholarship opportunities, success tips, and platform updates delivered directly to your inbox. Join thousands of Ethiopian students on their journey to global education.',
    'subscribe_now': 'Subscribe Now',
    'join_telegram': 'Join our Telegram Community',
    'email_placeholder': 'Enter your email address',
    'weekly_opportunities': 'Weekly Opportunities',
    'success_tips': 'Success Tips',
    'platform_updates': 'Platform Updates',
    'guide_dreams': 'Guide the Next Generation of Global Leaders',
    'mentor_desc': 'Share your international education experience and help Ethiopian students achieve their dreams of studying abroad.',
    'start_mentoring': 'Start Mentoring',
    'learn_more': 'Learn More',
    'support_dreams': 'Support Your Child\'s Global Education Dreams',
    'parent_desc': 'Get the tools, resources, and support you need to guide your child through their international education journey.',
    'empower_institution': 'Empower Your Institution\'s Global Impact',
    'school_desc': 'Partner with Negari to enhance your school\'s international education programs and track student success on a global scale.',
    'recent_activity': 'Recent Activity',
    'system_health': 'System Health',
    'newsletter_management': 'Newsletter Management',
    'footer_settings': 'Footer Settings',
    'forgot_password': 'Forgot Password?',
    'email': 'Email',
    'password': 'Password',
    'login': 'Login',
    'signup': 'Sign Up',
    'welcome_back': 'Welcome Back',
  },
  am: {
    'start_journey': 'ጉዞዎን ይጀምሩ',
    'welcome': 'እንኳን ደህና መጡ',
    'scholarships': 'ስኮላርሺፕ',
    'mentors': 'አማካሪዎች',
    'applications': 'ማመልከቻዎች',
    'profile': 'መገለጫ',
    'home': 'ቤት',
    'explore': 'ያርቃሉ',
    'journey': 'ጉዞ',
    'messages': 'መልእክቶች',
    'info': 'መረጃ',
    'stay_updated': 'ሁልጊዜ ተዘምኑ። ዝግጁ ሁኑ።',
    'newsletter_desc': 'የቅርብ ጊዜ የስኮላርሺፕ እድሎችን፣ የስኬት ምክሮችን እና የመድረክ ዝመናዎችን በቀጥታ ወደ ኢሜይልዎ ያግኙ።',
    'subscribe_now': 'አሁን ይመዝገቡ',
    'join_telegram': 'የእኛን ቴሌግራም ማህበረሰብ ይቀላቀሉ',
    'email_placeholder': 'የኢሜይል አድራሻዎን ያስገቡ',
    'weekly_opportunities': 'ሳምንታዊ እድሎች',
    'success_tips': 'የስኬት ምክሮች',
    'platform_updates': 'የመድረክ ዝመናዎች',
    'guide_dreams': 'የአዲሱን ትውልድ የአለም መሪዎች መርሃ',
    'mentor_desc': 'የዓለም አቀፍ ትምህርት ልምድዎን ያጋሩ እና የኢትዮጵያ ተማሪዎች በአለም አቀፍ ደረጃ የመማር ህልማቸውን እንዲያሳኩ ይረዱ።',
    'start_mentoring': 'መምህርነት ጀምር',
    'learn_more': 'ተጨማሪ ይወቁ',
    'support_dreams': 'የልጅዎን የአሮጌ ትምህርት ህልሞች ይደግፉ',
    'parent_desc': 'የልጅዎን የአለም አቀፍ ትምህርት ጉዞ ለመምራት የሚያስፈልጉዎትን መሳሪያዎች፣ ሀብቶች እና ድጋፍ ያግኙ።',
    'empower_institution': 'የተቋምዎን የአለም አቀፍ ተፅእኖ ያጎልቡ',
    'school_desc': 'የተቋምዎን የአለም አቀፍ ትምህርት ፕሮግራሞች ለማሻሻል እና የተማሪዎችን ስኬት በአለም አቀፍ ደረጃ ለመከታተል ከነጋሪ ጋር ይተባበሩ።'
  },
  om: {
    'start_journey': 'Imala Kee Jalqabi',
    'welcome': 'Baga Nagaan Dhufte',
    'scholarships': 'Scholarships',
    'mentors': 'Gorsitoota',
    'applications': 'Iyyannoo',
    'profile': 'Ibsa',
    'home': 'Mana',
    'explore': 'Sakatta\'i',
    'journey': 'Imala',
    'messages': 'Ergaa',
    'info': 'Odeeffannoo',
    'stay_updated': 'Yeroo Hunda Haaromfamaa. Qophaa\'aa Taa\'aa.',
    'newsletter_desc': 'Carraa scholarships haaraa, gorsa milkaa\'inaa fi fooyya\'iinsa waltajjii keetii kallatti email kee irratti argadhu.',
    'subscribe_now': 'Amma Galmaa\'i',
    'join_telegram': 'Hawaasa Telegram Keenya Keessa Makamaa',
    'email_placeholder': 'Teessoo email keetii galchi',
    'weekly_opportunities': 'Carraa Torban',
    'success_tips': 'Gorsa Milkaa\'inaa',
    'platform_updates': 'Fooyya\'iinsa Waltajjii',
    'guide_dreams': 'Dhalootaa Haaraa Hooggantoota Addunyaa Qajeelchi',
    'mentor_desc': 'Muuxannoo barnoota addunyaa keetii qooddadhuutii barattootaa Itoophiyaa abjuu isaanii addunyaa keessatti barachuu galmaan ga\'uuf gargaari.',
    'start_mentoring': 'Gorsaa Jalqabi',
    'learn_more': 'Dabalataa Baradhu',
    'support_dreams': 'Abjuu Barnoota Addunyaa Daa\'ima Keetii Deeggari',
    'parent_desc': 'Imala barnoota addunyaa daa\'ima keetii qajeelchuuf meeshaalee, qabeenya fi deeggarsa si barbaachisan argadhu.',
    'empower_institution': 'Dhiibbaa Addunyaa Dhaabbata Keetii Cimsi',
    'school_desc': 'Sagantaa barnoota addunyaa dhaabbata keetii fooyyessuuf fi milkaa\'ina barattootaa sadarkaa addunyaatiin hordofuuf Negari waliin tumsa.'
  },
  ti: {
    'start_journey': 'ጉዕዞኻ ጀምር',
    'welcome': 'እንቋዕ ብደሓን መጻኻ',
    'scholarships': 'ስኮላርሺፕ',
    'mentors': 'መምህራን',
    'applications': 'ማመልከቲ',
    'profile': 'መግለጺ',
    'home': 'ገዛ',
    'explore': 'ምርመራ',
    'journey': 'ጉዕዞ',
    'messages': 'መልእክቲ',
    'info': 'ሓበሬታ',
    'stay_updated': 'ኩሉ ግዜ ተሓድሽ። ተዳሎው ኮን።',
    'newsletter_desc': 'ናይ ቀረባ እዋን ዕድላት ስኮላርሺፕ፣ ምኽሪ ዓወት፣ ከምኡ ውን ናይ መድረኽ ምዕባለታት ብኸምኡ ናብ ኢመይልካ ተቀበል።',
    'subscribe_now': 'ሕጂ ተመዝገብ',
    'join_telegram': 'ናይ ቴሌግራም ማሕበረሰብና ተጻወት',
    'email_placeholder': 'ናይ ኢመይል አድራሻኻ እተው',
    'weekly_opportunities': 'ሳምንታዊ ዕድላት',
    'success_tips': 'ምኽሪ ዓወት',
    'platform_updates': 'ምዕባለታት መድረኽ',
    'guide_dreams': 'ሓድሽ ወለዶ መራሕቲ ዓለም መርሕ',
    'mentor_desc': 'ተመክሮ ዓለማዊ ትምህርቲኻ ካፈል፣ ከምኡ ውን ተመሃሮ ኢትዮጵያ ሕልምታቶም ኣብ ዓለም ንኽመሃሩ ሓግዞም።',
    'start_mentoring': 'መምህር ምዃን ጀምር',
    'learn_more': 'ዝያዳ ተማሃር',
    'support_dreams': 'ሕልሚ ዓለማዊ ትምህርቲ ውላድካ ደግፍ',
    'parent_desc': 'ጉዕዞ ዓለማዊ ትምህርቲ ውላድካ ንምምራሕ ዘድልዩካ መሳርሒታት፣ ጸጋታት፣ ከምኡ ውን ደገፍ ረክብ።',
    'empower_institution': 'ዓለማዊ ጽልዋ ትካልካ ሓይልን አቀርብ',
    'school_desc': 'ናይ ትካልካ ዓለማዊ ትምህርቲ ፕሮግራማት ንምምሕያሽ፣ ከምኡ ውን ዓወት ተመሃሮ ብዓለማዊ መንገዲ ንምክትታል ምስ ነጋሪ ተሓባበር።'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguageCode = localStorage.getItem('selectedLanguage');
    if (savedLanguageCode) {
      const savedLanguage = languages.find(lang => lang.code === savedLanguageCode);
      if (savedLanguage) {
        setCurrentLanguage(savedLanguage);
      }
    }
  }, []);

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem('selectedLanguage', language.code);
    
    // Update document language
    document.documentElement.lang = language.code;
    
    // Force page re-render by updating a timestamp
    const event = new CustomEvent('languageChanged', { detail: language });
    window.dispatchEvent(event);
    
    // You can add more language switching logic here
    // For example, update the page direction for RTL languages
  };

  const t = (key: string): string => {
    return translations[currentLanguage.code]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, languages, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};