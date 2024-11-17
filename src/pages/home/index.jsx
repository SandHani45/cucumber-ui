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
import { onRunningScenario } from "../../features/globalSlice";

function Home() {
  const dispatch = useDispatch();
  const { loading, error, tagsList } = useSelector(
    (state) => state.featureStep
  );
  const { isScenarioRunning, runningScenario, runningTag } = useSelector(
    (state) => state.globalState
  );
  useEffect(() => {
    dispatch(fetchFeatureStepSlice());
  }, [dispatch]);

  const handleChipClick = useCallback(
    (tag) => {
      dispatch(updateTagIsActive(tag.id));
    },
    [dispatch]
  );

  const onClickRun = useCallback(
    (tag) => dispatch(onRunningScenario({tag})),
    [dispatch]
  );
  const onClickCard = useCallback(() => {}, []);

  const filterTags = tagsList.filter((item) => item.isActive);
  console.log("--", filterTags);
  const renderCard = () => {
    let cardsList = !filterTags.length ? tagsList : filterTags;

    return cardsList.map((tag) => {
      let isTestcaseRunning = isScenarioRunning && runningTag === tag.data;
      return (
        <Card
          tagName={tag.data}
          featureCount={tag.properties?.featureId?.length || 0}
          scenarioCount={tag.properties?.scenarioIds?.length || 0}
          onClickCard={onClickCard}
          onClickRun={onClickRun}
          isRunning={isTestcaseRunning}
          disabled={runningTag && !isTestcaseRunning}
        />
      );
    });
  };
  return (
    <>
      <div className="grid gap-6 mb-6 flex-[0_1_0]">
        <div className="p-3">
          <p class="capitalize mb-3 font-bold">Tags List </p>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          <div className="flex">
            <Chips chipsList={tagsList} onClickChip={handleChipClick} />
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-5 flex-wrap p-3">
        {renderCard()}
      </div>
    </>
  );
}

export default Home;
