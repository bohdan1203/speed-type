import { calculateAccuracy, calculateSpeed } from "../helpers";

const ResultsPanel = ({ state }) => {
  return (
    <div className="px-4 py-2">
      <h1>
        Speed:{" "}
        {state.typingIsFinished
          ? state.result?.speed
          : calculateSpeed(
              state.isTyping,
              state.text,
              state.currentIndex,
              state.timestamps,
              state.typingIsFinished
            )}{" "}
        {state.isTyping && "WPM"}
      </h1>
      <h1>
        Accuracy:{" "}
        {state.typingIsFinished
          ? state.result?.accuracy
          : calculateAccuracy(
              state.isTyping,
              state.text,
              state.actualTypedText.join(""),
              state.currentIndex,
              state.typingIsFinished
            )}
        {state.isTyping && "%"}
      </h1>
    </div>
  );
};

export default ResultsPanel;
