import React from "react";
import {LanguageContext} from "../views/MainContent.js";

export default function Translatable({
  en,
  fr,
}: {
  en: string | React.JSX.Element;
  fr?: string | React.JSX.Element;
}) {
  const lang = React.useContext(LanguageContext);
  
  if (lang === "fr" && fr) {
    return fr;
  } else {
    return en;
  }
}
