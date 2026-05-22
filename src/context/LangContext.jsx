import { createContext, useContext, useState } from 'react'

const LangContext = createContext()

export function LangProvider({ children }) {
  const [lang, setLang] = useState('fr')

  const changerLang = (l) => {
    setLang(l)
    document.documentElement.lang = l === 'en' ? 'en' : 'fr'
  }

  return (
    <LangContext.Provider value={{ lang, setLang: changerLang }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
