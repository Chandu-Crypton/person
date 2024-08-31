// src/app/contexts/LanguageContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the language context
interface LanguageContextType {
  language: string;
  setLanguage: (language: string) => void;
}

// Create the context with default values
const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// LanguageProvider component to wrap the application
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<string>("en"); // Default language

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the LanguageContext
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
