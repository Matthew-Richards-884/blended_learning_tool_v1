export const Tooltip = ({ text, id }) => (
  <div
    id={`tooltip-${id}`}
    role="tooltip"
    className="invisible absolute right-full z-10 me-2 inline-block rounded-sm bg-gray-600 px-2 py-1 text-sm font-medium whitespace-nowrap text-white opacity-0 shadow-sm transition-opacity duration-300 peer-hover:visible peer-hover:opacity-100"
  >
    {text}
  </div>
);


