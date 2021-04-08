import React, { useEffect, useState, useRef } from "react";

var SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

var SpeechGrammarList =
  window.SpeechGrammarList || window.webkitSpeechGrammarList;

const setSpeechRecognition = (recognition) => {
  if (recognition) return recognition;
  recognition = new SpeechRecognition();
  var pikachus = ["피카", "피", "카"];
  var speechRecognitionList = new SpeechGrammarList();

  var grammar =
    "#JSGF V1.0; grammar pikachu; public <picachu> = " +
    pikachus.join(" | ") +
    " ;";

  speechRecognitionList.addFromString(grammar, 1);

  recognition.continuous = true;
  recognition.lang = "ko-KR";
  recognition.interimResults = true;
  recognition.maxAlternatives = 5;
  recognition.grammars = speechRecognitionList;

  recognition.onend = function (event) {
    recognition.start();
  };

  return recognition;
};

const checkPika = (results) => {
  for (let result of results) {
    if (result.transcript.indexOf("피") > -1) {
      return true;
    }
  }
  return false;
};

const eventPika = new Event("PIKA");

export const usePikaRecognizer = () => {
  const [outputText, setOutputText] = useState("");
  const [error, setError] = useState("");
  const recognition = useRef(null);

  useEffect(() => {
    recognition.current = setSpeechRecognition(recognition.current);
    recognition.current.onresult = function (event) {
      var text = event.results[0][0].transcript;
      if (checkPika(event.results[0])) {
        document.dispatchEvent(eventPika);
        recognition.current.stop();
      }
      setOutputText(text);
    };

    document.addEventListener("PIKA", (e) => {
      console.log("피카 이벤트 발생");
    });

    return () => recognition.current.stop();
  }, []);

  const startRecognizer = () => {
    try {
      recognition.current.start();
    } catch (e) {}
  };

  const endRecognizer = () => {
    recognition.current.stop();
  };

  return [outputText, startRecognizer, endRecognizer, error];
};
