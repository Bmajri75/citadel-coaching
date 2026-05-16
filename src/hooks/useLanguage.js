import { useEffect } from 'react';
import i18n from '../i18n';

const STORAGE_KEY = 'lang_pref';

export function useLanguageDetect() {
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      i18n.changeLanguage(saved);
      return;
    }

    fetch('https://ipapi.co/json/')
      .then((r) => r.json())
      .then((data) => {
        const lang = data.country_code === 'FR' ? 'fr' : 'en';
        i18n.changeLanguage(lang);
      })
      .catch(() => {
        const lang = navigator.language?.startsWith('fr') ? 'fr' : 'en';
        i18n.changeLanguage(lang);
      });
  }, []);
}

export function setLanguage(lang) {
  i18n.changeLanguage(lang);
  localStorage.setItem(STORAGE_KEY, lang);
}
