import React, {useEffect, useState} from "react";
import Info from "../Info.js";
import Umami from "./Umami.js";

export default function Website() {
  const [token, setToken] = useState(false);
  const [websites, setWebsites] = useState([] as React.JSX.Element[]);
  const [error, setError] = useState(false);

  const getToken = async () => {
    await fetch("/.netlify/functions/token?service=umami").then((r) => {
      if (r.ok) {
        setToken(true);
      } else {
        setError(true);
      }
    });
  };

  useEffect(() => {
    getToken().catch(() => {
      setError(true);
    });
  }, []);

  useEffect(() => {
    if (token) {
      const umami = <Umami key={"umami"}/>;
      setWebsites([umami]);
    }
  }, [token]);

  return (
    <Info
      type="Website"
      websites={websites}
      error={error}
    />
  );
}
