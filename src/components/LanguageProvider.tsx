import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { Languages, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getVisitorCountry } from '@/lib/discovery.functions';

type Language = 'en' | 'sv';
const LanguageContext = createContext({ language: 'en' as Language, setLanguage: (_language: Language) => {}, t: (en: string, _sv: string) => en });
export const useLanguage = () => useContext(LanguageContext);

const categoryTranslations: Record<string, string> = { Adventure: 'Äventyr', Agility: 'Smidighet', Art: 'Konst', Basketball: 'Basket', Battle: 'Strid', Boardgames: 'Brädspel', 'Bubble Shooter': 'Bubbelskjutare', Cards: 'Kortspel', Care: 'Omsorg', Casual: 'Avkopplande', Cooking: 'Matlagning', 'Dress-up': 'Klä upp', Educational: 'Lärande', Football: 'Fotboll', Jigsaw: 'Pusselbitar', 'Mahjong & Connect': 'Mahjong & koppla', 'Match-3': 'Matcha tre', Merge: 'Slå ihop', Puzzle: 'Pussel', Quiz: 'Frågesport', 'Racing & Driving': 'Racing & körning', Shooter: 'Skjutspel', Simulation: 'Simulering', Sports: 'Sport', Strategy: 'Strategi', Horror: 'Skräck' };
export function useCategoryLabel() {
  const { language } = useLanguage();
  return (name: string) => language === 'sv' ? categoryTranslations[name] ?? name : name;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, updateLanguage] = useState<Language>('en');
  const [suggest, setSuggest] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem('stellar_language');
    if (saved === 'en' || saved === 'sv') { updateLanguage(saved); return; }
    if (localStorage.getItem('stellar_language_dismissed')) return;
    let active = true;
    getVisitorCountry().then(({ country }) => { if (active && country === 'SE') setSuggest(true); }).catch(() => {});
    return () => { active = false; };
  }, []);
  useEffect(() => { document.documentElement.lang = language; }, [language]);
  const setLanguage = (next: Language) => {
    updateLanguage(next);
    localStorage.setItem('stellar_language', next);
    setSuggest(false);
  };
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: (en, sv) => language === 'sv' ? sv : en }}>
      {suggest && language === 'en' && <div className="flex flex-wrap items-center justify-center gap-3 border-b bg-surface px-4 py-3 text-sm" role="status">
        <Languages className="size-4 shrink-0 text-primary" />
        <span>It looks like you're in Sweden. Switch to Swedish?</span>
        <Button size="sm" onClick={() => setLanguage('sv')}>Byt till svenska</Button>
        <Button variant="ghost" size="icon" aria-label="Keep English" onClick={() => { setSuggest(false); localStorage.setItem('stellar_language_dismissed', '1'); }}><X className="size-4" /></Button>
      </div>}
      {children}
    </LanguageContext.Provider>
  );
}