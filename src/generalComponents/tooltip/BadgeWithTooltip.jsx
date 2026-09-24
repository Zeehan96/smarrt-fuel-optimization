import { Tooltip as ReactTooltip } from "react-tooltip";

export const BadgeWithTooltip = ({
  badge,
  isActive,
  isSubmenuActive,
  id,
  type,
}) => {
  const active = isActive || isSubmenuActive;
  const tooltipId = `badge-tooltip-${id}`;
  const tooltipContent = type
    ? `${badge} open ${type} ticket${badge !== 1 ? "s" : ""}`
    : `${badge} open ticket${badge !== 1 ? "s" : ""}`;

  return (
    <>
      <span
        data-tooltip-id={tooltipId}
        data-tooltip-content={tooltipContent}
        className={`ml-3 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-semibold cursor-default ${
          active
            ? "bg-white/20 text-white"
            : "bg-[#113071]/10 text-[#113071] dark:bg-[#113071]/30 dark:text-white"
        }`}
      >
        {badge}
      </span>
      <ReactTooltip
        id={tooltipId}
        place="top"
        className="react-tooltip-style"
      />
    </>
  );
};
