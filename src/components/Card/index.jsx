import { memo } from "react";
import { Link } from "react-router-dom";

const Card = ({
  tagName = "Test",
  scenarioCount = "0",
  featureCount = "0",
  onClickRun,
  progress = 0,
  isRunning = false,
  disabled = false,
}) => {
  const renderCardLink = () => {
    if (disabled) {
      return (
        <div className="flex flex-col gap-4">
          <h5 className="mb-2 text-xl font-semibold">{tagName}</h5>
          <div>
            <span className="ms-2 inline-block whitespace-nowrap rounded-[0.27rem] bg-danger-100  pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-[#001f60]  ">
              Scenario Count: {scenarioCount}
            </span>
            <span className="ms-2 inline-block whitespace-nowrap rounded-[0.27rem] bg-danger-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-[#001f60]  ">
              Feature Count: {featureCount}
            </span>
          </div>
        </div>
      );
    }
    return (
      <Link className="flex flex-col gap-4" to={`/${tagName}`}>
        <h5 className="mb-2 text-xl font-semibold">{tagName}</h5>
        <div>
          <span className="ms-2 inline-block whitespace-nowrap rounded-[0.27rem] bg-danger-100  pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-[#001f60]  ">
            Scenario Count: {scenarioCount}
          </span>
          <span className="ms-2 inline-block whitespace-nowrap rounded-[0.27rem] bg-danger-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-[#001f60]  ">
            Feature Count: {featureCount}
          </span>
        </div>
      </Link>
    );
  };
  return (
    <div className="flex card bg-[white] w-[22rem] shadow-xl mb-6 cursor-pointer">
      <div className="p-4 flex justify-between">
        {renderCardLink()}
        <div className="flex flex-col gap-2">
          <button
            className="btn btn-outline btn-xs tooltip tooltip"
            data-tip="Run"
            onClick={() => onClickRun(tagName)}
            disabled={disabled}
          >
            {" "}
            {!isRunning && (
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
            {isRunning && (
              <span class="loading loading-spinner w-[1rem]"></span>
            )}
          </button>
          <button
            className="btn btn-outline btn-warning  btn-xs tooltip tooltip"
            data-tip="Report"
            disabled={disabled}
            onClick={() => {}}
          >
            {" "}
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
                d="M9 12h6m-6 4h6m2 4H7a2 2 0 01-2-2V6a2 2 0 012-2h5l2 2h4a2 2 0 012 2v12a2 2 0 01-2 2z"
              />
            </svg>
          </button>
        </div>
      </div>
      {/* {!!isRunning && (
        <div className="w-full flex justify-center items-center">
          <progress
            class="progress progress-warning w-60 m-4"
            value={progress}
            max="100"
          ></progress>{" "}
          <span className="text-xs">{`${progress}%`}</span>
        </div>
      )} */}
    </div>
  );
};
export default memo(Card);
