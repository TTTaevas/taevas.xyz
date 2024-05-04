import React from "react";
import Info from "../Info.js";
import GitHub from "./Coding/GitHub.js";
import GitLab from "./Coding/GitLab.js";

export default function Coding() {
  const github = <GitHub key={"github"}/>;
  const gitlab = <GitLab key={"gitlab"}/>;

  return (
    <Info
      type="Coding"
      websites={[
        github,
        gitlab,
      ]}
    />
  );
}
