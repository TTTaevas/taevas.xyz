import React from "react";
import Info from "../../Info.js";

export function handleError(type: string, isError: boolean, seriousError?: unknown) {
  if (seriousError) {
    console.error("Something bad happened! ><\nPlease let me know about it!\n", seriousError, "\nSorry about that!!");
  }

  return (
    <Info
		  type={type}
		  websites={[]}
		  error={isError}
    />
  );
}
