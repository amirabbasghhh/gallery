"use client"
import React, { createContext, useState, useContext } from "react";

// تایپ برای SelectedOption
type SelectedOptionContextType = {
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
};

const SelectedOptionContext = createContext<SelectedOptionContextType | undefined>(undefined);


export const SelectedOptionProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedOption, setSelectedOption] = useState<string>("all");

  return (
    <SelectedOptionContext.Provider value={{ selectedOption, setSelectedOption }}>
      {children}
    </SelectedOptionContext.Provider>
  );
};


export const useSelectedOption = (): SelectedOptionContextType => {
  const context = useContext(SelectedOptionContext);
  if (!context) {
    throw new Error("useSelectedOption must be used within a SelectedOptionProvider");
  }
  return context;
};
