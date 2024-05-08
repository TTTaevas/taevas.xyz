import React from "react";
import {LanguageContext} from "../views/MainContent.js";

export default function Translatable<T extends string | React.JSX.Element>({
  en,
  fr,
}: {
  en: T;
  fr?: T;
}) {
  const lang = React.useContext(LanguageContext);
  
  if (lang === "fr" && fr) {
    return fr;
  } else {
    return en;
  }
}
