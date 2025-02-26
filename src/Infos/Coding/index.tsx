import React from "react";
import Info from "../Info.js";
import GitHub from "./GitHub.js";
import GitLab from "./GitLab.js";
import KitsuDev from "./KitsuDev.js";

export default function Coding() {
  const github = <GitHub key={"github"}/>;
  const gitlab = <GitLab key={"gitlab"}/>;
  const kitsudev = <KitsuDev key={"kitsudev"}/>;

  return (
    <Info
      type="Coding"
      websites={[
        github,
        gitlab,
        kitsudev,
      ]}
    />
  );
}
