import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Autocomplete } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeatureStepSlice } from '../../features/featureStepSlice';

const BASE_URL = process.env.BACKEND_URL || 'https://0aba-86-98-70-229.ngrok-free.app';

const AddScenario = () => {
  const dispatch = useDispatch();
  const { loading, error, featureStep } = useSelector((state) => state.featureStep);
  const [inputValue, setInputValue] = useState('');
  const [promptData, setPromptData] = useState([]);
  const [arrData,setArrData] = useState([])
  const [stepData,setStepData] = useState('')

  useEffect(() => {
    if (!featureStep.length) {
      dispatch(fetchFeatureStepSlice({ url: localStorage.getItem('url') }));
    }
  }, [dispatch, featureStep.length]);

  const getFeatureData = useCallback(() => {
    return featureStep?.FeatureLine?.map((line) => line.data.replace(/^Feature: /, '')) || [];
  }, [featureStep]);

  const getTagData = useCallback(() => {
    return featureStep?.TagLine?.map((line) => line.data) || [];
  }, [featureStep]);

  const getScenarioData = useCallback(() => {
    return featureStep?.ScenarioLine?.map((line) => line.data) || [];
  }, [featureStep]);

  const getStepsData = useCallback(() => {
    return featureStep?.StepLine?.map((line) => line.data) || [];
  }, [featureStep]);

  const suggestions = useMemo(() => {
    return {
      features: getFeatureData(),
      tags: getTagData(),
      scenarios: getScenarioData(),
      steps: getStepsData(),
    };
  }, [getFeatureData, getTagData, getScenarioData, getStepsData]);

  const fetchPromptData = async () => {
    if (!inputValue.trim()) {
      alert('Please enter a value.');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/scenario/getScenarioSteps`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: inputValue, projectId: 'sample-cucumber-test' }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }

      const data = await response.json();
      setPromptData(data);
    } catch (error) {
      console.error('Error fetching prompt data:', error);
      alert('An error occurred while fetching data.');
    }
  };

  const addSteps = async() => {
    setArrData((data) => [...data,stepData] )
  }

  return (
    <div className="p-4 flex flex-col items-start gap-4">
      <Link to="/" className="btn btn-sm btn-ghost">
        Back
      </Link>

      <div className="flex justify-between w-full gap-5 ">
        <div className="flex ml-8 flex-col gap-5 mr-5 w-[50%]">
          <Autocomplete label="Feature" suggestions={suggestions.features} />
          <Autocomplete label="Tag" suggestions={suggestions.tags} />
          <Autocomplete label="Scenario" suggestions={suggestions.scenarios} />
          <div className="flex items-center">
           <Autocomplete label="Steps" suggestions={suggestions.steps} onSelect={(e) => {setStepData(e)}}/>
            <button className="btn btn-sm ml-2" onClick={addSteps}>
              Add
            </button>
          </div>
          {arrData.length > 0 && (
            <div className="mb-4">
              <span className="font-bold">Selected Steps:</span>
              <ul className="list-disc pl-4">
                {arrData.map((data, index) => (
                  <li key={index}>{data}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="w-full ml-5">
          <label className="form-control">
            <span className="label-text font-bold">Prompt:</span>
            <textarea
              className="textarea textarea-bordered h-15"
              placeholder="Prompt"
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button className="btn btn-sm" onClick={fetchPromptData}>
              Ask
            </button>
          </label>
          <div className="mt-6">
          <div className="mockup-code h-[30rem]">
            <pre data-prefix="1">
              {promptData ? JSON.stringify(promptData, null, 2) : 'No results found'}
            </pre>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddScenario;