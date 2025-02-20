const Checkmark: React.FC = () => {
  return (
    <div className="mt-4 flex size-full items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-16 text-success"
      >
        <circle cx="12" cy="12" r="10" className="stroke-success" />
        <path d="M5.5 12.5l4 4 8-8" className="animate-checkmark" />
      </svg>
    </div>
  );
};

export default Checkmark;
