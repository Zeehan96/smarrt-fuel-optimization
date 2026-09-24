import { Info } from "lucide-react";
import { enqueueSnackbar } from "notistack";
import React from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

export default function CustomTooltip(props) {
  if (!props) {
    enqueueSnackbar("Tooltip props are missing", { variant: "error" });
    return null;
  }
  const { content, toolTipId } = props;
  const isHtml = typeof content === "string" && /<[a-z][\s\S]*>/i.test(content);

  return (
    <>
      <Info
        data-tooltip-id={toolTipId}
        {...(isHtml
          ? { "data-tooltip-html": content }
          : { "data-tooltip-content": content })}
        className={`w-4 h-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-help`}
      />
      <ReactTooltip
        id={toolTipId}
        place="top"
        className="react-tooltip-style"
      />
    </>
  );
}
