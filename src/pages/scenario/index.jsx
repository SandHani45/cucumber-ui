// src/pages/scenario.js
import React, { memo, useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Accordion, AgTable, StepLine, StringInput } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeatureStepSlice } from "../../features/featureStepSlice";
import { onRunningScenario } from "../../features/globalSlice";

const Scenario = () => {
  const { tagId } = useParams();
  const dispatch = useDispatch();

  const { featureStep, loading, error, mapTagsFeaturesScenariosData } =
    useSelector((state) => state.featureStep);
  const { isScenarioRunning, runningScenario, runningTag } = useSelector(
    (state) => state.globalState
  );
  // useEffect(() => {
  //   if (!featureStep.length) {
  //    dispatch(fetchFeatureStepSlice());
  //   }
  // }, [featureStep.length, dispatch]);

  const onTestcaseRunner = useCallback(
    (tag, scenarioId) => {
      dispatch(onRunningScenario({ tag, scenarioId }));
    },
    [dispatch]
  );

  const steps =
    mapTagsFeaturesScenariosData && mapTagsFeaturesScenariosData[tagId];
  const renderFeatureLine = useCallback(() => {
    return steps?.scenarioSteps?.map((scenario) => {
      const stepLine = scenario?.stepLines;
      const examples = scenario?.properties?.examples;
      let isRunning =
        isScenarioRunning &&
        (runningScenario === scenario.id ||
          (runningTag === tagId && !runningScenario));
      let isDisabled = runningScenario && !isRunning;
      return (
        <Accordion
          disabled={isDisabled}
          title={scenario.data}
          isLoading={isRunning}
          onTestcaseRunner={() => onTestcaseRunner(tagId, scenario.id)}
        >
          {stepLine &&
            stepLine.map((step) => {
              return (
                <StepLine title={step?.data?.trim()}>
                  {/* <AgTable /> */}
                </StepLine>
              );
            })}
          {!!examples?.length && (
            <div className="py-3 px-5">{<AgTable examples={examples} />}</div>
          )}
        </Accordion>
      );
    });
  },[]);
  return (
    <div>
      {/* title section */}
      <div className="p-4 flex items-center gap-4">
        <Link to="/" className="btn btn-sm btn btn-ghost">
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </Link>

        <h4 className="font-bold text-l">Tag Name: {tagId}</h4>
      </div>
      {/* Scenario Section */}
      <div className="flex w-full p-3">
        <div className="flex-grow w-8/10">{renderFeatureLine()}</div>
      </div>
    </div>
  );
};

export default memo(Scenario);
