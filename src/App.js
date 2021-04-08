import React, { useEffect, useState, useRef, useCallback } from "react";
import { usePikaRecognizer } from "./usePikaRecognizer.js";
import initAndStart from "./resources/js/main.js";

const App = () => {
  const [isPika, setIsPika] = useState(false);
  const pikatime = useRef(null);
  const pikaHandler = useCallback(
    (e) => {
      if (!pikatime.current) {
        clearTimeout(pikatime.current);
      }
      // 피카가 인식된후 300ms가 유지 된 후
      // 피카가 취소됨
      pikatime.current = setTimeout(() => {
        setIsPika(false);
      }, 300);

      setIsPika(true);
    },
    [setIsPika]
  );

  useEffect(() => {
    document.addEventListener("PIKA", pikaHandler);
    return () => {
      document.removeEventListener("PIKA", pikaHandler);
    };
  });

  const [
    outputText,
    startRecognizer,
    endRecognizer,
    error,
  ] = usePikaRecognizer();

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
    <div style={{ width: "864px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          lineHeight: "100px",
          fontSize: "60px",
        }}
      >
        <div>👂 : {outputText}</div>
        <div>PIKA {isPika ? <span>💡 on </span> : <span>off </span>}</div>
      </div>
      <div id="game-canvas-container"></div>
    </div>
  );
};

export default App;
