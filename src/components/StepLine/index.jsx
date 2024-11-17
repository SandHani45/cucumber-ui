import React, { memo, useState } from "react";
import StringInput from "../StringInput";

const StepLine = (props) => {
  const { children, title = "steps" } = props;
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`flex flex-col`}>
      <button
        onClick={toggleAccordion}
        className="flex items-center justify-start gap-2 w-full py-2 px-4  focus:outline-none"
      >
        {!children ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 ml-2 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        ) : (
          <span
            className={`transform transition-transform mr-2 ml-3 ${
              isOpen ? "rotate-90" : "rotate-0"
            }`}
          >
            ▶
          </span>
        )}

        <StringInput text={title} />
      </button>
      {children && isOpen && (
        <div
          className={`transition-max-width duration-500 ease-in-out overflow-hidden ${
            isOpen ? "w-[90%] ml-[4rem]" : "max-w-0"
          } ${"mt-4"}`}
        >
          <div className="p-2">{children}</div>
        </div>
      )}
    </div>
  );
};

export default memo(StepLine);
