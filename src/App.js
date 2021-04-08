import React, { useEffect } from "react";
import { useRecognizer } from "./useRecognizer.js";
import initAndStart from "./resources/js/main.js";

const App = () => {
  const [outputText, startRecognizer, endRecognizer, error] = useRecognizer();

  useEffect(() => {
    startRecognizer();
    return () => endRecognizer();
  }, []);

  useEffect(() => {
    let container = initAndStart();
    return () => {
      container.innerHTML = "";
    };
  }, []);

  return (
    <div>
      <div>{outputText}</div>
      <div id="game-canvas-container"></div>
    </div>
  );
};

export default App;
