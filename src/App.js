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
      <div>
        <h1>피카 피카 !! 피카츄 배구 </h1>
        <h3>링글 voice recognizer 스터디 결과물</h3>
        <p>
          gorisanson님이 역엔지니어링으로 js로 구현한 피카츄 배구에 speech
          recognition api를 적용해보았습니다. 엔터 대신 피카를 외쳐야 합니다.
          (여러번 플래이를 거친 후 팁을 드리자면 상당히 긴 딜레이를 예상하고
          피카를 외쳐야 합니다 )
        </p>
        <p>
          <h3>참고한 url</h3>
          <ul>
            <li>
              https://dev-recruiting.ringleplus.com/486fe494-ed6d-43d9-a3b1-199bd23b935f
            </li>
            <li>https://github.com/gorisanson/pikachu-volleyball</li>
            <li>
              https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition
            </li>
          </ul>
        </p>
      </div>
    </div>
  );
};

export default App;
