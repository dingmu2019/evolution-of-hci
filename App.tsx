import React from 'react';
import SectionMechanical from './components/SectionMechanical';
import SectionDesktop from './components/SectionDesktop';
import SectionTouch from './components/SectionTouch';
import SectionVoice from './components/SectionVoice';
import SectionVision from './components/SectionVision';
import SectionBCI from './components/SectionBCI';
import SectionFuture from './components/SectionFuture';
import SectionWrapper from './components/SectionWrapper';
import { LanguageProvider, useLanguage } from './LanguageContext';

const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useLanguage();
  
  const getNextLanguageLabel = () => {
    if (language === 'zh') return 'EN / English';
    if (language === 'en') return 'ES / Español';
    if (language === 'es') return 'AR / العربية';
    return 'CN / 中文';
  };

  return (
    <button
      onClick={toggleLanguage}
      className={`fixed top-6 ${language === 'ar' ? 'left-6' : 'right-6'} z-50 px-4 py-2 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white font-mono hover:bg-white/20 transition-all cursor-pointer shadow-lg hover:scale-105 active:scale-95`}
    >
      {getNextLanguageLabel()}
    </button>
  );
};

const AppContent: React.FC = () => {
  const { language } = useLanguage();

  return (
    <main className="w-full bg-black relative" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <LanguageSwitcher />
      
      {/* Scroll Progress Line (Visual Only) */}
      <div className={`fixed ${language === 'ar' ? 'right-6 md:right-12' : 'left-6 md:left-12'} top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent z-40 hidden md:block pointer-events-none`} />

      <SectionWrapper eraPrefix="era_mech" index={0}>
        <SectionMechanical />
      </SectionWrapper>

      <SectionWrapper eraPrefix="era_desktop" index={1}>
        <SectionDesktop />
      </SectionWrapper>

      <SectionWrapper eraPrefix="era_touch" index={2}>
        <SectionTouch />
      </SectionWrapper>

      <SectionWrapper eraPrefix="era_voice" index={3}>
        <SectionVoice />
      </SectionWrapper>

      <SectionWrapper eraPrefix="era_vision" index={4}>
        <SectionVision />
      </SectionWrapper>

      <SectionWrapper eraPrefix="era_bci" index={5}>
        <SectionBCI />
      </SectionWrapper>

      <SectionWrapper eraPrefix="era_future" index={6}>
        <SectionFuture />
      </SectionWrapper>
      
      <footer className="w-full py-6 text-center text-white/40 text-sm bg-black relative z-50">
        <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" className="hover:text-white/80 transition-colors">
          津ICP备2025041707号-1
        </a>
      </footer>
    </main>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;