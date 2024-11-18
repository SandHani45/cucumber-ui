const mapTagsFeaturesScenarios = (jsonData) => {
  const mapping = {};
  const { TagLine: tagLines, ScenarioLine: scenarioLine, StepLine: stepLine } = jsonData;
  tagLines && tagLines?.forEach((tagLine) => {
    const tag = tagLine?.data;
    const scenarioIds = tagLine.properties.scenarioIds || [];
    if (!mapping[tag]) {
      mapping[tag] = { scenarioSteps: [] };
    }
    scenarioIds.forEach((id) => {
      const filteredScenarios = scenarioLine.filter((scenario) => scenario.id === id);
      const stepLines = stepLine.filter((step) => step.properties.scenarioId === id);
      const mapStepAndScenarios = filteredScenarios.map((item) => ({
        ...item,
        stepLines,
      }));
      mapping[tag].scenarioSteps.push(...mapStepAndScenarios);
    });
  });
  return mapping;
};

export default mapTagsFeaturesScenarios;
