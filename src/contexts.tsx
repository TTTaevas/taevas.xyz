import React from "react";

export interface TabDetails {
  id: string;
  priority: string;
}

export const LanguageContext = React.createContext<string>("en");
export const TabContext = React.createContext<TabDetails[]>([]);
