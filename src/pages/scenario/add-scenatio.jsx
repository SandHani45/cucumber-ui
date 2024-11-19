import { Link } from "react-router-dom";
import { Autocomplete } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFeatureStepSlice,
  updateTagIsActive,
} from "../../features/featureStepSlice";
import React, {useEffect} from 'react'

const AddScenario = () => {
  const fruits = [
    "Apple",
    "Banana",
    "Orange",
    "Pineapple",
    "Mango",
    "Peach",
    "Pear",
  ];
 const dispatch=  useDispatch()
  const { loading, error, featureStep } = useSelector(
    (state) => state.featureStep
  );
  useEffect(() => {
    if (!featureStep.length) {
      dispatch(
        fetchFeatureStepSlice({
          url: localStorage.getItem("url"),
        })
      );
    }
  }, [dispatch, featureStep.length]);
  console.log('-------featureStep', featureStep)
  return (
    <div className="p-4 flex flex-col items-start gap-4">
      <div className="flex items-center gap-2">
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
      </div>

      <div className="flex justify-between w-full gap-5 ">
        <div className="flex ml-8 flex-col gap-5 mr-5 w-[50%]">
          <Autocomplete label={"Feature"} suggestions={fruits} />
          <Autocomplete label={"Tag"} suggestions={fruits} />
          <Autocomplete label={"Scenario"} suggestions={fruits} />
          <Autocomplete label={"Steps"} suggestions={fruits} />
        </div>
        <div className="w-full ml-5">
          <label className="form-control">
            <div className="label">
              <span className="label-text font-bold">Prompt: </span>
            </div>
            <textarea
              className="textarea textarea-bordered h-15"
              placeholder="Prompt"
              
            ></textarea>
          </label>
          <div className="mt-6">
            <div className="mockup-code h-[30rem]">
                <pre data-prefix="1">Loading.....</pre>
                
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
export default AddScenario;
