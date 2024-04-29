import React from "react";

import SocialButton from "../../../components/SocialButton.js";

function SocialButtons() {
  return (
    <div className="relative justify-center items-center">
      <SocialButton
        title="YouTube"
        border="border-red-500"
        rotation="rotate-12"
        link="https://youtube.com"
        image="youtube.svg"
      />
      <SocialButton
        title="GitHub"
        border="border-black"
        rotation="-rotate-6"
        link="https://github.com"
        image="github.svg"
      />
    </div>
  );
}

export default SocialButtons;
