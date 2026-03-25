import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'en' | 'zh' | 'es' | 'ar';

interface EraData {
  title: string;
  year: string;
  type: string;
  desc: string;
}

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
  getEra: (key: string) => EraData;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // UI Elements
    scroll_hint: "SCROLL TO EXPLORE",
    
    // Era 1: Mechanical
    era_mech_title: "The Mechanical Age",
    era_mech_year: "1800s - 1960s",
    era_mech_type: "Physical Switches & Punch Cards",
    era_mech_desc: "Interaction was physical and laborious. Humans had to speak the machine's language through gears, levers, and punched holes. Compute was raw and tangible.",

    // Era 2: Desktop
    era_desktop_title: "Command Line & GUI",
    era_desktop_year: "1970s - 1990s",
    era_desktop_type: "Keyboard & Mouse",
    era_desktop_desc: "The abstraction layer thickens. We type codes into glowing terminals. The mouse gives us a virtual hand. The screen becomes a desktop metaphor.",

    // Era 3: Touch
    era_touch_title: "The Mobile Era",
    era_touch_year: "2007 - 2020",
    era_touch_type: "Multi-Touch & Gestures",
    era_touch_desc: "Screens become responsive surfaces. We pinch, zoom, and swipe. The internet moves from our desks into our pockets. Digital content feels tangible.",

    // Era 4: Voice
    era_voice_title: "Generative Voice",
    era_voice_year: "2023 - Present",
    era_voice_type: "Natural Language Conversation",
    era_voice_desc: "The barrier of code dissolves. We speak to machines as we speak to humans. AI understands context, nuance, and intent through voice.",

    // Era 5: Vision
    era_vision_title: "Spatial Computing",
    era_vision_year: "2024 - Future",
    era_vision_type: "Eye Tracking & Hand Gestures",
    era_vision_desc: "The screen disappears. Digital information overlays the physical world. Your eyes act as the cursor, your fingers as the click. The world is the canvas.",

    // Era 6: BCI
    era_bci_title: "Bio-Digital Symbiosis",
    era_bci_year: "2030s",
    era_bci_type: "Neural Interface (BCI)",
    era_bci_desc: "The final friction is removed. Devices read neural signals directly. Wearables become a second skin. Intention translates instantly to action.",

    // Era 7: Future
    era_future_title: "Manifestation",
    era_future_year: "Beyond",
    era_future_type: "Pure Intent",
    era_future_desc: "Reality becomes fluid. The distinction between physical and digital evaporates completely. What you imagine, simply becomes.",
    
    // Legacy/Internal keys
    desktop_typing: "C:> SYSTEM.INIT\n> LOADING DRIVERS...\n> MOUSE_INPUT: DETECTED\n> KEYBOARD: READY\n> GUI_MODE: ACTIVE\n> _",
    vision_obj_1: "Person",
    vision_obj_2: "Object",
    vision_obj_3: "Device",
    vision_sub: "Analyzing...",
    bci_sub: "Neural Sync: 100%",
    theme_forest: "Forest",
    theme_ocean: "Ocean",
    theme_fire: "Fire",
    theme_space: "Cosmos"
  },
  zh: {
     // UI Elements
    scroll_hint: "向下滚动探索演进史",

    // Era 1: Mechanical
    era_mech_title: "机械时代",
    era_mech_year: "1800s - 1960s",
    era_mech_type: "物理开关 & 打孔卡",
    era_mech_desc: "交互是物理且繁重的。人类必须通过齿轮、杠杆和打孔纸带来说机器的语言。计算是原始且可触摸的。",

    // Era 2: Desktop
    era_desktop_title: "桌面计算时代",
    era_desktop_year: "1970s - 1990s",
    era_desktop_type: "键盘 & 鼠标 (CLI/GUI)",
    era_desktop_desc: "抽象层加厚。我们在发光的终端中输入代码。鼠标赋予了我们虚拟的手。屏幕变成了桌面的隐喻。",

    // Era 3: Touch
    era_touch_title: "移动触控时代",
    era_touch_year: "2007 - 2020",
    era_touch_type: "多点触控 & 手势",
    era_touch_desc: "屏幕变得有灵性。我们捏合、缩放、滑动。互联网从桌面进入了口袋。数字内容变得触手可及。",

    // Era 4: Voice
    era_voice_title: "生成式语音",
    era_voice_year: "2023 - 至今",
    era_voice_type: "自然语言对话",
    era_voice_desc: "代码的壁垒消融。我们像与人交谈一样与机器对话。AI 通过语音理解语境、情绪和意图。",

    // Era 5: Vision
    era_vision_title: "空间计算",
    era_vision_year: "2024 - 未来",
    era_vision_type: "眼动追踪 & 手势",
    era_vision_desc: "屏幕消失了。数字信息叠加在物理世界之上。你的眼睛是光标，你的手指是点击。世界即画布。",

    // Era 6: BCI
    era_bci_title: "生物数字共生",
    era_bci_year: "2030s",
    era_bci_type: "脑机接口 (BCI)",
    era_bci_desc: "最后的摩擦力被消除。设备直接读取神经信号。穿戴设备成为第二层皮肤。意念瞬间转化为行动。",

    // Era 7: Future
    era_future_title: "显化",
    era_future_year: "未来 & 超越",
    era_future_type: "纯粹意念",
    era_future_desc: "现实变得流动。物理与数字的区别完全蒸发。你所想象的，即刻成为现实。",

    // Legacy/Internal keys
    desktop_typing: "C:> 系统初始化...\n> 加载驱动...\n> 鼠标输入: 已检测\n> 键盘: 就绪\n> 图形界面: 激活\n> _",
    vision_obj_1: "人物",
    vision_obj_2: "物体",
    vision_obj_3: "设备",
    vision_sub: "环境分析中...",
    bci_sub: "神经同步率：100%",
    theme_forest: "森林",
    theme_ocean: "海洋",
    theme_fire: "火焰",
    theme_space: "宇宙"
  },
  es: {
    scroll_hint: "DESPLÁZATE PARA EXPLORAR",
    era_mech_title: "La Era Mecánica",
    era_mech_year: "1800s - 1960s",
    era_mech_type: "Interruptores Físicos y Tarjetas Perforadas",
    era_mech_desc: "La interacción era física y laboriosa. Los humanos tenían que hablar el idioma de la máquina a través de engranajes, palancas y agujeros perforados. El cálculo era crudo y tangible.",
    era_desktop_title: "Línea de Comandos y GUI",
    era_desktop_year: "1970s - 1990s",
    era_desktop_type: "Teclado y Ratón",
    era_desktop_desc: "La capa de abstracción se espesa. Escribimos códigos en terminales brillantes. El ratón nos da una mano virtual. La pantalla se convierte en una metáfora de escritorio.",
    era_touch_title: "La Era Móvil",
    era_touch_year: "2007 - 2020",
    era_touch_type: "Multitáctil y Gestos",
    era_touch_desc: "Las pantallas se convierten en superficies receptivas. Pellizcamos, hacemos zoom y deslizamos. Internet pasa de nuestros escritorios a nuestros bolsillos. El contenido digital se siente tangible.",
    era_voice_title: "Voz Generativa",
    era_voice_year: "2023 - Presente",
    era_voice_type: "Conversación en Lenguaje Natural",
    era_voice_desc: "La barrera del código se disuelve. Hablamos con las máquinas como hablamos con los humanos. La IA comprende el contexto, los matices y la intención a través de la voz.",
    era_vision_title: "Computación Espacial",
    era_vision_year: "2024 - Futuro",
    era_vision_type: "Seguimiento Ocular y Gestos",
    era_vision_desc: "La pantalla desaparece. La información digital se superpone al mundo físico. Tus ojos actúan como el cursor, tus dedos como el clic. El mundo es el lienzo.",
    era_bci_title: "Simbiosis Bio-Digital",
    era_bci_year: "2030s",
    era_bci_type: "Interfaz Neuronal (BCI)",
    era_bci_desc: "Se elimina la fricción final. Los dispositivos leen señales neuronales directamente. Los wearables se convierten en una segunda piel. La intención se traduce instantáneamente en acción.",
    era_future_title: "Manifestación",
    era_future_year: "Más Allá",
    era_future_type: "Intención Pura",
    era_future_desc: "La realidad se vuelve fluida. La distinción entre lo físico y lo digital se evapora por completo. Lo que imaginas, simplemente se convierte en realidad.",
    desktop_typing: "C:> SYSTEM.INIT\n> CARGANDO CONTROLADORES...\n> MOUSE_INPUT: DETECTADO\n> TECLADO: LISTO\n> GUI_MODE: ACTIVO\n> _",
    vision_obj_1: "Persona",
    vision_obj_2: "Objeto",
    vision_obj_3: "Dispositivo",
    vision_sub: "Analizando...",
    bci_sub: "Sincronización Neuronal: 100%",
    theme_forest: "Bosque",
    theme_ocean: "Océano",
    theme_fire: "Fuego",
    theme_space: "Cosmos"
  },
  ar: {
    scroll_hint: "قم بالتمرير للاستكشاف",
    era_mech_title: "العصر الميكانيكي",
    era_mech_year: "1800s - 1960s",
    era_mech_type: "مفاتيح فيزيائية وبطاقات مثقبة",
    era_mech_desc: "كان التفاعل جسديًا وشاقًا. كان على البشر التحدث بلغة الآلة من خلال التروس والرافعات والثقوب. كانت الحوسبة خامًا وملموسة.",
    era_desktop_title: "سطر الأوامر وواجهة المستخدم الرسومية",
    era_desktop_year: "1970s - 1990s",
    era_desktop_type: "لوحة المفاتيح والفأرة",
    era_desktop_desc: "تزداد طبقة التجريد. نكتب الرموز في محطات مضيئة. الفأرة تعطينا يدًا افتراضية. تصبح الشاشة استعارة لسطح المكتب.",
    era_touch_title: "عصر الهاتف المحمول",
    era_touch_year: "2007 - 2020",
    era_touch_type: "اللمس المتعدد والإيماءات",
    era_touch_desc: "تصبح الشاشات أسطحًا سريعة الاستجابة. نقوم بالقرص والتكبير والتمرير. ينتقل الإنترنت من مكاتبنا إلى جيوبنا. المحتوى الرقمي يبدو ملموسًا.",
    era_voice_title: "الصوت التوليدي",
    era_voice_year: "2023 - الحاضر",
    era_voice_type: "محادثة باللغة الطبيعية",
    era_voice_desc: "يذوب حاجز الكود. نتحدث إلى الآلات كما نتحدث إلى البشر. يفهم الذكاء الاصطناعي السياق والفروق الدقيقة والنية من خلال الصوت.",
    era_vision_title: "الحوسبة المكانية",
    era_vision_year: "2024 - المستقبل",
    era_vision_type: "تتبع العين وإيماءات اليد",
    era_vision_desc: "تختفي الشاشة. تتراكب المعلومات الرقمية على العالم المادي. تعمل عيناك كمؤشر، وأصابعك كنقرة. العالم هو اللوحة.",
    era_bci_title: "التعايش الحيوي الرقمي",
    era_bci_year: "2030s",
    era_bci_type: "الواجهة العصبية (BCI)",
    era_bci_desc: "تتم إزالة الاحتكاك النهائي. تقرأ الأجهزة الإشارات العصبية مباشرة. تصبح الأجهزة القابلة للارتداء بشرة ثانية. تُترجم النية على الفور إلى عمل.",
    era_future_title: "التجلي",
    era_future_year: "ما وراء ذلك",
    era_future_type: "نية خالصة",
    era_future_desc: "يصبح الواقع سائلًا. يتبخر التمييز بين المادي والرقمي تمامًا. ما تتخيله، يصبح ببساطة.",
    desktop_typing: "C:> SYSTEM.INIT\n> جاري تحميل برامج التشغيل...\n> MOUSE_INPUT: تم الكشف\n> لوحة المفاتيح: جاهزة\n> GUI_MODE: نشط\n> _",
    vision_obj_1: "شخص",
    vision_obj_2: "كائن",
    vision_obj_3: "جهاز",
    vision_sub: "جاري التحليل...",
    bci_sub: "المزامنة العصبية: 100%",
    theme_forest: "غابة",
    theme_ocean: "محيط",
    theme_fire: "نار",
    theme_space: "كون"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const getInitialLanguage = (): Language => {
  const savedLanguage = localStorage.getItem('preferredLanguage') as Language;
  if (savedLanguage && ['en', 'zh', 'es', 'ar'].includes(savedLanguage)) {
    return savedLanguage;
  }

  // 1. Try browser language first
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('zh')) return 'zh';
  if (browserLang.startsWith('es')) return 'es';
  if (browserLang.startsWith('ar')) return 'ar';
  if (browserLang.startsWith('en')) return 'en';

  // 2. Fallback to timezone-based detection
  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timeZone) {
      if (timeZone.startsWith('Asia/Shanghai') || timeZone.startsWith('Asia/Taipei') || timeZone.startsWith('Asia/Hong_Kong') || timeZone.startsWith('Asia/Macau')) {
        return 'zh';
      }
      if (timeZone.startsWith('Europe/Madrid') || timeZone.startsWith('America/Mexico_City') || timeZone.startsWith('America/Buenos_Aires') || timeZone.startsWith('America/Bogota') || timeZone.startsWith('America/Lima') || timeZone.startsWith('America/Santiago')) {
        return 'es';
      }
      if (timeZone.startsWith('Asia/Riyadh') || timeZone.startsWith('Asia/Dubai') || timeZone.startsWith('Africa/Cairo') || timeZone.startsWith('Africa/Casablanca') || timeZone.startsWith('Asia/Baghdad')) {
        return 'ar';
      }
    }
  } catch (e) {
    // Ignore timezone errors
  }

  // Default to English if no match
  return 'en';
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  const toggleLanguage = () => {
    setLanguage(prev => {
      let nextLang: Language = 'en';
      if (prev === 'zh') nextLang = 'en';
      else if (prev === 'en') nextLang = 'es';
      else if (prev === 'es') nextLang = 'ar';
      else if (prev === 'ar') nextLang = 'zh';
      
      localStorage.setItem('preferredLanguage', nextLang);
      return nextLang;
    });
  };

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  const getEra = (prefix: string): EraData => {
      const l = translations[language];
      return {
          title: l[`${prefix}_title`] || '',
          year: l[`${prefix}_year`] || '',
          type: l[`${prefix}_type`] || '',
          desc: l[`${prefix}_desc`] || ''
      }
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, getEra }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};