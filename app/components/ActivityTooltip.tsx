export const ActivityTooltip = ({ text, id }) => (
  <div
    id={`tooltip-${id}`}
    role="tooltip"
    className="invisible absolute right-full z-10 inline-block whitespace-nowrap rounded-lg bg-gray-900 px-2 py-1 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 peer-hover:visible peer-hover:opacity-100 dark:bg-gray-700"
  >
    {text}
    <div className="tooltip-arrow" data-popper-arrow></div>
  </div>
);
