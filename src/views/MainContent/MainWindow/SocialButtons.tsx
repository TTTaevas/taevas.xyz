import React from "react";

import SocialButton from "../../../components/SocialButton.js";

function SocialButtons() {
  return (
    <div className="relative justify-center items-center">
      <SocialButton
        title="YouTube"
        border="border-red-500"
        rotation="rotate-12"
        link="https://www.youtube.com/@TTTaevas"
        image="/logos/youtube.svg"
        padding="p-1"
      />
      <SocialButton
        title="GitHub"
        border="border-black"
        rotation="-rotate-6"
        link="https://github.com/TTTaevas"
        image="/logos/github.svg"
        padding="p-1"
      />
      <SocialButton
        title="osu!"
        border="border-pink-500"
        rotation="-rotate-12"
        link="https://osu.ppy.sh/users/7276846"
        image="/logos/osu.svg"
      />
      <SocialButton
        title="Speedrun.com"
        border="border-yellow-500"
        rotation="rotate-12"
        link="https://www.speedrun.com/users/Taevas"
        image="/logos/speedrundotcom.png"
        padding="p-2"
      />
      <SocialButton
        title="AniList"
        border="border-cyan-500"
        rotation="rotate-6"
        link="https://anilist.co/user/Taevas/"
        image="/logos/anilist.svg"
        padding="p-1"
      />
      <SocialButton
        title="GitLab"
        border="border-orange-500"
        rotation="-rotate-12"
        link="https://gitlab.com/TTTaevas"
        image="/logos/gitlab.svg"
        padding="p-1"
      />
      <SocialButton
        title="Last.fm"
        border="border-red-600"
        rotation="-rotate-6"
        link="https://www.last.fm/user/TTTaevas"
        image="/logos/lastdotfm.png"
        padding="p-1"
      />
    </div>
  );
}

export default SocialButtons;
