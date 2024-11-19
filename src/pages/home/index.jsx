import { useCallback, useEffect, useState } from "react";
import {
  Terminal,
  Header,
  SelectDropdown,
  Chips,
  Card,
} from "./../../components";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFeatureStepSlice,
  updateTagIsActive,
} from "../../features/featureStepSlice";
import { fetchRunnerAction } from "./../../features/runnerSlice";
import { onRunningScenario } from "../../features/globalSlice";
import Toast from "../../components/Toast";
const BASE_URL =
  process.env.BACKEND_URL || "https://0aba-86-98-70-229.ngrok-free.app";

function Home() {
  const dispatch = useDispatch();
  const [isLogLoading, setIsLogLoading] = useState(false);
  const [logs, setLogs] = useState([]);
  const [selectedtag, setSelectedTag] = useState("");
  const [progress, setProgress] = useState(0);
  const { loading, error, tagsList } = useSelector(
    (state) => state.featureStep
  );
  const [toastMsg, setToastMsg] = useState({
    status: "",
    message: ""
  })
  const { isScenarioRunning, runningScenario, runningTag } = useSelector(
    (state) => state.globalState
  );

  useEffect(() => {
    if(!tagsList.length){
      dispatch(fetchFeatureStepSlice({
        url: localStorage.getItem('url')
      }));
    }
  }, [dispatch, tagsList.length]);

  const handleChipClick = useCallback(
    (tag) => {
      dispatch(updateTagIsActive(tag.id));
    },
    [dispatch]
  );
  const onClickRun = useCallback((tag) => {
    setProgress(0); // Reset progress
    setSelectedTag(tag);
    setIsLogLoading(true);
    setLogs([])
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
        const decoder = new TextDecoder("utf-8");
        const contentLength = res.headers.get("Content-Length");
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
          const progressPercentage = Math.min(
            (receivedLength / contentLength) * 100,
            100
          );
          setProgress(progressPercentage);
          return reader.read().then(processtext);
        });
      })
      .catch((error) => {
        console.error("Error fetching feature Step :", error);
        throw error;
      });
  }, []);
  const onClickCard = useCallback(() => {}, []);

  useEffect(() => {
    if (logs.includes("executing steps")) {
      setIsLogLoading(false);
    }
  }, [logs]);
  const filterTags = tagsList.filter((item) => item.isActive);

const renderToast = () => {
  return toastMsg.message && <Toast onClear={(res)=>setToastMsg(res)} status={toastMsg.status} isOpen={true} message={toastMsg.message} />
}

  const renderCard = () => {
    let cardsList = !filterTags.length ? tagsList : filterTags;

    return cardsList.map((tag) => {
      let isTestcaseRunning = isLogLoading && selectedtag === tag.data;
      //let isTestcaseRunning = logs.loading && logs.logTag === tag.data;
      return (
        <Card
          tagName={tag.data}
          featureCount={tag.properties?.featureId?.length || 0}
          scenarioCount={tag.properties?.scenarioIds?.length || 0}
          onClickCard={onClickCard}
          onClickRun={onClickRun}
          isRunning={isTestcaseRunning}
          disabled={isLogLoading && !isTestcaseRunning}
          progress={progress}
        />
      );
    });
  };
  {error && <p>Error: {error}</p>}
  if(loading){
    return <div className="w-full flex justify-center items-center h-[90vh]">
        <span className=" loading loading-lg loading-ring text-info"></span>
    </div>
  }
  return (
    <>
      <div className="grid gap-6 mb-6 flex-[0_1_0]">
        <div className="p-3">
        
          {!tagsList.length ? (
            <div class="hero bg-base-200 min-h-[60vh]">
              <div class="hero-content text-center">
                <div class="max-w-md">
                  <h1 class="text-4xl font-bold">Clone Your Project</h1>
                </div>
              </div>
            </div>
          ) : (
            <>
              <p class="capitalize mb-3 font-bold">Tags List </p>
              <div className="flex">
                <Chips chipsList={tagsList} onClickChip={handleChipClick} />
              </div>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-center gap-5 flex-wrap p-3">
        {renderCard()}
      </div>
      <Terminal logs={logs} />
      {renderToast()}
    </>
  );
}

export default Home;
