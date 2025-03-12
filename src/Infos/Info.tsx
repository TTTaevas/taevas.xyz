import {MisuseOutline} from "@carbon/icons-react";
import React, {Component} from "react";

export default class Info extends Component<{
  type: string;
  websites: React.JSX.Element[];
  error?: boolean;
}> {
  render() {
    const state = this.props.websites.length ? 1 : this.props.error ? 2 : 0;
  
    return (
      <div className="m-2.5 flex w-80 hover:scale-[1.02] active:scale-[1.02]">
        <h2 className={`[text-orientation:upright] [writing-mode:vertical-rl]
        uppercase text-start text-2xl tracking-[-.1em] font-bold pt-2
        rounded-l-xl bg-white select-none
        ${state !== 2 ? "text-sky-600" : "text-purple-600"}`}>
          {this.props.type}
        </h2>
        <div className="block w-72 bg-linear-to-r from-sky-900 to-indigo-900 rounded-r-xl border-b-2 border-r-2 border-white">
          {
            state === 1 ?
              this.props.websites.map((website) => {
                return <div key={`${website.key}-container`}>
                  {website}
                </div>;
              }) :
              state === 2 ?
                <div className="flex h-full bg-linear-to-r from-purple-900 to-pink-900 rounded-xl rounded-l-none border-t-2 border-white">
                  <div className="h-min m-auto">
                    <div className="w-min mb-2 mx-auto">
                      <MisuseOutline size={64} fill="red"/>
                    </div>
                    <p className="mx-4">Failed to load this info! {"><"}</p>
                    <p className="mx-4 mb-2">Please contact me and let me know about it!</p>
                  </div>
                </div> :
                <div className="flex h-full bg-linear-to-r from-sky-900 to-indigo-900 rounded-xl rounded-l-none border-t-2 border-white">
                  <div className="animate-pulse m-auto">
                    <div className="animate-spin h-16 w-16 mx-auto mb-2 border-8 border-sky-600 border-r-gray-200 rounded-full"/>
                    <p className="mx-4">Loading...</p>
                  </div>
                </div>
          }
        </div>
      </div>
    );
  }
}
