import React, {Component} from "react";

export default class Info extends Component<{
  type: string;
  websites: React.JSX.Element[];
  error?: boolean;
}> {
  render() {
    return (
      <div className="m-5 flex w-80 border-l-3 border-r-3 border-b-3 border-white border-solid" id={this.props.type.toLowerCase()}>
        <h2 className={`[text-orientation:upright] [writing-mode:vertical-rl]
        uppercase text-start text-2xl tracking-[-.1em] font-bold pt-2
        border-r-3 border-t-3 border-white border-solid
        ${!this.props.error ? "bg-sky-800" : "bg-purple-800"}`}>
          {this.props.type}
        </h2>
        {
          !this.props.error ?
            this.props.websites.length ?
              <div className="w-80 bg-gradient-to-r from-sky-900 to-indigo-900">
                {this.props.websites.map((website) => {
                  return <>{website}</>;
                })}
              </div> :
              <div className="flex w-80 bg-gradient-to-r from-sky-900 to-indigo-900 border-t-3">
                <div className="animate-pulse h-min m-auto">
                  <div className="animate-spin h-16 w-16 mx-auto mb-2 border-8 border-sky-600 border-r-gray-200 rounded-full"/>
                  <p className="mx-4">Loading...</p>
                </div>
              </div> :
            <div className="flex w-80 bg-gradient-to-r from-purple-900 to-pink-900 border-t-3">
              <div className="h-min m-auto">
                <img className="w-16 mb-2 mx-auto" src="/cds/misuse--outline.svg"/>
                <p className="mx-4">Failed to load this info! {"><"}</p>
                <p className="mx-4 mb-2">Please contact me and let me know about it!</p>
              </div>
            </div>
        }
      </div>
    );
  }
}
