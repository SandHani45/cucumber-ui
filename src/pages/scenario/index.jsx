// src/pages/scenario.js
import React, { memo, useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Accordion, AgTable, StepLine, StringInput, Terminal } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeatureStepSlice } from "../../features/featureStepSlice";
import { onRunningScenario, exampleTableLineSlice } from "../../features/globalSlice";
import Toast from "../../components/Toast";

const BASE_URL =
  process.env.BACKEND_URL || "https://0aba-86-98-70-229.ngrok-free.app";

const Scenario = () => {
  const { tagId } = useParams();
  const dispatch = useDispatch();
  const [newTable, setNewTable] = useState([])
  const [isLogLoading, setIsLogLoading] = useState(false);
  const [logs, setLogs] = useState([]);
  const [toastMsg, setToastMsg] = useState({
    status: "",
    message: ""
  })

  const { featureStep, projectId, loading, error, mapTagsFeaturesScenariosData } =
    useSelector((state) => state.featureStep);

  const { loading: scenarioLoading } = useSelector(
    (state) => state.globalState
  );

  useEffect(() => {
    if (!Object.keys(featureStep)?.length) {
     dispatch(fetchFeatureStepSlice({url:localStorage.getItem('url')}));
    }
  }, [Object.keys(featureStep)?.length, dispatch]);


  const renderToast = () => {
    return toastMsg.message && <Toast onClear={(res)=>setToastMsg(res)} status={toastMsg.status} isOpen={true} message={toastMsg.message} />
  }
  
  const onTestcaseRunner = useCallback(
    async (tag, scenarioId) => {
      let addNewRow = {
        data: [...newTable],
        scenarioId,
        projectId: projectId
      }
      setIsLogLoading(true);
      dispatch(exampleTableLineSlice(addNewRow));
      
      return fetch(`${BASE_URL}/run/tag`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tag: tag,
          projectId: "sample-cucumber-test",
        }),
      })
        .then((res) => {
          const reader = res.body.getReader();
          return reader.read().then(function processtext({ done, value }) {
            if (done) {
              setIsLogLoading(false);
              setToastMsg({
                status: 'success',
                message:  `${tag} feature execution completed`
              })
              return;
            }
            let receivedLength = 0; // Track received data length
            const decoder = new TextDecoder("utf-8");
            const chunk = decoder.decode(value, { stream: true });
            if (chunk === "closed") {
              setIsLogLoading(false);
              return;
            }
            setLogs((prevLogs) => prevLogs + chunk);
            receivedLength += value.length;
      
            return reader.read().then(processtext);
          });
        })
        .catch((error) => {
          console.error("Error fetching feature Step :", error);
          throw error;
        });

    },
    [dispatch, newTable, projectId]
  );
  const steps =
    mapTagsFeaturesScenariosData && mapTagsFeaturesScenariosData[tagId];

  console.log('--------------isLogLoading', isLogLoading)
  const renderFeatureLine = () => {
    return steps?.scenarioSteps?.map((scenario) => {
      const stepLine = scenario?.stepLines;
      const examples = scenario?.properties?.examples;
      let isRunning = isLogLoading
      let isDisabled = false
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
            <>
              <p className="ml-5 mt-2 font-bold">Example: </p>
              <div className="py-3 px-5">{<AgTable examples={examples} newTableData={setNewTable} />}</div>
            </>
            
          )}
        </Accordion>
      );
    });
  };
  return (
    <>
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
    <Terminal logs={logs} />
      {renderToast()}
    </>
   
  );
};

export default memo(Scenario);
