import React from "react";

export default function Accordion(props) {
  const { children, title = "test", onTestcaseRunner, isLoading, disabled } = props;

  return (
    <div className="join join-vertical w-full">
      <div className="collapse collapse-arrow join-item border-base-300 border">
       { <input type="radio" name="my-accordion-4" defaultChecked />}
        <div className="collapse-title text-xl font-medium">{title}</div>
        <div className="collapse-content">
          <div className="flex justify-end items-center">
            <button
              className="btn btn-outline btn-xs tooltip tooltip"
              onClick={() => onTestcaseRunner()}
              data-tip="Run"
              disabled={disabled}
            >
              {isLoading ? (
                <span class="loading loading-spinner w-[1rem]"></span>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-6.518-3.759A1 1 0 007 8.25v7.5a1 1 0 001.234.97l6.518-3.759a1 1 0 000-1.742z"
                  />
                </svg>
              )}
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
