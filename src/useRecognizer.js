import React, { useEffect, useState } from "react";

var SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

var SpeechGrammarList =
  window.SpeechGrammarList || window.webkitSpeechGrammarList;

var eventPika = new Event("PIKA");

export const useRecognizer = () => {
  const [outputText, setOutputText] = useState("");
  const [error, setError] = useState("");

  var recognition;

  useEffect(() => {
    recognition = new SpeechRecognition();
    var pikachus = ["피카"];
    var speechRecognitionList = new SpeechGrammarList();
    var grammar =
      "#JSGF V1.0; grammar pikachu; public <picachu> = " +
      pikachus.join(" | ") +
      " ;";

    speechRecognitionList.addFromString(grammar, 1);

    recognition.continuous = false;
    recognition.lang = "ko-KR";
    recognition.interimResults = true;
    recognition.maxAlternatives = 5;
    recognition.grammars = speechRecognitionList;

    recognition.onaudioend = function (event) {
      //console.log(event);
    };

    recognition.onresult = function (event) {
      var text = event.results[0][0].transcript;
      var hasPika = false;

      for (let result of event.results[0]) {
        if (result.transcript.indexOf("피카") > -1) hasPika = true;
      }

      if (hasPika) {
        console.log("event");
        document.dispatchEvent(eventPika);
        recognition.stop();
      }

      setOutputText(text);
    };

    document.addEventListener("PIKA", (e) => {
      console.log("피카 이벤트 발생");
    });

    recognition.onend = function (event) {
      recognition.start();
    };

    return () => recognition.stop();
    //onError도 한 번!
  }, []);

  const startRecognizer = () => {
    recognition.start();
  };

  const endRecognizer = () => {
    recognition.stop();
  };

  return [outputText, startRecognizer, endRecognizer, error];
};
