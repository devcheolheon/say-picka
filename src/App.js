import React, { useEffect } from "react";
import { useRecognizer } from "./useRecognizer.js";
import initAndStart from "./resources/js/main.js";

const App = () => {
  //const [outputText, startRecognizer, endRecognizer, error] = useRecognizer();

  /*
  useEffect(() => startRecognizer(), []);
  useEffect(() => {
    document.addEventListener("keyup", (ev) => {
      console.log(ev.code);
      if (ev.code === "Enter") endRecognizer();
    });
  }, []);
  */

  useEffect(() => {
    initAndStart();
  }, []);

  return (
    <div>
      <div id="game-canvas-container"></div>
    </div>
  );
};

export default App;
