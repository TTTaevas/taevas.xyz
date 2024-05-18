import React from "react";

export type TabDetails = {
  id: string;
  priority: string;
};

export const LanguageContext = React.createContext<string>("en");
export const TabContext = React.createContext<TabDetails[]>([]);
