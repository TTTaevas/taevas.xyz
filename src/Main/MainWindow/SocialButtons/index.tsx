import React from "react";
import SocialButton from "./SocialButton.tsx";

export default function SocialButtons() {
  return (
    <div className="relative justify-center items-center">
      <SocialButton
        title="YouTube"
        border="border-red-500"
        rotation="rotate-12"
        link="https://www.youtube.com/@TTTaevas"
        image="assets/logos/youtube.svg"
        padding="p-1"
      />
      <SocialButton
        title="GitHub"
        border="border-black"
        rotation="-rotate-6"
        link="https://github.com/TTTaevas"
        image="assets/logos/github.svg"
        padding="p-1"
      />
      <SocialButton
        title="osu!"
        border="border-pink-500"
        rotation="-rotate-12"
        link="https://osu.ppy.sh/users/7276846"
        image="assets/logos/osu.svg"
      />
      <SocialButton
        title="Speedrun.com"
        border="border-yellow-500"
        rotation="rotate-12"
        link="https://www.speedrun.com/users/Taevas"
        image="assets/logos/speedrundotcom.png"
        padding="p-2"
      />
      <SocialButton
        title="AniList"
        border="border-cyan-500"
        rotation="rotate-6"
        link="https://anilist.co/user/Taevas/"
        image="assets/logos/anilist.svg"
        padding="p-1"
      />
      <SocialButton
        title="GitLab"
        border="border-orange-500"
        rotation="-rotate-12"
        link="https://gitlab.com/TTTaevas"
        image="assets/logos/gitlab.svg"
        padding="p-1"
      />
      <SocialButton
        title="Last.fm"
        border="border-red-600"
        rotation="-rotate-6"
        link="https://www.last.fm/user/TTTaevas"
        image="assets/logos/lastdotfm.png"
        padding="p-1"
      />
    </div>
  );
}
