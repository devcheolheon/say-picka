import React, { useEffect } from "react";
import { useRecognizer } from "./useRecognizer.js";

const App = () => {
  const [outputText, startRecognizer, endRecognizer, error] = useRecognizer();
  useEffect(() => startRecognizer(), []);
  useEffect(() => {
    document.addEventListener("keyup", (ev) => {
      console.log(ev.code);
      if (ev.code === "Enter") endRecognizer();
    });
  }, []);
  return <div>{outputText}</div>;
};

export default App;
