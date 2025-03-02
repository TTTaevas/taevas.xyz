import React, {useEffect, useState} from "react";
import Info from "../Info.js";
import Umami from "./Umami.js";
import DataHandler from "#Infos/DataHandler.js";

export default function Website() {
  const {data} = DataHandler<boolean>("token?service=umami", 60 * 60 * 8, false);
  const [websites, setWebsites] = useState([] as React.JSX.Element[]);

  //   useEffect(() => {
  //     setWebsites([<aWebsite key={"awebsite"}/>]);
  //   }, []);

  useEffect(() => {
    if (data) {
      const umami = <Umami key={"umami"}/>;
      setWebsites(websites.concat([umami]));
    }
  }, [data]);

  return (
    <Info
      type="Website"
      websites={websites}
    />
  );
}
