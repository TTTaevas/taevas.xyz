import React from "react";
import Info from "../Info.tsx";
import GitHub from "./GitHub.tsx";
import GitLab from "./GitLab.tsx";
import KitsuDev from "./KitsuDev.tsx";

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
